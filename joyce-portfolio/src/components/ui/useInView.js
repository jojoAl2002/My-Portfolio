import { useEffect, useRef, useState } from 'react'

/**
 * Tracks whether an element is near the viewport. Used to park WebGL canvases
 * on `frameloop="demand"` while they are scrolled away — two live scenes on one
 * page is otherwise a constant GPU cost for pixels nobody is looking at.
 */
export default function useInView(rootMargin = '250px') {
  const ref = useRef(null)
  const [inView, setInView] = useState(true)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return

    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin,
    })
    io.observe(el)
    return () => io.disconnect()
  }, [rootMargin])

  return [ref, inView]
}
