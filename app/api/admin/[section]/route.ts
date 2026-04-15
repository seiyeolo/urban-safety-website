import { NextRequest, NextResponse } from 'next/server'

import { isAdminRequest } from '@/lib/admin-auth'
import { createSectionItem, getSectionItems } from '@/lib/content-store'
import type { ContentSection } from '@/lib/content-types'

const SECTIONS: ContentSection[] = ['notices', 'schedules', 'downloads', 'contacts']

function getSection(value: string): ContentSection | null {
  return SECTIONS.includes(value as ContentSection) ? (value as ContentSection) : null
}

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
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { section: rawSection } = await context.params
  const section = getSection(rawSection)

  if (!section) {
    return NextResponse.json({ error: 'Invalid section' }, { status: 404 })
  }

  const payload = await request.json()
  const item = await createSectionItem(section, payload)
  return NextResponse.json({ item }, { status: 201 })
}
