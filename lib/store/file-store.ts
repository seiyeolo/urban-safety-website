import 'server-only'

import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { randomUUID } from 'node:crypto'

import type {
  ContactItem,
  ContentItemMap,
  ContentSection,
  ContentStore,
} from '@/lib/content-types'

/**
 * 파일 기반 콘텐츠 저장소 (로컬 개발·임시 운영용)
 *
 * 한계: Vercel 등 서버리스 환경에서는 파일시스템이 읽기 전용/휘발성이라
 * 관리자 CRUD가 동작하지 않는다. 프로덕션에서는 Supabase 저장소를 사용할 것
 * (SUPABASE_SERVICE_ROLE_KEY 설정 시 content-store.ts가 자동 전환).
 */

const DATA_DIR = path.join(process.cwd(), 'data')
const DATA_FILE = path.join(DATA_DIR, 'site-content.json')
// PII(문의자 개인정보)는 공개 콘텐츠와 분리된 파일에 저장 — gitignore 대상
const CONTACTS_FILE = path.join(DATA_DIR, 'contacts.json')

// 빈 초기 상태 — 더미 데이터를 두지 않는다 (신뢰도 이슈: 옛 더미 일정·공지가
// 실제 콘텐츠처럼 노출되는 사고 방지). 콘텐츠는 관리자 페이지에서 등록한다.
const DEFAULT_CONTENT: ContentStore = {
  notices: [],
  schedules: [],
  downloads: [],
  contacts: [],
}

async function ensureDataFile() {
  try {
    await readFile(DATA_FILE, 'utf8')
  } catch {
    await mkdir(DATA_DIR, { recursive: true })
    await writeFile(DATA_FILE, JSON.stringify(DEFAULT_CONTENT, null, 2), 'utf8')
  }
}

async function readContacts(): Promise<ContactItem[]> {
  try {
    const raw = await readFile(CONTACTS_FILE, 'utf8')
    const parsed = JSON.parse(raw) as { contacts?: ContactItem[] } | ContactItem[]
    if (Array.isArray(parsed)) return parsed
    return parsed.contacts ?? []
  } catch {
    return []
  }
}

async function writeContacts(contacts: ContactItem[]) {
  await mkdir(DATA_DIR, { recursive: true })
  await writeFile(CONTACTS_FILE, JSON.stringify({ contacts }, null, 2), 'utf8')
}

export async function getContentStore(): Promise<ContentStore> {
  await ensureDataFile()
  const raw = await readFile(DATA_FILE, 'utf8')
  const parsed = JSON.parse(raw) as Partial<ContentStore>

  // site-content.json에 legacy contacts가 남아있으면 별도 파일로 이관
  const legacyContacts = parsed.contacts && parsed.contacts.length > 0 ? parsed.contacts : []
  const fileContacts = await readContacts()
  const contacts = fileContacts.length > 0 ? fileContacts : legacyContacts

  return {
    notices: parsed.notices ?? [],
    schedules: parsed.schedules ?? [],
    downloads: parsed.downloads ?? [],
    contacts,
  }
}

async function writeContentStore(store: ContentStore) {
  await mkdir(DATA_DIR, { recursive: true })
  // contacts는 별도 파일로 분리 저장 (PII 보호)
  const { contacts, ...publicContent } = store
  await writeFile(DATA_FILE, JSON.stringify({ ...publicContent, contacts: [] }, null, 2), 'utf8')
  await writeContacts(contacts)
}

export async function getSectionItems<TSection extends ContentSection>(
  section: TSection
): Promise<ContentItemMap[TSection][]> {
  const store = await getContentStore()
  const items = [...(store[section] as ContentItemMap[TSection][])]

  if (section === 'notices' || section === 'downloads') {
    items.sort((a, b) => {
      const aDate = 'date' in a ? Date.parse(String(a.date)) : 0
      const bDate = 'date' in b ? Date.parse(String(b.date)) : 0
      return bDate - aDate
    })
  }

  if (section === 'contacts') {
    items.sort((a, b) => {
      const aDate = 'submittedAt' in a ? Date.parse(String(a.submittedAt)) : 0
      const bDate = 'submittedAt' in b ? Date.parse(String(b.submittedAt)) : 0
      return bDate - aDate
    })
  }

  return items
}

export async function createSectionItem<TSection extends ContentSection>(
  section: TSection,
  payload: Omit<ContentItemMap[TSection], 'id'>
): Promise<ContentItemMap[TSection]> {
  const store = await getContentStore()
  const item = { id: randomUUID(), ...payload } as ContentItemMap[TSection]
  store[section] = [item, ...(store[section] as ContentItemMap[TSection][])] as ContentStore[TSection]
  await writeContentStore(store)
  return item
}

export async function updateSectionItem<TSection extends ContentSection>(
  section: TSection,
  id: string,
  payload: Partial<Omit<ContentItemMap[TSection], 'id'>>
): Promise<ContentItemMap[TSection]> {
  const store = await getContentStore()
  const items = store[section] as ContentItemMap[TSection][]
  const index = items.findIndex((item) => item.id === id)

  if (index === -1) {
    throw new Error('NOT_FOUND')
  }

  const updated = { ...items[index], ...payload, id } as ContentItemMap[TSection]
  items[index] = updated
  store[section] = items as ContentStore[TSection]
  await writeContentStore(store)
  return updated
}

export async function deleteSectionItem<TSection extends ContentSection>(
  section: TSection,
  id: string
): Promise<void> {
  const store = await getContentStore()
  const items = store[section] as ContentItemMap[TSection][]
  store[section] = items.filter((item) => item.id !== id) as ContentStore[TSection]
  await writeContentStore(store)
}
