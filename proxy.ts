import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

async function verifyTokenEdge(token: string, secret: string): Promise<boolean> {
  const parts = token.split('.')
  if (parts.length !== 2) return false

  const [timestamp, signature] = parts

  // 2시간 만료 체크
  const elapsed = Date.now() - Number(timestamp)
  if (isNaN(elapsed) || elapsed > 2 * 60 * 60 * 1000) return false

  // Web Crypto API로 HMAC 검증 (Edge Runtime 호환)
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(timestamp))
  const expected = Array.from(new Uint8Array(sig))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')

  // 길이가 다르면 즉시 실패
  if (signature.length !== expected.length) return false

  // 타이밍 공격 방어
  let mismatch = 0
  for (let i = 0; i < signature.length; i++) {
    mismatch |= signature.charCodeAt(i) ^ expected.charCodeAt(i)
  }
  return mismatch === 0
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // /admin/* 페이지 보호 (login 페이지는 제외)
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const token = request.cookies.get('admin-token')?.value
    const secret = process.env.ADMIN_SECRET

    if (!token || !secret || !(await verifyTokenEdge(token, secret))) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
