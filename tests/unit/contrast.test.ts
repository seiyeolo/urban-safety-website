import { describe, expect, it } from 'vitest'
import {
  contrastRatio,
  isLargeText,
  isTransparent,
  parseRgb,
  relativeLuminance,
  requiredRatio,
} from '../helpers/contrast'

/**
 * WCAG 명암비 계산 검증.
 * E2E 접근성 테스트가 이 계산에 의존하므로, 계산 자체가 맞는지 먼저 보장한다.
 */

const WHITE = [255, 255, 255] as const
const BLACK = [0, 0, 0] as const

describe('parseRgb', () => {
  it('rgb / rgba 문자열을 파싱한다', () => {
    expect(parseRgb('rgb(42, 56, 144)')).toEqual([42, 56, 144])
    expect(parseRgb('rgba(42, 56, 144, 0.5)')).toEqual([42, 56, 144])
    expect(parseRgb('rgb(0 0 0)')).toEqual([0, 0, 0])
  })

  it('파싱할 수 없으면 null을 반환한다 (0,0,0으로 넘겨 오탐을 만들지 않는다)', () => {
    expect(parseRgb('transparent')).toBeNull()
    expect(parseRgb('#2a3890')).toBeNull()
    expect(parseRgb('')).toBeNull()
  })
})

describe('isTransparent', () => {
  it('alpha가 0이거나 transparent면 true', () => {
    expect(isTransparent('transparent')).toBe(true)
    expect(isTransparent('rgba(0, 0, 0, 0)')).toBe(true)
  })

  it('불투명하면 false', () => {
    expect(isTransparent('rgb(255, 255, 255)')).toBe(false)
    expect(isTransparent('rgba(0, 0, 0, 0.5)')).toBe(false)
  })
})

describe('relativeLuminance', () => {
  it('흰색은 1, 검정은 0', () => {
    expect(relativeLuminance([...WHITE])).toBeCloseTo(1, 5)
    expect(relativeLuminance([...BLACK])).toBeCloseTo(0, 5)
  })
})

describe('contrastRatio', () => {
  it('흑백 대비는 21:1 (이론적 최대)', () => {
    expect(contrastRatio([...BLACK], [...WHITE])).toBeCloseTo(21, 2)
  })

  it('같은 색끼리는 1:1', () => {
    expect(contrastRatio([42, 56, 144], [42, 56, 144])).toBeCloseTo(1, 5)
  })

  it('전경·배경 순서를 바꿔도 같은 값', () => {
    const a = contrastRatio([42, 56, 144], [...WHITE])
    const b = contrastRatio([...WHITE], [42, 56, 144])
    expect(a).toBeCloseTo(b, 10)
  })

  // 실제 브랜드 팔레트 — 디자인 결정의 근거가 된 값들이 유지되는지 고정한다
  it.each([
    ['brand-600 인디고 #2a3890 / 흰 배경', [42, 56, 144], 10.16],
    ['cta-700 #c0390c / 흰 배경', [192, 57, 12], 5.48],
    ['cta-500 로고 오렌지 #f15a28 / 흰 배경', [241, 90, 40], 3.37],
    ['accent-400 라임 #bed73a / 흰 배경', [190, 215, 58], 1.62],
  ] as const)('%s ≈ %s:1', (_label, rgb, expected) => {
    expect(contrastRatio([...rgb] as [number, number, number], [...WHITE])).toBeCloseTo(expected, 1)
  })

  it('라임은 흰 배경에서 AA에 한참 못 미친다 (텍스트 사용 금지 근거)', () => {
    expect(contrastRatio([190, 215, 58], [...WHITE])).toBeLessThan(3)
  })

  it('라임도 어두운 브랜드 배경 위에서는 AA를 넘는다', () => {
    expect(contrastRatio([190, 215, 58], [12, 16, 41])).toBeGreaterThan(4.5)
  })
})

describe('isLargeText / requiredRatio', () => {
  it('24px 이상은 굵기와 무관하게 큰 텍스트', () => {
    expect(isLargeText(24, 400)).toBe(true)
    expect(isLargeText(32, 400)).toBe(true)
  })

  it('18.66px 이상이면서 bold일 때만 큰 텍스트', () => {
    expect(isLargeText(18.66, 700)).toBe(true)
    expect(isLargeText(18.66, 400)).toBe(false)
    expect(isLargeText(18, 700)).toBe(false)
  })

  it('일반 텍스트는 4.5:1, 큰 텍스트는 3:1을 요구한다', () => {
    expect(requiredRatio(16, 400)).toBe(4.5)
    expect(requiredRatio(24, 400)).toBe(3)
    expect(requiredRatio(20, 700)).toBe(3)
  })
})
