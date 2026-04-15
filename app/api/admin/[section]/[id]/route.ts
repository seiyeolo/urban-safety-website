import { NextRequest, NextResponse } from 'next/server'

import { isAdminRequest } from '@/lib/admin-auth'
import { deleteSectionItem, updateSectionItem } from '@/lib/content-store'
import type { ContentSection } from '@/lib/content-types'

const SECTIONS: ContentSection[] = ['notices', 'schedules', 'downloads', 'contacts']

function getSection(value: string): ContentSection | null {
  return SECTIONS.includes(value as ContentSection) ? (value as ContentSection) : null
}

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
    const payload = await request.json()
    const item = await updateSectionItem(section, id, payload)
    return NextResponse.json({ item })
  } catch (error) {
    if (error instanceof Error && error.message === 'NOT_FOUND') {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
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
