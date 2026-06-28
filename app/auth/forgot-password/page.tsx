import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Mail, Phone, AlertCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: '비밀번호 찾기 — 서비스 준비 중',
  description: '비밀번호 재설정 기능은 현재 준비 중입니다. 전화 또는 이메일로 문의 부탁드립니다.',
  robots: { index: false, follow: false },
}

export default function ForgotPasswordPage() {
  return (
    <main
      id="main-content"
      className="min-h-screen bg-gradient-to-br from-[#1a3a5c] to-[#002444] flex items-center justify-center p-4"
    >
      <div className="max-w-md w-full">
        <div className="mb-6">
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-2 text-blue-300 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft size={18} aria-hidden="true" />
            로그인으로 돌아가기
          </Link>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <div className="flex items-center justify-center w-14 h-14 bg-amber-100 rounded-full mx-auto mb-5">
            <AlertCircle size={28} className="text-amber-600" aria-hidden="true" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 text-center mb-3">
            비밀번호 재설정 서비스 준비 중
          </h1>
          <p className="text-sm text-gray-600 text-center leading-relaxed mb-6">
            온라인 비밀번호 재설정 기능은 현재 준비 중입니다.
            <br />
            번거로우시더라도 아래 연락처로 직접 문의 부탁드립니다.
            담당자가 본인 확인 후 재설정을 도와드립니다.
          </p>

          <div className="space-y-3 mb-6">
            <a
              href="tel:042-254-8060"
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-[#2e7d32] hover:bg-green-50 transition-colors group"
            >
              <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full group-hover:bg-green-200 transition-colors">
                <Phone size={18} className="text-[#2e7d32]" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">전화 문의</p>
                <p className="text-sm text-gray-600">042-254-8060 (평일 09:00~18:00)</p>
              </div>
            </a>

            <a
              href="mailto:dj@ccej.or.kr?subject=비밀번호 재설정 요청"
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-[#2e7d32] hover:bg-green-50 transition-colors group"
            >
              <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full group-hover:bg-green-200 transition-colors">
                <Mail size={18} className="text-[#2e7d32]" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">이메일 문의</p>
                <p className="text-sm text-gray-600">dj@ccej.or.kr</p>
              </div>
            </a>
          </div>

          <div className="pt-4 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-600">
              비밀번호가 기억나셨나요?{' '}
              <Link href="/auth/login" className="text-[#2e7d32] hover:underline font-medium">
                로그인
              </Link>
            </p>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-blue-300">
          서비스 오픈 시 이 페이지를 통해 직접 재설정이 가능하도록 준비 중입니다.
        </p>
      </div>
    </main>
  )
}
