import { NextRequest, NextResponse } from 'next/server'

export default async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-url', request.url)
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  // Don't invoke Middleware on some paths
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
}
