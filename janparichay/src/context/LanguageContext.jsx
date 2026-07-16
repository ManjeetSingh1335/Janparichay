import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

const LanguageContext = createContext(null)

const LANGUAGES = [
  { code: 'en', name: 'English',   nativeName: 'English'  },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം'   },
  { code: 'hi', name: 'Hindi',     nativeName: 'हिन्दी'   },
  { code: 'te', name: 'Telugu',    nativeName: 'తెలుగు'   },
  { code: 'mr', name: 'Marathi',   nativeName: 'मराठी'    },
  { code: 'ta', name: 'Tamil',     nativeName: 'தமிழ்'    },
  { code: 'or', name: 'Odia',      nativeName: 'ଓଡ଼ିଆ'    },
]

export function LanguageProvider({ children }) {
  const [langCode, setLangCode] = useState(() => localStorage.getItem('jp_lang') || 'en')
  const [translations, setTranslations] = useState({})

  // Dynamically load the correct JSON whenever langCode changes
  useEffect(() => {
    async function loadTranslations() {
      try {
        const module = await import(`../locales/${langCode}.json`)
        setTranslations(module.default)
      } catch {
        // fallback: try loading English if the lang file doesn't exist yet
        try {
          const fallback = await import('../locales/en.json')
          setTranslations(fallback.default)
        } catch {
          setTranslations({})
        }
      }
    }
    loadTranslations()
  }, [langCode])

  const changeLanguage = useCallback((code) => {
    setLangCode(code)
    localStorage.setItem('jp_lang', code)
  }, [])

  // t(key) — returns the translated string, or falls back to the key itself
  const t = useCallback((key) => {
    return translations[key] ?? key
  }, [translations])

  return (
    <LanguageContext.Provider value={{ langCode, changeLanguage, t, languages: LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider')
  return ctx
}
