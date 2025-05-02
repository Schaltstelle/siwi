import { getTranslation } from '@/utils/i18n'

export function getServerTranslation(key: string, lang: string = 'de'): string {
  return getTranslation(key, lang)
}
