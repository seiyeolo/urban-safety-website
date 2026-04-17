import Link from 'next/link'
import { Home, Mail, Phone } from 'lucide-react'

export const metadata = {
  title: '페이지를 찾을 수 없습니다 | 대전경실련 도시안전디자인센터',
  description: '요청하신 페이지를 찾을 수 없습니다. 홈으로 돌아가거나 주요 페이지를 이용해주세요.',
}

export default function NotFound() {
  return (
    <main
      id="main"
      className="min-h-[60vh] flex items-center justify-center px-6 py-16 bg-gradient-to-b from-white to-navy-50"
    >
      <div className="max-w-2xl w-full text-center">
        <p className="text-6xl md:text-7xl font-bold text-navy-900 tracking-tight mb-4">404</p>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          페이지를 찾을 수 없습니다
        </h1>
        <p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed">
          요청하신 페이지가 이동되었거나 더 이상 존재하지 않을 수 있습니다.
          <br />
          아래 경로를 이용해 필요한 정보로 이동해주세요.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-navy-900 text-white px-5 py-3 rounded-lg font-medium hover:bg-navy-800 transition-colors"
          >
            <Home size={18} />
            홈으로 돌아가기
          </Link>
          <Link
            href="/education"
            className="inline-flex items-center gap-2 bg-green-700 text-white px-5 py-3 rounded-lg font-medium hover:bg-green-800 transition-colors"
          >
            교육 과정 보기
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border-2 border-gray-300 text-gray-700 px-5 py-3 rounded-lg font-medium hover:border-navy-900 hover:text-navy-900 transition-colors"
          >
            <Mail size={18} />
            문의하기
          </Link>
        </div>

        <div className="border-t border-gray-200 pt-6 text-sm text-gray-500">
          <p className="mb-2">문의가 계속되면 연락 부탁드립니다.</p>
          <a
            href="tel:042-254-8060"
            className="inline-flex items-center gap-1 text-navy-900 font-semibold hover:underline"
          >
            <Phone size={14} />
            042-254-8060
          </a>
        </div>
      </div>
    </main>
  )
}
