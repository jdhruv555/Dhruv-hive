import { Outlet } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import FAB from './components/FAB'
import Player from './components/Player'

function App() {
  return (
    <div className="min-h-screen text-white bg-[radial-gradient(1200px_600px_at_-10%_-10%,rgba(59,130,246,0.15),transparent),radial-gradient(800px_400px_at_110%_10%,rgba(59,130,246,0.12),transparent),linear-gradient(180deg,#0b1220, #0b1220)]">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6 p-4">
        <Sidebar />
        <main className="rounded-2xl bg-ink-900/50 backdrop-blur shadow-soft border border-ink-800 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
      <Player />
      <FAB label="Add" />
    </div>
  )
}

export default App
