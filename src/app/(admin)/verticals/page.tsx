import { createServerClient } from '@/lib/supabase/server'
import { VerticalList } from '@/components/verticals/VerticalList'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function VerticalsPage() {
  const supabase = createServerClient()
  
  const { data: verticals, error } = await supabase
    .from('verticals')
    .select('*')
    .order('name')

  if (error) {
    console.error('Error fetching verticals:', error)
    return <div>Error loading verticals</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Business Verticals</h1>
        <Button asChild>
          <Link href="/verticals/new">Create Vertical</Link>
        </Button>
      </div>
      <VerticalList verticals={verticals} />
    </div>
  )
} 