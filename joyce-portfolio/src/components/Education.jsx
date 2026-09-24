import Reveal from './ui/Reveal'
import TiltCard from './ui/TiltCard'
import SectionHeading from './ui/SectionHeading'
import { education, certifications } from '../data/cvData'

export default function Education() {
  return (
    <section id="education" className="relative z-10 border-t border-line/50 py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionHeading
          index="05"
          kicker="Foundation"
          title="Studied, then kept studying."
          blurb="A computer science degree still in progress at master's level, plus the certifications that filled in the edges."
        />

        <div className="perspective mt-16 grid gap-6 lg:grid-cols-[1fr_1fr]">
          {/* Degrees */}
          <div className="space-y-5">
            {education.map((ed, i) => (
              <Reveal key={ed.degree} delay={i * 0.1}>
                <TiltCard intensity={5} className="p-7">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-lg text-ink">{ed.degree}</h3>
                    <span className="shrink-0 rounded-full border border-mint/25 bg-mint/[0.07] px-3 py-1 font-mono text-[11px] text-mint">
                      {ed.period}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-mute">{ed.school}</p>

                  {ed.note && (
                    <p className="mt-4 border-l border-iris/40 pl-4 text-[13.5px] leading-relaxed text-ink/70">
                      {ed.note}
                    </p>
                  )}
                </TiltCard>
              </Reveal>
            ))}
          </div>

          {/* Certifications */}
          <Reveal delay={0.12}>
            <TiltCard intensity={4} className="h-full p-7">
              <h3 className="font-mono text-[12px] uppercase tracking-[0.18em] text-mint">
                Training & certifications
              </h3>

              <ul className="mt-6 divide-y divide-white/[0.06]">
                {certifications.map((c) => (
                  <li
                    key={c.name}
                    className="group flex items-baseline justify-between gap-4 py-3.5 transition-colors"
                  >
                    <span className="flex items-baseline gap-3 text-[14.5px] text-ink/85 transition-colors group-hover:text-ink">
                      <span className="h-1 w-1 shrink-0 translate-y-[-2px] rounded-full bg-iris/70 transition-all duration-300 group-hover:bg-mint group-hover:shadow-glow" />
                      {c.name}
                    </span>
                    <span className="shrink-0 text-right font-mono text-[11px] text-mute">
                      {c.org}
                    </span>
                  </li>
                ))}
              </ul>
            </TiltCard>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
