'use client'

import { usePathname } from 'next/navigation'
import HeaderOptimized from './HeaderOptimized'
import Footer from './Footer'
import OnlineClassBanner from './OnlineClassBanner'

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')

  if (isAdmin) {
    return <>{children}</>
  }

  return (
    <>
      <HeaderOptimized />
      <OnlineClassBanner />
      <main id="main-content" className="flex-1" tabIndex={-1}>{children}</main>
      <Footer />
    </>
  )
}
