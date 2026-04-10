import type { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: '교육 일정',
  description: '대전경실련 도시안전디자인센터 교육 일정 안내입니다.',
}

const SCHEDULE = [
  { month: '2024년 5월', items: [
    { date: '05.10 (금)', type: '온라인', title: '보이스피싱 예방지도사 5기 개강', seats: '모집 중', href: '/certificates/voice-phishing' },
    { date: '05.17 (금)', type: '온라인', title: '생활안전지도사 5기 개강', seats: '모집 중', href: '/certificates/life-safety' },
    { date: '05.25 (토)', type: '오프라인', title: '생활안전 특강 – 대전 서구 용문동', seats: '잔여 5석', href: null },
  ]},
  { month: '2024년 6월', items: [
    { date: '06.07 (금)', type: '온라인', title: '보이스피싱 예방지도사 6기 개강', seats: '예정', href: '/certificates/voice-phishing' },
    { date: '06.15 (토)', type: '오프라인', title: '청소년 안전체험 교육 – 대전 중구', seats: '예정', href: null },
    { date: '06.28 (금)', type: '온라인', title: '생활안전지도사 6기 개강', seats: '예정', href: '/certificates/life-safety' },
  ]},
]

export default function SchedulePage() {
  return (
    <>
      <div className="page-hero">
        <div className="container-main">
          <nav className="breadcrumb justify-center">
            <Link href="/" className="text-blue-300 hover:text-white">홈</Link>
            <span className="breadcrumb-sep text-blue-400">›</span>
            <Link href="/notice" className="text-blue-300 hover:text-white">공지·자료실</Link>
            <span className="breadcrumb-sep text-blue-400">›</span>
            <span className="text-white">교육 일정</span>
          </nav>
          <h1>교육 일정</h1>
          <p>개강·특강 일정을 확인하세요</p>
        </div>
      </div>

      <section className="section-padding bg-white">
        <div className="container-main max-w-3xl mx-auto">
          <div className="space-y-10">
            {SCHEDULE.map(({ month, items }) => (
              <div key={month}>
                <div className="flex items-center gap-3 mb-5">
                  <Calendar size={20} className="text-[#0f2d5e]" />
                  <h2 className="text-xl font-bold text-[#0f2d5e]">{month}</h2>
                </div>
                <div className="space-y-3">
                  {items.map(({ date, type, title, seats, href }) => (
                    <div key={title} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <span className="text-sm text-gray-500 w-24 shrink-0">{date}</span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                        type === '온라인' ? 'bg-blue-50 text-blue-700' : 'bg-orange-50 text-orange-700'
                      }`}>{type}</span>
                      <p className="flex-1 font-medium text-gray-800 text-sm">{title}</p>
                      <span className={`text-xs font-semibold shrink-0 ${
                        seats === '모집 중' ? 'text-green-600' :
                        seats.startsWith('잔여') ? 'text-orange-600' : 'text-gray-400'
                      }`}>{seats}</span>
                      {href && (
                        <Link href={href} className="text-[#0f2d5e] hover:text-blue-800 shrink-0">
                          <ArrowRight size={16} />
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center bg-blue-50 rounded-2xl p-8">
            <p className="text-gray-700 mb-2">교육 일정 및 신청 관련 문의</p>
            <a href="tel:042-254-8060" className="text-[#0f2d5e] font-bold text-lg hover:underline">
              042-254-8060
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
