import type { Metadata } from 'next'
import Link from 'next/link'
import { Monitor, CheckCircle, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: '온라인 교육',
  description: '대전경실련 도시안전디자인센터 온라인 자격증 취득 교육과정 안내입니다.',
}

const COURSES = [
  {
    title: '보이스피싱 예방지도사',
    tag: '자격증 취득',
    tagColor: 'bg-navy-50 text-navy-700',
    duration: '4주 (총 20시간)',
    cost: '수강료 220,000원',
    features: ['녹화강의 자율 수강', '실시간 특강 포함', '온라인 검정 응시', '수료 후 자격증 발급'],
    href: '/certificates/voice-phishing',
  },
  {
    title: '생활안전지도사',
    tag: '자격증 취득',
    tagColor: 'bg-green-50 text-green-700',
    duration: '4주 (총 20시간)',
    cost: '수강료 220,000원',
    features: ['녹화강의 자율 수강', '실시간 특강 포함', '온라인 검정 응시', '수료 후 자격증 발급'],
    href: '/certificates/life-safety',
  },
]

export default function OnlineEducationPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container-main">
          <nav className="breadcrumb justify-center">
            <Link href="/" className="text-blue-300 hover:text-white">홈</Link>
            <span className="breadcrumb-sep text-blue-400">›</span>
            <Link href="/education" className="text-blue-300 hover:text-white">교육안내</Link>
            <span className="breadcrumb-sep text-blue-400">›</span>
            <span className="text-white">온라인 교육</span>
          </nav>
          <h1>온라인 교육</h1>
          <p>언제 어디서나 수강 가능한 자격증 취득 과정</p>
        </div>
      </div>

      <section className="section-padding bg-white">
        <div className="container-main">
          {/* 특징 */}
          <div className="grid sm:grid-cols-4 gap-5 mb-14">
            {[
              { icon: '🕐', label: '자율 수강', desc: '기간 내 자유롭게 수강' },
              { icon: '📱', label: '모바일 가능', desc: 'PC·스마트폰 모두 지원' },
              { icon: '🎓', label: '실시간 특강', desc: '전문 강사와 직접 소통' },
              { icon: '📜', label: '자격증 발급', desc: '합격 후 공식 자격증' },
            ].map(({ icon, label, desc }) => (
              <div key={label} className="text-center p-5 bg-gray-50 rounded-xl">
                <p className="text-3xl mb-3">{icon}</p>
                <p className="font-bold text-[#0f2d5e] mb-1">{label}</p>
                <p className="text-xs text-gray-500">{desc}</p>
              </div>
            ))}
          </div>

          {/* 과정 목록 */}
          <div className="section-header">
            <span className="section-tag">온라인 과정</span>
            <h2 className="section-title">운영 중인 온라인 과정</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {COURSES.map(({ title, tag, tagColor, duration, cost, features, href }) => (
              <div key={href} className="card">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                    <Monitor size={20} className="text-[#0f2d5e]" />
                  </div>
                  <div>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${tagColor}`}>{tag}</span>
                    <h3 className="font-bold text-[#0f2d5e] mt-1">{title}</h3>
                  </div>
                </div>
                <div className="flex gap-4 text-sm text-gray-600 mb-5">
                  <span>📅 {duration}</span>
                  <span>💰 {cost}</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-green-500 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={href} className="btn-primary w-full justify-center text-sm">
                  자세히 보기 <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
