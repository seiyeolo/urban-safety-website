import type { Metadata } from 'next'
import Link from 'next/link'
import { Monitor, Building, Users, CheckCircle, ArrowRight, Phone } from 'lucide-react'
import { Button } from '@/components/ui'
import EducationInquiryForm from '@/components/contact/EducationInquiryForm'
import { getSectionItems } from '@/lib/content-store'
import { scheduleStatusClass, scheduleTypeClass } from '@/lib/schedule-status'

// 관리자 수정이 공개 페이지에 반영되도록 60초 ISR (/notice/schedule과 동일 기준)
export const revalidate = 60

export const metadata: Metadata = {
  title: '교육 신청 허브 - 교육안내',
  description: '대전경실련 도시안전디자인센터의 온라인 교육, 오프라인 교육, 기관·단체 교육과정. 목적과 상황에 맞는 교육과정을 선택하세요.',
}

const EDUCATION_MODES = [
  {
    icon: Monitor,
    title: '온라인 교육',
    features: ['24시간 수강 가능', '모바일 지원', '자동 진도관리'],
    bgStyle: 'bg-neutral-100 hover:bg-white hover:shadow-2xl border border-transparent hover:border-cta-700/20',
    iconColor: 'text-cta-700',
    buttonStyle: 'bg-cta-700 text-white hover:bg-cta-800',
    href: '/education/online',
  },
  {
    icon: Building,
    title: '오프라인 교육',
    features: ['강사 직접 지도', '실습 포함', '수료증 즉시 발급'],
    bgStyle: 'bg-brand-600 text-white hover:shadow-2xl',
    iconColor: 'text-white',
    buttonStyle: 'bg-white text-brand-600 hover:bg-neutral-100',
    href: '/education/offline',
  },
  {
    icon: Users,
    title: '기관·단체 교육',
    features: ['찾아가는 교육', '맞춤형 설계', '단체 할인 혜택'],
    bgStyle: 'bg-neutral-100 hover:bg-white hover:shadow-2xl border border-transparent hover:border-brand-600/20',
    iconColor: 'text-brand-600',
    buttonStyle: 'border border-brand-600 text-brand-600 hover:bg-brand-600 hover:text-white',
    href: '/education/group',
  },
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

export default async function EducationHubPage() {
  // 일정은 관리자 화면(/admin/schedule)에서 관리한다.
  // 예전에는 이 파일에 배열로 박아둬서, 지난 일정이 계속 '모집중'으로 남아 있었다.
  const scheduleItems = await getSectionItems('schedules')

  return (
    <main className="pt-24 pb-20 max-w-7xl mx-auto px-6">
      {/* Hero Section & Stepper */}
      <section className="py-16 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-[52px] lg:text-[56px] font-black text-brand-600 leading-tight mb-4 tracking-tighter">교육안내</h1>
        <p className="text-base sm:text-lg lg:text-[20px] text-gray-600 max-w-2xl mx-auto leading-[1.7] mb-8 sm:mb-12">
          목적과 상황에 맞는 교육과정을 선택하세요. 대전경실련 도시안전디자인센터는 전문적인 시민 안전 교육을 지향합니다.
        </p>

        {/* 3-Step Process Stepper */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-16">
          <div className="flex items-center gap-3 bg-brand-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-lg text-sm sm:text-base">
            <span className="bg-white text-brand-600 rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm">1</span>
            <span className="font-bold">교육 방식</span>
          </div>
          <div className="w-[2px] h-6 sm:w-12 sm:h-[2px] bg-gray-300"></div>
          <div className="flex items-center gap-3 border border-gray-300 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-gray-500 text-sm sm:text-base">
            <span className="bg-gray-200 text-gray-500 rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm">2</span>
            <span>자격 선택</span>
          </div>
          <div className="w-[2px] h-6 sm:w-12 sm:h-[2px] bg-gray-300"></div>
          <div className="flex items-center gap-3 border border-gray-300 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-gray-500 text-sm sm:text-base">
            <span className="bg-gray-200 text-gray-500 rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm">3</span>
            <span>신청 완료</span>
          </div>
        </div>
      </section>

      {/* Education Modes Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        {EDUCATION_MODES.map(({ icon: Icon, title, features, bgStyle, iconColor, buttonStyle, href }, index) => (
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
            <Link href={href} className={`w-full py-4 font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${buttonStyle}`}>
              선택하기 <ArrowRight size={16} />
            </Link>
          </div>
        ))}
      </section>

      {/* Schedule Table */}
      <section className="mb-24">
        <h2 className="text-xl sm:text-2xl lg:text-[32px] font-bold text-brand-600 mb-8 text-center md:text-left">교육 일정</h2>
        {scheduleItems.length > 0 ? (
          <div className="bg-white rounded-xl overflow-x-auto shadow-[0_20px_40px_rgba(27,28,28,0.06)]">
            <table className="min-w-[640px] w-full text-left border-collapse">
              <thead>
                <tr className="bg-neutral-200 text-brand-600 font-bold">
                  <th className="px-6 py-5">일자</th>
                  <th className="px-6 py-5">구분</th>
                  <th className="px-6 py-5">과정명</th>
                  <th className="px-6 py-5">상태</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {scheduleItems.map((item) => (
                  <tr key={item.id} className="hover:bg-neutral-100 transition-colors">
                    <td className="px-6 py-5 text-gray-700">
                      <span className="block text-sm text-gray-600">{item.month}</span>
                      {item.date}
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${scheduleTypeClass(item.type)}`}>
                        {item.type}
                      </span>
                    </td>
                    <td className="px-6 py-5 font-medium text-gray-900">
                      {item.href ? (
                        <Link href={item.href} className="hover:text-brand-600 hover:underline">
                          {item.title}
                        </Link>
                      ) : (
                        item.title
                      )}
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${scheduleStatusClass(item.seats)}`}>
                        {item.seats || '안내 예정'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* 지난 일정을 남겨두느니 비워두는 편이 정직하다 — 전화 안내로 연결한다 */
          <div className="bg-white rounded-xl p-10 text-center shadow-[0_20px_40px_rgba(27,28,28,0.06)]">
            <p className="text-lg font-bold text-gray-900">현재 공개된 교육 일정이 없습니다</p>
            <p className="mt-3 text-gray-700">
              다음 기수 일정이 확정되면 이곳에 안내드립니다. 개설 문의는 전화로 받고 있습니다.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button href="tel:042-254-8060" variant="primary">
                <Phone size={16} /> 042-254-8060
              </Button>
              <Button href="/contact/education" variant="secondary">
                교육 문의하기 <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        )}
      </section>

      {/* Application Form */}
      <section className="mb-24">
        <h2 className="text-xl sm:text-2xl lg:text-[32px] font-bold text-brand-600 mb-8 text-center md:text-left">수강 신청 정보 입력</h2>
        <div className="bg-white rounded-xl p-8 shadow-[0_20px_40px_rgba(27,28,28,0.06)]">
          <EducationInquiryForm schedules={scheduleItems} />
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-24">
        <h2 className="text-xl sm:text-2xl lg:text-[32px] font-bold text-brand-600 mb-8 text-center md:text-left">자주 묻는 질문</h2>
        <div className="space-y-4">
          {FAQ_DATA.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="font-bold text-brand-600 mb-3">Q. {faq.q}</h3>
              <p className="text-gray-700 leading-relaxed">A. {faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Inquiry Fallback */}
      <section className="text-center">
        <h2 className="text-xl sm:text-2xl lg:text-[32px] font-bold text-brand-600 mb-6">결정이 어려우세요?</h2>
        <p className="text-gray-600 mb-8">전문 상담을 통해 최적의 교육과정을 안내해드립니다.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="tel:042-254-8060" className="inline-flex items-center justify-center gap-2 bg-brand-600 text-white px-8 py-4 rounded-md font-bold hover:bg-brand-700 transition-colors">
            <Phone size={20} />
            042-254-8060 전화 상담
          </a>
          <Button size="lg">
            카카오톡 상담
          </Button>
          <Link href="/contact/education" className="border-2 border-brand-600 text-brand-600 px-8 py-4 rounded-xl font-bold hover:bg-brand-600 hover:text-white transition-colors">
            온라인 문의
          </Link>
        </div>
      </section>
    </main>
  )
}
