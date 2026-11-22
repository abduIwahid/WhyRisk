/**
 * Corner accents — the four small L-shaped ticks that frame a card's
 * corners. Adapted from the Watermelon UI landing template Wadi saved
 * (22 Nov 2026) and re-skinned to WhyRisk tokens: the ticks inherit
 * `borderColor` from the parent's text/border styling by default via
 * `border-current`, or take an explicit colour class.
 *
 * Purely decorative: aria-hidden, pointer-events-none, and positioned
 * against the nearest relative parent — the parent must be `relative`
 * (and usually `overflow-hidden` is NOT wanted, the ticks sit exactly
 * on the corners; with rounded corners use a slightly inset size).
 */
export function CornerAccents({ className = "border-primary/60" }: { className?: string }) {
  const base = "pointer-events-none absolute h-2 w-2 " + className
  return (
    <span aria-hidden="true">
      <span className={`${base} left-[5px] top-[5px] border-l-2 border-t-2`} />
      <span className={`${base} right-[5px] top-[5px] border-r-2 border-t-2`} />
      <span className={`${base} bottom-[5px] left-[5px] border-b-2 border-l-2`} />
      <span className={`${base} bottom-[5px] right-[5px] border-b-2 border-r-2`} />
    </span>
  )
}
