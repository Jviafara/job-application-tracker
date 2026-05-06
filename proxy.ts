import { NextRequest, NextResponse } from 'next/server'
import { getSession } from './lib/auth/auth'

export default async function proxy(request: NextRequest) {
  // Check if the user is authenticated
  const session = await getSession()

  const isSigInPage = request.nextUrl.pathname.startsWith('/sign-in')
  const isSignUpPage = request.nextUrl.pathname.startsWith('/sign-up')

  if ((isSigInPage || isSignUpPage) && session?.user) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}
