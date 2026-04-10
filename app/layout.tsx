import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import './globals.css'
import LayoutWrapper from '@/components/LayoutWrapper'

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | 대전경실련 도시안전디자인센터',
    default: '대전경실련 도시안전디자인센터',
  },
  description:
    '범죄예방과 생활안전 교육을 통해 시민의 일상을 지키는 실천형 안전 플랫폼. 보이스피싱 예방지도사, 생활안전지도사 민간자격 운영.',
  keywords: ['도시안전', '범죄예방', '생활안전', 'CPTED', '보이스피싱', '민간자격', '대전경실련'],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: '대전경실련 도시안전디자인센터',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={notoSansKR.variable}>
      <body className="min-h-screen flex flex-col antialiased">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  )
}
