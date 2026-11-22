import type { ReactNode } from "react"

/**
 * Shared chrome for the template-style landing sections (Watermelon
 * layout system, PrimeDental violet skin — Wadi, 22 Nov 2026):
 * technical side rails, crosshairs at rail intersections, the mono
 * `// LABEL` eyebrow and the centred section head. Motion is applied
 * by the sections themselves (framer-motion variants, template
 * numbers); these helpers are purely structural.
 */

/** Brand icons — the installed lucide-react dropped its brand set, so
 *  the landing carries the same inline SVGs the old page used. */
export function GithubIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.15c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 1.28 1.06.72 1.54v2.28c0 .3.21.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  )
}

export function LinkedinIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.55V9h3.57v11.45Z" />
    </svg>
  )
}

export function Rails() {
  return (
    <>
      <div aria-hidden="true" className="absolute inset-y-0 left-16 hidden w-px bg-foreground/[0.06] lg:block" />
      <div aria-hidden="true" className="absolute inset-y-0 right-16 hidden w-px bg-foreground/[0.06] lg:block" />
    </>
  )
}

export function Crosshair({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute z-10 hidden h-4 w-4 lg:block ${className}`}>
      <div className="absolute left-0 right-0 top-1/2 h-px bg-foreground/20" />
      <div className="absolute bottom-0 left-1/2 top-0 w-px bg-foreground/20" />
    </div>
  )
}

export function Eyebrow({
  children,
  align = "center",
}: {
  children: ReactNode
  align?: "center" | "left" | "right"
}) {
  return (
    <span
      className={`inline-flex items-center font-mono text-xs font-bold uppercase tracking-widest text-brand-text ${
        align === "right" ? "flex-row-reverse" : ""
      }`}
    >
      <span className={align === "right" ? "ml-3 opacity-70" : "mr-3 opacity-70"}>{"//"}</span>
      {children}
    </span>
  )
}

export function SectionHead({
  eyebrow,
  title,
  sub,
  align = "center",
}: {
  eyebrow: string
  title: ReactNode
  sub?: string
  align?: "center" | "left" | "right"
}) {
  const alignCls =
    align === "center"
      ? "items-start text-left md:items-center md:text-center"
      : align === "right"
        ? "items-end text-right"
        : "items-start text-left"
  return (
    <div className={`mb-14 flex flex-col gap-0 md:mb-16 ${alignCls}`}>
      <div className="mb-7">
        <Eyebrow align={align === "right" ? "right" : align === "center" ? "center" : "left"}>
          {eyebrow}
        </Eyebrow>
      </div>
      <h2 className="font-sans text-[clamp(34px,5vw,60px)] font-bold leading-[1.02] tracking-tight text-foreground">
        {title}
      </h2>
      {sub ? (
        <p className="mt-6 max-w-2xl font-mono text-sm uppercase leading-relaxed tracking-widest text-muted-foreground">
          {sub}
        </p>
      ) : null}
    </div>
  )
}

/** The template's section shell: vertical rhythm, dot grid, rails. */
export function Section({
  children,
  dots = false,
  id,
  className = "",
}: {
  children: ReactNode
  dots?: boolean
  id?: string
  className?: string
}) {
  return (
    <section id={id} className={`relative overflow-hidden py-24 md:py-28 ${className}`}>
      {dots ? (
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(87,76,214,0.07) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      ) : null}
      <Rails />
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-5 lg:px-16">{children}</div>
    </section>
  )
}
