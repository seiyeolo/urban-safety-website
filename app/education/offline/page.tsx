import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Calendar, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: '오프라인 교육',
  description: '대전경실련 도시안전디자인센터 오프라인 현장 교육과정 안내입니다.',
}

const PROGRAMS = [
  {
    title: '생활안전 특강',
    target: '지역주민, 복지관 이용자',
    duration: '2~3시간',
    format: '강의 + 실습',
    desc: '낙상예방, 화재대피, 응급처치 등 생활안전 핵심 주제를 현장에서 직접 배웁니다.',
  },
  {
    title: '보이스피싱 예방 특강',
    target: '고령층, 지역주민',
    duration: '2시간',
    format: '강의 + Q&A',
    desc: '최신 보이스피싱 수법 및 사례 중심 강의로 피해예방 실천 능력을 키웁니다.',
  },
  {
    title: '청소년 안전체험 교육',
    target: '초·중·고등학생',
    duration: '1~2시간',
    format: '체험형 활동',
    desc: '생활 속 안전 위험요인을 직접 찾아보고 예방하는 참여형 체험 교육.',
  },
]

export default function OfflineEducationPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container-main">
          <nav className="breadcrumb justify-center">
            <Link href="/" className="text-blue-300 hover:text-white">홈</Link>
            <span className="breadcrumb-sep text-blue-400">›</span>
            <Link href="/education" className="text-blue-300 hover:text-white">교육안내</Link>
            <span className="breadcrumb-sep text-blue-400">›</span>
            <span className="text-white">오프라인 교육</span>
          </nav>
          <h1>오프라인 교육</h1>
          <p>강사와 함께하는 현장 집합 교육</p>
        </div>
      </div>

      <section className="section-padding bg-white">
        <div className="container-main">
          <div className="section-header">
            <span className="section-tag">오프라인 프로그램</span>
            <h2 className="section-title">운영 프로그램</h2>
            <p className="section-desc">현장 상황에 맞게 운영시간과 내용을 조정할 수 있습니다.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {PROGRAMS.map(({ title, target, duration, format, desc }) => (
              <div key={title} className="card">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin size={16} className="text-[#e85d04]" />
                  <span className="text-xs font-semibold text-[#e85d04]">현장 교육</span>
                </div>
                <h3 className="font-bold text-[#0f2d5e] text-lg mb-3">{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-5">{desc}</p>
                <div className="space-y-2 text-sm border-t border-gray-100 pt-4">
                  <div className="flex justify-between"><span className="text-gray-400">대상</span><span className="font-medium text-gray-700">{target}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">소요시간</span><span className="font-medium text-gray-700">{duration}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">교육형태</span><span className="font-medium text-gray-700">{format}</span></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-orange-50 rounded-2xl p-8 text-center">
            <Calendar size={32} className="text-[#e85d04] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[#0f2d5e] mb-3">교육 일정 문의</h3>
            <p className="text-gray-600 text-sm mb-6">
              기관 방문 교육 또는 특강 일정은 전화·온라인 문의로 협의하실 수 있습니다.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="tel:042-254-8060" className="btn-primary">042-254-8060 전화 문의</a>
              <Link href="/contact/education" className="btn-secondary">
                온라인 문의 <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
