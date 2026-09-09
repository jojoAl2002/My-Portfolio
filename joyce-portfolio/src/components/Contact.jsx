import { profile } from '../data/cvData'

export default function Contact() {
  return (
    <section id="contact" className="relative py-28 border-t border-line/70">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <h2 className="font-display text-4xl md:text-6xl text-ink max-w-2xl leading-tight">
          Building a healthcare feature or a Shopify storefront? Let's talk.
        </h2>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="rounded-full bg-signal text-void font-medium px-6 py-3 hover:bg-signal/90 transition-colors"
          >
            {profile.email}
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-line px-6 py-3 text-ink hover:border-signal/60 transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={`tel:${profile.phone.replace(/\s+/g, '')}`}
            className="rounded-full border border-line px-6 py-3 text-ink hover:border-signal/60 transition-colors"
          >
            {profile.phone}
          </a>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-6 md:px-10 mt-24 pt-8 border-t border-line/60 flex flex-col sm:flex-row justify-between gap-2 font-mono text-xs text-mute">
        <span>{profile.name} — {profile.location}</span>
        <span>Built with React, Tailwind and Three.js</span>
      </div>
    </section>
  )
}
