import { createServerClient } from '@/lib/supabase/server'
import { ProductCatalog } from '@/components/products/ProductCatalog'

export default async function ProductCatalogPage() {
  const supabase = createServerClient()
  
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('name')

  if (error) {
    console.error('Error fetching products:', error)
    return <div>Error loading product catalog</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Product Catalog</h1>
      <ProductCatalog products={products} />
    </div>
  )
} 