import type { Metadata } from 'next'
import Link from 'next/link'
import { User, Users, Briefcase } from 'lucide-react'

export const metadata: Metadata = {
  title: '주요 인물·전문 네트워크',
  description: '도시안전디자인포럼 및 도시안전디자인센터 활동 기반이 된 주요 인물과 전문가 네트워크를 소개합니다.',
}

const KEY_PEOPLE = [
  { role: '추진위원장', name: '이현태', dept: '목원대학교', spec: '도시안전디자인포럼 출범 경과보고 및 추진위원장 역할' },
  { role: '사무국장', name: '이형복', dept: '대전발전연구원', spec: '사무국 운영 및 행사·연락 창구 담당' },
  { role: '전문자문', name: '윤명오', dept: '서울시립대학교', spec: '도시안전디자인 국제 트렌드 발표 및 전문 자문' },
]

const EXPERT_NETWORK = [
  { name: '임윤택', title: '교수', affil: '한밭대학교', field: '도시안전디자인 및 정책 자문' },
  { name: '박천보', title: '교수', affil: '한밭대학교', field: '도시·안전 분야 연구 네트워크' },
  { name: '최봉문', title: '교수', affil: '목원대학교', field: '도시계획 및 공간환경 자문' },
  { name: '양우창', title: '교수', affil: '중부대학교', field: '안전정책 및 지역 협력 네트워크' },
  { name: '이선하', title: '교수', affil: '공주대학교', field: '교육 프로그램 및 시민참여 기반 자문' },
  { name: '임창호', title: '교수', affil: '대전대학교', field: '안전교육 및 실천 프로그램 자문' },
]

const FOUNDING_GROUPS = [
  {
    title: '산업계',
    icon: Briefcase,
    items: ['계룡건설', '금성백조', '구보건설', 'KT', 'IDIS', 'ADT캡스', '에스원'],
  },
  {
    title: '학계',
    icon: User,
    items: ['한밭대학교', '목원대학교', '중부대학교', '공주대학교', '대전대학교', '서울시립대학교'],
  },
  {
    title: '정부·공공기관',
    icon: Users,
    items: ['대전광역시', '대전지방경찰청', '대전광역시 소방본부', '대전발전연구원', '대전테크노파크'],
  },
]

export default function MembersPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container-main">
          <nav className="breadcrumb justify-center">
            <Link href="/" className="text-blue-300 hover:text-white">홈</Link>
            <span className="breadcrumb-sep text-blue-400">›</span>
            <Link href="/about" className="text-blue-300 hover:text-white">센터소개</Link>
            <span className="breadcrumb-sep text-blue-400">›</span>
            <span className="text-white">주요 인물·전문 네트워크</span>
          </nav>
          <h1>주요 인물·전문 네트워크</h1>
          <p>공개 자료를 기준으로 확인 가능한 활동 기반 인물과 전문가 네트워크</p>
        </div>
      </div>

      {/* 주요 인물 */}
      <section className="section-padding bg-white">
        <div className="container-main">
          <div className="section-header">
            <span className="section-tag">주요 인물</span>
            <h2 className="section-title">출범 및 운영 기반 주요 인물</h2>
            <p className="section-desc">
              현재 페이지는 브로슈어와 출범행사 자료에서 확인 가능한 공개 인물 기준으로 정리했습니다.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {KEY_PEOPLE.map(({ role, name, dept, spec }) => (
              <div key={role} className="card text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User size={28} className="text-[#0f2d5e]" />
                </div>
                <span className="text-xs font-semibold text-[#0f2d5e] bg-blue-50 px-2 py-1 rounded-full">{role}</span>
                <h3 className="text-lg font-bold text-gray-900 mt-3">{name}</h3>
                <p className="text-sm text-gray-500 mt-1">{dept}</p>
                <p className="text-xs text-gray-400 mt-2">{spec}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 전문 네트워크 */}
      <section className="section-padding bg-gray-50">
        <div className="container-main">
          <div className="section-header">
            <span className="section-tag">전문 네트워크</span>
            <h2 className="section-title">학술·전문가 네트워크</h2>
            <p className="section-desc">포럼 및 센터 활동 기반이 된 학술·전문 분야 네트워크입니다.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {EXPERT_NETWORK.map(({ name, title, affil, field }) => (
              <div key={`${name}-${affil}`} className="bg-white rounded-xl p-5 border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                    <User size={18} className="text-gray-400" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{name} <span className="font-normal text-gray-500 text-sm">{title}</span></p>
                    <p className="text-xs text-gray-400">{affil}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-2">{field}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-400 mt-8">
            ※ 정식 운영진 및 전문위원 최신 명단은 정관·공식 문서 OCR 완료 후 별도 보강 예정입니다.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-main">
          <div className="section-header">
            <span className="section-tag">발기 기반</span>
            <h2 className="section-title">참여 주체 구성</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {FOUNDING_GROUPS.map(({ title, icon: Icon, items }) => (
              <div key={title} className="card">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Icon size={18} className="text-[#0f2d5e]" />
                  </div>
                  <h3 className="font-bold text-[#0f2d5e]">{title}</h3>
                </div>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item} className="text-sm text-gray-700 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-gray-300 rounded-full shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
