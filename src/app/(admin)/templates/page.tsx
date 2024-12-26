import { createServerClient } from '@/lib/supabase/server'
import { TemplateList } from '@/components/templates/TemplateList'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function TemplatesPage() {
  const supabase = createServerClient()
  
  const { data: templates, error } = await supabase
    .from('quote_templates')
    .select(`
      *,
      verticals (
        name
      )
    `)
    .order('name')

  if (error) {
    console.error('Error fetching templates:', error)
    return <div>Error loading templates</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quote Templates</h1>
        <Button asChild>
          <Link href="/templates/new">Create Template</Link>
        </Button>
      </div>
      <TemplateList templates={templates} />
    </div>
  )
} 