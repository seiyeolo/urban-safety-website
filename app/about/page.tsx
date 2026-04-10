import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, Target, Eye, Users, Building, ChevronRight } from 'lucide-react'

export const metadata: Metadata = {
  title: '센터소개',
  description: '대전경실련 도시안전디자인센터의 설립 취지, 비전, 핵심 운영분야를 소개합니다.',
}

const SUB_MENUS = [
  { label: '인사말', href: '/about/greeting' },
  { label: '설립 취지와 비전', href: '/about/vision' },
  { label: '핵심 운영분야', href: '/about/fields' },
  { label: '연혁', href: '/about/history' },
  { label: '운영진/전문위원', href: '/about/members' },
  { label: '협력 네트워크', href: '/about/network' },
  { label: '오시는 길', href: '/about/location' },
]

export default function AboutPage() {
  return (
    <>
      {/* 페이지 히어로 */}
      <div className="page-hero">
        <div className="container-main">
          <nav className="breadcrumb justify-center">
            <Link href="/" className="breadcrumb-link">홈</Link>
            <span className="breadcrumb-sep">›</span>
            <span className="breadcrumb-current">센터소개</span>
          </nav>
          <h1>센터소개</h1>
          <p>대전경실련 도시안전디자인센터를 소개합니다</p>
        </div>
      </div>

      {/* 서브 메뉴 */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-30">
        <div className="container-main">
          <nav className="flex overflow-x-auto gap-1 py-1 scrollbar-hide">
            {SUB_MENUS.map((m) => (
              <Link
                key={m.href}
                href={m.href}
                className="shrink-0 px-4 py-3 text-sm text-gray-600 hover:text-[#0f2d5e] font-medium border-b-2 border-transparent hover:border-[#0f2d5e] transition-colors"
              >
                {m.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* 한 줄 소개 */}
      <section className="section-padding bg-white">
        <div className="container-main">
          <div className="max-w-3xl mx-auto text-center">
            <span className="section-tag">센터 소개</span>
            <h2 className="section-title mt-3">
              범죄예방과 생활안전 교육을 통해<br />
              시민의 일상을 지키는 실천형 안전 플랫폼
            </h2>
            <p className="section-desc">
              대전경실련 도시안전디자인센터는 범죄예방과 생활안전을 중심으로 시민교육,
              민간자격 운영, 지역사회 캠페인, 정책 제안과 현장 실천을 추진하는 공익 기반 플랫폼입니다.
              보이스피싱 예방, CPTED, 생활안전 교육을 통해 지역사회의 안전 역량을 높이고,
              시민이 직접 참여하는 안전문화 확산을 목표로 합니다.
            </p>
          </div>
        </div>
      </section>

      {/* 운영 2대 축 */}
      <section className="section-padding bg-gray-50">
        <div className="container-main">
          <div className="section-header">
            <span className="section-tag">운영 방향</span>
            <h2 className="section-title">운영 2대 축</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                color: 'bg-[#0f2d5e]',
                icon: Shield,
                title: '범죄예방',
                items: ['보이스피싱 예방', 'CPTED (환경설계를 통한 범죄예방)', '지역사회 범죄예방 교육·홍보·실천'],
              },
              {
                color: 'bg-[#e85d04]',
                icon: Target,
                title: '생활안전',
                items: ['일상생활 안전교육', '지역사회 안전문화 확산', '시민 실천형 안전지도자 양성'],
              },
            ].map(({ color, icon: Icon, title, items }) => (
              <div key={title} className={`${color} text-white rounded-2xl p-8`}>
                <Icon size={36} className="mb-4 opacity-90" />
                <h3 className="text-xl font-bold mb-4">{title}</h3>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-white/90 text-sm">
                      <span className="w-1.5 h-1.5 bg-white/60 rounded-full shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 핵심 역할 */}
      <section className="section-padding bg-white">
        <div className="container-main">
          <div className="section-header">
            <span className="section-tag">핵심 역할</span>
            <h2 className="section-title">4가지 핵심 역할</h2>
            <p className="section-desc max-w-xl mx-auto">
              1989년 창립 이래 35년간 시민과 함께 지역사회를 지켜온 대전경실련의 4가지 핵심 역할입니다.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Eye, title: '감시 기능', desc: '국가권력·시장 권력의 감시와 비판, 시민권리 옹호' },
              { icon: Shield, title: '복지·대변', desc: '공공서비스 제공 및 삶의 질 향상, 사회적 약자 권리 옹호' },
              { icon: Users, title: '조정 기능', desc: '시민사회 내, 그리고 국가·경제 권력 간의 갈등 해결' },
              { icon: Building, title: '교육 기능', desc: '민주시민 교육을 통한 성숙한 시민사회 기여' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card text-center">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon size={24} className="text-[#0f2d5e]" />
                </div>
                <h3 className="font-bold text-[#0f2d5e] mb-2">{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 서브 페이지 바로가기 */}
      <section className="section-padding bg-gray-50">
        <div className="container-main">
          <div className="section-header">
            <h2 className="section-title">센터소개 둘러보기</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SUB_MENUS.map((m) => (
              <Link
                key={m.href}
                href={m.href}
                className="flex items-center justify-between p-5 bg-white rounded-xl border border-gray-200 hover:border-[#0f2d5e] hover:shadow-md transition-all group"
              >
                <span className="font-medium text-gray-700 group-hover:text-[#0f2d5e]">{m.label}</span>
                <ChevronRight size={18} className="text-gray-400 group-hover:text-[#0f2d5e] transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
