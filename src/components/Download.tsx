'use client'

import { useTranslation } from '@/hooks/useTranslation'

export const Download = () => {
  const { t } = useTranslation()

  return (
    <button
      onClick={() => window.print()}
      className="fixed right-6 bottom-6 z-50 rounded bg-[hsl(0,80%,42%)] px-4 py-2 text-white shadow-md hover:bg-[hsl(0,80%,35%)] disabled:opacity-50 print:hidden"
    >
      {t('actions.print')}
    </button>
  )
}
