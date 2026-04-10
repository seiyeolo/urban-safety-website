import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '민간자격 표시사항',
  description: '대전경실련 도시안전디자인센터 민간자격 표시사항 고지입니다.',
}

const CERTS_INFO = [
  {
    title: '보이스피싱 예방지도사',
    registNo: '[등록번호 기입]',
    registDate: '[등록일 기입]',
    govRelated: '금융위원회',
    cost: {
      수강료: '220,000원',
      '검정료(응시료)': '30,000원',
      '자격증 발급비': '50,000원',
      재발급비: '30,000원',
      '총 취득비용': '300,000원',
    },
  },
  {
    title: '생활안전지도사',
    registNo: '[등록번호 기입]',
    registDate: '[등록일 기입]',
    govRelated: '행정안전부',
    cost: {
      수강료: '220,000원',
      '검정료(응시료)': '30,000원',
      '자격증 발급비': '50,000원',
      재발급비: '30,000원',
      '총 취득비용': '300,000원',
    },
  },
]

export default function DisclosurePage() {
  return (
    <>
      <div className="page-hero">
        <div className="container-main">
          <nav className="breadcrumb justify-center">
            <Link href="/" className="text-blue-300 hover:text-white">홈</Link>
            <span className="breadcrumb-sep text-blue-400">›</span>
            <Link href="/certificates" className="text-blue-300 hover:text-white">민간자격증</Link>
            <span className="breadcrumb-sep text-blue-400">›</span>
            <span className="text-white">민간자격 표시사항</span>
          </nav>
          <h1>민간자격 표시사항</h1>
          <p>자격기본법 제17조에 따른 민간자격 표시사항 고지</p>
        </div>
      </div>

      <section className="section-padding bg-white">
        <div className="container-main max-w-3xl mx-auto">

          {/* 필수 법적 고지 */}
          <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-6 mb-10">
            <h2 className="font-bold text-amber-900 mb-3 text-base">필수 고지사항</h2>
            <ul className="space-y-2 text-sm text-amber-800 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="shrink-0 font-bold">①</span>
                본 센터에서 운영하는 민간자격은 <strong>자격기본법에 따라 등록된 민간자격</strong>으로,
                <strong>국가자격 또는 공인자격이 아닙니다.</strong>
              </li>
              <li className="flex items-start gap-2">
                <span className="shrink-0 font-bold">②</span>
                민간자격 등록이 자격의 질을 보증하거나, 정부에서 인증하는 것을 의미하지 않습니다.
              </li>
              <li className="flex items-start gap-2">
                <span className="shrink-0 font-bold">③</span>
                자격 취득에 따른 <strong>취업이나 창업이 보장되지 않습니다.</strong>
              </li>
            </ul>
          </div>

          {/* 자격별 표시사항 */}
          <div className="space-y-8">
            {CERTS_INFO.map(({ title, registNo, registDate, govRelated, cost }) => (
              <div key={title} className="border border-gray-200 rounded-2xl overflow-hidden">
                <div className="bg-[#0f2d5e] text-white px-6 py-4">
                  <h3 className="font-bold">{title}</h3>
                </div>
                <div className="p-6 space-y-4 text-sm">
                  <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                    <div className="flex gap-3">
                      <span className="text-gray-400 w-24 shrink-0">자격 종류</span>
                      <span className="font-medium text-gray-800">민간자격</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-gray-400 w-24 shrink-0">등록 번호</span>
                      <span className="font-medium text-gray-800">{registNo}</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-gray-400 w-24 shrink-0">등록일</span>
                      <span className="font-medium text-gray-800">{registDate}</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-gray-400 w-24 shrink-0">관련 부처</span>
                      <span className="font-medium text-gray-800">{govRelated}</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-gray-400 w-24 shrink-0">자격관리기관</span>
                      <span className="font-medium text-gray-800">대전경실련 도시안전디자인센터</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-gray-400 w-24 shrink-0">연락처</span>
                      <a href="tel:042-254-8060" className="font-medium text-[#0f2d5e] hover:underline">042-254-8060</a>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-4">
                    <p className="font-semibold text-gray-700 mb-3">비용 안내</p>
                    <div className="space-y-2">
                      {Object.entries(cost).map(([label, value]) => (
                        <div key={label} className={`flex justify-between ${label === '총 취득비용' ? 'pt-2 border-t border-gray-200 font-bold text-[#0f2d5e]' : 'text-gray-700'}`}>
                          <span>{label}</span>
                          <span>{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-400 mt-8 leading-relaxed">
            ※ 본 표시사항은 자격기본법 제17조(민간자격의 관리·운영에 관한 기준) 및 동법 시행령에 따라 공개됩니다.
            비용은 변경될 수 있으며, 최신 정보는 각 자격 상세 페이지 또는 전화(042-254-8060)로 확인하시기 바랍니다.
          </p>
        </div>
      </section>
    </>
  )
}
