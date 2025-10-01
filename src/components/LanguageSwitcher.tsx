'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const LanguageSwitcher = () => {
  const pathname = usePathname() // e.g. "/alex/schaltstelle/de"

  const parts = pathname.split('/').filter(Boolean)
  const currentLang = parts[parts.length - 1] // assumes last segment = lang

  const makeLangPath = (lang: string) => {
    if (parts.length >= 3) {
      const newParts = [...parts]
      newParts[newParts.length - 1] = lang
      return '/' + newParts.join('/') + '/'
    }
    return pathname
  }

  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2 rounded-lg bg-white p-2 print:hidden">
      <Link
        href={makeLangPath('de')}
        className={`h-10 w-10 rounded transition-all ${
          currentLang === 'de' ? 'scale-110 ring-2 ring-blue-500' : 'opacity-60 hover:opacity-100'
        }`}
        title="Deutsch"
      >
        <span className="text-2xl">🇩🇪</span>
      </Link>
      <Link
        href={makeLangPath('en')}
        className={`h-10 w-10 rounded transition-all ${
          currentLang === 'en' ? 'scale-110 ring-2 ring-blue-500' : 'opacity-60 hover:opacity-100'
        }`}
        title="English"
      >
        <span className="text-2xl">🇬🇧</span>
      </Link>
    </div>
  )
}
