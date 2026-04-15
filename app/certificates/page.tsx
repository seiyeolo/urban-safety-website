import type { Metadata } from 'next'
import Link from 'next/link'
import { AlertTriangle, ShieldCheck, ChevronRight, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: '민간자격증',
  description: '대전경실련 도시안전디자인센터에서 운영하는 보이스피싱 예방지도사, 생활안전지도사 민간자격과정을 안내합니다.',
}

const CERTS = [
  {
    icon: AlertTriangle,
    iconColor: 'text-navy-700',
    iconBg: 'bg-navy-100',
    accent: 'border-navy-200',
    tag: '금융위원회 관련부처',
    tagColor: 'text-navy-700 bg-navy-50',
    title: '보이스피싱 예방지도사',
    desc: '보이스피싱 범죄 유형과 최신 수법을 이해하고, 시민·고령층·청소년·소상공인 등 다양한 대상에게 맞춤형 예방교육과 홍보활동을 수행하는 실천형 민간자격',
    href: '/certificates/voice-phishing',
    duration: '4주 (총 20시간)',
    cost: '총 300,000원',
    target: '누구나',
  },
  {
    icon: ShieldCheck,
    iconColor: 'text-green-500',
    iconBg: 'bg-green-500/10',
    accent: 'border-green-200',
    tag: '행정안전부 관련부처',
    tagColor: 'text-green-700 bg-green-50',
    title: '생활안전지도사',
    desc: '가정·교통·재난 등 일상생활 전반의 안전 위험요인을 파악하고, 고령층·어린이 등 취약계층을 포함한 시민에게 맞춤형 생활안전교육을 수행하는 실천형 민간자격',
    href: '/certificates/life-safety',
    duration: '4주 (총 20시간)',
    cost: '총 300,000원',
    target: '누구나',
  },
]

const PROCESS_STEPS = [
  { no: '01', title: '수강 신청', desc: '홈페이지 또는 전화를 통해 교육 신청' },
  { no: '02', title: '수강료 납부', desc: '안내에 따라 수강료 결제 후 수강 확정' },
  { no: '03', title: '온라인 교육 수강', desc: '녹화강의 수강 + 실시간 특강 참여 (진도율 80% 이상)' },
  { no: '04', title: '자격검정 응시', desc: '필기평가(객관식) + 실무평가(과제 제출)' },
  { no: '05', title: '합격 발표', desc: '필기·실무평가 각 60점 이상 합격' },
  { no: '06', title: '자격증 발급', desc: '발급 신청 및 비용 납부 후 자격증 수령' },
]

export default function CertificatesPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container-main">
          <nav className="breadcrumb justify-center">
            <Link href="/" className="text-blue-300 hover:text-white">홈</Link>
            <span className="breadcrumb-sep text-blue-400">›</span>
            <span className="text-white">민간자격증</span>
          </nav>
          <h1>민간자격증</h1>
          <p>대전경실련 도시안전디자인센터에서 운영하는 민간자격과정</p>
        </div>
      </div>

      {/* 법적 고지 */}
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="container-main py-4">
          <p className="text-sm text-amber-800 text-center">
            ※ 본 센터에서 운영하는 자격과정은 <strong>자격기본법에 따라 등록된 민간자격</strong>이며, 국가자격 또는 공인자격이 아닙니다.
            자격 취득에 따른 취업·창업이 보장되지 않습니다.
          </p>
        </div>
      </div>

      {/* 자격증 목록 */}
      <section className="section-padding bg-white">
        <div className="container-main">
          <div className="section-header">
            <span className="section-tag">운영 자격과정</span>
            <h2 className="section-title">2가지 민간자격과정</h2>
            <p className="section-desc">
              범죄예방과 생활안전 분야의 실천형 지도자를 양성하는 전문 자격과정입니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {CERTS.map(({ icon: Icon, iconColor, iconBg, accent, tag, tagColor, title, desc, href, duration, cost, target }) => (
              <div key={href} className={`bg-white border-2 ${accent} rounded-2xl overflow-hidden hover:shadow-lg transition-shadow`}>
                <div className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`w-14 h-14 ${iconBg} rounded-2xl flex items-center justify-center shrink-0`}>
                      <Icon size={28} className={iconColor} />
                    </div>
                    <div>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${tagColor}`}>{tag}</span>
                      <h3 className="text-xl font-bold text-[#0f2d5e] mt-2">{title}</h3>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">{desc}</p>
                  <div className="grid grid-cols-3 gap-3 mb-6 text-sm">
                    {[
                      { label: '교육기간', value: duration },
                      { label: '취득비용', value: cost },
                      { label: '교육대상', value: target },
                    ].map(({ label, value }) => (
                      <div key={label} className="bg-gray-50 rounded-xl p-3 text-center">
                        <p className="text-xs text-gray-400 mb-1">{label}</p>
                        <p className="font-semibold text-gray-800 text-xs">{value}</p>
                      </div>
                    ))}
                  </div>
                  <Link href={href} className="btn-primary w-full justify-center">
                    자세히 보기 <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 취득 절차 */}
      <section id="process" className="section-padding bg-gray-50">
        <div className="container-main">
          <div className="section-header">
            <span className="section-tag">취득 절차</span>
            <h2 className="section-title">자격취득 6단계 프로세스</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROCESS_STEPS.map(({ no, title, desc }) => (
              <div key={no} className="bg-white rounded-2xl p-6 border border-gray-200">
                <div className="w-10 h-10 bg-[#0f2d5e] text-white rounded-xl flex items-center justify-center font-bold text-sm mb-4">
                  {no}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 비용 비교표 */}
      <section className="section-padding bg-white">
        <div className="container-main">
          <div className="section-header">
            <span className="section-tag">비용 안내</span>
            <h2 className="section-title">수강료 및 발급비</h2>
            <p className="section-desc">자격취득에 필요한 모든 비용을 투명하게 공개합니다.</p>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#0f2d5e] text-white">
                    <th className="px-6 py-4 text-left">항목</th>
                    <th className="px-6 py-4 text-right">금액</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: '수강료', value: '220,000원' },
                    { label: '검정료 (응시료)', value: '30,000원' },
                    { label: '자격증 발급비', value: '50,000원' },
                    { label: '재발급비', value: '30,000원' },
                  ].map(({ label, value }, i) => (
                    <tr key={label} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 text-gray-700">{label}</td>
                      <td className="px-6 py-4 text-right font-medium text-gray-800">{value}</td>
                    </tr>
                  ))}
                  <tr className="bg-blue-50 border-t-2 border-[#0f2d5e]">
                    <td className="px-6 py-4 font-bold text-[#0f2d5e]">총 취득비용</td>
                    <td className="px-6 py-4 text-right font-bold text-[#0f2d5e] text-lg">300,000원</td>
                  </tr>
                </tbody>
              </table>
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <p className="text-xs text-gray-500">※ 두 자격과정 모두 동일한 비용으로 운영됩니다. 결제 전 환불규정을 반드시 확인하시기 바랍니다.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-[#0f2d5e]">
        <div className="container-main text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">자격증 취득에 궁금한 점이 있으신가요?</h2>
          <p className="text-blue-200 mb-8">전화 또는 온라인 문의를 통해 자세한 안내를 받으실 수 있습니다.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:042-254-8060" className="btn-white">
              042-254-8060 전화 문의
            </a>
            <Link href="/contact/education" className="btn-primary border border-white/30">
              온라인 문의하기 <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
