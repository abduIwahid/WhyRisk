"use client"

import { usePathname } from "next/navigation"
import type { ReactNode } from "react"
import { PageTransition } from "@/components/motion/PageTransition"

/**
 * Step C5 (page transitions, owner Q2): Next renders ONE root
 * template around every route, so the scope lives here — the
 * transition wrapper is applied only to public + auth routes,
 * and signed-in routes render their children bare (no wrapper
 * element at all), keeping in-app navigation instant by design:
 * the patient/doctor/admin shells are task tools, and a remount
 * animation on every click would tax exactly the users who
 * navigate most (Doherty).
 *
 * A per-segment template split was rejected: the public pages
 * (welcome, contact-us, model-card, privacy, terms) sit at the
 * app root with no route group to hang a template on, so a root
 * template plus this whitelist is the one mechanism that covers
 * the whole scope uniformly (Similarity).
 *
 * In scope (public + auth):
 *   /, /welcome, /contact-us, /model-card, /privacy, /terms,
 *   /login, /signup, /forgot-password, /update-password (the
 *   (auth) group), /onboarding (+ /onboarding/doctor),
 *   /pending-approval, and anything under /auth/ if it appears.
 * Deliberately out: every (dashboard) route (/dashboard,
 * /patients, /predict, /analytics, /appointments, /alerts,
 * /assistant, /doctors, /settings, /admin, plus the shell's own
 * /about and /contact — note those two are signed-in pages here,
 * NOT public ones) and the whole /patient tree.
 *
 * Template mechanics: the template remounts per navigation, so
 * the transition fires once per route change. Same-page anchor
 * jumps (the landing's #check / #how / #scope links) do not
 * change the pathname, so they never remount this template —
 * scroll position and anchor clearance are exactly as before.
 * At rest the wrapper's transform resolves to none, so it does
 * not become a containing block for the landing's sticky header.
 */

const TRANSITION_EXACT = new Set([
  "/",
  "/welcome",
  "/contact-us",
  "/model-card",
  "/privacy",
  "/terms",
  "/login",
  "/signup",
  "/forgot-password",
  "/update-password",
  "/onboarding",
  "/pending-approval",
])

const TRANSITION_PREFIXES = ["/onboarding/", "/auth/"]

function isTransitionRoute(pathname: string) {
  return (
    TRANSITION_EXACT.has(pathname) ||
    TRANSITION_PREFIXES.some((prefix) => pathname.startsWith(prefix))
  )
}

export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  // pathname is null only outside a matched route render (e.g.
  // the not-found boundary); render bare rather than guess.
  if (pathname === null || !isTransitionRoute(pathname)) {
    return <>{children}</>
  }
  return <PageTransition>{children}</PageTransition>
}
