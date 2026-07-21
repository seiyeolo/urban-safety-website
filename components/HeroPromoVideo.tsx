'use client'

import { useRef, useState, useSyncExternalStore } from 'react'
import { Play } from 'lucide-react'

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION_QUERY)
  mq.addEventListener('change', callback)
  return () => mq.removeEventListener('change', callback)
}

/*
 * 홈 히어로 홍보영상 카드
 * - 기본: 39초 무음 티저를 음소거 자동재생 루프 (promo-teaser.mp4)
 * - 재생 버튼 클릭: 2분 21초 풀버전을 소리·컨트롤과 함께 재생 (promo-full.mp4)
 * - 영상 원본: 07_video_production/remotion-video (Remotion 렌더링)
 */
export default function HeroPromoVideo() {
  const [isFullVersion, setIsFullVersion] = useState(false)
  const fullVideoRef = useRef<HTMLVideoElement>(null)

  // prefers-reduced-motion 사용자에겐 티저 자동재생을 끄고 정지 포스터를 노출 (a11y).
  // matchMedia 외부 스토어 구독은 useSyncExternalStore로 처리 (SSR 스냅샷: false).
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  )

  const playFullVersion = () => {
    setIsFullVersion(true)
    // 상태 반영 직후 재생 시작 (사용자 클릭 컨텍스트 내라 자동재생 차단 없음)
    requestAnimationFrame(() => {
      fullVideoRef.current?.play().catch(() => {
        /* 재생 실패 시 컨트롤로 수동 재생 가능 */
      })
    })
  }

  return (
    <div className="relative w-full rounded-xl overflow-hidden shadow-2xl shadow-black/40 ring-1 ring-white/20 bg-black aspect-video">
      {isFullVersion ? (
        <video
          ref={fullVideoRef}
          className="w-full h-full object-cover"
          src="/videos/promo-full.mp4"
          poster="/videos/promo-poster.jpg"
          controls
          playsInline
          preload="auto"
        />
      ) : (
        <>
          <video
            className="w-full h-full object-cover"
            src="/videos/promo-teaser.mp4"
            poster="/videos/promo-poster.jpg"
            muted
            autoPlay={!reduceMotion}
            loop
            playsInline
            preload="metadata"
          />
          {/* 재생 오버레이 */}
          <button
            type="button"
            onClick={playFullVersion}
            aria-label="홍보영상 전체 보기 (2분 21초)"
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/25 hover:bg-black/40 transition-colors group cursor-pointer"
          >
            <span className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 group-hover:bg-white group-hover:scale-105 transition-all shadow-lg">
              <Play size={32} className="text-navy-900 ml-1" fill="currentColor" />
            </span>
            <span className="text-white text-sm md:text-base font-bold tracking-wide drop-shadow">
              센터 홍보영상 보기 · 2분 21초
            </span>
          </button>
        </>
      )}
    </div>
  )
}
