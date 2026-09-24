import Reveal from './ui/Reveal'
import TiltCard from './ui/TiltCard'
import SectionHeading from './ui/SectionHeading'
import Glyph from './ui/Glyphs'
import { domainAreas } from '../data/cvData'

// Colour-coded so the reader can tell shipped work from training at a glance.
const ORIGIN_STYLE = {
  Professional: 'border-mint/30 bg-mint/[0.08] text-mint',
  Training: 'border-solar/30 bg-solar/[0.08] text-solar',
  Academic: 'border-iris/35 bg-iris/[0.1] text-iris',
}

export default function Domains() {
  return (
    <section id="domains" className="relative z-10 border-t border-line/50 py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionHeading
          index="02"
          kicker="Domains"
          title="Software, storefronts and the hardware underneath."
          blurb="Six areas, tagged by where each one comes from — paid work, certified training, or the computer science degree. No blurring between them."
        />

        <div className="perspective mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {domainAreas.map((area, i) => (
            <Reveal key={area.title} delay={(i % 3) * 0.09}>
              <TiltCard intensity={8} className="group h-full overflow-hidden p-7">
                {/* Lifted off the card face, so tilting parallaxes it forward */}
                <div
                  className="relative w-14 text-ink/45 transition-colors duration-500 group-hover:text-ink/75"
                  style={{ transform: 'translateZ(42px)' }}
                >
                  <Glyph name={area.glyph} className="h-14 w-14" />
                </div>

                <div className="mt-7 flex items-center justify-between gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-mute">
                    {area.label}
                  </span>
                  <span
                    className={`rounded-full border px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] ${
                      ORIGIN_STYLE[area.origin]
                    }`}
                  >
                    {area.origin}
                  </span>
                </div>

                <h3
                  className="mt-3 font-display text-xl leading-snug text-ink"
                  style={{ transform: 'translateZ(18px)' }}
                >
                  {area.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-mute">{area.detail}</p>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {area.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink/70"
                    >
                      {tag}
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
