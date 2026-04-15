import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, FileText, BookOpen, MessageSquare, ExternalLink, Download } from 'lucide-react'
import LogoutButton from './LogoutButton'
import { getContentStore } from '@/lib/content-store'

export const metadata: Metadata = {
  title: '관리자 대시보드 | 도시안전디자인센터',
}

const MENUS = [
  { icon: FileText, title: '공지사항 관리', desc: '공지사항 등록·수정·삭제', href: '/admin/notices' },
  { icon: BookOpen, title: '교육 일정 관리', desc: '개강·특강 일정 등록·수정', href: '/admin/schedule' },
  { icon: MessageSquare, title: '문의 내역', desc: '접수된 온라인 문의 확인', href: '/admin/contacts' },
  { icon: Download, title: '자료실 관리', desc: '다운로드 파일 업로드·삭제', href: '/admin/files' },
]

export default async function AdminPage() {
  const content = await getContentStore()
  const stats = [
    { icon: FileText, label: '공지사항', value: String(content.notices.length) },
    { icon: BookOpen, label: '교육 일정', value: String(content.schedules.length) },
    { icon: Download, label: '자료실 항목', value: String(content.downloads.length) },
    { icon: MessageSquare, label: '접수 문의', value: String(content.contacts.length) },
  ]

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
          {stats.map(({ icon: Icon, label, value }) => (
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
          {MENUS.map(({ icon: Icon, title, desc, href }) => (
            <Link
              key={href}
              href={href}
              className="bg-gray-800 border border-gray-700 rounded-xl p-5 hover:border-[#0f2d5e] transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-9 h-9 bg-gray-700 rounded-lg flex items-center justify-center">
                  <Icon size={18} className="text-gray-300" />
                </div>
                <span className="text-xs bg-[#0f2d5e]/20 text-blue-300 px-2 py-0.5 rounded-full">
                  관리 가능
                </span>
              </div>
              <h3 className="font-semibold mb-1">{title}</h3>
              <p className="text-sm text-gray-400">{desc}</p>
            </Link>
          ))}
        </div>

        {/* 안내 */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 text-sm text-gray-400">
          <p className="font-semibold text-gray-300 mb-2">다음 단계 안내</p>
          <p>
            현재 관리자 화면에서 공지사항, 교육 일정, 문의 내역, 자료실 항목을 직접 관리할 수 있습니다.
            데이터는 로컬 파일 기반으로 저장되며 공개 페이지에 바로 반영됩니다.
          </p>
        </div>
      </main>
    </div>
  )
}
