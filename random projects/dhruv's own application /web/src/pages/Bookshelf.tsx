import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import Card from '../components/Card'

type Section = 'AI/ML' | 'Science' | 'Self-Help' | 'Exec'
type Status = 'to-read' | 'reading' | 'finished'

type Book = {
  id: string
  title: string
  author?: string
  cover?: string
  section: Section
  status: Status
}

const SECTIONS: Section[] = ['AI/ML', 'Science', 'Self-Help', 'Exec']
const STATUSES: Status[] = ['to-read', 'reading', 'finished']

export default function Bookshelf() {
  const [books, setBooks] = useState<Book[]>([])
  const [section, setSection] = useState<Section>('AI/ML')
  const [filterSection, setFilterSection] = useState<Section | 'all'>('all')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [cover, setCover] = useState('')
  const [status, setStatus] = useState<Status>('to-read')
  const [query, setQuery] = useState('')

  useEffect(() => {
    try {
      const raw = localStorage.getItem('dhruv.books')
      if (raw) setBooks(JSON.parse(raw))
    } catch {}
  }, [])

  useEffect(() => {
    try { localStorage.setItem('dhruv.books', JSON.stringify(books)) } catch {}
  }, [books])

  const filtered = useMemo(() => {
    let list = [...books]
    if (filterSection !== 'all') list = list.filter((b) => b.section === filterSection)
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter((b) => b.title.toLowerCase().includes(q) || (b.author || '').toLowerCase().includes(q))
    }
    return list
  }, [books, filterSection, query])

  const addBook = () => {
    const t = title.trim()
    if (!t) return
    setBooks((cur) => [
      { id: crypto.randomUUID(), title: t, author: author.trim() || undefined, cover: cover.trim() || undefined, section, status },
      ...cur,
    ])
    setTitle('')
    setAuthor('')
    setCover('')
    setStatus('to-read')
  }

  const updateStatus = (id: string, s: Status) => {
    setBooks((cur) => cur.map((b) => (b.id === id ? { ...b, status: s } : b)))
  }

  const deleteBook = (id: string) => {
    setBooks((cur) => cur.filter((b) => b.id !== id))
  }

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <h1 className="text-2xl md:text-3xl font-semibold">Bookshelf</h1>

      <Card title="Add Book">
        <div className="grid gap-3 md:grid-cols-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="rounded-xl border border-ink-700 bg-ink-900/50 px-3 py-2 outline-none focus:ring-2 focus:ring-primary-600"
          />
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Author (optional)"
            className="rounded-xl border border-ink-700 bg-ink-900/50 px-3 py-2 outline-none focus:ring-2 focus:ring-primary-600"
          />
          <input
            value={cover}
            onChange={(e) => setCover(e.target.value)}
            placeholder="Cover URL (optional)"
            className="rounded-xl border border-ink-700 bg-ink-900/50 px-3 py-2 outline-none focus:ring-2 focus:ring-primary-600"
          />
          <div className="grid grid-cols-3 gap-3">
            <select value={section} onChange={(e) => setSection(e.target.value as Section)} className="rounded-xl border border-ink-700 bg-ink-900/50 px-3 py-2">
              {SECTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <select value={status} onChange={(e) => setStatus(e.target.value as Status)} className="rounded-xl border border-ink-700 bg-ink-900/50 px-3 py-2">
              {STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <button onClick={addBook} className="rounded-xl px-4 py-2 bg-primary-600 text-white hover:bg-primary-500">Add</button>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <div className="flex gap-2">
            <div className="flex rounded-xl border border-ink-700 overflow-hidden">
              {(['all', ...SECTIONS] as const).map((s) => (
                <button
                  key={String(s)}
                  onClick={() => setFilterSection(s as any)}
                  className={`px-3 py-2 text-sm ${filterSection === s ? 'bg-ink-700' : 'bg-ink-900/50 hover:bg-ink-800/60'}`}
                >
                  {String(s)}
                </button>
              ))}
            </div>
          </div>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title or author..."
            className="rounded-xl border border-ink-700 bg-ink-900/50 px-3 py-2 outline-none focus:ring-2 focus:ring-primary-600"
          />
        </div>
      </Card>

      {STATUSES.map((st) => (
        <div key={st} className="space-y-3">
          <h2 className="text-lg font-semibold capitalize">{st.replace('-', ' ')}</h2>
          <div className="grid gap-3 md:grid-cols-4">
            <AnimatePresence initial={false}>
              {filtered.filter((b) => b.status === st).map((b) => (
                <motion.div
                  key={b.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="rounded-2xl overflow-hidden border border-ink-700 bg-ink-800/60"
                >
                  {b.cover ? (
                    <img src={b.cover} alt={b.title} className="w-full h-40 object-cover" />
                  ) : (
                    <div className="w-full h-40 bg-ink-900/50 flex items-center justify-center text-sm opacity-70">No cover</div>
                  )}
                  <div className="p-3 space-y-2">
                    <div className="font-semibold leading-tight">{b.title}</div>
                    {b.author ? <div className="text-sm opacity-80">by {b.author}</div> : null}
                    <div className="flex gap-2 items-center">
                      <select value={b.status} onChange={(e) => updateStatus(b.id, e.target.value as Status)} className="text-sm rounded-lg border border-ink-700 bg-ink-900/50 px-2 py-1">
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <button onClick={() => deleteBook(b.id)} className="ml-auto text-xs px-2 py-1 rounded-lg border border-ink-700 hover:bg-ink-700">Delete</button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      ))}
    </motion.div>
  )
}


