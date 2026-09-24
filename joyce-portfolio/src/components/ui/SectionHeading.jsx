import Reveal from './Reveal'

export default function SectionHeading({ index, kicker, title, blurb, align = 'left' }) {
  return (
    <div className={`relative ${align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}`}>
      {/* Oversized ghost numeral — depth without adding another panel */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-12 left-0 select-none font-display text-[7rem]
                   font-bold leading-none text-white/[0.025] md:-top-16 md:text-[10rem]"
      >
        {index}
      </span>

      <div className="relative">
        <Reveal>
          <span className="chip">
            <span className="h-1.5 w-1.5 rounded-full bg-mint shadow-glow" />
            {index} / {kicker}
          </span>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="mt-6 font-display text-4xl leading-[1.08] tracking-[-0.025em] text-ink md:text-5xl">
            {title}
          </h2>
        </Reveal>

        <Reveal delay={0.14}>
          <span
            className={`mt-6 block h-px w-24 bg-gradient-to-r from-mint via-iris to-transparent ${
              align === 'center' ? 'mx-auto' : ''
            }`}
          />
        </Reveal>

        {blurb && (
          <Reveal delay={0.2}>
            <p className="mt-5 text-[15px] leading-relaxed text-mute md:text-base">{blurb}</p>
          </Reveal>
        )}
      </div>
    </div>
  )
}
