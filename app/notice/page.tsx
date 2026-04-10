import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, Bell, Calendar, Trophy, Download, Newspaper } from 'lucide-react'

export const metadata: Metadata = {
  title: '공지·자료실',
  description: '대전경실련 도시안전디자인센터 공지사항, 교육 일정, 자료실 안내입니다.',
}

const NOTICES = [
  { id: 1, category: '공지', title: '2024년 5월 교육 일정 안내', date: '2024-04-25', isNew: true },
  { id: 2, category: '공지', title: '보이스피싱 예방지도사 5기 수강생 모집', date: '2024-04-20', isNew: true },
  { id: 3, category: '공지', title: '생활안전지도사 4기 합격자 발표', date: '2024-04-15', isNew: false },
  { id: 4, category: '공지', title: '개인정보처리방침 개정 안내', date: '2024-04-01', isNew: false },
  { id: 5, category: '공지', title: '2024년 기관·단체 교육 신청 접수', date: '2024-03-20', isNew: false },
]

const QUICK_LINKS = [
  { icon: Bell, label: '공지사항', href: '/notice', desc: '센터 소식과 주요 안내' },
  { icon: Calendar, label: '교육 일정', href: '/notice/schedule', desc: '개강·특강 일정 안내' },
  { icon: Trophy, label: '교육 실적', href: '/notice/results', desc: '교육 성과와 수료 현황' },
  { icon: Download, label: '자료 다운로드', href: '/notice/downloads', desc: '교육 자료 및 양식' },
  { icon: Newspaper, label: '언론 보도', href: '/notice/press', desc: '관련 뉴스 및 보도자료' },
]

export default function NoticePage() {
  return (
    <>
      <div className="page-hero">
        <div className="container-main">
          <nav className="breadcrumb justify-center">
            <Link href="/" className="text-blue-300 hover:text-white">홈</Link>
            <span className="breadcrumb-sep text-blue-400">›</span>
            <span className="text-white">공지·자료실</span>
          </nav>
          <h1>공지·자료실</h1>
          <p>센터 소식, 교육 일정, 자료를 확인하세요</p>
        </div>
      </div>

      {/* 카테고리 바로가기 */}
      <section className="section-padding bg-white">
        <div className="container-main">
          <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {QUICK_LINKS.map(({ icon: Icon, label, href, desc }) => (
              <Link
                key={href}
                href={href}
                className="flex flex-col items-center text-center p-5 bg-gray-50 rounded-2xl hover:bg-blue-50 hover:shadow-sm transition-all group"
              >
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-3 shadow-sm group-hover:bg-[#0f2d5e] transition-colors">
                  <Icon size={22} className="text-[#0f2d5e] group-hover:text-white transition-colors" />
                </div>
                <p className="font-semibold text-gray-800 group-hover:text-[#0f2d5e] text-sm mb-1">{label}</p>
                <p className="text-xs text-gray-400">{desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 최신 공지사항 */}
      <section className="section-padding bg-gray-50">
        <div className="container-main">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="section-tag">공지사항</span>
              <h2 className="section-title mt-2">최신 공지사항</h2>
            </div>
            <Link href="/notice" className="text-sm text-[#0f2d5e] font-medium hover:underline flex items-center gap-1">
              더보기 <ChevronRight size={14} />
            </Link>
          </div>
          <div className="bg-white rounded-2xl overflow-hidden border border-gray-200">
            {NOTICES.map(({ id, category, title, date, isNew }, i) => (
              <div
                key={id}
                className={`flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                  i < NOTICES.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <span className="text-xs font-semibold text-[#0f2d5e] bg-blue-50 px-2 py-0.5 rounded shrink-0">{category}</span>
                <p className="flex-1 text-gray-800 text-sm font-medium">{title}</p>
                {isNew && (
                  <span className="text-xs font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded shrink-0">N</span>
                )}
                <span className="text-xs text-gray-400 shrink-0">{date}</span>
                <ChevronRight size={14} className="text-gray-300 shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
