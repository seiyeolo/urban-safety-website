import 'server-only'

import { createClient } from '@supabase/supabase-js'

/**
 * 자료실 파일 업로드 (Supabase Storage)
 * ─────────────────────────────────────────────
 * 예전에는 자료실에 "다운로드 링크"만 입력할 수 있었다. 파일을 다른 서비스에
 * 먼저 올린 뒤 주소를 붙여넣어야 해서, 실제로는 거의 쓰이지 않았다.
 *
 * 서버리스 파일시스템은 휘발성이라 public/ 에 저장할 수 없다. 이미 쓰고 있는
 * Supabase의 Storage를 사용한다.
 *
 * 업로드는 service_role 키로 서버에서만 수행한다 — 브라우저에서 직접 올리면
 * 누구나 저장소에 쓸 수 있게 되므로, 반드시 관리자 인증을 통과한 요청만 받는다.
 */

export const DOWNLOADS_BUCKET = 'downloads'

/** 20MB — 강의안·서식 기준으로 충분하고, 서버리스 요청 본문 한도 안쪽이다 */
export const MAX_UPLOAD_BYTES = 20 * 1024 * 1024

/**
 * 허용 확장자.
 *
 * 화이트리스트로 둔다. .html·.svg 는 스크립트를 품을 수 있어 제외한다
 * (버킷이 공개 읽기라 업로드된 파일이 그대로 브라우저에 열린다).
 */
const ALLOWED_EXTENSIONS = new Map<string, string>([
  ['pdf', 'PDF'],
  ['hwp', 'HWP'],
  ['hwpx', 'HWP'],
  ['doc', 'DOC'],
  ['docx', 'DOCX'],
  ['xls', 'XLS'],
  ['xlsx', 'XLSX'],
  ['ppt', 'PPT'],
  ['pptx', 'PPTX'],
  ['zip', 'ZIP'],
  ['jpg', 'JPG'],
  ['jpeg', 'JPG'],
  ['png', 'PNG'],
])

export class FileUploadError extends Error {
  constructor(message: string, readonly status: number) {
    super(message)
    this.name = 'FileUploadError'
  }
}

export interface UploadResult {
  /** 공개 다운로드 주소 */
  href: string
  /** 사람이 읽는 크기 표기 — 관리자가 손으로 적던 값 */
  size: string
  /** 자료실 목록에 표시할 형식 라벨 */
  type: string
  /** 원본 파일명 (자료명 기본값으로 쓴다) */
  originalName: string
}

export function extensionOf(fileName: string): string {
  const parts = fileName.toLowerCase().split('.')
  return parts.length > 1 ? parts[parts.length - 1] : ''
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes}B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)}KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`
}

/**
 * 저장용 파일명을 만든다.
 *
 * 원본 이름을 그대로 쓰면 한글·공백·특수문자 때문에 주소가 깨지고, 같은 이름을
 * 올리면 덮어쓴다. 경로 탈출(../)도 막아야 한다.
 * 무작위 접두사 + 아스키만 남긴 이름으로 충돌과 탈출을 동시에 없앤다.
 */
export function buildStoredPath(fileName: string, randomId: string): string {
  const extension = extensionOf(fileName)
  const base = fileName
    .slice(0, fileName.length - (extension ? extension.length + 1 : 0))
    .replace(/[^a-zA-Z0-9-_]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40)

  const safeBase = base || 'file'
  return extension ? `${randomId}-${safeBase}.${extension}` : `${randomId}-${safeBase}`
}

/** 업로드 전 검증 — 실패 사유를 관리자가 바로 알 수 있게 문구를 구체적으로 준다 */
export function validateUpload(fileName: string, byteLength: number): { extension: string; typeLabel: string } {
  if (byteLength === 0) {
    throw new FileUploadError('빈 파일은 올릴 수 없습니다.', 400)
  }

  if (byteLength > MAX_UPLOAD_BYTES) {
    throw new FileUploadError(
      `파일이 너무 큽니다 (${formatBytes(byteLength)}). ${formatBytes(MAX_UPLOAD_BYTES)} 이하만 올릴 수 있습니다.`,
      413
    )
  }

  const extension = extensionOf(fileName)
  const typeLabel = ALLOWED_EXTENSIONS.get(extension)

  if (!typeLabel) {
    throw new FileUploadError(
      `허용되지 않는 형식입니다 (.${extension || '알 수 없음'}). 가능한 형식: ${[...new Set(ALLOWED_EXTENSIONS.values())].join(', ')}`,
      415
    )
  }

  return { extension, typeLabel }
}

function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceKey) {
    throw new FileUploadError(
      '파일 저장소가 설정되지 않았습니다. 운영자에게 문의해주세요.',
      503
    )
  }

  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

export async function uploadDownloadFile(file: File, randomId: string): Promise<UploadResult> {
  const { typeLabel } = validateUpload(file.name, file.size)
  const storedPath = buildStoredPath(file.name, randomId)
  const client = getServiceClient()

  const { error } = await client.storage.from(DOWNLOADS_BUCKET).upload(storedPath, file, {
    contentType: file.type || 'application/octet-stream',
    // 무작위 접두사로 이름이 겹치지 않으므로, 덮어쓰기를 허용할 이유가 없다
    upsert: false,
  })

  if (error) {
    // 버킷 미생성은 가장 흔한 설정 실수라 따로 안내한다
    const isMissingBucket = /bucket.*not found/i.test(error.message)
    throw new FileUploadError(
      isMissingBucket
        ? `저장소 버킷 '${DOWNLOADS_BUCKET}'이 없습니다. Supabase에서 버킷을 먼저 만들어주세요.`
        : `파일 업로드 실패: ${error.message}`,
      isMissingBucket ? 503 : 502
    )
  }

  const { data } = client.storage.from(DOWNLOADS_BUCKET).getPublicUrl(storedPath)

  return {
    href: data.publicUrl,
    size: formatBytes(file.size),
    type: typeLabel,
    originalName: file.name,
  }
}
