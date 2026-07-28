import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { DEFAULT_STATUS_CLASS, scheduleStatusClass, scheduleTypeClass } from '@/lib/schedule-status'
import { contrastRatio, parseRgb } from '../helpers/contrast'

/**
 * 교육 일정 뱃지의 두 가지 계약:
 *  1) 관리자가 자유 문구로 넣은 상태를 올바른 의미로 분류하는가
 *  2) 그 색 조합이 실제로 읽히는가 (WCAG AA)
 *
 * 2번을 테스트로 박아두는 이유: 이전에 green-*·amber-* 별칭이 같은 주황으로
 * 병합되면서 '모집중'과 '마감임박'이 같은 색이 됐고, 둘 다 AA에 미달했는데도
 * 아무도 몰랐다. 토큰 값이 다시 바뀌면 여기서 잡힌다.
 */

describe('scheduleStatusClass — 의미 분류', () => {
  it("'마감임박'을 '마감'보다 먼저 판정한다 (긴급 ≠ 종료)", () => {
    expect(scheduleStatusClass('마감임박')).toBe('bg-cta-100 text-cta-800')
    expect(scheduleStatusClass('마감')).toBe('bg-gray-200 text-gray-700')
  })

  it("'접수완료'를 모집중으로 오분류하지 않는다", () => {
    // '접수'만 보면 신청 가능으로 보이지만 실제로는 끝난 상태다
    expect(scheduleStatusClass('접수완료')).toBe('bg-gray-200 text-gray-700')
    expect(scheduleStatusClass('접수중')).toBe('bg-accent-200 text-brand-900')
  })

  it('신청 가능한 상태들을 같은 색으로 묶는다', () => {
    const open = 'bg-accent-200 text-brand-900'
    expect(scheduleStatusClass('모집중')).toBe(open)
    expect(scheduleStatusClass('모집 중')).toBe(open) // 띄어쓰기 변형
    expect(scheduleStatusClass('잔여 5석')).toBe(open)
  })

  it('예정은 신청 가능과 구분한다', () => {
    expect(scheduleStatusClass('예정')).toBe('bg-brand-100 text-brand-800')
    expect(scheduleStatusClass('예정')).not.toBe(scheduleStatusClass('모집중'))
  })

  it('빈 값이나 모르는 문구는 상태를 지어내지 않고 기본값을 준다', () => {
    expect(scheduleStatusClass('')).toBe(DEFAULT_STATUS_CLASS)
    expect(scheduleStatusClass('   ')).toBe(DEFAULT_STATUS_CLASS)
    expect(scheduleStatusClass('협의 후 안내')).toBe(DEFAULT_STATUS_CLASS)
  })

  it('네 상태가 서로 다른 색을 갖는다 (구분 불가 회귀 방지)', () => {
    const classes = ['모집중', '마감임박', '접수완료', '예정'].map(scheduleStatusClass)
    expect(new Set(classes).size).toBe(4)
  })
})

describe('scheduleTypeClass', () => {
  it('온라인·오프라인을 구분하고 나머지는 중립색으로 둔다', () => {
    expect(scheduleTypeClass('온라인')).toBe('bg-cta-50 text-cta-700')
    expect(scheduleTypeClass('오프라인')).toBe('bg-brand-50 text-brand-700')
    expect(scheduleTypeClass('단체')).toBe('bg-gray-100 text-gray-700')
  })

  it('온라인과 오프라인은 서로 다른 색이다', () => {
    expect(scheduleTypeClass('온라인')).not.toBe(scheduleTypeClass('오프라인'))
  })
})

/* ── globals.css의 실제 토큰 값으로 대비를 계산한다 ── */

const CSS = readFileSync(new URL('../../app/globals.css', import.meta.url), 'utf-8')

function tokenHex(name: string): string {
  const match = CSS.match(new RegExp(`--color-${name}:\\s*(#[0-9a-fA-F]{6})`))
  if (!match) throw new Error(`globals.css에 --color-${name} 토큰이 없습니다`)
  return match[1]
}

function hexToRgb(hex: string) {
  const rgb = parseRgb(
    `rgb(${parseInt(hex.slice(1, 3), 16)}, ${parseInt(hex.slice(3, 5), 16)}, ${parseInt(hex.slice(5, 7), 16)})`,
  )
  if (!rgb) throw new Error(`색 파싱 실패: ${hex}`)
  return rgb
}

/** 'bg-accent-200 text-brand-900' → 대비값 */
function ratioOf(className: string): number {
  const bg = className.match(/bg-([a-z]+-\d+)/)?.[1]
  const fg = className.match(/text-([a-z]+-\d+)/)?.[1]
  if (!bg || !fg) throw new Error(`토큰을 못 읽었습니다: ${className}`)
  return contrastRatio(hexToRgb(tokenHex(fg)), hexToRgb(tokenHex(bg)))
}

describe('뱃지 대비 — WCAG AA (작은 글씨 4.5:1)', () => {
  const badges = [
    ['모집중', '모집중'],
    ['마감임박', '마감임박'],
    ['접수완료', '접수완료'],
    ['예정', '예정'],
  ] as const

  for (const [label, status] of badges) {
    it(`상태 '${label}' 뱃지가 AA를 넘는다`, () => {
      const className = scheduleStatusClass(status)
      expect(ratioOf(className), `${label}: ${className}`).toBeGreaterThanOrEqual(4.5)
    })
  }

  for (const type of ['온라인', '오프라인', '단체'] as const) {
    it(`유형 '${type}' 뱃지가 AA를 넘는다`, () => {
      const className = scheduleTypeClass(type)
      expect(ratioOf(className), `${type}: ${className}`).toBeGreaterThanOrEqual(4.5)
    })
  }

  it('기본값 뱃지도 AA를 넘는다', () => {
    expect(ratioOf(DEFAULT_STATUS_CLASS)).toBeGreaterThanOrEqual(4.5)
  })
})
