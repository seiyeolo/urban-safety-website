import type { Metadata } from 'next'
import RequireAuth from '@/lib/auth/RequireAuth'
import LearningDashboard from './LearningDashboard'

export const metadata: Metadata = {
  title: '내 강의실 | 도시안전디자인센터',
  description: '배정받은 온라인 강의를 확인하고 이어보는 수강생 대시보드입니다.',
  robots: { index: false },
}

export default function LearningDashboardPage() {
  return (
    <RequireAuth>
      <LearningDashboard />
    </RequireAuth>
  )
}
