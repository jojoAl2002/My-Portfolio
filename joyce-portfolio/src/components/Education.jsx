import { education, certifications } from '../data/cvData'

export default function Education() {
  return (
    <section id="education" className="relative py-28 border-t border-line/70">
      <div className="mx-auto max-w-6xl px-6 md:px-10 grid md:grid-cols-2 gap-16">
        <div>
          <h2 className="font-display text-3xl md:text-4xl text-ink mb-8">Education</h2>
          <div className="space-y-8">
            {education.map((ed) => (
              <div key={ed.degree} className="border-l-2 border-line pl-5">
                <h3 className="font-display text-lg text-ink">{ed.degree}</h3>
                <p className="text-mute text-sm mt-1">{ed.school}</p>
                <p className="font-mono text-xs text-signal mt-1">{ed.period}</p>
                {ed.note && <p className="text-ink/70 text-sm mt-2">{ed.note}</p>}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-display text-3xl md:text-4xl text-ink mb-8">Training & certifications</h2>
          <ul className="space-y-3">
            {certifications.map((c) => (
              <li
                key={c.name}
                className="flex items-baseline justify-between gap-4 border-b border-line/60 pb-3"
              >
                <span className="text-ink/90">{c.name}</span>
                <span className="font-mono text-xs text-mute whitespace-nowrap">{c.org}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
