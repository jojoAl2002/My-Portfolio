import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrambleText from './ui/ScrambleText'
import { profile } from '../data/cvData'

const links = [
  { href: '#work', label: 'Work', id: 'work' },
  { href: '#domains', label: 'Domains', id: 'domains' },
  { href: '#experience', label: 'Path', id: 'experience' },
  { href: '#skills', label: 'Stack', id: 'skills' },
  { href: '#education', label: 'Education', id: 'education' },
  { href: '#contact', label: 'Contact', id: 'contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('top')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Highlight whichever section owns the upper third of the viewport.
  useEffect(() => {
    const ids = ['top', ...links.map((l) => l.id)]
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-35% 0px -60% 0px', threshold: 0 }
    )

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[80] px-4 pt-4 sm:px-6 sm:pt-5">
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 transition-all duration-500 sm:px-5 ${
            scrolled
              ? 'h-14 border border-white/[0.08] bg-void/75 shadow-panel backdrop-blur-xl'
              : 'h-16 border border-transparent bg-transparent'
          }`}
        >
          <a href="#top" className="group flex items-center gap-3" aria-label="Back to top">
            <span className="relative grid h-8 w-8 place-items-center overflow-hidden rounded-lg bg-holo font-display text-sm font-bold text-void">
              JA
              <span className="absolute inset-0 rounded-lg bg-holo opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-80" />
            </span>
            <span className="hidden font-display text-[15px] tracking-tight text-ink sm:block">
              {profile.name}
            </span>
          </a>

          <nav className="hidden items-center gap-0.5 lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`relative rounded-full px-3 py-2 font-mono text-[12px] uppercase tracking-[0.14em] transition-colors duration-300 ${
                  active === l.id ? 'text-ink' : 'text-mute hover:text-ink'
                }`}
              >
                {active === l.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full border border-mint/25 bg-mint/[0.08]"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <ScrambleText text={l.label} className="relative" duration={420} />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="hidden rounded-full border border-mint/35 px-4 py-1.5 font-mono text-[12px] uppercase tracking-[0.14em] text-mint transition-all duration-300 hover:bg-mint/10 hover:shadow-glow sm:inline-block"
            >
              <ScrambleText text="Say hello" duration={420} />
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/[0.03] lg:hidden"
            >
              <span className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 h-px w-4 bg-ink transition-all duration-300 ${
                    open ? 'top-1.5 rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-0 top-1.5 h-px w-4 bg-ink transition-all duration-300 ${
                    open ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute left-0 h-px w-4 bg-ink transition-all duration-300 ${
                    open ? 'top-1.5 -rotate-45' : 'top-3'
                  }`}
                />
              </span>
            </button>
          </div>
        </motion.div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[75] bg-void/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="grid-overlay absolute inset-0 opacity-30" />
            <nav className="relative flex h-full flex-col justify-center gap-2 px-8">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-baseline gap-4 border-b border-line/60 py-5 font-display text-3xl text-ink"
                >
                  <span className="font-mono text-xs text-mint">0{i + 1}</span>
                  {l.label}
                </motion.a>
              ))}
              <motion.a
                href={`mailto:${profile.email}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
                className="mt-8 font-mono text-sm text-mint"
              >
                {profile.email}
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
