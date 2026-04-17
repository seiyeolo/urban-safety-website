'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, Home, RefreshCw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('페이지 렌더링 오류:', error)
  }, [error])

  return (
    <main
      id="main"
      className="min-h-[60vh] flex items-center justify-center px-6 py-16 bg-gradient-to-b from-white to-red-50"
    >
      <div className="max-w-2xl w-full text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-6">
          <AlertTriangle size={32} className="text-red-700" aria-hidden="true" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          일시적인 오류가 발생했습니다
        </h1>
        <p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed">
          페이지를 표시하는 중 문제가 생겼습니다. 잠시 후 다시 시도해주세요.
          <br />
          문제가 계속되면 042-254-8060으로 연락 부탁드립니다.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 bg-navy-900 text-white px-5 py-3 rounded-lg font-medium hover:bg-navy-800 transition-colors"
          >
            <RefreshCw size={18} />
            다시 시도
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 border-2 border-gray-300 text-gray-700 px-5 py-3 rounded-lg font-medium hover:border-navy-900 hover:text-navy-900 transition-colors"
          >
            <Home size={18} />
            홈으로 이동
          </Link>
        </div>

        {error.digest && (
          <p className="mt-8 text-xs text-gray-400">오류 코드: {error.digest}</p>
        )}
      </div>
    </main>
  )
}
