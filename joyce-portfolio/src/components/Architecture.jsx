import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/**
 * The LbCare system, drawn. Two clients over one API, a shared database and
 * the interaction model reading from it — which is the actual shape of the
 * work, so the diagram carries information a screenshot would not.
 */
const NODES = [
  {
    id: 'web',
    label: 'Client',
    title: 'Doctor web app',
    tech: 'React.js',
    x: 40,
    y: 56,
    accent: '#4FF3C8',
  },
  {
    id: 'mobile',
    label: 'Client',
    title: 'Mobile app',
    tech: 'React Native',
    x: 40,
    y: 292,
    accent: '#6E5BFF',
  },
  {
    id: 'api',
    label: 'Service',
    title: 'REST API',
    tech: 'Node.js · Express',
    x: 355,
    y: 174,
    accent: '#FFBE4D',
  },
  {
    id: 'db',
    label: 'Storage',
    title: 'PostgreSQL',
    tech: 'Relational store',
    x: 670,
    y: 56,
    accent: '#EDEAFF',
  },
  {
    id: 'ai',
    label: 'Model',
    title: 'Interaction checker',
    tech: 'Medicine conflicts',
    x: 670,
    y: 292,
    accent: '#FF5F9E',
  },
]

const W = 210
const H = 92

const EDGES = [
  { id: 'e-web', from: 'web', to: 'api', d: 'M250,102 C310,102 300,206 355,206' },
  { id: 'e-mob', from: 'mobile', to: 'api', d: 'M250,338 C310,338 300,238 355,238' },
  { id: 'e-db', from: 'api', to: 'db', d: 'M565,198 C625,198 615,102 670,102' },
  { id: 'e-ai', from: 'api', to: 'ai', d: 'M565,242 C625,242 615,338 670,338' },
  { id: 'e-read', from: 'ai', to: 'db', d: 'M775,292 L775,148', dashed: true },
]

function isLit(edge, active) {
  return !active || edge.from === active || edge.to === active
}

export default function Architecture() {
  const [active, setActive] = useState(null)
  const reduced = useReducedMotion()

  return (
    <>
      {/* ---------- Wide layout: the real diagram ---------- */}
      <div className="hidden md:block">
        <svg
          viewBox="0 0 920 440"
          className="w-full"
          role="img"
          aria-label="LbCare architecture: a React web app and a React Native mobile app both call one Node.js REST API, which reads and writes PostgreSQL; the medicine interaction model reads from the same database."
        >
          <defs>
            <linearGradient id="flow" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#4FF3C8" />
              <stop offset="55%" stopColor="#6E5BFF" />
              <stop offset="100%" stopColor="#FFBE4D" />
            </linearGradient>
            <filter id="soft" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="6" />
            </filter>
          </defs>

          {/* Connections */}
          {EDGES.map((e, i) => {
            const lit = isLit(e, active)
            return (
              <g key={e.id} style={{ opacity: lit ? 1 : 0.18, transition: 'opacity 0.35s ease' }}>
                {/* Base rail */}
                <path
                  id={e.id}
                  d={e.d}
                  fill="none"
                  stroke="#241D4A"
                  strokeWidth="1.5"
                  strokeDasharray={e.dashed ? '5 7' : undefined}
                />

                {/* Draw-in pass on first scroll into view */}
                <motion.path
                  d={e.d}
                  fill="none"
                  stroke="url(#flow)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  initial={reduced ? false : { pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.5 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 1.1, delay: 0.25 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                />

                {/* Packet travelling the wire */}
                {!reduced && (
                  <circle r="3.5" fill={e.dashed ? '#FF5F9E' : '#4FF3C8'}>
                    <animateMotion
                      dur={`${3.4 + i * 0.5}s`}
                      begin={`${i * 0.7}s`}
                      repeatCount="indefinite"
                      path={e.d}
                      rotate="auto"
                    />
                  </circle>
                )}
              </g>
            )
          })}

          {/* Nodes */}
          {NODES.map((n, i) => {
            const lit = !active || active === n.id
            return (
              <motion.g
                key={n.id}
                onMouseEnter={() => setActive(n.id)}
                onMouseLeave={() => setActive(null)}
                style={{ cursor: 'pointer' }}
                initial={reduced ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Accent bleed behind the card */}
                <rect
                  x={n.x}
                  y={n.y}
                  width={W}
                  height={H}
                  rx="16"
                  fill={n.accent}
                  opacity={lit ? 0.16 : 0.05}
                  filter="url(#soft)"
                  style={{ transition: 'opacity 0.35s ease' }}
                />
                <rect
                  x={n.x}
                  y={n.y}
                  width={W}
                  height={H}
                  rx="16"
                  fill="#0C0A20"
                  stroke={n.accent}
                  strokeOpacity={lit ? 0.5 : 0.2}
                  strokeWidth="1"
                  style={{ transition: 'stroke-opacity 0.35s ease' }}
                />

                {/* Status dot */}
                <circle cx={n.x + 22} cy={n.y + 26} r="3.5" fill={n.accent} />

                <text
                  x={n.x + 36}
                  y={n.y + 30}
                  className="font-mono"
                  fontSize="10"
                  letterSpacing="2"
                  fill={n.accent}
                  opacity="0.85"
                >
                  {n.label.toUpperCase()}
                </text>

                <text
                  x={n.x + 22}
                  y={n.y + 56}
                  className="font-display"
                  fontSize="17"
                  fontWeight="600"
                  fill="#EDEAFF"
                >
                  {n.title}
                </text>

                <text x={n.x + 22} y={n.y + 76} className="font-mono" fontSize="11" fill="#8A85B8">
                  {n.tech}
                </text>
              </motion.g>
            )
          })}
        </svg>
      </div>

      {/* ---------- Narrow layout: same nodes, stacked ---------- */}
      <ol className="relative space-y-3 md:hidden">
        <span className="absolute bottom-4 left-[7px] top-4 w-px bg-gradient-to-b from-mint via-iris to-solar opacity-40" />
        {NODES.map((n, i) => (
          <motion.li
            key={n.id}
            initial={reduced ? false : { opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            className="relative flex items-start gap-4 pl-6"
          >
            <span
              className="absolute left-0 top-5 h-[15px] w-[15px] rounded-full border-2 border-void"
              style={{ background: n.accent }}
            />
            <div className="glass flex-1 rounded-xl p-4">
              <span
                className="font-mono text-[10px] uppercase tracking-[0.2em]"
                style={{ color: n.accent }}
              >
                {n.label}
              </span>
              <h4 className="mt-1 font-display text-[15px] text-ink">{n.title}</h4>
              <p className="mt-0.5 font-mono text-[11px] text-mute">{n.tech}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </>
  )
}
