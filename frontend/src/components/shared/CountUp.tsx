"use client"

import { useEffect, useRef, useState } from "react"
import { animate, useInView, useReducedMotion } from "framer-motion"

/**
 * Counts a numeric value up from zero the first time it scrolls into
 * view (extracted from StatsBand so the dashboards share the landing
 * page's count-up). The final value is the initial render state, so
 * SSR and no-JS visitors see the real figure — the count-up only
 * replays it after mount, and never runs for users who prefer reduced
 * motion. Non-numeric text (e.g. "—" for a failed count) renders
 * as-is and never animates.
 */
export function CountUp({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const reduceMotion = useReducedMotion()
  const target = Number(text)
  const decimals = text.includes(".") ? text.split(".")[1].length : 0
  const [display, setDisplay] = useState(text)

  useEffect(() => {
    if (!inView || reduceMotion || !Number.isFinite(target)) return
    const controls = animate(0, target, {
      duration: 1.4,
      ease: [0.22, 0.8, 0.3, 1],
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    })
    return () => controls.stop()
  }, [inView, reduceMotion, target, decimals])

  return <span ref={ref}>{display}</span>
}
