import type { Metadata } from 'next'
import Link from 'next/link'
import { Download, FileText, Image, FileSpreadsheet } from 'lucide-react'
import { getSectionItems } from '@/lib/content-store'

export const metadata: Metadata = {
  title: '자료 다운로드',
  description: '대전경실련 도시안전디자인센터 교육 자료 및 서식 다운로드 페이지입니다.',
}

const FILE_ICON_MAP: Record<string, { icon: typeof FileText; color: string }> = {
  PDF: { icon: FileText, color: 'text-red-500 bg-red-50' },
  HWP: { icon: FileText, color: 'text-blue-500 bg-blue-50' },
  PPT: { icon: Image, color: 'text-amber-600 bg-amber-50' },
  XLSX: { icon: FileSpreadsheet, color: 'text-green-600 bg-green-50' },
}

export default async function DownloadsPage() {
  const files = await getSectionItems('downloads')
  const categories = ['전체', ...new Set(files.map((item) => item.category))]

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
            {categories.map((cat, i) => (
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
            {files.map(({ id, category, title, type, size, date, href }) => {
              const fileInfo = FILE_ICON_MAP[type] ?? FILE_ICON_MAP.PDF
              const Icon = fileInfo.icon
              return (
                <div
                  key={id}
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
                  <Link
                    href={href || '#'}
                    className="shrink-0 w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center hover:bg-[#0f2d5e] hover:text-white transition-colors text-gray-400 group-hover:bg-blue-50"
                  >
                    <Download size={16} />
                  </Link>
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
