import Link from 'next/link'
import {
  ShieldCheck,
  CheckCircle2,
  Building2,
  BadgeCheck,
  ArrowRight,
  ExternalLink,
  Phone,
} from 'lucide-react'

/*
 * Home — Stitch "The Civic Anchor" 디자인 이식 (2026-04-16)
 * 원본: Stitch project 6493943939238031404 screen 00852b28e2454f0b9da4ff3d19d8da4d
 * 구조: Hero → Value Cards → Flagship Programs → News Archive → Consultation → Partners
 * 이식 시 변경: 모든 카피 한글화, 35년·042-254-8060 실데이터, lucide-react 아이콘
 */

const VALUE_CARDS = [
  {
    title: '시민 주도의 실천',
    desc: '안전은 관의 주도로만 완성되지 않습니다. 시민 스스로 일상의 위험 요인을 진단하고 예방하는 참여형 안전문화를 확산시킵니다.',
  },
  {
    title: '검증된 전문가 양성',
    desc: '보이스피싱 예방부터 생활안전까지, 체계적 커리큘럼과 실무 평가를 거쳐 지역사회에서 활동할 전문가를 배출합니다.',
  },
  {
    title: '참여형 사회공헌',
    desc: '배출된 전문가들이 학교·경로당·복지관 등 취약계층을 직접 찾아가 안전 교육과 캠페인을 수행합니다.',
  },
]

const LIFE_SAFETY_FEATURES = [
  '찾아가는 맞춤형 현장 교육',
  '연령별 눈높이 학습 프로그램',
  '지역사회 안전문화 실천',
]

const EXPERT_COURSE_FEATURES = [
  'CPTED 환경설계 이론·실무',
  '민간자격증 검정 응시 지원',
  '현장 감리·실습 프로그램',
]

const NOTICE_LIST = [
  {
    day: '14',
    month: '4월',
    title: '2026년 2분기 보이스피싱 예방지도사 7기 수강생 모집',
    tag: '자격과정 모집',
    accent: 'border-green-700',
  },
  {
    day: '10',
    month: '4월',
    title: '생활안전지도사 6기 합격자 발표',
    tag: '합격 발표',
    accent: 'border-navy-900',
  },
  {
    day: '05',
    month: '4월',
    title: '2026년 2분기 교육 일정 공지',
    tag: '교육 일정',
    accent: 'border-navy-900',
  },
]

const PARTNERS = [
  '대전광역시',
  '대전경찰청',
  '대한건축사협회',
  '경제정의실천시민연합',
  '한국안전연구원',
]

export default function HomePage() {
  return (
    <>
      {/* ───────── Hero ───────── */}
      <section className="relative min-h-[680px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* 네이비 그라데이션 (좌상 다크 → 우하 밝은 네이비) */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0d1829] via-[#1a3a5c] to-[#2b4870]" />
          {/* 미세한 radial accent (우측 상단 희미한 밝음) */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.08),_transparent_60%)]" />
          {/* SVG noise texture 로 질감 부여 */}
          <div
            className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 w-full py-24 md:py-32">
          <div className="max-w-2xl text-white">
            <span className="inline-block py-1.5 px-4 bg-green-700 text-sm font-bold tracking-widest uppercase rounded mb-6">
              35년의 공신력 · 경실련 산하
            </span>
            <h1 className="text-4xl md:text-[52px] lg:text-[56px] leading-[1.15] font-bold mb-8 tracking-tight">
              가족을 믿고 맡길 수 있는
              <br />
              우리 동네 안전 전문가
            </h1>
            <p className="text-lg md:text-xl leading-relaxed mb-10 text-white/85 max-w-xl">
              시민이 주도하는 도시안전디자인, 35년 경실련의 공신력으로
              안전 교육의 새로운 기준을 세웁니다.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/certificates"
                className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-7 md:px-8 py-4 rounded-md font-bold text-base md:text-lg min-h-[56px] transition-all shadow-lg shadow-green-900/30"
              >
                자격과정 알아보기 <ArrowRight size={20} />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 text-white px-7 md:px-8 py-4 rounded-md font-bold text-base md:text-lg min-h-[56px] transition-all"
              >
                센터 소개
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Value Cards ───────── */}
      <section className="py-20 md:py-24 bg-[#f5f3f3]">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="max-w-2xl mb-14 md:mb-16">
            <div className="w-16 h-1 bg-green-700 mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 leading-tight mb-4">
              &ldquo;누구도 소외되지 않는 안전한 도시를 그립니다.&rdquo;
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              35년간 쌓아온 시민운동의 공신력을 기반으로, 일상의 위험 요인부터
              지역사회 공동체의 안전 역량까지 함께 키워갑니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VALUE_CARDS.map(({ title, desc }) => (
              <div
                key={title}
                className="group bg-white border-2 border-gray-200 p-8 md:p-10 rounded-xl transition-all duration-300 hover:border-navy-900 hover:-translate-y-1 hover:shadow-xl"
              >
                <h3 className="text-2xl md:text-[28px] font-extrabold text-navy-900 leading-tight mb-4">
                  {title}
                </h3>
                <div className="w-12 h-1 bg-green-700 mb-6 transition-all duration-300 group-hover:w-20" />
                <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Flagship Programs ───────── */}
      <section className="py-20 md:py-24 bg-[#fafaf8]">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-stretch">
            {/* Life Safety Academy — Green */}
            <div className="flex-1 bg-green-700 rounded-2xl p-10 md:p-12 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <ShieldCheck size={120} strokeWidth={1} />
              </div>
              <div className="relative">
                <p className="text-xs font-bold uppercase tracking-widest mb-4 text-green-100">
                  생활안전 과정 · 누구나 수강 가능
                </p>
                <h2 className="text-3xl md:text-4xl font-bold mb-8 leading-tight">
                  생활 안전 아카데미
                </h2>
                <ul className="space-y-5 mb-10">
                  {LIFE_SAFETY_FEATURES.map((feature) => (
                    <li key={feature} className="flex items-start gap-4">
                      <CheckCircle2
                        size={22}
                        className="text-green-100 mt-0.5 shrink-0"
                      />
                      <span className="text-base md:text-lg text-white/90">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/certificates/life-safety"
                  className="inline-flex items-center gap-2 bg-white text-green-800 px-7 py-3 rounded-md font-bold text-base md:text-lg min-h-[48px] hover:bg-green-50 transition-colors"
                >
                  자세히 보기 <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            {/* Urban Safety Design Expert — Navy */}
            <div className="flex-1 bg-navy-900 rounded-2xl p-10 md:p-12 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Building2 size={120} strokeWidth={1} />
              </div>
              <div className="relative">
                <p className="text-xs font-bold uppercase tracking-widest mb-4 text-navy-100">
                  전문가 과정 · CPTED 기반
                </p>
                <h2 className="text-3xl md:text-4xl font-bold mb-8 leading-tight">
                  보이스피싱 예방지도사
                </h2>
                <ul className="space-y-5 mb-10">
                  {EXPERT_COURSE_FEATURES.map((feature) => (
                    <li key={feature} className="flex items-start gap-4">
                      <BadgeCheck
                        size={22}
                        className="text-navy-100 mt-0.5 shrink-0"
                      />
                      <span className="text-base md:text-lg text-white/90">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/certificates/voice-phishing"
                  className="inline-flex items-center gap-2 bg-white text-navy-900 px-7 py-3 rounded-md font-bold text-base md:text-lg min-h-[48px] hover:bg-navy-50 transition-colors"
                >
                  자격정보 확인 <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── News & Notice Archive ───────── */}
      <section className="py-20 md:py-24 bg-[#f5f3f3]">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-3">
                안전 소식 & 공지사항
              </h2>
              <div className="w-20 h-1 bg-green-700" />
            </div>
            <Link
              href="/notice"
              className="hidden md:flex text-navy-900 font-bold items-center gap-2 hover:text-green-700 transition-colors"
            >
              전체 보기 <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
            {/* Primary News */}
            <Link
              href="/notice/press"
              className="bg-white p-8 md:p-10 rounded-xl flex flex-col justify-between group"
              style={{ boxShadow: '0 20px 40px rgba(27, 28, 28, 0.06)' }}
            >
              <div>
                <span className="text-green-700 font-bold text-sm uppercase tracking-wider mb-4 block">
                  기관 소식
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-navy-900 mb-6 leading-snug group-hover:text-green-700 transition-colors">
                  대전경실련 도시안전디자인센터,<br />
                  시민 안전교육 누적 2,400명 돌파
                </h3>
                <p className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed">
                  35년 공신력을 바탕으로 보이스피싱 예방과 생활안전 교육을
                  전국으로 확대하고 있습니다. 2026년 2분기 7기 수강생 모집이
                  시작되었습니다.
                </p>
              </div>
              <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                <span className="text-gray-500 text-sm">2026.04.14</span>
                <ExternalLink size={18} className="text-navy-900" />
              </div>
            </Link>

            {/* Secondary List */}
            <div className="space-y-5">
              {NOTICE_LIST.map(({ day, month, title, tag, accent }) => (
                <Link
                  key={title}
                  href="/notice"
                  className="bg-white p-7 rounded-xl flex items-start gap-6 hover:shadow-lg transition-all duration-300 group relative overflow-hidden"
                  style={{
                    boxShadow: '0 4px 20px rgba(26, 58, 92, 0.08)',
                  }}
                >
                  {/* 날짜 원형 배지 */}
                  <div className="relative">
                    <div className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center text-white font-bold ${
                      accent === 'border-green-700' ? 'bg-gradient-to-br from-green-600 to-green-700' :
                      'bg-gradient-to-br from-navy-800 to-navy-900'
                    } group-hover:scale-105 transition-transform duration-300`}>
                      <span className="text-lg leading-none">{day}</span>
                      <span className="text-[10px] leading-none opacity-90">{month}</span>
                    </div>
                    {/* 미묘한 그림자 효과 */}
                    <div className={`absolute inset-0 w-16 h-16 rounded-2xl ${
                      accent === 'border-green-700' ? 'bg-green-700' : 'bg-navy-900'
                    } opacity-20 blur-sm scale-110 -z-10`} />
                  </div>

                  <div className="flex-1 pt-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h4 className="font-bold text-navy-900 text-base md:text-lg leading-snug group-hover:text-green-700 transition-colors">
                        {title}
                      </h4>
                    </div>
                    <span className={`inline-block text-xs font-medium px-3 py-1 rounded-full ${
                      accent === 'border-green-700'
                        ? 'bg-green-50 text-green-700'
                        : 'bg-navy-50 text-navy-700'
                    }`}>
                      {tag}
                    </span>
                  </div>

                  {/* 우측 하단 미묘한 포인트 */}
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight size={16} className="text-gray-400" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-10 md:hidden">
            <Link
              href="/notice"
              className="text-navy-900 font-bold inline-flex items-center gap-2"
            >
              전체 보기 <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ───────── Consultation CTA ───────── */}
      <section className="py-20 md:py-24 bg-[#fafaf8]">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="bg-navy-900 rounded-2xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=60')] bg-cover bg-center" />

            <div className="relative z-10 text-white text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                궁금한 점이 있으신가요?
              </h2>
              <p className="text-white/80 text-base md:text-lg max-w-md">
                단체 연수 문의 및 자격증 수료 관련 안내를 친절하게
                도와드립니다.
              </p>
            </div>

            <div className="relative z-10 text-center md:text-right">
              <span className="text-green-300 text-xs font-bold tracking-widest uppercase block mb-3">
                전화 상담
              </span>
              <a
                href="tel:042-254-8060"
                className="inline-flex items-center gap-3 text-3xl md:text-[40px] font-bold text-white mb-6 tracking-tight hover:text-green-300 transition-colors"
              >
                <Phone size={28} />
                042-254-8060
              </a>
              <div className="flex flex-wrap gap-4 justify-center md:justify-end">
                <Link
                  href="/contact"
                  className="bg-green-700 hover:bg-green-800 text-white px-6 md:px-8 py-3 md:py-4 rounded-md font-bold transition-all min-h-[48px] inline-flex items-center"
                >
                  온라인 문의하기
                </Link>
                <Link
                  href="/about/location"
                  className="bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 text-white px-6 md:px-8 py-3 md:py-4 rounded-md font-bold transition-all min-h-[48px] inline-flex items-center"
                >
                  오시는 길
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Partners Strip ───────── */}
      <section className="py-14 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-8 text-center">
          <h3 className="text-gray-500 text-xs md:text-sm font-bold uppercase tracking-widest mb-10">
            함께하는 파트너 기관
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16 text-gray-400">
            {PARTNERS.map((partner) => (
              <span
                key={partner}
                className="text-base md:text-lg font-bold tracking-tight hover:text-navy-900 transition-colors"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
