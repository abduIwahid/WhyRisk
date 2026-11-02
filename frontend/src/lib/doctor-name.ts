/**
 * The ONE way to display a doctor's name ("Dr. Dr." fix, 2026-11-02).
 *
 * Stored profile names are inconsistent about the honorific: the
 * demo/seed doctors carry it inside full_name ("Dr. Ayesha Rahman"),
 * while a doctor who signed up and typed their own name may not have
 * it at all. Surfaces must therefore never prepend "Dr. " by hand and
 * never assume the stored name already has it — route the raw name
 * through doctorDisplayName() so it always renders with exactly one
 * "Dr. " prefix.
 */

// A leading "Dr"/"Dr." ONLY when it stands alone as a word — so a name
// like "Drake" is never mistaken for the honorific.
const LEADING_DR_PREFIX = /^dr\.?(?=\s|$)/i

/**
 * Returns the name with exactly one "Dr. " prefix, or "" when there is
 * no usable name (callers keep their own fallbacks: "Doctor", "—", …).
 * Any existing leading prefix — "Dr.", "Dr", "dr.", even a doubled
 * "Dr. Dr." already in the data — is stripped first.
 */
export function doctorDisplayName(name?: string | null): string {
  let rest = (name ?? "").trim()
  while (LEADING_DR_PREFIX.test(rest)) {
    rest = rest.replace(LEADING_DR_PREFIX, "").trim()
  }
  return rest ? `Dr. ${rest}` : ""
}
