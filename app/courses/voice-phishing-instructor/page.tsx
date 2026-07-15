import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Award, CheckCircle2, Clock, Download, GraduationCap, ShieldAlert } from 'lucide-react'
import { onlineCourses, safetyGates, voicePhishingLessons } from '@/lib/mockCourses'

export const metadata: Metadata = {
  title: '보이스피싱 예방지도사 온라인 보충과정 | 도시안전디자인센터',
  description: '보이스피싱 예방지도사 오프라인 수강생을 위한 mock 기반 온라인 보충과정 상세 화면입니다.',
}

const course = onlineCourses.find((item) => item.slug === 'voice-phishing-instructor')!

export default function VoicePhishingCoursePage() {
  return (
    <main className="min-h-screen bg-[#f7f8f4]">
      <section className="bg-[#0d1829] text-white">
        <div className="container-main grid gap-10 py-18 lg:grid-cols-[1fr_380px] lg:items-center">
          <div>
            <p className="mb-5 inline-flex rounded-full bg-green-700/25 px-4 py-2 text-sm font-bold text-green-100 ring-1 ring-green-100/20">{course.eyebrow}</p>
            <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-[-0.045em] sm:text-5xl">{course.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-9 text-navy-100">{course.summary}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/dashboard/learning" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-700 px-6 py-4 font-black text-white shadow-[0_18px_45px_rgba(46,125,50,0.32)] transition hover:-translate-y-0.5 hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-100">
                로그인 후 내 강의실 보기 <ArrowRight size={18} />
              </Link>
              <Link href="/learn/voice-phishing-instructor/lesson/01" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-6 py-4 font-black text-white transition hover:-translate-y-0.5 hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                1강 플레이어 mock
              </Link>
            </div>
          </div>
          <aside className="rounded-[2rem] border border-white/15 bg-white/10 p-5 backdrop-blur-xl">
            <div className="rounded-[1.5rem] bg-white p-6 text-gray-900">
              <p className="text-sm font-black text-green-700">Course intelligence</p>
              <h2 className="mt-1 text-2xl font-black text-navy-900">과정 핵심지표</h2>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {course.stats.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="rounded-2xl bg-[#f5f7f2] p-4">
                    <Icon className="mb-3 text-green-700" size={20} />
                    <p className="text-xs text-gray-500">{label}</p>
                    <p className="font-black text-navy-900">{value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-2xl bg-navy-50 p-4">
                <p className="text-xs font-bold text-gray-500">수강 대상</p>
                <p className="mt-2 text-sm font-semibold leading-7 text-navy-900">{course.audience}</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="container-main grid gap-8 py-12 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="space-y-5">
          <div className="rounded-[1.75rem] bg-white p-6 shadow-[0_16px_50px_rgba(26,58,92,0.08)]">
            <div className="mb-4 flex items-center gap-3">
              <Award className="text-green-700" />
              <h2 className="text-2xl font-black text-navy-900">이 과정에서 확인할 것</h2>
            </div>
            <div className="space-y-3">
              {course.outcomes.map((outcome) => (
                <div key={outcome} className="flex gap-3 rounded-2xl bg-green-50 p-4 text-sm font-semibold leading-7 text-gray-700">
                  <CheckCircle2 className="mt-1 shrink-0 text-green-700" size={18} />
                  {outcome}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-amber-100 bg-amber-50 p-6">
            <div className="mb-4 flex items-center gap-3">
              <ShieldAlert className="text-amber-700" />
              <h2 className="text-xl font-black text-navy-900">민간자격·안전 고지</h2>
            </div>
            <p className="text-sm leading-7 text-gray-700">
              본 화면은 온라인 강의실 구조 검토용 mock입니다. 자격 운영, 환불, 수료, 개인정보 처리, 영상 저작권 고지는 실제 서비스 전 소라 검수와 세열님 최종 승인이 필요합니다.
            </p>
          </div>
        </div>

        <div className="rounded-[2rem] bg-white p-6 shadow-[0_18px_55px_rgba(26,58,92,0.08)]">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-black text-green-700">Curriculum</p>
              <h2 className="text-3xl font-black tracking-[-0.04em] text-navy-900">6강 커리큘럼</h2>
            </div>
            <span className="rounded-full bg-navy-50 px-4 py-2 text-sm font-black text-navy-900">총 7시간</span>
          </div>
          <div className="space-y-4">
            {voicePhishingLessons.map((lesson) => (
              <div key={lesson.id} className="grid gap-4 rounded-3xl border border-navy-100 bg-[#fbfcf8] p-5 md:grid-cols-[80px_1fr_auto] md:items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-navy-900 font-black text-white">{String(lesson.order).padStart(2, '0')}</div>
                <div>
                  <h3 className="text-lg font-black text-navy-900">{lesson.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-gray-600">{lesson.summary}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {lesson.materials.map((material) => (
                      <span key={material} className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-bold text-gray-600 ring-1 ring-navy-100"><Download size={13} /> {material}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-green-800 ring-1 ring-green-100">
                  <Clock size={15} /> {lesson.duration}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-main pb-16">
        <div className="grid gap-5 lg:grid-cols-3">
          <div className="rounded-[1.75rem] bg-navy-900 p-6 text-white lg:col-span-1">
            <GraduationCap className="mb-4 text-green-100" />
            <h2 className="text-2xl font-black">오프라인 → 온라인 전환</h2>
            <p className="mt-3 text-sm leading-7 text-navy-100">오프라인 참석자가 교육 종료 후에도 동일한 기준으로 복습하고 자료를 내려받는 흐름을 만듭니다.</p>
          </div>
          <div className="grid gap-3 lg:col-span-2 md:grid-cols-2">
            {['오프라인 교육 참석', '온라인 계정/초대 확인', '내 강의실에서 배정 과정 확인', '동영상·자료·퀴즈로 복습'].map((step, index) => (
              <div key={step} className="rounded-[1.5rem] bg-white p-5 shadow-[0_12px_35px_rgba(26,58,92,0.07)]">
                <p className="mb-2 text-sm font-black text-green-700">Step {index + 1}</p>
                <p className="font-black text-navy-900">{step}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-5">
          {safetyGates.map((gate) => (
            <div key={gate} className="rounded-2xl border border-navy-100 bg-white p-4 text-xs font-bold leading-6 text-gray-600">{gate}</div>
          ))}
        </div>
      </section>
    </main>
  )
}
