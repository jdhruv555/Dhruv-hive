import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

type CardProps = {
  title?: string
  children: ReactNode
  className?: string
}

export default function Card({ title, children, className = '' }: CardProps) {
  return (
    <motion.section
      className={`rounded-2xl p-4 bg-ink-800/50 backdrop-blur-md border border-ink-700 shadow-soft ${className}`}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, boxShadow: '0 10px 30px rgba(59,130,246,0.15)' }}
      transition={{ duration: 0.2 }}
    >
      {title ? <h2 className="mb-2 text-lg font-semibold">{title}</h2> : null}
      {children}
    </motion.section>
  )
}


