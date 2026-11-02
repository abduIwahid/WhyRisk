"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

/**
 * Scroll-triggered reveal used across the landing page and the
 * signed-in dashboards. Two directions share one easing family:
 *  - "left" (default): slides in from the left (x: -76 → 0) with a
 *    fade — the landing-page language, unchanged.
 *  - "up": rises from below (y: 36 → 0) with a fade — used for card
 *    grids and stat blocks inside the app so reveals are not all
 *    travelling the same way.
 *
 * Both fire the first time the block enters the viewport. Transform
 * animations are disabled for users who prefer reduced motion by the
 * app-wide MotionConfig (reducedMotion="user" in MotionProvider);
 * the opacity fade remains, matching the CSS .reveal fallback in
 * globals.css.
 */
export function SlideIn({
  children,
  delay = 0,
  className,
  direction = "left",
}: {
  children: ReactNode
  delay?: number
  className?: string
  direction?: "left" | "up"
}) {
  const fromLeft = direction === "left"
  return (
    <motion.div
      className={className}
      initial={fromLeft ? { opacity: 0, x: -76 } : { opacity: 0, y: 36 }}
      whileInView={fromLeft ? { opacity: 1, x: 0 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: fromLeft ? 0.8 : 0.7,
        delay,
        ease: [0.22, 0.8, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
