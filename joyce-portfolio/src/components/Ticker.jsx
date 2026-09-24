const ROW_A = [
  'React.js',
  'React Native',
  'Node.js',
  'Express.js',
  'PostgreSQL',
  'TypeScript',
  'REST APIs',
  'MongoDB',
]

const ROW_B = [
  'Shopify',
  'Python',
  'Arduino',
  'Raspberry Pi',
  'PLC',
  'Power BI',
  'Azure',
  'Machine Learning',
]

function Row({ items, reverse = false, accent }) {
  return (
    <div className="mask-fade-x flex overflow-hidden py-1.5">
      <div
        className={`flex w-max animate-marquee hover:[animation-play-state:paused] ${
          reverse ? '[animation-direction:reverse]' : ''
        }`}
      >
        {/* Two identical passes: the track translates exactly -50%, so the
            second pass is already in place when the first scrolls out. */}
        {[0, 1].map((pass) => (
          <div key={pass} className="flex shrink-0 items-center gap-8 pr-8" aria-hidden={pass === 1}>
            {items.map((item) => (
              <span key={item} className="flex items-center gap-8 whitespace-nowrap">
                <span className="font-display text-[clamp(1.1rem,2.4vw,1.9rem)] tracking-tight text-ink/25 transition-colors duration-300 hover:text-ink/70">
                  {item}
                </span>
                <span className={`h-1 w-1 shrink-0 rotate-45 ${accent}`} />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * Full-bleed tech ticker used as a section divider. Laid back in perspective
 * so it reads as a surface travelling past rather than text sliding sideways.
 */
export default function Ticker() {
  return (
    <div
      aria-hidden
      className="perspective-deep relative z-10 select-none overflow-hidden border-y border-line/40 bg-abyss/40 py-8"
    >
      <div
        className="flex flex-col gap-1"
        style={{ transform: 'rotateX(24deg) scale(1.04)', transformOrigin: 'center' }}
      >
        <Row items={ROW_A} accent="bg-mint/60" />
        <Row items={ROW_B} reverse accent="bg-solar/60" />
      </div>

      {/* Colour wash, so the strip is not a grey band between two lit sections */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_100%_at_50%_50%,rgba(110,91,255,0.12),transparent_70%)]" />
    </div>
  )
}
