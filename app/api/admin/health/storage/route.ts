import { NextRequest, NextResponse } from 'next/server'

import { isAdminRequest } from '@/lib/admin-auth'
import { getStorageHealth } from '@/lib/content-store'

/**
 * 콘텐츠 저장소 상태 점검.
 *
 * - 관리자 인증 필수: 저장소 종류·설정 누락 여부는 공격자에게 유용한 정찰 정보다.
 * - 응답에는 설정 '이름'만 담는다. URL·키 등 값은 절대 포함하지 않는다.
 * - force-dynamic: 상태 점검이 캐시되면 장애 중에도 옛 'healthy'를 돌려줄 수 있다.
 *   (Next.js 16 Route Handler는 기본 non-cached지만, Cache Components 도입 시
 *    prerender 대상이 될 수 있어 의도를 명시해 둔다)
 */
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const health = getStorageHealth()

  // 모니터링에서 HTTP 상태만으로도 판별할 수 있게 한다
  const httpStatus = health.status === 'unhealthy' ? 503 : 200

  return NextResponse.json(health, {
    status: httpStatus,
    headers: { 'Cache-Control': 'no-store' },
  })
}
