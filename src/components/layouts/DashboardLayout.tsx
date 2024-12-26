import { ReactNode } from 'react'
import { Navigation } from './Navigation'
import { UserNav } from './UserNav'
import { MobileNav } from './MobileNav'
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs'

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-1 min-h-0 bg-card">
          <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
            <div className="flex-1 px-3 space-y-1 bg-card">
              <Navigation />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 md:pl-64">
        <div className="sticky top-0 z-10 flex h-16 bg-background">
          <div className="flex items-center justify-between w-full px-4">
            <div className="flex items-center">
              <MobileNav />
              <Breadcrumbs />
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <UserNav />
            </div>
          </div>
        </div>
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 