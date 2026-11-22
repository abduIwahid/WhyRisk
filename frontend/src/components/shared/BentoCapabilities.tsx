import { BrainCircuit, CalendarCheck, ShieldCheck } from "lucide-react"
import { AnimatedFactorBars } from "@/components/shared/AnimatedFactorBars"
import { CornerAccents } from "@/components/shared/CornerAccents"
import { SlideIn } from "@/components/shared/SlideIn"
import { SEVERITY_HEX } from "@/lib/status"

/**
 * "What it does" as a bento grid — the layout system adapted from the
 * Watermelon UI landing template Wadi saved (22 Nov 2026): asymmetric
 * cells, mono `[ LABEL ]` tags, corner-accent frames and a dot-grid
 * texture cell, re-skinned to WhyRisk's violet/light tokens.
 *
 * Content is unchanged from the previous stacked-rows version — the
 * same three capabilities with the same wording, plus the hero's demo
 * SHAP bars inside the prediction cell. No new claims.
 */

// Same demo factors as the hero card: severity fills come from
// lib/status.ts; the brand bar is the accent, not a severity.
const DEMO_FACTORS = [
  { label: "BMI 29.4", width: "62%", color: SEVERITY_HEX.Moderate, value: "+0.14" },
  { label: "High blood pressure", width: "48%", color: SEVERITY_HEX.Moderate, value: "+0.10" },
  { label: "High cholesterol", width: "38%", color: "#6B63FF", value: "+0.08" },
  { label: "Physically active", width: "30%", color: SEVERITY_HEX.Low, value: "−0.06" },
]

function CellLabel({ children }: { children: string }) {
  return (
    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors group-hover:text-primary">
      [ {children} ]
    </span>
  )
}

const cellClass =
  "group relative h-full overflow-hidden rounded-xl border border-border bg-card p-6 shadow-card"

export function BentoCapabilities() {
  return (
    <div className="mt-[22px] grid gap-4 sm:gap-5 lg:grid-cols-3">
      {/* Risk prediction — the wide cell, with the demo SHAP bars and
          the template's dot-grid texture behind them. */}
      <SlideIn delay={0} className="lg:col-span-2">
        <div className={cellClass}>
          <CornerAccents />
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(107,99,255,0.13) 1px, transparent 1px)",
              backgroundSize: "12px 12px",
            }}
          />
          <div className="relative z-10">
            <div className="flex items-start justify-between gap-3">
              <span className="flex h-[52px] w-[52px] items-center justify-center rounded-[12px] bg-secondary text-primary">
                <BrainCircuit className="h-6 w-6" />
              </span>
              <CellLabel>Risk prediction</CellLabel>
            </div>
            <h3 className="mt-4 font-sans text-[17px] font-bold tracking-normal">Risk prediction</h3>
            <p className="mt-1.5 max-w-[520px] text-sm leading-relaxed text-foreground/75">
              A LightGBM model trained on CDC survey data estimates diabetes risk from 21 everyday
              health indicators, no lab visit needed for a first screening.
            </p>
            <div className="mt-4 max-w-[520px]">
              <AnimatedFactorBars factors={DEMO_FACTORS} />
            </div>
          </div>
        </div>
      </SlideIn>

      {/* Explainability */}
      <SlideIn delay={0.1}>
        <div className={cellClass}>
          <CornerAccents />
          <div className="relative z-10">
            <div className="flex items-start justify-between gap-3">
              <span className="flex h-[52px] w-[52px] items-center justify-center rounded-[12px] bg-secondary text-primary">
                <ShieldCheck className="h-6 w-6" />
              </span>
              <CellLabel>Explainability</CellLabel>
            </div>
            <h3 className="mt-4 font-sans text-[17px] font-bold tracking-normal">
              The reason, not just the score
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-foreground/75">
              Every result lists the factors that pushed the score up or down, with their weights. A
              doctor can argue with it, that is the point.
            </p>
          </div>
        </div>
      </SlideIn>

      {/* Records & appointments — full-width horizontal cell */}
      <SlideIn delay={0.2} className="lg:col-span-3">
        <div className={cellClass}>
          <CornerAccents />
          <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
            <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[12px] bg-secondary text-primary">
              <CalendarCheck className="h-6 w-6" />
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                <h3 className="font-sans text-[17px] font-bold tracking-normal">Records &amp; appointments</h3>
                <CellLabel>Care workflow</CellLabel>
              </div>
              <p className="mt-1.5 max-w-[760px] text-sm leading-relaxed text-foreground/75">
                Patient and doctor portals with role-based access, appointment booking and an admin
                overview, protected by row-level security.
              </p>
            </div>
          </div>
        </div>
      </SlideIn>
    </div>
  )
}
