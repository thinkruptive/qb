'use client'

import { useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Product, ProductOption } from '@/types/supabase'
import { createClient } from '@/lib/supabase/client'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  description: z.string(),
  category: z.string().min(1, 'Category is required'),
  vertical: z.string().min(1, 'Vertical is required'),
  base_price: z.number().min(0),
  options: z.array(z.object({
    name: z.string().min(1),
    type: z.enum(['checkbox', 'select', 'number']),
    values: z.array(z.string()),
    price_modifier: z.number(),
  })),
})

type ProductFormData = z.infer<typeof productSchema>

interface ProductFormProps {
  product?: Product
  verticals: { id: string; name: string }[]
}

export function ProductForm({ product, verticals }: ProductFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: product || {
      options: [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'options',
  })

  const onSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true)
    const supabase = createClient()

    try {
      if (product) {
        const { error } = await supabase
          .from('products')
          .update(data)
          .eq('id', product.id)

        if (error) throw error
        toast.success('Product updated successfully')
      } else {
        const { error } = await supabase
          .from('products')
          .insert(data)

        if (error) throw error
        toast.success('Product created successfully')
      }

      router.push('/products')
      router.refresh()
    } catch (error) {
      console.error('Error saving product:', error)
      toast.error('Failed to save product')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Add other form fields */}
        
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : product ? 'Update Product' : 'Create Product'}
        </Button>
      </form>
    </Form>
  )
} 