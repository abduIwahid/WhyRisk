import type { Metadata } from "next"
import { FactsMarquee } from "@/components/landing/FactsMarquee"
import { FeatureBento } from "@/components/landing/FeatureBento"
import { LandingFooter } from "@/components/landing/LandingFooter"
import { LandingHero } from "@/components/landing/LandingHero"
import { LandingNav } from "@/components/landing/LandingNav"
import { PagesBento } from "@/components/landing/PagesBento"
import { PartsBento } from "@/components/landing/PartsBento"
import { ScoreBento } from "@/components/landing/ScoreBento"
import { Section, SectionHead } from "@/components/landing/chrome"
import { GuestRiskCheck } from "@/components/shared/GuestRiskCheck"
import { SlideIn } from "@/components/shared/SlideIn"
import { StatsBand } from "@/components/shared/StatsBand"

export const metadata: Metadata = {
  // Absolute title: the root template would otherwise append "— WhyRisk"
  // to a title that already starts with the brand name.
  title: { absolute: "WhyRisk: Know your risk. See exactly why." },
  description:
    "WhyRisk estimates diabetes risk with a trained machine-learning model and shows the reasons behind the score, SHAP explanations, stored per prediction.",
  alternates: { canonical: "/welcome" },
  openGraph: {
    // Restated in full (QA Round 3, SEO H1): Next REPLACES the
    // openGraph object per segment instead of merging, so a partial
    // block silently drops type/siteName/images from the root.
    type: "website",
    siteName: "WhyRisk",
    url: "/welcome",
    title: "WhyRisk: Know your risk. See exactly why.",
    description:
      "Diabetes risk prediction with explainable machine learning, every score shows its reasons.",
    images: [
      {
        url: "/og-card.png",
        width: 1200,
        height: 630,
        alt: "WhyRisk: Know your risk. See exactly why.",
      },
    ],
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "WhyRisk",
  applicationCategory: "HealthApplication",
  operatingSystem: "Web",
  // Free to use — stated plainly so the structured data matches the
  // product (QA Round 3, SEO L5).
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  url: "https://whyrisk.vercel.app/welcome",
  description:
    "Diabetes risk prediction with explainable machine learning, every score shows its reasons.",
}

/* ------------------------------------------------------------------ */
/*  WhyRisk public landing page.                                       */
/*                                                                     */
/*  Layout and motion follow the Watermelon UI landing template        */
/*  (Wadi, 22 Nov 2026): navbar, centred hero with rotating word and   */
/*  screenshot collage, counting stats, feature bento, score bento,    */
/*  components bento, live-pages browser frame, facts marquee, and     */
/*  the template footer — all skinned in the PrimeDental violet        */
/*  palette he selected, never the template's lime/dark.               */
/*                                                                     */
/*  Every number on this page is a verified project fact (see the      */
/*  README): one trained diabetes model, its held-out AUC-ROC, the     */
/*  BRFSS 2015 dataset, and a SHAP explanation stored per prediction.  */
/*  Nothing else is claimed.                                           */
/* ------------------------------------------------------------------ */

const FACTS = [
  {
    value: "0.8222",
    text: "AUC-ROC of the diabetes model on a held-out test split of the balanced dataset, the only accuracy figure we claim",
  },
  {
    value: "1",
    text: "Trained model in production. Six more conditions are on the roadmap, labelled as such",
  },
  {
    value: "21",
    text: "Health indicators per assessment, from the CDC BRFSS 2015 dataset (balanced training file: 70,692 records)",
  },
  {
    value: "SHAP",
    text: "Predictions ship with a SHAP explanation, each score shows the factors behind it",
  },
]

export default function WelcomePage() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <LandingNav />

      <main id="main-content">
        <LandingHero />

        {/* Honest facts — counting stats band (template Stats section) */}
        <Section id="model" className="scroll-mt-24 py-0 pb-24 md:pb-28 md:pt-4">
          <SectionHead
            eyebrow="Model facts"
            title={
              <>
                Measured, <span className="text-primary">not marketed.</span>
              </>
            }
            sub="Every number below is a verified project fact."
          />
          <StatsBand facts={FACTS} />
        </Section>

        {/* Quick risk check — the real model, no account needed. */}
        <Section dots id="check" className="scroll-mt-24">
          <SectionHead
            eyebrow="Risk check"
            title="Try the model yourself"
            sub="No account · nothing saved"
          />
          <p className="mx-auto -mt-6 mb-10 max-w-[640px] text-center text-[15.5px] leading-relaxed text-foreground/80">
            Answer the same questions a care team would ask, and the trained diabetes model scores
            them, the same model, not a demo imitation.
          </p>
          <SlideIn direction="up">
            <GuestRiskCheck />
          </SlideIn>
        </Section>

        <FeatureBento />

        <ScoreBento />

        <PartsBento />

        {/* Honest scope */}
        <Section id="scope" className="scroll-mt-24">
          <SectionHead
            eyebrow="Honest scope"
            title="What is real, what is next"
            sub="Most health apps hide this page. We put it on the homepage."
          />
          <div className="grid gap-10 md:grid-cols-2 md:gap-0 md:divide-x md:divide-border">
            <SlideIn className="md:pr-10">
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#1E7A46]">Available now</h3>
              <ul className="mt-2 text-[14.5px]">
                {[
                  ["Diabetes risk model (LightGBM)", "Trained", "bg-[#E2F0E6] text-[#1E7A46]"],
                  ["SHAP explanations", "Stored per prediction", "bg-[#E2F0E6] text-[#1E7A46]"],
                  ["Symptom screening", "Rule-based, labelled", "bg-[#FDF0DC] text-[#A85008]"],
                  ["Patient / doctor portals & appointments", "Live", "bg-[#E2F0E6] text-[#1E7A46]"],
                ].map(([label, tag, tagClass]) => (
                  <li key={label} className="flex items-center justify-between gap-2 border-b border-foreground/[0.07] py-[9px] last:border-b-0">
                    <span>{label}</span>
                    <span className={`whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-bold ${tagClass}`}>{tag}</span>
                  </li>
                ))}
              </ul>
            </SlideIn>
            <SlideIn direction="up" delay={0.1} className="md:pl-10">
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground">On the roadmap</h3>
              <ul className="mt-2 text-[14.5px]">
                {[
                  "Heart disease model",
                  "Stroke model",
                  "Chronic kidney disease model",
                  "Hypertension model",
                  "Asthma & COPD models",
                ].map((label) => (
                  <li key={label} className="flex items-center justify-between gap-2 border-b border-foreground/[0.07] py-[9px] last:border-b-0">
                    <span>{label}</span>
                    <span className="whitespace-nowrap rounded-full bg-muted px-2 py-0.5 text-[11px] font-bold text-muted-foreground">
                      In development
                    </span>
                  </li>
                ))}
              </ul>
            </SlideIn>
          </div>
        </Section>

        <PagesBento />

        <FactsMarquee />
      </main>

      <LandingFooter />
    </div>
  )
}
