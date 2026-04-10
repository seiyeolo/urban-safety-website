import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone, Mail } from 'lucide-react'

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

          <form className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">이름 <span className="text-red-500">*</span></label>
                <input type="text" placeholder="홍길동" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0f2d5e] focus:ring-1 focus:ring-[#0f2d5e]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">연락처 <span className="text-red-500">*</span></label>
                <input type="tel" placeholder="010-0000-0000" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0f2d5e] focus:ring-1 focus:ring-[#0f2d5e]" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">소속 기관·단체</label>
              <input type="text" placeholder="소속 기관명을 입력해주세요" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0f2d5e] focus:ring-1 focus:ring-[#0f2d5e]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">제휴 유형 <span className="text-red-500">*</span></label>
              <select className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0f2d5e] bg-white">
                <option value="">선택해주세요</option>
                <option>기관 협력 제안</option>
                <option>강사 파트너 등록</option>
                <option>기타 제휴 제안</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">제안 내용 <span className="text-red-500">*</span></label>
              <textarea rows={5} placeholder="제휴 목적, 희망 협력 내용 등을 자유롭게 작성해주세요" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0f2d5e] focus:ring-1 focus:ring-[#0f2d5e] resize-none" />
            </div>
            <div className="flex items-start gap-2">
              <input type="checkbox" id="privacy" className="mt-1" />
              <label htmlFor="privacy" className="text-sm text-gray-600">
                <Link href="/privacy" className="text-[#0f2d5e] underline">개인정보처리방침</Link>에 동의합니다. <span className="text-red-500">*</span>
              </label>
            </div>
            <button type="submit" className="btn-primary w-full justify-center py-4">제휴 문의 보내기</button>
          </form>

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
