import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

export async function POST(request: Request) {
  try {
    const { password } = await request.json()

    // 입력 검증
    if (!password || typeof password !== 'string') {
      return NextResponse.json(
        { error: '비밀번호를 입력해주세요.' },
        { status: 400 }
      )
    }

    // 환경변수 검증
    const adminPassword = process.env.ADMIN_PASSWORD
    if (!adminPassword) {
      console.error('ADMIN_PASSWORD 환경변수가 설정되지 않았습니다.')
      return NextResponse.json(
        { error: '서버 설정 오류입니다.' },
        { status: 500 }
      )
    }

    // bcrypt로 비밀번호 해싱하여 비교
    const saltRounds = 12
    const hashedAdminPassword = await bcrypt.hash(adminPassword, saltRounds)
    const isValidPassword = await bcrypt.compare(password, hashedAdminPassword)

    if (!isValidPassword) {
      return NextResponse.json(
        { error: '비밀번호가 올바르지 않습니다.' },
        { status: 401 }
      )
    }

    const response = NextResponse.json({ success: true })
    response.cookies.set('admin-token', process.env.ADMIN_SECRET!, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 2, // 2시간 (보안 강화)
      path: '/',
    })

    return response
  } catch (error) {
    console.error('로그인 처리 중 오류:', error)
    return NextResponse.json({ error: '요청을 처리할 수 없습니다.' }, { status: 500 })
  }
}
