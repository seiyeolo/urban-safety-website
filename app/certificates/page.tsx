import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, ChevronRight, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: '보이스피싱 예방지도사 - 민간자격증',
  description: '대전경실련 도시안전디자인센터의 보이스피싱 예방지도사 민간자격과정. 시민의 소중한 자산을 지키는 금융 안전 전문가를 양성합니다.',
}

const STATS = [
  {
    label: '연간 총 피해액',
    value: '7,744억',
    suffix: '전년 대비 12% 증가',
    type: 'error' as const,
  },
  {
    label: '평균 피해액',
    value: '1,700만',
    suffix: '1인당 평균 집계',
    type: 'normal' as const,
  },
  {
    label: '발생 건수',
    value: '2.1만건',
    suffix: '일 평균 58건 발생',
    type: 'normal' as const,
  },
]

const EDUCATION_GOALS = [
  '보이스피싱 최신 범죄 수법의 완벽한 이해',
  '금융 사기 피해자 심리 분석 및 상담 기술 습득',
  '지역 사회 안전망 구축을 위한 예방 교육 역량',
  '디지털 금융 리터러시 교육 전문성 강화',
  '법률적 대응 및 사후 구제 절차 안내 능력',
]

const INFO_PILLS = [
  { label: '교육 기간', value: '6주 과정' },
  { label: '교육 방식', value: '온라인/오프라인' },
  { label: '이수 기준', value: '출석 80% 이상' },
  { label: '모집 대상', value: '제한 없음' },
]

const PRICE_TABLE = [
  { label: '수강료', value: '220,000' },
  { label: '심사료', value: '30,000' },
  { label: '자격증 발급비', value: '50,000' },
]

const TOTAL_PRICE = PRICE_TABLE.reduce((sum, item) => sum + parseInt(item.value), 0)

export default function VoicePhishingCertificatePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1a3a5c] to-[#002444] overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 opacity-95"></div>
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <nav className="flex mb-8 gap-2 text-blue-300 text-sm font-medium">
            <Link href="/certificates" className="hover:text-white">민간자격증</Link>
            <ChevronRight size={16} className="self-center" />
            <span className="text-white">보이스피싱 예방지도사</span>
          </nav>

          <div className="flex flex-wrap gap-2 mb-6">
            <span className="bg-white/10 text-white px-3 py-1 rounded-lg text-sm backdrop-blur-sm border border-white/20">민간자격</span>
            <span className="bg-white/10 text-white px-3 py-1 rounded-lg text-sm backdrop-blur-sm border border-white/20">금융피해 전문분야</span>
          </div>

          <h1 className="text-5xl lg:text-6xl font-black text-white mb-6 leading-tight max-w-3xl">보이스피싱 예방지도사</h1>
          <p className="text-xl lg:text-2xl text-blue-300 mb-12 max-w-2xl font-light">
            시민의 소중한 자산을 지키는 <br className="hidden md:block"/>금융 안전 전문가 양성 과정
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="bg-[#2e7d32] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#217128] transition-all shadow-xl">
              교육 신청하기
            </button>
            <button className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all backdrop-blur-sm">
              자격 문의
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-8 py-16 grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left: Main Content (8 cols) */}
        <div className="lg:col-span-8 space-y-24">
          {/* Info Pills */}
          <section>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
              {INFO_PILLS.map(({ label, value }) => (
                <div key={label} className="bg-[#f5f3f3] p-6 rounded-xl text-center">
                  <span className="block text-sm text-gray-600 mb-2">{label}</span>
                  <span className="font-bold text-[#002444]">{value}</span>
                </div>
              ))}
            </div>

            <h2 className="text-3xl font-bold text-[#002444] mb-8">보이스피싱 피해 현황</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {STATS.map(({ label, value, suffix, type }) => (
                <div key={label} className="bg-white p-8 rounded-2xl shadow-[0_20px_40px_rgba(27,28,28,0.06)] border border-gray-100">
                  <p className="text-gray-600 text-sm mb-2">{label}</p>
                  <p className="text-4xl font-black text-[#002444]">{value}</p>
                  <p className={`text-sm mt-2 font-medium ${type === 'error' ? 'text-red-600' : 'text-gray-600'}`}>
                    {suffix}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Education Goals */}
          <section>
            <h2 className="text-3xl font-bold text-[#002444] mb-8">교육 목표</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {EDUCATION_GOALS.map((goal, index) => (
                <div key={index} className="flex items-start gap-4 p-6 bg-white rounded-xl border-l-4 border-[#2e7d32] shadow-sm">
                  <CheckCircle size={24} className="text-[#2e7d32] mt-1 flex-shrink-0" />
                  <span className="font-medium text-gray-800 leading-tight">{goal}</span>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section>
            <h2 className="text-3xl font-bold text-[#002444] mb-8">자주 묻는 질문</h2>
            <div className="space-y-4">
              {[
                {
                  q: '비전공자도 수강할 수 있나요?',
                  a: '네, 가능합니다. 보이스피싱 예방지도사 과정은 전공이나 학력에 제한이 없으며, 시민 누구나 참여할 수 있도록 설계되었습니다. 기초부터 체계적으로 교육하므로 관련 경험이 없어도 충분히 따라올 수 있습니다.'
                },
                {
                  q: '온라인 교육만으로도 자격증 취득이 가능한가요?',
                  a: '온라인 교육과 실시간 특강 참여로 자격증 취득이 가능합니다. 6주간의 체계적인 온라인 강의와 주차별 과제 수행, 최종 평가를 통해 자격증을 받을 수 있으며, 필요시 오프라인 보충 교육도 제공됩니다.'
                },
                {
                  q: '자격증 활용도는 어떻게 되나요?',
                  a: '지역 주민센터, 경로당, 사회복지관 등에서 보이스피싱 예방 교육 강사로 활동할 수 있으며, 금융기관이나 보험회사의 고객 상담 및 교육 업무에도 활용 가능합니다. 또한 개인 컨설팅이나 교육 사업도 가능합니다.'
                },
              ].map((faq, index) => (
                <div key={index} className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="font-bold text-[#002444] mb-3">Q. {faq.q}</h3>
                  <p className="text-gray-700 leading-relaxed">A. {faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right: Sticky Sidebar (4 cols) */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-24 space-y-6">
            {/* Price Card */}
            <div className="bg-white rounded-2xl shadow-[0_20px_40px_rgba(27,28,28,0.06)] border border-gray-100 overflow-hidden">
              <div className="bg-[#e4e2e2] px-6 py-4">
                <h3 className="font-bold text-[#002444]">수강료 및 발급비</h3>
              </div>
              <div className="p-6">
                <div className="space-y-3 mb-6">
                  {PRICE_TABLE.map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-center">
                      <span className="text-gray-700">{label}</span>
                      <span className="font-medium">{parseInt(value).toLocaleString()}원</span>
                    </div>
                  ))}
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-[#002444]">총액</span>
                      <span className="font-bold text-[#002444] text-xl">{TOTAL_PRICE.toLocaleString()}원</span>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-[#2e7d32] text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-[#217128] transition-colors mb-6">
                  지금 교육 신청하기
                </button>

                {/* Additional Info */}
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">검정방법</span>
                    <span className="text-gray-800">필기 + 실무평가</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">합격기준</span>
                    <span className="text-gray-800">각 60점 이상</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">자격관리기관</span>
                    <span className="text-gray-800">대전경실련</span>
                  </div>
                </div>

                <div className="bg-[#ffdbcb] border border-[#ff6f00]/20 rounded-lg p-4 mt-6">
                  <Link href="/legal/refund" className="text-[#793100] font-medium hover:underline">
                    환불규정 확인하기 →
                  </Link>
                </div>

                <div className="mt-6 space-y-2">
                  <a href="tel:042-254-8060" className="block text-center bg-gray-100 text-gray-800 py-3 px-4 rounded-xl hover:bg-gray-200 transition-colors">
                    042-254-8060 전화 문의
                  </a>
                  <Link href="/contact/education" className="block text-center bg-white border border-gray-300 text-gray-800 py-3 px-4 rounded-xl hover:bg-gray-50 transition-colors">
                    온라인 문의하기
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
