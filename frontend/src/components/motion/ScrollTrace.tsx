"use client"

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion"

/**
 * Step C4 (scroll-drawn ECG, owner Q4): the site's ECG trace as a
 * slim strip on the landing header's bottom edge — the header is
 * already sticky, so the strip stays in view for the whole page
 * and the trace draws itself left→right with page scroll progress
 * (goal-gradient: the line fills as you approach the end).
 *
 * The path data is the hero's Signature Flow trace verbatim (same
 * viewBox, same stroke-brand) — the motif's third appearance
 * (hero beat, PulseLoader, this strip) in one brand language. The
 * viewBox is squashed into the strip by preserveAspectRatio="none";
 * vector-effect="non-scaling-stroke" keeps the line a crisp 1.5px
 * regardless of that squash.
 *
 * Driven purely by scroll (framer's useScroll page progress fed
 * through a soft spring into the path's pathLength), never by the
 * pointer — so touch devices get it too, at the cost of one
 * compositor-friendly dash update per frame. A faint full trace
 * sits underneath as the undrawn track.
 *
 * Reduced motion: no draw at all — the full trace renders
 * statically at low opacity, the same fallback .pulse-beat uses
 * in globals.css. Decorative only: aria-hidden, no pointer
 * events, fixed height, so it never covers content or shifts
 * layout (the taller header still fits the sections' existing
 * scroll-mt-28 / md:scroll-mt-24 offsets).
 */

// The hero trace, character-for-character (welcome/page.tsx).
const TRACE_D =
  "M0 96 H240 L262 96 L280 62 L300 128 L322 24 L344 96 H560 L582 96 L600 68 L620 120 L640 96 H880 L902 96 L920 56 L942 134 L964 20 L986 96 H1200 L1222 96 L1240 66 L1260 122 L1280 96 H1440"

const TRACE_PROPS = {
  d: TRACE_D,
  fill: "none",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  vectorEffect: "non-scaling-stroke",
  className: "stroke-brand",
} as const

export function ScrollTrace() {
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <div aria-hidden="true" className="pointer-events-none relative h-[14px] w-full">
      <svg
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        {reduceMotion ? (
          <path {...TRACE_PROPS} opacity={0.3} />
        ) : (
          <>
            {/* The undrawn track: the full trace, faint. */}
            <path {...TRACE_PROPS} opacity={0.15} />
            {/* The drawn progress, riding the same geometry. */}
            <motion.path {...TRACE_PROPS} opacity={0.55} style={{ pathLength }} />
          </>
        )}
      </svg>
    </div>
  )
}
