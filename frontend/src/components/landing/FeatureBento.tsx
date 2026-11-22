"use client"

import type { ReactNode } from "react"
import { motion, type Variants } from "framer-motion"
import { BrainCircuit, Database, LayoutDashboard, ShieldCheck } from "lucide-react"
import { AnimatedFactorBars } from "@/components/shared/AnimatedFactorBars"
import { CornerAccents } from "@/components/shared/CornerAccents"
import { Section, SectionHead } from "@/components/landing/chrome"
import { SEVERITY_HEX } from "@/lib/status"

/**
 * Features in the Watermelon template's feature-bento pattern
 * (22 Nov 2026): a 5-column grid of corner-accented cards with mono
 * uppercase titles/descriptions and a small live visual per card,
 * re-skinned to PrimeDental violet. Content = WhyRisk's four standing
 * claims, unchanged.
 */

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0, 0, 1] } },
}

function FeatureCard({
  icon: Icon,
  title,
  description,
  className = "",
  children,
}: {
  icon: React.ElementType
  title: string
  description: ReactNode
  className?: string
  children?: ReactNode
}) {
  return (
    <motion.div variants={itemVariants} className={className}>
      <div className="group relative h-full w-full border border-border bg-card shadow-card transition-colors duration-300 hover:bg-secondary/40">
        <CornerAccents flush className="border-primary/50" />
        <div className="relative z-10 flex h-full w-full flex-col items-start justify-center overflow-hidden p-8">
          <div className="mb-6 opacity-90 transition-transform duration-300 group-hover:scale-110">
            <Icon className="h-8 w-8 text-primary" />
          </div>
          <h3 className="mb-3 font-mono text-xl font-bold uppercase tracking-widest text-foreground">
            {title}
          </h3>
          <div className="font-mono text-[13px] uppercase leading-relaxed tracking-widest text-muted-foreground">
            {description}
          </div>
          {children}
        </div>
      </div>
    </motion.div>
  )
}

const MINI_FACTORS = [
  { label: "BMI 29.4", width: "62%", color: SEVERITY_HEX.Moderate, value: "+0.14" },
  { label: "High cholesterol", width: "38%", color: "#6B63FF", value: "+0.08" },
  { label: "Physically active", width: "30%", color: SEVERITY_HEX.Low, value: "−0.06" },
]

export function FeatureBento() {
  return (
    <Section dots id="features">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div variants={itemVariants}>
          <SectionHead
            eyebrow="Feature bento"
            title={
              <>
                Why <span className="text-primary">WhyRisk?</span>
              </>
            }
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 gap-5 lg:auto-rows-[340px] lg:grid-cols-5 lg:gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <FeatureCard
          icon={BrainCircuit}
          title="Explainable by default"
          description="Every score ships with its reasons — the factors that pushed it up or down, with weights."
          className="lg:col-span-2"
        >
          <div className="mt-6 w-full max-w-sm">
            <AnimatedFactorBars factors={MINI_FACTORS} />
          </div>
        </FeatureCard>

        <FeatureCard
          icon={Database}
          title="Trained on real survey data"
          description="A LightGBM model trained on the CDC BRFSS 2015 dataset — balanced training file, held-out test split, one honest accuracy figure."
          className="lg:col-span-3"
        >
          <dl className="mt-6 grid w-full max-w-md grid-cols-2 gap-x-7 gap-y-2.5 font-mono text-xs text-muted-foreground">
            {[
              ["Dataset", "BRFSS 2015"],
              ["Records", "70,692"],
              ["Algorithm", "LightGBM"],
              ["AUC-ROC", "0.8222"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-3">
                <dt className="uppercase tracking-widest">{k}</dt>
                <dd className="font-bold text-foreground">{v}</dd>
              </div>
            ))}
          </dl>
        </FeatureCard>

        <FeatureCard
          icon={ShieldCheck}
          title="Honest by design"
          description="One trained model today. Everything else is labelled roadmap — this site never dresses up a guess as a prediction."
          className="lg:col-span-3"
        >
          <ul className="mt-6 space-y-2.5 font-mono text-[13px] text-foreground/80">
            <li className="flex items-center gap-3">
              <span className="flex h-[18px] w-[18px] items-center justify-center bg-primary text-[11px] font-bold text-primary-foreground">✓</span>
              Diabetes model — trained &amp; live
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-[18px] w-[18px] items-center justify-center bg-primary text-[11px] font-bold text-primary-foreground">✓</span>
              SHAP explanation stored per prediction
            </li>
            <li className="flex items-center gap-3">
              <span className="h-[18px] w-[18px] border border-foreground/30" />
              Heart disease — roadmap, labelled
            </li>
            <li className="flex items-center gap-3">
              <span className="h-[18px] w-[18px] border border-foreground/30" />
              Stroke — roadmap, labelled
            </li>
          </ul>
        </FeatureCard>

        <FeatureCard
          icon={LayoutDashboard}
          title="Portals for every role"
          description="Patient and doctor portals with appointments and an admin overview, protected by row-level security."
          className="lg:col-span-2"
        >
          <div className="mt-6 flex flex-wrap gap-2.5">
            {["Patient", "Doctor", "Admin"].map((r) => (
              <span
                key={r}
                className="border border-border bg-background px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-foreground/60"
              >
                {r}
              </span>
            ))}
          </div>
        </FeatureCard>
      </motion.div>
    </Section>
  )
}
