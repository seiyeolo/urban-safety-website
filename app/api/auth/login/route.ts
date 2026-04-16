import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import crypto from 'crypto'

function createSessionToken(secret: string): string {
  const timestamp = Date.now().toString()
  const hmac = crypto.createHmac('sha256', secret)
  hmac.update(timestamp)
  const signature = hmac.digest('hex')
  return `${timestamp}.${signature}`
}

export function verifySessionToken(token: string, secret: string): boolean {
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

export async function POST(request: Request) {
  try {
    const { password } = await request.json()

    // 입력 검증
    if (!password || typeof password !== 'string' || password.length > 128) {
      return NextResponse.json(
        { error: '비밀번호를 입력해주세요.' },
        { status: 400 }
      )
    }

    // 환경변수 검증
    const adminPassword = process.env.ADMIN_PASSWORD
    const adminSecret = process.env.ADMIN_SECRET
    if (!adminPassword || !adminSecret) {
      console.error('ADMIN_PASSWORD 또는 ADMIN_SECRET 환경변수가 설정되지 않았습니다.')
      return NextResponse.json(
        { error: '서버 설정 오류입니다.' },
        { status: 500 }
      )
    }

    // 비밀번호 비교
    let isValidPassword = false

    if (adminPassword.startsWith('$2b$') || adminPassword.startsWith('$2a$')) {
      // ADMIN_PASSWORD가 bcrypt 해시인 경우 (권장)
      isValidPassword = await bcrypt.compare(password, adminPassword)
    } else {
      // ADMIN_PASSWORD가 평문인 경우 (호환성 — 해시로 전환 권장)
      isValidPassword = password === adminPassword
    }

    if (!isValidPassword) {
      return NextResponse.json(
        { error: '비밀번호가 올바르지 않습니다.' },
        { status: 401 }
      )
    }

    // HMAC 서명 세션 토큰 생성 (시크릿 원값 노출 방지)
    const sessionToken = createSessionToken(adminSecret)

    const response = NextResponse.json({ success: true })
    response.cookies.set('admin-token', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 2, // 2시간
      path: '/',
    })

    return response
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('로그인 처리 중 오류:', message)
    return NextResponse.json({ error: '요청을 처리할 수 없습니다.' }, { status: 500 })
  }
}
