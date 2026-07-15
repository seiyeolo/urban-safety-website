import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { voicePhishingLessons } from '@/lib/mockCourses'
import RequireAuth from '@/lib/auth/RequireAuth'
import LessonPlayer from './LessonPlayer'

export function generateStaticParams() {
  return voicePhishingLessons.map((lesson) => ({ id: String(lesson.order).padStart(2, '0') }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const lesson = voicePhishingLessons.find((l) => l.order === Number(id))
  return {
    title: lesson ? `${lesson.order}강 ${lesson.title} | 보이스피싱 예방지도사` : '강의 플레이어',
    description: '보이스피싱 예방지도사 온라인 보충과정 강의 플레이어입니다.',
    robots: { index: false },
  }
}

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const order = Number(id)
  const lesson = voicePhishingLessons.find((l) => l.order === order)
  if (!lesson || Number.isNaN(order)) notFound()

  return (
    <RequireAuth>
      <LessonPlayer order={order} />
    </RequireAuth>
  )
}
