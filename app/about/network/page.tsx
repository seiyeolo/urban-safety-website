import type { Metadata } from 'next'
import Link from 'next/link'
import { Building2, GraduationCap, Shield, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: '협력 네트워크',
  description: '대전경실련 도시안전디자인센터의 협력 기관 네트워크를 소개합니다.',
}

const NETWORKS = [
  {
    icon: Shield,
    title: '공공기관',
    color: 'bg-blue-50 text-blue-700',
    items: ['대전광역시', '대전지방경찰청', '대전소방본부', '대전광역시의회', '연구개발특구지원본부'],
  },
  {
    icon: Building2,
    title: '복지·교육기관',
    color: 'bg-green-50 text-green-700',
    items: ['대전발전연구원', '대전테크노파크', '대전복지재단', '지역 사회복지관', '주민자치센터'],
  },
  {
    icon: GraduationCap,
    title: '학술·연구기관',
    color: 'bg-purple-50 text-purple-700',
    items: ['한밭대학교', '목원대학교', '중부대학교', '공주대학교', '대전대학교'],
  },
  {
    icon: Users,
    title: '시민사회단체',
    color: 'bg-green-50 text-green-700',
    items: ['경제정의실천시민연합', '한국R&D디자인융합연구조합', '지역 자원봉사센터', '관련 시민단체 및 전문가 네트워크'],
  },
]

export default function NetworkPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container-main">
          <nav className="breadcrumb justify-center">
            <Link href="/" className="text-blue-300 hover:text-white">홈</Link>
            <span className="breadcrumb-sep text-blue-400">›</span>
            <Link href="/about" className="text-blue-300 hover:text-white">센터소개</Link>
            <span className="breadcrumb-sep text-blue-400">›</span>
            <span className="text-white">협력 네트워크</span>
          </nav>
          <h1>협력 네트워크</h1>
          <p>안전한 지역사회를 함께 만들어가는 파트너들</p>
        </div>
      </div>

      <section className="section-padding bg-white">
        <div className="container-main">
          <div className="section-header">
            <p className="section-desc max-w-2xl mx-auto">
              대전경실련 도시안전디자인센터는 도시안전디자인포럼 시기부터 공공기관, 학술·연구기관,
              시민사회단체, 산업계와 협력해 왔으며, 이러한 민관산학 네트워크를 바탕으로 지역사회 안전문화 확산에 나서고 있습니다.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {NETWORKS.map(({ icon: Icon, title, color, items }) => (
              <div key={title} className="card">
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold mb-5 ${color}`}>
                  <Icon size={16} />
                  {title}
                </div>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-gray-700 text-sm">
                      <span className="w-1.5 h-1.5 bg-gray-300 rounded-full shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 grid md:grid-cols-3 gap-4">
            {[
              '대전지방기상청 양해각서 체결',
              '광주·부산디자인센터, 대전발전연구원 MOU 체결',
              '대전소방본부·안전IT융합지원센터 좌담회 및 협력',
            ].map((item) => (
              <div key={item} className="bg-gray-50 rounded-xl border border-gray-200 p-4 text-sm text-gray-700">
                {item}
              </div>
            ))}
          </div>

          <div className="mt-10 bg-blue-50 rounded-2xl p-8 text-center">
            <h3 className="text-lg font-bold text-[#0f2d5e] mb-3">협력 제안 환영합니다</h3>
            <p className="text-gray-600 text-sm mb-5">
              지역사회 안전교육 협력을 희망하시는 기관·단체는 언제든지 연락 주시기 바랍니다.
            </p>
            <Link href="/contact/partner" className="btn-primary">
              협력 제안하기
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
