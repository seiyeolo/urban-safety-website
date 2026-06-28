import Link from 'next/link'
import { Phone, Mail, MapPin, Shield } from 'lucide-react'

const FOOTER_LINKS = {
  센터소개: [
    { label: '인사말', href: '/about/greeting' },
    { label: '설립 취지와 비전', href: '/about/vision' },
    { label: '연혁', href: '/about/history' },
    { label: '운영진/전문위원', href: '/about/members' },
    { label: '오시는 길', href: '/about/location' },
  ],
  민간자격증: [
    { label: '보이스피싱 예방지도사', href: '/certificates/voice-phishing' },
    { label: '생활안전지도사', href: '/certificates/life-safety' },
    { label: '자격취득 절차', href: '/certificates#process' },
    { label: '자격증 신청', href: '/certificates/voice-phishing#apply' },
  ],
  교육안내: [
    { label: '전체 교육과정', href: '/education' },
    { label: '온라인 교육', href: '/education/online' },
    { label: '오프라인 교육', href: '/education/offline' },
    { label: '기관·단체 교육', href: '/education/group' },
  ],
  참여문의: [
    { label: '공지사항', href: '/notice' },
    { label: '교육 일정', href: '/notice/schedule' },
    { label: '일반문의', href: '/contact' },
    { label: '단체교육 문의', href: '/contact/group' },
  ],
}

const LEGAL_LINKS = [
  { label: '이용약관', href: '/terms' },
  { label: '개인정보처리방침', href: '/privacy' },
  { label: '환불규정', href: '/refund' },
  { label: '민간자격 표시사항', href: '/certificates/disclosure' },
  { label: '이메일무단수집거부', href: '/no-spam' },
]

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white">
      {/* 메인 푸터 */}
      <div className="container-main py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* 기관 정보 */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-navy-800 rounded-lg flex items-center justify-center">
                <Shield size={20} className="text-white" />
              </div>
              <div className="leading-tight">
                <div className="text-xs text-gray-400">대전경실련</div>
                <div className="text-base font-bold text-white">도시안전디자인센터</div>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              범죄예방과 생활안전 교육을 통해<br />
              시민의 일상을 지키는 실천형 안전 플랫폼
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 shrink-0 text-gray-500" />
                <span>대전광역시 서구 용문동 255-4<br />서우아파트 상가동 201호</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="shrink-0 text-gray-500" />
                <a href="tel:042-254-8060" className="hover:text-white transition-colors">
                  042-254-8060
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="shrink-0 text-gray-500" />
                <a href="mailto:dj@ccej.or.kr" className="hover:text-white transition-colors">
                  dj@ccej.or.kr
                </a>
              </div>
            </div>
          </div>

          {/* 링크 섹션 */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-white mb-4 pb-2 border-b border-gray-800">
                {title}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 자격증 고지사항 */}
      <div className="border-t border-gray-800">
        <div className="container-main py-6">
          <div className="bg-gray-800 rounded-lg p-4 text-xs text-gray-400 leading-relaxed mb-6">
            <strong className="text-gray-300">민간자격 표시사항</strong><br />
            본 센터에서 운영하는 보이스피싱 예방지도사, 생활안전지도사는 자격기본법에 따라 등록된
            민간자격이며, 국가자격 또는 공인자격이 아닙니다. 자격증 취득에 따른 취업이나 창업이
            보장되지 않습니다. 수강료·검정료·자격증 발급비 등 총비용은 각 자격 상세 페이지에서
            확인하시기 바랍니다.
          </div>
        </div>
      </div>

      {/* 하단 법적 링크 */}
      <div className="border-t border-gray-800">
        <div className="container-main py-5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} 대전경실련 도시안전디자인센터. All rights reserved.
          </p>
          <nav className="flex flex-wrap justify-center gap-x-4 gap-y-1">
            {LEGAL_LINKS.map((link, i) => (
              <span key={link.href} className="flex items-center gap-4">
                <Link
                  href={link.href}
                  className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {link.label}
                </Link>
                {i < LEGAL_LINKS.length - 1 && (
                  <span className="text-gray-700">|</span>
                )}
              </span>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
