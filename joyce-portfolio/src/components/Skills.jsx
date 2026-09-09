import { skillGroups } from '../data/cvData'

export default function Skills() {
  return (
    <section id="skills" className="relative py-28 border-t border-line/70">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="grid md:grid-cols-[280px_1fr] gap-12">
          <div>
            <h2 className="font-display text-3xl md:text-4xl text-ink">What I work with</h2>
            <p className="mt-4 text-mute max-w-xs">
              A stack built across healthcare software, Shopify storefronts and a few detours into
              embedded systems and ERP.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-10">
            {skillGroups.map((group) => (
              <div key={group.label}>
                <h3 className="font-mono text-sm text-signal mb-3">{group.label}</h3>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-line px-3 py-1.5 text-sm text-ink/90 bg-panel/50"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
