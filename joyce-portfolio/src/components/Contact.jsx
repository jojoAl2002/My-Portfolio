import { Suspense, lazy } from 'react'
import { useReducedMotion } from 'framer-motion'
import SceneBoundary from './SceneBoundary'
import Reveal from './ui/Reveal'
import Magnetic from './ui/Magnetic'
import useInView from './ui/useInView'
import { profile } from '../data/cvData'

const TerrainScene = lazy(() => import('./TerrainScene'))

const channels = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, primary: true },
  { label: 'LinkedIn', value: 'joyce-alam', href: profile.linkedin, external: true },
  { label: 'Phone', value: profile.phone, href: `tel:${profile.phone.replace(/\s+/g, '')}` },
]

export default function Contact() {
  const reduced = useReducedMotion()
  const [terrainRef, terrainInView] = useInView('150px')

  return (
    <section
      id="contact"
      className="relative z-10 overflow-hidden border-t border-line/50 pt-28 md:pt-36"
    >
      {/* Terrain horizon anchors the closing frame */}
      <div ref={terrainRef} className="pointer-events-none absolute inset-x-0 bottom-0 h-[460px]">
        {!reduced && (
          <SceneBoundary>
            <Suspense fallback={null}>
              <TerrainScene paused={!terrainInView} />
            </Suspense>
          </SceneBoundary>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-void" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        <Reveal>
          <span className="chip">
            <span className="h-1.5 w-1.5 rounded-full bg-mint shadow-glow" />
            06 / Contact
          </span>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="mt-7 max-w-3xl font-display text-[clamp(2.2rem,6vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
            Building a website, an app or a storefront?{' '}
            <span className="text-ramp-warm">Let&rsquo;s talk.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-mute md:text-base">
            {profile.summary}
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            {channels.map((c) => (
              <Magnetic key={c.label} strength={0.25}>
                <a
                  href={c.href}
                  {...(c.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  className={c.primary ? 'btn-primary' : 'btn-ghost'}
                >
                  <span className="relative z-10 font-mono text-sm">{c.value}</span>
                </a>
              </Magnetic>
            ))}
          </div>
        </Reveal>

        <footer className="mt-28 flex flex-col gap-3 border-t border-line/50 py-8 font-mono text-[11px] text-mute sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {profile.name} — {profile.location}
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-mint" />
            React · Three.js · GLSL · Framer Motion · Tailwind
          </span>
        </footer>
      </div>
    </section>
  )
}
