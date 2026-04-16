import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, Heart, ArrowRight, CheckCircle, HandHeart, GraduationCap, Wrench } from 'lucide-react'

export const metadata: Metadata = {
  title: '핵심분야 - 대전경실련 도시안전디자인센터',
  description: '범죄예방과 생활안전, 두 핵심분야를 통해 시민이 안전한 일상을 누릴 수 있도록 지원합니다.',
}

const CORE_FIELDS = [
  {
    icon: Shield,
    title: '범죄예방',
    subtitle: 'Crime Prevention',
    description: 'CPTED 환경설계를 통한 근본적 범죄예방',
    features: [
      '보이스피싱 예방 전문가 양성',
      'CPTED 환경설계 이론·실무',
      '지역사회 안전망 구축',
      '취약계층 맞춤 보호 시스템'
    ],
    programs: ['보이스피싱 예방지도사', 'CPTED 전문가 과정'],
    stats: { value: '50%', label: '범죄 발생률 감소' },
    link: '/fields/crime-prevention',
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-50',
    textColor: 'text-red-600'
  },
  {
    icon: Heart,
    title: '생활안전',
    subtitle: 'Life Safety',
    description: '일상 속 안전사고 예방과 응급상황 대응',
    features: [
      '가정·교통·화재 안전 교육',
      '연령별 맞춤형 안전 수칙',
      '응급처치 실습 교육',
      '재해 대비 및 대응 요령'
    ],
    programs: ['생활안전지도사', '응급처치 교육'],
    stats: { value: '85%', label: '안전 의식 향상' },
    link: '/fields/life-safety',
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
    textColor: 'text-green-600'
  }
]

const APPROACH = [
  {
    icon: HandHeart,
    title: '시민 참여',
    description: '전문가만이 아닌 모든 시민이 참여하는 안전 활동'
  },
  {
    icon: GraduationCap,
    title: '맞춤 교육',
    description: '연령과 상황에 맞는 차별화된 교육 프로그램'
  },
  {
    icon: Wrench,
    title: '실용 중심',
    description: '이론보다는 실제 현장에서 활용 가능한 실무 교육'
  }
]

export default function FieldsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1a3a5c] to-[#002444] overflow-hidden py-16">
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">핵심분야</h1>
          <p className="text-xl text-blue-300 max-w-2xl">
            범죄예방과 생활안전, 두 핵심분야를 통해 시민이 안전한 일상을 누릴 수 있도록 지원합니다.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 sm:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          {/* 소개 */}
          <div className="text-center mb-16">
            <h2 className="text-xl sm:text-2xl lg:text-[32px] font-bold text-[#002444] mb-6">
              35년 경실련 공신력으로 만드는 안전한 도시
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
              대전경실련 도시안전디자인센터는 범죄예방과 생활안전 두 분야를 중심으로
              시민이 주도하는 안전 문화를 확산시키고 있습니다.
            </p>
          </div>

          {/* 핵심분야 카드 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {CORE_FIELDS.map(({ icon: Icon, title, subtitle, description, features, programs, stats, link, color, bgColor, textColor }) => (
              <div key={title} className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                {/* 헤더 */}
                <div className={`bg-gradient-to-r ${color} p-8 text-white`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                      <Icon size={32} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{title}</h3>
                      <p className="text-white/80 text-sm">{subtitle}</p>
                    </div>
                  </div>
                  <p className="text-white/90">{description}</p>
                </div>

                {/* 내용 */}
                <div className="p-8">
                  {/* 주요 활동 */}
                  <div className="mb-8">
                    <h4 className="font-bold text-gray-900 mb-4">주요 활동</h4>
                    <ul className="space-y-3">
                      {features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle size={16} className="text-[#2e7d32] mt-1 flex-shrink-0" />
                          <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 교육 프로그램 */}
                  <div className="mb-8">
                    <h4 className="font-bold text-gray-900 mb-4">주요 교육과정</h4>
                    <div className="flex flex-wrap gap-2">
                      {programs.map((program, index) => (
                        <span key={index} className={`px-3 py-1 ${bgColor} ${textColor} text-sm font-medium rounded-full`}>
                          {program}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 성과 */}
                  <div className={`${bgColor} p-6 rounded-xl mb-6`}>
                    <div className={`text-3xl font-bold ${textColor} mb-2`}>{stats.value}</div>
                    <div className="text-gray-700 font-medium">{stats.label}</div>
                  </div>

                  {/* 버튼 */}
                  <Link
                    href={link}
                    className={`inline-flex items-center gap-2 bg-gradient-to-r ${color} text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity w-full justify-center`}
                  >
                    자세히 보기 <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* 접근 방식 */}
          <div className="bg-[#f5f3f3] rounded-xl p-12">
            <h2 className="text-xl sm:text-2xl lg:text-[32px] font-bold text-[#002444] mb-4 text-center">
              우리의 접근 방식
            </h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              이론적 지식보다는 실제 현장에서 활용할 수 있는 실무 중심의 교육을 통해
              진정한 안전 전문가를 양성합니다.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {APPROACH.map(({ icon: Icon, title, description }) => (
                <div key={title} className="bg-white p-8 rounded-xl shadow-sm text-center">
                  <div className="w-16 h-16 bg-[#2e7d32]/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <Icon size={32} className="text-[#2e7d32]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
                  <p className="text-gray-600 leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-8 py-16 bg-gradient-to-br from-[#2e7d32] to-[#1b5e20]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl lg:text-[32px] font-bold text-white mb-6">지역사회 안전 리더가 되어보세요</h2>
          <p className="text-green-100 mb-8 text-lg leading-relaxed">
            체계적인 교육과정을 통해 범죄예방과 생활안전 전문가로 성장하실 수 있습니다.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/certificates"
              className="bg-white text-[#2e7d32] px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <Shield size={20} />
              자격증 알아보기
            </Link>
            <Link
              href="/education"
              className="bg-[#217128] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#1a5a21] transition-colors flex items-center gap-2 border-2 border-white/20"
            >
              <ArrowRight size={20} />
              교육과정 보기
            </Link>
          </div>

          <div className="mt-8 text-green-100 text-sm">
            <p>문의: 042-254-8060 | 평일 09:00-18:00</p>
          </div>
        </div>
      </section>
    </>
  )
}