'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth'
import { DashboardLayout } from './DashboardLayout'

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const user = useAuthStore((state) => state.user)

  useEffect(() => {
    if (user && user.role !== 'ADMIN') {
      router.push('/dashboard')
    }
  }, [user, router])

  if (!user || user.role !== 'ADMIN') {
    return null
  }

  return <DashboardLayout>{children}</DashboardLayout>
} 