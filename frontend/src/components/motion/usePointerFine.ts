"use client"

import { useEffect, useState } from "react"

/**
 * Step C foundation: the ONE gate for every pointer-driven effect
 * (cursor glow, tilt, magnetic pull). Returns true only when the
 * primary pointer is fine (mouse / trackpad) — touch devices never
 * activate the mouse layer, so their cost is exactly zero.
 *
 * SSR-safe: starts false and resolves after mount, so server output
 * and first paint never assume a pointer exists. Listens for change
 * (a tablet gaining/losing a mouse mid-session flips it live).
 */
export function usePointerFine() {
  const [pointerFine, setPointerFine] = useState(false)

  useEffect(() => {
    const query = window.matchMedia("(pointer: fine)")
    setPointerFine(query.matches)
    const onChange = (event: MediaQueryListEvent) => setPointerFine(event.matches)
    query.addEventListener("change", onChange)
    return () => query.removeEventListener("change", onChange)
  }, [])

  return pointerFine
}
