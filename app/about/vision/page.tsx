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
              대한민국은 보이스피싱 피해 규모가 연간 수천억 원에 달하고, 낙상·화재·교통사고 등
              생활안전 사고 또한 매년 수십만 건이 발생하고 있습니다. 그러나 시민들이 이러한 위험을
              인식하고 스스로를 보호할 수 있도록 교육하는 현장 인프라는 여전히 부족한 실정입니다.
            </p>
            <p>
              대전경실련 도시안전디자인센터는 이러한 문제의식에서 출발했습니다. 1989년 창립 이래
              35년간 시민사회와 함께해 온 대전경실련의 공익 기반 위에, 범죄예방과 생활안전을 전문으로
              하는 실천형 교육·자격 플랫폼을 구축하게 되었습니다.
            </p>
            <p>
              우리는 단순한 정보 제공을 넘어, 지역사회 곳곳에서 직접 교육을 수행할 수 있는 시민
              지도자를 양성하고, 기관·단체와 협력하여 안전문화를 확산하는 것을 목표로 합니다.
            </p>
          </div>
        </div>
      </section>

      {/* 미션과 비전 */}
      <section className="section-padding bg-gray-50">
        <div className="container-main">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-[#0f2d5e] text-white rounded-2xl p-8">
              <Eye size={36} className="mb-4 opacity-80" />
              <p className="text-blue-300 text-sm font-semibold mb-2">MISSION</p>
              <h3 className="text-xl font-bold mb-4">미션</h3>
              <p className="text-white/90 leading-relaxed">
                범죄예방과 생활안전 교육을 통해 시민의 일상을 지키고,
                지역사회의 안전 역량을 높이는 공익 실천형 플랫폼으로 활동한다.
              </p>
            </div>
            <div className="bg-[#e85d04] text-white rounded-2xl p-8">
              <Lightbulb size={36} className="mb-4 opacity-80" />
              <p className="text-orange-200 text-sm font-semibold mb-2">VISION</p>
              <h3 className="text-xl font-bold mb-4">비전</h3>
              <p className="text-white/90 leading-relaxed">
                시민이 직접 참여하고 실천하는 안전문화를 선도하는
                대한민국 대표 생활안전 교육 플랫폼
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
              { icon: Shield, title: '공공성', desc: '이윤보다 시민 안전과 공익을 최우선으로 추구합니다.' },
              { icon: Target, title: '실천성', desc: '지식과 이론을 넘어 현장에서 바로 적용 가능한 교육을 지향합니다.' },
              { icon: Eye, title: '전문성', desc: '검증된 전문가와 과학적 근거에 기반한 교육 콘텐츠를 제공합니다.' },
              { icon: Lightbulb, title: '협력성', desc: '기관·단체·시민이 함께 참여하는 열린 안전 생태계를 구축합니다.' },
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
    </>
  )
}
