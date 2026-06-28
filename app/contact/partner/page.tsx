import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone, Mail } from 'lucide-react'
import PartnerInquiryForm from '@/components/contact/PartnerInquiryForm'

export const metadata: Metadata = {
  title: '제휴 문의',
  description: '대전경실련 도시안전디자인센터 협력기관 및 강사 파트너십 제안 문의 페이지입니다.',
}

export default function PartnerContactPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container-main">
          <nav className="breadcrumb justify-center">
            <Link href="/" className="text-blue-300 hover:text-white">홈</Link>
            <span className="breadcrumb-sep text-blue-400">›</span>
            <Link href="/contact" className="text-blue-300 hover:text-white">참여·문의</Link>
            <span className="breadcrumb-sep text-blue-400">›</span>
            <span className="text-white">제휴 문의</span>
          </nav>
          <h1>제휴 문의</h1>
          <p>협력기관, 강사 파트너십 제안</p>
        </div>
      </div>

      <section className="section-padding bg-white">
        <div className="container-main max-w-2xl mx-auto">
          <div className="mb-8 grid sm:grid-cols-2 gap-4">
            {[
              { title: '기관 협력', desc: '안전교육 공동 운영, MOU 체결, 공익 캠페인 협력' },
              { title: '강사 파트너', desc: '범죄예방·생활안전 분야 전문 강사 등록 및 활동' },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-blue-50 rounded-xl p-5">
                <h3 className="font-bold text-[#0f2d5e] mb-2">{title}</h3>
                <p className="text-sm text-gray-600">{desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 mb-8">
            <h2 className="font-bold text-[#0f2d5e] mb-3">협력 제안 안내</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              도시안전디자인센터는 도시안전디자인포럼 활동 기반 위에서 공공기관, 연구기관, 대학, 시민사회단체와
              협력해 왔습니다. 안전교육 공동 운영, 세미나 및 캠페인 협업, 현장 네트워크 구축 제안을 환영합니다.
            </p>
          </div>

          <PartnerInquiryForm />

          <div className="mt-8 p-5 bg-gray-50 rounded-xl">
            <p className="text-sm font-semibold text-gray-700 mb-3">직접 연락하기</p>
            <div className="space-y-2">
              <a href="tel:042-254-8060" className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#0f2d5e]">
                <Phone size={14} className="text-gray-400" />042-254-8060
              </a>
              <a href="mailto:dj@ccej.or.kr" className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#0f2d5e]">
                <Mail size={14} className="text-gray-400" />dj@ccej.or.kr
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
