import Link from "next/link"

/**
 * The public footer's link row — ONE list for every public page
 * (welcome, model-card, contact-us, and privacy/terms via LegalPage):
 * same links, same order, same labels. Step C7 converged four
 * hand-rolled rows that had drifted apart (model-card's footer was
 * missing Home/Model card/Contact; contact-us was missing Contact
 * and Create account). Converged UP to the union of every link any
 * footer already carried — nothing was removed anywhere.
 *
 * Call sites keep their own size dialect via the two class props:
 * the landing's photo-band footer uses the small variant, the
 * reading pages the standard one. Chrome (wordmark, disclaimer)
 * stays per-page; only the link row is shared.
 */
export const PUBLIC_FOOTER_LINKS = [
  { href: "/welcome", label: "Home" },
  { href: "/model-card", label: "Model card" },
  { href: "/contact-us", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/login", label: "Sign in" },
  { href: "/signup", label: "Create account" },
] as const

export default function PublicFooterLinks({
  className = "",
  linkClassName = "",
}: {
  className?: string
  linkClassName?: string
}) {
  return (
    <span className={className}>
      {PUBLIC_FOOTER_LINKS.map((link) => (
        <Link key={link.href} href={link.href} className={linkClassName}>
          {link.label}
        </Link>
      ))}
    </span>
  )
}
