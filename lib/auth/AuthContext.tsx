'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session, AuthError } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase/client'

interface UserMetadata {
  name?: string
  avatar_url?: string
  [key: string]: any
}

interface AuthResult {
  data: { user: User | null; session: Session | null } | null
  error: AuthError | null
}

interface OAuthResult {
  data: { provider: string; url: string } | null
  error: AuthError | null
}

interface AuthContextType {
  user: User | null
  session: Session | null
  signIn: (email: string, password: string) => Promise<AuthResult>
  signUp: (email: string, password: string, metadata?: UserMetadata) => Promise<AuthResult>
  signInWithGoogle: () => Promise<OAuthResult>
  signInWithKakao: () => Promise<OAuthResult>
  signOut: () => Promise<void>
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    }

    getInitialSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string): Promise<AuthResult> => {
    const result = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return {
      data: result.data ? { user: result.data.user, session: result.data.session } : null,
      error: result.error
    }
  }

  const signUp = async (email: string, password: string, metadata?: UserMetadata): Promise<AuthResult> => {
    const result = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    })
    return {
      data: result.data ? { user: result.data.user, session: result.data.session } : null,
      error: result.error
    }
  }

  // 동적 리다이렉트 URL 생성 (하드코딩 해결)
  const getRedirectUrl = (): string => {
    if (typeof window === 'undefined') {
      return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    }
    return `${window.location.origin}/dashboard`
  }

  const signInWithGoogle = async (): Promise<OAuthResult> => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: getRedirectUrl()
      }
    })
    return {
      data: data ? { provider: data.provider, url: data.url || '' } : null,
      error
    }
  }

  const signInWithKakao = async (): Promise<OAuthResult> => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: getRedirectUrl()
      }
    })
    return {
      data: data ? { provider: data.provider, url: data.url || '' } : null,
      error
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  const value = {
    user,
    session,
    signIn,
    signUp,
    signInWithGoogle,
    signInWithKakao,
    signOut,
    loading,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}