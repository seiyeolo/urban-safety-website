/**
 * WCAG 2.1 명암비 계산.
 *
 * 이전 구현은 YIQ 밝기(0.299R+0.587G+0.114B) 차이를 임의 임계값과 비교해서,
 * WCAG를 위반하는 조합도 통과시킬 수 있었다. 여기서는 표준 상대휘도와
 * (L1 + 0.05) / (L2 + 0.05) 공식을 그대로 사용한다.
 *
 * 기준: https://www.w3.org/TR/WCAG21/#contrast-minimum
 *   일반 텍스트 AA 4.5:1 / 큰 텍스트(18.66px+bold 또는 24px+) AA 3:1
 */

export type Rgb = [number, number, number]

/** `rgb(r, g, b)` / `rgba(r, g, b, a)` 문자열 파싱 */
export function parseRgb(value: string): Rgb | null {
  const m = value.match(/rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/)
  if (!m) return null
  return [Number(m[1]), Number(m[2]), Number(m[3])]
}

/** 배경이 투명(alpha=0)인지 — 이 경우 조상의 배경을 써야 한다 */
export function isTransparent(value: string): boolean {
  if (value === 'transparent') return true
  const m = value.match(/rgba?\([^)]*,\s*([\d.]+)\s*\)/)
  return m ? Number(m[1]) === 0 : false
}

function channelLuminance(c: number): number {
  const s = c / 255
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
}

/** WCAG 상대 휘도 */
export function relativeLuminance([r, g, b]: Rgb): number {
  return 0.2126 * channelLuminance(r) + 0.7152 * channelLuminance(g) + 0.0722 * channelLuminance(b)
}

/** 두 색의 명암비 (1 ~ 21) */
export function contrastRatio(fg: Rgb, bg: Rgb): number {
  const l1 = relativeLuminance(fg)
  const l2 = relativeLuminance(bg)
  const [light, dark] = l1 >= l2 ? [l1, l2] : [l2, l1]
  return (light + 0.05) / (dark + 0.05)
}

/** WCAG가 '큰 텍스트'로 보는 크기인지 (18.66px 이상 bold, 또는 24px 이상) */
export function isLargeText(fontSizePx: number, fontWeight: number): boolean {
  if (fontSizePx >= 24) return true
  return fontSizePx >= 18.66 && fontWeight >= 700
}

/** 해당 텍스트에 요구되는 AA 최소 명암비 */
export function requiredRatio(fontSizePx: number, fontWeight: number): number {
  return isLargeText(fontSizePx, fontWeight) ? 3 : 4.5
}
