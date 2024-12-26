'use client'

import { Product } from '@/types/supabase'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { formatCurrency } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

interface ProductCatalogProps {
  products: Product[]
  vertical?: string
  onSelect?: (product: Product) => void
}

export function ProductCatalog({ products, vertical, onSelect }: ProductCatalogProps) {
  const filteredProducts = vertical 
    ? products.filter(p => p.vertical === vertical)
    : products

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProducts.map((product) => (
        <Card 
          key={product.id}
          className={`cursor-pointer transition-shadow hover:shadow-lg ${
            onSelect ? 'hover:border-primary' : ''
          }`}
          onClick={() => onSelect?.(product)}
        >
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
              </div>
              <Badge>{product.category}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-lg font-bold">
                {formatCurrency(product.base_price)}
              </div>
              {product.options.length > 0 && (
                <div className="text-sm text-gray-500">
                  {product.options.length} customization options available
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 