import { UserProfile } from '@/types/supabase'

export type NavItem = {
  title: string
  href: string
  icon?: string
  roles?: ('ADMIN' | 'SALES_REP')[]
}

export type NavSection = {
  title: string
  items: NavItem[]
  roles?: ('ADMIN' | 'SALES_REP')[]
}

export const navigationConfig: NavSection[] = [
  {
    title: 'Dashboard',
    items: [
      {
        title: 'Appointments',
        href: '/appointments',
      },
      {
        title: 'Quotes',
        href: '/quotes',
      },
      {
        title: 'Product Catalog',
        href: '/products/catalog',
      },
    ],
  },
  {
    title: 'Administration',
    roles: ['ADMIN'],
    items: [
      {
        title: 'Products',
        href: '/admin/products',
      },
      {
        title: 'Verticals',
        href: '/admin/verticals',
      },
      {
        title: 'Templates',
        href: '/admin/templates',
      },
      {
        title: 'Users',
        href: '/admin/users',
      },
    ],
  },
  {
    title: 'Settings',
    items: [
      {
        title: 'Profile',
        href: '/settings/profile',
      },
      {
        title: 'Preferences',
        href: '/settings/preferences',
      },
      {
        title: 'Team Settings',
        href: '/settings/team',
        roles: ['ADMIN'],
      },
    ],
  },
]

export function getAuthorizedNavigation(user: UserProfile | null) {
  if (!user) return []

  return navigationConfig.filter(section => {
    // Check if section is restricted by role
    if (section.roles && !section.roles.includes(user.role)) {
      return false
    }

    // Filter items based on role
    const authorizedItems = section.items.filter(item => {
      if (!item.roles) return true
      return item.roles.includes(user.role)
    })

    // Only include section if it has authorized items
    return authorizedItems.length > 0
  }).map(section => ({
    ...section,
    items: section.items.filter(item => {
      if (!item.roles) return true
      return item.roles.includes(user.role)
    }),
  }))
} 