'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth/AuthContext'
import {
  User,
  BookOpen,
  Award,
  Calendar,
  MessageCircle,
  Settings,
  LogOut,
  ChevronRight,
  Bell,
  Clock
} from 'lucide-react'

export default function DashboardPage() {
  const { user, session, signOut, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // 로그인하지 않은 사용자는 로그인 페이지로 리다이렉트
    if (!loading && !session) {
      router.push('/auth/login')
    }
  }, [session, loading, router])

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  // 로딩 중이거나 세션이 없으면 로딩 화면 표시
  if (loading || !session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a3a5c] to-[#002444] flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p>로딩 중...</p>
        </div>
      </div>
    )
  }

  const QUICK_ACTIONS = [
    {
      icon: BookOpen,
      title: '교육 신청하기',
      description: '새로운 교육과정에 참여하세요',
      href: '/education',
      color: 'bg-blue-500'
    },
    {
      icon: Award,
      title: '자격증 확인',
      description: '취득한 자격증을 확인하세요',
      href: '/certificates',
      color: 'bg-green-500'
    },
    {
      icon: Calendar,
      title: '일정 관리',
      description: '내 교육 일정을 관리하세요',
      href: '/dashboard/schedule',
      color: 'bg-purple-500'
    },
    {
      icon: MessageCircle,
      title: '문의하기',
      description: '궁금한 점을 문의하세요',
      href: '/contact',
      color: 'bg-orange-500'
    }
  ]

  const RECENT_ACTIVITIES = [
    {
      title: '보이스피싱 예방지도사 교육 신청 완료',
      time: '2시간 전',
      status: '확인 대기'
    },
    {
      title: '도시안전디자인 기초과정 수료',
      time: '1주일 전',
      status: '완료'
    },
    {
      title: '프로필 정보 업데이트',
      time: '2주일 전',
      status: '완료'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#1a3a5c] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">安</span>
                </div>
                <span className="font-bold text-gray-900">도시안전디자인센터</span>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
                <Bell size={20} />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#2e7d32] rounded-full flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {user?.user_metadata?.name || user?.email}
                </span>
              </div>
              <button
                onClick={handleSignOut}
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            안녕하세요, {user?.user_metadata?.name || '회원'}님!
          </h1>
          <p className="text-gray-600">도시안전디자인센터 대시보드에 오신 것을 환영합니다.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Quick Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">빠른 실행</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {QUICK_ACTIONS.map((action) => (
                  <Link
                    key={action.title}
                    href={action.href}
                    className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4`}>
                          <action.icon size={24} className="text-white" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-1">{action.title}</h3>
                        <p className="text-sm text-gray-600">{action.description}</p>
                      </div>
                      <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Recent Activities */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">최근 활동</h2>
              <div className="bg-white rounded-xl shadow-sm border">
                <div className="divide-y">
                  {RECENT_ACTIVITIES.map((activity, index) => (
                    <div key={index} className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 mb-1">{activity.title}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Clock size={14} />
                            <span>{activity.time}</span>
                          </div>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          activity.status === '완료'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {activity.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Right Column - Profile & Quick Info */}
          <div className="space-y-6">
            {/* Profile Card */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">프로필</h2>
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-[#2e7d32] rounded-full flex items-center justify-center mx-auto mb-4">
                    <User size={32} className="text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    {user?.user_metadata?.name || '회원'}
                  </h3>
                  <p className="text-sm text-gray-600">{user?.email}</p>
                  {user?.user_metadata?.phone && (
                    <p className="text-sm text-gray-600">{user.user_metadata.phone}</p>
                  )}
                </div>

                <div className="space-y-3">
                  <Link
                    href="/dashboard/profile"
                    className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <Settings size={16} />
                    프로필 수정
                  </Link>
                </div>
              </div>
            </section>

            {/* Quick Stats */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">내 현황</h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl shadow-sm border p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">수강 중인 과정</span>
                    <span className="font-bold text-[#2e7d32]">2개</span>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">취득한 자격증</span>
                    <span className="font-bold text-[#2e7d32]">1개</span>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">완료한 과정</span>
                    <span className="font-bold text-[#2e7d32]">3개</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}