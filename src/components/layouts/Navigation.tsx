'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/store/auth'
import { getAuthorizedNavigation } from '@/config/navigation'
import { Button } from '@/components/ui/button'

export function Navigation() {
  const pathname = usePathname()
  const user = useAuthStore((state) => state.user)
  const navigation = getAuthorizedNavigation(user)

  return (
    <nav className="space-y-6">
      {navigation.map((section) => (
        <div key={section.title} className="space-y-2">
          <h2 className="text-lg font-semibold tracking-tight">
            {section.title}
          </h2>
          <div className="space-y-1">
            {section.items.map((item) => (
              <Button
                key={item.href}
                variant={pathname === item.href ? 'secondary' : 'ghost'}
                className={cn(
                  'w-full justify-start',
                  pathname === item.href && 'bg-muted'
                )}
                asChild
              >
                <Link href={item.href}>{item.title}</Link>
              </Button>
            ))}
          </div>
        </div>
      ))}
    </nav>
  )
} 