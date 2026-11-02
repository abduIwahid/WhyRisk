"use client"

import { motion } from "framer-motion"
import { CountUp } from "@/components/shared/CountUp"

/**
 * The landing page's honest-facts band: one navy panel, four columns
 * separated by hairline dividers — not four separate boxes.
 *
 * Purely numeric values (0.8222, 1, 21) count up when the band first
 * scrolls into view; "SHAP" stays static text. The final value is the
 * initial render state, so SSR and no-JS visitors see the real figures
 * — the count-up only replays them after mount, and never runs for
 * users who prefer reduced motion. (The count-up itself lives in the
 * shared CountUp component.)
 */

const columnMotion = {
  initial: { opacity: 0, x: -44 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-40px" },
}

export function StatsBand({ facts }: { facts: { value: string; text: string }[] }) {
  return (
    <div className="rounded-[14px] bg-primary px-6 py-8 text-white sm:px-8 lg:py-10">
      <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
        {facts.map((f, i) => (
          <motion.div
            key={f.value}
            {...columnMotion}
            transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 0.8, 0.3, 1] }}
            className={[
              // Stacked on mobile: hairline above each column but the first.
              "border-t border-white/10 pt-6 first:border-t-0 first:pt-0",
              // 2-up on sm: no top rules; left hairline on the right-hand column.
              "sm:border-t-0 sm:pt-0",
              i % 2 === 1 ? "sm:border-l sm:border-white/10 sm:pl-6" : "",
              // 4-up on lg: left hairline on every column but the first.
              i > 0 ? "lg:border-l lg:border-white/10 lg:pl-8" : "lg:pl-0",
              i === 2 ? "sm:border-l-0 sm:pl-0" : "",
            ].join(" ")}
          >
            <span className="block font-display text-[30px] tracking-wide">
              {/^[\d.]+$/.test(f.value) ? <CountUp text={f.value} /> : f.value}
            </span>
            <span className="mt-1.5 block text-[13px] leading-relaxed text-white/85">{f.text}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
