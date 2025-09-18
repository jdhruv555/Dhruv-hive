import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import Card from '../components/Card'

type Status = 'active' | 'completed' | 'pending'

type Project = {
  id: string
  name: string
  description?: string
  status: Status
  tags?: string[]
  github?: string
  live?: string
}

const STATUSES: Status[] = ['active', 'completed', 'pending']

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState<Status>('active')
  const [tags, setTags] = useState('')
  const [github, setGithub] = useState('')
  const [live, setLive] = useState('')
  const [filter, setFilter] = useState<Status | 'all'>('all')
  const [query, setQuery] = useState('')

  useEffect(() => {
    try {
      const raw = localStorage.getItem('dhruv.projects')
      if (raw) setProjects(JSON.parse(raw))
    } catch {}
  }, [])

  useEffect(() => {
    try { localStorage.setItem('dhruv.projects', JSON.stringify(projects)) } catch {}
  }, [projects])

  const filtered = useMemo(() => {
    let list = [...projects]
    if (filter !== 'all') list = list.filter((p) => p.status === filter)
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        (p.description || '').toLowerCase().includes(q) ||
        (p.tags || []).join(' ').toLowerCase().includes(q)
      )
    }
    return list
  }, [projects, filter, query])

  const addProject = () => {
    const n = name.trim()
    if (!n) return
    const newProject: Project = {
      id: crypto.randomUUID(),
      name: n,
      description: description.trim() || undefined,
      status,
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      github: github.trim() || undefined,
      live: live.trim() || undefined,
    }
    setProjects((cur) => [newProject, ...cur])
    setName('')
    setDescription('')
    setStatus('active')
    setTags('')
    setGithub('')
    setLive('')
  }

  const updateStatus = (id: string, s: Status) => {
    setProjects((cur) => cur.map((p) => (p.id === id ? { ...p, status: s } : p)))
  }

  const deleteProject = (id: string) => {
    setProjects((cur) => cur.filter((p) => p.id !== id))
  }

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <h1 className="text-2xl md:text-3xl font-semibold">Projects</h1>

      <Card title="Add Project">
        <div className="grid gap-3 md:grid-cols-2">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="rounded-xl border border-ink-700 bg-ink-900/50 px-3 py-2 outline-none focus:ring-2 focus:ring-primary-600" />
          <select value={status} onChange={(e) => setStatus(e.target.value as Status)} className="rounded-xl border border-ink-700 bg-ink-900/50 px-3 py-2">
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <input value={github} onChange={(e) => setGithub(e.target.value)} placeholder="GitHub URL (optional)" className="rounded-xl border border-ink-700 bg-ink-900/50 px-3 py-2 outline-none focus:ring-2 focus:ring-primary-600" />
          <input value={live} onChange={(e) => setLive(e.target.value)} placeholder="Live URL (optional)" className="rounded-xl border border-ink-700 bg-ink-900/50 px-3 py-2 outline-none focus:ring-2 focus:ring-primary-600" />
          <input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Tags (comma separated)" className="rounded-xl border border-ink-700 bg-ink-900/50 px-3 py-2 outline-none focus:ring-2 focus:ring-primary-600 md:col-span-2" />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description (optional)" rows={3} className="rounded-xl border border-ink-700 bg-ink-900/50 px-3 py-2 outline-none focus:ring-2 focus:ring-primary-600 md:col-span-2" />
          <div className="md:col-span-2">
            <button onClick={addProject} className="rounded-xl px-4 py-2 bg-primary-600 text-white hover:bg-primary-500">Add</button>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <div className="flex rounded-xl border border-ink-700 overflow-hidden">
            {(['all', ...STATUSES] as const).map((s) => (
              <button key={String(s)} onClick={() => setFilter(s as any)} className={`px-3 py-2 text-sm ${filter === s ? 'bg-ink-700' : 'bg-ink-900/50 hover:bg-ink-800/60'}`}>{String(s)}</button>
            ))}
          </div>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search projects..." className="rounded-xl border border-ink-700 bg-ink-900/50 px-3 py-2 outline-none focus:ring-2 focus:ring-primary-600" />
        </div>
      </Card>

      <div className="grid gap-3 md:grid-cols-3">
        <AnimatePresence initial={false}>
          {filtered.map((p) => (
            <motion.div key={p.id} layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="rounded-2xl border border-ink-700 bg-ink-800/60 overflow-hidden">
              <div className="p-4 space-y-2">
                <div className="flex items-start gap-2">
                  <h3 className="text-lg font-semibold flex-1">{p.name}</h3>
                  <select value={p.status} onChange={(e) => updateStatus(p.id, e.target.value as Status)} className="text-xs rounded-lg border border-ink-700 bg-ink-900/50 px-2 py-1">
                    {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                {p.description ? <p className="text-sm opacity-80">{p.description}</p> : null}
                {p.tags && p.tags.length ? (
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((t, i) => <span key={i} className="text-xs px-2 py-1 rounded-lg border border-ink-700">{t}</span>)}
                  </div>
                ) : null}
                <div className="flex gap-2 pt-1">
                  {p.github ? <a className="text-sm underline opacity-90 hover:opacity-100" href={p.github} target="_blank">GitHub</a> : null}
                  {p.live ? <a className="text-sm underline opacity-90 hover:opacity-100" href={p.live} target="_blank">Live</a> : null}
                  <button onClick={() => deleteProject(p.id)} className="ml-auto text-xs px-2 py-1 rounded-lg border border-ink-700 hover:bg-ink-700">Delete</button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}


