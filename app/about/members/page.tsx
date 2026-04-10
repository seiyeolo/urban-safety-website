import type { Metadata } from 'next'
import Link from 'next/link'
import { User } from 'lucide-react'

export const metadata: Metadata = {
  title: '운영진/전문위원',
  description: '대전경실련 도시안전디자인센터 운영진 및 전문위원을 소개합니다.',
}

const EXECUTIVES = [
  { role: '센터장', name: '○○○', dept: '대전경실련', spec: '범죄예방, 도시안전' },
  { role: '부센터장', name: '○○○', dept: '대전경실련', spec: '생활안전교육, 지역사회' },
  { role: '사무국장', name: '○○○', dept: '대전경실련', spec: '행정, 운영관리' },
]

const EXPERTS = [
  { name: '○○○', title: '교수', affil: '○○대학교 범죄학과', field: 'CPTED, 범죄예방환경설계' },
  { name: '○○○', title: '교수', affil: '○○대학교 사회복지학과', field: '취약계층 안전복지' },
  { name: '○○○', title: '박사', affil: '한국형사·법무정책연구원', field: '보이스피싱 범죄 연구' },
  { name: '○○○', title: '팀장', affil: '대전경찰청 사이버범죄수사팀', field: '디지털 금융사기 수사' },
  { name: '○○○', title: '소방관', affil: '대전소방본부', field: '재난대응, 응급처치' },
  { name: '○○○', title: '교육전문가', affil: '○○평생교육원', field: '성인교육, 교수설계' },
]

export default function MembersPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container-main">
          <nav className="breadcrumb justify-center">
            <Link href="/" className="text-blue-300 hover:text-white">홈</Link>
            <span className="breadcrumb-sep text-blue-400">›</span>
            <Link href="/about" className="text-blue-300 hover:text-white">센터소개</Link>
            <span className="breadcrumb-sep text-blue-400">›</span>
            <span className="text-white">운영진/전문위원</span>
          </nav>
          <h1>운영진/전문위원</h1>
          <p>센터를 이끌어가는 전문가들을 소개합니다</p>
        </div>
      </div>

      {/* 운영진 */}
      <section className="section-padding bg-white">
        <div className="container-main">
          <div className="section-header">
            <span className="section-tag">운영진</span>
            <h2 className="section-title">운영진 소개</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {EXECUTIVES.map(({ role, name, dept, spec }) => (
              <div key={role} className="card text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User size={28} className="text-[#0f2d5e]" />
                </div>
                <span className="text-xs font-semibold text-[#0f2d5e] bg-blue-50 px-2 py-1 rounded-full">{role}</span>
                <h3 className="text-lg font-bold text-gray-900 mt-3">{name}</h3>
                <p className="text-sm text-gray-500 mt-1">{dept}</p>
                <p className="text-xs text-gray-400 mt-2">{spec}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 전문위원 */}
      <section className="section-padding bg-gray-50">
        <div className="container-main">
          <div className="section-header">
            <span className="section-tag">전문위원</span>
            <h2 className="section-title">전문위원 소개</h2>
            <p className="section-desc">범죄예방·생활안전 분야 각계 전문가로 구성된 자문단입니다.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {EXPERTS.map(({ name, title, affil, field }) => (
              <div key={`${name}-${affil}`} className="bg-white rounded-xl p-5 border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                    <User size={18} className="text-gray-400" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{name} <span className="font-normal text-gray-500 text-sm">{title}</span></p>
                    <p className="text-xs text-gray-400">{affil}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-2">{field}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-400 mt-8">※ 전문위원 명단은 임명 순서에 따라 기재합니다.</p>
        </div>
      </section>
    </>
  )
}
