import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import crypto from 'node:crypto'
import type { NextRequest } from 'next/server'
import { isAdminRequest } from '@/lib/admin-auth'

/**
 * 관리자 세션 토큰 검증 계약.
 * 토큰 형식은 `<timestamp>.<hmac-sha256(timestamp, secret)>` 이며 2시간 후 만료된다.
 */

const SECRET = 'test-admin-secret-value'
const NOW = 1_700_000_000_000 // 고정 기준 시각 (테스트 재현성)

function sign(timestamp: number | string, secret = SECRET): string {
  return crypto.createHmac('sha256', secret).update(String(timestamp)).digest('hex')
}

function tokenFor(timestamp: number | string, secret = SECRET): string {
  return `${timestamp}.${sign(timestamp, secret)}`
}

/** admin-token 쿠키만 들고 있는 최소 요청 객체 */
function requestWithToken(token?: string): NextRequest {
  return {
    cookies: {
      get: (name: string) => (name === 'admin-token' && token ? { value: token } : undefined),
    },
  } as unknown as NextRequest
}

beforeEach(() => {
  vi.useFakeTimers()
  vi.setSystemTime(NOW)
  process.env.ADMIN_SECRET = SECRET
})

afterEach(() => {
  vi.useRealTimers()
  delete process.env.ADMIN_SECRET
})

describe('isAdminRequest', () => {
  it('유효한 서명과 만료 전 타임스탬프면 통과한다', () => {
    expect(isAdminRequest(requestWithToken(tokenFor(NOW)))).toBe(true)
  })

  it('만료 직전(2시간 - 1초)은 통과한다', () => {
    const issued = NOW - (2 * 60 * 60 * 1000 - 1000)
    expect(isAdminRequest(requestWithToken(tokenFor(issued)))).toBe(true)
  })

  it('만료된 토큰(2시간 초과)은 거부한다', () => {
    const issued = NOW - (2 * 60 * 60 * 1000 + 1000)
    expect(isAdminRequest(requestWithToken(tokenFor(issued)))).toBe(false)
  })

  it('서명이 변조되면 거부한다', () => {
    const valid = sign(NOW)
    const tampered = valid.slice(0, -2) + (valid.endsWith('00') ? '11' : '00')
    expect(isAdminRequest(requestWithToken(`${NOW}.${tampered}`))).toBe(false)
  })

  it('다른 secret으로 서명한 토큰은 거부한다', () => {
    expect(isAdminRequest(requestWithToken(tokenFor(NOW, 'attacker-secret')))).toBe(false)
  })

  it('타임스탬프만 바꾸고 서명을 그대로 두면 거부한다', () => {
    expect(isAdminRequest(requestWithToken(`${NOW - 1000}.${sign(NOW)}`))).toBe(false)
  })

  it('쿠키가 없으면 거부한다', () => {
    expect(isAdminRequest(requestWithToken(undefined))).toBe(false)
  })

  it('ADMIN_SECRET이 설정되지 않으면 거부한다', () => {
    delete process.env.ADMIN_SECRET
    expect(isAdminRequest(requestWithToken(tokenFor(NOW)))).toBe(false)
  })

  describe('형식이 깨진 토큰', () => {
    const malformed: Array<[string, string]> = [
      ['구분자가 없음', 'no-separator'],
      ['구분자가 두 개', `${NOW}.${sign(NOW)}.extra`],
      ['서명이 비어 있음', `${NOW}.`],
      ['타임스탬프가 숫자가 아님', `not-a-number.${sign('not-a-number')}`],
      ['서명이 hex가 아님', `${NOW}.zzzz`],
      ['빈 문자열', ''],
    ]

    it.each(malformed)('%s → 거부', (_label, token) => {
      expect(isAdminRequest(requestWithToken(token))).toBe(false)
    })
  })

  it('길이가 다른 서명에도 예외 없이 거부한다 (timingSafeEqual 방어)', () => {
    expect(isAdminRequest(requestWithToken(`${NOW}.abcd`))).toBe(false)
  })
})
