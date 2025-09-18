import type { MouseEventHandler } from 'react'
import { motion } from 'framer-motion'

export type Todo = {
  id: string
  title: string
  done: boolean
  priority: 'low' | 'medium' | 'high'
}

type TodoItemProps = {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const badge = {
    low: 'bg-ink-700 text-white',
    medium: 'bg-primary-600 text-white',
    high: 'bg-red-500 text-white',
  }[todo.priority]

  const handleDelete: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    onDelete(todo.id)
  }

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="flex items-center gap-3 rounded-xl border border-ink-700 bg-ink-800/60 p-3"
      onClick={() => onToggle(todo.id)}
    >
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
        className="size-5 accent-primary-600 cursor-pointer"
        aria-label="toggle todo"
      />
      <div className="flex-1">
        <div className={`text-sm md:text-base ${todo.done ? 'line-through opacity-60' : ''}`}>{todo.title}</div>
      </div>
      <span className={`px-2 py-1 text-xs rounded-lg ${badge}`}>{todo.priority}</span>
      <button
        onClick={handleDelete}
        className="px-2 py-1 text-xs rounded-lg border border-ink-700 hover:bg-ink-700"
        aria-label="delete todo"
      >
        Delete
      </button>
    </motion.li>
  )
}


