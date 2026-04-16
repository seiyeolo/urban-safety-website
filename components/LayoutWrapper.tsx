'use client'

import { usePathname } from 'next/navigation'
import HeaderOptimized from './HeaderOptimized'
import Footer from './Footer'

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')

  if (isAdmin) {
    return <>{children}</>
  }

  return (
    <>
      <HeaderOptimized />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  )
}
