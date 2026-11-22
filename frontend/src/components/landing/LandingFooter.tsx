import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/landing/chrome"
import BrandMark from "@/components/shared/BrandMark"

/**
 * Landing footer in the Watermelon template's structure (22 Nov
 * 2026): brand column + `//` link columns over a hairline, the
 * status strip (pulsing dot, loading-bar graphic, [ WHYRISK ]), and
 * the bottom row with the standing disclaimer. The template's dark
 * band becomes WhyRisk's deep violet (#574CD6) — the same surface as
 * the hero scrims and the login panel.
 */

function ColTitle({ children }: { children: string }) {
  return (
    <div className="mb-5 flex gap-2 font-mono text-xs tracking-widest text-[#E0DCFF]">
      <span className="opacity-70">{"//"}</span> {children}
    </div>
  )
}

function FootLink({ href, children }: { href: string; children: string }) {
  const cls = "mb-5 block text-sm text-white/60 transition-colors hover:text-white"
  return href.startsWith("#") || href.startsWith("/#") ? (
    <a href={href} className={cls}>
      {children}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
    </Link>
  )
}

export function LandingFooter() {
  return (
    <footer className="relative mt-6 overflow-hidden bg-[#574CD6] font-mono text-white">
      {/* Crosshairs at the top corners (template detail) */}
      <div aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-8 w-8">
        <div className="absolute left-4 top-0 h-full w-px bg-white/15" />
        <div className="absolute left-0 top-4 h-px w-full bg-white/15" />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 h-8 w-8">
        <div className="absolute right-4 top-0 h-full w-px bg-white/15" />
        <div className="absolute right-0 top-4 h-px w-full bg-white/15" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 pb-12 pt-20 sm:px-5 lg:px-16">
        <div className="relative grid grid-cols-1 gap-12 border-b border-white/10 pb-16 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col items-start lg:col-span-5 lg:pr-8">
            <ColTitle>WHYRISK</ColTitle>
            <h3 className="mb-6 font-sans text-3xl tracking-tight text-white md:text-5xl">
              Risk, explained.
            </h3>
            <p className="mb-8 max-w-md text-sm leading-relaxed text-white/60">
              An experimental clinical decision-support tool: a trained diabetes model whose every
              score shows its reasons, in plain language.
            </p>
            <Link
              href="/signup"
              className="inline-flex w-fit items-center justify-center bg-white px-8 py-4 font-mono text-xs font-bold uppercase tracking-widest text-[#574CD6] transition hover:bg-white/90 active:scale-[0.96]"
            >
              Create your account <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:col-span-7 lg:pl-8">
            <div className="flex flex-col">
              <ColTitle>PRODUCT</ColTitle>
              <FootLink href="#check">Risk check</FootLink>
              <FootLink href="/model-card">The model</FootLink>
              <FootLink href="#how">How it works</FootLink>
              <FootLink href="#scope">Scope</FootLink>
            </div>
            <div className="flex flex-col">
              <ColTitle>COMPANY</ColTitle>
              <FootLink href="/contact-us">Contact</FootLink>
              <FootLink href="/model-card">Model card</FootLink>
              <FootLink href="/login">Sign in</FootLink>
            </div>
            <div className="flex flex-col">
              <ColTitle>LEGAL</ColTitle>
              <FootLink href="/privacy">Privacy</FootLink>
              <FootLink href="/terms">Terms</FootLink>
            </div>
          </div>

          <div aria-hidden="true" className="absolute bottom-0 left-[41.666%] top-0 hidden w-px bg-white/10 lg:block" />
        </div>

        {/* Status strip */}
        <div className="relative flex flex-col items-center justify-between gap-6 overflow-hidden border-b border-white/10 px-2 py-6 md:flex-row">
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />
          <div className="relative z-10 flex items-center gap-3">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#E0DCFF] shadow-[0_0_8px_rgba(224,220,255,0.7)]" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#E0DCFF]">
              Model live — Diabetes v1
            </span>
          </div>
          <div aria-hidden="true" className="hidden items-center gap-[2px] opacity-80 lg:flex">
            {Array.from({ length: 30 }).map((_, i) => (
              <div key={i} className={`h-4 w-1.5 ${i < 12 ? "bg-[#E0DCFF]" : "bg-white/15"}`} />
            ))}
          </div>
          <div className="relative z-10 font-mono text-xs tracking-widest text-[#E0DCFF]">
            [ WHYRISK ]
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col items-start justify-between gap-8 pt-12 xl:flex-row xl:items-center">
          <div className="flex items-center gap-3">
            <BrandMark className="h-8 w-8 shrink-0" />
            <span className="font-sans text-lg font-bold tracking-tight text-white">WhyRisk</span>
            <div className="ml-5 hidden flex-col border-l border-white/15 pl-6 md:flex">
              <span className="text-xs tracking-widest text-white/50">Risk, explained.</span>
              <span className="text-xs tracking-widest text-white/50">Measured, not marketed.</span>
            </div>
          </div>
          <p className="max-w-[520px] text-[11px] uppercase leading-relaxed tracking-widest text-white/50">
            Not a certified medical device. Does not replace professional diagnosis. Built during a
            machine-learning internship at Ezitech Institute, Islamabad.
          </p>
          <div className="flex flex-col items-start gap-3 xl:items-end">
            <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-[#E0DCFF]">
              <span className="opacity-70">{"//"}</span> CONNECT
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/abduIwahid/WhyRisk"
                target="_blank"
                rel="noreferrer"
                aria-label="WhyRisk on GitHub"
                className="flex h-8 w-8 items-center justify-center border border-white/15 bg-white/5 text-white/60 transition hover:border-white/40 hover:text-white"
              >
                <GithubIcon />
              </a>
              <a
                href="https://www.linkedin.com/in/abdu1wahid"
                target="_blank"
                rel="noreferrer"
                aria-label="Abdul Wahid on LinkedIn"
                className="flex h-8 w-8 items-center justify-center border border-white/15 bg-white/5 text-white/60 transition hover:border-white/40 hover:text-white"
              >
                <LinkedinIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
