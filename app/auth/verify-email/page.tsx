'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Mail, CheckCircle, ArrowLeft, RotateCcw } from 'lucide-react'

export default function VerifyEmailPage() {
  const [email, setEmail] = useState('')
  const [resendLoading, setResendLoading] = useState(false)
  const [resendMessage, setResendMessage] = useState('')
  const router = useRouter()

  useEffect(() => {
    // URL 파라미터에서 이메일 읽기 (회원가입 후 전달받는 경우)
    const urlParams = new URLSearchParams(window.location.search)
    const emailParam = urlParams.get('email')
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam))
    }
  }, [])

  const handleResendEmail = async () => {
    if (!email) {
      setResendMessage('이메일 주소를 입력해주세요.')
      return
    }

    setResendLoading(true)
    setResendMessage('')

    try {
      // TODO: Supabase 이메일 재전송 로직 구현
      // const { error } = await supabase.auth.resend({
      //   type: 'signup',
      //   email: email
      // })

      // 임시로 성공 메시지 표시
      setTimeout(() => {
        setResendMessage('인증 이메일이 재전송되었습니다.')
        setResendLoading(false)
      }, 2000)

    } catch (error) {
      setResendMessage('이메일 재전송 중 오류가 발생했습니다.')
      setResendLoading(false)
    }
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
          <h1 className="text-3xl font-bold text-white mb-2">이메일 인증</h1>
          <p className="text-blue-300">회원가입을 완료하려면 이메일을 확인해주세요</p>
        </div>

        {/* 인증 안내 카드 */}
        <div className="bg-white rounded-2xl p-8 shadow-xl mb-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail size={32} className="text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">이메일을 확인해주세요</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              회원가입이 거의 완료되었습니다!<br />
              {email ? (
                <>
                  <span className="font-medium text-[#2e7d32]">{email}</span>로<br />
                  인증 링크를 보내드렸습니다.
                </>
              ) : (
                '인증 링크를 보내드렸습니다.'
              )}
            </p>
          </div>

          <div className="space-y-4">
            {/* 확인 단계 */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <CheckCircle size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-green-800 mb-1">인증 단계</h3>
                  <ol className="text-sm text-green-700 space-y-1">
                    <li>1. 이메일 받은편지함을 확인하세요</li>
                    <li>2. "이메일 인증" 제목의 메일을 찾으세요</li>
                    <li>3. 메일 내 "인증 완료" 버튼을 클릭하세요</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* 이메일 재전송 */}
            <div className="text-center pt-4">
              <p className="text-sm text-gray-600 mb-3">이메일이 오지 않았나요?</p>

              {/* 이메일 입력 (파라미터가 없는 경우) */}
              {!email && (
                <div className="mb-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="이메일 주소를 입력하세요"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#2e7d32] focus:border-transparent"
                  />
                </div>
              )}

              <button
                onClick={handleResendEmail}
                disabled={resendLoading || !email}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {resendLoading ? (
                  <div className="w-4 h-4 border-2 border-gray-400/30 border-t-gray-400 rounded-full animate-spin" />
                ) : (
                  <RotateCcw size={16} />
                )}
                인증 이메일 재전송
              </button>

              {resendMessage && (
                <p className={`text-xs mt-2 ${resendMessage.includes('오류') ? 'text-red-600' : 'text-green-600'}`}>
                  {resendMessage}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* 도움말 링크 */}
        <div className="text-center space-y-2">
          <p className="text-blue-300 text-sm">
            스팸 메일함도 확인해보세요.
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