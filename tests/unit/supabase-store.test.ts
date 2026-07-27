import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

/**
 * Supabase 저장소의 오류·부재 처리 계약.
 *
 * 실제 Supabase에 붙지 않는다 — 운영 DB를 건드리지 않기 위해 클라이언트를 대체한다.
 * 여기서 검증하는 것은 "DB가 오류를 돌려주거나 행이 없을 때 어떻게 행동하는가"이며,
 * 이는 file-store와 동일한 계약이어야 admin API가 상태 코드를 일관되게 매핑할 수 있다.
 */

type QueryResult = { data: unknown; error: { message: string } | null }

/** Supabase 쿼리 빌더는 체이닝이므로, 모든 메서드가 자신을 돌려주고 마지막에 결과를 준다 */
function makeQueryBuilder(result: QueryResult) {
  const builder: Record<string, unknown> = {}
  for (const method of ['select', 'insert', 'update', 'delete', 'eq', 'order']) {
    builder[method] = vi.fn(() => builder)
  }
  builder.single = vi.fn(async () => result)
  builder.maybeSingle = vi.fn(async () => result)
  // .order()로 끝나는 조회는 await 시 결과를 내야 하므로 thenable로 만든다
  builder.then = (resolve: (value: QueryResult) => unknown) => resolve(result)
  return builder
}

async function loadStoreWithResult(result: QueryResult) {
  vi.resetModules()
  vi.doMock('@supabase/supabase-js', () => ({
    createClient: () => ({ from: () => makeQueryBuilder(result) }),
  }))
  return import('@/lib/store/supabase-store')
}

const OK_ROW = { id: 'row-1', category: '공지', title: '제목', date: '2026-07-27', isNew: false }

beforeEach(() => {
  process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co'
  process.env.SUPABASE_SERVICE_ROLE_KEY = 'x'.repeat(40)
})

afterEach(() => {
  delete process.env.NEXT_PUBLIC_SUPABASE_URL
  delete process.env.SUPABASE_SERVICE_ROLE_KEY
  vi.doUnmock('@supabase/supabase-js')
  vi.restoreAllMocks()
})

describe('isSupabaseStoreConfigured', () => {
  it('URL과 키가 모두 있어야 true', async () => {
    const store = await loadStoreWithResult({ data: [], error: null })
    expect(store.isSupabaseStoreConfigured()).toBe(true)
  })

  it('키가 없으면 false', async () => {
    delete process.env.SUPABASE_SERVICE_ROLE_KEY
    const store = await loadStoreWithResult({ data: [], error: null })
    expect(store.isSupabaseStoreConfigured()).toBe(false)
  })

  it('URL이 https가 아니면 false', async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'http://example.supabase.co'
    const store = await loadStoreWithResult({ data: [], error: null })
    expect(store.isSupabaseStoreConfigured()).toBe(false)
  })
})

describe('조회 오류 처리', () => {
  it('DB 오류를 조용히 빈 배열로 바꾸지 않고 던진다', async () => {
    const store = await loadStoreWithResult({ data: null, error: { message: 'connection refused' } })

    // 빈 결과로 감추면 관리자는 "데이터가 없다"고 오해한다
    await expect(store.getSectionItems('notices')).rejects.toThrow(/조회 실패/)
  })

  it('오류 메시지에 원인을 담아 진단할 수 있게 한다', async () => {
    const store = await loadStoreWithResult({ data: null, error: { message: 'permission denied' } })
    await expect(store.getSectionItems('notices')).rejects.toThrow(/permission denied/)
  })

  it('데이터가 null이어도 빈 배열로 정상 반환한다 (행이 없는 정상 상태)', async () => {
    const store = await loadStoreWithResult({ data: null, error: null })
    await expect(store.getSectionItems('notices')).resolves.toEqual([])
  })
})

describe('생성 오류 처리', () => {
  it('생성 실패를 성공으로 바꾸지 않는다', async () => {
    const store = await loadStoreWithResult({ data: null, error: { message: 'unique violation' } })
    await expect(
      store.createSectionItem('notices', {
        category: '공지', title: 'x', date: '2026-07-27', isNew: false,
      }),
    ).rejects.toThrow(/생성 실패/)
  })

  it('성공하면 저장된 행을 돌려준다', async () => {
    const store = await loadStoreWithResult({ data: OK_ROW, error: null })
    const created = await store.createSectionItem('notices', {
      category: '공지', title: '제목', date: '2026-07-27', isNew: false,
    })
    expect(created).toMatchObject({ id: 'row-1', title: '제목' })
  })
})

describe('없는 ID 처리 — file-store와 동일한 계약', () => {
  it('수정 대상이 없으면 NOT_FOUND를 던진다 (admin API가 404로 매핑)', async () => {
    const store = await loadStoreWithResult({ data: null, error: null })
    await expect(store.updateSectionItem('notices', 'missing-id', { title: 'x' })).rejects.toThrow(
      'NOT_FOUND',
    )
  })

  it('수정 중 DB 오류는 NOT_FOUND와 구분해서 던진다', async () => {
    const store = await loadStoreWithResult({ data: null, error: { message: 'timeout' } })
    await expect(store.updateSectionItem('notices', 'id', { title: 'x' })).rejects.toThrow(
      /수정 실패/,
    )
  })

  it('삭제 중 DB 오류를 조용히 삼키지 않는다', async () => {
    const store = await loadStoreWithResult({ data: null, error: { message: 'deadlock' } })
    await expect(store.deleteSectionItem('notices', 'id')).rejects.toThrow(/삭제 실패/)
  })
})

describe('file-store와의 계약 일치', () => {
  it('두 저장소가 같은 이름의 CRUD 함수를 제공한다', async () => {
    const supabase = await loadStoreWithResult({ data: [], error: null })
    const file = await import('@/lib/store/file-store')

    const contract = [
      'getContentStore',
      'getSectionItems',
      'createSectionItem',
      'updateSectionItem',
      'deleteSectionItem',
    ] as const

    for (const fn of contract) {
      expect(typeof supabase[fn], `supabase-store.${fn}`).toBe('function')
      expect(typeof file[fn], `file-store.${fn}`).toBe('function')
    }
  })

  it('없는 ID 수정 시 두 저장소 모두 NOT_FOUND를 던진다', async () => {
    const supabase = await loadStoreWithResult({ data: null, error: null })
    await expect(supabase.updateSectionItem('notices', 'missing', { title: 'x' })).rejects.toThrow(
      'NOT_FOUND',
    )

    // file-store는 별도 sandbox가 필요하므로 계약(에러 메시지)만 대조한다
    const file = await import('@/lib/store/file-store')
    const fileError = await file
      .updateSectionItem('notices', 'missing', { title: 'x' })
      .then(() => null)
      .catch((e: unknown) => e)

    expect(fileError).toBeInstanceOf(Error)
    expect((fileError as Error).message).toBe('NOT_FOUND')
  })
})
