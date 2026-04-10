import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '개인정보처리방침',
  description: '대전경실련 도시안전디자인센터 개인정보처리방침입니다.',
}

export default function PrivacyPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container-main">
          <nav className="breadcrumb justify-center">
            <Link href="/" className="text-blue-300 hover:text-white">홈</Link>
            <span className="breadcrumb-sep text-blue-400">›</span>
            <span className="text-white">개인정보처리방침</span>
          </nav>
          <h1>개인정보처리방침</h1>
          <p>시행일: 2024년 1월 1일</p>
        </div>
      </div>

      <section className="section-padding bg-white">
        <div className="container-main max-w-3xl mx-auto">
          <div className="prose prose-gray max-w-none space-y-8 text-sm text-gray-700 leading-relaxed">

            <div>
              <h2 className="text-base font-bold text-[#0f2d5e] mb-3">제1조 (개인정보의 처리 목적)</h2>
              <p>
                대전경실련 도시안전디자인센터(이하 "센터")는 다음의 목적을 위하여 개인정보를 처리합니다.
                처리하는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 목적이 변경될 경우에는
                개인정보 보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
              </p>
              <ul className="mt-3 space-y-1 list-disc list-inside">
                <li>교육과정 수강 신청 및 관리</li>
                <li>민간자격 검정 응시 및 자격증 발급</li>
                <li>온라인 문의 처리 및 민원 대응</li>
                <li>교육 일정 및 공지사항 안내</li>
              </ul>
            </div>

            <div>
              <h2 className="text-base font-bold text-[#0f2d5e] mb-3">제2조 (개인정보의 처리 및 보유 기간)</h2>
              <p>
                센터는 법령에 따른 개인정보 보유·이용 기간 또는 정보주체로부터 개인정보를 수집 시에
                동의받은 개인정보 보유·이용 기간 내에서 개인정보를 처리·보유합니다.
              </p>
              <ul className="mt-3 space-y-1 list-disc list-inside">
                <li>수강생 정보: 수료 후 3년</li>
                <li>자격취득자 정보: 자격 유효 기간 동안</li>
                <li>문의 접수 정보: 처리 완료 후 1년</li>
              </ul>
            </div>

            <div>
              <h2 className="text-base font-bold text-[#0f2d5e] mb-3">제3조 (처리하는 개인정보의 항목)</h2>
              <p>센터는 다음의 개인정보 항목을 처리하고 있습니다.</p>
              <ul className="mt-3 space-y-1 list-disc list-inside">
                <li>필수 항목: 이름, 연락처, 이메일</li>
                <li>선택 항목: 소속 기관, 주소</li>
              </ul>
            </div>

            <div>
              <h2 className="text-base font-bold text-[#0f2d5e] mb-3">제4조 (개인정보의 제3자 제공)</h2>
              <p>
                센터는 정보주체의 개인정보를 제1조에서 명시한 목적 범위 내에서만 처리하며,
                정보주체의 동의, 법률의 특별한 규정 등 개인정보 보호법 제17조에 해당하는 경우에만
                개인정보를 제3자에게 제공합니다.
              </p>
            </div>

            <div>
              <h2 className="text-base font-bold text-[#0f2d5e] mb-3">제5조 (개인정보의 파기)</h2>
              <p>
                센터는 개인정보 보유 기간의 경과, 처리 목적 달성 등 개인정보가 불필요하게 되었을 때에는
                지체 없이 해당 개인정보를 파기합니다.
              </p>
            </div>

            <div>
              <h2 className="text-base font-bold text-[#0f2d5e] mb-3">제6조 (개인정보보호 책임자)</h2>
              <div className="bg-gray-50 rounded-xl p-5">
                <p>개인정보보호 책임자: 사무국장</p>
                <p className="mt-1">전화: <a href="tel:042-254-8060" className="text-[#0f2d5e] hover:underline">042-254-8060</a></p>
                <p>이메일: <a href="mailto:dj@ccej.or.kr" className="text-[#0f2d5e] hover:underline">dj@ccej.or.kr</a></p>
              </div>
            </div>

            <div>
              <h2 className="text-base font-bold text-[#0f2d5e] mb-3">제7조 (개인정보 처리방침의 변경)</h2>
              <p>이 개인정보 처리방침은 2024년 1월 1일부터 적용됩니다.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
