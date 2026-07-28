/**
 * 교육 일정 상태 뱃지 스타일
 * ─────────────────────────────────────────────
 * 상태는 관리자가 자유 문구로 입력한다(예: '모집 중', '잔여 5석', '마감임박').
 * 고정 목록으로 받을 수 없으므로 키워드로 판정한다.
 *
 * 검사 순서가 중요하다:
 *   - '마감임박'은 '마감'보다 먼저 봐야 한다 (긴급 ≠ 종료)
 *   - '접수완료'는 '완료' 규칙에 먼저 걸려야 한다 ('접수'로 보면 모집중이 된다)
 *
 * 색은 brand(인디고) / cta(주황) / accent(라임) / gray 네 계열에서 고른다.
 * 이전에는 green-*·amber-* 별칭을 썼는데, 로고 BI 팔레트로 옮기면서 두 별칭이
 * 같은 주황(#da410e·#c0390c)으로 병합돼 '모집중'과 '마감임박'이 같은 색으로
 * 보였다. 게다가 두 조합 모두 WCAG AA에 미달했다(3.39:1, 4.19:1).
 *
 * 아래 조합은 전부 AA(4.5:1)를 넘긴다 — schedule-status.test.ts에서 검증한다.
 */

interface StatusRule {
  keywords: readonly string[]
  className: string
}

const STATUS_RULES: readonly StatusRule[] = [
  // 긴급 — 지금 신청해야 하는 상태
  { keywords: ['마감임박', '임박'], className: 'bg-cta-100 text-cta-800' },
  // 종료 — 더 이상 신청할 수 없는 상태
  { keywords: ['마감', '종료', '완료'], className: 'bg-gray-200 text-gray-700' },
  // 신청 가능
  { keywords: ['모집', '접수', '잔여'], className: 'bg-accent-200 text-brand-900' },
  // 아직 열리지 않음
  { keywords: ['예정'], className: 'bg-brand-100 text-brand-800' },
]

/** 판정 불가한 문구는 정보성 회색으로 둔다 (없는 상태를 지어내지 않는다) */
export const DEFAULT_STATUS_CLASS = 'bg-gray-200 text-gray-700'

export function scheduleStatusClass(status: string): string {
  const normalized = status.trim()
  if (!normalized) return DEFAULT_STATUS_CLASS

  const rule = STATUS_RULES.find((candidate) =>
    candidate.keywords.some((keyword) => normalized.includes(keyword)),
  )
  return rule?.className ?? DEFAULT_STATUS_CLASS
}

/** 일정 유형(온라인/오프라인/단체) 뱃지 — 상태 뱃지와 색 계열이 겹치지 않게 둔다 */
export function scheduleTypeClass(type: string): string {
  if (type.includes('온라인')) return 'bg-cta-50 text-cta-700'
  if (type.includes('오프라인')) return 'bg-brand-50 text-brand-700'
  return 'bg-gray-100 text-gray-700'
}
