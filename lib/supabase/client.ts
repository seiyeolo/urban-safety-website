import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Check if Supabase is properly configured
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const isSupabaseConfigured =
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'your-supabase-project-url' &&
  supabaseAnonKey !== 'your-supabase-anon-key'

// Create a mock client for when Supabase is not configured
const createMockClient = () => ({
  auth: {
    signInWithPassword: async () => ({
      data: null,
      error: { message: 'Supabase가 설정되지 않았습니다.' }
    }),
    signUp: async () => ({
      data: null,
      error: { message: 'Supabase가 설정되지 않았습니다.' }
    }),
    signOut: async () => ({ error: null }),
    getSession: async () => ({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({
      data: { subscription: { unsubscribe: () => {} } },
      error: null
    })
  }
} as any)

// Export either real Supabase client or mock client
export const supabase: SupabaseClient = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : createMockClient()

export type { User, Session } from '@supabase/supabase-js'