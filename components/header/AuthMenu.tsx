import Link from 'next/link'
import { User, LogOut } from 'lucide-react'
import { useAuth } from '@/lib/auth/AuthContext'

export default function AuthMenu() {
  const { user, signOut, loading } = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('로그아웃 오류:', error)
    }
  }

  if (loading) {
    return (
      <div className="hidden lg:block">
        <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
      </div>
    )
  }

  return (
    <div>
      {user ? (
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">
            {user.user_metadata?.role === 'admin' ? '관리자' : user.user_metadata?.name || '사용자'}님
          </span>
          <Link
            href="/dashboard"
            className="p-2 text-gray-600 hover:text-navy-900 transition-colors"
            title="대시보드"
          >
            <User size={18} />
          </Link>
          <button
            onClick={handleSignOut}
            className="p-2 text-gray-600 hover:text-red-600 transition-colors"
            title="로그아웃"
          >
            <LogOut size={18} />
          </button>
        </div>
      ) : (
        <Link
          href="/auth/login"
          className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-navy-900 border border-gray-300 rounded hover:border-navy-900 transition-colors"
        >
          <User size={16} />
          로그인
        </Link>
      )}
    </div>
  )
}