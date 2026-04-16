'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth/AuthContext'
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { signIn, signInWithGoogle, signInWithKakao } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { error } = await signIn(email, password)
      if (error) {
        setError(error.message)
      } else {
        router.push('/dashboard') // 로그인 후 리다이렉트
      }
    } catch (err) {
      setError('로그인 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    setError('')

    try {
      const { error } = await signInWithGoogle()
      if (error) {
        setError(error.message)
      }
      // OAuth 로그인은 리다이렉트되므로 별도 처리 불필요
    } catch (err) {
      setError('구글 로그인 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleKakaoLogin = async () => {
    setLoading(true)
    setError('')

    try {
      const { error } = await signInWithKakao()
      if (error) {
        setError(error.message)
      }
      // OAuth 로그인은 리다이렉트되므로 별도 처리 불필요
    } catch (err) {
      setError('카카오 로그인 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a3a5c] to-[#002444] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* 로고 & 제목 */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-[#1a3a5c] font-bold text-xl">安</span>
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">로그인</h1>
          <p className="text-blue-300">도시안전디자인센터에 오신 것을 환영합니다</p>
        </div>

        {/* 로그인 폼 */}
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          {/* 소셜 로그인 버튼들 */}
          <div className="space-y-3 mb-6">
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              구글로 로그인
            </button>

            <button
              onClick={handleKakaoLogin}
              disabled={loading}
              className="w-full bg-[#FEE500] text-[#3C1E1E] py-3 px-4 rounded-lg font-medium hover:bg-[#FDDC00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3C7.589 3 4 6.024 4 9.75c0 2.388 1.574 4.489 3.96 5.664-.176-.862-.33-1.863-.005-2.665.287-.698 1.848-7.798 1.848-7.798s-.472-.93-.472-2.306c0-2.159 1.253-3.771 2.813-3.771 1.327 0 1.967.996 1.967 2.191 0 1.335-.85 3.329-1.289 5.178-.367 1.548.777 2.81 2.305 2.81 2.768 0 4.898-2.919 4.898-7.134 0-3.732-2.684-6.34-6.525-6.34-4.445 0-7.056 3.333-7.056 6.781 0 1.341.514 2.777 1.156 3.556.127.153.145.287.108.445-.118.495-.382 1.555-.435 1.775-.069.287-.224.348-.516.21C5.818 16.789 4.5 14.588 4.5 11.25 4.5 6.924 7.589 3 12 3z"/>
              </svg>
              카카오로 로그인
            </button>
          </div>

          {/* 구분선 */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">또는</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 이메일 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                이메일
              </label>
              <div className="relative">
                <Mail size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e7d32] focus:border-transparent"
                  placeholder="이메일을 입력하세요"
                  required
                />
              </div>
            </div>

            {/* 비밀번호 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                비밀번호
              </label>
              <div className="relative">
                <Lock size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e7d32] focus:border-transparent"
                  placeholder="비밀번호를 입력하세요"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* 에러 메시지 */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* 로그인 버튼 */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2e7d32] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#217128] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  로그인 <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          {/* 추가 링크 */}
          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-gray-600">
              계정이 없으신가요?{' '}
              <Link href="/auth/signup" className="text-[#2e7d32] hover:underline font-medium">
                회원가입
              </Link>
            </p>
            <Link href="/auth/forgot-password" className="text-sm text-gray-500 hover:underline">
              비밀번호를 잊으셨나요?
            </Link>
          </div>
        </div>

        {/* 관리자 로그인 */}
        <div className="mt-6 text-center">
          <Link
            href="/admin"
            className="text-blue-300 hover:text-white text-sm hover:underline"
          >
            관리자 로그인
          </Link>
        </div>
      </div>
    </div>
  )
}