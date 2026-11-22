import { Section, SectionHead } from "@/components/landing/chrome"

/**
 * Live pages — the Watermelon template-bento pattern (22 Nov 2026):
 * one browser mockup holding framed captures of the product's pages.
 * Captures are real screenshots of the shipped
 * routes, self-hosted under /public/landing.
 */

const PAGES: { path: string; label: string }[] = [
  { path: "/welcome", label: "Welcome" },
  { path: "/login", label: "Login" },
  { path: "/signup", label: "Sign up" },
  { path: "/model-card", label: "Model card" },
]

const SHOT_FILES: Record<string, string> = {
  "/welcome": "/landing/shot-welcome.png",
  "/login": "/landing/shot-login.png",
  "/signup": "/landing/shot-signup.png",
  "/model-card": "/landing/shot-modelcard.png",
}

function shot(path: string) {
  return SHOT_FILES[path] ?? path
}

export function PagesBento() {
  return (
    <Section id="pages">
      <SectionHead
        eyebrow="Live pages"
        title={
          <>
            The product, <span className="text-primary">as shipped</span>
          </>
        }
      />
      <div className="overflow-hidden border border-border bg-card shadow-premium">
        <div className="flex items-center gap-3 border-b border-border bg-secondary/60 px-4 py-2.5">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#DE6B5F]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#E3B341]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#57AB5A]" />
          </span>
          <span className="px-1 font-mono text-[11px] tracking-widest text-muted-foreground">
            [ WHYRISK.VERCEL.APP ]
          </span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {PAGES.map((p, i) => (
            <div
              key={p.path}
              className={`p-[18px] ${i < PAGES.length - 1 ? "border-border/60 max-lg:[&:nth-child(2)]:border-r-0 lg:border-r" : ""} ${i < 2 ? "max-lg:border-b max-lg:border-border/60" : ""} ${i % 2 === 0 ? "max-lg:border-r max-lg:border-border/60" : ""}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={shot(p.path)}
                alt={`WhyRisk ${p.label} page`}
                className="block h-auto w-full border border-border/70"
                loading="lazy"
              />
              <p className="mt-3 font-mono text-[11px] tracking-widest text-muted-foreground">
                <span className="text-foreground/30">{"//"}</span> {p.label.toUpperCase()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
