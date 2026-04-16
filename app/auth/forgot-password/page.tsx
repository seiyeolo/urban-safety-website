'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Mail, ArrowLeft, CheckCircle, ArrowRight } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!email.trim()) {
      setError('이메일을 입력해주세요.')
      return
    }

    setLoading(true)
    setError('')

    try {
      // TODO: Supabase 비밀번호 재설정 로직 구현
      // const { error } = await supabase.auth.resetPasswordForEmail(email, {
      //   redirectTo: `${window.location.origin}/auth/reset-password`
      // })

      // 임시로 성공 상태로 전환
      setTimeout(() => {
        setSuccess(true)
        setLoading(false)
      }, 2000)

    } catch {
      setError('비밀번호 재설정 요청 중 오류가 발생했습니다.')
      setLoading(false)
    }
  }

  if (success) {
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
            <h1 className="text-3xl font-bold text-white mb-2">이메일 전송 완료</h1>
            <p className="text-blue-300">비밀번호 재설정 링크를 보내드렸습니다</p>
          </div>

          {/* 성공 카드 */}
          <div className="bg-white rounded-2xl p-8 shadow-xl mb-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">이메일을 확인해주세요</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                <span className="font-medium text-[#2e7d32]">{email}</span>로<br />
                비밀번호 재설정 링크를 보내드렸습니다.
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-2">📧 다음 단계:</p>
                  <ol className="text-left space-y-1">
                    <li>1. 이메일 받은편지함 확인</li>
                    <li>2. "비밀번호 재설정" 메일 찾기</li>
                    <li>3. 링크 클릭하여 새 비밀번호 설정</li>
                  </ol>
                </div>
              </div>

              <div className="space-y-3">
                <Link
                  href="/auth/login"
                  className="w-full bg-[#2e7d32] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#217128] transition-colors flex items-center justify-center gap-2"
                >
                  로그인 페이지로 돌아가기 <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </div>

          {/* 도움말 */}
          <div className="text-center space-y-2">
            <p className="text-blue-300 text-sm">
              이메일이 오지 않았다면 스팸 메일함도 확인해보세요.
            </p>
            <p className="text-blue-300 text-sm">
              문제가 지속되면{' '}
              <Link href="/contact" className="hover:text-white hover:underline font-medium">
                문의하기
              </Link>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a3a5c] to-[#002444] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* 뒤로 가기 */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-blue-300 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="text-sm">뒤로 가기</span>
          </button>
        </div>

        {/* 로고 & 제목 */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-[#1a3a5c] font-bold text-xl">安</span>
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">비밀번호 찾기</h1>
          <p className="text-blue-300">등록된 이메일로 재설정 링크를 보내드릴게요</p>
        </div>

        {/* 비밀번호 재설정 폼 */}
        <div className="bg-white rounded-2xl p-8 shadow-xl">
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
                  placeholder="등록된 이메일을 입력하세요"
                  required
                />
              </div>
            </div>

            {/* 안내 문구 */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                입력하신 이메일이 등록된 계정이라면, 비밀번호 재설정 링크를 보내드립니다.
                보안상 등록되지 않은 이메일에 대해서는 별도 안내하지 않습니다.
              </p>
            </div>

            {/* 에러 메시지 */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* 전송 버튼 */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2e7d32] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#217128] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  재설정 링크 보내기 <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          {/* 다른 옵션 */}
          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-gray-600">
              비밀번호가 기억나셨나요?{' '}
              <Link href="/auth/login" className="text-[#2e7d32] hover:underline font-medium">
                로그인
              </Link>
            </p>
            <p className="text-sm text-gray-600">
              아직 계정이 없으신가요?{' '}
              <Link href="/auth/signup" className="text-[#2e7d32] hover:underline font-medium">
                회원가입
              </Link>
            </p>
          </div>
        </div>

        {/* 문의 안내 */}
        <div className="mt-6 text-center">
          <p className="text-blue-300 text-sm">
            계정 관련 문의사항이 있으시면{' '}
            <Link href="/contact" className="hover:text-white hover:underline">
              문의하기
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}