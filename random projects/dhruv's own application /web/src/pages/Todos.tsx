import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import TodoItem, { type Todo } from '../components/TodoItem'

type Filter = 'all' | 'active' | 'done'

export default function Todos() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium')
  const [filter, setFilter] = useState<Filter>('all')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    let list = [...todos]
    if (filter === 'active') list = list.filter((t) => !t.done)
    if (filter === 'done') list = list.filter((t) => t.done)
    if (query.trim()) list = list.filter((t) => t.title.toLowerCase().includes(query.toLowerCase()))
    return list
  }, [todos, filter, query])

  // Load from localStorage once
  useEffect(() => {
    try {
      const raw = localStorage.getItem('dhruv.todos')
      if (raw) setTodos(JSON.parse(raw))
    } catch {}
  }, [])

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('dhruv.todos', JSON.stringify(todos))
    } catch {}
  }, [todos])

  const addTodo = () => {
    const name = title.trim()
    if (!name) return
    setTodos((cur) => [
      { id: crypto.randomUUID(), title: name, done: false, priority },
      ...cur,
    ])
    setTitle('')
  }

  const toggleTodo = (id: string) => {
    setTodos((cur) => cur.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  const deleteTodo = (id: string) => {
    setTodos((cur) => cur.filter((t) => t.id !== id))
  }

  return (
    <motion.div
      className="space-y-5"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <h1 className="text-2xl md:text-3xl font-semibold">Todos</h1>

      <div className="grid gap-3 md:grid-cols-[2fr_1fr]">
        <div className="flex gap-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTodo()}
            placeholder="Add a task..."
            className="flex-1 rounded-xl border border-ink-700 bg-ink-900/50 px-3 py-2 outline-none focus:ring-2 focus:ring-primary-600"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as any)}
            className="rounded-xl border border-ink-700 bg-ink-900/50 px-3 py-2"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button onClick={addTodo} className="rounded-xl px-4 py-2 bg-primary-600 text-white hover:bg-primary-500">
            Add
          </button>
        </div>

        <div className="flex gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="flex-1 rounded-xl border border-ink-700 bg-ink-900/50 px-3 py-2 outline-none focus:ring-2 focus:ring-primary-600"
          />
          <div className="flex rounded-xl border border-ink-700 overflow-hidden">
            {(['all', 'active', 'done'] as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-2 text-sm ${filter === f ? 'bg-ink-700' : 'bg-ink-900/50 hover:bg-ink-800/60'}`}
              >
                {f[0].toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <ul className="space-y-2">
        <AnimatePresence initial={false}>
          {filtered.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} onDelete={deleteTodo} />
          ))}
        </AnimatePresence>
      </ul>
    </motion.div>
  )
}


