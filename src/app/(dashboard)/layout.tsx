import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'
import { DashboardLayout } from '@/components/layouts/DashboardLayout'

export default async function Layout({ children }: { children: React.ReactNode }) {
  const supabase = createServerClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', session.user.id)
    .single()

  if (!profile) {
    // Create profile if it doesn't exist
    await supabase.from('user_profiles').insert({
      id: session.user.id,
      email: session.user.email,
      name: session.user.user_metadata.full_name,
      role: 'SALES_REP', // Default role
    })
  }

  return <DashboardLayout>{children}</DashboardLayout>
} 