'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { ShieldCheck } from 'lucide-react'
import { useAuth } from '@/lib/auth/AuthContext'

/**
 * 로그인 가드 — 미로그인 사용자는 로그인 페이지로 보내고,
 * 로그인 후 원래 가려던 페이지로 복귀시킨다.
 * AuthProvider가 마운트된 layout 하위에서만 사용할 것.
 */
export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!loading && !user) {
      router.replace(`/auth/login?redirect=${encodeURIComponent(pathname)}`)
    }
  }, [loading, user, pathname, router])

  if (loading || !user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#0d1320] px-6 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#4cc38a] to-[#2a8f60] text-[#07130c]">
          <ShieldCheck size={26} />
        </div>
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/15 border-t-[#4cc38a]" aria-hidden />
        <p className="text-sm font-bold text-[#93a1b5]">
          {loading ? '수강 권한을 확인하고 있습니다…' : '로그인 페이지로 이동합니다…'}
        </p>
      </div>
    )
  }

  return <>{children}</>
}
