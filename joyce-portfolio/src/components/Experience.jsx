import { experience } from '../data/cvData'

export default function Experience() {
  return (
    <section id="work" className="relative py-28 border-t border-line/70">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <h2 className="font-display text-3xl md:text-4xl text-ink mb-4">Experience</h2>
        <p className="text-mute max-w-xl mb-16">
          From IT support to owning the doctors' side of a healthcare platform — in order.
        </p>

        <div className="relative">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-line hidden sm:block" />
          <div className="space-y-14">
            {experience.map((job) => (
              <article key={job.role + job.company} className="relative sm:pl-12">
                <span className="absolute left-0 top-1.5 hidden sm:block h-4 w-4 rounded-full border-2 border-signal bg-void" />
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-3">
                  <h3 className="font-display text-xl text-ink">
                    {job.role} <span className="text-mute font-body">— {job.company}</span>
                  </h3>
                  <span className="font-mono text-xs text-signal whitespace-nowrap">{job.period}</span>
                </div>
                <p className="font-mono text-xs text-mute mb-4">{job.location}</p>
                <ul className="space-y-2">
                  {job.points.map((point) => (
                    <li key={point} className="text-ink/80 leading-relaxed pl-4 relative">
                      <span className="absolute left-0 top-[0.6em] h-1 w-1 rounded-full bg-pulse" />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
