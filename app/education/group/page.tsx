import type { Metadata } from 'next'
import Link from 'next/link'
import { Users, CheckCircle, ArrowRight, Phone, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: '기관·단체 교육',
  description: '대전경실련 도시안전디자인센터 기관·단체 맞춤형 안전교육 프로그램 안내입니다.',
}

const TARGETS = [
  { emoji: '🏢', label: '기업·공공기관', desc: '직원 안전의식 제고 및 생활안전 교육' },
  { emoji: '🏫', label: '학교·교육기관', desc: '학생 대상 안전교육 및 보이스피싱 예방' },
  { emoji: '🏥', label: '복지관·의료기관', desc: '고령층·취약계층 맞춤형 안전 프로그램' },
  { emoji: '🏛️', label: '지자체·공익단체', desc: '지역사회 안전문화 캠페인 협력 교육' },
]

export default function GroupEducationPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container-main">
          <nav className="breadcrumb justify-center">
            <Link href="/" className="text-blue-300 hover:text-white">홈</Link>
            <span className="breadcrumb-sep text-blue-400">›</span>
            <Link href="/education" className="text-blue-300 hover:text-white">교육안내</Link>
            <span className="breadcrumb-sep text-blue-400">›</span>
            <span className="text-white">기관·단체 교육</span>
          </nav>
          <h1>기관·단체 교육</h1>
          <p>기관·단체의 특성에 맞춘 맞춤형 안전교육 프로그램</p>
        </div>
      </div>

      <section className="section-padding bg-white">
        <div className="container-main">
          {/* 특징 */}
          <div className="grid sm:grid-cols-2 gap-6 mb-14">
            <div className="bg-blue-50 rounded-2xl p-7">
              <Users size={32} className="text-[#0f2d5e] mb-4" />
              <h3 className="font-bold text-[#0f2d5e] text-lg mb-3">맞춤형 프로그램 설계</h3>
              <ul className="space-y-2">
                {[
                  '기관 특성과 수강 인원에 맞춘 커리큘럼',
                  '1회성 특강부터 정기 교육까지 유연한 운영',
                  '온·오프라인 혼합형 운영 가능',
                  '교육 전 수요조사 및 사전 미팅 진행',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle size={14} className="text-green-500 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-50 rounded-2xl p-7">
              <h3 className="font-bold text-[#0f2d5e] text-lg mb-3">교육 후 지원</h3>
              <ul className="space-y-2">
                {[
                  '교육 결과 보고서 제공',
                  '수료증 발급 (단체 요청 시)',
                  '후속 교육 및 캠페인 연계 지원',
                  '교육 자료 제공 (PPT, 리플렛 등)',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle size={14} className="text-green-500 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 대상 기관 */}
          <div className="section-header">
            <span className="section-tag">교육 대상</span>
            <h2 className="section-title">이런 기관·단체에 적합합니다</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
            {TARGETS.map(({ emoji, label, desc }) => (
              <div key={label} className="card text-center">
                <p className="text-4xl mb-4">{emoji}</p>
                <h3 className="font-bold text-[#0f2d5e] mb-2">{label}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* 문의 */}
          <div className="bg-[#0f2d5e] rounded-2xl p-8 text-white text-center">
            <h3 className="text-xl font-bold mb-3">단체교육 문의</h3>
            <p className="text-blue-200 text-sm mb-6">
              단체 규모, 교육 주제, 일정 등을 알려주시면 맞춤 제안서를 보내드립니다.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="tel:042-254-8060" className="btn-white flex items-center gap-2">
                <Phone size={16} />042-254-8060
              </a>
              <Link href="/contact/group" className="btn-primary border border-white/30 flex items-center gap-2">
                <Mail size={16} />온라인 문의 <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
