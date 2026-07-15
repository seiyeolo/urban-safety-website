'use client'

import { AuthProvider } from '@/lib/auth/AuthContext'

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>
}
