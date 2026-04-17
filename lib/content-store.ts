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

const DATA_DIR = path.join(process.cwd(), 'data')
const DATA_FILE = path.join(DATA_DIR, 'site-content.json')
// PII(문의자 개인정보)는 공개 콘텐츠와 분리된 파일에 저장 — gitignore 대상
const CONTACTS_FILE = path.join(DATA_DIR, 'contacts.json')

const DEFAULT_CONTENT: ContentStore = {
  notices: [
    { id: 'notice-1', category: '공지', title: '2024년 5월 교육 일정 안내', date: '2024-04-25', isNew: true },
    { id: 'notice-2', category: '공지', title: '보이스피싱 예방지도사 5기 수강생 모집', date: '2024-04-20', isNew: true },
    { id: 'notice-3', category: '공지', title: '생활안전지도사 4기 합격자 발표', date: '2024-04-15', isNew: false },
    { id: 'notice-4', category: '공지', title: '개인정보처리방침 개정 안내', date: '2024-04-01', isNew: false },
    { id: 'notice-5', category: '공지', title: '2024년 기관·단체 교육 신청 접수', date: '2024-03-20', isNew: false },
  ],
  schedules: [
    { id: 'schedule-1', month: '2024년 5월', date: '05.10 (금)', type: '온라인', title: '보이스피싱 예방지도사 5기 개강', seats: '모집 중', href: '/certificates/voice-phishing' },
    { id: 'schedule-2', month: '2024년 5월', date: '05.17 (금)', type: '온라인', title: '생활안전지도사 5기 개강', seats: '모집 중', href: '/certificates/life-safety' },
    { id: 'schedule-3', month: '2024년 5월', date: '05.25 (토)', type: '오프라인', title: '생활안전 특강 – 대전 서구 용문동', seats: '잔여 5석', href: '' },
    { id: 'schedule-4', month: '2024년 6월', date: '06.07 (금)', type: '온라인', title: '보이스피싱 예방지도사 6기 개강', seats: '예정', href: '/certificates/voice-phishing' },
    { id: 'schedule-5', month: '2024년 6월', date: '06.15 (토)', type: '오프라인', title: '청소년 안전체험 교육 – 대전 중구', seats: '예정', href: '' },
    { id: 'schedule-6', month: '2024년 6월', date: '06.28 (금)', type: '온라인', title: '생활안전지도사 6기 개강', seats: '예정', href: '/certificates/life-safety' },
  ],
  downloads: [
    { id: 'download-1', category: '교육 자료', title: '보이스피싱 예방 핵심 체크리스트', type: 'PDF', size: '1.2MB', date: '2024-04-01', href: '#' },
    { id: 'download-2', category: '교육 자료', title: '생활안전 예방 가이드북', type: 'PDF', size: '3.5MB', date: '2024-03-15', href: '#' },
    { id: 'download-3', category: '교육 자료', title: '보이스피싱 사례 분석 자료 (2024)', type: 'PDF', size: '2.1MB', date: '2024-03-01', href: '#' },
    { id: 'download-4', category: '홍보 자료', title: '센터 소개 리플렛', type: 'PDF', size: '0.8MB', date: '2024-02-20', href: '#' },
    { id: 'download-5', category: '서식', title: '단체교육 신청서 양식', type: 'HWP', size: '0.3MB', date: '2024-02-10', href: '#' },
    { id: 'download-6', category: '서식', title: '수료증 재발급 신청서', type: 'HWP', size: '0.2MB', date: '2024-01-15', href: '#' },
    { id: 'download-7', category: '서식', title: '자격증 재발급 신청서', type: 'HWP', size: '0.2MB', date: '2024-01-15', href: '#' },
    { id: 'download-8', category: '기타', title: '2024년 교육 일정표', type: 'PDF', size: '0.5MB', date: '2024-01-02', href: '#' },
  ],
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
    notices: parsed.notices ?? DEFAULT_CONTENT.notices,
    schedules: parsed.schedules ?? DEFAULT_CONTENT.schedules,
    downloads: parsed.downloads ?? DEFAULT_CONTENT.downloads,
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

export async function createContactInquiry(
  payload: Omit<ContactItem, 'id' | 'submittedAt' | 'status'>
) {
  return createSectionItem('contacts', {
    ...payload,
    submittedAt: new Date().toISOString(),
    status: 'new',
  })
}
