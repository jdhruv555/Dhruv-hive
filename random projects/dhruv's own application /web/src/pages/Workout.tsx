import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import Card from '../components/Card'

function getMonthMatrix(date: Date) {
  const year = date.getFullYear()
  const month = date.getMonth()
  const first = new Date(year, month, 1)
  const startDay = first.getDay() // 0-6 Sun-Sat
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells = [] as Array<{ day: number | null }>
  for (let i = 0; i < startDay; i++) cells.push({ day: null })
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d })
  while (cells.length % 7 !== 0) cells.push({ day: null })
  return cells
}

export default function Workout() {
  const [today] = useState(() => new Date())
  const [pinnedUrl, setPinnedUrl] = useState('')
  const [completed, setCompleted] = useState<Record<string, boolean>>({})
  const [exerciseDone, setExerciseDone] = useState<Record<string, Record<string, boolean>>>({})

  const cells = useMemo(() => getMonthMatrix(today), [today])
  const y = today.getFullYear()
  const m = today.getMonth()

  useEffect(() => {
    try {
      const u = localStorage.getItem('dhruv.workout.video')
      if (u) {
        setPinnedUrl(u)
      } else {
        // Default to Dhruv's preferred workout video (YouTube Shorts embed)
        setPinnedUrl('https://www.youtube.com/embed/LVPA5y-WOME')
      }
      const c = localStorage.getItem('dhruv.workout.completed')
      if (c) setCompleted(JSON.parse(c))
      const e = localStorage.getItem('dhruv.workout.exerciseDone')
      if (e) setExerciseDone(JSON.parse(e))
    } catch {}
  }, [])

  useEffect(() => {
    try { localStorage.setItem('dhruv.workout.video', pinnedUrl) } catch {}
  }, [pinnedUrl])

  useEffect(() => {
    try { localStorage.setItem('dhruv.workout.completed', JSON.stringify(completed)) } catch {}
  }, [completed])

  useEffect(() => {
    try { localStorage.setItem('dhruv.workout.exerciseDone', JSON.stringify(exerciseDone)) } catch {}
  }, [exerciseDone])

  const keyFor = (day: number) => `${y}-${m + 1}-${day}`

  // Preset plan based on provided routine
  const planForDay: { title: string; items: string[] } | null = useMemo(() => {
    const d = today.getDay() // 0 Sun ... 6 Sat
    if (d === 1 || d === 4) {
      return {
        title: 'Push — Chest, Shoulders, Triceps',
        items: [
          'Incline Dumbbell Press',
          'Flat Dumbbell Press',
          'Dumbbell Shoulder Press (Seated/Standing)',
          'Bench Dips',
          'Dumbbell Lateral Raises',
          'Dumbbell Tricep Kickback',
        ],
      }
    }
    if (d === 2 || d === 5) {
      return {
        title: 'Pull — Back, Biceps',
        items: [
          'Dumbbell Romanian Deadlift',
          'Dumbbell Bent Over Rows',
          'Single Arm Dumbbell Row',
          'Dumbbell Hammer Curls',
          'Concentration Curl',
        ],
      }
    }
    if (d === 3 || d === 6) {
      return {
        title: 'Legs',
        items: [
          'Dumbbell Goblet Squats',
          'Dumbbell Walking Lunges / Split Squats',
          'Dumbbell Romanian Deadlift',
          'Seated Dumbbell Calf Raise',
          'Standing Dumbbell Calf Raise',
        ],
      }
    }
    return null // Sunday / rest
  }, [today])

  return (
    <motion.div
      className="space-y-5"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <h1 className="text-2xl md:text-3xl font-semibold">Workout</h1>

      <Card title="Pinned Video">
        <div className="flex flex-col md:flex-row gap-3">
          <input
            value={pinnedUrl}
            onChange={(e) => setPinnedUrl(e.target.value)}
            placeholder="https://www.youtube.com/embed/..."
            className="flex-1 rounded-xl border border-ink-700 bg-ink-900/50 px-3 py-2 outline-none focus:ring-2 focus:ring-primary-600"
          />
          <a
            href={pinnedUrl || '#'}
            target="_blank"
            className="px-4 py-2 rounded-xl bg-primary-600 text-white hover:bg-primary-500 text-center"
          >
            Open
          </a>
        </div>
      </Card>

      {planForDay ? (() => {
        const todayKey = keyFor(today.getDate())
        const dayMap = exerciseDone[todayKey] || {}
        const total = planForDay.items.length
        const doneCount = planForDay.items.filter((it) => dayMap[it]).length
        const percent = Math.round((doneCount / total) * 100)
        const toggle = (name: string) => {
          setExerciseDone((cur) => {
            const currentForDay = cur[todayKey] ? { ...cur[todayKey] } : {}
            currentForDay[name] = !currentForDay[name]
            const next = { ...cur, [todayKey]: currentForDay }
            // auto mark session completed if all checked
            const allDone = planForDay.items.every((it) => currentForDay[it])
            setCompleted((c) => ({ ...c, [todayKey]: allDone }))
            return next
          })
        }
        return (
          <Card title={`Today's Plan — ${planForDay.title}`}>
            <div className="mb-3 h-2 w-full overflow-hidden rounded-full bg-ink-800">
              <div className="h-full bg-primary-600" style={{ width: `${percent}%` }} />
            </div>
            <ul className="space-y-2">
              {planForDay.items.map((it) => (
                <li key={it} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={!!dayMap[it]}
                    onChange={() => toggle(it)}
                    className="size-5 accent-primary-600"
                  />
                  <span className={dayMap[it] ? 'line-through opacity-70' : ''}>{it}</span>
                </li>
              ))}
            </ul>
          </Card>
        )
      })() : (
        <Card title="Rest / Mobility">Easy cardio, stretching, or a walk.</Card>
      )}

      <Card title={today.toLocaleString(undefined, { month: 'long', year: 'numeric' })}>
        <div className="grid grid-cols-7 gap-2 mb-2 text-xs uppercase opacity-70">
          {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => <div key={d} className="text-center">{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {cells.map((c, i) => {
            const isToday = c.day === today.getDate()
            const k = c.day ? keyFor(c.day) : ''
            const done = !!(c.day && completed[k])
            return (
              <button
                key={i}
                disabled={!c.day}
                onClick={() => c.day && setCompleted((cur) => ({ ...cur, [k]: !cur[k] }))}
                className={`aspect-square rounded-xl border text-sm ${
                  !c.day
                    ? 'border-transparent'
                    : done
                      ? 'border-primary-600 bg-primary-600/20'
                      : 'border-ink-700 hover:bg-ink-800/60 bg-ink-900/40'
                } ${isToday ? 'ring-2 ring-primary-600' : ''}`}
              >
                {c.day || ''}
              </button>
            )
          })}
        </div>
      </Card>
    </motion.div>
  )
}


