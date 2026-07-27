import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import crypto from 'node:crypto'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import type { NextRequest } from 'next/server'

/**
 * 관리자 콘텐츠 API의 응답 계약.
 *
 * 핵심: 저장이 실패한 요청이 2xx로 돌아가면 관리자는 저장됐다고 믿는다.
 * 실패는 반드시 실패로 보여야 하고, 원인별로 상태 코드가 구분돼야 한다.
 */

const SECRET = 'test-admin-secret-value'
const NOW = 1_700_000_000_000

const ENV_KEYS = [
  'ADMIN_SECRET',
  'CONTENT_STORE',
  'NEXT_PUBLIC_SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE_KEY',
  'VERCEL',
  'NODE_ENV',
] as const

let saved: Record<string, string | undefined>
let sandbox: string

function adminToken(): string {
  const ts = String(NOW)
  const sig = crypto.createHmac('sha256', SECRET).update(ts).digest('hex')
  return `${ts}.${sig}`
}

/** Route Handler가 사용하는 최소 요청 객체 (쿠키 + json 본문) */
function makeRequest(options: { authed: boolean; body?: unknown; rawBody?: string }): NextRequest {
  const token = adminToken()
  return {
    cookies: {
      get: (name: string) =>
        name === 'admin-token' && options.authed ? { value: token } : undefined,
    },
    json: async () => {
      if (options.rawBody !== undefined) return JSON.parse(options.rawBody)
      return options.body
    },
  } as unknown as NextRequest
}

const params = (section: string, id?: string) =>
  ({ params: Promise.resolve(id ? { section, id } : { section }) }) as never

const validNotice = {
  category: '공지',
  title: '테스트 공지',
  date: '2026-07-27',
  isNew: false,
}

beforeEach(async () => {
  saved = Object.fromEntries(ENV_KEYS.map((k) => [k, process.env[k]]))
  for (const k of ENV_KEYS) delete process.env[k]
  process.env.ADMIN_SECRET = SECRET

  sandbox = await mkdtemp(path.join(tmpdir(), 'urban-admin-api-'))
  vi.spyOn(process, 'cwd').mockReturnValue(sandbox)
  vi.spyOn(console, 'warn').mockImplementation(() => {})
  vi.spyOn(console, 'error').mockImplementation(() => {})
  vi.useFakeTimers()
  vi.setSystemTime(NOW)
  vi.resetModules()
})

afterEach(async () => {
  for (const [k, v] of Object.entries(saved)) {
    if (v === undefined) delete process.env[k]
    else process.env[k] = v
  }
  vi.useRealTimers()
  vi.restoreAllMocks()
  if (sandbox?.startsWith(tmpdir())) await rm(sandbox, { recursive: true, force: true })
})

describe('인증되지 않은 요청', () => {
  it('POST는 401을 반환하고 저장하지 않는다', async () => {
    const { POST } = await import('@/app/api/admin/[section]/route')
    const res = await POST(makeRequest({ authed: false, body: validNotice }), params('notices'))

    expect(res.status).toBe(401)

    // 정말로 저장되지 않았는지 저장소에서 직접 확인한다
    const store = await import('@/lib/content-store')
    expect(await store.getSectionItems('notices')).toHaveLength(0)
  })

  it('PUT은 401을 반환한다', async () => {
    const { PUT } = await import('@/app/api/admin/[section]/[id]/route')
    const res = await PUT(
      makeRequest({ authed: false, body: { title: 'x' } }),
      params('notices', 'some-id'),
    )
    expect(res.status).toBe(401)
  })

  it('DELETE는 401을 반환한다', async () => {
    const { DELETE } = await import('@/app/api/admin/[section]/[id]/route')
    const res = await DELETE(makeRequest({ authed: false }), params('notices', 'some-id'))
    expect(res.status).toBe(401)
  })

  it('만료된 토큰도 거부한다', async () => {
    vi.setSystemTime(NOW + 3 * 60 * 60 * 1000) // 발급 3시간 뒤 (만료 2시간)
    const { POST } = await import('@/app/api/admin/[section]/route')
    const res = await POST(makeRequest({ authed: true, body: validNotice }), params('notices'))
    expect(res.status).toBe(401)
  })
})

describe('잘못된 입력', () => {
  it('본문이 JSON이 아니면 400을 반환한다', async () => {
    const { POST } = await import('@/app/api/admin/[section]/route')
    const req = {
      cookies: { get: () => ({ value: adminToken() }) },
      json: async () => {
        throw new SyntaxError('Unexpected token')
      },
    } as unknown as NextRequest

    const res = await POST(req, params('notices'))
    expect(res.status).toBe(400)
    await expect(res.json()).resolves.toMatchObject({ error: expect.any(String) })
  })

  it('스키마에 맞지 않는 본문은 400을 반환한다', async () => {
    const { POST } = await import('@/app/api/admin/[section]/route')
    const res = await POST(
      makeRequest({ authed: true, body: { ...validNotice, date: '2026/07/27' } }),
      params('notices'),
    )
    expect(res.status).toBe(400)
  })

  it('정의되지 않은 섹션은 404를 반환한다 (임의 테이블 접근 차단)', async () => {
    const { POST } = await import('@/app/api/admin/[section]/route')
    const res = await POST(makeRequest({ authed: true, body: validNotice }), params('users'))
    expect(res.status).toBe(404)
  })
})

describe('저장소 쓰기 불가 상태 (운영 + 파일 저장소)', () => {
  beforeEach(() => {
    process.env.VERCEL = '1' // 운영 판정 → 파일 저장소 쓰기 차단
  })

  it('POST는 503을 반환하고 2xx로 위장하지 않는다', async () => {
    const { POST } = await import('@/app/api/admin/[section]/route')
    const res = await POST(makeRequest({ authed: true, body: validNotice }), params('notices'))

    expect(res.status).toBe(503)
    expect(res.ok).toBe(false) // 2xx가 아님 — 저장 성공으로 오인될 여지를 없앤다
    const body = (await res.json()) as { error: string; code: string }
    expect(body.code).toBe('CONTENT_STORE_NOT_WRITABLE')
    expect(body.error).toContain('SUPABASE_SERVICE_ROLE_KEY')
  })

  it('PUT도 503을 반환한다', async () => {
    const { PUT } = await import('@/app/api/admin/[section]/[id]/route')
    const res = await PUT(
      makeRequest({ authed: true, body: { title: '수정' } }),
      params('notices', 'some-id'),
    )
    expect(res.status).toBe(503)
    expect((await res.json()).code).toBe('CONTENT_STORE_NOT_WRITABLE')
  })

  it('DELETE도 503을 반환한다', async () => {
    const { DELETE } = await import('@/app/api/admin/[section]/[id]/route')
    const res = await DELETE(makeRequest({ authed: true }), params('notices', 'some-id'))
    expect(res.status).toBe(503)
    expect((await res.json()).code).toBe('CONTENT_STORE_NOT_WRITABLE')
  })

  it('503 응답에 비밀 값이 포함되지 않는다', async () => {
    const secret = 'super-secret-service-role-key'
    process.env.SUPABASE_SERVICE_ROLE_KEY = secret
    process.env.CONTENT_STORE = 'supabase'

    const { POST } = await import('@/app/api/admin/[section]/route')
    const res = await POST(makeRequest({ authed: true, body: validNotice }), params('notices'))

    expect(res.status).toBe(503)
    expect(JSON.stringify(await res.json())).not.toContain(secret)
  })
})

describe('정상 저장 (로컬 파일 저장소)', () => {
  beforeEach(() => {
    process.env.CONTENT_STORE = 'file'
  })

  it('POST는 201과 함께 생성된 항목을 돌려준다', async () => {
    const { POST } = await import('@/app/api/admin/[section]/route')
    const res = await POST(makeRequest({ authed: true, body: validNotice }), params('notices'))

    expect(res.status).toBe(201)
    const body = (await res.json()) as { item: { id: string; title: string } }
    expect(body.item.id).toBeTruthy()
    expect(body.item.title).toBe(validNotice.title)
  })

  it('없는 id를 수정하면 404를 반환한다 (성공으로 처리하지 않는다)', async () => {
    const { PUT } = await import('@/app/api/admin/[section]/[id]/route')
    const res = await PUT(
      makeRequest({ authed: true, body: { title: '수정' } }),
      params('notices', 'does-not-exist'),
    )
    expect(res.status).toBe(404)
  })
})
