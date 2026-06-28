import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Mail, Phone, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: '이메일 인증 — 서비스 준비 중',
  description: '이메일 인증 기능은 현재 준비 중입니다. 전화 또는 이메일로 문의 부탁드립니다.',
  robots: { index: false, follow: false },
}

export default function VerifyEmailPage() {
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
          <div className="flex items-center justify-center w-14 h-14 bg-green-100 rounded-full mx-auto mb-5">
            <CheckCircle size={28} className="text-[#2e7d32]" aria-hidden="true" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 text-center mb-3">
            가입이 접수되었습니다
          </h1>
          <p className="text-sm text-gray-600 text-center leading-relaxed mb-6">
            현재 이메일 자동 인증 시스템은 준비 중입니다.
            <br />
            담당자가 확인 후 수동으로 계정을 활성화해 드립니다.
            <br />
            가입 후 1~2 영업일 내에 안내 연락을 드립니다.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-xs font-semibold text-blue-900 mb-2">📋 진행 순서</p>
            <ol className="text-sm text-blue-800 space-y-1.5">
              <li>1. 담당자가 가입 정보 확인</li>
              <li>2. 계정 활성화 처리</li>
              <li>3. 가입 이메일로 완료 안내 발송</li>
            </ol>
          </div>

          <p className="text-sm font-semibold text-gray-700 mb-3">급하신 경우 직접 연락 주세요</p>
          <div className="space-y-2 mb-6">
            <a
              href="tel:042-254-8060"
              className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-[#2e7d32] hover:bg-green-50 transition-colors"
            >
              <Phone size={16} className="text-[#2e7d32]" aria-hidden="true" />
              <span className="text-sm text-gray-700">042-254-8060 (평일 09:00~18:00)</span>
            </a>
            <a
              href="mailto:dj@ccej.or.kr?subject=계정 활성화 문의"
              className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-[#2e7d32] hover:bg-green-50 transition-colors"
            >
              <Mail size={16} className="text-[#2e7d32]" aria-hidden="true" />
              <span className="text-sm text-gray-700">dj@ccej.or.kr</span>
            </a>
          </div>

          <div className="pt-4 border-t border-gray-100 text-center">
            <Link
              href="/"
              className="text-sm text-[#2e7d32] hover:underline font-medium"
            >
              홈으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
