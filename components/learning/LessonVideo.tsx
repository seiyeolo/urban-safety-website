'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'
import { youtubeEmbedUrl, youtubeThumbnailUrl } from '@/lib/lessonVideos'

/*
 * 강의 영상 파사드(facade)
 * ─────────────────────────────────────────────
 * iframe을 처음부터 띄우면 YouTube가 플레이어 위에 "채널 아바타 + 영상 제목 +
 * 채널명" 오버레이를 얹는다. 수강생 화면에서는 센터 강의가 외부 개인 채널
 * 콘텐츠처럼 보이게 되므로, 재생 전에는 iframe을 만들지 않는다.
 *
 * 재생 전: YouTube 썸네일 이미지 + 센터 재생 버튼 (플레이어 크롬 없음)
 * 클릭 후: autoplay로 iframe을 붙인다 — 재생이 시작되면 제목 바는 스스로 사라진다.
 *
 * ⚠️ 한계: 재생 중 일시정지하거나 플레이어에 마우스를 올리면 제목 바가 다시
 * 나타난다. YouTube가 modestbranding 파라미터를 폐기해서 임베드 방식으로는
 * 완전 제거가 불가능하다. 완전히 없애려면 자체 호스팅 등 다른 방식이 필요하다.
 *
 * 부수 효과로 첫 진입 시 YouTube 스크립트를 받지 않아 초기 로딩도 가벼워진다.
 */

interface LessonVideoProps {
  videoId: string
  /** 화면에 읽히는 이름 — iframe title과 재생 버튼 레이블에 쓰인다 */
  label: string
}

export function LessonVideo({ videoId, label }: LessonVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  // maxres는 저해상도로 업로드된 영상에는 없다(404). 그때는 모든 영상에 존재하는
  // hq로 내려 앉는다 — 화질은 떨어져도 플레이어가 깨져 보이지는 않는다.
  const [quality, setQuality] = useState<'maxres' | 'hq'>('maxres')

  if (isPlaying) {
    return (
      <div className="relative aspect-video w-full bg-black">
        <iframe
          src={youtubeEmbedUrl(videoId, { autoplay: true })}
          title={label}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    )
  }

  return (
    <div className="relative aspect-video w-full bg-black">
      <Image
        src={youtubeThumbnailUrl(videoId, quality)}
        alt=""
        fill
        sizes="(min-width: 1024px) 1140px, 100vw"
        className="object-cover"
        priority
        aria-hidden="true"
        onError={() => setQuality('hq')}
      />
      <button
        type="button"
        onClick={() => setIsPlaying(true)}
        aria-label={`${label} 재생`}
        className="group absolute inset-0 flex cursor-pointer items-center justify-center bg-brand-950/25 transition-colors hover:bg-brand-950/40 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-accent-400"
      >
        <span className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-accent-400 shadow-[0_0_0_12px_rgba(190,215,58,0.15),0_18px_55px_rgba(0,0,0,0.5)] transition-transform group-hover:scale-105">
          <Play size={30} className="ml-1 text-brand-950" fill="currentColor" aria-hidden="true" />
        </span>
      </button>
    </div>
  )
}
