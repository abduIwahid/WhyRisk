"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { motion, type Variants } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { AnimatedFactorBars } from "@/components/shared/AnimatedFactorBars"
import { CornerAccents } from "@/components/shared/CornerAccents"
import { Section, SectionHead } from "@/components/landing/chrome"
import { SEVERITY_HEX } from "@/lib/status"

/**
 * The score, opened up — the Watermelon animated-bento pattern
 * (22 Nov 2026): labelled cells with corner accents on a 3-column
 * grid. The what-if cell is deliberately a *description* of the app's
 * simulator (which re-runs the real model server-side) with a link to
 * the live guest check — no browser-side fake readout.
 */

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0, 0, 1] } },
}

function Cell({
  tag,
  className = "",
  children,
}: {
  tag: string
  className?: string
  children: ReactNode
}) {
  return (
    <motion.div variants={itemVariants} className={className}>
      <div className="group relative h-full w-full overflow-hidden border border-border bg-card shadow-card transition-colors duration-300 hover:bg-secondary/40">
        <CornerAccents flush className="border-primary/50" />
        <span className="absolute left-6 top-6 z-10 font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors group-hover:text-foreground">
          [ {tag} ]
        </span>
        <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden p-6 pt-14">
          {children}
        </div>
      </div>
    </motion.div>
  )
}

const DEMO_FACTORS = [
  { label: "BMI 29.4", width: "62%", color: SEVERITY_HEX.Moderate, value: "+0.14" },
  { label: "High blood pressure", width: "48%", color: SEVERITY_HEX.Moderate, value: "+0.10" },
  { label: "High cholesterol", width: "38%", color: "#6B63FF", value: "+0.08" },
  { label: "Physically active", width: "30%", color: SEVERITY_HEX.Low, value: "−0.06" },
]

export function ScoreBento() {
  return (
    <Section id="how">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div variants={itemVariants}>
          <SectionHead
            eyebrow="Inside the score"
            title={
              <>
                Every score, <span className="text-primary">opened up</span>
              </>
            }
            sub="The explanation is the product — not a footnote under it."
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <Cell tag="Explanation" className="md:col-span-2 lg:col-span-2">
          <div className="w-full max-w-[560px]">
            <p className="mb-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Why this score — top factors (SHAP)
            </p>
            <AnimatedFactorBars factors={DEMO_FACTORS} />
          </div>
        </Cell>

        <Cell tag="Risk meter">
          <svg width="200" height="120" viewBox="0 0 200 120" role="img" aria-label="Risk meter showing 0.31 of 1.00">
            <path d="M20 105 A 85 85 0 0 1 180 105" fill="none" stroke="rgba(87,76,214,0.15)" strokeWidth="12" />
            <path d="M20 105 A 85 85 0 0 1 82 34" fill="none" stroke="#6B63FF" strokeWidth="12" />
            <line x1="100" y1="105" x2="66" y2="52" stroke="#212529" strokeWidth="3" />
            <circle cx="100" cy="105" r="6" fill="#212529" />
          </svg>
          <div className="mt-2 font-sans text-[44px] font-bold leading-none text-foreground">0.31</div>
          <div className="mt-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            / 1.00 probability · moderate
          </div>
        </Cell>

        <Cell tag="What-if">
          <div className="w-full max-w-[300px]">
            {[
              ["BMI", "62%"],
              ["Blood pressure", "48%"],
              ["Activity", "30%"],
            ].map(([label, w]) => (
              <div key={label} className="mb-5">
                <div className="mb-2 flex justify-between font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  <span>{label}</span>
                </div>
                <div className="relative h-1 bg-foreground/10">
                  <div className="absolute inset-y-0 left-0 bg-primary" style={{ width: w }} />
                  <div
                    className="absolute top-1/2 h-[18px] w-[18px] -translate-y-1/2 rounded-full border-[3px] border-background bg-primary shadow"
                    style={{ left: `calc(${w} - 9px)` }}
                  />
                </div>
              </div>
            ))}
            <p className="mt-2 font-mono text-xs leading-relaxed text-muted-foreground">
              In the app, every what-if re-runs the real model — nothing is estimated in the
              browser.
            </p>
            <Link
              href="#check"
              className="mt-4 inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-brand-text transition hover:text-primary"
            >
              Run a real check <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </Cell>

        {/* The template's big-number cell: dot grid + one figure */}
        <motion.div variants={itemVariants}>
          <div className="group relative h-full min-h-[280px] w-full overflow-hidden border border-primary/25 bg-primary/5 lg:min-h-full">
            <CornerAccents flush className="border-primary" />
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-60 transition-opacity duration-500 group-hover:opacity-90"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(107,99,255,0.16) 1px, transparent 1px)",
                backgroundSize: "12px 12px",
              }}
            />
            <div className="relative z-10 flex h-full flex-col items-center justify-center p-6 text-center">
              <div className="font-sans text-5xl font-bold tracking-tight text-foreground lg:text-6xl">
                0.8222
              </div>
              <div className="mt-3 font-mono text-xs font-bold uppercase tracking-widest text-brand-text">
                AUC-ROC · verified
              </div>
            </div>
          </div>
        </motion.div>

        <Cell tag="The app">
          <div className="w-[88%] -rotate-2 bg-white p-1.5 shadow-xl ring-1 ring-border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/landing/shot-welcome.png"
              alt="The WhyRisk app, landing page"
              className="block h-auto w-full"
              loading="lazy"
            />
          </div>
        </Cell>
      </motion.div>
    </Section>
  )
}
