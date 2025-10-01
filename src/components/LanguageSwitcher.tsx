'use client'

import Link from 'next/link'

export const LanguageSwitcher = () => {
  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2 rounded-lg bg-white p-2 print:hidden">
      <Link type={'button'} href="lang/de" className={`h-10 w-10 rounded transition-all`} title="Deutsch">
        <span className="text-2xl">🇩🇪</span>
      </Link>
      <Link type={'button'} href="lang/en" className={`h-10 w-10 rounded transition-all`} title="English">
        <span className="text-2xl">🇬🇧</span>
      </Link>
    </div>
  )
}
