import type { Metadata } from 'next'
import Link from 'next/link'
import { ShieldCheck, CheckCircle, ChevronRight, Phone, Mail, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: '생활안전지도사',
  description: '일상생활 속 안전 위험요인을 파악하고 맞춤형 안전교육을 수행하는 실천형 민간자격과정. 등록된 민간자격으로 국가자격이 아닙니다.',
}

const MODULES = [
  { no: '1', title: '생활안전의 이해', items: ['생활안전의 개념과 범위', '국내외 생활안전 현황과 통계', '생활안전사고의 유형과 원인'] },
  { no: '2', title: '가정 및 주거 안전', items: ['낙상·미끄럼 사고 예방', '화재 예방과 초기 대응', '가스·전기 안전 관리'] },
  { no: '3', title: '교통 및 이동 안전', items: ['보행자 교통안전', '고령자·어린이 교통안전', '이륜차·킥보드 안전 이용'] },
  { no: '4', title: '재난·응급 대응', items: ['재난의 유형과 행동 요령', '응급처치 기초 (CPR, 심폐소생술)', '위기 상황 대처와 대피 절차'] },
  { no: '5', title: '대상별 교육 방법론', items: ['고령층 대상 생활안전 교육법', '아동·청소년 안전교육 기법', '장애인·취약계층 맞춤 교육'] },
  { no: '6', title: '강의 실습 및 평가 준비', items: ['교육안 작성', '모의 강의 실습', '자격검정 대비 정리'] },
]

const ACTIVITY_FIELDS = [
  '주민자치센터, 평생학습관, 복지관 등 지역사회 안전교육 강사',
  '노인복지관, 경로당, 고령자 대상 생활안전 예방교육',
  '초등학교, 방과후교실, 아동·청소년 대상 안전교육',
  '지역 축제, 안전 캠페인, 홍보부스 운영 지원',
  '공공기관·기업체 생활안전 교육사업 참여 및 강의',
]

const FAQ = [
  { q: '비전공자도 신청할 수 있나요?', a: '네, 가능합니다. 시민안전과 생활안전교육에 관심 있는 누구나 신청할 수 있습니다.' },
  { q: '교육은 어떤 방식으로 진행되나요?', a: '운영기수에 따라 온라인, 오프라인, 혼합형으로 운영될 수 있으며, 세부 일정은 공지사항을 통해 안내됩니다.' },
  { q: '자격 취득 후 바로 강의할 수 있나요?', a: '자격 취득 후 지역사회 안전교육, 캠페인 등에 활용할 수 있습니다. 실제 강의 기회는 기관 및 활동 환경에 따라 다를 수 있습니다.' },
  { q: '응급처치 자격과는 어떻게 다른가요?', a: '본 과정은 응급처치 단일 기술이 아닌, 생활 전반의 안전위험 예방과 교육 역량을 체계적으로 학습하는 종합 과정입니다.' },
]

const COST_ITEMS = [
  { label: '수강료', value: '220,000원' },
  { label: '검정료(응시료)', value: '30,000원' },
  { label: '자격증 발급비', value: '50,000원' },
  { label: '재발급비', value: '30,000원' },
  { label: '총 취득비용', value: '300,000원', highlight: true },
]

export default function LifeSafetyCertPage() {
  return (
    <>
      {/* 히어로 */}
      <div className="bg-gradient-to-br from-[#06153a] to-[#0f2d5e] text-white py-16">
        <div className="container-main">
          <nav className="breadcrumb mb-6">
            <Link href="/" className="text-blue-300 hover:text-white">홈</Link>
            <span className="breadcrumb-sep text-blue-400">›</span>
            <Link href="/certificates" className="text-blue-300 hover:text-white">민간자격증</Link>
            <span className="breadcrumb-sep text-blue-400">›</span>
            <span className="text-white">생활안전지도사</span>
          </nav>

          <div className="flex items-start gap-5">
            <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center shrink-0">
              <ShieldCheck size={32} className="text-green-400" />
            </div>
            <div>
              <p className="text-green-300 text-sm font-semibold mb-2">민간자격 | 행정안전부 관련부처</p>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">생활안전지도사</h1>
              <p className="text-blue-200 text-lg max-w-2xl">
                일상생활의 안전 위험요인을 파악하고 시민 맞춤형 예방교육을 수행하는 실천형 민간자격과정
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-8">
            <Link href="#apply" className="btn-primary">
              교육 신청하기 <ArrowRight size={16} />
            </Link>
            <Link href="/contact/education" className="btn-white text-sm py-2.5 px-5">
              자격 문의
            </Link>
          </div>
        </div>
      </div>

      {/* 본문 */}
      <div className="container-main py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* 왼쪽 콘텐츠 */}
          <div className="lg:col-span-2 space-y-12">

            {/* 자격 소개 */}
            <section>
              <h2 className="text-xl font-bold text-[#0f2d5e] mb-4 pb-3 border-b border-gray-200">자격 소개</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                생활안전지도사는 가정, 교통, 재난 등 일상생활 전반의 안전 위험요인을 이해하고,
                고령층·어린이·청소년·장애인 등 다양한 취약계층을 포함한 시민에게 맞춤형 안전교육을
                수행할 수 있도록 양성하는 민간자격입니다.
              </p>
              <p className="text-gray-700 leading-relaxed">
                낙상·화재·교통사고·재난 등 생활 속 안전사고는 여전히 빈번하게 발생하고 있으며,
                예방 교육의 사회적 수요는 지속적으로 증가하고 있습니다.
                본 과정은 생활안전 위험요인 분석, 응급대응 기초, 대상별 교육 방법론,
                지역사회 실천 역량을 체계적으로 학습하도록 구성되어 있습니다.
              </p>
            </section>

            {/* 교육목표 */}
            <section>
              <h2 className="text-xl font-bold text-[#0f2d5e] mb-4 pb-3 border-b border-gray-200">교육목표</h2>
              <ul className="space-y-3">
                {[
                  '일상생활 속 안전 위험요인을 체계적으로 파악한다.',
                  '생활안전사고의 주요 유형별 예방 방법을 이해한다.',
                  '대상별(고령층·아동·장애인 등) 맞춤형 안전교육을 기획·운영할 수 있다.',
                  '응급 상황 초기 대응과 재난 행동 요령을 실천할 수 있다.',
                  '지역사회 안전문화 확산에 기여하는 실천형 지도자로 활동한다.',
                ].map((goal) => (
                  <li key={goal} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700">{goal}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 교육과정 */}
            <section>
              <h2 className="text-xl font-bold text-[#0f2d5e] mb-4 pb-3 border-b border-gray-200">교육과정</h2>
              <div className="bg-blue-50 rounded-xl p-5 mb-6 grid sm:grid-cols-2 gap-4 text-sm">
                {[
                  { label: '교육기간', value: '4주 (총 20시간)' },
                  { label: '운영방식', value: '온라인 + 실시간 특강' },
                  { label: '수강형태', value: '녹화강의 + 평가' },
                  { label: '교육대상', value: '누구나 (제한 없음)' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex gap-2">
                    <span className="text-gray-500 w-20 shrink-0">{label}</span>
                    <span className="font-semibold text-[#0f2d5e]">{value}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                {MODULES.map((mod) => (
                  <div key={mod.no} className="border border-gray-200 rounded-xl overflow-hidden">
                    <div className="bg-gray-50 px-5 py-3 flex items-center gap-3">
                      <span className="w-7 h-7 bg-[#0f2d5e] text-white text-xs font-bold rounded-full flex items-center justify-center shrink-0">
                        {mod.no}
                      </span>
                      <span className="font-semibold text-gray-800">{mod.title}</span>
                    </div>
                    <ul className="px-5 py-3 space-y-1">
                      {mod.items.map((item) => (
                        <li key={item} className="text-sm text-gray-600 flex items-center gap-2">
                          <span className="w-1 h-1 bg-gray-400 rounded-full shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* 활동분야 */}
            <section>
              <h2 className="text-xl font-bold text-[#0f2d5e] mb-4 pb-3 border-b border-gray-200">활동분야</h2>
              <ul className="space-y-3">
                {ACTIVITY_FIELDS.map((field) => (
                  <li key={field} className="flex items-start gap-3">
                    <ChevronRight size={16} className="text-green-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700">{field}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* FAQ */}
            <section>
              <h2 className="text-xl font-bold text-[#0f2d5e] mb-4 pb-3 border-b border-gray-200">자주 묻는 질문</h2>
              <div className="space-y-4">
                {FAQ.map(({ q, a }) => (
                  <div key={q} className="bg-gray-50 rounded-xl p-5">
                    <p className="font-semibold text-[#0f2d5e] mb-2">Q. {q}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">A. {a}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* 오른쪽 사이드바 */}
          <div className="space-y-6">
            {/* 비용 */}
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-[#0f2d5e] text-white px-6 py-4">
                <h3 className="font-bold">수강료 및 발급비 안내</h3>
              </div>
              <div className="p-6 space-y-3">
                {COST_ITEMS.map(({ label, value, highlight }) => (
                  <div key={label} className={`flex justify-between items-center ${highlight ? 'pt-3 border-t border-gray-200 font-bold text-[#0f2d5e]' : 'text-gray-700 text-sm'}`}>
                    <span>{label}</span>
                    <span className={highlight ? 'text-xl' : ''}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="px-6 pb-6">
                <p className="text-xs text-gray-400 mb-4">※ 결제 전 환불규정을 반드시 확인하시기 바랍니다.</p>
                <Link href="#apply" id="apply" className="btn-primary w-full justify-center">
                  교육 신청하기
                </Link>
              </div>
            </div>

            {/* 검정방법 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-[#0f2d5e] mb-4">검정방법 및 합격기준</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex justify-between"><span className="text-gray-500">진도율</span><span>80% 이상</span></div>
                <div className="flex justify-between"><span className="text-gray-500">필기평가</span><span>객관식 / 60점 이상</span></div>
                <div className="flex justify-between"><span className="text-gray-500">실무평가</span><span>과제 제출 / 60점 이상</span></div>
              </div>
            </div>

            {/* 자격정보 */}
            <div className="bg-green-50 border border-green-100 rounded-2xl p-6">
              <h3 className="font-bold text-[#0f2d5e] mb-3">자격 정보</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p><span className="text-gray-500">자격종류:</span> 민간자격</p>
                <p><span className="text-gray-500">등록번호:</span> 2022-003785</p>
                <p><span className="text-gray-500">자격관리기관:</span> 대전경실련 도시안전디자인센터</p>
                <p><span className="text-gray-500">연락처:</span> <a href="tel:042-254-8060" className="text-[#0f2d5e] hover:underline">042-254-8060</a></p>
              </div>
              <div className="mt-4 p-3 bg-green-100 rounded-lg">
                <p className="text-xs text-green-800">
                  ※ 본 자격은 자격기본법에 따라 등록된 민간자격이며,
                  국가자격 또는 공인자격이 아닙니다.
                </p>
              </div>
            </div>

            {/* 문의 */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-bold text-[#0f2d5e] mb-3">문의하기</h3>
              <div className="space-y-2 text-sm">
                <a href="tel:042-254-8060" className="flex items-center gap-2 text-gray-700 hover:text-[#0f2d5e]">
                  <Phone size={14} className="text-gray-400" />042-254-8060
                </a>
                <a href="mailto:dj@ccej.or.kr" className="flex items-center gap-2 text-gray-700 hover:text-[#0f2d5e]">
                  <Mail size={14} className="text-gray-400" />dj@ccej.or.kr
                </a>
              </div>
              <Link href="/contact/education" className="btn-secondary w-full justify-center mt-4 text-sm py-2.5">
                온라인 문의
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
