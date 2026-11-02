"use client"

import { motion, useReducedMotion } from "framer-motion"

type Factor = { label: string; width: string; color: string; value: string }

/**
 * The hero card's demo SHAP factor bars. Each bar grows from the left
 * (scaleX, origin left) when the card scrolls into view, staggered per
 * row. Users who prefer reduced motion get the finished bars — no
 * animation is applied at all.
 */
export function AnimatedFactorBars({ factors }: { factors: Factor[] }) {
  const reduceMotion = useReducedMotion()
  return (
    <div className="mt-1">
      {factors.map((f, i) => (
        <div key={f.label} className="mt-2 flex items-center gap-2.5 text-[13px]">
          <span className="w-[118px] shrink-0 text-foreground/80">{f.label}</span>
          <span className="h-[9px] flex-1 overflow-hidden rounded-full bg-secondary">
            {reduceMotion ? (
              <span className="block h-full rounded-full" style={{ width: f.width, background: f.color }} />
            ) : (
              <motion.span
                className="block h-full origin-left rounded-full"
                style={{ width: f.width, background: f.color }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.15 + i * 0.12, ease: [0.22, 0.8, 0.3, 1] }}
              />
            )}
          </span>
          <span className="w-[42px] text-right font-mono text-[11.5px]">{f.value}</span>
        </div>
      ))}
    </div>
  )
}
