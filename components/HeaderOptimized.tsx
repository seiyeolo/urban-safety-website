'use client'

import { useState, useEffect, lazy, Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import TopBar from './header/TopBar'
import MainNav from './header/MainNav'
import AuthMenu from './header/AuthMenu'

// 동적 import로 코드 스플리팅 적용
const MobileMenu = lazy(() => import('./header/MobileMenu'))

export default function HeaderOptimized() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-shadow duration-200 ${
        scrolled ? 'shadow-md' : ''
      }`}
    >
      {/* 상단 정보 바 */}
      <TopBar />

      {/* 메인 헤더 */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-main h-16">
          <div className="flex items-center justify-between h-full">
            {/* 로고 */}
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

            {/* PC 전용 - 네비게이션과 버튼들 */}
            <div className="hidden lg:flex items-center gap-4">
              <MainNav
                activeMenu={activeMenu}
                onMenuEnter={setActiveMenu}
                onMenuLeave={() => setActiveMenu(null)}
              />

              <Link
                href="/certificates/voice-phishing"
                className="inline-flex items-center gap-1.5 bg-green-700 hover:bg-green-800 text-white text-sm font-semibold px-5 py-2.5 rounded-md whitespace-nowrap transition-colors shadow-sm"
              >
                자격증 신청
              </Link>

              <AuthMenu />
            </div>

            {/* 모바일 전용 - 햄버거 버튼 */}
            <button
              className="lg:hidden p-2 text-gray-600 hover:text-navy-900"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="메뉴 열기"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {mobileOpen && (
        <Suspense
          fallback={
            <div className="lg:hidden bg-white border-b border-gray-200 shadow-lg">
              <div className="container-main py-4">
                <div className="w-full h-32 bg-gray-100 rounded animate-pulse" />
              </div>
            </div>
          }
        >
          <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
        </Suspense>
      )}
    </header>
  )
}