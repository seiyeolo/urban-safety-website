import type { Metadata } from 'next'
import Link from 'next/link'
import { Newspaper, ExternalLink } from 'lucide-react'

export const metadata: Metadata = {
  title: '언론 보도',
  description: '대전경실련 도시안전디자인센터 관련 언론 보도 및 뉴스 자료입니다.',
}

const PRESS_LIST = [
  {
    outlet: '대전일보',
    title: '대전경실련, 보이스피싱 예방지도사 자격과정 운영…시민 안전교육 확대',
    date: '2024-04-10',
    tag: '자격과정',
  },
  {
    outlet: '중도일보',
    title: '"보이스피싱 피해 막자"…대전서 시민 예방교육 확산',
    date: '2024-03-22',
    tag: '캠페인',
  },
  {
    outlet: '충청투데이',
    title: '대전경실련 도시안전디자인센터, 생활안전지도사 양성 본격 추진',
    date: '2024-02-15',
    tag: '자격과정',
  },
  {
    outlet: '대전MBC',
    title: '지역 안전교육 전문기관 출범…시민 체감 안전문화 확산 기대',
    date: '2024-01-20',
    tag: '센터 출범',
  },
  {
    outlet: '이투데이',
    title: '민간 안전교육 자격과정 수요 증가…지역 기반 플랫폼 주목',
    date: '2023-12-05',
    tag: '교육 동향',
  },
]

export default function PressPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container-main">
          <nav className="breadcrumb justify-center">
            <Link href="/" className="text-blue-300 hover:text-white">홈</Link>
            <span className="breadcrumb-sep text-blue-400">›</span>
            <Link href="/notice" className="text-blue-300 hover:text-white">공지·자료실</Link>
            <span className="breadcrumb-sep text-blue-400">›</span>
            <span className="text-white">언론 보도</span>
          </nav>
          <h1>언론 보도</h1>
          <p>센터 관련 언론 보도 및 뉴스를 확인하세요</p>
        </div>
      </div>

      <section className="section-padding bg-white">
        <div className="container-main max-w-3xl mx-auto">
          <div className="space-y-4">
            {PRESS_LIST.map(({ outlet, title, date, tag }) => (
              <div
                key={title}
                className="flex items-start gap-4 p-5 bg-white border border-gray-200 rounded-xl hover:border-[#0f2d5e] hover:shadow-sm transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center shrink-0">
                  <Newspaper size={18} className="text-gray-400 group-hover:text-[#0f2d5e]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-semibold text-[#0f2d5e] bg-blue-50 px-2 py-0.5 rounded-full">{outlet}</span>
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{tag}</span>
                    <span className="text-xs text-gray-400 ml-auto shrink-0">{date}</span>
                  </div>
                  <p className="font-medium text-gray-800 text-sm leading-snug group-hover:text-[#0f2d5e]">{title}</p>
                </div>
                <ExternalLink size={14} className="text-gray-300 shrink-0 mt-1 group-hover:text-[#0f2d5e]" />
              </div>
            ))}
          </div>

          <div className="mt-10 bg-gray-50 rounded-2xl p-6 text-center">
            <p className="text-sm text-gray-600 mb-3">보도자료 문의 및 인터뷰 요청</p>
            <div className="space-y-1 text-sm">
              <a href="tel:042-254-8060" className="block text-[#0f2d5e] font-semibold hover:underline">042-254-8060</a>
              <a href="mailto:dj@ccej.or.kr" className="block text-gray-500 hover:text-[#0f2d5e]">dj@ccej.or.kr</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
