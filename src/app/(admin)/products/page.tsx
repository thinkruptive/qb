import { createServerClient } from '@/lib/supabase/server'
import { ProductList } from '@/components/products/ProductList'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function ProductsPage() {
  const supabase = createServerClient()
  
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('name')

  if (error) {
    console.error('Error fetching products:', error)
    return <div>Error loading products</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <div className="space-x-4">
          <Button asChild variant="outline">
            <Link href="/products/import">Import Products</Link>
          </Button>
          <Button asChild>
            <Link href="/products/new">Create Product</Link>
          </Button>
        </div>
      </div>
      <ProductList products={products} />
    </div>
  )
} 