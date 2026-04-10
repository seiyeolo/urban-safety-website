import type { Metadata } from 'next'
import Link from 'next/link'
import { Monitor, MapPin, Users, ChevronRight, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: '교육안내',
  description: '대전경실련 도시안전디자인센터의 온라인 교육, 오프라인 교육, 기관·단체 교육과정을 안내합니다.',
}

const EDUCATION_TYPES = [
  {
    icon: Monitor,
    iconBg: 'bg-blue-50',
    iconColor: 'text-[#0f2d5e]',
    title: '온라인 교육',
    desc: '언제 어디서나 수강 가능한 자격증 취득 과정. 녹화강의와 실시간 특강을 결합한 체계적 온라인 교육.',
    features: ['자율 수강 (기간 내)', '모바일 수강 가능', '실시간 특강 포함', '자격증 취득 연계'],
    href: '/education/online',
    badge: '자격증 취득',
  },
  {
    icon: MapPin,
    iconBg: 'bg-orange-50',
    iconColor: 'text-[#e85d04]',
    title: '오프라인 교육',
    desc: '강사와 함께하는 현장 집합 교육. 실습과 현장 체험을 통해 실전 역량을 키웁니다.',
    features: ['현장 실습 중심', '강사 직접 지도', '그룹 활동 포함', '수료증 발급'],
    href: '/education/offline',
    badge: '현장 실습',
  },
  {
    icon: Users,
    iconBg: 'bg-green-50',
    iconColor: 'text-green-600',
    title: '기관·단체 교육',
    desc: '기관·단체의 특성과 수요에 맞춰 설계하는 맞춤형 안전교육 프로그램.',
    features: ['맞춤형 설계', '방문 교육 가능', '단체 할인', '교육 결과 보고서'],
    href: '/education/group',
    badge: '맞춤형',
  },
]

const UPCOMING = [
  { date: '2024-05-10', type: '온라인', title: '보이스피싱 예방지도사 5기 개강', seats: '모집 중' },
  { date: '2024-05-17', type: '온라인', title: '생활안전지도사 5기 개강', seats: '모집 중' },
  { date: '2024-05-25', type: '오프라인', title: '생활안전 특강 (대전 서구)', seats: '잔여 5석' },
]

export default function EducationPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container-main">
          <nav className="breadcrumb justify-center">
            <Link href="/" className="text-blue-300 hover:text-white">홈</Link>
            <span className="breadcrumb-sep text-blue-400">›</span>
            <span className="text-white">교육안내</span>
          </nav>
          <h1>교육안내</h1>
          <p>목적과 상황에 맞는 교육과정을 선택하세요</p>
        </div>
      </div>

      {/* 교육 유형 */}
      <section className="section-padding bg-white">
        <div className="container-main">
          <div className="section-header">
            <span className="section-tag">교육 유형</span>
            <h2 className="section-title">3가지 교육 방식</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {EDUCATION_TYPES.map(({ icon: Icon, iconBg, iconColor, title, desc, features, href, badge }) => (
              <div key={href} className="card flex flex-col">
                <div className="flex items-start gap-4 mb-5">
                  <div className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center shrink-0`}>
                    <Icon size={24} className={iconColor} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{badge}</span>
                    <h3 className="text-lg font-bold text-[#0f2d5e] mt-1">{title}</h3>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-5">{desc}</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 bg-[#0f2d5e] rounded-full shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={href} className="btn-secondary w-full justify-center text-sm">
                  자세히 보기 <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 예정 교육 일정 */}
      <section className="section-padding bg-gray-50">
        <div className="container-main">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="section-tag">교육 일정</span>
              <h2 className="section-title mt-2">예정 교육 일정</h2>
            </div>
            <Link href="/notice/schedule" className="text-sm text-[#0f2d5e] font-medium hover:underline flex items-center gap-1">
              전체 일정 <ChevronRight size={14} />
            </Link>
          </div>
          <div className="space-y-3">
            {UPCOMING.map(({ date, type, title, seats }) => (
              <div key={title} className="bg-white rounded-xl px-6 py-4 flex items-center justify-between border border-gray-200">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-400 w-24 shrink-0">{date}</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                    type === '온라인' ? 'bg-blue-50 text-blue-700' : 'bg-orange-50 text-orange-700'
                  }`}>{type}</span>
                  <p className="font-medium text-gray-800">{title}</p>
                </div>
                <span className="text-sm font-semibold text-green-600 shrink-0">{seats}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-[#0f2d5e] text-white text-center">
        <div className="container-main">
          <h2 className="text-2xl font-bold mb-4">어떤 교육이 맞을지 모르시겠나요?</h2>
          <p className="text-blue-200 mb-8">전문 상담을 통해 최적의 교육과정을 안내해 드립니다.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:042-254-8060" className="btn-white">042-254-8060 전화 상담</a>
            <Link href="/contact/education" className="btn-primary border border-white/30">
              온라인 문의 <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
