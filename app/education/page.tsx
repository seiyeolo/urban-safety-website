import type { Metadata } from 'next'
import Link from 'next/link'
import { Monitor, Building, Users, CheckCircle, ArrowRight, Phone } from 'lucide-react'

export const metadata: Metadata = {
  title: '교육 신청 허브 - 교육안내',
  description: '대전경실련 도시안전디자인센터의 온라인 교육, 오프라인 교육, 기관·단체 교육과정. 목적과 상황에 맞는 교육과정을 선택하세요.',
}

const EDUCATION_MODES = [
  {
    icon: Monitor,
    title: '온라인 교육',
    features: ['24시간 수강 가능', '모바일 지원', '자동 진도관리'],
    bgStyle: 'bg-[#f5f3f3] hover:bg-white hover:shadow-2xl border border-transparent hover:border-[#2e7d32]/20',
    iconColor: 'text-[#2e7d32]',
    buttonStyle: 'bg-[#2e7d32] text-white hover:bg-[#217128]',
  },
  {
    icon: Building,
    title: '오프라인 교육',
    features: ['강사 직접 지도', '실습 포함', '수료증 즉시 발급'],
    bgStyle: 'bg-[#1a3a5c] text-white hover:shadow-2xl',
    iconColor: 'text-white',
    buttonStyle: 'bg-white text-[#1a3a5c] hover:bg-[#f5f3f3]',
  },
  {
    icon: Users,
    title: '기관·단체 교육',
    features: ['찾아가는 교육', '맞춤형 설계', '단체 할인 혜택'],
    bgStyle: 'bg-[#f5f3f3] hover:bg-white hover:shadow-2xl border border-transparent hover:border-[#1a3a5c]/20',
    iconColor: 'text-[#1a3a5c]',
    buttonStyle: 'border border-[#1a3a5c] text-[#1a3a5c] hover:bg-[#1a3a5c] hover:text-white',
  },
]

const SCHEDULE_DATA = [
  { date: '2026.03.15', type: '온라인', title: '보이스피싱 예방지도사 6기', spots: '20명', status: '모집중', statusColor: 'text-green-600 bg-green-100' },
  { date: '2026.03.22', type: '오프라인', title: '생활안전지도사 현장 교육', spots: '15명', status: '모집중', statusColor: 'text-green-600 bg-green-100' },
  { date: '2026.04.05', type: '단체', title: '대전시청 맞춤형 안전교육', spots: '30명', status: '접수완료', statusColor: 'text-blue-600 bg-blue-100' },
  { date: '2026.04.12', type: '온라인', title: '보이스피싱 예방지도사 7기', spots: '25명', status: '모집중', statusColor: 'text-green-600 bg-green-100' },
  { date: '2026.04.19', type: '오프라인', title: '생활안전지도사 심화과정', spots: '12명', status: '마감임박', statusColor: 'text-amber-600 bg-amber-100' },
  { date: '2026.04.26', type: '단체', title: '경로당 안전교육 순회', spots: '50명', status: '예정', statusColor: 'text-gray-600 bg-gray-100' },
]

const FAQ_DATA = [
  {
    q: '비전공자도 가능한가요?',
    a: '네, 가능합니다. 모든 교육과정은 전공이나 학력에 제한이 없으며, 기초부터 체계적으로 교육하므로 관련 경험이 없어도 충분히 따라올 수 있습니다.'
  },
  {
    q: '온라인 수강 환경은 어떻게 되나요?',
    a: 'PC와 모바일 모두 지원되며, 안정적인 인터넷 환경에서 수강하시면 됩니다. 강의 중 질의응답도 실시간으로 가능하며, 녹화본은 수강 기간 내 반복 시청 가능합니다.'
  },
  {
    q: '수료율 / 합격률은 얼마나 되나요?',
    a: '지난 5년간 평균 수료율은 87%, 자격증 합격률은 92%입니다. 체계적인 교육과정과 개별 학습 관리를 통해 높은 성취도를 유지하고 있습니다.'
  },
  {
    q: '자격증 활용도는 어떻게 되나요?',
    a: '지역 주민센터, 경로당, 복지관에서 안전교육 강사로 활동 가능하며, 관련 기관의 상담원이나 교육 담당자로도 진출할 수 있습니다. 개인 컨설팅 사업도 가능합니다.'
  },
  {
    q: '환불 규정은 어떻게 되나요?',
    a: '교육 시작 전 100% 환불, 진행률 50% 미만 시 50% 환불이 가능합니다. 자세한 내용은 환불규정 페이지에서 확인하실 수 있습니다.'
  },
  {
    q: '단체 할인이 있나요?',
    a: '5명 이상 동시 신청 시 10%, 10명 이상 시 15% 할인이 적용됩니다. 기관·단체 교육의 경우 별도 견적을 통해 더 유리한 조건을 제공해드립니다.'
  },
]

export default function EducationHubPage() {
  return (
    <main className="pt-24 pb-20 max-w-7xl mx-auto px-6">
      {/* Hero Section & Stepper */}
      <section className="py-16 text-center">
        <h1 className="text-[56px] font-black text-[#002444] leading-tight mb-4 tracking-tighter">교육안내</h1>
        <p className="text-[20px] text-gray-600 max-w-2xl mx-auto leading-[1.7] mb-12">
          목적과 상황에 맞는 교육과정을 선택하세요. 대전경실련 도시안전디자인센터는 전문적인 시민 안전 교육을 지향합니다.
        </p>

        {/* 3-Step Process Stepper */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <div className="flex items-center gap-3 bg-[#002444] text-white px-6 py-3 rounded-full shadow-lg">
            <span className="bg-white text-[#002444] rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm">1</span>
            <span className="font-bold">교육 방식</span>
          </div>
          <div className="w-12 h-[2px] bg-gray-300"></div>
          <div className="flex items-center gap-3 border border-gray-300 px-6 py-3 rounded-full text-gray-500">
            <span className="bg-gray-200 text-gray-500 rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm">2</span>
            <span>자격 선택</span>
          </div>
          <div className="w-12 h-[2px] bg-gray-300"></div>
          <div className="flex items-center gap-3 border border-gray-300 px-6 py-3 rounded-full text-gray-500">
            <span className="bg-gray-200 text-gray-500 rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm">3</span>
            <span>신청 완료</span>
          </div>
        </div>
      </section>

      {/* Education Modes Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        {EDUCATION_MODES.map(({ icon: Icon, title, features, bgStyle, iconColor, buttonStyle }, index) => (
          <div key={index} className={`group rounded-xl p-5 sm:p-8 lg:p-10 transition-all duration-300 relative overflow-hidden ${bgStyle}`}>
            <div className="absolute top-0 right-0 w-24 h-24 bg-black/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500"></div>
            <Icon size={48} className={`${iconColor} mb-8 block`} />
            <h3 className="text-2xl font-bold mb-6">{title}</h3>
            <ul className="space-y-4 mb-10 text-lg">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <CheckCircle size={16} className={iconColor} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button className={`w-full py-4 font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${buttonStyle}`}>
              선택하기 <ArrowRight size={16} />
            </button>
          </div>
        ))}
      </section>

      {/* Schedule Table */}
      <section className="mb-24">
        <h2 className="text-xl sm:text-2xl lg:text-[32px] font-bold text-[#002444] mb-8 text-center md:text-left">2026 예정 교육 일정</h2>
        <div className="bg-white rounded-xl overflow-hidden shadow-[0_20px_40px_rgba(27,28,28,0.06)]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#e9e8e8] text-[#002444] font-bold">
                <th className="px-6 py-5">일자</th>
                <th className="px-6 py-5">구분</th>
                <th className="px-6 py-5">과정명</th>
                <th className="px-6 py-5">정원</th>
                <th className="px-6 py-5">상태</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {SCHEDULE_DATA.map((item, index) => (
                <tr key={index} className="hover:bg-[#f5f3f3] transition-colors">
                  <td className="px-6 py-5 text-gray-600">{item.date}</td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      item.type === '온라인' ? 'bg-[#2e7d32]/10 text-[#2e7d32]' :
                      item.type === '오프라인' ? 'bg-[#1a3a5c]/10 text-[#1a3a5c]' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-5 font-medium text-gray-900">{item.title}</td>
                  <td className="px-6 py-5 text-gray-600">{item.spots}</td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${item.statusColor}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Application Form */}
      <section className="mb-24">
        <h2 className="text-xl sm:text-2xl lg:text-[32px] font-bold text-[#002444] mb-8 text-center md:text-left">수강 신청 정보 입력</h2>
        <div className="bg-white rounded-xl p-8 shadow-[0_20px_40px_rgba(27,28,28,0.06)]">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">이름 *</label>
              <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e7d32] focus:border-transparent" placeholder="성명을 입력하세요" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">연락처 *</label>
              <input type="tel" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e7d32] focus:border-transparent" placeholder="010-0000-0000" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">이메일 *</label>
              <input type="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e7d32] focus:border-transparent" placeholder="name@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">선택한 교육과정</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e7d32] focus:border-transparent">
                <option>보이스피싱 예방지도사</option>
                <option>생활안전지도사</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">수강 방식</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e7d32] focus:border-transparent">
                <option>온라인 교육</option>
                <option>오프라인 교육</option>
                <option>기관·단체 교육</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">희망 기수/일정</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e7d32] focus:border-transparent">
                <option>2026.03.15 - 보이스피싱 예방지도사 6기</option>
                <option>2026.04.12 - 보이스피싱 예방지도사 7기</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">특이사항/질문 (선택사항)</label>
              <textarea rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e7d32] focus:border-transparent" placeholder="궁금한 사항이나 요청사항을 입력하세요"></textarea>
            </div>
            <div className="md:col-span-2">
              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-5 h-5 text-[#2e7d32] border-gray-300 rounded focus:ring-[#2e7d32]" />
                <span className="text-sm text-gray-700">
                  <Link href="/legal/privacy" className="text-[#2e7d32] underline">개인정보처리방침</Link>에 동의합니다 *
                </span>
              </label>
            </div>
            <div className="md:col-span-2">
              <button type="submit" className="w-full bg-[#2e7d32] text-white py-4 px-8 rounded-xl font-bold text-lg hover:bg-[#217128] transition-colors">
                수강 신청하기
              </button>
              <div className="mt-4 text-center text-sm text-gray-600">
                <p>1-2 영업일 내 확인 연락 | <Link href="/legal/refund" className="text-[#2e7d32] hover:underline">취소/환불 규정 보기</Link></p>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-24">
        <h2 className="text-xl sm:text-2xl lg:text-[32px] font-bold text-[#002444] mb-8 text-center md:text-left">자주 묻는 질문</h2>
        <div className="space-y-4">
          {FAQ_DATA.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="font-bold text-[#002444] mb-3">Q. {faq.q}</h3>
              <p className="text-gray-700 leading-relaxed">A. {faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Inquiry Fallback */}
      <section className="text-center">
        <h2 className="text-xl sm:text-2xl lg:text-[32px] font-bold text-[#002444] mb-6">결정이 어려우세요?</h2>
        <p className="text-gray-600 mb-8">전문 상담을 통해 최적의 교육과정을 안내해드립니다.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="tel:042-254-8060" className="bg-[#002444] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#1a3a5c] transition-colors flex items-center gap-2">
            <Phone size={20} />
            042-254-8060 전화 상담
          </a>
          <button className="bg-[#2e7d32] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#217128] transition-colors">
            카카오톡 상담
          </button>
          <Link href="/contact/education" className="border-2 border-[#002444] text-[#002444] px-8 py-4 rounded-xl font-bold hover:bg-[#002444] hover:text-white transition-colors">
            온라인 문의
          </Link>
        </div>
      </section>
    </main>
  )
}
