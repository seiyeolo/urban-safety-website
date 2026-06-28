import type { Metadata } from 'next'
import Link from 'next/link'
import { Quote } from 'lucide-react'

export const metadata: Metadata = {
  title: '인사말',
  description: '대전경실련 도시안전디자인센터 센터장 인사말입니다.',
}

export default function GreetingPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container-main">
          <nav className="breadcrumb justify-center">
            <Link href="/" className="text-blue-300 hover:text-white">홈</Link>
            <span className="breadcrumb-sep text-blue-400">›</span>
            <Link href="/about" className="text-blue-300 hover:text-white">센터소개</Link>
            <span className="breadcrumb-sep text-blue-400">›</span>
            <span className="text-white">인사말</span>
          </nav>
          <h1>인사말</h1>
          <p>센터장 인사말</p>
        </div>
      </div>

      <section className="section-padding bg-white">
        <div className="container-main max-w-3xl mx-auto">
          <div className="flex justify-center mb-10">
            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-400 text-sm">센터장 사진</span>
            </div>
          </div>

          <div className="relative mb-10">
            <Quote size={48} className="text-blue-100 absolute -top-4 -left-4" />
            <h2 className="text-2xl font-bold text-[#0f2d5e] text-center mb-8">
              시민의 안전한 일상을 위해<br />함께하겠습니다
            </h2>
          </div>

          <div className="prose prose-gray max-w-none space-y-5 text-gray-700 leading-relaxed text-[15px]">
            <p>
              대전경실련 도시안전디자인센터 홈페이지를 방문해 주신 여러분을 진심으로 환영합니다.
            </p>
            <p>
              우리 센터는 1989년 창립된 대전경실련의 공익 활동을 기반으로, 범죄예방과 생활안전을
              중심으로 한 시민교육 전문 플랫폼으로 설립되었습니다. 보이스피싱, CPTED(환경설계를 통한
              범죄예방), 생활안전 등 지역사회의 다양한 안전 위협에 대응하기 위해 실천형 교육과
              민간자격 운영, 지역사회 캠페인, 정책 제안을 추진하고 있습니다.
            </p>
            <p>
              최근 보이스피싱 범죄는 날로 고도화되고 있으며, 일상 속 안전사고 역시 취약계층을 중심으로
              꾸준히 발생하고 있습니다. 이러한 문제에 효과적으로 대응하기 위해서는 제도와 정책만으로는
              부족합니다. 시민 스스로가 안전 위험을 인식하고 주변을 교육할 수 있는 역량을 갖추는 것이
              무엇보다 중요합니다.
            </p>
            <p>
              우리 센터는 보이스피싱 예방지도사, 생활안전지도사 민간자격과정을 통해 지역사회 곳곳에서
              활동할 수 있는 실천형 안전지도자를 양성하고 있습니다. 또한 기관·단체 맞춤형 교육과
              공익 캠페인을 통해 시민 모두가 안전한 일상을 누릴 수 있는 사회를 만들기 위해 노력하고
              있습니다.
            </p>
            <p>
              앞으로도 대전경실련 도시안전디자인센터는 시민과 함께 걷는 신뢰받는 안전 파트너로서
              그 역할을 다하겠습니다. 많은 관심과 참여를 부탁드립니다.
            </p>
          </div>

          <div className="mt-12 text-right text-gray-600">
            <p className="text-sm text-gray-400 mb-1">대전경실련 도시안전디자인센터</p>
            <p className="text-lg font-bold text-[#0f2d5e]">센터장 일동</p>
          </div>
        </div>
      </section>
    </>
  )
}
