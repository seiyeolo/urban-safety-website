import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

import { isAdminRequest } from '@/lib/admin-auth'
import { FileUploadError, uploadDownloadFile } from '@/lib/storage/file-upload'

/**
 * 자료실 파일 업로드.
 *
 * 관리자 인증을 통과한 요청만 받는다 — 이 라우트가 열려 있으면 누구나 센터
 * 저장소에 파일을 올릴 수 있게 된다.
 *
 * Cache Components가 프리렌더하지 않도록 명시한다. 업로드는 매 요청 실행돼야 한다.
 */
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    if (!isAdminRequest(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    let formData: FormData
    try {
      formData = await request.formData()
    } catch {
      return NextResponse.json(
        { error: '파일 데이터를 읽지 못했습니다.' },
        { status: 400 }
      )
    }

    const file = formData.get('file')

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: '업로드할 파일을 선택해주세요.' },
        { status: 400 }
      )
    }

    const result = await uploadDownloadFile(file, crypto.randomUUID().slice(0, 8))

    return NextResponse.json(result, { headers: { 'Cache-Control': 'no-store' } })
  } catch (error) {
    if (error instanceof FileUploadError) {
      // 검증 실패는 관리자가 고칠 수 있는 문제라 사유를 그대로 전달한다
      return NextResponse.json({ error: error.message }, { status: error.status })
    }

    // 그 밖의 오류는 내부 정보를 노출하지 않고 서버 로그로만 남긴다
    console.error('[admin upload] 업로드 처리 실패:', error)
    return NextResponse.json(
      { error: '파일 업로드 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
