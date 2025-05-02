'use client'

import { getTranslation } from '@/utils/i18n'
import { useSearchParams } from 'next/navigation'

export function useTranslation() {
  const searchParams = useSearchParams()
  const lang = searchParams?.get('lang') || 'de'

  const t = (key: string): string => {
    return getTranslation(key, lang)
  }

  return { t, lang }
}
