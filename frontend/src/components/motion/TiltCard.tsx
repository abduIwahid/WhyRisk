"use client"

import { type MouseEvent, type ReactNode } from "react"
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion"
import { usePointerFine } from "./usePointerFine"

/**
 * Step C foundation (applied to marketing cards in C3): a gentle 3D
 * tilt — capped at 6° per axis — that leans the card toward the
 * cursor and springs back flat on leave. One wrapper, one set of
 * constants, so every tilted card behaves identically (Law of
 * Similarity). Marketing cards only: tilting data a clinician is
 * reading would fight readability, so dashboards never use this.
 *
 * Renders the exact same DOM whether or not the effect is active —
 * the handlers simply stay detached on touch devices and for
 * reduced-motion users, so there is zero layout shift either way.
 * Transform-only: rotateX/rotateY on springs, the perspective
 * carried by the moving element itself.
 */
export function TiltCard({
  children,
  className,
  max = 6,
}: {
  children: ReactNode
  className?: string
  /** Peak tilt in degrees on each axis. Plan cap: 6. */
  max?: number
}) {
  const pointerFine = usePointerFine()
  const reduceMotion = useReducedMotion()
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springRotateX = useSpring(rotateX, { stiffness: 180, damping: 22, mass: 0.5 })
  const springRotateY = useSpring(rotateY, { stiffness: 180, damping: 22, mass: 0.5 })
  const active = pointerFine && !reduceMotion

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    if (rect.width === 0 || rect.height === 0) return
    const px = (event.clientX - rect.left) / rect.width - 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5
    rotateY.set(px * max * 2)
    rotateX.set(-py * max * 2)
  }
  const handleLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      className={className}
      onMouseMove={active ? handleMove : undefined}
      onMouseLeave={active ? handleLeave : undefined}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformPerspective: 900,
      }}
    >
      {children}
    </motion.div>
  )
}
