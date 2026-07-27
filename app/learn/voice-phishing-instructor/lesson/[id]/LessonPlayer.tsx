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
import { LessonThumbnail } from '@/components/learning/LessonThumbnail'
import { EMPTY_PROGRESS, getProgressSnapshot, markCompleted, setLastOrder, subscribeProgress } from '@/lib/learning/progress'

const COURSE_SLUG = 'voice-phishing-instructor'
const course = onlineCourses[0]

/* 존재하지 않는 차시가 진도에 섞이지 않도록 정규화 기준으로 넘긴다 */
const TOTAL_LESSONS = voicePhishingLessons.length

const lessonHref = (order: number) => `/learn/${COURSE_SLUG}/lesson/${String(order).padStart(2, '0')}`

export default function LessonPlayer({ order }: { order: number }) {
  const router = useRouter()
  const lesson = voicePhishingLessons.find((l) => l.order === order)!
  const videoId = getLessonVideoId(lesson.id)

  const progress = useSyncExternalStore(
    subscribeProgress,
    () => getProgressSnapshot(COURSE_SLUG, TOTAL_LESSONS),
    () => EMPTY_PROGRESS,
  )

  useEffect(() => {
    // 외부 시스템(localStorage)에 마지막 시청 차시만 기록
    setLastOrder(COURSE_SLUG, order, TOTAL_LESSONS)
  }, [order])

  const isCompleted = progress.completed.includes(order)
  const prevLesson = voicePhishingLessons.find((l) => l.order === order - 1)
  const nextLesson = voicePhishingLessons.find((l) => l.order === order + 1)
  const completedCount = progress.completed.length
  const totalCount = voicePhishingLessons.length

  const embedUrl = videoId ? youtubeEmbedUrl(videoId) : null

  const handleComplete = () => {
    markCompleted(COURSE_SLUG, order, TOTAL_LESSONS)
    if (nextLesson) {
      router.push(lessonHref(nextLesson.order))
    } else {
      router.push('/dashboard/learning')
    }
  }

  return (
    <main className="min-h-screen bg-brand-950 text-brand-100">
      <section className="mx-auto grid min-h-screen max-w-[1500px] lg:grid-cols-[1fr_360px]">
        {/* ─── 좌측: 플레이어 영역 ─── */}
        <div className="flex flex-col bg-brand-950">
          <header className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[.06] px-5 py-4 lg:px-7">
            <Link
              href="/dashboard/learning"
              className="inline-flex items-center gap-2 rounded-lg text-[14px] font-extrabold text-neutral-400 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400"
            >
              <ArrowLeft size={15} /> 내 강의실
            </Link>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-accent-400/10 px-4 py-1.5 text-xs font-extrabold text-accent-400">
                {lesson.order}강 / {totalCount}강 · {lesson.duration}
              </span>
              {isCompleted && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-400 px-3.5 py-1.5 text-xs font-black text-brand-950">
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
            <div className="relative flex aspect-video w-full items-center justify-center bg-[radial-gradient(circle_at_30%_25%,#131941,#0c1029_70%)]">
              <div className="px-6 text-center">
                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-accent-400 shadow-[0_0_0_12px_rgba(190,215,58,0.12),0_18px_55px_rgba(0,0,0,0.5)]">
                  <Video size={32} className="text-brand-950" />
                </div>
                <p className="text-xs font-black uppercase tracking-[.08em] text-accent-400">영상 준비 중</p>
                <h2 className="mt-2 text-2xl font-black tracking-[-.03em] text-white">이 차시 영상은 곧 공개됩니다</h2>
                <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-neutral-400">
                  영상 업로드가 완료되면 이 화면에서 바로 수강할 수 있습니다.
                </p>
              </div>
            </div>
          )}

          {/* 코스 진행 스트립 */}
          <div className="relative h-[5px] bg-white/[.08]" aria-hidden>
            <div
              className="absolute left-0 top-0 h-full rounded-r bg-gradient-to-r from-accent-600 to-accent-400 transition-[width] duration-500"
              style={{ width: `${Math.max(Math.round((completedCount / totalCount) * 100), 3)}%` }}
            />
          </div>

          {/* 차시 정보 */}
          <div className="flex-1 px-5 py-6 lg:px-7 lg:py-8">
            <p className="text-[13px] font-black uppercase tracking-[.08em] text-accent-400">Lesson {lesson.order}</p>
            <h1 className="mt-2 text-[22px] font-black leading-snug tracking-[-.03em] text-white md:text-2xl">
              {lesson.title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-8 text-neutral-400">{lesson.summary}</p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              {prevLesson ? (
                <Link
                  href={lessonHref(prevLesson.order)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/[.14] px-5 py-3 text-[14px] font-extrabold text-brand-100 transition hover:bg-white/[.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400 active:scale-[0.98]"
                >
                  <ChevronLeft size={15} /> 이전 강의
                </Link>
              ) : null}
              <button
                onClick={handleComplete}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent-400 px-6 py-3 text-[14px] font-black text-brand-950 transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400 active:scale-[0.98]"
              >
                {isCompleted ? '완료됨 · ' : ''}
                {nextLesson ? '완료하고 다음 강의' : '완료하고 강의실로'}
                <ChevronRight size={15} />
              </button>
            </div>

            <div className="mt-7 max-w-2xl rounded-2xl border border-white/[.07] bg-brand-900 p-5">
              <div className="mb-2 flex items-center gap-2 text-[14px] font-black text-white">
                <ShieldCheck size={15} className="text-accent-400" /> 수강 안내
              </div>
              <p className="text-xs leading-6 text-neutral-400">
                본 과정은 민간자격 연계 교육이며 국가공인 자격이 아닙니다. 강의 영상과 자료의 무단 복제·공유·재배포를
                금합니다. 진도는 현재 기기(브라우저)에 저장됩니다.
              </p>
            </div>
          </div>
        </div>

        {/* ─── 우측: 차시 목록 ─── */}
        <aside className="border-l border-white/[.06] bg-brand-950 p-5 lg:min-h-screen lg:p-6">
          <div className="mb-5 flex items-center justify-between px-1">
            <div>
              <p className="text-[13px] font-black uppercase tracking-[.06em] text-neutral-400">{course.title}</p>
              <h2 className="mt-1 text-lg font-black tracking-[-.02em] text-white">차시 목록</h2>
            </div>
            <span className="rounded-full bg-accent-400/10 px-3 py-1 text-[13px] font-black text-accent-400">
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
                  className={`flex gap-3 rounded-xl p-2.5 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400 active:scale-[0.99] ${
                    isCurrent ? 'bg-white/[.06]' : 'hover:bg-white/[.04]'
                  }`}
                >
                  <LessonThumbnail
                    videoId={getLessonVideoId(item.id)}
                    duration={item.duration}
                    order={item.order}
                    done={done}
                    isCurrent={isCurrent}
                  />
                  <div className="min-w-0 flex-1 py-0.5">
                    <h3 className={`line-clamp-2 text-[14px] leading-5 text-white ${isCurrent ? 'font-black' : 'font-bold'}`}>
                      {item.title}
                    </h3>
                    <p className="mt-1.5 flex flex-wrap items-center gap-1.5 text-[12.5px] font-semibold text-neutral-400">
                      {isCurrent ? (
                        <span className="inline-flex items-center gap-1 text-accent-400">
                          <Play size={10} fill="currentColor" /> 재생 중
                        </span>
                      ) : done ? (
                        '시청 완료'
                      ) : (
                        '아직 보지 않음'
                      )}
                      {!hasVideo && (
                        <span className="rounded-full bg-white/[.06] px-2 py-0.5 text-[11.5px]">준비 중</span>
                      )}
                    </p>
                  </div>
                </Link>
              )
            })}
          </nav>

          <div className="mt-6 rounded-2xl border border-white/[.07] bg-brand-900 p-5">
            <div className="mb-3 flex items-center gap-2 text-[14px] font-black text-white">
              <FileText size={15} className="text-accent-400" /> 강의자료
            </div>
            <div className="space-y-2">
              {lesson.materials.map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-xl bg-white/[.045] px-4 py-3 text-xs font-bold text-brand-100"
                >
                  {item}
                  <span className="inline-flex items-center gap-1 text-[12px] font-bold text-neutral-400">
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
