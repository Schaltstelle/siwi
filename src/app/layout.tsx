import ErrorBoundary from '@/app/error-boundary'
import '@/styles/global.css'
import type { Metadata, Viewport } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: {
    template: '%s',
    default: '',
  },
  description: '',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning className="light h-full antialiased">
      <body>
        <ErrorBoundary>{children}</ErrorBoundary>
      </body>
    </html>
  )
}
