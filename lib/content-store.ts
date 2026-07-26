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
 * 콘텐츠 저장소 파사드.
 *
 * 저장소 선택 우선순위
 *  1) CONTENT_STORE 환경 변수 (supabase | file) — 명시적 선택
 *  2) Supabase 설정이 갖춰져 있으면 supabase
 *  3) 그 외에는 file (로컬 개발용)
 *
 * ⚠️ 운영(서버리스) 환경의 파일시스템은 휘발성이다. 파일 저장소로 쓰기를 허용하면
 * 관리자에게 "저장 완료"를 보여준 뒤 재배포·다른 인스턴스에서 데이터가 사라진다.
 * 그래서 운영에서 파일 저장소가 선택된 경우 **쓰기만 차단**한다.
 * (읽기는 막지 않는다 — 설정 실수로 공개 사이트 전체가 내려가는 것이 더 큰 사고다.)
 *
 * 설정 절차: docs/SETUP_PRODUCTION.md
 */

export type ContentStoreMode = 'supabase' | 'file'

/** 서버리스/운영 런타임 판별 */
function isProductionRuntime(): boolean {
  return Boolean(process.env.VERCEL) || process.env.NODE_ENV === 'production'
}

/** 빠진 설정의 '이름'만 반환한다. 값은 절대 노출하지 않는다. */
export function missingSupabaseConfig(): string[] {
  const missing: string[] = []
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) missing.push('NEXT_PUBLIC_SUPABASE_URL')
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) missing.push('SUPABASE_SERVICE_ROLE_KEY')
  return missing
}

export function resolveStoreMode(): ContentStoreMode {
  const explicit = process.env.CONTENT_STORE?.trim().toLowerCase()
  if (explicit === 'supabase' || explicit === 'file') return explicit
  return supabaseStore.isSupabaseStoreConfigured() ? 'supabase' : 'file'
}

/** 쓰기가 허용되지 않는 상태에서 저장을 시도했을 때 던진다. */
export class ContentStoreWriteError extends Error {
  readonly code = 'CONTENT_STORE_NOT_WRITABLE'

  constructor(message: string) {
    super(message)
    this.name = 'ContentStoreWriteError'
  }
}

/**
 * 현재 설정으로 쓰기가 가능한지 판정한다.
 * 저장이 조용히 유실되는 경로를 모두 막는 것이 목적이다.
 */
export function checkWritable(): { writable: true } | { writable: false; reason: string } {
  const mode = resolveStoreMode()

  if (mode === 'supabase') {
    const missing = missingSupabaseConfig()
    if (missing.length > 0) {
      return {
        writable: false,
        reason: `Supabase 저장소가 선택되었지만 필수 설정이 없습니다: ${missing.join(', ')}. docs/SETUP_PRODUCTION.md를 확인하세요.`,
      }
    }
    return { writable: true }
  }

  if (isProductionRuntime()) {
    return {
      writable: false,
      reason:
        '운영 환경에서는 파일 저장소에 쓸 수 없습니다. 서버리스 파일시스템은 휘발성이라 저장한 내용이 사라집니다. ' +
        `Supabase 설정(${['NEXT_PUBLIC_SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY'].join(', ')})을 등록하세요.`,
    }
  }

  return { writable: true }
}

function assertWritable(): void {
  const result = checkWritable()
  if (!result.writable) throw new ContentStoreWriteError(result.reason)
}

/** 저장소 구현은 호출 시점에 고른다 (테스트에서 환경 변수를 바꿔 검증할 수 있도록) */
function activeStore() {
  return resolveStoreMode() === 'supabase' ? supabaseStore : fileStore
}

// 설정 실수를 배포 로그에서 바로 알 수 있게 경고를 남긴다 (값은 출력하지 않음)
const startupCheck = checkWritable()
if (!startupCheck.writable) {
  console.warn(`[content-store] ⚠️ 쓰기 불가 상태 — ${startupCheck.reason}`)
}

/* ── 읽기: 항상 허용 ── */

export async function getContentStore(): Promise<ContentStore> {
  return activeStore().getContentStore()
}

export async function getSectionItems<TSection extends ContentSection>(
  section: TSection
): Promise<ContentItemMap[TSection][]> {
  return activeStore().getSectionItems(section)
}

/* ── 쓰기: 유실 가능한 설정에서는 차단 ── */

export async function createSectionItem<TSection extends ContentSection>(
  section: TSection,
  payload: Omit<ContentItemMap[TSection], 'id'>
): Promise<ContentItemMap[TSection]> {
  assertWritable()
  return activeStore().createSectionItem(section, payload)
}

export async function updateSectionItem<TSection extends ContentSection>(
  section: TSection,
  id: string,
  payload: Partial<Omit<ContentItemMap[TSection], 'id'>>
): Promise<ContentItemMap[TSection]> {
  assertWritable()
  return activeStore().updateSectionItem(section, id, payload)
}

export async function deleteSectionItem<TSection extends ContentSection>(
  section: TSection,
  id: string
): Promise<void> {
  assertWritable()
  return activeStore().deleteSectionItem(section, id)
}

export async function createContactInquiry(
  payload: Omit<ContactItem, 'id' | 'submittedAt' | 'status'>
) {
  assertWritable()
  return activeStore().createSectionItem('contacts', {
    ...payload,
    submittedAt: new Date().toISOString(),
    status: 'new',
  })
}
