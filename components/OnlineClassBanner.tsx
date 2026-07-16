'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight, PlayCircle } from 'lucide-react'

/**
 * 전 페이지 공통 — 온라인 강의실 입장 배너
 * 이미 강의실/로그인/관리자 흐름 안에 있는 페이지에서는 표시하지 않는다.
 */
const HIDDEN_PREFIXES = ['/learn', '/dashboard', '/auth', '/admin']

export default function OnlineClassBanner() {
  const pathname = usePathname()
  if (HIDDEN_PREFIXES.some((prefix) => pathname.startsWith(prefix))) return null

  return (
    <div className="bg-green-700">
      <div className="container-main flex flex-col items-center justify-between gap-3 py-3.5 sm:flex-row">
        <p className="flex items-center gap-2.5 text-center text-[15px] font-bold leading-6 text-white sm:text-left">
          <PlayCircle size={20} className="hidden shrink-0 sm:block" aria-hidden />
          <span>
            온라인으로 수강 중이신가요? <span className="font-black">강의 영상·자료·진도 확인</span>은 온라인
            강의실에서 하실 수 있습니다.
          </span>
        </p>
        <Link
          href="/dashboard/learning"
          className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-[15px] font-black text-green-800 shadow-md transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.98] sm:w-auto"
        >
          내 강의실 입장 <ArrowRight size={17} />
        </Link>
      </div>
    </div>
  )
}
