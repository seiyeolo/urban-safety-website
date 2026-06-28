import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Bus, Train, Car } from 'lucide-react'

export const metadata: Metadata = {
  title: '오시는 길',
  description: '대전경실련 도시안전디자인센터 오시는 길 안내입니다.',
}

export default function LocationPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container-main">
          <nav className="breadcrumb justify-center">
            <Link href="/" className="text-blue-300 hover:text-white">홈</Link>
            <span className="breadcrumb-sep text-blue-400">›</span>
            <Link href="/about" className="text-blue-300 hover:text-white">센터소개</Link>
            <span className="breadcrumb-sep text-blue-400">›</span>
            <span className="text-white">오시는 길</span>
          </nav>
          <h1>오시는 길</h1>
          <p>대전경실련 도시안전디자인센터를 찾아오시는 방법</p>
        </div>
      </div>

      <section className="section-padding bg-white">
        <div className="container-main">
          {/* 주소 */}
          <div className="flex items-center gap-3 mb-8 justify-center">
            <MapPin size={20} className="text-[#0f2d5e]" />
            <p className="text-lg font-semibold text-gray-800">
              대전광역시 서구 용문동 255-4 서우아파트 상가동 201호
            </p>
          </div>

          {/* 지도 */}
          <div className="bg-gray-200 rounded-2xl h-80 flex items-center justify-center mb-10">
            <div className="text-center text-gray-500">
              <MapPin size={40} className="mx-auto mb-3 opacity-40" />
              <p className="text-sm font-medium">지도 영역 (카카오맵/네이버지도 연동)</p>
              <p className="text-xs mt-1">대전광역시 서구 용문동 255-4</p>
            </div>
          </div>

          {/* 교통편 */}
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              {
                icon: Bus,
                title: '버스 이용',
                items: [
                  '용문동 정류장 하차 후 도보 약 5분',
                  '37, 102, 201번 등 이용',
                ],
              },
              {
                icon: Train,
                title: '지하철 이용',
                items: [
                  '도시철도 1호선 충남대병원역',
                  '2번 출구 도보 약 10분',
                ],
              },
              {
                icon: Car,
                title: '자동차 이용 / 주차',
                items: [
                  '내비게이션: 대전 서구 용문동 255-4',
                  '건물 내 방문자 주차 가능',
                ],
              },
            ].map(({ icon: Icon, title, items }) => (
              <div key={title} className="card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                    <Icon size={20} className="text-[#0f2d5e]" />
                  </div>
                  <h3 className="font-bold text-[#0f2d5e]">{title}</h3>
                </div>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="w-1 h-1 bg-gray-400 rounded-full shrink-0 mt-2" />
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
