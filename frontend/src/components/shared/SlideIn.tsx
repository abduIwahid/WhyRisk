"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

/**
 * Scroll-triggered left-to-right slide reveal for landing sections.
 *
 * Slides content in from the left (x: -76 → 0) with a fade the first
 * time it enters the viewport. Transform animations are disabled for
 * users who prefer reduced motion by the app-wide MotionConfig
 * (reducedMotion="user" in MotionProvider); the opacity fade remains,
 * matching the CSS .reveal fallback in globals.css.
 */
export function SlideIn({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: -76 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 0.8, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
