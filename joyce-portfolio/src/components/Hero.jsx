import { Suspense, lazy, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import SceneBoundary from './SceneBoundary'
import useInView from './ui/useInView'
import { profile, stats, domains } from '../data/cvData'

const Scene3D = lazy(() => import('./Scene3D'))

const EASE = [0.22, 1, 0.36, 1]

/**
 * Words that carry the meaning get a ramp; connective tissue stays quiet.
 * Cool for healthcare, warm for commerce — so the line arcs across the site
 * palette without any single word having to carry all four hues at once.
 */
const ACCENT_WORDS = {
  healthcare: 'text-ramp',
  'commerce.': 'text-ramp-warm',
}

export default function Hero() {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const [stageRef, stageInView] = useInView('100px')

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // Plain ref, not state: the scene reads this every frame inside useFrame and
  // must never cause React to re-render the canvas tree.
  const progress = useRef(0)
  useEffect(() => scrollYProgress.on('change', (v) => (progress.current = v)), [scrollYProgress])

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '24%'])
  const opacity = useTransform(scrollYProgress, [0, 0.72], [1, 0])

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* 3D stage */}
      <div ref={stageRef} className="absolute inset-0 lg:left-[20%]">
        <SceneBoundary>
          <Suspense fallback={null}>
            <Scene3D reduced={reduced} progress={progress} paused={!stageInView} />
          </Suspense>
        </SceneBoundary>
      </div>

      <div className="grid-overlay pointer-events-none absolute inset-0 opacity-25" />

      {/* Scrims: the copy has to sit on near-solid ground, or the headline
          fights the scene for every letter. Radial pocket behind the text,
          linear wash from the left edge, and a base fade into the next section. */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_68%_58%_at_16%_50%,rgba(5,4,14,0.96),transparent_72%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-void via-void/55 to-transparent lg:via-void/25 lg:to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-void via-void/70 to-transparent" />

      <motion.div
        style={reduced ? undefined : { y, opacity }}
        className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-28 pt-32 md:px-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.65, ease: EASE }}
        >
          <span className="chip">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-mint" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-mint" />
            </span>
            Available for work — {profile.location}
          </span>
        </motion.div>

        <h1 className="mt-8 max-w-4xl font-display text-[clamp(2.6rem,7.4vw,5.6rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
          {profile.headline.map((word, i) => (
            <span
              key={word + i}
              className="mr-[0.22em] inline-block overflow-hidden pb-[0.14em] align-bottom"
            >
              <motion.span
                className={`inline-block ${ACCENT_WORDS[word] ?? 'text-ink'}`}
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.95, delay: 1.75 + i * 0.075, ease: EASE }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.25, ease: EASE }}
          className="mt-7 max-w-xl text-[15px] leading-relaxed text-mute md:text-lg"
        >
          {profile.lead}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.38, ease: EASE }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a href="#work" className="btn-primary">
            <span className="relative z-10">See the work</span>
            <span className="relative z-10" aria-hidden>
              →
            </span>
          </a>
          <a href="#contact" className="btn-ghost font-mono text-sm">
            {profile.email}
          </a>
        </motion.div>

        {/* Domains — the scene sets the tone, this says what she actually builds */}
        <motion.ul
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.48, ease: EASE }}
          className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-mute"
        >
          {domains.map((d) => (
            <li key={d.label} className="flex items-center gap-2">
              <span className={`h-1 w-1 rounded-full ${d.dot}`} />
              {d.label}
            </li>
          ))}
        </motion.ul>

        {/* Stat strip doubles as the base of the composition */}
        <motion.dl
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 2.62, ease: EASE }}
          className="mt-12 grid max-w-2xl grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.05] sm:grid-cols-3"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="group relative overflow-hidden bg-void/70 px-5 py-5 backdrop-blur-xl transition-colors duration-500 hover:bg-iris/[0.06]"
            >
              <span className="absolute inset-x-0 top-0 h-px scale-x-0 bg-holo transition-transform duration-500 group-hover:scale-x-100" />
              <dt className="font-display text-3xl leading-none text-ramp">{s.value}</dt>
              <dd className="mt-2 text-[13px] font-medium text-ink/90">{s.label}</dd>
              <dd className="mt-0.5 font-mono text-[11px] text-mute">{s.sub}</dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      {/* Vertical role rail — anchors the right edge on wide screens */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.8 }}
        className="pointer-events-none absolute right-8 top-1/2 z-10 hidden -translate-y-1/2 xl:block"
      >
        <span className="block font-mono text-[10px] uppercase tracking-[0.42em] text-mute [writing-mode:vertical-rl]">
          {profile.role}
        </span>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#work"
        aria-label="Scroll to work"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.8 }}
        className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-mute">Scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-line">
          <span className="absolute inset-x-0 top-0 h-3 animate-scan-down bg-mint" />
        </span>
      </motion.a>
    </section>
  )
}
