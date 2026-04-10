import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: '단체교육 문의',
  description: '대전경실련 도시안전디자인센터 기관·단체 맞춤형 교육 협력 문의 페이지입니다.',
}

export default function GroupContactPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container-main">
          <nav className="breadcrumb justify-center">
            <Link href="/" className="text-blue-300 hover:text-white">홈</Link>
            <span className="breadcrumb-sep text-blue-400">›</span>
            <Link href="/contact" className="text-blue-300 hover:text-white">참여·문의</Link>
            <span className="breadcrumb-sep text-blue-400">›</span>
            <span className="text-white">단체교육 문의</span>
          </nav>
          <h1>단체교육 문의</h1>
          <p>기관·단체 맞춤형 교육 협력 제안</p>
        </div>
      </div>

      <section className="section-padding bg-white">
        <div className="container-main max-w-2xl mx-auto">
          <div className="mb-8 bg-blue-50 rounded-2xl p-6">
            <h3 className="font-bold text-[#0f2d5e] mb-3">단체교육 신청 전 확인사항</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              {[
                '교육 인원: 10인 이상 권장 (소규모 협의 가능)',
                '교육 장소: 의뢰 기관 또는 협의 장소',
                '교육 일정: 최소 2주 전 사전 신청 권장',
                '비용: 교육 규모·내용에 따라 협의',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-[#0f2d5e] rounded-full shrink-0 mt-1.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <form className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">담당자 이름 <span className="text-red-500">*</span></label>
                <input type="text" placeholder="홍길동" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0f2d5e] focus:ring-1 focus:ring-[#0f2d5e]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">연락처 <span className="text-red-500">*</span></label>
                <input type="tel" placeholder="010-0000-0000" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0f2d5e] focus:ring-1 focus:ring-[#0f2d5e]" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">기관·단체명 <span className="text-red-500">*</span></label>
              <input type="text" placeholder="○○복지관" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0f2d5e] focus:ring-1 focus:ring-[#0f2d5e]" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">예상 참여 인원</label>
                <select className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0f2d5e] bg-white">
                  <option value="">선택해주세요</option>
                  <option>10~30명</option>
                  <option>30~50명</option>
                  <option>50~100명</option>
                  <option>100명 이상</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">희망 교육 주제</label>
                <select className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0f2d5e] bg-white">
                  <option value="">선택해주세요</option>
                  <option>보이스피싱 예방</option>
                  <option>생활안전</option>
                  <option>두 주제 모두</option>
                  <option>기타 협의</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">교육 희망 일정</label>
              <input type="text" placeholder="예) 2024년 6월 중, 매주 화요일 오후 등" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0f2d5e] focus:ring-1 focus:ring-[#0f2d5e]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">요청 사항</label>
              <textarea rows={4} placeholder="교육 대상, 목적, 특이사항 등을 자유롭게 적어주세요" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0f2d5e] focus:ring-1 focus:ring-[#0f2d5e] resize-none" />
            </div>
            <div className="flex items-start gap-2">
              <input type="checkbox" id="privacy" className="mt-1" />
              <label htmlFor="privacy" className="text-sm text-gray-600">
                <Link href="/privacy" className="text-[#0f2d5e] underline">개인정보처리방침</Link>에 동의합니다. <span className="text-red-500">*</span>
              </label>
            </div>
            <button type="submit" className="btn-primary w-full justify-center py-4">
              단체교육 문의 보내기
            </button>
          </form>

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
