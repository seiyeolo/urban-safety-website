import type { Metadata } from 'next'
import Link from 'next/link'
import { Heart, Home, Car, Zap, Users, Baby, CheckCircle, ArrowRight, Clock, AlertTriangle } from 'lucide-react'

export const metadata: Metadata = {
  title: '생활안전 - 대전경실련 도시안전디자인센터',
  description: '일상생활 속 안전사고 예방과 대응. 가정·교통·화재·전기 안전부터 응급처치까지 실생활 밀착형 안전 교육.',
}

const SAFETY_AREAS = [
  {
    icon: Home,
    title: '가정 안전',
    description: '화재, 가스, 전기 등 가정 내 안전사고 예방',
    features: ['화재 예방 및 대응', '가스 안전 관리', '전기 안전 수칙', '응급처치 요령'],
    color: 'bg-orange-100 text-orange-600'
  },
  {
    icon: Car,
    title: '교통 안전',
    description: '보행자·운전자 교통사고 예방과 안전 수칙',
    features: ['보행 안전 수칙', '자전거 안전', '교통사고 대응', '어린이 교통안전'],
    color: 'bg-blue-100 text-blue-600'
  },
  {
    icon: Zap,
    title: '재해 대응',
    description: '자연재해·인적재해 대비 및 대응 요령',
    features: ['지진 대피 요령', '태풍·홍수 대비', '화재 대피법', '응급상황 신고'],
    color: 'bg-red-100 text-red-600'
  },
  {
    icon: Baby,
    title: '어린이 안전',
    description: '영유아·어린이 안전사고 예방과 보호',
    features: ['놀이시설 안전', '실종 예방', '학교 안전', '보호자 교육'],
    color: 'bg-green-100 text-green-600'
  }
]

const EDUCATION_TARGETS = [
  {
    title: '일반 시민',
    description: '기본적인 생활안전 수칙과 응급처치',
    programs: ['생활안전 기초과정', '응급처치 교육', '재해 대비 교육'],
    icon: Users
  },
  {
    title: '어르신',
    description: '고령자 맞춤형 안전 교육',
    programs: ['낙상 예방', '화재 안전', '보이스피싱 예방', '응급상황 대응'],
    icon: Heart
  },
  {
    title: '아동·청소년',
    description: '연령별 눈높이 안전 교육',
    programs: ['학교 안전', '교통 안전', '사이버 안전', '실종 예방'],
    icon: Baby
  }
]

const SAFETY_STATISTICS = [
  {
    title: '가정 안전사고',
    percentage: '35%',
    description: '적절한 예방 교육으로 감소 가능',
    trend: '감소'
  },
  {
    title: '교통사고 부상',
    percentage: '28%',
    description: '안전 수칙 준수 시 예방 효과',
    trend: '감소'
  },
  {
    title: '응급처치 성공률',
    percentage: '85%',
    description: '교육 이수자의 응급상황 대응률',
    trend: '증가'
  },
  {
    title: '안전 의식 향상',
    percentage: '92%',
    description: '교육 참여자 안전 의식 개선도',
    trend: '증가'
  }
]

const PRACTICAL_TIPS = [
  {
    category: '화재 안전',
    tips: [
      '소화기 위치와 사용법 숙지하기',
      '화재 발생 시 119 신고 후 대피',
      '연기 흡입 방지를 위해 낮은 자세 유지',
      '정기적인 전기 점검 및 관리'
    ]
  },
  {
    category: '응급처치',
    tips: [
      '의식 확인 → 119 신고 → 심폐소생술',
      '상처 부위 직접 압박으로 지혈',
      '골절 시 부목 고정 후 이송',
      '화상 시 차가운 물로 충분히 냉각'
    ]
  },
  {
    category: '자연재해',
    tips: [
      '지진 발생 시 책상 아래 몸 보호',
      '태풍 경보 시 외출 금지',
      '홍수 시 높은 곳으로 대피',
      '비상용품 사전 준비 및 점검'
    ]
  }
]

export default function LifeSafetyPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1a3a5c] to-[#002444] overflow-hidden py-16">
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <nav className="flex mb-6 gap-2 text-blue-300 text-sm font-medium">
            <Link href="/fields" className="hover:text-white">핵심분야</Link>
            <span className="material-symbols-outlined text-xs self-center">›</span>
            <span className="text-white">생활안전</span>
          </nav>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">생활안전</h1>
          <p className="text-xl text-blue-300 max-w-2xl">일상 속 안전사고 예방부터 응급상황 대응까지. 모든 시민이 알아야 할 생활안전 수칙.</p>
        </div>

        {/* Decorative Element */}
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
          <Heart size={200} className="text-white" />
        </div>
      </section>

      {/* Main Content */}
      <section className="px-8 py-16">
        <div className="max-w-7xl mx-auto">
          {/* 생활안전 영역 */}
          <div className="mb-16">
            <h2 className="text-[32px] font-bold text-[#002444] mb-4 flex items-center gap-3">
              <span className="w-8 h-1 bg-[#2e7d32] block"></span>
              주요 생활안전 분야
            </h2>
            <p className="text-gray-600 text-lg mb-12 max-w-3xl">
              일상생활에서 발생할 수 있는 다양한 안전사고를 예방하고, 응급상황 발생 시 올바른 대응 방법을 교육합니다.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {SAFETY_AREAS.map(({ icon: Icon, title, description, features, color }) => (
                <div key={title} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className={`w-16 h-16 ${color} rounded-xl flex items-center justify-center mb-6`}>
                    <Icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{description}</p>
                  <ul className="space-y-2">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle size={16} className="text-[#2e7d32] mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* 교육 대상별 프로그램 */}
          <div className="mb-16">
            <h2 className="text-[32px] font-bold text-[#002444] mb-12 flex items-center gap-3">
              <span className="w-8 h-1 bg-[#2e7d32] block"></span>
              대상별 맞춤 교육
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {EDUCATION_TARGETS.map(({ icon: Icon, title, description, programs }) => (
                <div key={title} className="bg-white p-10 rounded-xl shadow-sm border border-gray-100">
                  <div className="w-16 h-16 bg-[#2e7d32]/10 rounded-xl flex items-center justify-center mb-6">
                    <Icon size={32} className="text-[#2e7d32]" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
                  <p className="text-gray-600 mb-6">{description}</p>

                  <div className="space-y-2">
                    <h4 className="font-bold text-gray-900 text-sm mb-3">주요 교육과정</h4>
                    {programs.map((program, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 bg-[#2e7d32] rounded-full"></div>
                        <span>{program}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 안전 통계 */}
          <div className="mb-16 bg-[#f5f3f3] rounded-xl p-12">
            <h2 className="text-[32px] font-bold text-[#002444] mb-12 flex items-center gap-3">
              <span className="w-8 h-1 bg-[#2e7d32] block"></span>
              생활안전 교육 효과
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {SAFETY_STATISTICS.map((stat) => (
                <div key={stat.title} className="bg-white p-8 rounded-xl shadow-sm text-center">
                  <div className="text-4xl font-bold text-[#2e7d32] mb-2">{stat.percentage}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{stat.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{stat.description}</p>
                  <div className={`inline-flex items-center gap-1 mt-3 text-xs font-medium ${
                    stat.trend === '증가' ? 'text-[#2e7d32]' : 'text-blue-600'
                  }`}>
                    <ArrowRight size={12} className={stat.trend === '증가' ? 'rotate-[-45deg]' : 'rotate-[45deg]'} />
                    {stat.trend}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 실용 안전 팁 */}
          <div>
            <h2 className="text-[32px] font-bold text-[#002444] mb-12 flex items-center gap-3">
              <span className="w-8 h-1 bg-[#2e7d32] block"></span>
              실용 안전 가이드
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {PRACTICAL_TIPS.map((section) => (
                <div key={section.category} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-6">
                    <AlertTriangle size={24} className="text-[#ff6f00]" />
                    <h3 className="text-xl font-bold text-gray-900">{section.category}</h3>
                  </div>

                  <ul className="space-y-3">
                    {section.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-700">
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-[#2e7d32]/10 text-[#2e7d32] text-xs font-bold rounded-full flex-shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <span className="text-sm leading-relaxed">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 py-16 bg-gradient-to-br from-[#2e7d32] to-[#1b5e20]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-[32px] font-bold text-white mb-6">생활안전 전문가가 되어보세요</h2>
          <p className="text-green-100 mb-8 text-lg leading-relaxed">
            체계적인 교육을 통해 나와 가족, 지역사회의 안전을 지키는 전문가가 되실 수 있습니다.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/certificates/life-safety"
              className="bg-white text-[#2e7d32] px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <Heart size={20} />
              생활안전지도사
            </Link>
            <Link
              href="/education"
              className="bg-[#217128] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#1a5a21] transition-colors flex items-center gap-2 border-2 border-white/20"
            >
              <ArrowRight size={20} />
              전체 교육과정 보기
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