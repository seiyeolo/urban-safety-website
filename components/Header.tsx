'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronDown, Phone, User, LogOut } from 'lucide-react'
import { useAuth } from '@/lib/auth/AuthContext'

const NAV_ITEMS = [
  {
    label: '센터소개',
    href: '/about',
    children: [
      { label: '인사말', href: '/about/greeting' },
      { label: '설립 취지와 비전', href: '/about/vision' },
      { label: '핵심 운영분야', href: '/about/fields' },
      { label: '연혁', href: '/about/history' },
      { label: '운영진/전문위원', href: '/about/members' },
      { label: '협력 네트워크', href: '/about/network' },
      { label: '오시는 길', href: '/about/location' },
    ],
  },
  {
    label: '핵심분야',
    href: '/fields',
    children: [
      { label: '범죄예방', href: '/fields/crime-prevention' },
      { label: '생활안전', href: '/fields/life-safety' },
    ],
  },
  {
    label: '민간자격증',
    href: '/certificates',
    children: [
      { label: '자격증 안내', href: '/certificates' },
      { label: '보이스피싱 예방지도사', href: '/certificates/voice-phishing' },
      { label: '생활안전지도사', href: '/certificates/life-safety' },
    ],
  },
  {
    label: '교육안내',
    href: '/education',
    children: [
      { label: '전체 교육과정', href: '/education' },
      { label: '온라인 교육', href: '/education/online' },
      { label: '오프라인 교육', href: '/education/offline' },
      { label: '기관·단체 맞춤형', href: '/education/group' },
    ],
  },
  {
    label: '사업',
    href: '/activities',
    children: [
      { label: '포럼/세미나', href: '/activities/forum' },
      { label: '캠페인', href: '/activities/campaign' },
      { label: '연구 및 정책제안', href: '/activities/research' },
      { label: '현장활동', href: '/activities/field' },
    ],
  },
  {
    label: '자료실',
    href: '/notice',
    children: [
      { label: '공지사항', href: '/notice' },
      { label: '교육 일정', href: '/notice/schedule' },
      { label: '합격자 발표', href: '/notice/results' },
      { label: '자료 다운로드', href: '/notice/downloads' },
      { label: '언론보도', href: '/notice/press' },
    ],
  },
  {
    label: '문의',
    href: '/contact',
    children: [
      { label: '일반문의', href: '/contact' },
      { label: '교육/자격문의', href: '/contact/education' },
      { label: '단체교육 문의', href: '/contact/group' },
    ],
  },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const { user, signOut, loading } = useAuth()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const handleSignOut = async () => {
    await signOut()
    setMobileOpen(false)
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-shadow duration-200 ${
        scrolled ? 'shadow-md' : ''
      }`}
    >
      {/* 상단 정보 바 */}
      <div className="bg-navy-900 text-white text-sm hidden md:block">
        <div className="container-main flex justify-between items-center py-2">
          <span className="text-navy-100 text-xs">
            대전광역시 서구 용문동 255-4 서우아파트 상가동 201호
          </span>
          <div className="flex items-center gap-4">
            <a
              href="tel:042-254-8060"
              className="flex items-center gap-1 text-navy-100 hover:text-white transition-colors"
            >
              <Phone size={12} />
              <span>042-254-8060</span>
            </a>
            <Link
              href="/contact/education"
              className="bg-green-700 text-white text-xs px-3 py-1 rounded hover:bg-green-800 transition-colors"
            >
              교육 신청
            </Link>
          </div>
        </div>
      </div>

      {/* 메인 헤더 */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-main flex items-center justify-between h-16">
          {/* 로고 — 박스 없이 자연 비율 표시 (2026-04-16 박스 제거) */}
          <Link href="/" className="flex items-center gap-4 group flex-shrink-0">
            <Image
              src="/brand/logo.svg"
              alt="도시안전디자인센터 로고"
              width={40}
              height={56}
              className="h-14 w-auto transition-opacity group-hover:opacity-85"
              priority
            />
            <div className="leading-tight min-w-0">
              <div className="text-sm text-gray-500 font-medium">대전경실련</div>
              <div className="text-base sm:text-lg font-bold text-navy-900">
                도시안전디자인센터
              </div>
            </div>
          </Link>

          {/* PC 내비게이션 — pill-shaped bordered menu items (2026-04-16) */}
          <nav className="hidden lg:flex items-center gap-2" role="navigation">
            {NAV_ITEMS.map((item) => {
              const isActive = activeMenu === item.href
              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setActiveMenu(item.href)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 px-4 py-2 text-sm font-semibold rounded border-2 whitespace-nowrap transition-all duration-200 ${
                      isActive
                        ? 'border-navy-900 bg-navy-50 text-navy-900 shadow-sm'
                        : 'border-gray-300 text-gray-700 hover:border-navy-900 hover:bg-navy-50 hover:text-navy-900 hover:shadow-sm'
                    }`}
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${
                          isActive ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                  </Link>

                  {/* 드롭다운 — pt-2 투명 브릿지로 hover 끊김 방지 */}
                  {item.children && isActive && (
                    <div className="absolute top-full left-0 pt-2 z-50">
                      <div className="bg-white shadow-xl border border-gray-100 rounded-lg min-w-48 py-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-5 py-2.5 text-sm text-gray-600 hover:text-navy-900 hover:bg-navy-50 transition-colors whitespace-nowrap"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}

            <Link
              href="/certificates/voice-phishing"
              className="ml-4 inline-flex items-center gap-1.5 bg-green-700 hover:bg-green-800 text-white text-sm font-semibold px-5 py-2.5 rounded-md whitespace-nowrap transition-colors shadow-sm"
            >
              자격증 신청
            </Link>

            {/* 로그인 상태에 따른 버튼 */}
            {loading ? (
              <div className="ml-4 w-8 h-8 flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-gray-300 border-t-navy-900 rounded-full animate-spin"></div>
              </div>
            ) : user ? (
              /* 로그인된 사용자 메뉴 */
              <div className="relative ml-4"
                onMouseEnter={() => setActiveMenu('user-menu')}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 hover:text-navy-900 transition-colors">
                  <User size={16} />
                  <span>{user.user_metadata?.name || user.email?.split('@')[0]}</span>
                  <ChevronDown size={14} className={`transition-transform duration-200 ${
                    activeMenu === 'user-menu' ? 'rotate-180' : ''
                  }`} />
                </button>

                {activeMenu === 'user-menu' && (
                  <div className="absolute top-full right-0 pt-2 z-50">
                    <div className="bg-white shadow-xl border border-gray-100 rounded-lg min-w-48 py-2">
                      <Link
                        href="/dashboard"
                        className="block px-5 py-2.5 text-sm text-gray-600 hover:text-navy-900 hover:bg-navy-50 transition-colors whitespace-nowrap"
                      >
                        내 정보
                      </Link>
                      <Link
                        href="/dashboard"
                        className="block px-5 py-2.5 text-sm text-gray-600 hover:text-navy-900 hover:bg-navy-50 transition-colors whitespace-nowrap"
                      >
                        수강 현황
                      </Link>
                      <hr className="my-2 border-gray-100" />
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-5 py-2.5 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors flex items-center gap-2"
                      >
                        <LogOut size={14} />
                        로그아웃
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* 비로그인 사용자 버튼들 */
              <div className="flex items-center gap-2 ml-4">
                <Link
                  href="/auth/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-navy-900 transition-colors"
                >
                  로그인
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-4 py-2 text-sm font-semibold bg-navy-900 text-white hover:bg-navy-800 rounded-md transition-colors"
                >
                  회원가입
                </Link>
              </div>
            )}
          </nav>

          {/* 모바일 메뉴 버튼 */}
          <button
            className="lg:hidden p-2 text-gray-600 hover:text-navy-900"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="메뉴 열기"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {mobileOpen && (
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
              <MobileMenuItem
                key={item.href}
                item={item}
                onClose={() => setMobileOpen(false)}
              />
            ))}

            <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
              <Link
                href="/certificates/voice-phishing"
                className="btn-primary w-full justify-center"
                onClick={() => setMobileOpen(false)}
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
                    onClick={() => setMobileOpen(false)}
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
                    onClick={() => setMobileOpen(false)}
                  >
                    로그인
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="flex-1 px-4 py-3 text-sm font-semibold bg-navy-900 text-white hover:bg-navy-800 rounded-lg transition-colors text-center"
                    onClick={() => setMobileOpen(false)}
                  >
                    회원가입
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

function MobileMenuItem({
  item,
  onClose,
}: {
  item: (typeof NAV_ITEMS)[0]
  onClose: () => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-gray-50 last:border-0">
      <button
        className="flex items-center justify-between w-full py-3 text-sm font-semibold text-gray-700"
        onClick={() => setOpen(!open)}
      >
        <span>{item.label}</span>
        {item.children && (
          <ChevronDown
            size={16}
            className={`transition-transform ${open ? 'rotate-180' : ''}`}
          />
        )}
      </button>
      {item.children && open && (
        <div className="pl-4 pb-2 space-y-1">
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="block py-2 text-sm text-gray-500 hover:text-navy-900"
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
