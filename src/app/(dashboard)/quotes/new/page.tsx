import { QuoteForm } from '@/components/quotes/QuoteForm'
import { createServerClient } from '@/lib/supabase/server'

export default async function NewQuotePage() {
  const supabase = createServerClient()
  
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('name')

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Create New Quote</h1>
      <QuoteForm products={products || []} />
    </div>
  )
} 