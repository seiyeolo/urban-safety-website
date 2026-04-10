import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, Target, ChevronRight, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: '핵심 운영분야',
  description: '대전경실련 도시안전디자인센터의 핵심 운영분야인 범죄예방과 생활안전을 소개합니다.',
}

export default function FieldsPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container-main">
          <nav className="breadcrumb justify-center">
            <Link href="/" className="text-blue-300 hover:text-white">홈</Link>
            <span className="breadcrumb-sep text-blue-400">›</span>
            <Link href="/about" className="text-blue-300 hover:text-white">센터소개</Link>
            <span className="breadcrumb-sep text-blue-400">›</span>
            <span className="text-white">핵심 운영분야</span>
          </nav>
          <h1>핵심 운영분야</h1>
          <p>범죄예방과 생활안전, 두 축으로 운영됩니다</p>
        </div>
      </div>

      <section className="section-padding bg-white">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-10">

            {/* 범죄예방 */}
            <div>
              <div className="bg-[#0f2d5e] rounded-2xl p-8 text-white mb-6">
                <Shield size={36} className="mb-4 opacity-90" />
                <h2 className="text-2xl font-bold mb-3">범죄예방</h2>
                <p className="text-blue-200 leading-relaxed">
                  보이스피싱, CPTED, 지역사회 범죄예방 교육을 통해
                  시민이 스스로를 지킬 수 있는 역량을 키웁니다.
                </p>
              </div>
              <div className="space-y-4">
                {[
                  {
                    title: '보이스피싱 예방교육',
                    desc: '전화·문자·메신저 사기, 악성앱, 대면편취 등 최신 수법 대응 교육. 보이스피싱 예방지도사 자격과정과 연계 운영.',
                    href: '/certificates/voice-phishing',
                  },
                  {
                    title: 'CPTED (환경설계를 통한 범죄예방)',
                    desc: '물리적 환경 개선을 통한 범죄기회 차단. 지역사회 안전진단 및 환경개선 제안 활동.',
                    href: null,
                  },
                  {
                    title: '지역사회 범죄예방 캠페인',
                    desc: '지역 축제, 복지관, 학교 등 현장 방문 캠페인과 홍보부스 운영. 시민 인식 제고 활동.',
                    href: null,
                  },
                ].map(({ title, desc, href }) => (
                  <div key={title} className="border border-gray-200 rounded-xl p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
                      </div>
                      {href && (
                        <Link href={href} className="shrink-0 text-[#0f2d5e] hover:text-blue-800">
                          <ArrowRight size={18} />
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 생활안전 */}
            <div>
              <div className="bg-[#e85d04] rounded-2xl p-8 text-white mb-6">
                <Target size={36} className="mb-4 opacity-90" />
                <h2 className="text-2xl font-bold mb-3">생활안전</h2>
                <p className="text-orange-100 leading-relaxed">
                  낙상·화재·교통·재난 등 일상의 안전 위험요인을 파악하고
                  맞춤형 예방교육으로 안전한 일상을 지원합니다.
                </p>
              </div>
              <div className="space-y-4">
                {[
                  {
                    title: '생활안전 예방교육',
                    desc: '가정·교통·재난 안전 등 생활 전반의 위험요인 교육. 생활안전지도사 자격과정과 연계 운영.',
                    href: '/certificates/life-safety',
                  },
                  {
                    title: '취약계층 안전교육',
                    desc: '고령층·어린이·장애인 등 취약계층을 위한 맞춤형 생활안전 교육 및 현장 방문 프로그램.',
                    href: null,
                  },
                  {
                    title: '기관·단체 안전문화 교육',
                    desc: '기업, 공공기관, 지역사회 단체 대상 맞춤형 안전교육 프로그램 설계 및 운영.',
                    href: '/education/group',
                  },
                ].map(({ title, desc, href }) => (
                  <div key={title} className="border border-gray-200 rounded-xl p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
                      </div>
                      {href && (
                        <Link href={href} className="shrink-0 text-[#0f2d5e] hover:text-blue-800">
                          <ArrowRight size={18} />
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6">자격과정 또는 단체교육에 관심 있으신가요?</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/certificates" className="btn-primary">
                자격과정 보기 <ChevronRight size={16} />
              </Link>
              <Link href="/contact/group" className="btn-secondary">
                단체교육 문의
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
