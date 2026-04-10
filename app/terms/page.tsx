import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '이용약관',
  description: '대전경실련 도시안전디자인센터 이용약관입니다.',
}

export default function TermsPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container-main">
          <nav className="breadcrumb justify-center">
            <Link href="/" className="text-blue-300 hover:text-white">홈</Link>
            <span className="breadcrumb-sep text-blue-400">›</span>
            <span className="text-white">이용약관</span>
          </nav>
          <h1>이용약관</h1>
          <p>시행일: 2024년 1월 1일</p>
        </div>
      </div>

      <section className="section-padding bg-white">
        <div className="container-main max-w-3xl mx-auto">
          <div className="space-y-8 text-sm text-gray-700 leading-relaxed">

            <div>
              <h2 className="text-base font-bold text-[#0f2d5e] mb-3">제1조 (목적)</h2>
              <p>
                이 약관은 대전경실련 도시안전디자인센터(이하 "센터")가 운영하는 웹사이트 및 온라인 교육 서비스(이하 "서비스")를
                이용함에 있어 센터와 이용자의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.
              </p>
            </div>

            <div>
              <h2 className="text-base font-bold text-[#0f2d5e] mb-3">제2조 (용어의 정의)</h2>
              <ul className="space-y-2 list-disc list-inside">
                <li>"이용자"란 이 약관에 따라 센터가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.</li>
                <li>"서비스"란 센터가 제공하는 온라인 교육과정, 자격검정, 온라인 문의 등 일체의 서비스를 말합니다.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-base font-bold text-[#0f2d5e] mb-3">제3조 (약관의 효력과 변경)</h2>
              <p>
                이 약관은 서비스 화면에 게시하거나 기타의 방법으로 이용자에게 공지함으로써 효력을 발생합니다.
                센터는 합리적인 사유가 발생할 경우 약관을 변경할 수 있으며, 변경된 약관은 공지 후 7일 이후부터 효력을 발생합니다.
              </p>
            </div>

            <div>
              <h2 className="text-base font-bold text-[#0f2d5e] mb-3">제4조 (서비스 이용)</h2>
              <p>
                이용자는 센터가 정한 절차에 따라 교육과정을 신청하고 이용합니다.
                센터는 이용자가 원활하게 서비스를 이용할 수 있도록 노력하며, 서비스 내용의 변경이 있을 경우 사전 공지합니다.
              </p>
            </div>

            <div>
              <h2 className="text-base font-bold text-[#0f2d5e] mb-3">제5조 (수강료 및 환불)</h2>
              <p>
                수강료, 검정료, 자격증 발급비 등 비용에 관한 사항은 각 서비스 안내 페이지에서 확인하실 수 있습니다.
                환불에 관한 사항은 <Link href="/refund" className="text-[#0f2d5e] underline">환불규정</Link>을 따릅니다.
              </p>
            </div>

            <div>
              <h2 className="text-base font-bold text-[#0f2d5e] mb-3">제6조 (이용자의 의무)</h2>
              <ul className="space-y-2 list-disc list-inside">
                <li>이용자는 서비스 이용 시 타인의 권리를 침해하거나 법령에 위반되는 행위를 하여서는 안 됩니다.</li>
                <li>이용자는 센터가 제공하는 교육 콘텐츠를 무단으로 복제·배포·수정하여서는 안 됩니다.</li>
                <li>이용자는 온라인 강의를 타인에게 양도하거나 공유하여서는 안 됩니다.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-base font-bold text-[#0f2d5e] mb-3">제7조 (지식재산권)</h2>
              <p>
                센터가 제공하는 모든 교육 콘텐츠, 자료, 디자인 등의 저작권 및 지식재산권은 센터에 귀속됩니다.
                이용자는 서비스 이용으로 취득한 정보를 무단으로 상업적 목적에 이용하거나 제3자에게 제공할 수 없습니다.
              </p>
            </div>

            <div>
              <h2 className="text-base font-bold text-[#0f2d5e] mb-3">제8조 (면책조항)</h2>
              <p>
                센터는 천재지변, 전산망 장애 등 불가항력적인 사유로 인하여 서비스를 제공할 수 없는 경우에는 책임이 면제됩니다.
                이용자의 귀책 사유로 인한 서비스 이용 장애에 대해서는 책임을 지지 않습니다.
              </p>
            </div>

            <div>
              <h2 className="text-base font-bold text-[#0f2d5e] mb-3">제9조 (분쟁 해결)</h2>
              <p>
                서비스 이용과 관련하여 발생한 분쟁에 대해 소송이 제기될 경우에는 센터의 소재지를 관할하는
                법원을 관할 법원으로 합니다.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-5">
              <p className="font-semibold text-gray-700 mb-2">문의처</p>
              <p>대전경실련 도시안전디자인센터</p>
              <p>주소: 대전광역시 서구 용문동 255-4 서우아파트 상가동 201호</p>
              <p>전화: <a href="tel:042-254-8060" className="text-[#0f2d5e] hover:underline">042-254-8060</a></p>
              <p>이메일: <a href="mailto:dj@ccej.or.kr" className="text-[#0f2d5e] hover:underline">dj@ccej.or.kr</a></p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
