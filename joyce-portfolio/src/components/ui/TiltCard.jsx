import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'

/**
 * Glass panel that tilts toward the pointer and tracks a spotlight through
 * the --mx / --my custom properties consumed by the .spotlight class.
 */
export default function TiltCard({ children, className = '', intensity = 7, ...rest }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)

  const spring = { stiffness: 170, damping: 20, mass: 0.4 }
  const rotateX = useSpring(useTransform(py, [0, 1], [intensity, -intensity]), spring)
  const rotateY = useSpring(useTransform(px, [0, 1], [-intensity, intensity]), spring)

  function handleMove(e) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const nx = (e.clientX - rect.left) / rect.width
    const ny = (e.clientY - rect.top) / rect.height
    px.set(nx)
    py.set(ny)
    el.style.setProperty('--mx', `${nx * 100}%`)
    el.style.setProperty('--my', `${ny * 100}%`)
  }

  function handleLeave() {
    px.set(0.5)
    py.set(0.5)
  }

  if (reduced) {
    return (
      <div ref={ref} className={`glass glass-edge spotlight ${className}`} {...rest}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className={`glass glass-edge spotlight transition-shadow duration-500 hover:shadow-lift ${className}`}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
