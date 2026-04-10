import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '환불규정',
  description: '대전경실련 도시안전디자인센터 수강료 환불규정입니다.',
}

const REFUND_RULES = [
  { period: '수강 시작 전', rate: '100% 환불', color: 'text-green-700 bg-green-50' },
  { period: '수강 시작 후 1/3 경과 전', rate: '수강료의 2/3 환불', color: 'text-blue-700 bg-blue-50' },
  { period: '수강 시작 후 1/2 경과 전', rate: '수강료의 1/2 환불', color: 'text-yellow-700 bg-yellow-50' },
  { period: '수강 시작 후 1/2 경과 후', rate: '환불 불가', color: 'text-red-700 bg-red-50' },
]

export default function RefundPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container-main">
          <nav className="breadcrumb justify-center">
            <Link href="/" className="text-blue-300 hover:text-white">홈</Link>
            <span className="breadcrumb-sep text-blue-400">›</span>
            <span className="text-white">환불규정</span>
          </nav>
          <h1>환불규정</h1>
          <p>학원의 설립·운영 및 과외교습에 관한 법률 제18조에 따른 환불기준</p>
        </div>
      </div>

      <section className="section-padding bg-white">
        <div className="container-main max-w-2xl mx-auto">
          <div className="mb-8 bg-amber-50 border border-amber-200 rounded-xl p-5">
            <p className="text-sm text-amber-800">
              ※ 환불은 <strong>수강료</strong>에 한해 적용됩니다.
              검정료(응시료) 및 자격증 발급비는 납부 후 환불이 불가합니다.
            </p>
          </div>

          <div className="space-y-3 mb-10">
            {REFUND_RULES.map(({ period, rate, color }) => (
              <div key={period} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <span className="flex-1 text-gray-700 text-sm">{period}</span>
                <span className={`text-sm font-bold px-3 py-1 rounded-full ${color}`}>{rate}</span>
              </div>
            ))}
          </div>

          <div className="space-y-5 text-sm text-gray-700 leading-relaxed">
            <div>
              <h3 className="font-bold text-[#0f2d5e] mb-2">환불 신청 방법</h3>
              <p>환불 신청은 전화(042-254-8060) 또는 이메일(dj@ccej.or.kr)로 접수하시기 바랍니다.
              환불 처리는 영업일 기준 3~5일 소요됩니다.</p>
            </div>
            <div>
              <h3 className="font-bold text-[#0f2d5e] mb-2">유의사항</h3>
              <ul className="space-y-1 list-disc list-inside">
                <li>수강 시작일은 강의 영상 공개일 기준으로 합니다.</li>
                <li>수강 진도율이 80% 이상인 경우 환불이 불가합니다.</li>
                <li>자격증 발급 신청 후 취소 시 발급비는 환불되지 않습니다.</li>
                <li>기타 환불 관련 사항은 센터로 문의해 주시기 바랍니다.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
