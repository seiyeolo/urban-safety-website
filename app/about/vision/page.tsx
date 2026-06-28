import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, Target, Eye, Lightbulb } from 'lucide-react'

export const metadata: Metadata = {
  title: '설립 취지와 비전',
  description: '대전경실련 도시안전디자인센터의 설립 취지와 비전, 핵심 가치를 소개합니다.',
}

export default function VisionPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container-main">
          <nav className="breadcrumb justify-center">
            <Link href="/" className="text-blue-300 hover:text-white">홈</Link>
            <span className="breadcrumb-sep text-blue-400">›</span>
            <Link href="/about" className="text-blue-300 hover:text-white">센터소개</Link>
            <span className="breadcrumb-sep text-blue-400">›</span>
            <span className="text-white">설립 취지와 비전</span>
          </nav>
          <h1>설립 취지와 비전</h1>
          <p>왜 이 센터가 필요한지, 어디를 향해 나아가는지</p>
        </div>
      </div>

      {/* 설립 취지 */}
      <section className="section-padding bg-white">
        <div className="container-main max-w-3xl mx-auto">
          <span className="section-tag">설립 취지</span>
          <h2 className="section-title mt-3">왜 도시안전디자인센터인가</h2>
          <div className="space-y-5 text-gray-700 leading-relaxed mt-8">
            <p>
              도시안전은 법률이나 공학만으로 해결되기 어렵고, 행정·엔지니어링·디자인·법제도·교육이
              함께 설계되어야 하는 복합 과제입니다. 도시안전디자인센터는 이러한 문제의식에서 출발해
              시민의 눈높이에 맞는 안전정책과 교육, 지역 협력체계를 구축하기 위해 만들어졌습니다.
            </p>
            <p>
              2011년 출범한 도시안전디자인포럼은 방재·방범·유니버설디자인·교육홍보를 아우르는
              4개 분과위원회 체계로 운영되며, 대전시와 지역사회가 실현할 수 있는 도시안전디자인 정책을
              개발·지원하고 시민적 공감대를 넓히는 역할을 수행해 왔습니다.
            </p>
            <p>
              이후 축적된 국제심포지움, 전문가 간담회, 안전교육, MOU 협력 경험은 오늘의
              도시안전디자인센터로 이어졌습니다. 우리는 단순한 정보 제공을 넘어 시민 지도자 양성,
              지역사회 안전문화 확산, 첨단안전산업과 공공정책의 연결을 함께 추구합니다.
            </p>
          </div>
        </div>
      </section>

      {/* 미션과 비전 */}
      <section className="section-padding bg-gray-50">
        <div className="container-main">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-[#1a3a5c] text-white rounded-2xl p-8">
              <Eye size={36} className="mb-4 opacity-80" />
              <p className="text-navy-100 text-sm font-semibold mb-2">MISSION</p>
              <h3 className="text-xl font-bold mb-4">미션</h3>
              <p className="text-white/90 leading-relaxed">
                범죄예방, 생활안전, 도시환경 개선, 시민안전교육을 통해
                지역사회가 스스로 안전 역량을 키울 수 있는 공익 실천 플랫폼으로 활동한다.
              </p>
            </div>
            <div className="bg-[#2e7d32] text-white rounded-2xl p-8">
              <Lightbulb size={36} className="mb-4 opacity-80" />
              <p className="text-green-100 text-sm font-semibold mb-2">VISION</p>
              <h3 className="text-xl font-bold mb-4">비전</h3>
              <p className="text-white/90 leading-relaxed">
                도시안전디자인을 통해 시민의 삶의 질을 높이고,
                지역의 정책·교육·산업 기반을 함께 성장시키는 대표 안전 플랫폼
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 핵심 가치 */}
      <section className="section-padding bg-white">
        <div className="container-main">
          <div className="section-header">
            <span className="section-tag">핵심 가치</span>
            <h2 className="section-title">우리가 추구하는 4가지 가치</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: '공공성', desc: '시민의 생명과 재산 보호를 가장 중요한 가치로 둡니다.' },
              { icon: Target, title: '실천성', desc: '정책 제안에 머무르지 않고 교육, 캠페인, 현장 협력으로 이어갑니다.' },
              { icon: Eye, title: '융합성', desc: '방재·방범·유니버설디자인·교육홍보를 통합적으로 바라봅니다.' },
              { icon: Lightbulb, title: '성장성', desc: '안전을 시민의 삶의 질 향상과 지역 성장 기반으로 확장합니다.' },
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

          <div className="mt-12 bg-blue-50 rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-lg font-bold text-[#0f2d5e] mb-3">브로슈어 기반 핵심 문장</h3>
            <p className="text-gray-700 leading-relaxed">
              도시안전디자인센터는 도시안전디자인을 통해 시민의 안전한 생활기반을 제공하고,
              도시의 안전한 물리적 환경 조성과 지역 성장기반 구축까지 함께 바라보는 장기적 비전을 지향합니다.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
