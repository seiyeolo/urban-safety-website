import type { Metadata } from 'next'
import Link from 'next/link'
import { AlertTriangle, BarChart3, CheckCircle2, Filter, Search, Send, ShieldCheck, UserPlus, Users } from 'lucide-react'
import { mockEnrollments, safetyGates } from '@/lib/mockCourses'

export const metadata: Metadata = {
  title: '수강생 배정 mock | 관리자 | 도시안전디자인센터',
  description: '오프라인 수강생을 온라인 강의에 배정하는 관리자 mock 화면입니다.',
}

export default function AdminEnrollmentsMockPage() {
  const avgProgress = Math.round(mockEnrollments.reduce((sum, row) => sum + row.progress, 0) / mockEnrollments.length)

  return (
    <main className="min-h-screen bg-[#f3f5ef]">
      <section className="border-b border-navy-100 bg-white">
        <div className="container-main flex flex-col gap-5 py-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-black text-green-800"><ShieldCheck size={16} /> Admin mock · 실제 발송 없음</p>
            <h1 className="text-4xl font-black tracking-[-0.045em] text-navy-900">수강생 배정 관리</h1>
            <p className="mt-3 max-w-3xl leading-8 text-gray-600">오프라인 수강생을 온라인 강의로 전환하는 운영 흐름을 검증하는 mock 관리자 화면입니다.</p>
          </div>
          <Link href="/admin" className="inline-flex items-center justify-center rounded-2xl border border-navy-100 bg-white px-5 py-3 text-sm font-black text-navy-900 transition hover:bg-navy-50">기존 관리자 홈</Link>
        </div>
      </section>

      <section className="container-main py-8">
        <div className="mb-6 grid gap-4 md:grid-cols-4">
          {[
            { icon: Users, label: 'mock 수강생', value: `${mockEnrollments.length}명` },
            { icon: BarChart3, label: '평균 진도율', value: `${avgProgress}%` },
            { icon: UserPlus, label: '초대 대기', value: '1명' },
            { icon: CheckCircle2, label: '완료/수료', value: '1명' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="rounded-[1.75rem] bg-white p-6 shadow-[0_14px_45px_rgba(26,58,92,0.08)]">
              <Icon className="mb-4 text-green-700" size={24} />
              <p className="text-sm font-bold text-gray-500">{label}</p>
              <p className="mt-1 text-3xl font-black text-navy-900">{value}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <section className="rounded-[2rem] bg-white p-6 shadow-[0_16px_55px_rgba(26,58,92,0.08)]">
            <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <p className="text-sm font-black text-green-700">Enrollment operations</p>
                <h2 className="text-2xl font-black text-navy-900">배정 현황 테이블</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#f5f7f2] px-4 py-2 text-sm font-bold text-gray-700"><Filter size={15} /> 2026년 7월</span>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#f5f7f2] px-4 py-2 text-sm font-bold text-gray-700"><Search size={15} /> 이름/과정 검색</span>
              </div>
            </div>

            <div className="overflow-hidden rounded-[1.5rem] border border-navy-100">
              <div className="hidden grid-cols-[1fr_1fr_1.1fr_120px_120px] gap-4 bg-navy-900 px-5 py-4 text-sm font-black text-white lg:grid">
                <span>수강생</span>
                <span>기수</span>
                <span>배정 과정</span>
                <span>진도</span>
                <span>상태</span>
              </div>
              <div className="divide-y divide-navy-100">
                {mockEnrollments.map((row) => (
                  <div key={row.name} className="grid gap-4 px-5 py-5 lg:grid-cols-[1fr_1fr_1.1fr_120px_120px] lg:items-center">
                    <div>
                      <p className="font-black text-navy-900">{row.name}</p>
                      <p className="text-xs font-semibold text-gray-500">{row.lastSeen}</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-700">{row.cohort}</p>
                    <p className="text-sm font-semibold text-gray-700">{row.course}</p>
                    <div>
                      <p className="mb-1 text-sm font-black text-navy-900">{row.progress}%</p>
                      <div className="h-2 overflow-hidden rounded-full bg-navy-50"><div className="h-full rounded-full bg-green-700" style={{ width: `${Math.max(row.progress, 5)}%` }} /></div>
                    </div>
                    <span className="w-fit rounded-full bg-green-50 px-3 py-1 text-xs font-black text-green-800">{row.invite}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 rounded-[1.5rem] border border-dashed border-amber-100 bg-amber-50 p-5 text-sm leading-7 text-gray-700 md:flex-row md:items-center md:justify-between">
              <div className="flex gap-3">
                <AlertTriangle className="mt-1 shrink-0 text-amber-700" size={20} />
                <p><b className="text-navy-900">발송 비활성:</b> 초대메일/SMS/카카오톡 발송은 실제 개인정보와 외부 발송이므로 별도 승인 전 실행하지 않습니다.</p>
              </div>
              <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gray-300 px-5 py-3 font-black text-gray-600" disabled><Send size={16} /> 초대 발송 잠김</button>
            </div>
          </section>

          <aside className="space-y-5">
            <div className="rounded-[2rem] bg-[#0d1829] p-6 text-white">
              <h2 className="text-2xl font-black">운영 흐름</h2>
              <div className="mt-5 space-y-3">
                {['기수/반 선택', 'mock 수강생 확인', '강의 배정 상태 확인', '막힌 수강생 후보 표시'].map((step, index) => (
                  <div key={step} className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                    <p className="text-xs font-black text-green-100">Step {index + 1}</p>
                    <p className="mt-1 font-bold">{step}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[2rem] border border-amber-100 bg-amber-50 p-6">
              <h2 className="mb-4 text-xl font-black text-navy-900">소라 게이트</h2>
              <ul className="space-y-3 text-sm font-semibold leading-7 text-gray-700">
                {safetyGates.map((gate) => <li key={gate}>• {gate}</li>)}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}
