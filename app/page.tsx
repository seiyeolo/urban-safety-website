import Link from 'next/link'
import {
  Shield, AlertTriangle, Heart, Award, BookOpen,
  Users, ChevronRight, ArrowRight, Phone, Mail, CheckCircle,
  Megaphone, FileText, Calendar
} from 'lucide-react'

/* ─────────────── 데이터 ─────────────── */

const CERTIFICATES = [
  {
    icon: AlertTriangle,
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-100',
    title: '보이스피싱 예방지도사',
    desc: '보이스피싱 범죄의 구조와 수법을 이해하고, 시민·고령층·청소년 등 다양한 대상에게 맞춤형 예방교육을 수행하는 민간자격.',
    points: ['보이스피싱 범죄 이해 및 분석', '대상별 예방교육 기획·운영', '지역사회 홍보·캠페인 실무'],
    href: '/certificates/voice-phishing',
  },
  {
    icon: Heart,
    color: 'text-navy-800',
    bg: 'bg-navy-50',
    border: 'border-navy-100',
    title: '생활안전지도사',
    desc: '가정, 학교, 공공장소 등 일상 전반의 위험요인을 이해하고, 시민 대상 생활안전 교육과 예방활동을 수행하는 민간자격.',
    points: ['생활안전 주요 영역·위험요인 이해', '연령별 맞춤형 교육 방법 습득', '지역사회 안전캠페인 실무'],
    href: '/certificates/life-safety',
  },
]

const CORE_FIELDS = [
  {
    icon: Shield,
    title: '범죄예방',
    items: ['보이스피싱 예방', 'CPTED (환경설계)', '범죄예방 교육·캠페인', '지역사회 협력 활동'],
    href: '/fields/crime-prevention',
    color: 'bg-navy-900',
  },
  {
    icon: Heart,
    title: '생활안전',
    items: ['생활안전 교육', '시민 실천 프로그램', '생활안전 캠페인', '안전문화 확산'],
    href: '/fields/life-safety',
    color: 'bg-orange-600',
  },
]

const PROCESS_STEPS = [
  { step: '01', label: '회원가입' },
  { step: '02', label: '수강신청·결제' },
  { step: '03', label: '온라인 강의 수강' },
  { step: '04', label: '시험·평가' },
  { step: '05', label: '수료·합격' },
  { step: '06', label: '자격증 발급' },
]

const NOTICES = [
  { type: '공지', date: '2026.04.10', title: '2026년 2분기 보이스피싱 예방지도사 교육과정 개강 안내' },
  { type: '일정', date: '2026.04.08', title: '생활안전지도사 2기 합격자 발표' },
  { type: '공지', date: '2026.04.05', title: '대전 지역 보이스피싱 예방 캠페인 참여자 모집' },
  { type: '자료', date: '2026.04.01', title: '2026년 1분기 범죄예방 교육 보고서 공개' },
]

const STATS = [
  { value: '2,400+', label: '자격증 취득자' },
  { value: '98%', label: '수강생 만족도' },
  { value: '150+', label: '협력 기관' },
  { value: '35년', label: '대전경실련 운영' },
]

/* ─────────────── 페이지 ─────────────── */

export default function HomePage() {
  return (
    <>
      {/* 1. 메인 히어로 */}
      <section className="relative bg-gradient-to-br from-[#06153a] via-[#0f2d5e] to-[#1e4080] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-16 right-16 w-96 h-96 bg-orange-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600 rounded-full blur-3xl" />
        </div>

        <div className="relative container-main py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm mb-6">
              <Shield size={14} className="text-orange-400" />
              <span>대전경실련 공식 안전교육 플랫폼</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              범죄예방과 생활안전,<br />
              <span className="text-orange-400">시민과 함께</span> 만드는<br />
              안전한 일상
            </h1>

            <p className="text-lg md:text-xl text-blue-100 leading-relaxed mb-10 max-w-2xl">
              대전경실련 도시안전디자인센터는 범죄예방과 생활안전 분야의 교육,
              민간자격 운영, 지역사회 캠페인을 통해 안전 역량을 높이고 있습니다.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/certificates/voice-phishing" className="btn-primary text-base">
                자격증 신청하기
                <ArrowRight size={18} />
              </Link>
              <Link href="/about" className="btn-white text-base">
                센터 소개
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-12 border-t border-white/10">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-blue-200">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. 핵심 운영분야 */}
      <section className="section-padding bg-gray-50">
        <div className="container-main">
          <div className="section-header">
            <span className="section-tag">핵심 운영분야</span>
            <h2 className="section-title">2가지 핵심 분야로 지역사회를 지킵니다</h2>
            <p className="section-desc max-w-2xl mx-auto">
              범죄예방과 생활안전, 두 축을 중심으로 교육·자격·현장 실천을 통합 운영합니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {CORE_FIELDS.map((field) => {
              const Icon = field.icon
              return (
                <div key={field.title} className={`${field.color} text-white rounded-2xl p-10`}>
                  <Icon size={40} className="mb-5 opacity-90" />
                  <h3 className="text-2xl font-bold mb-4">{field.title}</h3>
                  <ul className="space-y-2 mb-8">
                    {field.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-white/90">
                        <CheckCircle size={16} className="shrink-0 opacity-75" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={field.href}
                    className="inline-flex items-center gap-2 text-white font-semibold border-b border-white/40 pb-0.5 hover:border-white transition-colors"
                  >
                    자세히 보기 <ChevronRight size={16} />
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 3. 민간자격증 */}
      <section className="section-padding bg-white">
        <div className="container-main">
          <div className="section-header">
            <span className="section-tag">민간자격증</span>
            <h2 className="section-title">운영 민간자격증</h2>
            <p className="section-desc max-w-2xl mx-auto">
              지역사회 안전을 실천하는 전문 교육인력 양성을 위한 민간자격 과정을 운영합니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {CERTIFICATES.map((cert) => {
              const Icon = cert.icon
              return (
                <div key={cert.title} className={`card border-2 ${cert.border}`}>
                  <div className={`w-14 h-14 ${cert.bg} rounded-xl flex items-center justify-center mb-5`}>
                    <Icon size={28} className={cert.color} />
                  </div>
                  <h3 className="text-xl font-bold text-[#0f2d5e] mb-3">{cert.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-5">{cert.desc}</p>
                  <ul className="space-y-2 mb-6">
                    {cert.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle size={15} className="text-green-500 shrink-0" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <Link href={cert.href} className="btn-primary w-full justify-center">
                    자격증 상세보기
                    <ChevronRight size={16} />
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 4. 취득 절차 */}
      <section className="section-padding bg-[#0f2d5e] text-white">
        <div className="container-main">
          <div className="section-header">
            <span className="inline-block bg-white/15 text-white text-sm font-semibold px-4 py-1 rounded-full mb-3">취득 절차</span>
            <h2 className="text-3xl font-bold text-white mb-4">자격증 취득, 이렇게 진행됩니다</h2>
            <p className="text-blue-200">신청부터 발급까지 6단계로 완성됩니다.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {PROCESS_STEPS.map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-14 h-14 bg-white/10 border-2 border-white/20 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                  {step.step}
                </div>
                <p className="text-sm font-medium text-white/90">{step.label}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/certificates" className="btn-white">
              자세한 신청 방법 보기
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. 온라인 교육 */}
      <section className="section-padding bg-orange-50">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="section-tag">온라인 교육</span>
              <h2 className="section-title mt-2">언제 어디서나<br />온라인으로 수강하세요</h2>
              <p className="section-desc mb-8">
                녹화 강의와 실시간 특강을 통해 편리하게 학습하고,
                온라인으로 시험 응시부터 자격증 발급까지 완료할 수 있습니다.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: BookOpen, label: '체계적 커리큘럼' },
                  { icon: Users, label: '대상별 맞춤 강의' },
                  { icon: Award, label: '자격증 자동 발급' },
                  { icon: Phone, label: '모바일 수강 가능' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm">
                    <div className="w-9 h-9 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Icon size={18} className="text-[#e85d04]" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{label}</span>
                  </div>
                ))}
              </div>
              <Link href="/education/online" className="btn-primary">
                교육과정 보러가기
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-lg font-bold text-[#0f2d5e] mb-5 flex items-center gap-2">
                <Calendar size={20} className="text-[#e85d04]" />
                교육 과정 안내
              </h3>
              <div className="space-y-4">
                {[
                  { badge: '모집중', badgeColor: 'bg-green-100 text-green-700', title: '보이스피싱 예방지도사 2기', period: '2026.05.01 ~ 05.31', count: '정원 30명' },
                  { badge: '예정', badgeColor: 'bg-blue-100 text-blue-700', title: '생활안전지도사 3기', period: '2026.06.01 ~ 06.30', count: '정원 30명' },
                  { badge: '특강', badgeColor: 'bg-orange-100 text-orange-700', title: '보이스피싱 무료 공개 특강', period: '2026.04.25 (금)', count: '선착순 50명' },
                ].map((course) => (
                  <div key={course.title} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                    <span className={`text-xs font-semibold px-2 py-1 rounded shrink-0 mt-0.5 ${course.badgeColor}`}>
                      {course.badge}
                    </span>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{course.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{course.period} · {course.count}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/education" className="btn-secondary w-full justify-center mt-5 text-sm py-3">
                전체 일정 보기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. 최근 소식 */}
      <section className="section-padding bg-white">
        <div className="container-main">
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="section-tag">공지사항</span>
              <h2 className="section-title mt-1">최근 소식</h2>
            </div>
            <Link href="/notice" className="flex items-center gap-1 text-sm text-gray-500 hover:text-[#0f2d5e] transition-colors">
              전체 보기 <ChevronRight size={16} />
            </Link>
          </div>

          <div className="divide-y divide-gray-100">
            {NOTICES.map((notice) => (
              <div
                key={notice.title}
                className="flex items-center gap-4 py-4 hover:bg-gray-50 px-2 rounded-lg transition-colors cursor-pointer group"
              >
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${
                  notice.type === '공지' ? 'bg-blue-100 text-blue-700' :
                  notice.type === '일정' ? 'bg-green-100 text-green-700' :
                  'bg-orange-100 text-orange-700'
                }`}>
                  {notice.type}
                </span>
                <span className="flex-1 text-gray-700 text-sm group-hover:text-[#0f2d5e] transition-colors">
                  {notice.title}
                </span>
                <span className="text-xs text-gray-400 shrink-0">{notice.date}</span>
                <ChevronRight size={14} className="text-gray-300 group-hover:text-[#0f2d5e] transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CTA */}
      <section className="section-padding bg-gradient-to-r from-[#e85d04] to-[#f27722] text-white">
        <div className="container-main text-center">
          <Megaphone size={40} className="mx-auto mb-5 opacity-90" />
          <h2 className="text-3xl font-bold mb-4">
            지역사회 안전, 함께 만들어 가겠습니다
          </h2>
          <p className="text-orange-100 text-lg mb-8 max-w-2xl mx-auto">
            교육 신청, 자격증 문의, 단체교육 협력까지 언제든지 연락 주시기 바랍니다.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-white">
              <Mail size={18} />
              일반 문의
            </Link>
            <Link href="/contact/group" className="inline-flex items-center gap-2 bg-white/20 border border-white/30 text-white font-semibold px-7 py-3 rounded-lg hover:bg-white/30 transition-colors">
              <FileText size={18} />
              단체교육 문의
            </Link>
            <a href="tel:042-254-8060" className="inline-flex items-center gap-2 bg-white/20 border border-white/30 text-white font-semibold px-7 py-3 rounded-lg hover:bg-white/30 transition-colors">
              <Phone size={18} />
              042-254-8060
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
