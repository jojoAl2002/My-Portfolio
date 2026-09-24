const MINT = '#4FF3C8'
const IRIS = '#6E5BFF'
const ROSE = '#FF5F9E'
const SOLAR = '#FFBE4D'
const MUTE = '#8A85B8'

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

/* Browser chrome with copy filling in, and a caret blinking in the field. */
function Web() {
  return (
    <>
      <rect x="5" y="11" width="54" height="42" rx="5" {...stroke} opacity="0.5" />
      <path d="M5 22h54" {...stroke} opacity="0.5" />
      <circle cx="11.5" cy="16.5" r="1.7" fill={ROSE} />
      <circle cx="17.5" cy="16.5" r="1.7" fill={SOLAR} />
      <circle cx="23.5" cy="16.5" r="1.7" fill={MINT} />

      <rect className="g-line" x="12" y="30" width="24" height="2.8" rx="1.4" fill={MINT} />
      <rect className="g-line g-d1" x="12" y="37.5" width="34" height="2.8" rx="1.4" fill={IRIS} opacity="0.8" />
      <rect className="g-line g-d2" x="12" y="45" width="18" height="2.8" rx="1.4" fill={MUTE} opacity="0.6" />

      <rect className="g-blink" x="49" y="28.5" width="1.8" height="7" rx="0.9" fill={MINT} />
    </>
  )
}

/* Handset with cards surfacing one after another. */
function App() {
  return (
    <>
      <rect x="19" y="5" width="26" height="54" rx="6" {...stroke} opacity="0.55" />
      <rect x="28" y="8.5" width="8" height="1.8" rx="0.9" fill="currentColor" opacity="0.55" />

      <rect className="g-rise" x="23.5" y="18" width="17" height="11" rx="2.6" fill={MINT} />
      <rect className="g-rise g-d1" x="23.5" y="32" width="17" height="6.5" rx="2" fill={IRIS} />
      <rect className="g-rise g-d2" x="23.5" y="41.5" width="11" height="6.5" rx="2" fill={MUTE} opacity="0.7" />

      <circle cx="32" cy="54" r="1.8" fill="currentColor" opacity="0.5" />
    </>
  )
}

/* Shopfront under an awning, with the conversion line climbing out of it. */
function Shop() {
  return (
    <>
      <path d="M9 22h46l-5-9H14z" {...stroke} opacity="0.55" />
      <path d="M11 22v27a3 3 0 003 3h36a3 3 0 003-3V22" {...stroke} opacity="0.55" />
      <path d="M20.5 13v9M31.9 13v9M43.3 13v9" {...stroke} opacity="0.3" />

      {/* Tote */}
      <path className="g-rise" d="M25 33h14v14a2.5 2.5 0 01-2.5 2.5h-9A2.5 2.5 0 0125 47z" fill={MINT} opacity="0.9" />
      <path className="g-rise" d="M29 33v-3.5a3 3 0 016 0V33" {...stroke} stroke={SOLAR} />

      {/* Trend line, redrawn on a loop */}
      <path
        className="g-dash"
        d="M14 46l8-6 7 4 9-9"
        {...stroke}
        stroke={SOLAR}
        strokeWidth="1.8"
        strokeDasharray="5 5"
        opacity="0.8"
      />
    </>
  )
}

/* Microcontroller board driving a servo arm through its travel. */
function Robot() {
  return (
    <>
      <rect x="7" y="36" width="36" height="21" rx="3.5" {...stroke} opacity="0.55" />

      {/* Header pins */}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <rect key={i} x={11 + i * 4.4} y="38.5" width="2.4" height="4" rx="0.6" fill={SOLAR} opacity="0.85" />
      ))}

      {/* Onboard die + status light */}
      <rect x="15" y="46" width="12" height="7" rx="1.5" fill={IRIS} opacity="0.55" />
      <circle className="g-blink" cx="37" cy="50" r="2" fill={MINT} />

      {/* Servo */}
      <circle cx="47" cy="40" r="3.6" fill={IRIS} />
      <g className="g-sweep" style={{ transformOrigin: '47px 40px' }}>
        <path d="M47 40V22" {...stroke} stroke={MINT} strokeWidth="2.6" />
        <path d="M47 22h9" {...stroke} stroke={MINT} strokeWidth="2.6" />
        <circle cx="56" cy="22" r="2.8" fill={SOLAR} />
      </g>
    </>
  )
}

/* Sensor node broadcasting — arcs expand outward from the antenna. */
function Iot() {
  return (
    <>
      <rect x="22" y="40" width="20" height="14" rx="3" {...stroke} opacity="0.6" />
      <circle className="g-blink" cx="27.5" cy="47" r="1.8" fill={MINT} />
      <path d="M33 47h6" {...stroke} opacity="0.5" />

      <path d="M32 40v-6" {...stroke} stroke={MUTE} opacity="0.7" />
      <circle cx="32" cy="32" r="3" fill={IRIS} />

      <path className="g-wave" style={{ transformOrigin: '32px 32px' }} d="M23 29a12 12 0 0118 0" {...stroke} stroke={MINT} />
      <path className="g-wave g-d1" style={{ transformOrigin: '32px 32px' }} d="M17 24a20 20 0 0130 0" {...stroke} stroke={IRIS} />
      <path className="g-wave g-d2" style={{ transformOrigin: '32px 32px' }} d="M11 19a28 28 0 0142 0" {...stroke} stroke={SOLAR} />
    </>
  )
}

/* Model output: a distribution settling, sampled by a scanning line. */
function Data() {
  return (
    <>
      <path className="g-dash" d="M6 15h52" {...stroke} stroke={MUTE} strokeDasharray="4 6" opacity="0.6" />

      <rect className="g-bar" x="11" y="27" width="8" height="26" rx="2" fill={IRIS} />
      <rect className="g-bar g-d1" x="22.5" y="20" width="8" height="33" rx="2" fill={MINT} />
      <rect className="g-bar g-d2" x="34" y="32" width="8" height="21" rx="2" fill={ROSE} />
      <rect className="g-bar g-d3" x="45.5" y="24" width="8" height="29" rx="2" fill={SOLAR} />

      <path d="M6 53h52" {...stroke} opacity="0.45" />
    </>
  )
}

const GLYPHS = { web: Web, app: App, shop: Shop, robot: Robot, iot: Iot, data: Data }

export default function Glyph({ name, className = '' }) {
  const Shape = GLYPHS[name]
  if (!Shape) return null

  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden focusable="false">
      <Shape />
    </svg>
  )
}
