import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, FileText, BookOpen, Users, MessageSquare, ExternalLink, Download } from 'lucide-react'
import LogoutButton from './LogoutButton'

export const metadata: Metadata = {
  title: '관리자 대시보드 | 도시안전디자인센터',
}

const STATS = [
  { icon: FileText, label: '전체 페이지', value: '33' },
  { icon: BookOpen, label: '자격 과정', value: '2' },
  { icon: Users, label: '교육 유형', value: '3' },
  { icon: MessageSquare, label: '공지사항', value: '5' },
]

const MENUS = [
  { icon: FileText, title: '공지사항 관리', desc: '공지사항 등록·수정·삭제', href: '/admin/notices', ready: false },
  { icon: BookOpen, title: '교육 일정 관리', desc: '개강·특강 일정 등록·수정', href: '/admin/schedule', ready: false },
  { icon: MessageSquare, title: '문의 내역', desc: '접수된 온라인 문의 확인', href: '/admin/contacts', ready: false },
  { icon: Download, title: '자료실 관리', desc: '다운로드 파일 업로드·삭제', href: '/admin/files', ready: false },
]

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* 헤더 */}
      <header className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#0f2d5e] rounded-lg flex items-center justify-center">
              <Shield size={18} className="text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-400">대전경실련</p>
              <p className="font-bold text-sm">도시안전디자인센터 관리자</p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <ExternalLink size={14} />
              사이트 보기
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* 본문 */}
      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">대시보드</h1>
          <p className="text-gray-400 text-sm mt-1">사이트 현황과 관리 메뉴</p>
        </div>

        {/* 현황 카드 */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {STATS.map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-gray-800 rounded-xl p-5 border border-gray-700">
              <Icon size={20} className="text-gray-400 mb-3" />
              <p className="text-3xl font-bold mb-1">{value}</p>
              <p className="text-sm text-gray-400">{label}</p>
            </div>
          ))}
        </div>

        {/* 관리 메뉴 */}
        <h2 className="text-base font-semibold text-gray-300 mb-4">관리 메뉴</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {MENUS.map(({ icon: Icon, title, desc, href, ready }) => (
            <div
              key={href}
              className={`bg-gray-800 border border-gray-700 rounded-xl p-5 ${
                ready ? 'hover:border-[#0f2d5e] cursor-pointer transition-colors' : 'opacity-50'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-9 h-9 bg-gray-700 rounded-lg flex items-center justify-center">
                  <Icon size={18} className="text-gray-300" />
                </div>
                {!ready && (
                  <span className="text-xs bg-gray-700 text-gray-400 px-2 py-0.5 rounded-full">
                    준비 중
                  </span>
                )}
              </div>
              <h3 className="font-semibold mb-1">{title}</h3>
              <p className="text-sm text-gray-400">{desc}</p>
            </div>
          ))}
        </div>

        {/* 안내 */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 text-sm text-gray-400">
          <p className="font-semibold text-gray-300 mb-2">다음 단계 안내</p>
          <p>
            공지사항·문의 관리 등 콘텐츠 CRUD 기능은{' '}
            <strong className="text-gray-200">데이터베이스 연동</strong> 후 활성화됩니다.
            현재는 로그인·보호 기능만 운영 중입니다.
          </p>
        </div>
      </main>
    </div>
  )
}
