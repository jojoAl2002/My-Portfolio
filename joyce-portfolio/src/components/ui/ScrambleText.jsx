import { useCallback, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

const GLYPHS = '!<>-_\\/[]{}=+*^?#§$%&01'

/**
 * Decrypt-on-hover. Characters resolve left to right while the tail keeps
 * churning, so a label reads as something being decoded rather than typed.
 * Pair with a monospace face — proportional glyphs make the box jitter.
 */
export default function ScrambleText({
  text,
  className = '',
  as: Tag = 'span',
  duration = 540,
  trigger = 'hover',
}) {
  const [display, setDisplay] = useState(text)
  const raf = useRef()
  const reduced = useReducedMotion()

  const run = useCallback(() => {
    if (reduced) return
    cancelAnimationFrame(raf.current)

    const start = performance.now()
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1)
      const revealed = t * text.length

      let out = ''
      for (let i = 0; i < text.length; i++) {
        if (i < revealed || text[i] === ' ') out += text[i]
        else out += GLYPHS[(Math.random() * GLYPHS.length) | 0]
      }
      setDisplay(out)

      if (t < 1) raf.current = requestAnimationFrame(tick)
      else setDisplay(text)
    }

    raf.current = requestAnimationFrame(tick)
  }, [text, duration, reduced])

  // Keep the label honest if the source text changes mid-flight.
  useEffect(() => setDisplay(text), [text])
  useEffect(() => () => cancelAnimationFrame(raf.current), [])

  const handlers = trigger === 'hover' ? { onMouseEnter: run, onFocus: run } : {}

  return (
    <Tag className={className} {...handlers}>
      {display}
    </Tag>
  )
}
