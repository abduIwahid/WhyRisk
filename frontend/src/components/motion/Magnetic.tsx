"use client"

import { type MouseEvent, type ReactNode } from "react"
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion"
import { usePointerFine } from "./usePointerFine"

/**
 * Step C foundation (applied to primary marketing CTAs in C3): a
 * subtle magnetic pull — the element leans toward the cursor by a
 * fraction of the offset, capped at ~6px, and springs back on
 * leave. Marketing primaries only, by design: form submit buttons
 * are never wrapped, because a target that moves while a form user
 * is aiming at it is a Fitts liability.
 *
 * Renders inline-block so the wrapper hugs the CTA it carries, and
 * the exact same DOM whether or not the effect is active — the
 * handlers stay detached on touch devices and for reduced-motion
 * users, so the cost there is zero and layout never shifts.
 * Keyboard focus is unaffected (the layer is pointer-only).
 */
export function Magnetic({
  children,
  className,
  strength = 0.25,
  max = 6,
}: {
  children: ReactNode
  className?: string
  /** Fraction of the cursor's offset from centre to follow. */
  strength?: number
  /** Cap on the pull in px, per axis. Plan cap: ~6. */
  max?: number
}) {
  const pointerFine = usePointerFine()
  const reduceMotion = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 160, damping: 18, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 160, damping: 18, mass: 0.4 })
  const active = pointerFine && !reduceMotion

  const clamp = (value: number) => Math.max(-max, Math.min(max, value))
  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const dx = event.clientX - (rect.left + rect.width / 2)
    const dy = event.clientY - (rect.top + rect.height / 2)
    x.set(clamp(dx * strength))
    y.set(clamp(dy * strength))
  }
  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      className={className}
      onMouseMove={active ? handleMove : undefined}
      onMouseLeave={active ? handleLeave : undefined}
      style={{ x: springX, y: springY, display: "inline-block" }}
    >
      {children}
    </motion.div>
  )
}
