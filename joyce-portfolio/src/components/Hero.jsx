import { Suspense, lazy } from 'react'
import { profile } from '../data/cvData'

const Scene3D = lazy(() => import('./Scene3D'))

export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-40" />
      <div className="absolute inset-0">
        <Suspense fallback={null}>
          <Scene3D />
        </Suspense>
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 md:px-10 pt-24 pb-16 w-full">
        <p className="font-mono text-sm text-signal mb-5">Full Stack Developer / Shopify Developer</p>
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl leading-[1.05] max-w-3xl text-ink">
          Joyce Alam builds the systems doctors and shoppers actually use.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-mute leading-relaxed">
          {profile.summary}
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#work"
            className="rounded-full bg-signal text-void font-medium px-6 py-3 hover:bg-signal/90 transition-colors"
          >
            See the work
          </a>
          <a
            href="mailto:joyce3alam@gmail.com"
            className="rounded-full border border-line px-6 py-3 text-ink hover:border-signal/60 transition-colors"
          >
            joyce3alam@gmail.com
          </a>
        </div>
        <div className="mt-16 flex flex-wrap gap-x-10 gap-y-3 font-mono text-xs text-mute">
          <span>{profile.location}</span>
          <span>{profile.phone}</span>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-signal transition-colors">
            linkedin.com/in/joyce-alam
          </a>
        </div>
      </div>
    </section>
  )
}
