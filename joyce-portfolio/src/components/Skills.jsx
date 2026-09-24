import Reveal from './ui/Reveal'
import TiltCard from './ui/TiltCard'
import SectionHeading from './ui/SectionHeading'
import TechOrbit from './TechOrbit'
import { skillGroups } from '../data/cvData'

export default function Skills() {
  return (
    <section id="skills" className="relative z-10 border-t border-line/50 py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        {/* Heading and sphere share the fold — the sphere is the section's subject */}
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_minmax(0,520px)]">
          <SectionHeading
            index="04"
            kicker="Stack"
            title="What I work with, grouped by where it lives."
            blurb="Built across healthcare software and Shopify storefronts, with detours into embedded systems, ERP and BI that still pay off. The lit tags are the ones I reach for first."
          />

          <Reveal delay={0.15}>
            <TechOrbit />
          </Reveal>
        </div>

        <div className="perspective mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <Reveal key={group.label} delay={(i % 3) * 0.08}>
              <TiltCard intensity={6} className="h-full p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-mono text-[12px] uppercase tracking-[0.18em] text-mint">
                    {group.label}
                  </h3>
                  <span className="font-mono text-[11px] text-mute">
                    {String(group.items.length).padStart(2, '0')}
                  </span>
                </div>

                <div className="mt-4 h-px w-full bg-gradient-to-r from-mint/40 via-iris/20 to-transparent" />

                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-1.5 text-[13px] text-ink/85
                                 transition-all duration-300 hover:border-mint/40 hover:bg-mint/[0.08] hover:text-ink"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
