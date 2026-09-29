import en from './locales/en.js'
import ar from './locales/ar.js'
import es from './locales/es.js'
import it from './locales/it.js'

export const supportedLanguages = ['en', 'ar', 'es', 'it']

export const languageOptions = [
  { code: 'en', label: 'English' },
  { code: 'ar', label: 'العربية' },
  { code: 'es', label: 'Español' },
  { code: 'it', label: 'Italiano' },
]

export const translations = {
  en,
  ar,
  es,
  it,
}

export const defaultLanguage = 'en'

function getNestedValue(target, path) {
  if (!target || typeof target !== 'object') return undefined

  return path.split('.').reduce((current, segment) => {
    if (current == null) return undefined
    return current[segment]
  }, target)
}

export function resolveTranslation(language, key, variables = {}) {
  const activeLanguage = supportedLanguages.includes(language) ? language : defaultLanguage
  const fallbackLanguage = defaultLanguage

  const candidateKeys = [activeLanguage, fallbackLanguage]

  for (const localeKey of candidateKeys) {
    const value = getNestedValue(translations[localeKey], key)
    if (typeof value === 'string') {
      return value.replace(/{{(\w+)}}/g, (_, name) => variables[name] ?? `{{${name}}}`)
    }
  }

  return key
}

export function createTranslator(language) {
  return (key, variables = {}) => resolveTranslation(language, key, variables)
}
