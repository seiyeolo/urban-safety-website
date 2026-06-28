import 'server-only'

import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

/**
 * Rate Limiter — 서버리스 인스턴스 간 공유 가능
 *
 * 동작 방식:
 * - UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN이 설정되어 있으면 → Upstash Redis 사용
 * - 설정 없으면 → 인메모리 폴백 (개발 환경용, 서버리스에서는 미작동)
 *
 * Upstash 설정 방법:
 *   1. https://console.upstash.com/ 가입 → Redis 데이터베이스 생성
 *   2. 생성된 REST API URL과 Token을 .env.local 및 Vercel 환경변수에 추가
 */

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN

const redis = REDIS_URL && REDIS_TOKEN
  ? new Redis({ url: REDIS_URL, token: REDIS_TOKEN })
  : null

export const isRedisConfigured = redis !== null

// 로그인 엔드포인트: 15분 내 5회
export const loginRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, '15 m'),
      analytics: true,
      prefix: 'ratelimit:login',
    })
  : null

// 문의 엔드포인트: 5분 내 5회
export const contactRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, '5 m'),
      analytics: true,
      prefix: 'ratelimit:contact',
    })
  : null

// 인메모리 폴백 — Redis 미설정 시 개발환경 보호
const memoryStore = new Map<string, { count: number; resetTime: number }>()

function memoryCheck(
  key: string,
  max: number,
  windowMs: number
): { success: boolean; remaining: number; reset: number } {
  const now = Date.now()
  const entry = memoryStore.get(key)

  if (!entry || now > entry.resetTime) {
    const resetTime = now + windowMs
    memoryStore.set(key, { count: 1, resetTime })
    return { success: true, remaining: max - 1, reset: resetTime }
  }

  if (entry.count >= max) {
    return { success: false, remaining: 0, reset: entry.resetTime }
  }

  entry.count++
  return { success: true, remaining: max - entry.count, reset: entry.resetTime }
}

interface RateLimitResult {
  success: boolean
  remaining: number
  resetAt: number // Unix timestamp (ms)
  retryAfter?: number // seconds
}

export async function checkLoginLimit(ip: string): Promise<RateLimitResult> {
  if (loginRateLimit) {
    const result = await loginRateLimit.limit(ip)
    return {
      success: result.success,
      remaining: result.remaining,
      resetAt: result.reset,
      retryAfter: result.success ? undefined : Math.ceil((result.reset - Date.now()) / 1000),
    }
  }

  // 폴백: 인메모리
  const mem = memoryCheck(`login:${ip}`, 5, 15 * 60 * 1000)
  return {
    success: mem.success,
    remaining: mem.remaining,
    resetAt: mem.reset,
    retryAfter: mem.success ? undefined : Math.ceil((mem.reset - Date.now()) / 1000),
  }
}

export async function checkContactLimit(ip: string): Promise<RateLimitResult> {
  if (contactRateLimit) {
    const result = await contactRateLimit.limit(ip)
    return {
      success: result.success,
      remaining: result.remaining,
      resetAt: result.reset,
      retryAfter: result.success ? undefined : Math.ceil((result.reset - Date.now()) / 1000),
    }
  }

  const mem = memoryCheck(`contact:${ip}`, 5, 5 * 60 * 1000)
  return {
    success: mem.success,
    remaining: mem.remaining,
    resetAt: mem.reset,
    retryAfter: mem.success ? undefined : Math.ceil((mem.reset - Date.now()) / 1000),
  }
}

export function getClientIp(headers: Headers): string {
  return (
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headers.get('x-real-ip') ||
    'unknown'
  )
}
