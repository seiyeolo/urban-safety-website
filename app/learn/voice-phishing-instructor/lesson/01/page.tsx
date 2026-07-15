import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2, ChevronRight, Download, FileText, LockKeyhole, MessageSquareWarning, Play, ShieldCheck } from 'lucide-react'
import { safetyGates, voicePhishingLessons } from '@/lib/mockCourses'

export const metadata: Metadata = {
  title: '1강 플레이어 mock | 보이스피싱 예방지도사',
  description: '실제 영상 없이 온라인 강의 플레이어 구조를 검증하는 mock 화면입니다.',
}

const currentLesson = voicePhishingLessons[0]

export default function LessonPlayerMockPage() {
  return (
    <main className="min-h-screen bg-[#eef2ea]">
      <section className="grid min-h-screen lg:grid-cols-[1fr_380px]">
        <div className="flex flex-col">
          <header className="border-b border-white/10 bg-[#0d1829] px-5 py-4 text-white lg:px-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <Link href="/dashboard/learning" className="mb-2 inline-flex items-center gap-2 text-sm font-bold text-green-100 hover:text-white"><ArrowLeft size={16} /> 내 강의실</Link>
                <h1 className="text-xl font-black tracking-[-0.03em] md:text-2xl">{currentLesson.title}</h1>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-black text-amber-700"><LockKeyhole size={15} /> 영상 placeholder</span>
            </div>
          </header>

          <div className="flex-1 bg-[#0d1829] p-4 lg:p-8">
            <div className="relative flex aspect-video min-h-[320px] items-center justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_20%_20%,rgba(46,125,50,0.45),transparent_26%),radial-gradient(circle_at_80%_20%,rgba(255,111,0,0.22),transparent_24%),linear-gradient(135deg,#101f34,#1a3a5c_58%,#102417)] shadow-[0_30px_90px_rgba(0,0,0,0.3)]">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:46px_46px]" />
              <div className="relative text-center text-white">
                <button className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:scale-105 hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" aria-label="mock video play button">
                  <Play className="ml-1" size={38} fill="currentColor" />
                </button>
                <p className="text-sm font-black text-green-100">Mock Video Player</p>
                <h2 className="mt-2 text-3xl font-black tracking-[-0.04em]">실제 영상 연결 전 화면 구조 검증</h2>
                <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-navy-100">이 영역은 영상 호스팅 방식이 결정되기 전까지 placeholder로 유지합니다.</p>
              </div>
            </div>

            <div className="mt-6 grid gap-5 xl:grid-cols-[1fr_360px]">
              <section className="rounded-[2rem] bg-white p-6 shadow-[0_18px_55px_rgba(0,0,0,0.12)]">
                <p className="text-sm font-black text-green-700">Lesson summary</p>
                <h2 className="mt-1 text-2xl font-black text-navy-900">학습 목표</h2>
                <p className="mt-4 leading-8 text-gray-700">{currentLesson.summary}</p>
                <div className="mt-5 grid gap-3 md:grid-cols-3">
                  {['예방지도사 역할 이해', '시민 설명 기준 정리', '복습 자료 다운로드'].map((goal) => (
                    <div key={goal} className="rounded-2xl bg-green-50 p-4 text-sm font-bold leading-7 text-gray-700">
                      <CheckCircle2 className="mb-3 text-green-700" size={20} />
                      {goal}
                    </div>
                  ))}
                </div>
              </section>

              <aside className="rounded-[2rem] border border-amber-100 bg-amber-50 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <MessageSquareWarning className="text-amber-700" />
                  <h2 className="text-xl font-black text-navy-900">운영 전 확인</h2>
                </div>
                <p className="text-sm leading-7 text-gray-700">수료 기준, 영상 접근권한, 자료 저작권, 개인정보 처리 동의는 실제 서비스 전 별도 승인과 검수가 필요합니다.</p>
              </aside>
            </div>
          </div>
        </div>

        <aside className="border-l border-navy-100 bg-white p-5 lg:min-h-screen lg:p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-black text-green-700">Course playlist</p>
              <h2 className="text-2xl font-black text-navy-900">차시 목록</h2>
            </div>
            <span className="rounded-full bg-navy-50 px-3 py-1 text-xs font-black text-navy-900">1/6</span>
          </div>

          <div className="space-y-3">
            {voicePhishingLessons.map((lesson) => (
              <div key={lesson.id} className={`rounded-2xl border p-4 ${lesson.status === 'current' ? 'border-green-100 bg-green-50' : 'border-navy-100 bg-[#fbfcf8]'}`}>
                <div className="flex gap-3">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-black ${lesson.status === 'current' ? 'bg-green-700 text-white' : 'bg-navy-50 text-navy-900'}`}>{lesson.order}</div>
                  <div className="min-w-0">
                    <h3 className="font-black leading-6 text-navy-900">{lesson.title}</h3>
                    <p className="mt-1 text-xs font-bold text-gray-500">{lesson.duration}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-[1.5rem] bg-[#f5f7f2] p-5">
            <div className="mb-4 flex items-center gap-2 font-black text-navy-900"><FileText size={18} /> 강의자료</div>
            <div className="space-y-2">
              {currentLesson.materials.map((item) => (
                <div key={item} className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 text-sm font-bold text-gray-700">
                  {item}
                  <Download className="text-green-700" size={16} />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-[1.5rem] bg-navy-900 p-5 text-white">
            <div className="mb-3 flex items-center gap-2 font-black"><ShieldCheck size={18} /> mock 안전 범위</div>
            <ul className="space-y-2 text-xs leading-6 text-navy-100">
              {safetyGates.slice(0, 3).map((gate) => <li key={gate}>• {gate}</li>)}
            </ul>
          </div>

          <div className="mt-6 flex gap-3">
            <Link href="/dashboard/learning" className="flex-1 rounded-2xl border border-navy-100 px-4 py-3 text-center text-sm font-black text-navy-900 transition hover:bg-navy-50">나가기</Link>
            <button className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-green-700 px-4 py-3 text-sm font-black text-white transition hover:bg-green-800">다음 강의 <ChevronRight size={16} /></button>
          </div>
        </aside>
      </section>
    </main>
  )
}
