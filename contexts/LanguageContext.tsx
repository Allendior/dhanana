"use client"
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import en from '@/messages/en.json'
import hi from '@/messages/hi.json'
import hy from '@/messages/hy.json'

export type Language = 'en' | 'hi' | 'hy'

const messages: Record<Language, Record<string, unknown>> = { en, hi, hy }

function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const parts = path.split('.')
  let current: unknown = obj
  for (const part of parts) {
    if (current && typeof current === 'object') {
      current = (current as Record<string, unknown>)[part]
    } else {
      return path
    }
  }
  return typeof current === 'string' ? current : path
}

interface LanguageContextType {
  lang: Language
  setLang: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
  t: (key) => key,
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('en')

  useEffect(() => {
    try {
      const stored = localStorage.getItem('dhanana-lang') as Language | null
      if (stored && ['en', 'hi', 'hy'].includes(stored)) {
        setLangState(stored)
      }
    } catch {}
  }, [])

  const setLang = useCallback((l: Language) => {
    setLangState(l)
    try { localStorage.setItem('dhanana-lang', l) } catch {}
  }, [])

  const t = useCallback((key: string): string => {
    const val = getNestedValue(messages[lang], key)
    if (val !== key) return val
    return getNestedValue(messages.en, key)
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
