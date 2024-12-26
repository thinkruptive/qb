'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { navigationConfig } from '@/config/navigation'

function getBreadcrumbs(pathname: string) {
  const segments = pathname.split('/').filter(Boolean)
  const breadcrumbs = segments.map((segment, index) => {
    const path = `/${segments.slice(0, index + 1).join('/')}`
    const title = navigationConfig
      .flatMap(section => section.items)
      .find(item => item.href === path)?.title || segment

    return {
      title: title.charAt(0).toUpperCase() + title.slice(1),
      href: path,
    }
  })

  return [{ title: 'Home', href: '/' }, ...breadcrumbs]
}

export function Breadcrumbs() {
  const pathname = usePathname()
  const breadcrumbs = getBreadcrumbs(pathname)

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.href} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="h-4 w-4 text-muted-foreground mx-2" />
            )}
            {index === breadcrumbs.length - 1 ? (
              <span className="text-muted-foreground">
                {breadcrumb.title}
              </span>
            ) : (
              <Link
                href={breadcrumb.href}
                className="text-sm hover:text-primary"
              >
                {breadcrumb.title}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
} 