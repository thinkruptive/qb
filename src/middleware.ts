import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { adminMiddleware } from './middleware/adminAuth'

export async function middleware(req: NextRequest) {
  // Handle admin routes first
  if (req.nextUrl.pathname.startsWith('/admin') || req.nextUrl.pathname.startsWith('/(admin)')) {
    return adminMiddleware(req)
  }

  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Handle auth routes
  if (!session && req.nextUrl.pathname.startsWith('/(dashboard)')) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (session && (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/signup')) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return res
}

export const config = {
  matcher: [
    '/(dashboard)/:path*',
    '/admin/:path*',
    '/(admin)/:path*',
    '/login',
    '/signup',
  ],
} 