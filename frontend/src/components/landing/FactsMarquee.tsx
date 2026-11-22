import { CornerAccents } from "@/components/shared/CornerAccents"
import { Rails, SectionHead } from "@/components/landing/chrome"

/**
 * On the record — the Watermelon testimonial section's marquee
 * mechanics (22 Nov 2026) carrying model-card FACTS instead of
 * testimonials: WhyRisk has no user testimonials to quote, and
 * inventing some for a health product would break the project's
 * honesty rule. Every card is a verbatim model-card fact.
 */

const FACTS: [string, string][] = [
  ["Algorithm", "LightGBM gradient-boosted trees"],
  ["Dataset", "CDC BRFSS 2015 survey"],
  ["Records", "70,692 in the balanced training file"],
  ["Features", "21 health indicators per assessment"],
  ["Evaluation", "Held-out test split, AUC-ROC 0.8222"],
  ["Explanation", "SHAP values stored with every prediction"],
  ["Status", "A screening aid — not a diagnosis"],
  ["Access", "Role-based portals, row-level security"],
]

function FactCard({ k, v }: { k: string; v: string }) {
  return (
    <div className="group relative w-[350px] shrink-0 border border-border bg-card shadow-card transition-colors duration-300 hover:bg-secondary/40 md:w-[450px]">
      <CornerAccents flush className="border-primary/50" />
      <div className="flex h-full flex-col p-8">
        <div className="mb-4 font-mono text-[11px] font-bold uppercase tracking-widest text-brand-text">
          {"//"} {k}
        </div>
        <p className="font-mono text-sm leading-relaxed text-foreground/85 transition-colors duration-300 group-hover:text-primary">
          {v}
        </p>
      </div>
    </div>
  )
}

export function FactsMarquee() {
  const items = [...FACTS, ...FACTS]
  return (
    <section className="relative overflow-hidden py-24 font-mono md:py-28" aria-label="Model card facts">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 hidden h-px bg-foreground/[0.06] lg:block" />
      <Rails />
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-5 lg:px-16">
        <SectionHead
          eyebrow="Model card"
          title={
            <>
              On the <span className="text-primary">record</span>
            </>
          }
          sub="Stated plainly — the same facts published on the model card page."
        />
      </div>
      <div className="relative mt-2 flex w-full overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-20 w-24 bg-gradient-to-r from-background to-transparent sm:w-32" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-20 w-24 bg-gradient-to-l from-background to-transparent sm:w-32" />
        <div className="animate-marquee flex gap-6 px-3">
          {items.map(([k, v], i) => (
            <FactCard key={`${k}-${i}`} k={k} v={v} />
          ))}
        </div>
      </div>
    </section>
  )
}
