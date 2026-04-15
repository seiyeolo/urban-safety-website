import Link from 'next/link'
import {
  Award,
  Users,
  ChevronRight,
  ArrowRight,
  Phone,
  CheckCircle,
  Handshake,
} from 'lucide-react'

export default function HomePage() {
  return (
    <>
      {/* [Section 1] Hero Area (히어로 섹션: 정체성 확립) */}
      <section className="relative bg-[#1a3a5c] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('/brand/hero-bg-pattern.svg')] bg-center bg-cover" />
        <div className="relative container-main py-28 md:py-40">
          <div className="max-w-4xl">
            <div className="inline-block text-[#43a047] font-bold tracking-wider text-sm md:text-base mb-6 border border-[#43a047]/30 bg-[#43a047]/10 px-4 py-1.5 rounded-full">
              대전경실련 산하 공익 법인
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-h1 font-bold leading-tight mb-8">
              가족을 믿고 맡길 수 있는<br />
              우리 동네 <span className="text-[#43a047]">안전 전문가</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-12 max-w-2xl">
              시민이 주도하는 도시안전디자인,<br className="hidden md:block" />
              35년 경실련의 공신력으로 안전 교육의 새로운 기준을 세웁니다.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/certificates" className="inline-flex items-center gap-2 bg-[#2e7d32] hover:bg-[#1b5e20] text-white font-semibold px-8 py-4 rounded-lg transition-colors text-lg">
                자격과정 알아보기 <ArrowRight size={20} />
              </Link>
              <Link href="/about" className="inline-flex items-center gap-2 bg-transparent border border-white/30 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-lg transition-colors text-lg">
                센터 소개
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* [Section 2] Authority & Purpose (기과의 공신력과 설립 목적) */}
      <section className="py-24 bg-[#fafaf8] border-b border-gray-200">
        <div className="container-main">
          <div className="mb-20 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a3a5c] leading-tight">
              &ldquo;누구도 소외되지 않는 안전한 도시를 그립니다.&rdquo;
            </h2>
            <div className="w-16 h-1 bg-[#2e7d32] mx-auto mt-8"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
            <div className="relative">
              <div className="text-[#2e7d32] mb-6">
                <Users size={40} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-[#1a3a5c] mb-4">시민 주도의 실천</h3>
              <p className="text-gray-600 leading-relaxed">
                안전은 관의 주도로만 완성되지 않습니다. 시민 스스로 일상의 위험 요인을 진단하고 예방하는 시민참여형 안전문화를 확산시킵니다.
              </p>
            </div>
            
            <div className="relative">
              <div className="hidden md:block absolute -left-6 lg:-left-8 top-0 bottom-0 w-px bg-gray-200"></div>
              <div className="text-[#2e7d32] mb-6">
                <Award size={40} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-[#1a3a5c] mb-4">검증된 전문가 양성</h3>
              <p className="text-gray-600 leading-relaxed">
                보이스피싱 예방부터 생활안전까지, 국가에서 인정하는 민간분야 최고 수준의 안전교육 전문가를 체계적으로 양성합니다.
              </p>
            </div>

            <div className="relative">
              <div className="hidden md:block absolute -left-6 lg:-left-8 top-0 bottom-0 w-px bg-gray-200"></div>
              <div className="text-[#1a3a5c] mb-6">
                <Handshake size={40} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-[#1a3a5c] mb-4">참여형 사회공헌</h3>
              <p className="text-gray-600 leading-relaxed">
                교육을 통해 배출된 전문가들이 지역사회 곳곳에 파견되어, 학교와 경로당 등 취약계층의 안전을 직접 돌봅니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* [Section 3] Core Programs (핵심 사업: 교육 및 자격증) */}
      <section className="bg-white">
        <div className="grid md:grid-cols-2">
          {/* Panel 1 */}
          <div className="bg-[#2e7d32] text-white p-16 lg:p-24 flex flex-col justify-center min-h-[500px]">
            <div className="max-w-md mx-auto md:ml-auto md:mr-0 xl:mr-16 w-full">
              <div className="inline-block border border-white/30 rounded-full px-4 py-1 text-sm mb-6">
                누구나 수강 가능한
              </div>
              <h2 className="text-4xl font-bold mb-6 leading-tight">생활 안전 아카데미</h2>
              <p className="text-green-100 mb-10 text-lg leading-relaxed">
                시민과 유관기관 단체를 대상으로 진행되는 맞춤형 안전 교육 프로그램입니다. 보이스피싱, 재난대응, 심폐소생술 등 실용적인 지식을 제공합니다.
              </p>
              <ul className="space-y-4 mb-12">
                <li className="flex items-center gap-3"><CheckCircle size={20} className="text-green-300"/> 찾아가는 맞춤형 출강 교육</li>
                <li className="flex items-center gap-3"><CheckCircle size={20} className="text-green-300"/> 연령별 특화 안전 실습</li>
              </ul>
              <Link href="/education" className="inline-flex items-center gap-2 text-white font-bold border-b-2 border-white pb-1 hover:text-green-200 hover:border-green-200 transition-colors text-lg">
                자세히 보기 <ArrowRight size={20} />
              </Link>
            </div>
          </div>

          {/* Panel 2 */}
          <div className="bg-[#1a3a5c] text-white p-16 lg:p-24 flex flex-col justify-center min-h-[500px]">
            <div className="max-w-md mx-auto md:ml-0 md:mr-auto xl:ml-16 w-full">
              <div className="inline-block border border-white/30 rounded-full px-4 py-1 text-sm mb-6">
                전문성을 인정받는
              </div>
              <h2 className="text-4xl font-bold mb-6 leading-tight">도시안전디자인 전문가 과정</h2>
              <p className="text-blue-100 mb-10 text-lg leading-relaxed">
                한국직업능력연구원에 정식 등록된 전문 자격증 과정으로, 수료 후 지역사회의 안전 교육 강사 및 컨설턴트로 활동할 수 있습니다.
              </p>
              <ul className="space-y-4 mb-12">
                <li className="flex items-center gap-3"><CheckCircle size={20} className="text-blue-300"/> 보이스피싱 예방지도사 자격증</li>
                <li className="flex items-center gap-3"><CheckCircle size={20} className="text-blue-300"/> 생활안전지도사 자격증</li>
              </ul>
              <Link href="/certificates" className="inline-flex items-center gap-2 text-white font-bold border-b-2 border-white pb-1 hover:text-blue-200 hover:border-blue-200 transition-colors text-lg">
                자격정보 확인 <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* [Section 4] Notice & Board */}
      <section className="py-24 bg-white">
        <div className="container-main">
          <div className="flex flex-col md:flex-row gap-16 lg:gap-24">
            
            {/* Left: Main Highlights */}
            <div className="md:w-5/12">
              <div className="flex items-center justify-between mb-8 border-b-2 border-[#1a3a5c] pb-4">
                <h2 className="text-2xl font-bold text-[#1a3a5c]">안전 소식 하이라이트</h2>
              </div>
              <div className="group cursor-pointer">
                <div className="aspect-[4/3] bg-gray-100 rounded-lg mb-6 overflow-hidden flex items-center justify-center text-gray-400">
                  <span className="text-sm">보도자료 커버 이미지 (Stitch 삽입 영역)</span>
                </div>
                <div className="text-sm text-[#2e7d32] font-bold mb-2">보도자료</div>
                <h3 className="text-xl font-bold text-[#2c3e50] mb-3 group-hover:text-[#1a3a5c] transition-colors leading-snug">
                  [대전일보] 대전경실련 도시안전디자인센터, 시민안전 교육 확대 시행
                </h3>
                <p className="text-gray-600 line-clamp-2">
                  최근 급증하고 있는 신종 보이스피싱 수법에 대응하기 위해, 
                  지역 내 노인복지관 및 기관 대상 무료 특강 참여자를 모집합니다.
                </p>
              </div>
            </div>

            {/* Right: Board List */}
            <div className="md:w-7/12">
              <div className="flex items-center justify-between mb-8 border-b-2 border-[#1a3a5c] pb-4">
                <h2 className="text-2xl font-bold text-[#1a3a5c]">게시판 최신글</h2>
                <Link href="/notice" className="text-sm font-medium text-gray-500 hover:text-[#1a3a5c] flex items-center gap-1">
                  전체보기 <ChevronRight size={16} />
                </Link>
              </div>
              
              <div className="flex flex-col border-t border-gray-100">
                {[
                  { tag: '공지', title: '2026년도 상반기 보이스피싱 예방지도사 검정 일정 안내', date: '2026.04.12' },
                  { tag: '게시', title: '한국직업능력연구원 등록 자격증 명세 갱신 안내', date: '2026.04.05' },
                  { tag: '소식', title: '시민안전캠페인 - 우리동네 지킴이 우수 활동 사례', date: '2026.03.28' },
                  { tag: '공지', title: '센터 사무실 내부 공사로 인한 상담 전화 연결 지연 안내', date: '2026.03.15' },
                ].map((item, idx) => (
                  <Link href={`/notice/${idx}`} key={idx} className="group py-6 border-b border-gray-100 flex items-start gap-4 hover:bg-gray-50 transition-colors px-2">
                    <span className="shrink-0 font-bold text-[#1a3a5c] text-sm md:text-base w-12 pt-1">{item.tag}</span>
                    <h3 className="flex-1 text-lg font-medium text-gray-800 group-hover:text-[#1a3a5c] transition-colors">{item.title}</h3>
                    <span className="shrink-0 text-sm text-gray-500 pt-1">{item.date}</span>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* [Section 5] Pre-Footer / Contact */}
      <section className="py-24 bg-[#f3f4f6]">
        <div className="container-main text-center">
          <h2 className="text-3xl font-bold text-[#1a3a5c] mb-6">궁금한 점이 있으신가요?</h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            단체 연수 문의 및 자격증 수료 관련 안내를 친절하게 도와드립니다.<br />
            아래 번호로 언제든 연락해 주십시오.
          </p>
          <div className="inline-block bg-white rounded-2xl shadow-sm border border-gray-200 px-12 py-8">
            <div className="flex items-center justify-center gap-4 text-[#2e7d32] mb-4">
              <Phone size={36} />
              <span className="text-4xl lg:text-5xl font-bold tracking-tight">042-254-8060</span>
            </div>
            <p className="text-gray-500 font-medium">
              평일 09:00 - 18:00 (점심 12:00-13:00) / 주말 및 공휴일 휴무
            </p>
          </div>
          <div className="mt-12 flex justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 bg-[#1a3a5c] hover:bg-[#2b4870] text-white font-semibold px-8 py-3 rounded-lg transition-colors">
              온라인 문의하기
            </Link>
            <Link href="/faq" className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-[#1a3a5c] border border-gray-300 font-semibold px-8 py-3 rounded-lg transition-colors">
              자주 묻는 질문
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
