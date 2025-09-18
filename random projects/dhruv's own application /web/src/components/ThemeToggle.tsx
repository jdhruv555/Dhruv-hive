import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('dhruv.theme')
      if (saved) setDark(saved === 'dark')
      else setDark(true) // default dark
    } catch {}
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (dark) root.classList.add('dark')
    else root.classList.remove('dark')
    try { localStorage.setItem('dhruv.theme', dark ? 'dark' : 'light') } catch {}
  }, [dark])

  return (
    <button
      onClick={() => setDark((v) => !v)}
      className="ml-auto rounded-xl border border-ink-700 bg-ink-900/50 px-3 py-2 text-sm hover:bg-ink-800/60"
      aria-label="Toggle theme"
    >
      {dark ? 'Dark' : 'Light'}
    </button>
  )
}
