/**
 * 수강 진도 저장 (Phase 1 — 브라우저 localStorage)
 * ─────────────────────────────────────────────
 * 운영 DB 변경 금지 원칙(소라 안전 게이트)에 따라
 * Phase 1에서는 기기 로컬에만 진도를 저장합니다.
 * Phase 2에서 Supabase lesson_progress 테이블로 이전 예정.
 */

export type CourseProgress = {
  completed: number[] // 완료한 차시 order 목록
  lastOrder: number // 마지막으로 본 차시
}

const keyFor = (courseSlug: string) => `usdc:progress:${courseSlug}`

/** 서버 렌더링·초기 스냅샷용 기본값 (참조가 항상 동일해야 함) */
export const EMPTY_PROGRESS: CourseProgress = Object.freeze({ completed: [], lastOrder: 1 })

function parseProgress(raw: string | null): CourseProgress {
  if (!raw) return EMPTY_PROGRESS
  try {
    const parsed = JSON.parse(raw) as Partial<CourseProgress>
    return {
      completed: Array.isArray(parsed.completed) ? parsed.completed.filter((n): n is number => typeof n === 'number') : [],
      lastOrder: typeof parsed.lastOrder === 'number' ? parsed.lastOrder : 1,
    }
  } catch {
    return EMPTY_PROGRESS
  }
}

export function getProgress(courseSlug: string): CourseProgress {
  if (typeof window === 'undefined') return EMPTY_PROGRESS
  return parseProgress(window.localStorage.getItem(keyFor(courseSlug)))
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

/** localStorage 원문이 바뀌지 않는 한 동일 참조를 반환 (무한 렌더 방지) */
export function getProgressSnapshot(courseSlug: string): CourseProgress {
  if (typeof window === 'undefined') return EMPTY_PROGRESS
  const raw = window.localStorage.getItem(keyFor(courseSlug))
  const cached = snapshotCache.get(courseSlug)
  if (cached && cached.raw === raw) return cached.value
  const value = parseProgress(raw)
  snapshotCache.set(courseSlug, { raw, value })
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

export function setLastOrder(courseSlug: string, order: number): void {
  const p = getProgress(courseSlug)
  save(courseSlug, { ...p, lastOrder: order })
}

export function markCompleted(courseSlug: string, order: number): CourseProgress {
  const p = getProgress(courseSlug)
  const completed = p.completed.includes(order) ? p.completed : [...p.completed, order].sort((a, b) => a - b)
  const next: CourseProgress = { completed, lastOrder: order }
  save(courseSlug, next)
  return next
}

export function progressPercent(progress: CourseProgress, totalLessons: number): number {
  if (totalLessons <= 0) return 0
  return Math.round((progress.completed.length / totalLessons) * 100)
}
