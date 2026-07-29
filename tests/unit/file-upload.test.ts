import { describe, expect, it } from 'vitest'
import {
  buildStoredPath,
  extensionOf,
  FileUploadError,
  formatBytes,
  MAX_UPLOAD_BYTES,
  validateUpload,
} from '@/lib/storage/file-upload'

/**
 * 자료실 업로드의 방어선.
 *
 * 버킷이 공개 읽기라, 여기서 통과시킨 파일은 그대로 브라우저에 열린다.
 * 확장자 화이트리스트와 경로 생성 규칙이 무너지면 곧바로 공격면이 된다.
 */

describe('extensionOf', () => {
  it('마지막 점 뒤를 소문자로 돌려준다', () => {
    expect(extensionOf('guide.PDF')).toBe('pdf')
    expect(extensionOf('보고서.최종.hwp')).toBe('hwp')
  })

  it('확장자가 없으면 빈 문자열', () => {
    expect(extensionOf('README')).toBe('')
  })
})

describe('formatBytes', () => {
  it.each([
    [512, '512B'],
    [2048, '2KB'],
    [1024 * 1024 * 2.5, '2.5MB'],
  ])('%i → %s', (bytes, expected) => {
    expect(formatBytes(bytes)).toBe(expected)
  })
})

describe('validateUpload — 허용 형식', () => {
  it.each(['pdf', 'hwp', 'hwpx', 'docx', 'xlsx', 'pptx', 'zip', 'png', 'jpg'])(
    '.%s 를 허용한다',
    (ext) => {
      expect(() => validateUpload(`file.${ext}`, 1024)).not.toThrow()
    },
  )

  it('형식 라벨을 목록 표시용으로 정규화한다', () => {
    expect(validateUpload('a.jpeg', 1024).typeLabel).toBe('JPG')
    expect(validateUpload('a.hwpx', 1024).typeLabel).toBe('HWP')
  })
})

describe('validateUpload — 거부', () => {
  it.each(['html', 'svg', 'js', 'exe', 'sh', 'php'])(
    '스크립트가 실행될 수 있는 .%s 는 거부한다',
    (ext) => {
      expect(() => validateUpload(`payload.${ext}`, 1024)).toThrow(FileUploadError)
    },
  )

  it('확장자가 없으면 거부한다', () => {
    expect(() => validateUpload('nodots', 1024)).toThrow(/허용되지 않는 형식/)
  })

  it('빈 파일을 거부한다', () => {
    expect(() => validateUpload('empty.pdf', 0)).toThrow(/빈 파일/)
  })

  it('한도를 넘으면 거부하고 실제 크기를 알려준다', () => {
    expect(() => validateUpload('big.pdf', MAX_UPLOAD_BYTES + 1)).toThrow(/파일이 너무 큽니다/)
  })

  it('한도 정확히 같은 크기는 허용한다 (경계)', () => {
    expect(() => validateUpload('exact.pdf', MAX_UPLOAD_BYTES)).not.toThrow()
  })

  it('오류에 HTTP 상태를 담아 라우트가 그대로 매핑할 수 있게 한다', () => {
    const tooBig = (() => {
      try { validateUpload('big.pdf', MAX_UPLOAD_BYTES + 1) } catch (e) { return e as FileUploadError }
    })()
    expect(tooBig?.status).toBe(413)

    const badType = (() => {
      try { validateUpload('x.html', 10) } catch (e) { return e as FileUploadError }
    })()
    expect(badType?.status).toBe(415)
  })
})

describe('buildStoredPath — 경로 탈출·충돌 차단', () => {
  it('상위 경로 이동을 무력화한다', () => {
    const path = buildStoredPath('../../etc/passwd.pdf', 'abcd1234')
    expect(path).not.toContain('..')
    expect(path).not.toContain('/')
  })

  it('한글·공백·특수문자를 안전한 문자로 바꾼다', () => {
    const path = buildStoredPath('보이스피싱 예방 가이드!.pdf', 'abcd1234')
    expect(path).toMatch(/^abcd1234-[a-zA-Z0-9-]*\.pdf$/)
  })

  it('확장자를 보존한다', () => {
    expect(buildStoredPath('a.hwp', 'id1')).toMatch(/\.hwp$/)
  })

  it('무작위 접두사로 같은 이름이 덮어쓰이지 않게 한다', () => {
    const a = buildStoredPath('guide.pdf', 'aaaa')
    const b = buildStoredPath('guide.pdf', 'bbbb')
    expect(a).not.toBe(b)
  })

  it('이름이 전부 특수문자여도 빈 파일명을 만들지 않는다', () => {
    expect(buildStoredPath('!!!.pdf', 'id1')).toBe('id1-file.pdf')
  })

  it('아주 긴 이름을 잘라낸다', () => {
    const path = buildStoredPath(`${'a'.repeat(300)}.pdf`, 'id1')
    expect(path.length).toBeLessThan(60)
  })
})
