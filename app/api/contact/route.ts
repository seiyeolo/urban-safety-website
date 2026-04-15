import { NextRequest, NextResponse } from 'next/server'

import { createContactInquiry } from '@/lib/content-store'

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json()

    if (!payload.name || !payload.phone || !payload.inquiryType || !payload.title || !payload.message) {
      return NextResponse.json(
        { error: '필수 항목을 모두 입력해주세요.' },
        { status: 400 }
      )
    }

    if (!payload.privacyConsent) {
      return NextResponse.json(
        { error: '개인정보처리방침 동의가 필요합니다.' },
        { status: 400 }
      )
    }

    await createContactInquiry({
      name: payload.name,
      phone: payload.phone,
      email: payload.email ?? '',
      inquiryType: payload.inquiryType,
      title: payload.title,
      message: payload.message,
      privacyConsent: Boolean(payload.privacyConsent),
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: '문의 접수 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
