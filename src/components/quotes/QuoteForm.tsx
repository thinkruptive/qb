'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Product } from '@/types/supabase'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const quoteSchema = z.object({
  client_name: z.string().min(1, 'Client name is required'),
  client_email: z.string().email('Invalid email address'),
  items: z.array(z.object({
    product_id: z.string(),
    quantity: z.number().min(1),
    unit_price: z.number().min(0),
    options: z.record(z.any()),
  })).min(1, 'At least one item is required'),
})

type QuoteFormData = z.infer<typeof quoteSchema>

interface QuoteFormProps {
  products: Product[]
}

export function QuoteForm({ products }: QuoteFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const { register, handleSubmit, formState: { errors } } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
  })

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true)
    const supabase = createClient()

    try {
      const { data: quote, error } = await supabase
        .from('quotes')
        .insert({
          client_name: data.client_name,
          client_email: data.client_email,
          status: 'DRAFT',
          total_amount: data.items.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0),
        })
        .select()
        .single()

      if (error) throw error

      const { error: itemsError } = await supabase
        .from('quote_items')
        .insert(
          data.items.map(item => ({
            quote_id: quote.id,
            ...item,
            subtotal: item.quantity * item.unit_price,
          }))
        )

      if (itemsError) throw itemsError

      toast.success('Quote created successfully')
      router.push('/quotes')
    } catch (error) {
      console.error('Error creating quote:', error)
      toast.error('Failed to create quote')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Form fields will go here */}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Creating...' : 'Create Quote'}
      </Button>
    </form>
  )
} 