"use client"

import { useRef, type ReactNode } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { usePointerFine } from "./usePointerFine"

/**
 * Step C3 (hero photo): a scroll-linked drift of at most 10px on
 * the wrapped layer — the background moves a breath slower than
 * the page, which reads as depth. Transform-only (a `y` motion
 * value fed by the wrapper's own scroll progress), so nothing
 * reflows and no layout changes; the wrapped layer must already
 * carry headroom (the hero photo's scale-[1.06]) so the drift
 * never uncovers an edge.
 *
 * Gated like every Step C pointer/motion effect: fine pointers
 * only and never under prefers-reduced-motion — touch devices
 * and reduced-motion users get the layer exactly as it was,
 * static, at zero cost.
 */
export function Parallax({
  children,
  className,
  distance = 10,
}: {
  children: ReactNode
  className?: string
  /** Total drift in px across the wrapper's scroll-through. Plan cap: 10. */
  distance?: number
}) {
  const pointerFine = usePointerFine()
  const reduceMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, distance])
  const active = pointerFine && !reduceMotion

  return (
    <motion.div ref={ref} className={className} style={active ? { y } : undefined}>
      {children}
    </motion.div>
  )
}
