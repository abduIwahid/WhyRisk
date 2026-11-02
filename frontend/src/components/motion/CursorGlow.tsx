"use client"

import { useEffect, useRef } from "react"
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion"
import { usePointerFine } from "./usePointerFine"

/**
 * Step C foundation (mounted by the hero in C3): a soft radial light
 * in the brand colour that follows the cursor — the one glow on the
 * site, deliberately (Von Restorff). The gradient is pre-rendered
 * and only ever moved by transform on a spring, so no frame ever
 * repaints a blur or a background position.
 *
 * Renders nothing unless the pointer is fine AND the user has not
 * asked for reduced motion: touch devices and reduced-motion users
 * keep the plain static surface underneath, at zero cost. The layer
 * is decorative (aria-hidden, pointer-events-none) and tracks
 * movement across its parent, which must be positioned (and, per
 * the hero's construction, overflow-hidden).
 */
export function CursorGlow({
  size = 480,
  className,
}: {
  /** Disc diameter in px. */
  size?: number
  className?: string
}) {
  const pointerFine = usePointerFine()
  const reduceMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  // Parked one disc-width off-stage until the first pointer move.
  const x = useMotionValue(-size)
  const y = useMotionValue(-size)
  // A follow, not a chase: a soft spring trailing the cursor.
  const springX = useSpring(x, { stiffness: 120, damping: 20, mass: 0.5 })
  const springY = useSpring(y, { stiffness: 120, damping: 20, mass: 0.5 })
  const active = pointerFine && !reduceMotion

  useEffect(() => {
    if (!active) return
    const parent = ref.current?.parentElement
    if (!parent) return
    const onMove = (event: PointerEvent) => {
      const rect = parent.getBoundingClientRect()
      x.set(event.clientX - rect.left - size / 2)
      y.set(event.clientY - rect.top - size / 2)
    }
    const onLeave = () => {
      x.set(-size)
      y.set(-size)
    }
    parent.addEventListener("pointermove", onMove)
    parent.addEventListener("pointerleave", onLeave)
    return () => {
      parent.removeEventListener("pointermove", onMove)
      parent.removeEventListener("pointerleave", onLeave)
    }
  }, [active, size, x, y])

  if (!active) return null

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute left-0 top-0 rounded-full ${className ?? ""}`}
      style={{
        width: size,
        height: size,
        x: springX,
        y: springY,
        background:
          "radial-gradient(circle, rgb(var(--brand) / 0.16) 0%, rgb(var(--brand) / 0.07) 42%, transparent 68%)",
      }}
    />
  )
}
