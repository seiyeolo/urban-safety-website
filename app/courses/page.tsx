import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Filter, LayoutDashboard, LockKeyhole, PlayCircle, ShieldCheck } from 'lucide-react'
import { courseCategories, dashboardInspiration, onlineCourses, safetyGates } from '@/lib/mockCourses'

export const metadata: Metadata = {
  title: '온라인 강의실 | 도시안전디자인센터',
  description: '오프라인 수강생이 온라인에서 이어 학습할 수 있는 mock 기반 강의 카탈로그입니다.',
}

const statusLabel = {
  open: '수강 가능',
  invite_only: '초대 전용',
  preparing: '준비 중',
}

export default function CoursesPage() {
  const totalLessons = onlineCourses.reduce((sum, course) => sum + course.lessonsCount, 0)
  const totalHours = Math.round(onlineCourses.reduce((sum, course) => sum + course.totalMinutes, 0) / 60)

  return (
    <main className="min-h-screen bg-[#f5f7f2]">
      <section className="relative overflow-hidden bg-[#0d1829] text-white">
        <div className="absolute inset-0 opacity-70 [background:radial-gradient(circle_at_18%_18%,rgba(46,125,50,0.42),transparent_30%),radial-gradient(circle_at_82%_8%,rgba(255,111,0,0.22),transparent_26%),linear-gradient(135deg,#0d1829_0%,#1a3a5c_62%,#12351f_100%)]" />
        <div className="container-main relative grid gap-10 py-20 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-green-100 backdrop-blur">
              <LayoutDashboard size={16} /> Design4Users식 대시보드 구조 참고
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-[-0.045em] sm:text-5xl lg:text-6xl">
              오프라인 수강생을 위한 온라인 강의실 MVP
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-navy-100">
              실제 개인정보·영상·결제 없이, 수강생이 강의를 찾고 내 강의실에서 이어보는 흐름을 먼저 검증합니다.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/dashboard/learning" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-700 px-6 py-4 font-bold text-white shadow-[0_18px_45px_rgba(46,125,50,0.32)] transition hover:-translate-y-0.5 hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-100">
                내 강의실 보기 <ArrowRight size={18} />
              </Link>
              <Link href="/courses/voice-phishing-instructor" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/10 px-6 py-4 font-bold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                대표 과정 상세
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/15 bg-white/10 p-4 shadow-[0_30px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl">
            <div className="rounded-[1.5rem] bg-[#f8fbf4] p-5 text-gray-900">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-green-700">Learning dashboard</p>
                  <h2 className="text-xl font-black text-navy-900">오늘의 학습 현황</h2>
                </div>
                <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">mock</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-2xl bg-white p-4 shadow-[0_12px_35px_rgba(26,58,92,0.08)]">
                  <p className="text-xs text-gray-500">과정</p>
                  <p className="mt-2 text-2xl font-black text-navy-900">{onlineCourses.length}</p>
                </div>
                <div className="rounded-2xl bg-white p-4 shadow-[0_12px_35px_rgba(26,58,92,0.08)]">
                  <p className="text-xs text-gray-500">차시</p>
                  <p className="mt-2 text-2xl font-black text-navy-900">{totalLessons}</p>
                </div>
                <div className="rounded-2xl bg-white p-4 shadow-[0_12px_35px_rgba(26,58,92,0.08)]">
                  <p className="text-xs text-gray-500">시간</p>
                  <p className="mt-2 text-2xl font-black text-navy-900">{totalHours}h</p>
                </div>
              </div>
              <div className="mt-5 space-y-3">
                {onlineCourses.slice(0, 2).map((course) => (
                  <div key={course.id} className="rounded-2xl border border-navy-100 bg-white p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-bold text-green-700">{course.eyebrow}</p>
                        <p className="mt-1 font-bold text-navy-900">{course.title}</p>
                      </div>
                      <PlayCircle className="shrink-0 text-green-700" size={22} />
                    </div>
                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-navy-50">
                      <div className="h-full rounded-full bg-green-700" style={{ width: `${Math.max(course.progress, 12)}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-main py-12">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-tag">Course Catalog</p>
            <h2 className="section-title text-left">온라인 과정 목록</h2>
            <p className="section-desc max-w-3xl">{dashboardInspiration.appliedPatterns.join(' · ')} 패턴을 교육용으로 바꿔 적용했습니다.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-navy-900 shadow-[0_8px_24px_rgba(26,58,92,0.06)]"><Filter size={15} /> 필터</span>
            {courseCategories.map((category) => (
              <span key={category} className="rounded-full border border-navy-100 bg-white px-4 py-2 text-sm font-semibold text-gray-700">{category}</span>
            ))}
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {onlineCourses.map((course) => (
            <Link key={course.id} href={course.slug === 'voice-phishing-instructor' ? '/courses/voice-phishing-instructor' : '/courses'} className="group flex min-h-[520px] flex-col rounded-[1.75rem] border border-navy-100 bg-white p-6 shadow-[0_18px_50px_rgba(26,58,92,0.08)] transition hover:-translate-y-1 hover:shadow-[0_25px_70px_rgba(26,58,92,0.14)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700">
              <div className="mb-5 flex items-center justify-between">
                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-black text-green-800">{course.category}</span>
                <span className="rounded-full bg-navy-50 px-3 py-1 text-xs font-bold text-navy-900">{statusLabel[course.status]}</span>
              </div>
              <h3 className="text-2xl font-black leading-tight tracking-[-0.03em] text-navy-900">{course.title}</h3>
              <p className="mt-4 flex-1 text-base leading-8 text-gray-600">{course.summary}</p>
              <div className="my-6 grid grid-cols-2 gap-3">
                {course.stats.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="rounded-2xl bg-[#f5f7f2] p-4">
                    <Icon className="mb-2 text-green-700" size={20} />
                    <p className="text-xs text-gray-500">{label}</p>
                    <p className="font-black text-navy-900">{value}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border border-dashed border-navy-100 bg-navy-50/60 p-4 text-sm text-navy-900">
                <p className="font-bold">대상</p>
                <p className="mt-1 leading-7 text-gray-600">{course.audience}</p>
              </div>
              <span className="mt-6 inline-flex items-center gap-2 font-black text-green-800 transition group-hover:gap-3">
                과정 확인 <ArrowRight size={18} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-main pb-16">
        <div className="rounded-[2rem] border border-amber-100 bg-amber-50 p-6 lg:p-8">
          <div className="mb-5 flex items-center gap-3">
            <ShieldCheck className="text-amber-700" />
            <h2 className="text-2xl font-black text-navy-900">소라 안전 게이트</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
            {safetyGates.map((gate) => (
              <div key={gate} className="rounded-2xl bg-white p-4 text-sm font-semibold leading-7 text-gray-700 shadow-[0_10px_30px_rgba(230,81,0,0.08)]">
                <CheckCircle2 className="mb-3 text-green-700" size={20} />
                {gate}
              </div>
            ))}
          </div>
          <p className="mt-5 flex items-center gap-2 text-sm font-bold text-amber-700"><LockKeyhole size={16} /> 현재 화면은 mock MVP입니다. 실제 결제·개인정보·영상 업로드는 별도 승인 전까지 비활성입니다.</p>
        </div>
      </section>
    </main>
  )
}
