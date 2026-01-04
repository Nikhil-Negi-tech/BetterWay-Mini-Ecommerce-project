import { useEffect, useMemo, useState } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'betterway.theme.v1'

function getInitialTheme(): Theme {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
  }

  const prefersDark =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches

  return prefersDark ? 'dark' : 'light'
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme())

  useEffect(() => {
    applyTheme(theme)
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
    }
  }, [theme])

  return useMemo(
    () => ({
      theme,
      isDark: theme === 'dark',
      setTheme,
      toggleTheme() {
        setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
      },
    }),
    [theme],
  )
}
