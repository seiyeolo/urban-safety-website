import { describe, expect, it } from 'vitest'
import {
  contactItemSchema,
  downloadItemSchema,
  getSection,
  noticeItemSchema,
  scheduleItemSchema,
  sectionSchemas,
  SECTIONS,
} from '@/lib/admin-schemas'

/** 관리자 콘텐츠 입력 검증 계약 — 외부 입력이 저장소에 닿기 전 마지막 방어선 */

const validNotice = {
  category: '공지',
  title: '2026년 상반기 교육 일정 안내',
  date: '2026-03-15',
}

const validContact = {
  name: '홍길동',
  phone: '010-1234-5678',
  email: 'hong@example.com',
  inquiryType: '교육 문의',
  title: '수강 신청 문의',
  message: '수강 신청 절차를 알고 싶습니다.',
  privacyConsent: true,
  submittedAt: '2026-07-26T12:00:00',
}

describe('noticeItemSchema', () => {
  it('정상 입력을 통과시키고 isNew 기본값을 채운다', () => {
    const parsed = noticeItemSchema.parse(validNotice)
    expect(parsed.isNew).toBe(false)
    expect(parsed.title).toBe(validNotice.title)
  })

  it('필수 필드가 비면 거부한다', () => {
    expect(noticeItemSchema.safeParse({ ...validNotice, category: '' }).success).toBe(false)
    expect(noticeItemSchema.safeParse({ ...validNotice, title: '' }).success).toBe(false)
  })

  it('제목 길이 경계를 지킨다 (200 통과 / 201 거부)', () => {
    expect(noticeItemSchema.safeParse({ ...validNotice, title: 'ㄱ'.repeat(200) }).success).toBe(true)
    expect(noticeItemSchema.safeParse({ ...validNotice, title: 'ㄱ'.repeat(201) }).success).toBe(false)
  })

  it.each(['2026/03/15', '26-03-15', '2026-3-5', '', 'yyyy-mm-dd'])(
    '날짜 형식이 YYYY-MM-DD가 아니면 거부한다: %s',
    (date) => {
      expect(noticeItemSchema.safeParse({ ...validNotice, date }).success).toBe(false)
    },
  )

  it('타입이 다르면 거부한다', () => {
    expect(noticeItemSchema.safeParse({ ...validNotice, title: 123 }).success).toBe(false)
    expect(noticeItemSchema.safeParse({ ...validNotice, isNew: 'yes' }).success).toBe(false)
  })
})

describe('scheduleItemSchema', () => {
  const valid = {
    month: '3월',
    date: '2026-03-15',
    type: '온라인',
    title: '보이스피싱 예방지도사 6기',
    seats: '20석',
    href: 'https://example.com/apply',
  }

  it('정상 입력을 통과시킨다', () => {
    expect(scheduleItemSchema.safeParse(valid).success).toBe(true)
  })

  it.each(['not-a-url', '/relative/path', '', 'example.com'])(
    '절대 URL이 아니면 거부한다: %s',
    (href) => {
      expect(scheduleItemSchema.safeParse({ ...valid, href }).success).toBe(false)
    },
  )
})

describe('downloadItemSchema', () => {
  const valid = {
    category: '교육자료',
    title: '보이스피싱 예방 가이드',
    type: 'PDF',
    size: '2.4MB',
    date: '2026-07-01',
    href: 'https://example.com/file.pdf',
  }

  it('정상 입력을 통과시킨다', () => {
    expect(downloadItemSchema.safeParse(valid).success).toBe(true)
  })

  it('필수 필드 누락을 거부한다', () => {
    const withoutSize = { ...valid } as Partial<typeof valid>
    delete withoutSize.size
    expect(downloadItemSchema.safeParse(withoutSize).success).toBe(false)
  })
})

describe('contactItemSchema', () => {
  it('정상 입력을 통과시키고 status 기본값을 new로 채운다', () => {
    const parsed = contactItemSchema.parse(validContact)
    expect(parsed.status).toBe('new')
  })

  it('개인정보 동의가 false면 거부한다 (법적 요구사항)', () => {
    expect(contactItemSchema.safeParse({ ...validContact, privacyConsent: false }).success).toBe(false)
  })

  it.each(['not-an-email', 'a@', '@b.com', ''])('이메일 형식이 아니면 거부한다: %s', (email) => {
    expect(contactItemSchema.safeParse({ ...validContact, email }).success).toBe(false)
  })

  it.each(['010-1234-5678', '01012345678', '+82 10 1234 5678', '(042) 254-8060'])(
    '허용된 전화번호 표기를 통과시킨다: %s',
    (phone) => {
      expect(contactItemSchema.safeParse({ ...validContact, phone }).success).toBe(true)
    },
  )

  it('전화번호에 문자가 섞이면 거부한다', () => {
    expect(contactItemSchema.safeParse({ ...validContact, phone: '010-abcd-5678' }).success).toBe(false)
  })

  it('이름 길이 경계를 지킨다 (50 통과 / 51 거부)', () => {
    expect(contactItemSchema.safeParse({ ...validContact, name: '가'.repeat(50) }).success).toBe(true)
    expect(contactItemSchema.safeParse({ ...validContact, name: '가'.repeat(51) }).success).toBe(false)
  })

  it('메시지 길이 경계를 지킨다 (2000 통과 / 2001 거부)', () => {
    expect(contactItemSchema.safeParse({ ...validContact, message: 'a'.repeat(2000) }).success).toBe(true)
    expect(contactItemSchema.safeParse({ ...validContact, message: 'a'.repeat(2001) }).success).toBe(false)
  })

  it('status는 정의된 값만 허용한다', () => {
    expect(contactItemSchema.safeParse({ ...validContact, status: 'done' }).success).toBe(true)
    expect(contactItemSchema.safeParse({ ...validContact, status: 'deleted' }).success).toBe(false)
  })

  it('제출 시각이 ISO 형식이 아니면 거부한다', () => {
    expect(contactItemSchema.safeParse({ ...validContact, submittedAt: '2026-07-26' }).success).toBe(false)
  })
})

describe('getSection', () => {
  it.each(SECTIONS)('정의된 섹션 %s은 그대로 반환한다', (section) => {
    expect(getSection(section)).toBe(section)
  })

  it.each(['users', 'admin', '', 'NOTICES', '../etc/passwd'])(
    '정의되지 않은 값 %s은 null을 반환한다 (임의 섹션 접근 차단)',
    (value) => {
      expect(getSection(value)).toBeNull()
    },
  )
})

describe('sectionSchemas', () => {
  it('모든 섹션에 대응하는 스키마가 있다', () => {
    for (const section of SECTIONS) {
      expect(sectionSchemas[section]).toBeDefined()
    }
  })
})
