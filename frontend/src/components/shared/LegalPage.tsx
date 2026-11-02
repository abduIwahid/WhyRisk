import type { ReactNode } from "react"
import Link from "next/link"
import BrandMark from "@/components/shared/BrandMark"

/**
 * Shared chrome for the public legal pages (/privacy, /terms) —
 * header and footer mirror the other public pages (/contact-us,
 * /model-card) so the public surface stays one consistent system.
 */
export default function LegalPage({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string
  title: string
  children: ReactNode
}) {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-5 py-4">
          <Link href="/welcome" className="flex items-center gap-2.5">
            <BrandMark className="h-9 w-9 shrink-0" />
            <span className="text-lg font-bold tracking-tight">WhyRisk</span>
          </Link>
          <nav className="flex items-center gap-3.5 whitespace-nowrap text-[13px] font-medium sm:gap-5 sm:text-sm">
            <Link href="/model-card" className="text-muted-foreground transition hover:text-foreground">
              The model
            </Link>
            <Link href="/login" className="text-muted-foreground transition hover:text-foreground">
              Sign in
            </Link>
            <Link
              href="/signup"
              className="shrink-0 whitespace-nowrap rounded-lg bg-primary px-3.5 py-2 font-semibold text-primary-foreground transition hover:bg-primary/90 sm:px-4"
            >
              Create account
            </Link>
          </nav>
        </div>
      </header>

      <main id="main-content" className="mx-auto max-w-4xl px-5 py-10">
        <p className="text-center text-[11px] font-medium text-brand-text">{eyebrow}</p>
        <h1 className="mt-2 text-center font-heading text-3xl font-bold tracking-tight">{title}</h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">Last updated: 30 October 2026</p>
        {children}
      </main>

      <footer className="bg-foreground py-8 text-[#C8D6DA]">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3.5 px-5">
          <span className="flex items-center gap-2.5">
            <BrandMark className="h-9 w-9 shrink-0" />
            <span className="text-lg font-bold tracking-tight text-white">WhyRisk</span>
          </span>
          <span className="flex items-center gap-5 text-sm font-medium">
            <Link href="/welcome" className="text-white underline decoration-[#2E7FA8] decoration-2 underline-offset-4 hover:opacity-80">
              Home
            </Link>
            <Link href="/model-card" className="text-white underline decoration-[#2E7FA8] decoration-2 underline-offset-4 hover:opacity-80">
              Model card
            </Link>
            <Link href="/contact-us" className="text-white underline decoration-[#2E7FA8] decoration-2 underline-offset-4 hover:opacity-80">
              Contact
            </Link>
            <Link href="/privacy" className="text-white underline decoration-[#2E7FA8] decoration-2 underline-offset-4 hover:opacity-80">
              Privacy
            </Link>
            <Link href="/terms" className="text-white underline decoration-[#2E7FA8] decoration-2 underline-offset-4 hover:opacity-80">
              Terms
            </Link>
            <Link href="/login" className="text-white underline decoration-[#2E7FA8] decoration-2 underline-offset-4 hover:opacity-80">
              Sign in
            </Link>
          </span>
          <p className="max-w-[640px] text-xs leading-relaxed opacity-75">
            WhyRisk is an experimental clinical decision-support and research tool. It is not a certified medical
            device and does not replace professional diagnosis. Built during a machine-learning internship at Ezitech
            Institute, Islamabad.
          </p>
        </div>
      </footer>
    </div>
  )
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-9">
      <h2 className="font-heading text-xl font-bold tracking-tight">{title}</h2>
      <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-muted-foreground">{children}</div>
    </section>
  )
}

export function LegalList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  )
}
