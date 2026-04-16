import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, Eye, Users, BookOpen, Target, CheckCircle, ArrowRight, Clock, MapPin } from 'lucide-react'

export const metadata: Metadata = {
  title: '범죄예방 - 대전경실련 도시안전디자인센터',
  description: 'CPTED 환경설계를 통한 범죄예방. 보이스피싱부터 생활범죄까지, 시민이 직접 참여하는 예방 중심의 안전 프로그램.',
}

const CRIME_PREVENTION_AREAS = [
  {
    icon: Shield,
    title: '보이스피싱 예방',
    description: 'AI 피싱 기법 분석 및 대응 전략',
    features: ['최신 피싱 기법 분석', '예방 교육 프로그램', '신고·대응 체계'],
    color: 'bg-red-100 text-red-600'
  },
  {
    icon: Eye,
    title: 'CPTED 환경설계',
    description: '범죄예방 환경설계를 통한 안전 공간 조성',
    features: ['자연적 감시', '접근 통제', '영역성 강화'],
    color: 'bg-blue-100 text-blue-600'
  },
  {
    icon: Users,
    title: '지역사회 안전망',
    description: '주민 참여형 범죄예방 네트워크 구축',
    features: ['주민자치 연계', '안전지킴이 양성', '신고 체계 구축'],
    color: 'bg-green-100 text-green-600'
  },
  {
    icon: Target,
    title: '취약계층 보호',
    description: '어르신·아동 등 범죄 취약계층 맞춤 보호',
    features: ['맞춤형 교육', '보호자 연계', '응급상황 대응'],
    color: 'bg-purple-100 text-purple-600'
  }
]

const PROGRAMS = [
  {
    title: '보이스피싱 예방지도사',
    type: '전문가 과정',
    duration: '40시간',
    level: '중급',
    features: ['CPTED 이론·실무', '피싱 사례 분석', '예방 교육법', '현장 실습'],
    link: '/certificates/voice-phishing'
  },
  {
    title: '생활안전지도사',
    type: '일반 과정',
    duration: '24시간',
    level: '기초',
    features: ['생활 안전 수칙', '응급처치', '안전 진단', '지역 활동'],
    link: '/certificates/life-safety'
  }
]

const SUCCESS_CASES = [
  {
    title: '서구 용문동 CPTED 적용',
    description: '골목길 환경개선을 통한 범죄 50% 감소',
    period: '2025년 9월 - 12월',
    results: ['범죄 발생률 50% 감소', '주민 안전 체감도 85% 향상', 'CCTV 사각지대 해소']
  },
  {
    title: '어르신 보이스피싱 예방 교육',
    description: '경로당 순회 교육으로 피해 사례 급감',
    period: '2025년 상반기',
    results: ['32개 경로당 1,200명 교육', '피해 신고 사례 제로', '예방 인식 90% 향상']
  }
]

export default function CrimePreventionPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1a3a5c] to-[#002444] overflow-hidden py-16">
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <nav className="flex mb-6 gap-2 text-blue-300 text-sm font-medium">
            <Link href="/fields" className="hover:text-white">핵심분야</Link>
            <span className="material-symbols-outlined text-xs self-center">›</span>
            <span className="text-white">범죄예방</span>
          </nav>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">범죄예방</h1>
          <p className="text-xl text-blue-300 max-w-2xl">CPTED 환경설계를 통한 근본적 범죄예방. 시민 참여로 만드는 안전한 도시.</p>
        </div>

        {/* Decorative Element */}
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
          <Shield size={200} className="text-white" />
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 sm:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          {/* 범죄예방 영역 */}
          <div className="mb-16">
            <h2 className="text-xl sm:text-2xl lg:text-[32px] font-bold text-[#002444] mb-4 flex items-center gap-3">
              <span className="w-8 h-1 bg-[#2e7d32] block"></span>
              주요 범죄예방 영역
            </h2>
            <p className="text-gray-600 text-lg mb-12 max-w-3xl">
              CPTED(Crime Prevention Through Environmental Design) 이론을 바탕으로 물리적 환경 개선과 사회적 활동을 통해 범죄를 예방합니다.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {CRIME_PREVENTION_AREAS.map(({ icon: Icon, title, description, features, color }) => (
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

          {/* 교육 프로그램 */}
          <div className="mb-16">
            <h2 className="text-xl sm:text-2xl lg:text-[32px] font-bold text-[#002444] mb-12 flex items-center gap-3">
              <span className="w-8 h-1 bg-[#2e7d32] block"></span>
              범죄예방 교육 프로그램
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {PROGRAMS.map((program) => (
                <div key={program.title} className="bg-white p-5 sm:p-8 lg:p-10 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <span className="inline-block px-3 py-1 bg-[#2e7d32]/10 text-[#2e7d32] text-xs font-bold rounded-full mb-3">
                        {program.type}
                      </span>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{program.title}</h3>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <div className="flex items-center gap-1 mb-1">
                        <Clock size={14} />
                        <span>{program.duration}</span>
                      </div>
                      <div className="font-medium text-[#2e7d32]">{program.level}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {program.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 bg-[#2e7d32] rounded-full"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={program.link}
                    className="inline-flex items-center gap-2 bg-[#2e7d32] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#217128] transition-colors"
                  >
                    자세히 보기 <ArrowRight size={16} />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* 성공 사례 */}
          <div className="bg-[#f5f3f3] rounded-xl p-12">
            <h2 className="text-xl sm:text-2xl lg:text-[32px] font-bold text-[#002444] mb-12 flex items-center gap-3">
              <span className="w-8 h-1 bg-[#2e7d32] block"></span>
              범죄예방 성공 사례
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {SUCCESS_CASES.map((case_study, index) => (
                <div key={index} className="bg-white p-8 rounded-xl shadow-sm">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-[#2e7d32]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin size={24} className="text-[#2e7d32]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{case_study.title}</h3>
                      <p className="text-gray-600 mb-2">{case_study.description}</p>
                      <p className="text-sm text-gray-500">{case_study.period}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-bold text-gray-900 mb-3">주요 성과</h4>
                    {case_study.results.map((result, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-[#2e7d32] mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{result}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-8 py-16 bg-gradient-to-br from-[#2e7d32] to-[#1b5e20]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl lg:text-[32px] font-bold text-white mb-6">범죄예방 전문가가 되어보세요</h2>
          <p className="text-green-100 mb-8 text-lg leading-relaxed">
            체계적인 교육과정을 통해 지역사회 안전을 지키는 전문가로 성장하실 수 있습니다.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/certificates/voice-phishing"
              className="bg-white text-[#2e7d32] px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <BookOpen size={20} />
              보이스피싱 예방지도사
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