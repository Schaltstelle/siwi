'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const LanguageSwitcher = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentLang = searchParams.get('lang') || 'de'

  const switchLanguage = (lang: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('lang', lang)
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2 rounded-lg bg-white p-2 print:hidden">
      <button
        onClick={() => switchLanguage('de')}
        className={`h-10 w-10 rounded transition-all ${
          currentLang === 'de' ? 'scale-110 ring-2 ring-blue-500' : 'opacity-60 hover:opacity-100'
        }`}
        title="Deutsch"
      >
        <span className="text-2xl">🇩🇪</span>
      </button>
      <button
        onClick={() => switchLanguage('en')}
        className={`h-10 w-10 rounded transition-all ${
          currentLang === 'en' ? 'scale-110 ring-2 ring-blue-500' : 'opacity-60 hover:opacity-100'
        }`}
        title="English"
      >
        <span className="text-2xl">🇬🇧</span>
      </button>
    </div>
  )
}
