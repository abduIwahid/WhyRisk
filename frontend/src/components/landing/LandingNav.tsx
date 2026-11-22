"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/landing/chrome"
import BrandMark from "@/components/shared/BrandMark"

/**
 * Landing navbar in the Watermelon template's pattern (22 Nov 2026):
 * fixed, transparent over the hero, frosted surface after 20px of
 * scroll; logo left, mono section links centre (lg+), icon boxes and
 * a solid GET STARTED right; hamburger panel on mobile. Skinned to
 * the PrimeDental violet tokens.
 */
const LINKS = [
  { label: "Risk check", href: "#check" },
  { label: "The model", href: "/model-card" },
  { label: "How it works", href: "#how" },
  { label: "Scope", href: "#scope" },
  { label: "Sign in", href: "/login" },
]

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/60 bg-background/80 py-3 shadow-sm backdrop-blur-md"
          : "border-b border-transparent bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-4 sm:px-5 lg:px-16">
        <Link href="/welcome" className="group flex items-center gap-3">
          <BrandMark className="h-8 w-8 shrink-0 transition-transform duration-300 group-hover:scale-105" />
          <span className="font-mono text-sm font-bold uppercase tracking-widest text-foreground">
            WhyRisk
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Landing">
          {LINKS.map((l) =>
            l.href.startsWith("#") ? (
              <a
                key={l.label}
                href={l.href}
                className="font-mono text-xs font-bold uppercase tracking-widest text-foreground/60 transition hover:text-foreground"
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.label}
                href={l.href}
                className="font-mono text-xs font-bold uppercase tracking-widest text-foreground/60 transition hover:text-foreground"
              >
                {l.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 md:flex">
            <a
              href="https://github.com/abduIwahid/WhyRisk"
              target="_blank"
              rel="noreferrer"
              aria-label="WhyRisk on GitHub"
              className="flex h-10 w-10 items-center justify-center border border-border bg-transparent text-foreground/50 transition hover:bg-secondary hover:text-foreground"
            >
              <GithubIcon />
            </a>
            <a
              href="https://www.linkedin.com/in/abdu1wahid"
              target="_blank"
              rel="noreferrer"
              aria-label="Abdul Wahid on LinkedIn"
              className="flex h-10 w-10 items-center justify-center border border-border bg-transparent text-foreground/50 transition hover:bg-secondary hover:text-foreground"
            >
              <LinkedinIcon />
            </a>
          </div>
          <Link
            href="/signup"
            className="hidden h-10 items-center bg-primary px-6 font-mono text-xs font-bold uppercase tracking-widest text-primary-foreground transition hover:bg-primary/90 active:scale-[0.96] md:flex"
          >
            Get started
          </Link>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="p-1 text-foreground lg:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="absolute inset-x-0 top-full border-b border-border bg-background p-4 shadow-lg lg:hidden">
          <nav className="flex flex-col gap-1" aria-label="Landing mobile">
            {LINKS.map((l) =>
              l.href.startsWith("#") ? (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="px-2 py-3 font-mono text-xs font-bold uppercase tracking-widest text-foreground/70 transition hover:text-foreground"
                >
                  {l.label}
                </a>
              ) : (
                <Link
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="px-2 py-3 font-mono text-xs font-bold uppercase tracking-widest text-foreground/70 transition hover:text-foreground"
                >
                  {l.label}
                </Link>
              ),
            )}
          </nav>
          <Link
            href="/signup"
            onClick={() => setOpen(false)}
            className="mt-3 flex w-full items-center justify-center bg-primary px-4 py-4 font-mono text-xs font-bold uppercase tracking-widest text-primary-foreground transition hover:bg-primary/90 active:scale-[0.96]"
          >
            Get started
          </Link>
        </div>
      )}
    </header>
  )
}
