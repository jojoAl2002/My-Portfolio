const links = [
  { href: '#work', label: 'Work' },
  { href: '#skills', label: 'Skills' },
  { href: '#education', label: 'Education' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-line/70 bg-void/70 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-6 md:px-10 h-16 flex items-center justify-between">
        <a href="#top" className="font-display text-lg tracking-tight text-ink">
          Joyce Alam
        </a>
        <nav className="hidden sm:flex items-center gap-8 font-mono text-sm text-mute">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-signal transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="mailto:joyce3alam@gmail.com"
          className="hidden sm:inline-block rounded-full border border-signal/40 px-4 py-1.5 text-sm text-signal hover:bg-signal/10 transition-colors"
        >
          Say hello
        </a>
      </div>
    </header>
  )
}
