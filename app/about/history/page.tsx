import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '연혁',
  description: '대전경실련 도시안전디자인센터의 연혁입니다.',
}

const HISTORY = [
  {
    year: '2018',
    events: [
      '도시안전디자인센터 사단법인 설립',
      '대전세무서 사업자등록 완료',
      '서비스업 및 교육·조사연구용역 기반 정비',
    ],
  },
  {
    year: '2017',
    events: [
      '2017 상생협력 컨퍼런스 개최',
      '기존 포럼·세미나 기반의 협력 네트워크 유지',
    ],
  },
  {
    year: '2016',
    events: [
      '2016 상생협력 컨퍼런스 개최',
      '공공서비스디자인 세미나 진행',
      '자동심장충격기 대전경찰 순찰차 탑재 활동',
    ],
  },
  {
    year: '2015',
    events: [
      '정기총회 및 신임대표 취임식',
      'ICT 융합 전문가협의회 개최',
      '지하공간 및 장대터널 화재안전 국제세미나 진행',
    ],
  },
  {
    year: '2013-2014',
    events: [
      '대전지방기상청, 대전소방본부 등과 MOU 및 좌담회 진행',
      '한·중·일 국제세미나, 도시안전·방범마을 세미나 개최',
      '어린이 공간디자인 프로젝트 등 시민참여형 프로그램 운영',
      '제2대 도시안전디자인포럼 대표 및 운영진 선출',
    ],
  },
  {
    year: '2011-2012',
    events: [
      '2011년 11월 도시안전디자인포럼 출범식 개최',
      '4개 분과위원회 체계 구성: 방재, 방범, 유니버설디자인, 교육·홍보',
      '학교안전, 도시기후대비, 국제교류 등 주제별 세미나와 컨퍼런스 진행',
      '2012년 안전IT융합지원센터 출범',
    ],
  },
  {
    year: '1989',
    events: [
      '대전경실련(대전경제정의실천시민연합) 창립',
      '시민사회 감시·대변·교육 활동 기반 축적',
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

          <div className="mt-12 bg-gray-50 rounded-2xl p-6">
            <p className="text-sm text-gray-600 leading-relaxed">
              현재 연혁 페이지는 변환 완료된 브로슈어와 활동기록 자료를 기준으로 1차 보강한 상태입니다.
              정관과 설립 관련 스캔 문서 OCR이 완료되면 법인 전환 과정과 공식 등록 이력을 추가 보완할 예정입니다.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
