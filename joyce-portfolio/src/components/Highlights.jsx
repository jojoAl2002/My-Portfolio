import Reveal from './ui/Reveal'
import TiltCard from './ui/TiltCard'
import SectionHeading from './ui/SectionHeading'
import Architecture from './Architecture'
import { flagship } from '../data/cvData'

export default function Highlights() {
  return (
    <section id="work" className="relative z-10 py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionHeading
          index="01"
          kicker="Flagship project"
          title={`${flagship.name} — a healthcare platform, web and mobile.`}
          blurb={flagship.summary}
        />

        {/* Credit line: this was team work at DigiLab, and it should read that way. */}
        <Reveal delay={0.24}>
          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] text-mute">
            <span className="text-ink/80">{flagship.role}</span>
            <span className="text-line">/</span>
            <span>{flagship.company}</span>
            <span className="text-line">/</span>
            <span>{flagship.period}</span>
          </div>
        </Reveal>

        {/* The system, drawn */}
        <Reveal delay={0.1}>
          <div className="beam-border glass relative mt-14 overflow-hidden p-6 md:p-10">
            <div className="grid-overlay pointer-events-none absolute inset-0 opacity-30" />

            <div className="relative flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="font-mono text-[12px] uppercase tracking-[0.2em] text-mint">
                System architecture
              </h3>
              <span className="font-mono text-[11px] text-mute">Hover a node to trace its wiring</span>
            </div>

            <div className="relative mt-8">
              <Architecture />
            </div>
          </div>
        </Reveal>

        {/* What she owned inside it */}
        <div className="perspective mt-6 grid gap-6 md:grid-cols-3">
          {flagship.facets.map((facet, i) => (
            <Reveal key={facet.title} delay={i * 0.12}>
              <TiltCard className="h-full p-7">
                <div className="flex h-full flex-col">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full border border-mint/25 bg-mint/[0.07] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-mint">
                      {facet.label}
                    </span>
                    <span className="font-mono text-[11px] text-mute">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="mt-6 font-display text-xl leading-snug text-ink">{facet.title}</h3>

                  <p className="mt-3 flex-1 text-sm leading-relaxed text-mute">{facet.detail}</p>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {facet.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink/70"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
