import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '연혁',
  description: '대전경실련 도시안전디자인센터의 연혁입니다.',
}

const HISTORY = [
  {
    year: '2024',
    events: [
      '도시안전디자인센터 공식 출범',
      '보이스피싱 예방지도사 민간자격 등록 및 1기 교육 개강',
      '생활안전지도사 민간자격 등록',
      '대전시 유관기관 MOU 체결',
    ],
  },
  {
    year: '2023',
    events: [
      '생활안전 교육 프로그램 개발 착수',
      '보이스피싱 예방 시범 교육 진행 (3개 복지관)',
      '안전교육 콘텐츠 연구·개발',
    ],
  },
  {
    year: '2022',
    events: [
      '도시안전디자인센터 설립 준비위원회 구성',
      '전국 안전교육 현황 조사 및 수요 분석',
      '전문 강사진 모집 및 교육과정 설계',
    ],
  },
  {
    year: '1989',
    events: [
      '대전경실련(대전경제정의실천시민연합) 창립 (1989.12.16)',
      '시민사회 감시·대변 활동 시작',
    ],
  },
]

export default function HistoryPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container-main">
          <nav className="breadcrumb justify-center">
            <Link href="/" className="text-blue-300 hover:text-white">홈</Link>
            <span className="breadcrumb-sep text-blue-400">›</span>
            <Link href="/about" className="text-blue-300 hover:text-white">센터소개</Link>
            <span className="breadcrumb-sep text-blue-400">›</span>
            <span className="text-white">연혁</span>
          </nav>
          <h1>연혁</h1>
          <p>대전경실련 도시안전디자인센터의 발자취</p>
        </div>
      </div>

      <section className="section-padding bg-white">
        <div className="container-main max-w-2xl mx-auto">
          <div className="space-y-10">
            {HISTORY.map(({ year, events }) => (
              <div key={year} className="flex gap-8">
                <div className="shrink-0 w-16 text-right">
                  <span className="text-xl font-bold text-[#0f2d5e]">{year}</span>
                </div>
                <div className="flex-1 border-l-2 border-gray-200 pl-8 pb-4">
                  <ul className="space-y-3">
                    {events.map((event) => (
                      <li key={event} className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-[#0f2d5e] rounded-full shrink-0 mt-1.5" />
                        <span className="text-gray-700">{event}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
