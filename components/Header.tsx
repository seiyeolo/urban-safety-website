'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronDown, Phone } from 'lucide-react'

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

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

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
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/brand/logo.svg"
              alt="도시안전디자인센터 로고"
              width={32}
              height={45}
              className="h-11 w-auto transition-opacity group-hover:opacity-85"
              priority
            />
            <div className="leading-tight">
              <div className="text-xs text-gray-500 font-medium">대전경실련</div>
              <div className="text-base font-bold text-navy-900 whitespace-nowrap">
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
                    className={`flex items-center gap-1 px-4 py-2 text-sm font-semibold rounded-md border whitespace-nowrap transition-colors ${
                      isActive
                        ? 'border-navy-900 bg-navy-50 text-navy-900'
                        : 'border-gray-200 text-gray-700 hover:border-navy-900 hover:bg-navy-50 hover:text-navy-900'
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

            <div className="mt-4 pt-4 border-t border-gray-100">
              <Link
                href="/certificates/voice-phishing"
                className="btn-primary w-full justify-center"
                onClick={() => setMobileOpen(false)}
              >
                자격증 신청하기
              </Link>
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
