import type { Metadata } from 'next'
import Link from 'next/link'
import { ShieldAlert } from 'lucide-react'

export const metadata: Metadata = {
  title: '이메일무단수집거부',
  description: '대전경실련 도시안전디자인센터 이메일 무단수집 거부 안내입니다.',
}

export default function NoSpamPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container-main">
          <nav className="breadcrumb justify-center">
            <Link href="/" className="text-blue-300 hover:text-white">홈</Link>
            <span className="breadcrumb-sep text-blue-400">›</span>
            <span className="text-white">이메일무단수집거부</span>
          </nav>
          <h1>이메일무단수집거부</h1>
        </div>
      </div>

      <section className="section-padding bg-white">
        <div className="container-main max-w-2xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center">
              <ShieldAlert size={40} className="text-red-500" />
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center mb-8">
            <h2 className="text-xl font-bold text-red-800 mb-4">이메일 주소 무단수집을 거부합니다</h2>
            <p className="text-red-700 leading-relaxed text-sm">
              본 웹사이트에 게시된 이메일 주소가 전자우편 수집 프로그램이나 그 밖의 기술적 장치를 이용하여
              무단으로 수집되는 것을 거부하며, 이를 위반 시 <strong>정보통신망법에 의해 형사처벌</strong>됨을 유념하시기 바랍니다.
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 text-sm text-gray-700 space-y-4 leading-relaxed">
            <div>
              <h3 className="font-bold text-[#0f2d5e] mb-2">관련 법령</h3>
              <p>
                「정보통신망 이용촉진 및 정보보호 등에 관한 법률」 제50조의2에 따라,
                인터넷 홈페이지 운영자 또는 관리자의 기술적 조치에도 불구하고 이메일 주소를 수집하거나,
                수집된 이메일 주소를 이용하여 영리 목적의 광고성 정보를 전송하는 자는
                1천만원 이하의 과태료가 부과됩니다.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-[#0f2d5e] mb-2">게시 일자</h3>
              <p>2024년 1월 1일</p>
            </div>
            <div>
              <h3 className="font-bold text-[#0f2d5e] mb-2">게시자</h3>
              <p>대전경실련 도시안전디자인센터</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
