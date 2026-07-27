'use client'

import { useEffect, useState } from 'react'
import { AlertTriangle, Info } from 'lucide-react'

/**
 * 저장소 상태 배너.
 *
 * 저장이 불가능한 상태에서 관리자가 아무것도 모른 채 입력하다가
 * 제출 순간에야 503을 만나는 일을 막는다. 화면에 들어온 즉시 알린다.
 *
 * 응답에는 설정 '이름'만 오므로 화면에 그대로 노출해도 안전하다.
 */

type HealthStatus = 'healthy' | 'degraded' | 'unhealthy'

interface StorageHealth {
  status: HealthStatus
  mode: 'supabase' | 'file'
  writable: boolean
  production: boolean
  issues: string[]
  missingConfig: string[]
}

const STYLES: Record<Exclude<HealthStatus, 'healthy'>, { wrap: string; icon: string; title: string }> = {
  unhealthy: {
    wrap: 'border-danger-600 bg-danger-50 text-danger-600',
    icon: 'text-danger-600',
    title: '저장소 설정 오류 — 읽기 전용 상태',
  },
  degraded: {
    wrap: 'border-warning-600 bg-warning-50 text-warning-600',
    icon: 'text-warning-600',
    title: '로컬 파일 저장소로 동작 중',
  },
}

export default function StorageStatusBanner() {
  const [health, setHealth] = useState<StorageHealth | null>(null)

  useEffect(() => {
    let cancelled = false

    fetch('/api/admin/health/storage', { cache: 'no-store' })
      .then(async (res) => {
        // 401(미인증)은 로그인 화면에서 정상적으로 발생한다 — 배너를 띄우지 않는다
        if (res.status === 401) return null
        return (await res.json()) as StorageHealth
      })
      .then((data) => {
        if (!cancelled) setHealth(data)
      })
      .catch(() => {
        // 상태 조회 자체가 실패해도 관리 화면 사용을 막지 않는다
      })

    return () => {
      cancelled = true
    }
  }, [])

  if (!health || health.status === 'healthy') return null

  const style = STYLES[health.status]
  const Icon = health.status === 'unhealthy' ? AlertTriangle : Info

  return (
    <div role="alert" className={`border-b-2 px-5 py-3 ${style.wrap}`}>
      <div className="mx-auto flex max-w-6xl items-start gap-3">
        <Icon size={18} className={`mt-0.5 shrink-0 ${style.icon}`} aria-hidden="true" />
        <div className="min-w-0 text-sm">
          <p className="font-bold">{style.title}</p>

          {health.issues.length > 0 && (
            <ul className="mt-1 space-y-0.5 leading-relaxed">
              {health.issues.map((issue) => (
                <li key={issue}>{issue}</li>
              ))}
            </ul>
          )}

          {health.missingConfig.length > 0 && (
            <p className="mt-1.5 font-mono text-xs">
              누락된 설정: {health.missingConfig.join(', ')}
            </p>
          )}

          {!health.writable && (
            <p className="mt-1.5 font-semibold">
              지금 저장·수정·삭제를 시도하면 실패합니다. 설정을 먼저 확인하세요.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
