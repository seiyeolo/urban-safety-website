'use client'

import { useSyncExternalStore } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth/AuthContext'
import RequireAuth from '@/lib/auth/RequireAuth'
import { voicePhishingLessons } from '@/lib/mockCourses'
import {
  EMPTY_PROGRESS,
  getProgressSnapshot,
  progressPercent,
  subscribeProgress,
} from '@/lib/learning/progress'
import {
  User,
  BookOpen,
  Award,
  Calendar,
  MessageCircle,
  Settings,
  LogOut,
  ChevronRight,
  PlayCircle,
  Info,
} from 'lucide-react'

const COURSE_SLUG = 'voice-phishing-instructor'

/* 존재하지 않는 차시가 진도에 섞이지 않도록 정규화 기준으로 넘긴다 */
const TOTAL_LESSONS = voicePhishingLessons.length

/* 아직 페이지가 없는 기능은 링크 대신 '준비 중'으로 표시한다.
   링크를 살리려고 빈 페이지를 만들지 않는다(404 유발 방지). */
type QuickAction = {
  icon: typeof BookOpen
  title: string
  description: string
  color: string
} & ({ href: string; ready: true } | { ready: false })

const QUICK_ACTIONS: QuickAction[] = [
  {
    icon: PlayCircle,
    title: '내 강의실',
    description: '수강 중인 강의를 이어서 학습하세요',
    href: '/dashboard/learning',
    ready: true,
    color: 'bg-brand-600',
  },
  {
    icon: BookOpen,
    title: '교육 신청하기',
    description: '새로운 교육과정에 참여하세요',
    href: '/education',
    ready: true,
    color: 'bg-brand-500',
  },
  {
    icon: Award,
    title: '자격증 안내',
    description: '민간자격 과정을 확인하세요',
    href: '/certificates',
    ready: true,
    color: 'bg-accent-500',
  },
  {
    icon: MessageCircle,
    title: '문의하기',
    description: '궁금한 점을 문의하세요',
    href: '/contact',
    ready: true,
    color: 'bg-cta-600',
  },
  {
    icon: Calendar,
    title: '일정 관리',
    description: '내 교육 일정 관리 기능을 준비하고 있습니다',
    ready: false,
    color: 'bg-neutral-400',
  },
]

function DashboardContent() {
  const { user, signOut } = useAuth()
  const router = useRouter()

  // 진도는 기기 localStorage에 저장된다(lib/learning/progress.ts).
  // 서버에는 없으므로 계산 가능한 지표만 노출한다.
  const progress = useSyncExternalStore(
    subscribeProgress,
    () => getProgressSnapshot(COURSE_SLUG, TOTAL_LESSONS),
    () => EMPTY_PROGRESS,
  )

  const totalLessons = TOTAL_LESSONS
  const completedCount = progress.completed.length
  const percent = progressPercent(progress, totalLessons)
  const hasStarted = completedCount > 0 || progress.lastOrder > 1
  const isCourseCompleted = completedCount >= totalLessons

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">安</span>
              </div>
              <span className="font-bold text-neutral-900">도시안전디자인센터</span>
            </Link>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-cta-700 rounded-full flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
                <span className="hidden text-sm font-medium text-neutral-700 sm:inline">
                  {user?.user_metadata?.name || user?.email}
                </span>
              </div>
              <button
                onClick={handleSignOut}
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
              >
                <LogOut size={16} /> 로그아웃
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            안녕하세요, {user?.user_metadata?.name || '회원'}님!
          </h1>
          <p className="text-neutral-600">도시안전디자인센터 대시보드에 오신 것을 환영합니다.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* 학습 현황 — localStorage 진도 기반 실제 값 */}
            <section>
              <h2 className="text-xl font-bold text-neutral-900 mb-4">학습 현황</h2>
              <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
                {hasStarted ? (
                  <>
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-neutral-600">
                          보이스피싱 예방지도사 온라인 보충과정
                        </p>
                        <p className="mt-1 text-2xl font-bold text-neutral-900">
                          {completedCount} / {totalLessons}차시 완료
                          <span className="ml-2 text-base font-bold text-cta-700">{percent}%</span>
                        </p>
                      </div>
                      <Link
                        href="/dashboard/learning"
                        className="inline-flex items-center gap-2 rounded-md bg-cta-700 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-cta-800"
                      >
                        {isCourseCompleted ? '다시 보기' : '이어서 학습하기'} <ChevronRight size={16} />
                      </Link>
                    </div>
                    <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-neutral-200">
                      <div
                        className="h-full rounded-full bg-cta-700 transition-[width] duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </>
                ) : (
                  <div className="py-4 text-center">
                    <p className="font-semibold text-neutral-900">아직 시작한 학습이 없습니다</p>
                    <p className="mt-1 text-sm text-neutral-600">
                      온라인 강의실에서 첫 강의를 시작해 보세요.
                    </p>
                    <Link
                      href="/dashboard/learning"
                      className="mt-4 inline-flex items-center gap-2 rounded-md bg-cta-700 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-cta-800"
                    >
                      <PlayCircle size={16} /> 강의실 입장
                    </Link>
                  </div>
                )}

                <p className="mt-4 flex items-start gap-1.5 text-xs leading-5 text-neutral-600">
                  <Info size={13} className="mt-0.5 shrink-0" aria-hidden="true" />
                  진도는 현재 사용 중인 기기(브라우저)에 저장됩니다. 다른 기기에서는 다르게 보일 수 있습니다.
                </p>
              </div>
            </section>

            {/* 빠른 실행 */}
            <section>
              <h2 className="text-xl font-bold text-neutral-900 mb-4">빠른 실행</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {QUICK_ACTIONS.map((action) => {
                  const body = (
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div
                          className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4`}
                        >
                          <action.icon size={24} className="text-white" />
                        </div>
                        <h3 className="font-bold text-neutral-900 mb-1">
                          {action.title}
                          {!action.ready && (
                            <span className="ml-2 rounded-full bg-neutral-200 px-2 py-0.5 text-[11px] font-bold text-neutral-700 align-middle">
                              준비 중
                            </span>
                          )}
                        </h3>
                        <p className="text-sm text-neutral-600">{action.description}</p>
                      </div>
                      {action.ready && (
                        <ChevronRight size={20} className="text-neutral-400 group-hover:text-neutral-600 transition-colors" />
                      )}
                    </div>
                  )

                  return action.ready ? (
                    <Link
                      key={action.title}
                      href={action.href}
                      className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 hover:shadow-md transition-shadow group"
                    >
                      {body}
                    </Link>
                  ) : (
                    <div
                      key={action.title}
                      aria-disabled="true"
                      className="bg-white p-6 rounded-xl shadow-sm border border-dashed border-neutral-300 opacity-70"
                    >
                      {body}
                    </div>
                  )
                })}
              </div>
            </section>
          </div>

          {/* 프로필 */}
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-bold text-neutral-900 mb-4">프로필</h2>
              <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-cta-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User size={32} className="text-white" />
                  </div>
                  <h3 className="font-bold text-neutral-900 mb-1">
                    {user?.user_metadata?.name || '회원'}
                  </h3>
                  <p className="text-sm text-neutral-600">{user?.email}</p>
                  {user?.user_metadata?.phone ? (
                    <p className="text-sm text-neutral-600">{user.user_metadata.phone}</p>
                  ) : null}
                </div>

                {/* 프로필 수정 페이지가 아직 없으므로 링크 대신 비활성 상태로 표시 */}
                <div
                  aria-disabled="true"
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-neutral-300 bg-neutral-50 py-2 px-4 text-sm font-medium text-neutral-600"
                >
                  <Settings size={16} />
                  프로필 수정 · 준비 중
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function DashboardPage() {
  // 인증 가드를 RequireAuth로 통일 (강의실·수강 화면과 동일 정책).
  // 미인증 시 본문을 렌더링하지 않고 원래 경로로 복귀시킨다.
  return (
    <RequireAuth>
      <DashboardContent />
    </RequireAuth>
  )
}
