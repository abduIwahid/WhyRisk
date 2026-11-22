/**
 * Corner accents — the four small L-shaped ticks that frame a card's
 * corners. Adapted from the Watermelon UI landing template Wadi saved
 * (22 Nov 2026) and re-skinned to WhyRisk tokens: the ticks take an
 * explicit border-colour class.
 *
 * Purely decorative: aria-hidden, pointer-events-none, positioned
 * against the nearest relative parent. `flush` puts the ticks exactly
 * on the corners (the template's square cards); the default 5px inset
 * suits rounded cards, where a flush tick would float past the curve.
 */
export function CornerAccents({
  className = "border-primary/60",
  flush = false,
}: {
  className?: string
  flush?: boolean
}) {
  const base = "pointer-events-none absolute h-2 w-2 " + className
  const [l, r, t, b] = flush
    ? ["left-0", "right-0", "top-0", "bottom-0"]
    : ["left-[5px]", "right-[5px]", "top-[5px]", "bottom-[5px]"]
  return (
    <span aria-hidden="true" className="pointer-events-none absolute inset-0">
      <span className={`${base} ${l} ${t} border-l-2 border-t-2`} />
      <span className={`${base} ${r} ${t} border-r-2 border-t-2`} />
      <span className={`${base} ${l} ${b} border-b-2 border-l-2`} />
      <span className={`${base} ${r} ${b} border-b-2 border-r-2`} />
    </span>
  )
}
