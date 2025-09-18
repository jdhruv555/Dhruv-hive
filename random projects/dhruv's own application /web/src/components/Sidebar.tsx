import { NavLink } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

export default function Sidebar() {
  return (
    <aside className="md:sticky md:top-0 h-fit rounded-2xl bg-ink-900/50 backdrop-blur-md shadow-soft border border-ink-800">
      <div className="p-4 text-xl font-semibold flex items-center gap-2">
        Dhruv
        <ThemeToggle />
      </div>
      <nav className="flex md:flex-col gap-2 p-2">
        <NavLink to="/" end className={({ isActive }) => `px-4 py-2 rounded-xl transition-all ${isActive ? 'bg-primary-600 text-white shadow-glow' : 'hover:bg-ink-800/60 hover:translate-x-0.5'}`}>Home</NavLink>
        <NavLink to="/todos" className={({ isActive }) => `px-4 py-2 rounded-xl transition-all ${isActive ? 'bg-primary-600 text-white shadow-glow' : 'hover:bg-ink-800/60 hover:translate-x-0.5'}`}>Todos</NavLink>
        <NavLink to="/workout" className={({ isActive }) => `px-4 py-2 rounded-xl transition-all ${isActive ? 'bg-primary-600 text-white shadow-glow' : 'hover:bg-ink-800/60 hover:translate-x-0.5'}`}>Workout</NavLink>
        <NavLink to="/bookshelf" className={({ isActive }) => `px-4 py-2 rounded-xl transition-all ${isActive ? 'bg-primary-600 text-white shadow-glow' : 'hover:bg-ink-800/60 hover:translate-x-0.5'}`}>Bookshelf</NavLink>
        <NavLink to="/projects" className={({ isActive }) => `px-4 py-2 rounded-xl transition-all ${isActive ? 'bg-primary-600 text-white shadow-glow' : 'hover:bg-ink-800/60 hover:translate-x-0.5'}`}>Projects</NavLink>
      </nav>
    </aside>
  )
}


