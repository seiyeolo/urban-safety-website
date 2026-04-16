import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Copy, Bus, Train, Car, Clock, Phone, CheckCircle, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: '오시는 길 - 대전경실련 도시안전디자인센터',
  description: '대전경실련 도시안전디자인센터 위치 안내. 시민의 발걸음이 안전한 도시의 시작입니다.',
}

const TRANSIT_INFO = [
  {
    icon: Bus,
    title: '버스 이용',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-800',
    stopName: '용문역 정류장 (도보 5분)',
    distance: '280m',
    routes: ['37번', '102번', '201번'],
    link: { text: '카카오버스로 실시간 도착정보', href: '#' },
  },
  {
    icon: Train,
    title: '지하철 이용',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-800',
    stopName: '용문역 1번 출구',
    distance: '도보 10분 (650m)',
    description: '용문역 1번 출구에서 나오셔서 도보로 약 10분 정도 소요됩니다.',
  },
  {
    icon: Car,
    title: '자동차 / 주차',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-800',
    parkingInfo: '건물 내 방문자 주차 가능 (시간당 무료)',
    description: '서우아파트 상가동 지하주차장을 이용하실 수 있습니다.',
  },
]

const LANDMARKS = [
  '중남대병원', '용문역', '서우아파트', '대전시청 방면'
]

const VISIT_TIPS = [
  { icon: Clock, text: '운영시간 평일 09:00-18:00 (점심 12:00-13:00)' },
  { icon: Phone, text: '방문 예약 권장 (전화 또는 온라인 폼)' },
  { icon: CheckCircle, text: '접근성: 엘리베이터 O, 휠체어 진입 가능' },
  { icon: MapPin, text: '가까운 공공 화장실: 용문역 역사 내' },
]

export default function LocationPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1a3a5c] to-[#002444] overflow-hidden py-16">
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <nav className="flex mb-6 gap-2 text-blue-300 text-sm font-medium">
            <Link href="/contact" className="hover:text-white">참여·문의</Link>
            <span className="material-symbols-outlined text-xs self-center">›</span>
            <span className="text-white">오시는 길</span>
          </nav>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">오시는 길</h1>
          <p className="text-xl text-blue-300 max-w-2xl">시민의 발걸음이 안전한 도시의 시작입니다.</p>
        </div>

        {/* Decorative Element */}
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
          <MapPin size={200} className="text-white" />
        </div>
      </section>

      {/* Address Action Bar */}
      <section className="px-4 sm:px-8 -mt-12 relative z-20">
        <div className="max-w-7xl mx-auto bg-white shadow-[0_20px_40px_rgba(27,28,28,0.06)] rounded-xl p-6 sm:p-10 flex flex-col lg:flex-row items-center gap-6 sm:gap-10">
          <div className="flex items-start gap-4 sm:gap-6 flex-1">
            <div className="bg-[#a0f399] p-3 sm:p-4 rounded-full shrink-0">
              <MapPin size={24} className="text-[#217128] sm:w-8 sm:h-8" />
            </div>
            <div>
              <h2 className="text-gray-600 text-sm font-bold uppercase tracking-wider mb-2">센터 위치 주소</h2>
              <p className="text-base sm:text-xl lg:text-[24px] font-bold text-[#002444] leading-snug">
                대전광역시 서구 용문동 255-4<br className="sm:hidden" />
                서우아파트 상가동 201호
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full lg:w-auto">
            <button className="h-12 px-6 flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-lg transition-all active:scale-95">
              <Copy size={16} />
              주소 복사
            </button>
            <button className="h-12 px-6 flex items-center justify-center gap-2 bg-[#FEE500] hover:brightness-95 text-[#3C1E1E] font-bold rounded-lg transition-all active:scale-95">
              카카오맵
            </button>
            <button className="h-12 px-6 flex items-center justify-center gap-2 bg-[#03C75A] hover:brightness-95 text-white font-bold rounded-lg transition-all active:scale-95">
              네이버지도
            </button>
            <button className="h-12 px-6 flex items-center justify-center gap-2 bg-[#1a3a5c] hover:brightness-110 text-white font-bold rounded-lg transition-all active:scale-95">
              T맵
            </button>
          </div>
        </div>
      </section>

      {/* Map Embed Section */}
      <section className="px-4 sm:px-8 py-16">
        <div className="max-w-7xl mx-auto bg-[#f5f3f3] rounded-xl overflow-hidden relative border border-gray-200 h-[280px] sm:h-[400px] lg:h-[500px]">
          {/* Map Placeholder */}
          <div className="w-full h-full bg-slate-200 flex items-center justify-center relative">
            <div className="text-center text-gray-500">
              <MapPin size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">카카오맵 연동 예정</p>
              <p className="text-sm">대전광역시 서구 용문동 255-4</p>
            </div>

            {/* Marker UI Overlay */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full flex flex-col items-center">
              <div className="bg-white px-6 py-3 rounded-xl shadow-xl border border-[#2e7d32]/20 mb-2 whitespace-nowrap">
                <span className="text-[#2e7d32] font-bold text-lg">도시안전디자인센터</span>
                <span className="block text-sm text-gray-600">서우아파트 상가동 201호</span>
              </div>
              <div className="w-10 h-10 bg-[#2e7d32] rounded-full border-4 border-white flex items-center justify-center shadow-lg animate-pulse">
                <MapPin size={20} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transit Cards */}
      <section className="px-4 sm:px-8 py-12 bg-[#f5f3f3]">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-xl sm:text-2xl lg:text-[32px] font-bold text-[#002444] mb-12 flex items-center gap-3">
            <span className="w-8 h-1 bg-[#2e7d32] block"></span>
            대중교통 이용 안내
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TRANSIT_INFO.map(({ icon: Icon, title, iconBg, iconColor, stopName, distance, routes, link, parkingInfo, description }) => (
              <div key={title} className="bg-white p-5 sm:p-8 lg:p-10 rounded-xl shadow-sm border border-gray-100 flex flex-col">
                <div className="flex items-center gap-4 mb-8">
                  <div className={`w-14 h-14 ${iconBg} rounded-xl flex items-center justify-center`}>
                    <Icon size={28} className={iconColor} />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900">{title}</h4>
                </div>

                <div className="space-y-6 flex-1 text-[18px] leading-[1.7]">
                  {stopName && (
                    <div>
                      <p className="text-gray-600 text-sm font-bold mb-1">가까운 정류장</p>
                      <p className="text-lg font-medium text-gray-900">{stopName}</p>
                      {distance && <p className="text-sm text-gray-600">{distance}</p>}
                    </div>
                  )}

                  {routes && (
                    <div>
                      <p className="text-gray-600 text-sm font-bold mb-2">노선 안내</p>
                      <div className="flex flex-wrap gap-2">
                        {routes.map((route) => (
                          <span key={route} className="px-3 py-1 bg-blue-50 text-blue-800 border border-blue-200 rounded text-sm font-bold">
                            {route}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {parkingInfo && (
                    <div>
                      <p className="text-gray-600 text-sm font-bold mb-1">주차 안내</p>
                      <p className="text-lg font-medium text-gray-900">{parkingInfo}</p>
                    </div>
                  )}

                  {description && (
                    <p className="text-gray-700">{description}</p>
                  )}
                </div>

                {link && (
                  <a href={link.href} className="mt-8 text-[#2e7d32] font-bold flex items-center gap-2 hover:underline">
                    {link.text} <ArrowRight size={16} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Landmarks */}
      <section className="px-4 sm:px-8 py-12">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-[24px] font-bold text-[#002444] mb-6">주변 랜드마크</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {LANDMARKS.map((landmark) => (
              <span key={landmark} className="bg-[#f5f3f3] text-gray-700 px-4 py-2 rounded-full text-sm font-medium">
                {landmark}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Visit Tips */}
      <section className="px-4 sm:px-8 py-12 bg-[#f5f3f3]">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#ffdbcb] border border-[#ff6f00]/20 rounded-xl p-8">
            <h3 className="text-[24px] font-bold text-[#793100] mb-6 flex items-center gap-3">
              <CheckCircle size={24} />
              방문 전 확인사항
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {VISIT_TIPS.map(({ icon: Icon, text }, index) => (
                <div key={index} className="flex items-center gap-3 text-[#793100]">
                  <Icon size={20} className="flex-shrink-0" />
                  <span className="text-[18px] leading-[1.7]">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Book a Visit CTA */}
      <section className="px-4 sm:px-8 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl sm:text-2xl lg:text-[32px] font-bold text-[#002444] mb-6">방문 상담을 원하시나요?</h2>
          <p className="text-gray-600 mb-8 text-lg">편안한 상담을 위해 미리 예약해주시면 더욱 좋습니다.</p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="bg-[#2e7d32] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#217128] transition-colors flex items-center gap-2">
              <ArrowRight size={20} />
              방문 상담 예약하기
            </Link>
            <a href="tel:042-254-8060" className="bg-[#002444] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#1a3a5c] transition-colors flex items-center gap-2">
              <Phone size={20} />
              바로 전화 (042-254-8060)
            </a>
          </div>

          <div className="mt-6 text-sm text-gray-600">
            <p>평일 09:00-18:00 운영 | 점심시간 12:00-13:00</p>
          </div>
        </div>
      </section>
    </>
  )
}
