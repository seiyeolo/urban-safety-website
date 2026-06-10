import 'server-only'

import * as fileStore from '@/lib/store/file-store'
import * as supabaseStore from '@/lib/store/supabase-store'
import type {
  ContactItem,
  ContentItemMap,
  ContentSection,
  ContentStore,
} from '@/lib/content-types'

/**
 * 콘텐츠 저장소 파사드 — 환경에 따라 구현을 자동 선택한다.
 *
 * - SUPABASE_SERVICE_ROLE_KEY + NEXT_PUBLIC_SUPABASE_URL 설정 시 → Supabase (프로덕션)
 * - 미설정 시 → 파일 기반 (로컬 개발 폴백)
 *
 * 서버리스(Vercel 등)에서 파일 폴백으로 뜨면 관리자 CRUD가 저장되지 않으므로
 * 빌드/런타임 로그에 경고를 남긴다. 설정 절차: docs/SETUP_PRODUCTION.md
 */

const useSupabase = supabaseStore.isSupabaseStoreConfigured()

if (!useSupabase && process.env.VERCEL) {
  console.warn(
    '[content-store] ⚠️ 서버리스 환경에서 파일 저장소 폴백으로 동작 중 — ' +
      '관리자 CRUD가 저장되지 않습니다. SUPABASE_SERVICE_ROLE_KEY를 설정하세요 (docs/SETUP_PRODUCTION.md).'
  )
}

const store = useSupabase ? supabaseStore : fileStore

export async function getContentStore(): Promise<ContentStore> {
  return store.getContentStore()
}

export async function getSectionItems<TSection extends ContentSection>(
  section: TSection
): Promise<ContentItemMap[TSection][]> {
  return store.getSectionItems(section)
}

export async function createSectionItem<TSection extends ContentSection>(
  section: TSection,
  payload: Omit<ContentItemMap[TSection], 'id'>
): Promise<ContentItemMap[TSection]> {
  return store.createSectionItem(section, payload)
}

export async function updateSectionItem<TSection extends ContentSection>(
  section: TSection,
  id: string,
  payload: Partial<Omit<ContentItemMap[TSection], 'id'>>
): Promise<ContentItemMap[TSection]> {
  return store.updateSectionItem(section, id, payload)
}

export async function deleteSectionItem<TSection extends ContentSection>(
  section: TSection,
  id: string
): Promise<void> {
  return store.deleteSectionItem(section, id)
}

export async function createContactInquiry(
  payload: Omit<ContactItem, 'id' | 'submittedAt' | 'status'>
) {
  return store.createSectionItem('contacts', {
    ...payload,
    submittedAt: new Date().toISOString(),
    status: 'new',
  })
}
