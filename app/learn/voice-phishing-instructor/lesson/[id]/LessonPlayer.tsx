'use client'

import { useEffect, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  Play,
  ShieldCheck,
  Video,
} from 'lucide-react'
import { voicePhishingLessons, onlineCourses } from '@/lib/mockCourses'
import { getLessonVideoId, youtubeEmbedUrl } from '@/lib/lessonVideos'
import { EMPTY_PROGRESS, getProgressSnapshot, markCompleted, setLastOrder, subscribeProgress } from '@/lib/learning/progress'

const COURSE_SLUG = 'voice-phishing-instructor'
const course = onlineCourses[0]

const lessonHref = (order: number) => `/learn/${COURSE_SLUG}/lesson/${String(order).padStart(2, '0')}`

export default function LessonPlayer({ order }: { order: number }) {
  const router = useRouter()
  const lesson = voicePhishingLessons.find((l) => l.order === order)!
  const videoId = getLessonVideoId(lesson.id)

  const progress = useSyncExternalStore(
    subscribeProgress,
    () => getProgressSnapshot(COURSE_SLUG),
    () => EMPTY_PROGRESS,
  )

  useEffect(() => {
    // 외부 시스템(localStorage)에 마지막 시청 차시만 기록
    setLastOrder(COURSE_SLUG, order)
  }, [order])

  const isCompleted = progress.completed.includes(order)
  const prevLesson = voicePhishingLessons.find((l) => l.order === order - 1)
  const nextLesson = voicePhishingLessons.find((l) => l.order === order + 1)
  const completedCount = progress.completed.length
  const totalCount = voicePhishingLessons.length

  const embedUrl = videoId ? youtubeEmbedUrl(videoId) : null

  const handleComplete = () => {
    markCompleted(COURSE_SLUG, order)
    if (nextLesson) {
      router.push(lessonHref(nextLesson.order))
    } else {
      router.push('/dashboard/learning')
    }
  }

  return (
    <main className="min-h-screen bg-[#0d1320] text-[#e8edf5]">
      <section className="mx-auto grid min-h-screen max-w-[1500px] lg:grid-cols-[1fr_360px]">
        {/* ─── 좌측: 플레이어 영역 ─── */}
        <div className="flex flex-col bg-[#0a0f19]">
          <header className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[.06] px-5 py-4 lg:px-7">
            <Link
              href="/dashboard/learning"
              className="inline-flex items-center gap-2 rounded-lg text-[14px] font-extrabold text-[#7f8ea3] transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4cc38a]"
            >
              <ArrowLeft size={15} /> 내 강의실
            </Link>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-[#4cc38a]/10 px-4 py-1.5 text-xs font-extrabold text-[#4cc38a]">
                {lesson.order}강 / {totalCount}강 · {lesson.duration}
              </span>
              {isCompleted && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#4cc38a] px-3.5 py-1.5 text-xs font-black text-[#07130c]">
                  <CheckCircle2 size={13} /> 완료
                </span>
              )}
            </div>
          </header>

          {/* 영상 */}
          {embedUrl ? (
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={embedUrl}
                title={`${lesson.order}강 ${lesson.title}`}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          ) : (
            <div className="relative flex aspect-video w-full items-center justify-center bg-[radial-gradient(circle_at_30%_25%,#1a2c45,#0a1322_70%)]">
              <div className="px-6 text-center">
                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#4cc38a] shadow-[0_0_0_12px_rgba(76,195,138,0.12),0_18px_55px_rgba(0,0,0,0.5)]">
                  <Video size={32} className="text-[#07130c]" />
                </div>
                <p className="text-xs font-black uppercase tracking-[.08em] text-[#4cc38a]">영상 준비 중</p>
                <h2 className="mt-2 text-2xl font-black tracking-[-.03em] text-white">이 차시 영상은 곧 공개됩니다</h2>
                <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#93a1b5]">
                  영상 업로드가 완료되면 이 화면에서 바로 수강할 수 있습니다.
                </p>
              </div>
            </div>
          )}

          {/* 코스 진행 스트립 */}
          <div className="relative h-[5px] bg-white/[.08]" aria-hidden>
            <div
              className="absolute left-0 top-0 h-full rounded-r bg-gradient-to-r from-[#2a8f60] to-[#4cc38a] transition-[width] duration-500"
              style={{ width: `${Math.max(Math.round((completedCount / totalCount) * 100), 3)}%` }}
            />
          </div>

          {/* 차시 정보 */}
          <div className="flex-1 px-5 py-6 lg:px-7 lg:py-8">
            <p className="text-[13px] font-black uppercase tracking-[.08em] text-[#4cc38a]">Lesson {lesson.order}</p>
            <h1 className="mt-2 text-[22px] font-black leading-snug tracking-[-.03em] text-white md:text-2xl">
              {lesson.title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-8 text-[#93a1b5]">{lesson.summary}</p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              {prevLesson ? (
                <Link
                  href={lessonHref(prevLesson.order)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/[.14] px-5 py-3 text-[14px] font-extrabold text-[#e8edf5] transition hover:bg-white/[.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4cc38a] active:scale-[0.98]"
                >
                  <ChevronLeft size={15} /> 이전 강의
                </Link>
              ) : null}
              <button
                onClick={handleComplete}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#4cc38a] px-6 py-3 text-[14px] font-black text-[#07130c] transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4cc38a] active:scale-[0.98]"
              >
                {isCompleted ? '완료됨 · ' : ''}
                {nextLesson ? '완료하고 다음 강의' : '완료하고 강의실로'}
                <ChevronRight size={15} />
              </button>
            </div>

            <div className="mt-7 max-w-2xl rounded-2xl border border-white/[.07] bg-[#151d2e] p-5">
              <div className="mb-2 flex items-center gap-2 text-[14px] font-black text-white">
                <ShieldCheck size={15} className="text-[#4cc38a]" /> 수강 안내
              </div>
              <p className="text-xs leading-6 text-[#93a1b5]">
                본 과정은 민간자격 연계 교육이며 국가공인 자격이 아닙니다. 강의 영상과 자료의 무단 복제·공유·재배포를
                금합니다. 진도는 현재 기기(브라우저)에 저장됩니다.
              </p>
            </div>
          </div>
        </div>

        {/* ─── 우측: 차시 목록 ─── */}
        <aside className="border-l border-white/[.06] bg-[#121a2a] p-5 lg:min-h-screen lg:p-6">
          <div className="mb-5 flex items-center justify-between px-1">
            <div>
              <p className="text-[13px] font-black uppercase tracking-[.06em] text-[#7f8ea3]">{course.title}</p>
              <h2 className="mt-1 text-lg font-black tracking-[-.02em] text-white">차시 목록</h2>
            </div>
            <span className="rounded-full bg-[#4cc38a]/10 px-3 py-1 text-[13px] font-black text-[#4cc38a]">
              {completedCount}/{totalCount} 완료
            </span>
          </div>

          <nav className="space-y-1.5" aria-label="차시 목록">
            {voicePhishingLessons.map((item) => {
              const done = progress.completed.includes(item.order)
              const isCurrent = item.order === order
              const hasVideo = Boolean(getLessonVideoId(item.id))
              return (
                <Link
                  key={item.id}
                  href={lessonHref(item.order)}
                  aria-current={isCurrent ? 'page' : undefined}
                  className={`flex items-center gap-3.5 rounded-xl p-3.5 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4cc38a] active:scale-[0.99] ${
                    isCurrent ? 'bg-white/[.06]' : 'hover:bg-white/[.04]'
                  }`}
                >
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[13px] font-black ${
                      done
                        ? 'border-2 border-[#4cc38a] bg-[#4cc38a] text-[#07130c]'
                        : isCurrent
                          ? 'border-2 border-[#4cc38a] text-[#4cc38a] shadow-[0_0_14px_rgba(76,195,138,0.35)]'
                          : 'border-2 border-white/[.14] text-[#93a1b5]'
                    }`}
                  >
                    {done ? <CheckCircle2 size={16} /> : item.order}
                  </div>
                  <div className="min-w-0">
                    <h3 className={`text-[14px] leading-5 text-[#e8edf5] ${isCurrent ? 'font-black' : 'font-bold'}`}>
                      {item.title}
                    </h3>
                    <p className="mt-0.5 flex items-center gap-2 text-[13px] font-semibold text-[#7f8ea3]">
                      {item.duration}
                      {isCurrent && <Play size={11} className="text-[#4cc38a]" />}
                      {!hasVideo && (
                        <span className="rounded-full bg-white/[.06] px-2 py-0.5 text-[12px] text-[#93a1b5]">준비 중</span>
                      )}
                    </p>
                  </div>
                </Link>
              )
            })}
          </nav>

          <div className="mt-6 rounded-2xl border border-white/[.07] bg-[#151d2e] p-5">
            <div className="mb-3 flex items-center gap-2 text-[14px] font-black text-white">
              <FileText size={15} className="text-[#4cc38a]" /> 강의자료
            </div>
            <div className="space-y-2">
              {lesson.materials.map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-xl bg-white/[.045] px-4 py-3 text-xs font-bold text-[#e8edf5]"
                >
                  {item}
                  <span className="inline-flex items-center gap-1 text-[12px] font-bold text-[#7f8ea3]">
                    준비 중 <Download size={13} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </main>
  )
}
