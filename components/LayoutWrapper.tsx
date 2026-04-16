'use client'

import { usePathname } from 'next/navigation'
import HeaderOptimized from './HeaderOptimized'
import Footer from './Footer'
import { AuthProvider } from '@/lib/auth/AuthContext'

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')

  return (
    <AuthProvider>
      {isAdmin ? (
        <>{children}</>
      ) : (
        <>
          <HeaderOptimized />
          <main className="flex-1">{children}</main>
          <Footer />
        </>
      )}
    </AuthProvider>
  )
}
