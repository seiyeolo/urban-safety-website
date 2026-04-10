import type { Metadata } from 'next'
import Link from 'next/link'
import { Download, FileText, Image, FileSpreadsheet } from 'lucide-react'

export const metadata: Metadata = {
  title: '자료 다운로드',
  description: '대전경실련 도시안전디자인센터 교육 자료 및 서식 다운로드 페이지입니다.',
}

const FILE_ICON_MAP: Record<string, { icon: typeof FileText; color: string }> = {
  PDF: { icon: FileText, color: 'text-red-500 bg-red-50' },
  HWP: { icon: FileText, color: 'text-blue-500 bg-blue-50' },
  PPT: { icon: Image, color: 'text-orange-500 bg-orange-50' },
  XLSX: { icon: FileSpreadsheet, color: 'text-green-600 bg-green-50' },
}

const FILES = [
  { category: '교육 자료', title: '보이스피싱 예방 핵심 체크리스트', type: 'PDF', size: '1.2MB', date: '2024-04-01' },
  { category: '교육 자료', title: '생활안전 예방 가이드북', type: 'PDF', size: '3.5MB', date: '2024-03-15' },
  { category: '교육 자료', title: '보이스피싱 사례 분석 자료 (2024)', type: 'PDF', size: '2.1MB', date: '2024-03-01' },
  { category: '홍보 자료', title: '센터 소개 리플렛', type: 'PDF', size: '0.8MB', date: '2024-02-20' },
  { category: '서식', title: '단체교육 신청서 양식', type: 'HWP', size: '0.3MB', date: '2024-02-10' },
  { category: '서식', title: '수료증 재발급 신청서', type: 'HWP', size: '0.2MB', date: '2024-01-15' },
  { category: '서식', title: '자격증 재발급 신청서', type: 'HWP', size: '0.2MB', date: '2024-01-15' },
  { category: '기타', title: '2024년 교육 일정표', type: 'PDF', size: '0.5MB', date: '2024-01-02' },
]

const CATEGORIES = ['전체', '교육 자료', '홍보 자료', '서식', '기타']

export default function DownloadsPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container-main">
          <nav className="breadcrumb justify-center">
            <Link href="/" className="text-blue-300 hover:text-white">홈</Link>
            <span className="breadcrumb-sep text-blue-400">›</span>
            <Link href="/notice" className="text-blue-300 hover:text-white">공지·자료실</Link>
            <span className="breadcrumb-sep text-blue-400">›</span>
            <span className="text-white">자료 다운로드</span>
          </nav>
          <h1>자료 다운로드</h1>
          <p>교육 자료 및 각종 서식을 다운로드하세요</p>
        </div>
      </div>

      <section className="section-padding bg-white">
        <div className="container-main">
          {/* 카테고리 탭 */}
          <div className="flex flex-wrap gap-2 mb-8">
            {CATEGORIES.map((cat, i) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  i === 0
                    ? 'bg-[#0f2d5e] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-[#0f2d5e]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 파일 목록 */}
          <div className="space-y-3">
            {FILES.map(({ category, title, type, size, date }) => {
              const fileInfo = FILE_ICON_MAP[type] ?? FILE_ICON_MAP.PDF
              const Icon = fileInfo.icon
              return (
                <div
                  key={title}
                  className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:border-[#0f2d5e] hover:shadow-sm transition-all cursor-pointer group"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${fileInfo.color}`}>
                    <Icon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-medium text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">{category}</span>
                    </div>
                    <p className="font-medium text-gray-800 text-sm truncate group-hover:text-[#0f2d5e]">{title}</p>
                  </div>
                  <div className="hidden sm:flex items-center gap-4 text-xs text-gray-400 shrink-0">
                    <span className="font-semibold text-gray-500">{type}</span>
                    <span>{size}</span>
                    <span>{date}</span>
                  </div>
                  <button className="shrink-0 w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center hover:bg-[#0f2d5e] hover:text-white transition-colors text-gray-400 group-hover:bg-blue-50">
                    <Download size={16} />
                  </button>
                </div>
              )
            })}
          </div>

          <p className="text-center text-sm text-gray-400 mt-8">
            원하시는 자료가 없으신가요?{' '}
            <Link href="/contact" className="text-[#0f2d5e] hover:underline font-medium">문의하기</Link>
          </p>
        </div>
      </section>
    </>
  )
}
