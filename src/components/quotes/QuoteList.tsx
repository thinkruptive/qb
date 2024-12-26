import { Quote } from '@/types/supabase'
import { formatCurrency } from '@/lib/utils'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

interface QuoteListProps {
  quotes: Quote[]
}

const statusColors = {
  DRAFT: 'bg-gray-500',
  SENT: 'bg-blue-500',
  ACCEPTED: 'bg-green-500',
  REJECTED: 'bg-red-500',
}

export function QuoteList({ quotes }: QuoteListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Client</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Total Amount</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {quotes.map((quote) => (
          <TableRow key={quote.id}>
            <TableCell>
              <div>
                <div className="font-medium">{quote.client_name}</div>
                <div className="text-sm text-gray-500">{quote.client_email}</div>
              </div>
            </TableCell>
            <TableCell>
              <Badge variant="secondary" className={statusColors[quote.status]}>
                {quote.status}
              </Badge>
            </TableCell>
            <TableCell>{formatCurrency(quote.total_amount)}</TableCell>
            <TableCell>{new Date(quote.created_at).toLocaleDateString()}</TableCell>
            <TableCell>
              <Link
                href={`/quotes/${quote.id}`}
                className="text-blue-500 hover:text-blue-700"
              >
                View Details
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
} 