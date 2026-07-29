import { z } from 'zod'

import type { ContentSection } from '@/lib/content-types'

// 공통 섹션 Zod 스키마 — POST(create)와 PUT(update) 양쪽에서 공유
export const noticeItemSchema = z.object({
  category: z.string().min(1, '카테고리는 필수입니다'),
  title: z.string().min(1, '제목은 필수입니다').max(200, '제목은 200자를 초과할 수 없습니다'),
  date: z.string().refine(val => /^\d{4}-\d{2}-\d{2}$/.test(val), '날짜 형식이 올바르지 않습니다 (YYYY-MM-DD)'),
  isNew: z.boolean().default(false)
})

/**
 * 연결 경로 검증 — 일정·자료실이 함께 쓴다.
 *
 * 관리자는 '/certificates/voice-phishing' 처럼 짧은 내부 경로를 적는 게 자연스러운데,
 * 예전에는 new URL()만 통과시켜 전체 주소를 강요했다. 링크를 아직 못 정한 경우도
 * 있으므로 빈 값도 받는다.
 *
 * '#'은 일부러 막는다 — 눌러도 아무 데도 가지 않는 링크를 공개 페이지에 내보내느니
 * 비워두는 편이 낫다. 비어 있으면 화면에서 링크 자체가 사라진다.
 */
const hrefSchema = z.string().refine(val => {
  if (val === '') return true
  if (val.startsWith('/')) return true
  try { return Boolean(new URL(val)); } catch { return false; }
}, '비워두거나, 내부 경로(/로 시작) 또는 전체 주소(https://…)를 입력해주세요')

export const scheduleItemSchema = z.object({
  month: z.string().min(1, '월은 필수입니다'),
  date: z.string().min(1, '날짜는 필수입니다'),
  type: z.string().min(1, '타입은 필수입니다'),
  title: z.string().min(1, '제목은 필수입니다').max(200, '제목은 200자를 초과할 수 없습니다'),
  seats: z.string().min(1, '좌석 정보는 필수입니다'),
  href: hrefSchema
})

export const downloadItemSchema = z.object({
  category: z.string().min(1, '카테고리는 필수입니다'),
  title: z.string().min(1, '제목은 필수입니다').max(200, '제목은 200자를 초과할 수 없습니다'),
  type: z.string().min(1, '타입은 필수입니다'),
  size: z.string().min(1, '크기 정보는 필수입니다'),
  date: z.string().refine(val => /^\d{4}-\d{2}-\d{2}$/.test(val), '날짜 형식이 올바르지 않습니다 (YYYY-MM-DD)'),
  href: hrefSchema
})

export const contactItemSchema = z.object({
  name: z.string().min(1, '이름은 필수입니다').max(50, '이름은 50자를 초과할 수 없습니다'),
  phone: z.string().min(1, '전화번호는 필수입니다').refine(val => /^[\d-+().\s]+$/.test(val), '올바른 전화번호를 입력해주세요'),
  email: z.string().email('올바른 이메일 주소를 입력해주세요'),
  inquiryType: z.string().min(1, '문의 유형은 필수입니다'),
  title: z.string().min(1, '제목은 필수입니다').max(200, '제목은 200자를 초과할 수 없습니다'),
  message: z.string().min(1, '메시지는 필수입니다').max(2000, '메시지는 2000자를 초과할 수 없습니다'),
  privacyConsent: z.boolean().refine(val => val === true, '개인정보 수집 동의는 필수입니다'),
  submittedAt: z.string().refine(val => /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(val), '제출 시간 형식이 올바르지 않습니다'),
  status: z.enum(['new', 'in_progress', 'done']).default('new')
})

export const sectionSchemas = {
  notices: noticeItemSchema,
  schedules: scheduleItemSchema,
  downloads: downloadItemSchema,
  contacts: contactItemSchema
} as const

export const SECTIONS: ContentSection[] = ['notices', 'schedules', 'downloads', 'contacts']

export function getSection(value: string): ContentSection | null {
  return SECTIONS.includes(value as ContentSection) ? (value as ContentSection) : null
}
