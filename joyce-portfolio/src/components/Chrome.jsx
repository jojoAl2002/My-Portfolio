import { useEffect, useState } from 'react'
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useMotionValue,
  useReducedMotion,
} from 'framer-motion'

/* Thin progress rail pinned to the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 })

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[90] h-[2px] origin-left bg-holo"
    />
  )
}

/* ------------------------------------------------------------------ *
 * Ambient light that follows the pointer.
 *
 * This deliberately does NOT replace the system cursor. A JS-drawn cursor
 * costs a frame of latency before any easing is applied, which reads as a
 * sluggish mouse however fast the spring is tuned — the OS cursor is
 * composited ahead of the page and nothing in JS can match it. Only the
 * glow lags, and a soft 380px blur is one of the few things that can lag
 * without anyone noticing.
 * ------------------------------------------------------------------ */
export function CursorGlow() {
  const reduced = useReducedMotion()
  const [enabled, setEnabled] = useState(false)

  const x = useMotionValue(-200)
  const y = useMotionValue(-200)

  const glowX = useSpring(x, { stiffness: 220, damping: 30, mass: 0.5 })
  const glowY = useSpring(y, { stiffness: 220, damping: 30, mass: 0.5 })

  useEffect(() => {
    if (reduced || !window.matchMedia('(pointer: fine)').matches) return

    setEnabled(true)

    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [reduced, x, y])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden
      style={{ x: glowX, y: glowY }}
      className="pointer-events-none fixed left-0 top-0 z-[65] -ml-[190px] -mt-[190px] h-[380px] w-[380px]
                 rounded-full opacity-60 mix-blend-screen blur-[80px]"
    >
      <div className="h-full w-full rounded-full bg-[radial-gradient(circle,rgba(110,91,255,0.13),rgba(79,243,200,0.09)_45%,transparent_70%)]" />
    </motion.div>
  )
}

/* Slow-moving colour fields behind everything. */
export function Aurora() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute -left-[15%] top-[-10%] h-[55vw] w-[55vw] animate-drift rounded-full bg-[radial-gradient(circle,rgba(79,243,200,0.09),transparent_62%)] blur-3xl" />
      <div
        className="absolute -right-[12%] top-[20%] h-[52vw] w-[52vw] animate-drift rounded-full bg-[radial-gradient(circle,rgba(110,91,255,0.13),transparent_62%)] blur-3xl"
        style={{ animationDelay: '-8s' }}
      />
      <div
        className="absolute bottom-[-18%] left-[22%] h-[46vw] w-[46vw] animate-drift rounded-full bg-[radial-gradient(circle,rgba(255,190,77,0.06),transparent_62%)] blur-3xl"
        style={{ animationDelay: '-15s' }}
      />
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Boot sequence. Short, and skipped outright for reduced motion.
 * ------------------------------------------------------------------ */
const BOOT_LINES = ['initialising scene', 'compiling shaders', 'linking systems', 'ready']

export function Preloader() {
  const reduced = useReducedMotion()
  const [done, setDone] = useState(false)
  const [pct, setPct] = useState(0)

  useEffect(() => {
    if (reduced) {
      setDone(true)
      return
    }

    let raf
    const start = performance.now()
    const DURATION = 1500

    const tick = (now) => {
      const t = Math.min((now - start) / DURATION, 1)
      // ease-out so the counter decelerates into 100
      setPct(Math.round((1 - Math.pow(1 - t, 3)) * 100))
      if (t < 1) raf = requestAnimationFrame(tick)
      else setDone(true)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reduced])

  useEffect(() => {
    document.body.style.overflow = done ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [done])

  const stage = BOOT_LINES[Math.min(Math.floor((pct / 100) * BOOT_LINES.length), BOOT_LINES.length - 1)]

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          exit={{ opacity: 0, filter: 'blur(16px)', scale: 1.04 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void"
        >
          <div className="grid-overlay absolute inset-0 opacity-40" />

          <div className="relative flex flex-col items-center">
            <div className="font-mono text-[11px] uppercase tracking-[0.5em] text-mute">
              Joyce Alam
            </div>

            <div className="mt-8 h-px w-56 overflow-hidden bg-line sm:w-72">
              <div className="h-full bg-holo transition-[width] duration-100" style={{ width: `${pct}%` }} />
            </div>

            <div className="mt-7 font-display text-6xl tabular-nums text-ramp">
              {String(pct).padStart(3, '0')}
            </div>

            <div className="mt-4 h-4 font-mono text-[10px] uppercase tracking-[0.3em] text-mute/70">
              {stage}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
