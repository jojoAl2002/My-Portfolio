import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import useInView from './ui/useInView'
import { skillGroups } from '../data/cvData'

const TAGS = [...new Set(skillGroups.flatMap((g) => g.items))]

// The stack she actually ships with — these stay lit wherever they land.
const CORE = new Set([
  'React.js',
  'React Native',
  'Node.js',
  'Express.js',
  'PostgreSQL',
  'JavaScript',
  'TypeScript',
  'Shopify Development',
  'REST APIs',
])

const PERSPECTIVE = 900
const IDLE_Y = 0.16 // rad/sec
const IDLE_X = 0.05

/**
 * Tag sphere. Positions come from a Fibonacci distribution so the labels space
 * evenly instead of bunching at the poles, and every frame writes transforms
 * straight to the nodes — running ~40 tags through React state would re-render
 * the whole section sixty times a second for no benefit.
 */
export default function TechOrbit() {
  const [wrapRef, inView] = useInView('120px')
  const stageRef = useRef(null)
  const itemsRef = useRef([])
  const reduced = useReducedMotion()

  // Mutable animation state, deliberately outside React.
  const rot = useRef({ x: -0.25, y: 0 })
  const vel = useRef({ x: IDLE_X, y: IDLE_Y })
  const drag = useRef({ active: false, lastX: 0, lastY: 0 })

  // Unit vectors on the sphere, computed once.
  const basis = useRef(
    TAGS.map((_, i) => {
      const phi = Math.acos(-1 + (2 * i + 1) / TAGS.length)
      const theta = Math.sqrt(TAGS.length * Math.PI) * phi
      return {
        x: Math.cos(theta) * Math.sin(phi),
        y: Math.cos(phi),
        z: Math.sin(theta) * Math.sin(phi),
      }
    })
  )

  useEffect(() => {
    if (reduced || !inView) return

    let raf
    let last = performance.now()

    const frame = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now

      // Ease released momentum back to the idle drift.
      if (!drag.current.active) {
        vel.current.x += (IDLE_X - vel.current.x) * (1 - Math.pow(0.12, dt))
        vel.current.y += (IDLE_Y - vel.current.y) * (1 - Math.pow(0.12, dt))
      }

      rot.current.x += vel.current.x * dt
      rot.current.y += vel.current.y * dt

      // Keep the sphere from tipping past its poles.
      rot.current.x = Math.max(-0.85, Math.min(0.85, rot.current.x))

      const stage = stageRef.current
      if (!stage) return
      const radius = stage.offsetWidth * 0.42

      const cy = Math.cos(rot.current.y)
      const sy = Math.sin(rot.current.y)
      const cx = Math.cos(rot.current.x)
      const sx = Math.sin(rot.current.x)

      for (let i = 0; i < basis.current.length; i++) {
        const el = itemsRef.current[i]
        if (!el) continue

        const b = basis.current[i]

        // Yaw, then pitch.
        const x1 = b.x * cy - b.z * sy
        const z1 = b.x * sy + b.z * cy
        const y2 = b.y * cx - z1 * sx
        const z2 = b.y * sx + z1 * cx

        const X = x1 * radius
        const Y = y2 * radius
        const Z = z2 * radius

        const scale = PERSPECTIVE / (PERSPECTIVE - Z)
        const depth = (z2 + 1) / 2 // 0 = far side, 1 = nearest

        el.style.transform = `translate3d(${X}px, ${Y}px, 0) scale(${scale.toFixed(3)})`
        el.style.opacity = (0.16 + depth * 0.84).toFixed(3)
        el.style.zIndex = String((depth * 100) | 0)
        el.style.filter = depth < 0.45 ? `blur(${((0.45 - depth) * 3).toFixed(2)}px)` : 'none'
      }

      raf = requestAnimationFrame(frame)
    }

    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [reduced, inView])

  function onPointerDown(e) {
    drag.current = { active: true, lastX: e.clientX, lastY: e.clientY }
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }

  function onPointerMove(e) {
    if (!drag.current.active) return
    const dx = e.clientX - drag.current.lastX
    const dy = e.clientY - drag.current.lastY
    drag.current.lastX = e.clientX
    drag.current.lastY = e.clientY

    // Convert pixel drag straight into angular velocity — release keeps the spin.
    vel.current.y = dx * 0.06
    vel.current.x = dy * 0.045
  }

  function endDrag(e) {
    drag.current.active = false
    e.currentTarget.releasePointerCapture?.(e.pointerId)
  }

  // Reduced motion gets the same information without the machinery.
  if (reduced) {
    return (
      <div className="flex flex-wrap justify-center gap-2">
        {TAGS.map((t) => (
          <span
            key={t}
            className={`rounded-full border px-3 py-1.5 font-mono text-[12px] ${
              CORE.has(t)
                ? 'border-mint/40 bg-mint/[0.08] text-mint'
                : 'border-white/10 bg-white/[0.03] text-mute'
            }`}
          >
            {t}
          </span>
        ))}
      </div>
    )
  }

  return (
    <div ref={wrapRef} className="relative mx-auto w-full max-w-[520px]">
      {/* Glow bed, so the sphere sits in light rather than on a flat panel */}
      <div className="pointer-events-none absolute inset-[12%] rounded-full bg-[radial-gradient(circle,rgba(110,91,255,0.22),transparent_65%)] blur-2xl" />

      <div
        ref={stageRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        role="img"
        aria-label={`Technologies: ${TAGS.join(', ')}`}
        className="relative aspect-square w-full cursor-grab touch-none select-none active:cursor-grabbing"
      >
        {/* Equator ring, to give the volume an edge to read against */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[84%] w-[84%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06]" />

        <div className="absolute left-1/2 top-1/2 h-0 w-0">
          {TAGS.map((tag, i) => (
            <span
              key={tag}
              ref={(el) => {
                itemsRef.current[i] = el
              }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border px-2.5 py-1 font-mono text-[11px] leading-none backdrop-blur-sm transition-colors duration-300 ${
                CORE.has(tag)
                  ? 'border-mint/40 bg-mint/[0.1] text-mint'
                  : 'border-white/[0.08] bg-white/[0.03] text-ink/70'
              }`}
              // Starts hidden: the first animation frame places it. Without this
              // every tag paints stacked at the centre for one frame.
              style={{ opacity: 0, willChange: 'transform, opacity' }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-mute">
        Drag to spin
      </p>
    </div>
  )
}
