import type { Metadata } from 'next'
import { Phone, Mail } from 'lucide-react'
import GroupInquiryForm from '@/components/contact/GroupInquiryForm'
import { PageHero } from '@/components/ui'

export const metadata: Metadata = {
  title: '단체교육 문의',
  description: '대전경실련 도시안전디자인센터 기관·단체 맞춤형 교육 협력 문의 페이지입니다.',
}

export default function GroupContactPage() {
  return (
    <>
      <PageHero
        title="단체교육 문의"
        description="기관·단체 맞춤형 교육 협력 제안"
        breadcrumb={[
          { label: '홈', href: '/' },
          { label: '참여·문의', href: '/contact' },
          { label: '단체교육 문의' },
        ]}
      />

      <section className="section-padding bg-white">
        <div className="container-main max-w-2xl mx-auto">
          <div className="mb-8 bg-brand-50 rounded-2xl p-6">
            <h3 className="font-bold text-brand-600 mb-3">단체교육 신청 전 확인사항</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              {[
                '교육 인원: 10인 이상 권장 (소규모 협의 가능)',
                '교육 장소: 의뢰 기관 또는 협의 장소',
                '교육 일정: 최소 2주 전 사전 신청 권장',
                '비용: 교육 규모·내용에 따라 협의',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-brand-600 rounded-full shrink-0 mt-1.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <GroupInquiryForm />

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
