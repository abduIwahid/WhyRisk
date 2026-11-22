"use client"

import { useState, type ReactNode } from "react"
import { motion, type Variants } from "framer-motion"
import { CornerAccents } from "@/components/shared/CornerAccents"
import { Section, SectionHead } from "@/components/landing/chrome"

/**
 * Product parts — the Watermelon components-bento pattern (22 Nov
 * 2026): a right-aligned section head over a 2×2 grid of labelled
 * cells, each holding one real WhyRisk UI part (portal tabs, health
 * indicator checkboxes, activity switches, severity badges) instead
 * of the template's generic UI-kit demos.
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
  children,
}: {
  tag: string
  children: ReactNode
}) {
  return (
    <motion.div variants={itemVariants}>
      <div className="group relative h-full min-h-[240px] w-full overflow-hidden border border-border bg-card shadow-card transition-colors duration-300 hover:bg-secondary/40">
        <CornerAccents flush className="border-primary/50" />
        <span className="absolute left-6 top-6 z-10 font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors group-hover:text-foreground">
          [ {tag} ]
        </span>
        <div className="relative flex h-full w-full flex-col justify-center p-6 pt-14">{children}</div>
      </div>
    </motion.div>
  )
}

export function PartsBento() {
  const [portal, setPortal] = useState<"patient" | "doctor">("patient")
  return (
    <Section id="parts">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div variants={itemVariants}>
          <SectionHead
            align="center"
            eyebrow="Components"
            title={
              <>
                Real product <span className="text-primary">parts</span>
              </>
            }
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <Cell tag="Tabs">
          <div className="flex w-full max-w-[420px] self-center border border-border" role="tablist" aria-label="Portal preview">
            {(["patient", "doctor"] as const).map((p) => (
              <button
                key={p}
                role="tab"
                aria-selected={portal === p}
                onClick={() => setPortal(p)}
                className={`flex-1 px-4 py-3.5 font-mono text-xs font-bold uppercase tracking-widest transition active:scale-[0.98] ${
                  portal === p ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"
                }`}
              >
                {p} portal
              </button>
            ))}
          </div>
        </Cell>

        <Cell tag="Checkbox">
          <div className="space-y-3.5 font-mono text-[13px] text-foreground/80">
            {[
              ["High blood pressure", true],
              ["High cholesterol", true],
              ["Smoker", false],
            ].map(([label, on]) => (
              <div key={label as string} className="flex items-center gap-3">
                <span
                  className={`flex h-[18px] w-[18px] items-center justify-center border text-[11px] font-bold ${
                    on ? "border-primary bg-primary text-primary-foreground" : "border-foreground/30"
                  }`}
                >
                  {on ? "✓" : ""}
                </span>
                {label}
              </div>
            ))}
          </div>
        </Cell>

        <Cell tag="Switch">
          <div className="space-y-5 font-mono text-[13px] text-foreground/80">
            {[
              ["Physically active", true],
              ["Heavy alcohol use", false],
            ].map(([label, on]) => (
              <div key={label as string} className="flex items-center gap-3.5">
                <span
                  className={`relative h-6 w-[46px] shrink-0 rounded-full border ${
                    on ? "border-primary" : "border-foreground/30"
                  }`}
                >
                  <span
                    className={`absolute top-[3px] h-4 w-4 rounded-full transition-all ${
                      on ? "left-[25px] bg-primary" : "left-[3px] bg-foreground/40"
                    }`}
                  />
                </span>
                {label}
              </div>
            ))}
          </div>
        </Cell>

        <Cell tag="Severity">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="rounded-full bg-[#E2F0E6] px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-[#1E7A46]">Low</span>
            <span className="rounded-full bg-[#FDF0DC] px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-[#A85008]">Moderate</span>
            <span className="rounded-full bg-[#FAE9E7] px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-[#C0392B]">High</span>
            <span className="rounded-full bg-[#C0392B] px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-white">Critical</span>
            <span className="ml-1.5 font-mono text-[11px] tracking-widest text-muted-foreground">
              HOME / PATIENTS / A. RAZA / RISK
            </span>
          </div>
        </Cell>
      </motion.div>
    </Section>
  )
}
