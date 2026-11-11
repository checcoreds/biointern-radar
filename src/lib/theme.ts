import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

/** A per-viewer display preference, separate from saved opportunities. */
export const THEME_STORAGE_KEY = 'biointern-radar:theme'

function storedTheme(): Theme | null {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY)
    return value === 'light' || value === 'dark' ? value : null
  } catch {
    return null
  }
}

function systemTheme(): Theme {
  return typeof matchMedia === 'function' &&
    matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

/** Apply a saved choice before React renders, so the page never flashes. */
export function applyStoredTheme(): void {
  const theme = storedTheme()
  if (theme) document.documentElement.dataset.theme = theme
}

/**
 * index.html ships one browser-toolbar colour per device setting. Once the
 * visitor picks a theme, both must show the chosen page colour instead.
 */
function syncBrowserChrome(): void {
  const page = getComputedStyle(document.documentElement).backgroundColor
  if (!page) return
  document
    .querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')
    .forEach((meta) => {
      meta.content = page
    })
}

/**
 * The visible theme: an explicit choice if the visitor made one, otherwise
 * the device's light/dark setting (which CSS also follows on its own).
 */
export function useTheme() {
  const [choice, setChoice] = useState<Theme | null>(storedTheme)
  const [system, setSystem] = useState<Theme>(systemTheme)

  useEffect(() => {
    if (typeof matchMedia !== 'function') return
    const media = matchMedia('(prefers-color-scheme: dark)')
    const update = () => setSystem(media.matches ? 'dark' : 'light')
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const sync = (event: StorageEvent) => {
      if (event.key === THEME_STORAGE_KEY) setChoice(storedTheme())
    }
    window.addEventListener('storage', sync)
    return () => window.removeEventListener('storage', sync)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (choice) root.dataset.theme = choice
    else delete root.dataset.theme
    if (choice) syncBrowserChrome()
  }, [choice])

  const theme = choice ?? system
  const toggle = useCallback(() => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    setChoice(next)
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch {
      /* The choice still applies for this visit. */
    }
  }, [theme])

  return { theme, toggle }
}
