'use client'

import { useSyncExternalStore } from 'react'
import Link from 'next/link'
import { ArrowRight, Bell, CheckCircle2, Download, LogOut, PlayCircle, ShieldCheck, UserRound } from 'lucide-react'
import { onlineCourses, voicePhishingLessons } from '@/lib/mockCourses'
import { useAuth } from '@/lib/auth/AuthContext'
import { EMPTY_PROGRESS, getProgressSnapshot, progressPercent, subscribeProgress } from '@/lib/learning/progress'

const COURSE_SLUG = 'voice-phishing-instructor'
const lessonHref = (order: number) => `/learn/${COURSE_SLUG}/lesson/${String(order).padStart(2, '0')}`

const RING_RADIUS = 38
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS

export default function LearningDashboard() {
  const { user, signOut } = useAuth()
  const progress = useSyncExternalStore(
    subscribeProgress,
    () => getProgressSnapshot(COURSE_SLUG),
    () => EMPTY_PROGRESS,
  )

  const currentCourse = onlineCourses[0]
  const totalLessons = voicePhishingLessons.length
  const percent = progressPercent(progress, totalLessons)
  const continueLesson =
    voicePhishingLessons.find((l) => l.order === progress.lastOrder && !progress.completed.includes(l.order)) ??
    voicePhishingLessons.find((l) => !progress.completed.includes(l.order)) ??
    voicePhishingLessons[0]

  const learnerLabel = user?.email ?? '수강생'
  const totalMinutes = voicePhishingLessons
    .filter((l) => progress.completed.includes(l.order))
    .reduce((sum, l) => sum + parseInt(l.duration, 10), 0)

  return (
    <main className="min-h-screen bg-[#0d1320] text-[#e8edf5]">
      <section className="container-main py-10">
        {/* 페이지 헤더 */}
        <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[14px] font-bold text-[#7f8ea3]">안녕하세요, 수강생님 👋</p>
            <h1 className="mt-2 text-3xl font-black tracking-[-.04em] text-white sm:text-4xl">
              오늘도 <span className="text-[#4cc38a]">이어서</span> 학습해 볼까요?
            </h1>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-white/[.07] bg-[#151d2e] px-4 py-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#4cc38a] to-[#2a8f60] text-[#07130c]">
              <UserRound size={17} />
            </div>
            <div>
              <p className="max-w-[190px] truncate text-[14px] font-extrabold text-white">{learnerLabel}</p>
              <p className="text-[12px] font-semibold text-[#7f8ea3]">{currentCourse.eyebrow}</p>
            </div>
            <button
              onClick={() => signOut()}
              className="ml-1 inline-flex items-center gap-1 rounded-lg border border-white/[.12] px-3 py-1.5 text-[13px] font-extrabold text-[#93a1b5] transition hover:bg-white/[.06] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4cc38a] active:scale-[0.97]"
              aria-label="로그아웃"
            >
              <LogOut size={13} /> 로그아웃
            </button>
          </div>
        </div>

        {/* 이어보기 히어로 */}
        <section className="relative overflow-hidden rounded-[20px] border border-white/[.07] bg-[#151d2e] p-7 lg:p-9 [background-image:radial-gradient(ellipse_at_80%_-10%,rgba(76,195,138,0.16),transparent_55%),radial-gradient(ellipse_at_0%_110%,rgba(59,130,246,0.10),transparent_50%)]">
          <p className="inline-flex items-center gap-2 text-[13px] font-black uppercase tracking-[.06em] text-[#4cc38a]">
            <span className="h-[7px] w-[7px] rounded-full bg-[#4cc38a] shadow-[0_0_12px_#4cc38a]" aria-hidden />
            이어보기 · Lesson {continueLesson.order}
          </p>
          <h2 className="mt-3.5 max-w-2xl text-2xl font-black leading-snug tracking-[-.035em] text-white lg:text-[26px]">
            {continueLesson.title}
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-7 text-[#93a1b5]">
            {currentCourse.title} · {continueLesson.duration}
            {progress.completed.length > 0 ? ' · 이어서 학습을 계속하세요' : ' · 첫 강의를 시작해 보세요'}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-7">
            {/* 진도율 링 */}
            <div className="relative h-[92px] w-[92px] shrink-0" role="img" aria-label={`진도율 ${percent}%`}>
              <svg width="92" height="92" className="-rotate-90">
                <circle cx="46" cy="46" r={RING_RADIUS} fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="8" />
                <circle
                  cx="46"
                  cy="46"
                  r={RING_RADIUS}
                  fill="none"
                  stroke="#4cc38a"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={RING_CIRCUMFERENCE}
                  strokeDashoffset={RING_CIRCUMFERENCE * (1 - percent / 100)}
                  className="transition-all duration-700"
                />
              </svg>
              <div className="absolute inset-0 grid place-items-center text-center">
                <div>
                  <span className="text-lg font-black text-white">{percent}%</span>
                  <span className="block text-[12px] font-bold text-[#7f8ea3]">진도율</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-7">
              <div>
                <p className="text-[13px] font-bold text-[#7f8ea3]">완료 차시</p>
                <p className="mt-1 text-base font-black text-white">
                  {progress.completed.length} / {totalLessons}
                </p>
              </div>
              <div>
                <p className="text-[13px] font-bold text-[#7f8ea3]">학습 시간</p>
                <p className="mt-1 text-base font-black text-white">
                  {totalMinutes > 0 ? `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m` : '시작 전'}
                </p>
              </div>
              <div>
                <p className="text-[13px] font-bold text-[#7f8ea3]">수료 기준</p>
                <p className="mt-1 text-base font-black text-white">전체 수강</p>
              </div>
            </div>

            <Link
              href={lessonHref(continueLesson.order)}
              className="inline-flex items-center gap-2.5 rounded-2xl bg-[#4cc38a] px-7 py-4 text-[15px] font-black text-[#07130c] shadow-[0_10px_32px_rgba(76,195,138,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(76,195,138,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4cc38a] active:scale-[0.98] lg:ml-auto"
            >
              <PlayCircle size={18} /> {progress.completed.length > 0 ? '이어보기' : '첫 강의 시작'}
            </Link>
          </div>
        </section>

        {/* 커리큘럼 + 사이드 */}
        <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_340px]">
          <section className="rounded-[20px] border border-white/[.07] bg-[#151d2e] p-3">
            <div className="flex items-center justify-between px-4 pb-2 pt-4">
              <h3 className="text-[15.5px] font-black text-white">커리큘럼</h3>
              <span className="text-[13px] font-bold text-[#7f8ea3]">
                총 {totalLessons}차시 · {currentCourse.stats[1].value}
              </span>
            </div>
            {voicePhishingLessons.map((lesson) => {
              const done = progress.completed.includes(lesson.order)
              const isCurrent = lesson.order === continueLesson.order && !done
              return (
                <Link
                  key={lesson.id}
                  href={lessonHref(lesson.order)}
                  className="group flex items-center gap-4 rounded-[13px] px-4 py-3.5 transition hover:bg-white/[.045] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4cc38a] active:scale-[0.995]"
                >
                  <div
                    className={`flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full text-xs font-black ${
                      done
                        ? 'border-2 border-[#4cc38a] bg-[#4cc38a] text-[#07130c]'
                        : isCurrent
                          ? 'border-2 border-[#4cc38a] text-[#4cc38a] shadow-[0_0_14px_rgba(76,195,138,0.35)]'
                          : 'border-2 border-white/[.14] text-[#93a1b5]'
                    }`}
                  >
                    {done ? <CheckCircle2 size={15} /> : lesson.order}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className={`truncate text-sm leading-5 text-[#e8edf5] ${isCurrent ? 'font-black' : 'font-bold'}`}>
                      {lesson.title}
                    </h4>
                    <p className="mt-0.5 text-[13px] font-semibold text-[#7f8ea3]">
                      {lesson.duration}
                      {isCurrent ? ' · 수강 중' : done ? ' · 완료' : ''}
                    </p>
                  </div>
                  <span className="flex items-center gap-1 text-[13px] font-extrabold text-[#4cc38a] opacity-0 transition group-hover:opacity-100">
                    {done ? '다시 보기' : isCurrent ? '이어보기' : '시작'} <ArrowRight size={12} />
                  </span>
                </Link>
              )
            })}
          </section>

          <aside className="space-y-4">
            <div className="rounded-[20px] border border-white/[.07] bg-[#151d2e] p-6">
              <div className="mb-3 flex items-center gap-2 text-[14px] font-black text-white">
                <Bell size={15} className="text-[#4cc38a]" /> 공지
              </div>
              <p className="text-xs leading-7 text-[#93a1b5]">
                본 과정은 민간자격 연계 교육입니다. 수료·평가 세부 기준과 자료 배포 일정은 이곳 공지로 안내됩니다.
              </p>
            </div>
            <div className="rounded-[20px] border border-white/[.07] bg-[#151d2e] p-6">
              <div className="mb-3 flex items-center gap-2 text-[14px] font-black text-white">
                <Download size={15} className="text-[#4cc38a]" /> 강의자료
              </div>
              <div className="space-y-2">
                {['강의 요약 PDF', '위험 신호 체크리스트', '시민 안내 스크립트'].map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between rounded-xl bg-white/[.045] px-4 py-3 text-xs font-bold text-[#e8edf5]"
                  >
                    {item}
                    <span className="text-[12px] font-bold text-[#7f8ea3]">준비 중</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[20px] border border-white/[.07] bg-[#151d2e] p-6">
              <div className="mb-2 flex items-center gap-2 text-[14px] font-black text-white">
                <ShieldCheck size={15} className="text-[#4cc38a]" /> 이용 안내
              </div>
              <p className="text-xs leading-7 text-[#93a1b5]">
                진도는 현재 사용 중인 기기(브라우저)에 저장됩니다. 강의 영상과 자료의 무단 공유·재배포를 금합니다.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}
