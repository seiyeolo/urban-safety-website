import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Bell, BookOpen, CalendarCheck, CheckCircle2, Download, LayoutDashboard, PlayCircle, ShieldCheck, UserRound } from 'lucide-react'
import { onlineCourses, voicePhishingLessons } from '@/lib/mockCourses'

export const metadata: Metadata = {
  title: '내 강의실 mock | 도시안전디자인센터',
  description: '수강생이 배정받은 온라인 강의를 확인하고 이어보는 mock 대시보드입니다.',
}

export default function LearningDashboardPage() {
  const currentCourse = onlineCourses[0]
  const nextLesson = voicePhishingLessons[0]

  return (
    <main className="min-h-screen bg-[#f4f6f0]">
      <section className="container-main py-10">
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-black text-green-800"><LayoutDashboard size={16} /> My Learning Dashboard</p>
            <h1 className="text-4xl font-black tracking-[-0.045em] text-navy-900 sm:text-5xl">내 강의실</h1>
            <p className="mt-3 max-w-2xl text-lg leading-8 text-gray-600">오프라인 수강생이 온라인 강의를 이어보고 자료를 찾는 mock 대시보드입니다.</p>
          </div>
          <div className="flex items-center gap-3 rounded-3xl bg-white p-3 shadow-[0_14px_45px_rgba(26,58,92,0.08)]">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-900 text-white"><UserRound size={22} /></div>
            <div className="pr-3">
              <p className="text-sm font-black text-navy-900">수강생 A</p>
              <p className="text-xs font-semibold text-gray-500">mock learner · 개인정보 아님</p>
            </div>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
          <section className="rounded-[2.25rem] bg-[#0d1829] p-6 text-white shadow-[0_26px_70px_rgba(13,24,41,0.22)]">
            <div className="grid gap-6 xl:grid-cols-[1fr_320px] xl:items-center">
              <div>
                <p className="text-sm font-black text-green-100">이어보기</p>
                <h2 className="mt-2 text-3xl font-black tracking-[-0.04em]">{currentCourse.title}</h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-navy-100">{nextLesson.title}부터 이어서 학습합니다. 영상은 실제 파일이 아닌 placeholder입니다.</p>
                <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/12">
                  <div className="h-full rounded-full bg-green-700" style={{ width: `${currentCourse.progress}%` }} />
                </div>
                <div className="mt-3 flex items-center justify-between text-sm font-bold text-navy-100">
                  <span>진도율 {currentCourse.progress}%</span>
                  <span>남은 차시 5강</span>
                </div>
                <Link href="/learn/voice-phishing-instructor/lesson/01" className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-green-700 px-6 py-4 font-black text-white transition hover:-translate-y-0.5 hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-100">
                  강의 이어보기 <PlayCircle size={18} />
                </Link>
              </div>
              <div className="rounded-[1.75rem] bg-white p-5 text-gray-900">
                <p className="text-sm font-black text-green-700">학습 카드</p>
                <div className="mt-4 space-y-3">
                  {[
                    ['오늘 목표', '1강 완료 + 체크리스트 다운로드'],
                    ['자료', '강의 요약 PDF · 예방 스크립트'],
                    ['다음 액션', '2강 위험 신호 분류'],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-2xl bg-[#f5f7f2] p-4">
                      <p className="text-xs font-bold text-gray-500">{label}</p>
                      <p className="mt-1 font-black text-navy-900">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <aside className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {[
              { icon: BookOpen, label: '배정 과정', value: '2개' },
              { icon: CalendarCheck, label: '수강 기간', value: 'D-21' },
              { icon: CheckCircle2, label: '완료 차시', value: '1/6' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="rounded-[1.75rem] bg-white p-6 shadow-[0_14px_45px_rgba(26,58,92,0.08)]">
                <Icon className="mb-4 text-green-700" size={26} />
                <p className="text-sm font-bold text-gray-500">{label}</p>
                <p className="mt-1 text-3xl font-black text-navy-900">{value}</p>
              </div>
            ))}
          </aside>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_360px]">
          <section className="rounded-[2rem] bg-white p-6 shadow-[0_16px_50px_rgba(26,58,92,0.08)]">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-black text-green-700">Assigned courses</p>
                <h2 className="text-2xl font-black text-navy-900">수강 중인 과정</h2>
              </div>
              <Link href="/courses" className="text-sm font-black text-green-800 hover:text-green-700">전체 과정</Link>
            </div>
            <div className="space-y-4">
              {onlineCourses.slice(0, 2).map((course) => (
                <div key={course.id} className="grid gap-4 rounded-3xl border border-navy-100 bg-[#fbfcf8] p-5 md:grid-cols-[1fr_170px] md:items-center">
                  <div>
                    <p className="text-xs font-black text-green-700">{course.eyebrow}</p>
                    <h3 className="mt-1 text-lg font-black text-navy-900">{course.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-gray-600">{course.summary}</p>
                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-navy-50">
                      <div className="h-full rounded-full bg-green-700" style={{ width: `${Math.max(course.progress, 6)}%` }} />
                    </div>
                  </div>
                  <Link href={course.slug === 'voice-phishing-instructor' ? '/learn/voice-phishing-instructor/lesson/01' : '/courses'} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-navy-900 px-4 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-navy-800">
                    {course.progress > 0 ? '이어보기' : '과정 보기'} <ArrowRight size={16} />
                  </Link>
                </div>
              ))}
            </div>
          </section>

          <aside className="space-y-5">
            <div className="rounded-[2rem] border border-amber-100 bg-amber-50 p-6">
              <div className="mb-4 flex items-center gap-3">
                <Bell className="text-amber-700" />
                <h2 className="text-xl font-black text-navy-900">공지 mock</h2>
              </div>
              <p className="text-sm leading-7 text-gray-700">수료/평가 기준은 예시입니다. 실제 운영 전 자격 고지, 환불, 개인정보 안내를 다시 검수합니다.</p>
            </div>
            <div className="rounded-[2rem] bg-white p-6 shadow-[0_14px_45px_rgba(26,58,92,0.08)]">
              <div className="mb-4 flex items-center gap-3">
                <Download className="text-green-700" />
                <h2 className="text-xl font-black text-navy-900">자료실</h2>
              </div>
              <div className="space-y-2">
                {['강의 요약 PDF', '위험 신호 체크리스트', '시민 안내 스크립트'].map((item) => (
                  <div key={item} className="rounded-2xl bg-[#f5f7f2] px-4 py-3 text-sm font-bold text-gray-700">{item}</div>
                ))}
              </div>
            </div>
            <div className="rounded-[2rem] bg-green-50 p-6">
              <div className="mb-3 flex items-center gap-2 font-black text-green-800"><ShieldCheck size={18} /> 안전 범위</div>
              <p className="text-sm leading-7 text-gray-700">이 대시보드는 실제 로그인 세션/수강생 DB가 아닌 mock 데이터 화면입니다.</p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}
