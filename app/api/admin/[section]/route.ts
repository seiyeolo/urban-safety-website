import { NextRequest, NextResponse } from 'next/server'

import { isAdminRequest } from '@/lib/admin-auth'
import { createSectionItem, getSectionItems } from '@/lib/content-store'
import { getSection, sectionSchemas } from '@/lib/admin-schemas'

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ section: string }> }
) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { section: rawSection } = await context.params
  const section = getSection(rawSection)

  if (!section) {
    return NextResponse.json({ error: 'Invalid section' }, { status: 404 })
  }

  const items = await getSectionItems(section)
  return NextResponse.json({ items })
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ section: string }> }
) {
  try {
    if (!isAdminRequest(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { section: rawSection } = await context.params
    const section = getSection(rawSection)

    if (!section) {
      return NextResponse.json({ error: 'Invalid section' }, { status: 404 })
    }

    // 요청 본문 파싱
    let payload: unknown
    try {
      payload = await request.json()
    } catch (error) {
      return NextResponse.json(
        { error: '요청 본문이 올바른 JSON 형식이 아닙니다' },
        { status: 400 }
      )
    }

    // 입력값 검증
    const schema = sectionSchemas[section]
    if (!schema) {
      return NextResponse.json({ error: 'Unsupported section' }, { status: 400 })
    }

    const validationResult = schema.safeParse(payload)
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: '입력값이 올바르지 않습니다',
          details: validationResult.error.message
        },
        { status: 400 }
      )
    }

    const validatedPayload = validationResult.data
    const item = await createSectionItem(section, validatedPayload)
    return NextResponse.json({ item }, { status: 201 })
  } catch (error) {
    console.error('관리자 API 처리 중 오류:', error)
    return NextResponse.json(
      { error: '서버 내부 오류가 발생했습니다' },
      { status: 500 }
    )
  }
}
