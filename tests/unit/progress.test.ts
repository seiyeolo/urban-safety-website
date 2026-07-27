import { beforeEach, describe, expect, it } from 'vitest'

/**
 * 수강 진도 저장 계약 (localStorage 기반).
 * progress.ts는 `typeof window === 'undefined'`로 SSR을 판별하므로
 * Node 환경에서는 window와 localStorage를 함께 세워야 실제 경로가 실행된다.
 */

function installBrowserStorage(): Map<string, string> {
  const store = new Map<string, string>()
  const storage = {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => void store.set(k, v),
    removeItem: (k: string) => void store.delete(k),
    clear: () => store.clear(),
    key: (i: number) => [...store.keys()][i] ?? null,
    get length() {
      return store.size
    },
  }
  // 테스트 전용 전역 스텁 (Node 환경에는 window/localStorage가 없다)
  const g = globalThis as unknown as { window?: unknown; localStorage?: unknown }
  g.window = { localStorage: storage }
  g.localStorage = storage
  return store
}

const COURSE = 'voice-phishing-instructor'
const KEY = `usdc:progress:${COURSE}`

let raw: Map<string, string>
// 모듈이 내부 스냅샷 캐시를 들고 있으므로 테스트마다 새로 import 한다
let progress: typeof import('@/lib/learning/progress')

beforeEach(async () => {
  raw = installBrowserStorage()
  const mod = await import('@/lib/learning/progress')
  progress = mod
  // 이전 테스트의 스냅샷 캐시 영향을 없애기 위해 저장소를 비운 상태에서 시작
  raw.clear()
})

describe('progressPercent', () => {
  it('완료 차시 비율을 반올림해 반환한다', () => {
    expect(progress.progressPercent({ completed: [1], lastOrder: 1 }, 4)).toBe(25)
    expect(progress.progressPercent({ completed: [1, 2], lastOrder: 2 }, 4)).toBe(50)
    expect(progress.progressPercent({ completed: [1, 2, 3], lastOrder: 3 }, 4)).toBe(75)
  })

  it('전체 완료는 100을 반환한다', () => {
    expect(progress.progressPercent({ completed: [1, 2, 3, 4], lastOrder: 4 }, 4)).toBe(100)
  })

  it('시작 전에는 0을 반환한다', () => {
    expect(progress.progressPercent(progress.EMPTY_PROGRESS, 4)).toBe(0)
  })

  it('총 차시가 0 이하이면 0으로 처리한다 (0 나누기 방지)', () => {
    expect(progress.progressPercent({ completed: [1], lastOrder: 1 }, 0)).toBe(0)
    expect(progress.progressPercent({ completed: [1], lastOrder: 1 }, -3)).toBe(0)
  })
})

describe('getProgress', () => {
  it('저장된 값이 없으면 빈 진도를 반환한다', () => {
    expect(progress.getProgress(COURSE)).toEqual({ completed: [], lastOrder: 1 })
  })

  it('손상된 JSON은 빈 진도로 복구한다 (예외를 흘리지 않는다)', () => {
    raw.set(KEY, '{ this is not json')
    expect(progress.getProgress(COURSE)).toEqual({ completed: [], lastOrder: 1 })
  })

  it('completed가 배열이 아니면 빈 배열로 정정한다', () => {
    raw.set(KEY, JSON.stringify({ completed: 'nope', lastOrder: 3 }))
    expect(progress.getProgress(COURSE)).toEqual({ completed: [], lastOrder: 3 })
  })

  it('completed 안의 비숫자 값은 걸러낸다', () => {
    raw.set(KEY, JSON.stringify({ completed: [1, 'x', null, 2], lastOrder: 2 }))
    expect(progress.getProgress(COURSE).completed).toEqual([1, 2])
  })

  it('lastOrder가 숫자가 아니면 1로 정정한다', () => {
    raw.set(KEY, JSON.stringify({ completed: [1], lastOrder: 'abc' }))
    expect(progress.getProgress(COURSE).lastOrder).toBe(1)
  })

  it('코스별로 진도가 분리된다', () => {
    raw.set(`usdc:progress:course-a`, JSON.stringify({ completed: [1, 2], lastOrder: 2 }))
    expect(progress.getProgress('course-a').completed).toEqual([1, 2])
    expect(progress.getProgress('course-b').completed).toEqual([])
  })
})

describe('markCompleted', () => {
  it('완료 차시를 기록하고 lastOrder를 갱신한다', () => {
    const next = progress.markCompleted(COURSE, 2)
    expect(next).toEqual({ completed: [2], lastOrder: 2 })
    expect(progress.getProgress(COURSE)).toEqual({ completed: [2], lastOrder: 2 })
  })

  it('같은 차시를 두 번 완료해도 중복 저장하지 않는다', () => {
    progress.markCompleted(COURSE, 1)
    const next = progress.markCompleted(COURSE, 1)
    expect(next.completed).toEqual([1])
  })

  it('순서를 건너뛰어 완료해도 오름차순으로 정렬한다', () => {
    progress.markCompleted(COURSE, 3)
    progress.markCompleted(COURSE, 1)
    expect(progress.getProgress(COURSE).completed).toEqual([1, 3])
  })
})

describe('setLastOrder', () => {
  it('완료 목록을 건드리지 않고 마지막 시청 차시만 바꾼다', () => {
    progress.markCompleted(COURSE, 1)
    progress.setLastOrder(COURSE, 4)
    expect(progress.getProgress(COURSE)).toEqual({ completed: [1], lastOrder: 4 })
  })
})

describe('getProgressSnapshot', () => {
  it('저장 내용이 그대로면 같은 참조를 반환한다 (렌더 루프 방지)', () => {
    progress.markCompleted(COURSE, 1)
    const a = progress.getProgressSnapshot(COURSE)
    const b = progress.getProgressSnapshot(COURSE)
    expect(a).toBe(b)
  })

  it('저장 내용이 바뀌면 새 참조를 반환한다', () => {
    const a = progress.getProgressSnapshot(COURSE)
    progress.markCompleted(COURSE, 1)
    const b = progress.getProgressSnapshot(COURSE)
    expect(a).not.toBe(b)
    expect(b.completed).toEqual([1])
  })
})

describe('subscribeProgress', () => {
  it('진도가 저장되면 구독자에게 알린다', () => {
    let calls = 0
    const unsubscribe = progress.subscribeProgress(() => {
      calls += 1
    })
    progress.markCompleted(COURSE, 1)
    expect(calls).toBe(1)

    unsubscribe()
    progress.markCompleted(COURSE, 2)
    expect(calls).toBe(1) // 구독 해지 후에는 더 이상 호출되지 않는다
  })
})

describe('정규화 — 완료 차시는 양의 정수만', () => {
  it.each([
    ['0', 0],
    ['음수', -3],
    ['소수', 2.5],
    ['NaN', Number.NaN],
    ['Infinity', Number.POSITIVE_INFINITY],
    ['-Infinity', Number.NEGATIVE_INFINITY],
  ])('%s는 걸러낸다', (_label, bad) => {
    raw.set(KEY, JSON.stringify({ completed: [1, bad, 2], lastOrder: 1 }))
    expect(progress.getProgress(COURSE).completed).toEqual([1, 2])
  })

  it('문자열 숫자도 걸러낸다 (타입이 다르면 신뢰하지 않는다)', () => {
    raw.set(KEY, JSON.stringify({ completed: [1, '2', 3], lastOrder: 1 }))
    expect(progress.getProgress(COURSE).completed).toEqual([1, 3])
  })

  it('중복을 제거하고 오름차순으로 정렬한다', () => {
    raw.set(KEY, JSON.stringify({ completed: [3, 1, 3, 2, 1], lastOrder: 3 }))
    expect(progress.getProgress(COURSE).completed).toEqual([1, 2, 3])
  })
})

describe('정규화 — 전체 차시 범위', () => {
  it('총 차시를 알려주면 범위를 벗어난 차시를 제외한다', () => {
    raw.set(KEY, JSON.stringify({ completed: [1, 2, 99], lastOrder: 2 }))
    expect(progress.getProgress(COURSE, 4).completed).toEqual([1, 2])
  })

  it('총 차시를 모르면 범위 검사는 하지 않는다 (구조만 정규화)', () => {
    raw.set(KEY, JSON.stringify({ completed: [1, 99], lastOrder: 1 }))
    expect(progress.getProgress(COURSE).completed).toEqual([1, 99])
  })

  it('lastOrder가 범위를 벗어나면 1로 되돌린다', () => {
    raw.set(KEY, JSON.stringify({ completed: [1], lastOrder: 99 }))
    expect(progress.getProgress(COURSE, 4).lastOrder).toBe(1)
  })

  it.each([[0], [-1], [1.5], [Number.NaN]])('lastOrder가 %s면 1로 정정한다', (bad) => {
    raw.set(KEY, JSON.stringify({ completed: [1], lastOrder: bad }))
    expect(progress.getProgress(COURSE).lastOrder).toBe(1)
  })
})

describe('정규화 — 손상 데이터', () => {
  it.each([
    ['null', 'null'],
    ['배열', '[1,2,3]'],
    ['문자열', '"hello"'],
    ['숫자', '42'],
    ['빈 객체', '{}'],
    ['깨진 JSON', '{ broken'],
  ])('%s이어도 예외 없이 빈 진도로 복구한다', (_label, stored) => {
    raw.set(KEY, stored)
    expect(() => progress.getProgress(COURSE)).not.toThrow()
    const result = progress.getProgress(COURSE)
    expect(Array.isArray(result.completed)).toBe(true)
    expect(result.lastOrder).toBeGreaterThanOrEqual(1)
  })

  it('normalizeProgress는 어떤 입력에도 안전한 형태를 돌려준다', () => {
    for (const input of [null, undefined, 0, 'x', [], { completed: null }, { completed: [1] }]) {
      const result = progress.normalizeProgress(input)
      expect(Array.isArray(result.completed)).toBe(true)
      expect(Number.isInteger(result.lastOrder)).toBe(true)
      expect(result.lastOrder).toBeGreaterThanOrEqual(1)
    }
  })
})

describe('쓰기 시 범위 검증', () => {
  it('존재하지 않는 차시는 완료로 기록하지 않는다', () => {
    const before = progress.getProgress(COURSE, 4)
    const after = progress.markCompleted(COURSE, 99, 4)
    expect(after.completed).toEqual(before.completed)
  })

  it.each([[0], [-1], [2.5]])('잘못된 차시 번호(%s)는 무시한다', (bad) => {
    const after = progress.markCompleted(COURSE, bad, 4)
    expect(after.completed).toEqual([])
  })

  it('setLastOrder도 범위를 벗어나면 기록하지 않는다', () => {
    progress.markCompleted(COURSE, 1, 4)
    progress.setLastOrder(COURSE, 99, 4)
    expect(progress.getProgress(COURSE, 4).lastOrder).toBe(1)
  })
})

describe('progressPercent 범위 제한', () => {
  it('완료 수가 총 차시보다 많아도 100을 넘지 않는다', () => {
    expect(progress.progressPercent({ completed: [1, 2, 3, 4, 5, 6], lastOrder: 1 }, 4)).toBe(100)
  })

  it('총 차시가 유효하지 않으면 0을 반환한다', () => {
    expect(progress.progressPercent({ completed: [1], lastOrder: 1 }, Number.NaN)).toBe(0)
    expect(progress.progressPercent({ completed: [1], lastOrder: 1 }, Number.POSITIVE_INFINITY)).toBe(0)
  })

  it('결과는 항상 0~100 사이다', () => {
    for (const total of [1, 3, 4, 10]) {
      for (const count of [0, 1, 5, 50]) {
        const value = progress.progressPercent(
          { completed: Array.from({ length: count }, (_, i) => i + 1), lastOrder: 1 },
          total,
        )
        expect(value).toBeGreaterThanOrEqual(0)
        expect(value).toBeLessThanOrEqual(100)
      }
    }
  })
})

describe('스냅샷 캐시와 총 차시', () => {
  it('총 차시가 다르면 각각의 정규화 결과를 돌려준다', () => {
    raw.set(KEY, JSON.stringify({ completed: [1, 99], lastOrder: 1 }))
    expect(progress.getProgressSnapshot(COURSE, 4).completed).toEqual([1])
    expect(progress.getProgressSnapshot(COURSE).completed).toEqual([1, 99])
  })

  it('같은 인자면 동일 참조를 유지한다 (렌더 루프 방지)', () => {
    raw.set(KEY, JSON.stringify({ completed: [1], lastOrder: 1 }))
    expect(progress.getProgressSnapshot(COURSE, 4)).toBe(progress.getProgressSnapshot(COURSE, 4))
  })
})
