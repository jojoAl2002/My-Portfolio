import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

/**
 * Scroll-triggered entrance used by every section, so the whole page shares
 * one timing language instead of ad-hoc transitions.
 *
 * `rotateY` needs an ancestor with the `perspective` utility, or the rotation
 * flattens into a horizontal squash.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 28,
  x = 0,
  rotateY = 0,
  blur = true,
  className = '',
  as = 'div',
}) {
  const reduced = useReducedMotion()
  const MotionTag = motion[as] || motion.div

  if (reduced) return <MotionTag className={className}>{children}</MotionTag>

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y, x, rotateY, filter: blur ? 'blur(10px)' : 'none' }}
      whileInView={{ opacity: 1, y: 0, x: 0, rotateY: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-90px' }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  )
}
