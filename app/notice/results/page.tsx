import type { Metadata } from 'next'
import Link from 'next/link'
import { Trophy, Users, BookOpen, Star } from 'lucide-react'

export const metadata: Metadata = {
  title: '교육 실적',
  description: '대전경실련 도시안전디자인센터 교육 성과 및 수료 현황입니다.',
}

const STATS = [
  { icon: Users, value: '2,400+', label: '누적 수강생', sub: '2026년 기준' },
  { icon: BookOpen, value: '98%', label: '수료율', sub: '평균 수료율' },
  { icon: Trophy, value: '150+', label: '협력 기관', sub: '연계 활동 기관' },
  { icon: Star, value: '4.8/5', label: '교육 만족도', sub: '수강생 평균 평점' },
]

const HISTORY_DATA = [
  { year: '2026 (진행 중)', courses: 4, students: 180, institutions: 18 },
  { year: '2025', courses: 9, students: 480, institutions: 42 },
  { year: '2024', courses: 8, students: 420, institutions: 35 },
  { year: '2023 이전', courses: 17, students: 1980, institutions: 117 },
]

export default function ResultsPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container-main">
          <nav className="breadcrumb justify-center">
            <Link href="/" className="text-blue-300 hover:text-white">홈</Link>
            <span className="breadcrumb-sep text-blue-400">›</span>
            <Link href="/notice" className="text-blue-300 hover:text-white">공지·자료실</Link>
            <span className="breadcrumb-sep text-blue-400">›</span>
            <span className="text-white">교육 실적</span>
          </nav>
          <h1>교육 실적</h1>
          <p>지금까지 쌓아온 교육 성과와 수료 현황</p>
        </div>
      </div>

      {/* 핵심 지표 */}
      <section className="section-padding bg-white">
        <div className="container-main">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
            {STATS.map(({ icon: Icon, value, label, sub }) => (
              <div key={label} className="card text-center">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon size={24} className="text-[#0f2d5e]" />
                </div>
                <p className="text-3xl font-bold text-[#0f2d5e] mb-1">{value}</p>
                <p className="font-semibold text-gray-800 text-sm mb-0.5">{label}</p>
                <p className="text-xs text-gray-400">{sub}</p>
              </div>
            ))}
          </div>

          {/* 연도별 현황 */}
          <div className="section-header">
            <span className="section-tag">연도별 현황</span>
            <h2 className="section-title">연도별 교육 실적</h2>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm max-w-2xl mx-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#0f2d5e] text-white">
                  <th className="px-6 py-4 text-left">연도</th>
                  <th className="px-6 py-4 text-right">운영 과정</th>
                  <th className="px-6 py-4 text-right">수강생 수</th>
                  <th className="px-6 py-4 text-right">협력 기관</th>
                </tr>
              </thead>
              <tbody>
                {HISTORY_DATA.map(({ year, courses, students, institutions }, i) => (
                  <tr key={year} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 font-semibold text-[#0f2d5e]">{year}</td>
                    <td className="px-6 py-4 text-right text-gray-700">{courses}개</td>
                    <td className="px-6 py-4 text-right text-gray-700">{students.toLocaleString()}명</td>
                    <td className="px-6 py-4 text-right text-gray-700">{institutions}곳</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 주요 교육 활동 */}
      <section className="section-padding bg-gray-50">
        <div className="container-main">
          <div className="section-header">
            <span className="section-tag">주요 활동</span>
            <h2 className="section-title">주요 교육 활동 사례</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: '대전 서구 고령자 보이스피싱 예방 특강', date: '2026.03', count: '참여 92명', type: '오프라인' },
              { title: '생활안전지도사 6기 수료식', date: '2026.02', count: '수료 31명', type: '온라인' },
              { title: '보이스피싱 예방지도사 6기 수료식', date: '2026.01', count: '수료 36명', type: '온라인' },
              { title: '대전 중구 청소년 안전체험 교육', date: '2025.11', count: '참여 128명', type: '오프라인' },
              { title: '지역 복지관 생활안전 교육 프로그램', date: '2025.10', count: '참여 74명', type: '오프라인' },
              { title: '기업 직원 보이스피싱 예방 교육', date: '2025.09', count: '참여 52명', type: '오프라인' },
            ].map(({ title, date, count, type }) => (
              <div key={title} className="bg-white rounded-xl p-5 border border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    type === '온라인' ? 'bg-navy-50 text-navy-700' : 'bg-navy-100 text-navy-800'
                  }`}>{type}</span>
                  <span className="text-xs text-gray-400">{date}</span>
                </div>
                <h3 className="font-semibold text-gray-800 text-sm mb-2 leading-snug">{title}</h3>
                <p className="text-xs text-gray-500">{count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
