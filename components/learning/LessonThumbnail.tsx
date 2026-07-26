'use client'

import Image from 'next/image'
import { CheckCircle2, Play, Video } from 'lucide-react'
import { cn } from '@/lib/utils'
import { youtubeThumbnailUrl } from '@/lib/lessonVideos'

/* 수강생 대다수가 YouTube 시청 경험에 익숙하다는 점을 고려해
   재생목록 항목을 YouTube와 같은 형태로 구성한다:
   16:9 썸네일 + 우하단 재생시간 배지 + 재생/완료 상태 오버레이 */

interface LessonThumbnailProps {
  videoId: string
  duration: string
  order: number
  done?: boolean
  isCurrent?: boolean
  /** 목록용 작은 크기(기본) / 강조용 큰 크기 */
  size?: 'sm' | 'md'
  className?: string
}

const SIZES = {
  sm: { wrap: 'w-[124px]', sizes: '124px' },
  md: { wrap: 'w-[168px]', sizes: '168px' },
}

export function LessonThumbnail({
  videoId,
  duration,
  order,
  done = false,
  isCurrent = false,
  size = 'sm',
  className,
}: LessonThumbnailProps) {
  const s = SIZES[size]

  return (
    <div
      className={cn(
        'relative shrink-0 overflow-hidden rounded-lg bg-brand-900 aspect-video',
        s.wrap,
        isCurrent && 'ring-2 ring-accent-400',
        className
      )}
    >
      {videoId ? (
        <Image
          src={youtubeThumbnailUrl(videoId)}
          alt=""
          fill
          sizes={s.sizes}
          className={cn('object-cover transition', done && 'opacity-75')}
          aria-hidden="true"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-white/[.04]">
          <Video size={18} className="text-neutral-500" aria-hidden="true" />
        </div>
      )}

      {/* 재생 시간 — YouTube와 동일하게 우하단 */}
      {videoId && (
        <span className="absolute bottom-1 right-1 rounded bg-black/80 px-1.5 py-0.5 text-[11px] font-bold leading-none text-white">
          {duration}
        </span>
      )}

      {/* 상태 오버레이 */}
      {done ? (
        <span className="absolute inset-0 flex items-center justify-center bg-brand-950/30">
          <CheckCircle2 size={22} className="text-accent-400" aria-hidden="true" />
        </span>
      ) : isCurrent ? (
        <span className="absolute inset-0 flex items-center justify-center bg-brand-950/35">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-400">
            <Play size={14} className="ml-0.5 text-brand-950" fill="currentColor" aria-hidden="true" />
          </span>
        </span>
      ) : (
        <span className="absolute left-1 top-1 rounded bg-black/70 px-1.5 py-0.5 text-[11px] font-black leading-none text-white">
          {order}강
        </span>
      )}
    </div>
  )
}
