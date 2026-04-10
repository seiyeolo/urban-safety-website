import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: '교육 및 자격증 문의',
  description: '대전경실련 도시안전디자인센터 교육 및 자격증 관련 문의 페이지입니다.',
}

export default function EducationContactPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container-main">
          <nav className="breadcrumb justify-center">
            <Link href="/" className="text-blue-300 hover:text-white">홈</Link>
            <span className="breadcrumb-sep text-blue-400">›</span>
            <Link href="/contact" className="text-blue-300 hover:text-white">참여·문의</Link>
            <span className="breadcrumb-sep text-blue-400">›</span>
            <span className="text-white">교육 및 자격증 문의</span>
          </nav>
          <h1>교육 및 자격증 문의</h1>
          <p>수강신청, 교육과정, 자격증 관련 문의</p>
        </div>
      </div>

      <section className="section-padding bg-white">
        <div className="container-main max-w-2xl mx-auto">
          {/* 자주 묻는 문의 유형 */}
          <div className="mb-10">
            <h2 className="text-lg font-bold text-[#0f2d5e] mb-4">자주 문의하시는 내용</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                '수강 신청 방법',
                '수강료 결제 방법',
                '교육 기간 및 일정',
                '자격증 취득 조건',
                '환불 규정',
                '자격증 유효기간',
                '재응시 방법',
                '단체 수강 할인',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg text-sm text-gray-700">
                  <span className="w-1.5 h-1.5 bg-[#0f2d5e] rounded-full shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* 문의 폼 */}
          <h2 className="text-lg font-bold text-[#0f2d5e] mb-5">온라인 문의</h2>
          <form className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">이름 <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  placeholder="홍길동"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0f2d5e] focus:ring-1 focus:ring-[#0f2d5e]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">연락처 <span className="text-red-500">*</span></label>
                <input
                  type="tel"
                  placeholder="010-0000-0000"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0f2d5e] focus:ring-1 focus:ring-[#0f2d5e]"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">문의 과정</label>
              <select className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0f2d5e] bg-white">
                <option value="">선택해주세요</option>
                <option>보이스피싱 예방지도사</option>
                <option>생활안전지도사</option>
                <option>기타 교육과정</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">문의 내용 <span className="text-red-500">*</span></label>
              <textarea
                rows={5}
                placeholder="문의 내용을 자세히 입력해주세요"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0f2d5e] focus:ring-1 focus:ring-[#0f2d5e] resize-none"
              />
            </div>
            <div className="flex items-start gap-2">
              <input type="checkbox" id="privacy" className="mt-1" />
              <label htmlFor="privacy" className="text-sm text-gray-600">
                <Link href="/privacy" className="text-[#0f2d5e] underline">개인정보처리방침</Link>에 동의합니다. <span className="text-red-500">*</span>
              </label>
            </div>
            <button type="submit" className="btn-primary w-full justify-center py-4">
              문의 보내기
            </button>
          </form>

          {/* 직접 연락 */}
          <div className="mt-8 p-5 bg-gray-50 rounded-xl">
            <p className="text-sm font-semibold text-gray-700 mb-3">직접 연락하기</p>
            <div className="space-y-2">
              <a href="tel:042-254-8060" className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#0f2d5e]">
                <Phone size={14} className="text-gray-400" />042-254-8060 (평일 09:00~18:00)
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
