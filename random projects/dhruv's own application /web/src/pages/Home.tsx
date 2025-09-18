import { motion } from 'framer-motion'

export default function Home() {
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <h1 className="text-2xl md:text-3xl font-semibold">Hi, Dhruv</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl p-4 bg-ink-800/60 border border-ink-700">Today's Todos</div>
        <div className="rounded-2xl p-4 bg-ink-800/60 border border-ink-700">Workout</div>
        <div className="rounded-2xl p-4 bg-ink-800/60 border border-ink-700">Reading</div>
      </div>
    </motion.div>
  )
}


