import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import './globals.css'
import LayoutWrapper from '@/components/LayoutWrapper'

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-noto',
  display: 'swap',
})

const metadataBase =
  process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : new URL('http://localhost:3000')

export const metadata: Metadata = {
  metadataBase,
  title: {
    template: '%s | 대전경실련 도시안전디자인센터',
    default: '대전경실련 도시안전디자인센터',
  },
  description:
    '범죄예방과 생활안전 교육을 통해 시민의 일상을 지키는 실천형 안전 플랫폼. 보이스피싱 예방지도사, 생활안전지도사 민간자격 운영.',
  keywords: ['도시안전', '범죄예방', '생활안전', 'CPTED', '보이스피싱', '민간자격', '대전경실련'],
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/brand/logo-favicon.png', type: 'image/png', sizes: '45x64' },
      { url: '/brand/logo.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/brand/logo-header.png', type: 'image/png' }],
    shortcut: ['/favicon.ico'],
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: '대전경실련 도시안전디자인센터',
    images: [
      {
        url: '/brand/logo-og.png',
        width: 362,
        height: 512,
        alt: '대전경실련 도시안전디자인센터 로고',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/brand/logo-og.png'],
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
