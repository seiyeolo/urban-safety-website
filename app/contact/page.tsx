import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, ChevronRight } from 'lucide-react'

export const metadata: Metadata = {
  title: '참여·문의',
  description: '대전경실련 도시안전디자인센터 교육, 자격증, 단체교육 문의 안내입니다.',
}

export default function ContactPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container-main">
          <nav className="breadcrumb justify-center">
            <Link href="/" className="text-blue-300 hover:text-white">홈</Link>
            <span className="breadcrumb-sep text-blue-400">›</span>
            <span className="text-white">참여·문의</span>
          </nav>
          <h1>참여·문의</h1>
          <p>언제든지 편하게 연락 주시기 바랍니다</p>
        </div>
      </div>

      <section className="section-padding bg-white">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* 연락처 정보 */}
            <div>
              <h2 className="text-2xl font-bold text-[#0f2d5e] mb-6">연락처 안내</h2>
              <div className="space-y-5">
                {[
                  { icon: Phone, label: '전화', value: '042-254-8060', href: 'tel:042-254-8060' },
                  { icon: Mail, label: '이메일', value: 'dj@ccej.or.kr', href: 'mailto:dj@ccej.or.kr' },
                  { icon: MapPin, label: '주소', value: '대전광역시 서구 용문동 255-4 서우아파트 상가동 201호', href: null },
                  { icon: Clock, label: '운영시간', value: '평일 09:00 ~ 18:00 (점심 12:00~13:00)', href: null },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-[#0f2d5e]" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium mb-0.5">{label}</p>
                      {href ? (
                        <a href={href} className="text-gray-800 font-medium hover:text-[#0f2d5e] transition-colors">{value}</a>
                      ) : (
                        <p className="text-gray-800 font-medium">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* 문의 유형 */}
              <div className="mt-10">
                <h3 className="text-lg font-bold text-[#0f2d5e] mb-4">문의 유형별 안내</h3>
                <div className="space-y-3">
                  {[
                    { label: '교육 및 자격증 문의', href: '/contact/education', desc: '수강신청, 교육과정, 자격증 관련 문의' },
                    { label: '단체교육 문의', href: '/contact/group', desc: '기관·단체 맞춤형 교육 협력 제안' },
                    { label: '제휴 문의', href: '/contact/partner', desc: '협력기관, 강사 파트너십 제안' },
                  ].map(({ label, href, desc }) => (
                    <Link
                      key={href}
                      href={href}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-blue-50 hover:border-[#0f2d5e] border border-transparent transition-all group"
                    >
                      <div>
                        <p className="font-semibold text-gray-800 group-hover:text-[#0f2d5e] text-sm">{label}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                      </div>
                      <ChevronRight size={16} className="text-gray-400 group-hover:text-[#0f2d5e]" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* 문의 폼 */}
            <div>
              <h2 className="text-2xl font-bold text-[#0f2d5e] mb-6">온라인 문의</h2>
              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">이름 <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      placeholder="홍길동"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0f2d5e] focus:ring-1 focus:ring-[#0f2d5e] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">연락처 <span className="text-red-500">*</span></label>
                    <input
                      type="tel"
                      placeholder="010-0000-0000"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0f2d5e] focus:ring-1 focus:ring-[#0f2d5e] transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">이메일</label>
                  <input
                    type="email"
                    placeholder="example@email.com"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0f2d5e] focus:ring-1 focus:ring-[#0f2d5e] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">문의 유형 <span className="text-red-500">*</span></label>
                  <select className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0f2d5e] transition-colors bg-white">
                    <option value="">선택해주세요</option>
                    <option>교육 및 자격증 문의</option>
                    <option>단체교육 문의</option>
                    <option>제휴 문의</option>
                    <option>기타</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">제목 <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    placeholder="문의 제목을 입력해주세요"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0f2d5e] focus:ring-1 focus:ring-[#0f2d5e] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">내용 <span className="text-red-500">*</span></label>
                  <textarea
                    rows={5}
                    placeholder="문의 내용을 자세히 입력해주세요"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0f2d5e] focus:ring-1 focus:ring-[#0f2d5e] transition-colors resize-none"
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
              <p className="text-xs text-gray-400 mt-3 text-center">
                문의 접수 후 1~2 영업일 내 답변 드립니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 지도 영역 */}
      <section className="section-padding bg-gray-50">
        <div className="container-main">
          <h2 className="text-2xl font-bold text-[#0f2d5e] mb-6 text-center">오시는 길</h2>
          <div className="bg-gray-200 rounded-2xl h-72 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <MapPin size={32} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">지도 영역 (카카오맵/네이버지도 연동)</p>
              <p className="text-xs mt-1">대전광역시 서구 용문동 255-4</p>
            </div>
          </div>
          <div className="mt-6 grid sm:grid-cols-3 gap-4 text-sm text-center">
            <div className="bg-white rounded-xl p-4">
              <p className="font-semibold text-[#0f2d5e] mb-1">버스 이용</p>
              <p className="text-gray-600">용문동 정류장 하차 후 도보 5분</p>
            </div>
            <div className="bg-white rounded-xl p-4">
              <p className="font-semibold text-[#0f2d5e] mb-1">지하철 이용</p>
              <p className="text-gray-600">충남대병원역 2번 출구 도보 10분</p>
            </div>
            <div className="bg-white rounded-xl p-4">
              <p className="font-semibold text-[#0f2d5e] mb-1">주차 안내</p>
              <p className="text-gray-600">건물 내 방문자 주차 가능</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
