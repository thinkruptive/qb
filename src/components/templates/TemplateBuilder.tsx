'use client'

import { useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Product, QuoteTemplate } from '@/types/supabase'
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const templateSchema = z.object({
  name: z.string().min(1, 'Template name is required'),
  vertical: z.string().min(1, 'Vertical is required'),
  default_products: z.array(z.object({
    product_id: z.string(),
    default_options: z.record(z.any()),
  })),
})

type TemplateFormData = z.infer<typeof templateSchema>

interface TemplateBuilderProps {
  template?: QuoteTemplate
  verticals: { id: string; name: string }[]
  products: Product[]
}

export function TemplateBuilder({ template, verticals, products }: TemplateBuilderProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<TemplateFormData>({
    resolver: zodResolver(templateSchema),
    defaultValues: template || {
      default_products: [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'default_products',
  })

  const onSubmit = async (data: TemplateFormData) => {
    setIsSubmitting(true)
    const supabase = createClient()

    try {
      if (template) {
        const { error } = await supabase
          .from('quote_templates')
          .update(data)
          .eq('id', template.id)

        if (error) throw error
        toast.success('Template updated successfully')
      } else {
        const { error } = await supabase
          .from('quote_templates')
          .insert(data)

        if (error) throw error
        toast.success('Template created successfully')
      }

      router.push('/templates')
      router.refresh()
    } catch (error) {
      console.error('Error saving template:', error)
      toast.error('Failed to save template')
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
              <FormLabel>Template Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="vertical"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Vertical</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a vertical" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {verticals.map((vertical) => (
                    <SelectItem key={vertical.id} value={vertical.id}>
                      {vertical.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Default Products</h3>
            <Button
              type="button"
              variant="outline"
              onClick={() => append({ product_id: '', default_options: {} })}
            >
              Add Product
            </Button>
          </div>

          {fields.map((field, index) => (
            <Card key={field.id}>
              <CardContent className="pt-6">
                <div className="flex justify-between gap-4">
                  <FormField
                    control={form.control}
                    name={`default_products.${index}.product_id`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Product</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a product" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {products.map((product) => (
                              <SelectItem key={product.id} value={product.id}>
                                {product.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : template ? 'Update Template' : 'Create Template'}
        </Button>
      </form>
    </Form>
  )
} 