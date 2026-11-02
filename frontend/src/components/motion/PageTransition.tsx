"use client"

import { motion, useReducedMotion } from "framer-motion"
import type { ReactNode } from "react"

/**
 * Step C5 (page transitions, owner Q2): the soft entrance every
 * public + auth navigation gets — a short crossfade with a 10px
 * rise, on the house ease, once per navigation (the root
 * template remounts this wrapper on each route change; see
 * app/template.tsx for the route scoping).
 *
 * Opacity + transform only, and nothing here gates input: the
 * wrapper never touches pointer events, so the page underneath is
 * interactive from the first frame while it settles (Doherty —
 * the feedback is instant, the polish is 220ms).
 *
 * First paint: framer renders the initial state (opacity 0) as
 * inline style during SSR, so there is no flash of the finished
 * page before the fade — the fade IS the first paint.
 *
 * Reduced motion: the app-wide MotionConfig (reducedMotion="user"
 * in MotionProvider) disables transform animations for users who
 * prefer reduced motion, so the rise is dropped automatically
 * and only the fade remains; the fade itself shortens to ~120ms
 * via useReducedMotion, the same convention SlideIn and
 * ScrollTrace rely on.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduceMotion ? 0.12 : 0.22,
        ease: [0.22, 0.8, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
