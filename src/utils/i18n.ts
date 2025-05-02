import deTranslations from '@/locales/de.json'
import enTranslations from '@/locales/en.json'

interface NestedTranslations {
  [key: string]: string | NestedTranslations
}

const translations: Record<string, NestedTranslations> = {
  de: deTranslations,
  en: enTranslations,
}

export const defaultLanguage = 'de'

export function getTranslation(key: string, language: string = defaultLanguage): string {
  const keys = key.split('.')
  let result: unknown = translations[language] || translations[defaultLanguage]

  for (const k of keys) {
    if (result && typeof result === 'object' && k in (result as object)) {
      result = (result as Record<string, unknown>)[k]
    } else {
      // Fallback to default language if key not found in specified language
      result = getTranslationFromLanguage(key, defaultLanguage)
      break
    }
  }

  return typeof result === 'string' ? result : key
}

function getTranslationFromLanguage(key: string, language: string): string {
  const keys = key.split('.')
  let result: unknown = translations[language]

  for (const k of keys) {
    if (result && typeof result === 'object' && k in (result as object)) {
      result = (result as Record<string, unknown>)[k]
    } else {
      return key
    }
  }

  return typeof result === 'string' ? result : key
}

export function getAvailableLanguages(): string[] {
  return Object.keys(translations)
}
