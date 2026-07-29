import type { Metadata } from 'next'
import { Phone, Mail } from 'lucide-react'
import { PageHero } from '@/components/ui'
import EducationInquiryForm from '@/components/contact/EducationInquiryForm'

export const metadata: Metadata = {
  title: '교육 및 자격증 문의',
  description: '대전경실련 도시안전디자인센터 교육 및 자격증 관련 문의 페이지입니다.',
}

export default function EducationContactPage() {
  return (
    <>
      <PageHero
        title="교육 및 자격증 문의"
        description="수강신청, 교육과정, 자격증 관련 문의"
        breadcrumb={[
          { label: '홈', href: '/' },
          { label: '참여·문의', href: '/contact' },
          { label: '교육 및 자격증 문의' },
        ]}
      />

      <section className="section-padding bg-white">
        <div className="container-main max-w-2xl mx-auto">
          {/* 자주 묻는 문의 유형 */}
          <div className="mb-10">
            <h2 className="text-lg font-bold text-brand-600 mb-4">자주 문의하시는 내용</h2>
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
                  <span className="w-1.5 h-1.5 bg-brand-600 rounded-full shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* 문의 폼 */}
          <h2 className="text-lg font-bold text-brand-600 mb-5">온라인 문의</h2>
          <EducationInquiryForm />

          {/* 직접 연락 */}
          <div className="mt-8 p-5 bg-gray-50 rounded-xl">
            <p className="text-sm font-semibold text-gray-700 mb-3">직접 연락하기</p>
            <div className="space-y-2">
              <a href="tel:042-254-8060" className="flex items-center gap-2 text-sm text-gray-600 hover:text-brand-600">
                <Phone size={14} className="text-gray-400" />042-254-8060 (평일 09:00~18:00)
              </a>
              <a href="mailto:dj@ccej.or.kr" className="flex items-center gap-2 text-sm text-gray-600 hover:text-brand-600">
                <Mail size={14} className="text-gray-400" />dj@ccej.or.kr
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
