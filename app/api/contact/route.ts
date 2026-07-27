import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createContactInquiry } from '@/lib/content-store'
import { checkContactLimit, getClientIp } from '@/lib/rate-limit'

// Zod 스키마 검증
const contactSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요.').max(50, '이름은 50자 이내로 입력해주세요.'),
  phone: z.string().min(1, '연락처를 입력해주세요.').max(20, '연락처는 20자 이내로 입력해주세요.'),
  email: z.string().max(100).optional().default(''),
  inquiryType: z.string().min(1, '문의 유형을 선택해주세요.').max(50),
  title: z.string().min(1, '제목을 입력해주세요.').max(200, '제목은 200자 이내로 입력해주세요.'),
  message: z.string().min(1, '내용을 입력해주세요.').max(5000, '내용은 5000자 이내로 입력해주세요.'),
  privacyConsent: z.literal(true, { message: '개인정보처리방침 동의가 필요합니다.' }),
})

export async function POST(request: NextRequest) {
  try {
    // Rate limiting — Upstash Redis 기반 (서버리스 간 공유)
    const ip = getClientIp(request.headers)
    const rate = await checkContactLimit(ip)
    if (!rate.success) {
      return NextResponse.json(
        { error: `너무 많은 요청입니다. ${rate.retryAfter}초 후에 다시 시도해주세요.` },
        { status: 429, headers: { 'Retry-After': String(rate.retryAfter ?? 300) } }
      )
    }

    // 본문 파싱 실패는 클라이언트 오류(400)다.
    // 바깥 catch에 맡기면 서버 오류(500)로 뭉뚱그려져 원인을 알 수 없다.
    let payload: unknown
    try {
      payload = await request.json()
    } catch {
      return NextResponse.json(
        { error: '요청 본문이 올바른 JSON 형식이 아닙니다.' },
        { status: 400 }
      )
    }

    // Zod 스키마 검증
    const result = contactSchema.safeParse(payload)
    if (!result.success) {
      const firstError = result.error.issues[0]?.message || '입력값이 올바르지 않습니다.'
      return NextResponse.json(
        { error: firstError },
        { status: 400 }
      )
    }

    const validated = result.data

    await createContactInquiry({
      name: validated.name,
      phone: validated.phone,
      email: validated.email,
      inquiryType: validated.inquiryType,
      title: validated.title,
      message: validated.message,
      privacyConsent: validated.privacyConsent,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    // 공개 API이므로 사용자에게는 내부 설정을 노출하지 않는다.
    // 다만 운영자가 원인을 진단할 수 있도록 서버 로그에는 남긴다.
    console.error('[contact API] 문의 저장 실패:', error)
    return NextResponse.json(
      { error: '문의 접수 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
