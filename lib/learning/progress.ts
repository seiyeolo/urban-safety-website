/**
 * 수강 진도 저장 (Phase 1 — 브라우저 localStorage)
 * ─────────────────────────────────────────────
 * 운영 DB 변경 금지 원칙(소라 안전 게이트)에 따라
 * Phase 1에서는 기기 로컬에만 진도를 저장합니다.
 * Phase 2에서 Supabase lesson_progress 테이블로 이전 예정.
 *
 * localStorage는 사용자가 직접 편집할 수 있고 옛 버전의 값이 남기도 한다.
 * 따라서 읽어 들인 값은 신뢰하지 않고 아래 규칙으로 정규화한다.
 *   - 완료 차시는 양의 정수만 (0·음수·소수·NaN·Infinity 제외)
 *   - 중복 제거 후 오름차순 정렬
 *   - totalLessons를 아는 경우 그 범위를 벗어난 차시 제외
 *   - lastOrder도 같은 규칙으로 정정하고, 범위를 벗어나면 1로 되돌림
 *   - 어떤 손상 데이터에서도 예외를 던지지 않음
 */

export type CourseProgress = {
  completed: number[] // 완료한 차시 order 목록 (양의 정수, 중복 없음, 오름차순)
  lastOrder: number // 마지막으로 본 차시 (1 이상)
}

const keyFor = (courseSlug: string) => `usdc:progress:${courseSlug}`

/** 서버 렌더링·초기 스냅샷용 기본값 (참조가 항상 동일해야 함) */
export const EMPTY_PROGRESS: CourseProgress = Object.freeze({ completed: [], lastOrder: 1 })

/** 차시 번호로 유효한 값인지 — 양의 정수만 통과 */
function isValidLessonOrder(value: unknown, totalLessons?: number): value is number {
  if (typeof value !== 'number') return false
  if (!Number.isInteger(value)) return false // 소수·NaN·Infinity 제외
  if (value < 1) return false // 0과 음수 제외
  if (totalLessons !== undefined && totalLessons > 0 && value > totalLessons) return false
  return true
}

/**
 * 임의의 값을 안전한 진도로 정규화한다.
 * totalLessons를 주면 실제 존재하지 않는 차시까지 걸러낸다.
 */
export function normalizeProgress(input: unknown, totalLessons?: number): CourseProgress {
  const source = (input ?? {}) as Partial<CourseProgress>

  const completed = Array.isArray(source.completed)
    ? [...new Set(source.completed.filter((n): n is number => isValidLessonOrder(n, totalLessons)))].sort(
        (a, b) => a - b,
      )
    : []

  const lastOrder = isValidLessonOrder(source.lastOrder, totalLessons) ? source.lastOrder : 1

  return { completed, lastOrder }
}

function parseProgress(raw: string | null, totalLessons?: number): CourseProgress {
  if (!raw) return EMPTY_PROGRESS
  try {
    return normalizeProgress(JSON.parse(raw), totalLessons)
  } catch {
    // JSON이 깨졌어도 학습을 막지 않는다 — 빈 진도로 시작
    return EMPTY_PROGRESS
  }
}

export function getProgress(courseSlug: string, totalLessons?: number): CourseProgress {
  if (typeof window === 'undefined') return EMPTY_PROGRESS
  return parseProgress(window.localStorage.getItem(keyFor(courseSlug)), totalLessons)
}

/* ── useSyncExternalStore용 구독 스토어 ── */
const listeners = new Set<() => void>()
const snapshotCache = new Map<string, { raw: string | null; value: CourseProgress }>()

export function subscribeProgress(callback: () => void): () => void {
  listeners.add(callback)
  return () => {
    listeners.delete(callback)
  }
}

function emitChange(): void {
  listeners.forEach((l) => l())
}

/**
 * localStorage 원문이 바뀌지 않는 한 동일 참조를 반환 (무한 렌더 방지).
 * totalLessons가 다르면 정규화 결과도 달라지므로 캐시 키에 함께 넣는다.
 */
export function getProgressSnapshot(courseSlug: string, totalLessons?: number): CourseProgress {
  if (typeof window === 'undefined') return EMPTY_PROGRESS

  const raw = window.localStorage.getItem(keyFor(courseSlug))
  const cacheKey = `${courseSlug}::${totalLessons ?? ''}`
  const cached = snapshotCache.get(cacheKey)
  if (cached && cached.raw === raw) return cached.value

  const value = parseProgress(raw, totalLessons)
  snapshotCache.set(cacheKey, { raw, value })
  return value
}

function save(courseSlug: string, progress: CourseProgress): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(keyFor(courseSlug), JSON.stringify(progress))
  } catch {
    /* storage 사용 불가 환경(사파리 프라이빗 등)에서는 조용히 무시 */
  }
  emitChange()
}

export function setLastOrder(courseSlug: string, order: number, totalLessons?: number): void {
  if (!isValidLessonOrder(order, totalLessons)) return // 잘못된 차시는 기록하지 않는다
  const p = getProgress(courseSlug, totalLessons)
  save(courseSlug, { ...p, lastOrder: order })
}

export function markCompleted(
  courseSlug: string,
  order: number,
  totalLessons?: number,
): CourseProgress {
  const current = getProgress(courseSlug, totalLessons)
  if (!isValidLessonOrder(order, totalLessons)) return current // 없는 차시를 완료로 만들지 않는다

  const completed = current.completed.includes(order)
    ? current.completed
    : [...current.completed, order].sort((a, b) => a - b)

  const next: CourseProgress = { completed, lastOrder: order }
  save(courseSlug, next)
  return next
}

/** 진행률(%) — 항상 0~100 범위로 잘라 반환한다 */
export function progressPercent(progress: CourseProgress, totalLessons: number): number {
  if (!Number.isFinite(totalLessons) || totalLessons <= 0) return 0
  const raw = Math.round((progress.completed.length / totalLessons) * 100)
  return Math.min(100, Math.max(0, raw))
}
