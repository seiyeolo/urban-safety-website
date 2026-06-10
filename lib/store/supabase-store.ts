import 'server-only'

import { randomUUID } from 'node:crypto'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

import type {
  ContentItemMap,
  ContentSection,
  ContentStore,
} from '@/lib/content-types'

/**
 * Supabase 기반 콘텐츠 저장소 (프로덕션용)
 *
 * - 서버 전용: SUPABASE_SERVICE_ROLE_KEY로 RLS를 우회해 쓰기 수행.
 *   service role 키는 절대 클라이언트(NEXT_PUBLIC_*)로 노출하지 않는다.
 * - 공개 콘텐츠(notices/schedules/downloads)는 RLS에서 anon 읽기 허용,
 *   contacts(PII)는 정책 없음 = service role 외 전면 차단.
 * - 스키마: supabase/migrations/0001_content_store.sql
 */

// 각 섹션의 select 컬럼 — 테이블의 created_at 등 내부 컬럼이 API 응답에
// 섞이지 않도록 명시한다 (camelCase 컬럼은 따옴표 식별자로 생성됨)
const SELECT_COLUMNS: Record<ContentSection, string> = {
  notices: 'id, category, title, date, isNew',
  schedules: 'id, month, date, type, title, seats, href',
  downloads: 'id, category, title, type, size, date, href',
  contacts:
    'id, name, phone, email, inquiryType, title, message, privacyConsent, submittedAt, status',
}

// 공개 페이지·관리자 목록의 정렬 규칙 (file-store와 동일한 결과 순서 유지)
const ORDER_BY: Record<ContentSection, { column: string; ascending: boolean }> = {
  notices: { column: 'date', ascending: false },
  downloads: { column: 'date', ascending: false },
  schedules: { column: 'created_at', ascending: false },
  contacts: { column: 'submittedAt', ascending: false },
}

let cachedClient: SupabaseClient | null = null

export function isSupabaseStoreConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  return Boolean(url && url.startsWith('https://') && serviceKey && serviceKey.length > 20)
}

function getClient(): SupabaseClient {
  if (cachedClient) return cachedClient

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceKey) {
    throw new Error('Supabase 저장소가 설정되지 않았습니다 (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)')
  }

  cachedClient = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
  return cachedClient
}

export async function getSectionItems<TSection extends ContentSection>(
  section: TSection
): Promise<ContentItemMap[TSection][]> {
  const order = ORDER_BY[section]
  const { data, error } = await getClient()
    .from(section)
    .select(SELECT_COLUMNS[section])
    .order(order.column, { ascending: order.ascending })

  if (error) {
    throw new Error(`Supabase ${section} 조회 실패: ${error.message}`)
  }
  return (data ?? []) as unknown as ContentItemMap[TSection][]
}

export async function getContentStore(): Promise<ContentStore> {
  const [notices, schedules, downloads, contacts] = await Promise.all([
    getSectionItems('notices'),
    getSectionItems('schedules'),
    getSectionItems('downloads'),
    getSectionItems('contacts'),
  ])
  return { notices, schedules, downloads, contacts }
}

export async function createSectionItem<TSection extends ContentSection>(
  section: TSection,
  payload: Omit<ContentItemMap[TSection], 'id'>
): Promise<ContentItemMap[TSection]> {
  // 동적 테이블명(from(section))에는 스키마 제네릭이 없어 Record로 단언한다
  const item = { id: randomUUID(), ...payload } as Record<string, unknown>
  const { data, error } = await getClient()
    .from(section)
    .insert(item)
    .select(SELECT_COLUMNS[section])
    .single()

  if (error) {
    throw new Error(`Supabase ${section} 생성 실패: ${error.message}`)
  }
  return data as unknown as ContentItemMap[TSection]
}

export async function updateSectionItem<TSection extends ContentSection>(
  section: TSection,
  id: string,
  payload: Partial<Omit<ContentItemMap[TSection], 'id'>>
): Promise<ContentItemMap[TSection]> {
  const { data, error } = await getClient()
    .from(section)
    .update(payload as Record<string, unknown>)
    .eq('id', id)
    .select(SELECT_COLUMNS[section])
    .maybeSingle()

  if (error) {
    throw new Error(`Supabase ${section} 수정 실패: ${error.message}`)
  }
  if (!data) {
    // file-store와 동일한 에러 계약 — admin API가 404로 매핑한다
    throw new Error('NOT_FOUND')
  }
  return data as unknown as ContentItemMap[TSection]
}

export async function deleteSectionItem<TSection extends ContentSection>(
  section: TSection,
  id: string
): Promise<void> {
  const { error } = await getClient().from(section).delete().eq('id', id)
  if (error) {
    throw new Error(`Supabase ${section} 삭제 실패: ${error.message}`)
  }
}
