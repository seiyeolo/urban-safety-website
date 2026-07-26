import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'

/**
 * 저장소 선택과 쓰기 가능 여부 계약.
 *
 * 핵심 규칙: 저장이 유실될 수 있는 설정에서는 "저장 성공"을 만들지 않는다.
 * 서버리스 파일시스템은 휘발성이라, 운영에서 파일 저장소로 쓰면
 * 관리자에게 성공을 보여준 뒤 재배포 시 데이터가 사라진다.
 */

const ENV_KEYS = [
  'CONTENT_STORE',
  'NEXT_PUBLIC_SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE_KEY',
  'VERCEL',
  'NODE_ENV',
] as const

let saved: Record<string, string | undefined>
let sandbox: string

/** 모듈이 환경 변수를 읽는 시점이 있으므로 매번 새로 import 한다 */
async function loadStore() {
  vi.resetModules()
  return import('@/lib/content-store')
}

function setEnv(env: Partial<Record<(typeof ENV_KEYS)[number], string | undefined>>) {
  for (const [k, v] of Object.entries(env)) {
    if (v === undefined) delete process.env[k]
    else process.env[k] = v
  }
}

beforeEach(async () => {
  saved = Object.fromEntries(ENV_KEYS.map((k) => [k, process.env[k]]))
  for (const k of ENV_KEYS) delete process.env[k]

  sandbox = await mkdtemp(path.join(tmpdir(), 'urban-content-store-'))
  vi.spyOn(process, 'cwd').mockReturnValue(sandbox)
  vi.spyOn(console, 'warn').mockImplementation(() => {})
})

afterEach(async () => {
  for (const [k, v] of Object.entries(saved)) {
    if (v === undefined) delete process.env[k]
    else process.env[k] = v
  }
  vi.restoreAllMocks()
  if (sandbox?.startsWith(tmpdir())) await rm(sandbox, { recursive: true, force: true })
})

describe('resolveStoreMode', () => {
  it('CONTENT_STORE=file 이면 Supabase 설정이 있어도 파일을 쓴다 (명시가 우선)', async () => {
    setEnv({
      CONTENT_STORE: 'file',
      NEXT_PUBLIC_SUPABASE_URL: 'https://example.supabase.co',
      SUPABASE_SERVICE_ROLE_KEY: 'x'.repeat(40),
    })
    const store = await loadStore()
    expect(store.resolveStoreMode()).toBe('file')
  })

  it('CONTENT_STORE=supabase 이면 설정이 없어도 supabase 모드로 판정한다', async () => {
    setEnv({ CONTENT_STORE: 'supabase' })
    const store = await loadStore()
    expect(store.resolveStoreMode()).toBe('supabase')
  })

  it('명시가 없고 Supabase 설정이 갖춰지면 supabase를 고른다', async () => {
    setEnv({
      NEXT_PUBLIC_SUPABASE_URL: 'https://example.supabase.co',
      SUPABASE_SERVICE_ROLE_KEY: 'x'.repeat(40),
    })
    const store = await loadStore()
    expect(store.resolveStoreMode()).toBe('supabase')
  })

  it('명시도 설정도 없으면 file로 떨어진다 (로컬 개발)', async () => {
    const store = await loadStore()
    expect(store.resolveStoreMode()).toBe('file')
  })
})

describe('checkWritable — 로컬 개발', () => {
  it('파일 모드는 쓰기 가능하다', async () => {
    setEnv({ CONTENT_STORE: 'file' })
    const store = await loadStore()
    expect(store.checkWritable()).toEqual({ writable: true })
  })
})

describe('checkWritable — 운영 환경', () => {
  it('Vercel에서 설정 없이 파일 저장소면 쓰기를 막는다 (조용한 폴백 금지)', async () => {
    setEnv({ VERCEL: '1' })
    const store = await loadStore()
    const result = store.checkWritable()

    expect(result.writable).toBe(false)
    if (!result.writable) {
      expect(result.reason).toContain('운영 환경')
      expect(result.reason).toContain('SUPABASE_SERVICE_ROLE_KEY')
    }
  })

  it('NODE_ENV=production에서도 동일하게 막는다', async () => {
    setEnv({ NODE_ENV: 'production' })
    const store = await loadStore()
    expect(store.checkWritable().writable).toBe(false)
  })

  it('운영에서 CONTENT_STORE=file을 명시해도 쓰기를 허용하지 않는다', async () => {
    setEnv({ VERCEL: '1', CONTENT_STORE: 'file' })
    const store = await loadStore()
    expect(store.checkWritable().writable).toBe(false)
  })

  it('Supabase 설정이 갖춰지면 운영에서도 쓰기 가능하다', async () => {
    setEnv({
      VERCEL: '1',
      NEXT_PUBLIC_SUPABASE_URL: 'https://example.supabase.co',
      SUPABASE_SERVICE_ROLE_KEY: 'x'.repeat(40),
    })
    const store = await loadStore()
    expect(store.checkWritable()).toEqual({ writable: true })
  })
})

describe('checkWritable — supabase 모드인데 설정이 빠진 경우', () => {
  it('빠진 설정 이름을 알려주며 실패한다', async () => {
    setEnv({ CONTENT_STORE: 'supabase' })
    const store = await loadStore()
    const result = store.checkWritable()

    expect(result.writable).toBe(false)
    if (!result.writable) {
      expect(result.reason).toContain('NEXT_PUBLIC_SUPABASE_URL')
      expect(result.reason).toContain('SUPABASE_SERVICE_ROLE_KEY')
    }
  })

  it('일부만 빠져도 그 항목을 짚어준다', async () => {
    setEnv({ CONTENT_STORE: 'supabase', NEXT_PUBLIC_SUPABASE_URL: 'https://example.supabase.co' })
    const store = await loadStore()
    const result = store.checkWritable()

    expect(result.writable).toBe(false)
    if (!result.writable) {
      expect(result.reason).toContain('SUPABASE_SERVICE_ROLE_KEY')
      expect(result.reason).not.toContain('NEXT_PUBLIC_SUPABASE_URL')
    }
  })

  it('비밀 값 자체는 메시지에 담지 않는다', async () => {
    const secret = 'super-secret-service-role-key-value'
    setEnv({ CONTENT_STORE: 'supabase', SUPABASE_SERVICE_ROLE_KEY: secret })
    const store = await loadStore()
    const result = store.checkWritable()

    if (!result.writable) {
      expect(result.reason).not.toContain(secret)
    }
  })
})

describe('쓰기 함수 차단', () => {
  beforeEach(() => {
    setEnv({ VERCEL: '1' }) // 운영 + 파일 저장소 = 유실 가능 상태
  })

  it('createSectionItem은 저장하지 않고 ContentStoreWriteError를 던진다', async () => {
    const store = await loadStore()
    await expect(
      store.createSectionItem('notices', {
        category: '공지', title: 'x', date: '2026-07-26', isNew: false,
      }),
    ).rejects.toBeInstanceOf(store.ContentStoreWriteError)
  })

  it('updateSectionItem도 차단된다', async () => {
    const store = await loadStore()
    await expect(
      store.updateSectionItem('notices', 'some-id', { title: 'x' }),
    ).rejects.toBeInstanceOf(store.ContentStoreWriteError)
  })

  it('deleteSectionItem도 차단된다', async () => {
    const store = await loadStore()
    await expect(store.deleteSectionItem('notices', 'some-id')).rejects.toBeInstanceOf(
      store.ContentStoreWriteError,
    )
  })

  it('문의 접수도 차단된다 (접수 성공으로 위장하지 않는다)', async () => {
    const store = await loadStore()
    await expect(
      store.createContactInquiry({
        name: '홍길동',
        phone: '010-1234-5678',
        email: 'a@b.com',
        inquiryType: '교육',
        title: '문의',
        message: '내용',
        privacyConsent: true,
      }),
    ).rejects.toBeInstanceOf(store.ContentStoreWriteError)
  })

  it('오류에 원인 코드가 붙어 API가 구분해 응답할 수 있다', async () => {
    const store = await loadStore()
    const error = await store
      .createSectionItem('notices', { category: '공지', title: 'x', date: '2026-07-26', isNew: false })
      .catch((e: unknown) => e)

    expect(error).toBeInstanceOf(store.ContentStoreWriteError)
    expect((error as InstanceType<typeof store.ContentStoreWriteError>).code).toBe(
      'CONTENT_STORE_NOT_WRITABLE',
    )
  })
})

describe('읽기는 막지 않는다', () => {
  it('운영에서 쓰기가 막혀도 공개 페이지용 조회는 동작한다', async () => {
    setEnv({ VERCEL: '1' })
    const store = await loadStore()

    // 설정 실수로 사이트 전체가 내려가면 안 된다
    await expect(store.getSectionItems('notices')).resolves.toEqual([])
  })
})
