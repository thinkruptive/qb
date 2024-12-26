import { createServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function AppointmentsPage() {
  const supabase = createServerClient()
  
  const { data: appointments, error } = await supabase
    .from('appointments')
    .select('*')
    .order('date', { ascending: true })

  if (error) {
    console.error('Error fetching appointments:', error)
    return <div>Error loading appointments</div>
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Appointments</h1>
      {/* Render appointments */}
    </div>
  )
} 