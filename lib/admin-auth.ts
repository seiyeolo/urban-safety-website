import type { NextRequest } from 'next/server'
import crypto from 'crypto'

export function isAdminRequest(request: NextRequest): boolean {
  const token = request.cookies.get('admin-token')?.value
  const secret = process.env.ADMIN_SECRET

  if (!token || !secret) return false

  return verifySessionToken(token, secret)
}

function verifySessionToken(token: string, secret: string): boolean {
  const parts = token.split('.')
  if (parts.length !== 2) return false

  const [timestamp, signature] = parts

  // 2시간 만료 체크
  const elapsed = Date.now() - Number(timestamp)
  if (isNaN(elapsed) || elapsed > 2 * 60 * 60 * 1000) return false

  const hmac = crypto.createHmac('sha256', secret)
  hmac.update(timestamp)
  const expected = hmac.digest('hex')

  // 타이밍 공격 방어
  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature, 'hex'),
      Buffer.from(expected, 'hex')
    )
  } catch {
    return false
  }
}
