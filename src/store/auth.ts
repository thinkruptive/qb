import { create } from 'zustand'
import { createClient } from '@/lib/supabase/client'
import { UserProfile } from '@/types/supabase'

interface AuthState {
  user: UserProfile | null
  isLoading: boolean
  setUser: (user: UserProfile | null) => void
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => set({ user }),
  signInWithGoogle: async () => {
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (error) throw error
  },
  signOut: async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    set({ user: null })
  },
})) 