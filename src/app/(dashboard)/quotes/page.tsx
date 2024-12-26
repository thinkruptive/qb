import { createServerClient } from '@/lib/supabase/server'
import { QuoteList } from '@/components/quotes/QuoteList'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function QuotesPage() {
  const supabase = createServerClient()
  
  const { data: quotes, error } = await supabase
    .from('quotes')
    .select(`
      *,
      items:quote_items(*)
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching quotes:', error)
    return <div>Error loading quotes</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quotes</h1>
        <Button asChild>
          <Link href="/quotes/new">Create New Quote</Link>
        </Button>
      </div>
      <QuoteList quotes={quotes} />
    </div>
  )
} 