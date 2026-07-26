import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mkdtemp, rm, readFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'

/**
 * 파일 저장소 CRUD 계약.
 *
 * ⚠️ file-store는 모듈 로드 시점에 `path.join(process.cwd(), 'data')`로 경로를 굳힌다.
 * 저장소 루트의 data/contacts.json에는 실제 문의(개인정보)가 들어 있으므로,
 * 반드시 cwd를 임시 디렉터리로 바꾼 뒤 모듈을 새로 import 해야 한다.
 * 아래 assertion으로 실제 경로를 쓰지 않는지 매 테스트마다 확인한다.
 */

const REAL_CWD = process.cwd()

let sandbox: string
let store: typeof import('@/lib/store/file-store')

beforeEach(async () => {
  sandbox = await mkdtemp(path.join(tmpdir(), 'urban-file-store-'))
  vi.spyOn(process, 'cwd').mockReturnValue(sandbox)
  vi.resetModules() // 굳어진 DATA_DIR을 버리고 sandbox 기준으로 다시 로드
  store = await import('@/lib/store/file-store')
})

afterEach(async () => {
  vi.restoreAllMocks()
  if (sandbox && sandbox.startsWith(tmpdir())) {
    await rm(sandbox, { recursive: true, force: true })
  }
})

describe('격리 확인', () => {
  it('실제 저장소의 data 디렉터리를 건드리지 않는다', async () => {
    await store.getContentStore()
    expect(sandbox).not.toBe(REAL_CWD)
    expect(sandbox.startsWith(tmpdir())).toBe(true)
    // sandbox 안에만 파일이 생겼는지 확인
    const written = await readFile(path.join(sandbox, 'data', 'site-content.json'), 'utf8')
    expect(JSON.parse(written)).toMatchObject({ notices: [], schedules: [], downloads: [] })
  })
})

describe('초기 상태', () => {
  it('데이터 파일이 없으면 빈 콘텐츠로 시작한다 (더미 데이터를 넣지 않는다)', async () => {
    const content = await store.getContentStore()
    expect(content.notices).toEqual([])
    expect(content.schedules).toEqual([])
    expect(content.downloads).toEqual([])
    expect(content.contacts).toEqual([])
  })

  it('없는 섹션을 조회해도 빈 배열을 돌려준다', async () => {
    expect(await store.getSectionItems('notices')).toEqual([])
  })
})

describe('create', () => {
  it('생성한 항목을 다시 읽을 수 있고 id가 부여된다', async () => {
    const created = await store.createSectionItem('notices', {
      category: '공지',
      title: '테스트 공지',
      date: '2026-07-26',
      isNew: true,
    })

    expect(created.id).toBeTruthy()

    const items = await store.getSectionItems('notices')
    expect(items).toHaveLength(1)
    expect(items[0]).toMatchObject({ title: '테스트 공지', category: '공지' })
  })

  it('여러 건을 생성하면 서로 다른 id를 갖는다', async () => {
    const a = await store.createSectionItem('notices', {
      category: '공지', title: 'A', date: '2026-07-01', isNew: false,
    })
    const b = await store.createSectionItem('notices', {
      category: '공지', title: 'B', date: '2026-07-02', isNew: false,
    })
    expect(a.id).not.toBe(b.id)
    expect(await store.getSectionItems('notices')).toHaveLength(2)
  })
})

describe('update', () => {
  it('수정 결과가 저장되고 다시 읽힌다', async () => {
    const created = await store.createSectionItem('notices', {
      category: '공지', title: '원본', date: '2026-07-26', isNew: false,
    })

    const updated = await store.updateSectionItem('notices', created.id, {
      category: '공지', title: '수정됨', date: '2026-07-26', isNew: true,
    })
    expect(updated).toMatchObject({ title: '수정됨', isNew: true })

    const items = await store.getSectionItems('notices')
    expect(items).toHaveLength(1)
    expect(items[0]).toMatchObject({ title: '수정됨' })
  })

  it('없는 id를 수정하면 성공으로 처리하지 않는다', async () => {
    const result = await store
      .updateSectionItem('notices', 'does-not-exist', {
        category: '공지', title: 'X', date: '2026-07-26', isNew: false,
      })
      .catch(() => null)

    expect(result).toBeFalsy()
    expect(await store.getSectionItems('notices')).toHaveLength(0)
  })
})

describe('delete', () => {
  it('삭제하면 목록에서 사라진다', async () => {
    const created = await store.createSectionItem('notices', {
      category: '공지', title: '삭제 대상', date: '2026-07-26', isNew: false,
    })
    await store.deleteSectionItem('notices', created.id)
    expect(await store.getSectionItems('notices')).toHaveLength(0)
  })

  it('없는 id를 삭제해도 남은 데이터를 훼손하지 않는다', async () => {
    await store.createSectionItem('notices', {
      category: '공지', title: '유지되어야 함', date: '2026-07-26', isNew: false,
    })
    await store.deleteSectionItem('notices', 'does-not-exist').catch(() => undefined)

    const items = await store.getSectionItems('notices')
    expect(items).toHaveLength(1)
    expect(items[0]).toMatchObject({ title: '유지되어야 함' })
  })
})

describe('섹션 분리', () => {
  it('한 섹션의 변경이 다른 섹션에 영향을 주지 않는다', async () => {
    await store.createSectionItem('notices', {
      category: '공지', title: '공지 1건', date: '2026-07-26', isNew: false,
    })
    expect(await store.getSectionItems('notices')).toHaveLength(1)
    expect(await store.getSectionItems('schedules')).toHaveLength(0)
    expect(await store.getSectionItems('downloads')).toHaveLength(0)
  })
})

describe('개인정보 분리 저장', () => {
  it('문의(contacts)는 공개 콘텐츠 파일에 섞이지 않는다', async () => {
    await store.createSectionItem('contacts', {
      name: '홍길동',
      phone: '010-1234-5678',
      email: 'hong@example.com',
      inquiryType: '교육 문의',
      title: '문의합니다',
      message: '내용',
      privacyConsent: true,
      submittedAt: '2026-07-26T12:00:00',
      status: 'new',
    })

    const publicFile = JSON.parse(
      await readFile(path.join(sandbox, 'data', 'site-content.json'), 'utf8'),
    ) as Record<string, unknown[]>

    // 공개 콘텐츠 파일에는 개인정보가 남지 않아야 한다
    expect(publicFile.contacts ?? []).toHaveLength(0)
    expect(await store.getSectionItems('contacts')).toHaveLength(1)
  })
})
