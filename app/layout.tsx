import type { Metadata, Viewport } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import './globals.css'
import LayoutWrapper from '@/components/LayoutWrapper'

/* next/font가 셀프호스팅 — Google Fonts 런타임 요청 없음.
   한글은 subsets 목록에 'korean'이 없어도 unicode-range 청크로 정상 로드된다.
   900: 코드에서 font-black을 73곳 쓰는데 미로드 상태라 700으로 대체되고 있었음.
   font-extrabold(800, 7곳)은 CSS 폰트 매칭상 900으로 대체되므로 별도 로드 불필요. */
const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-noto',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1a3a5c',
}

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
      { url: '/favicon.ico', sizes: '48x48 32x32 16x16' },
      { url: '/brand/logo-favicon.png', type: 'image/png', sizes: '64x64' },
      { url: '/brand/logo.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/apple-touch-icon.png', type: 'image/png', sizes: '180x180' }],
    shortcut: ['/favicon.ico'],
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: '대전경실련 도시안전디자인센터',
    images: [
      {
        // OG 카드는 가로형(1.91:1)이 표준 — 세로형이면 SNS에서 잘림
        url: '/brand/logo-og.png',
        width: 1200,
        height: 630,
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
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-navy-900 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-green-500"
        >
          본문 바로가기
        </a>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  )
}
