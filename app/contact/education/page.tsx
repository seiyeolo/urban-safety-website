import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone, Mail } from 'lucide-react'
import { Button, Input, PageHero, Select, Textarea } from '@/components/ui'

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
          <form className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <Input label="이름" required type="text" placeholder="홍길동" />
              <Input label="연락처" required type="tel" placeholder="010-0000-0000" />
            </div>

            <Select label="문의 과정">
              <option value="">선택해주세요</option>
              <option>보이스피싱 예방지도사</option>
              <option>생활안전지도사</option>
              <option>기타 교육과정</option>
            </Select>

            <Textarea
              label="문의 내용"
              required
              rows={5}
              placeholder="문의 내용을 자세히 입력해주세요"
            />

            <div className="flex items-start gap-2">
              <input type="checkbox" id="privacy" className="mt-1.5" />
              <label htmlFor="privacy" className="text-sm text-neutral-700">
                <Link href="/privacy" className="text-brand-600 underline">개인정보처리방침</Link>에 동의합니다. <span className="text-danger-600">*</span>
              </label>
            </div>

            <Button type="submit" className="w-full">
              문의 보내기
            </Button>
          </form>

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
