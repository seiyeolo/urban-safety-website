import { useState } from 'react'
import Link from 'next/link'
import { Phone, User, LogOut, ChevronDown } from 'lucide-react'
import { useAuth } from '@/lib/auth/AuthContext'
import { NAV_ITEMS } from './constants'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

function MobileMenuItem({
  item,
  onClose,
}: {
  item: (typeof NAV_ITEMS)[0]
  onClose: () => void
}) {
  const [open, setOpen] = useState(false)
  const hasChildren = Boolean(item.children && item.children.length > 0)
  const panelId = `mobile-submenu-${item.href.replace(/[^a-z0-9]/gi, '-')}`

  return (
    <div className="border-b border-gray-50 last:border-0">
      <div className="flex items-stretch">
        <Link
          href={item.href}
          onClick={onClose}
          className="flex-1 py-3 text-sm font-semibold text-gray-700 hover:text-navy-900 min-h-[44px] flex items-center"
        >
          {item.label}
        </Link>
        {hasChildren && (
          <button
            type="button"
            className="px-4 flex items-center text-gray-500 hover:text-navy-900 min-w-[44px] min-h-[44px]"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={`${item.label} 하위 메뉴 ${open ? '접기' : '펼치기'}`}
          >
            <ChevronDown
              size={16}
              className={`transition-transform ${open ? 'rotate-180' : ''}`}
              aria-hidden="true"
            />
          </button>
        )}
      </div>
      {hasChildren && open && (
        <div id={panelId} className="pl-4 pb-2 space-y-1">
          {item.children?.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="block py-2 text-sm text-gray-500 hover:text-navy-900 min-h-[44px] flex items-center"
              onClick={onClose}
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { user, signOut, loading } = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut()
      onClose()
    } catch (error) {
      console.error('로그아웃 오류:', error)
    }
  }

  if (!isOpen) return null

  return (
    <div className="lg:hidden bg-white border-b border-gray-200 shadow-lg">
      <div className="container-main py-4">
        {/* 연락처 */}
        <a
          href="tel:042-254-8060"
          className="flex items-center gap-2 text-sm text-gray-500 mb-4 pb-4 border-b border-gray-100"
        >
          <Phone size={14} />
          <span>042-254-8060</span>
        </a>

        {NAV_ITEMS.map((item) => (
          <MobileMenuItem key={item.href} item={item} onClose={onClose} />
        ))}

        <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
          <Link
            href="/certificates/voice-phishing"
            className="btn-primary w-full justify-center"
            onClick={onClose}
          >
            자격증 신청하기
          </Link>

          {/* 모바일 로그인 상태에 따른 버튼 */}
          {loading ? (
            <div className="flex items-center justify-center py-2">
              <div className="w-4 h-4 border-2 border-gray-300 border-t-navy-900 rounded-full animate-spin"></div>
            </div>
          ) : user ? (
            /* 로그인된 사용자 메뉴 */
            <div className="space-y-2">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 w-full px-4 py-3 text-sm font-medium text-gray-700 hover:text-navy-900 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={onClose}
              >
                <User size={16} />
                내 정보 ({user.user_metadata?.name || user.email?.split('@')[0]})
              </Link>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 w-full px-4 py-3 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut size={16} />
                로그아웃
              </button>
            </div>
          ) : (
            /* 비로그인 사용자 버튼들 */
            <div className="flex gap-2">
              <Link
                href="/auth/login"
                className="flex-1 px-4 py-3 text-sm font-medium text-gray-700 hover:text-navy-900 border border-gray-300 hover:border-navy-900 rounded-lg transition-colors text-center"
                onClick={onClose}
              >
                로그인
              </Link>
              <Link
                href="/auth/signup"
                className="flex-1 px-4 py-3 text-sm font-semibold bg-navy-900 text-white hover:bg-navy-800 rounded-lg transition-colors text-center"
                onClick={onClose}
              >
                회원가입
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}