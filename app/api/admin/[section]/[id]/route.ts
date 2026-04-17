import { NextRequest, NextResponse } from 'next/server'

import { isAdminRequest } from '@/lib/admin-auth'
import { deleteSectionItem, updateSectionItem } from '@/lib/content-store'
import { getSection, sectionSchemas } from '@/lib/admin-schemas'

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ section: string; id: string }> }
) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { section: rawSection, id } = await context.params
  const section = getSection(rawSection)

  if (!section) {
    return NextResponse.json({ error: 'Invalid section' }, { status: 404 })
  }

  try {
    let payload: unknown
    try {
      payload = await request.json()
    } catch {
      return NextResponse.json(
        { error: '요청 본문이 올바른 JSON 형식이 아닙니다' },
        { status: 400 }
      )
    }

    // Partial 스키마로 검증 — 업데이트 시 일부 필드만 전달될 수 있음
    const schema = sectionSchemas[section]
    const validationResult = schema.partial().safeParse(payload)
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: '입력값이 올바르지 않습니다',
          details: validationResult.error.message,
        },
        { status: 400 }
      )
    }

    const item = await updateSectionItem(section, id, validationResult.data)
    return NextResponse.json({ item })
  } catch (error) {
    if (error instanceof Error && error.message === 'NOT_FOUND') {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    console.error('관리자 PUT 처리 중 오류:', error)
    return NextResponse.json({ error: 'Update failed' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ section: string; id: string }> }
) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { section: rawSection, id } = await context.params
  const section = getSection(rawSection)

  if (!section) {
    return NextResponse.json({ error: 'Invalid section' }, { status: 404 })
  }

  await deleteSectionItem(section, id)
  return NextResponse.json({ success: true })
}
