import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import type { NextRequest } from 'next/server'

/**
 * 공개 문의 접수 API의 응답 계약.
 *
 * 문의는 시민이 직접 보내는 것이라, 저장에 실패했는데 "접수됐습니다"를 보여주면
 * 답변을 기다리다 아무 연락도 받지 못한다. 실패는 반드시 실패로 응답해야 한다.
 * 동시에 내부 설정 정보는 노출하지 않는다.
 */

const ENV_KEYS = [
  'CONTENT_STORE',
  'NEXT_PUBLIC_SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE_KEY',
  'VERCEL',
  'NODE_ENV',
  'UPSTASH_REDIS_REST_URL',
  'UPSTASH_REDIS_REST_TOKEN',
] as const

let saved: Record<string, string | undefined>
let sandbox: string

const validInquiry = {
  name: '홍길동',
  phone: '010-1234-5678',
  email: 'hong@example.com',
  inquiryType: '교육 문의',
  title: '수강 신청 문의',
  message: '수강 절차를 알고 싶습니다.',
  privacyConsent: true,
}

function makeRequest(body: unknown, options: { malformed?: boolean } = {}): NextRequest {
  return {
    headers: new Headers({ 'x-forwarded-for': '203.0.113.10' }),
    json: async () => {
      if (options.malformed) throw new SyntaxError('Unexpected end of JSON input')
      return body
    },
  } as unknown as NextRequest
}

beforeEach(async () => {
  saved = Object.fromEntries(ENV_KEYS.map((k) => [k, process.env[k]]))
  for (const k of ENV_KEYS) delete process.env[k]

  sandbox = await mkdtemp(path.join(tmpdir(), 'urban-contact-api-'))
  vi.spyOn(process, 'cwd').mockReturnValue(sandbox)
  vi.spyOn(console, 'warn').mockImplementation(() => {})
  vi.spyOn(console, 'error').mockImplementation(() => {})
  vi.resetModules()
})

afterEach(async () => {
  for (const [k, v] of Object.entries(saved)) {
    if (v === undefined) delete process.env[k]
    else process.env[k] = v
  }
  vi.restoreAllMocks()
  if (sandbox?.startsWith(tmpdir())) await rm(sandbox, { recursive: true, force: true })
})

describe('저장 실패 시', () => {
  beforeEach(() => {
    process.env.VERCEL = '1' // 운영 + 파일 저장소 → 쓰기 차단
  })

  it('2xx를 반환하지 않는다 (접수 성공으로 위장 금지)', async () => {
    const { POST } = await import('@/app/api/contact/route')
    const res = await POST(makeRequest(validInquiry))

    expect(res.ok).toBe(false)
    expect(res.status).toBeGreaterThanOrEqual(500)
  })

  it('success: true를 돌려주지 않는다', async () => {
    const { POST } = await import('@/app/api/contact/route')
    const res = await POST(makeRequest(validInquiry))
    const body = (await res.json()) as { success?: boolean; error?: string }

    expect(body.success).toBeUndefined()
    expect(body.error).toBeTruthy()
  })

  it('사용자 응답에 내부 설정 이름·비밀값을 노출하지 않는다', async () => {
    const secret = 'super-secret-service-role-key'
    process.env.SUPABASE_SERVICE_ROLE_KEY = secret

    const { POST } = await import('@/app/api/contact/route')
    const res = await POST(makeRequest(validInquiry))
    const text = JSON.stringify(await res.json())

    expect(text).not.toContain(secret)
    expect(text).not.toContain('SUPABASE_SERVICE_ROLE_KEY')
    expect(text).not.toContain('CONTENT_STORE')
  })
})

describe('잘못된 입력', () => {
  beforeEach(() => {
    process.env.CONTENT_STORE = 'file'
  })

  it('본문이 JSON이 아니면 400을 반환한다', async () => {
    const { POST } = await import('@/app/api/contact/route')
    const res = await POST(makeRequest(null, { malformed: true }))

    expect(res.status).toBe(400)
    expect(res.ok).toBe(false)
  })

  it('필수 항목이 빠지면 400을 반환한다', async () => {
    const { POST } = await import('@/app/api/contact/route')
    const withoutName = { ...validInquiry, name: '' }
    const res = await POST(makeRequest(withoutName))

    expect(res.status).toBe(400)
  })

  it('개인정보 동의가 없으면 400을 반환한다 (법적 요구사항)', async () => {
    const { POST } = await import('@/app/api/contact/route')
    const res = await POST(makeRequest({ ...validInquiry, privacyConsent: false }))

    expect(res.status).toBe(400)
  })
})

describe('정상 접수', () => {
  beforeEach(() => {
    process.env.CONTENT_STORE = 'file'
  })

  it('저장에 성공하면 success를 돌려주고 실제로 저장된다', async () => {
    const { POST } = await import('@/app/api/contact/route')
    const res = await POST(makeRequest(validInquiry))

    expect(res.status).toBe(200)
    await expect(res.json()).resolves.toMatchObject({ success: true })

    // 응답만 믿지 않고 저장소에서 확인한다
    const store = await import('@/lib/content-store')
    const contacts = await store.getSectionItems('contacts')
    expect(contacts).toHaveLength(1)
    expect(contacts[0]).toMatchObject({ name: validInquiry.name, status: 'new' })
  })
})
