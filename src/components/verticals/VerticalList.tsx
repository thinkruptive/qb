'use client'

import { Vertical } from '@/types/supabase'
import { Switch } from '@/components/ui/switch'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface VerticalListProps {
  verticals: Vertical[]
}

export function VerticalList({ verticals }: VerticalListProps) {
  const router = useRouter()
  
  const toggleActive = async (vertical: Vertical) => {
    const supabase = createClient()
    
    try {
      const { error } = await supabase
        .from('verticals')
        .update({ active: !vertical.active })
        .eq('id', vertical.id)

      if (error) throw error
      
      toast.success(`${vertical.name} ${vertical.active ? 'deactivated' : 'activated'}`)
      router.refresh()
    } catch (error) {
      console.error('Error toggling vertical:', error)
      toast.error('Failed to update vertical')
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Categories</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {verticals.map((vertical) => (
          <TableRow key={vertical.id}>
            <TableCell className="font-medium">{vertical.name}</TableCell>
            <TableCell>{vertical.description}</TableCell>
            <TableCell>{vertical.categories.join(', ')}</TableCell>
            <TableCell>
              <Switch
                checked={vertical.active}
                onCheckedChange={() => toggleActive(vertical)}
              />
            </TableCell>
            <TableCell>
              <Link
                href={`/verticals/${vertical.id}`}
                className="text-blue-500 hover:text-blue-700"
              >
                Edit
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
} 