import Image from "next/image"
import Link from "next/link"
import type { CSSProperties } from "react"
import type { Metadata } from "next"
import { ArrowRight, BrainCircuit, CalendarCheck, ShieldAlert, ShieldCheck } from "lucide-react"
import { CursorGlow } from "@/components/motion/CursorGlow"
import { Magnetic } from "@/components/motion/Magnetic"
import { Parallax } from "@/components/motion/Parallax"
import { ScrollTrace } from "@/components/motion/ScrollTrace"
import { TiltCard } from "@/components/motion/TiltCard"
import BrandMark from "@/components/shared/BrandMark"
import PublicFooterLinks from "@/components/shared/PublicFooterLinks"
import { GuestRiskCheck } from "@/components/shared/GuestRiskCheck"
import { SlideIn } from "@/components/shared/SlideIn"
import { StatsBand } from "@/components/shared/StatsBand"
import { AnimatedFactorBars } from "@/components/shared/AnimatedFactorBars"
import { SEVERITY_HEX } from "@/lib/status"

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
/*  WhyRisk public landing page.                                     */
/*  Every number on this page is a verified project fact (see the      */
/*  README): one trained diabetes model, its held-out AUC-ROC, the     */
/*  BRFSS 2015 dataset, and a SHAP explanation stored per prediction. */
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

const CAPABILITIES = [
  {
    icon: BrainCircuit,
    title: "Risk prediction",
    text: "A LightGBM model trained on CDC survey data estimates diabetes risk from 21 everyday health indicators, no lab visit needed for a first screening.",
  },
  {
    icon: ShieldCheck,
    title: "The reason, not just the score",
    text: "Every result lists the factors that pushed the score up or down, with their weights. A doctor can argue with it, that is the point.",
  },
  {
    icon: CalendarCheck,
    title: "Records & appointments",
    text: "Patient and doctor portals with role-based access, appointment booking and an admin overview, protected by row-level security.",
  },
]

// Demo SHAP bars: severity fills come from lib/status.ts (Moderate fill
// #D97706, Low #1E7A46); the brand bar is the accent, not a severity.
const DEMO_FACTORS = [
  { label: "BMI 29.4", width: "62%", color: SEVERITY_HEX.Moderate, value: "+0.14" },
  { label: "High blood pressure", width: "48%", color: SEVERITY_HEX.Moderate, value: "+0.10" },
  { label: "High cholesterol", width: "38%", color: "#2E7FA8", value: "+0.08" },
  { label: "Physically active", width: "30%", color: SEVERITY_HEX.Low, value: "−0.06" },
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
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background shadow-[0_1px_12px_rgba(13,43,62,0.06)]">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-3.5 gap-y-2 px-4 py-3.5 sm:px-5">
          <Link href="/welcome" className="flex shrink-0 items-center gap-3">
            <BrandMark className="h-[38px] w-[38px] shrink-0" />
            <span className="font-display text-[21px] uppercase leading-none tracking-wide">
              WhyRisk
              {/* Tagline hidden below sm: at 360px the header row
                  (brand + tagline + CTA) overflowed the screen
                  (QA Round 2, cluster 28). */}
              <span className="mt-1 hidden text-[9.5px] font-medium text-brand-text sm:block">
                Risk, explained
              </span>
            </span>
          </Link>
          {/* Nav: on mobile it takes its own row under brand + CTA — one
              centred horizontal line, links never wrap (Wadi, 2026-11-01).
              From md up it sits inline, centred between brand and CTA. */}
          <nav className="order-3 flex w-full items-center justify-center gap-3.5 overflow-x-auto whitespace-nowrap text-[12.5px] font-semibold min-[420px]:gap-4 md:order-none md:w-auto md:flex-1 md:gap-6 md:overflow-visible md:text-[13px]">
            <a href="#check" className="text-foreground/75 transition hover:text-foreground">Risk check</a>
            <Link href="/model-card" className="text-foreground/75 transition hover:text-foreground">The model</Link>
            <a href="#how" className="text-foreground/75 transition hover:text-foreground">How it works</a>
            <a href="#scope" className="text-foreground/75 transition hover:text-foreground">Scope</a>
            <Link href="/login" className="text-foreground/75 transition hover:text-foreground">Sign in</Link>
          </nav>
          <Link
            href="/signup"
            className="ml-auto inline-flex shrink-0 items-center whitespace-nowrap rounded-lg border-[1.5px] border-primary px-3 py-2 text-[13px] font-bold text-primary transition hover:bg-secondary sm:px-5 sm:py-2.5 sm:text-sm md:ml-0"
          >
            Create your account
          </Link>
        </div>
        {/* Step C4: the scroll-drawn ECG strip rides the header's
            bottom edge (header is sticky, so it stays in view and
            fills with page scroll progress). Static full trace
            under reduced motion; landing-only. */}
        <ScrollTrace />
      </header>

      <main id="main-content">
        {/* Hero — full-bleed ECG photograph background (Step B): the
            photo sits under a deep-navy gradient, heavier on the text
            side, so the white headline stays perfectly readable and
            the trace reads as an accent. The animated pulse below is
            the Signature Flow beat (globals.css .pulse-beat) travelling
            a faint trace along the hero's lower edge; under
            prefers-reduced-motion it renders as a static trace. */}
        <section className="relative overflow-hidden bg-primary">
          {/* Step C3: the photo layer drifts ≤10px with scroll
              (transform only; the scale-[1.06] is its headroom).
              Off on touch and under reduced motion. */}
          <Parallax className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1682706841289-9d7ddf5eb999?fm=jpg&q=80&w=2400&auto=format&fit=crop"
              alt="Electrocardiogram heartbeat trace glowing on a dark monitor"
              fill
              priority
              sizes="100vw"
              className="scale-[1.06] object-cover object-center blur-[3px]"
            />
          </Parallax>
          <div aria-hidden="true" className="absolute inset-0 bg-[#0D2B3E]/70" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#0D2B3E]/95 via-[#0D2B3E]/85 to-[#0D2B3E]/60" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0D2B3E]/80 via-transparent to-[#0D2B3E]/25" />
          <svg
            aria-hidden="true"
            viewBox="0 0 1440 160"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-x-0 bottom-4 h-[110px] w-full sm:h-[140px]"
          >
            <path
              d="M0 96 H240 L262 96 L280 62 L300 128 L322 24 L344 96 H560 L582 96 L600 68 L620 120 L640 96 H880 L902 96 L920 56 L942 134 L964 20 L986 96 H1200 L1222 96 L1240 66 L1260 122 L1280 96 H1440"
              fill="none"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="stroke-brand"
              opacity={0.16}
            />
            <path
              d="M0 96 H240 L262 96 L280 62 L300 128 L322 24 L344 96 H560 L582 96 L600 68 L620 120 L640 96 H880 L902 96 L920 56 L942 134 L964 20 L986 96 H1200 L1222 96 L1240 66 L1260 122 L1280 96 H1440"
              fill="none"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={100}
              className="pulse-beat stroke-brand"
              opacity={0.45}
            />
          </svg>
          {/* Step C3: the site's one cursor glow — above the photo
              and scrims, below the content (z-10). Pointer-fine and
              reduced-motion gated inside the component. */}
          <CursorGlow />
          <div className="relative z-10 mx-auto grid w-full max-w-[1400px] items-start gap-10 px-5 pb-14 pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:pb-[72px] lg:pt-20">
          <div>
            <p className="eyebrow reveal text-[#8FC3DC]" style={{ "--d": "0ms" } as CSSProperties}>
              Explainable healthcare ML
            </p>
            <h1
              className="reveal mt-4 font-display text-[clamp(42px,7.5vw,76px)] uppercase leading-[1.02] text-white 2xl:text-[88px]"
              style={{ "--d": "90ms" } as CSSProperties}
            >
              Know your risk.
              <br />
              <span className="text-[#8FC3DC]">See exactly why.</span>
            </h1>
            <p
              className="reveal reveal-slow mt-6 max-w-[620px] text-[17.5px] leading-relaxed text-white/80"
              style={{ "--d": "200ms" } as CSSProperties}
            >
              WhyRisk helps care teams estimate a patient&apos;s diabetes risk with a trained machine-learning
              model, and shows the reasons behind every score, in plain language. Assessments are run by your
              care team; patients use the portal for appointments, their profile and their latest risk assessment. No black box. No invented
              numbers.
            </p>
            <div className="reveal mt-7 flex flex-wrap gap-3" style={{ "--d": "320ms" } as CSSProperties}>
              <Magnetic>
                <Link
                  href="/signup"
                  className="inline-flex items-center rounded-lg bg-brand px-5 py-3 text-sm font-bold text-white transition hover:bg-brand/90"
                >
                  Create your account <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Magnetic>
              <a
                href="#how"
                className="inline-flex items-center rounded-lg border-[1.5px] border-white/50 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                How the model works
              </a>
            </div>
            <div
              className="reveal reveal-slow mt-7 flex items-start gap-2.5 rounded-lg border border-[#D97706]/35 bg-[#0D2B3E]/95 px-4 py-3 text-[13.5px] leading-relaxed text-[#F2B25C]"
              style={{ "--d": "430ms" } as CSSProperties}
            >
              <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
              <p>
                <strong>Honest by design:</strong> one trained model today (diabetes). Everything else is clearly marked
                as roadmap, this site never dresses up a guess as a prediction.
              </p>
            </div>
          </div>

          {/* Hero visual — the explanation is the product. Step C3:
              the card leans ≤6° toward the cursor (TiltCard);
              static on touch and under reduced motion. */}
          <TiltCard>
          <div
            className="reveal reveal-slow rounded-[14px] border border-border bg-card p-[22px] shadow-premium"
            style={{ "--d": "240ms" } as CSSProperties}
          >
            <div className="flex items-center justify-between">
              <span className="flex flex-wrap items-center gap-1.5">
                <span className="rounded-full border px-2.5 py-0.5 text-xs font-medium">Patient</span>
                <span className="rounded-full border px-2.5 py-0.5 text-xs font-medium">Diabetes risk</span>
              </span>
              <span className="rounded-full bg-[#E2F0E6] px-2.5 py-1 text-[11px] font-bold text-[#1E7A46]">
                Demo data
              </span>
            </div>
            <p className="mt-2 font-sans text-xl font-bold tracking-normal">Ahmed Raza, 47</p>
            <p className="text-[13px] text-muted-foreground">Sample assessment, LightGBM model</p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <span className="font-display text-[52px] leading-none">
                0.31{" "}
                <small className="font-sans text-sm font-semibold text-muted-foreground">/ 1.00 probability</small>
              </span>
              <span className="rounded-full bg-[#FDF0DC] px-2.5 py-1 text-[11px] font-bold text-[#A85008]">
                Moderate risk
              </span>
            </div>
            <div className="mt-2.5 h-2.5 overflow-hidden rounded-full bg-secondary">
              <div className="h-full w-[31%] rounded-full bg-brand" />
            </div>
            <div className="flex justify-between text-[11px] font-medium text-muted-foreground">
              <span>LOW</span>
              <span>MODERATE</span>
              <span>HIGH</span>
              <span>CRITICAL</span>
            </div>
            <div className="mt-[18px] border-t border-secondary pt-3.5">
              <p className="text-[11px] font-medium text-brand-text">
                Why this score: top factors
              </p>
              <AnimatedFactorBars factors={DEMO_FACTORS} />
            </div>
            <p className="mt-4 border-t border-secondary pt-3 text-xs leading-relaxed text-muted-foreground">
              Explanation generated with SHAP from the patient&apos;s own inputs. A screening aid, not a diagnosis.
            </p>
          </div>
          </TiltCard>
          </div>
        </section>

        <div className="mx-auto max-w-[1400px] px-5">
        {/* Honest facts — one band, hairline-separated columns */}
        <section id="model" className="scroll-mt-28 pb-2 pt-8 md:scroll-mt-24 lg:pt-10">
          <StatsBand facts={FACTS} />
        </section>

        {/* Quick risk check — the real model, no account needed.
            Step B: the CT scanner photograph as a blurred background
            layer under a heavy paper tint — background only, the form
            renders above it untouched. */}
        <section id="check" className="relative scroll-mt-28 md:scroll-mt-24 pb-2 pt-12 lg:pt-16">
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="https://images.pexels.com/photos/13176356/pexels-photo-13176356.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="A CT scanner and patient table in a bright imaging room"
              fill
              sizes="(min-width: 1400px) 1370px, 100vw"
              className="scale-[1.06] object-cover blur-[4px]"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-background/[0.96]" />
          </div>
          <div className="relative z-10">
          <SlideIn direction="up" className="text-center">
            <h2 className="font-heading text-3xl font-bold sm:text-4xl 2xl:text-[44px]">Try the model yourself</h2>
            <p className="mx-auto mt-1.5 max-w-[640px] text-[15.5px] text-foreground/80">
              No account, nothing saved. Answer the same questions a care team would ask, and the trained
              diabetes model scores them, the same model, not a demo imitation.
            </p>
          </SlideIn>
          <SlideIn direction="up" delay={0.1} className="mt-[22px]">
            <GuestRiskCheck />
          </SlideIn>
          </div>
        </section>

        {/* What it does — the model/process section. The Step B
            laboratory-flasks photo was pulled for readability after
            repeated checks; the section renders on the plain page
            background. */}
        <section id="how" className="relative scroll-mt-28 md:scroll-mt-24 pb-2 pt-12 lg:pt-16">
          <div className="relative z-10">
          <SlideIn className="text-center">
            <h2 className="font-heading text-3xl font-bold sm:text-4xl 2xl:text-[44px]">What it does</h2>
            <p className="mx-auto mt-1.5 max-w-[640px] text-[15.5px] text-muted-foreground">
              Three things, done properly, instead of ten things done with smoke and mirrors.
            </p>
          </SlideIn>
          <div className="mt-[22px] space-y-4">
            {CAPABILITIES.map((c, i) => (
              <SlideIn key={c.title} delay={i * 0.1}>
                <div className="card-interactive grid items-start gap-3 rounded-xl border bg-card p-5 shadow-card sm:grid-cols-[64px_1fr] md:grid-cols-[76px_minmax(210px,290px)_1fr] md:gap-6">
                  <div aria-hidden="true" className="flex h-[52px] w-[52px] items-center justify-center rounded-[12px] bg-secondary text-primary">
                    <c.icon className="h-6 w-6" />
                  </div>
                  <h3 className="self-center font-sans text-[17px] font-bold tracking-normal">{c.title}</h3>
                  <p className="text-sm leading-relaxed text-foreground/75 sm:col-start-2 md:col-start-3">{c.text}</p>
                </div>
              </SlideIn>
            ))}
          </div>
          </div>
        </section>

        {/* Honest scope */}
        <section id="scope" className="scroll-mt-28 md:scroll-mt-24 pb-2 pt-12 lg:pt-16">
          <SlideIn className="text-center">
            <h2 className="font-heading text-3xl font-bold sm:text-4xl 2xl:text-[44px]">What is real, what is next</h2>
            <p className="mx-auto mt-1.5 max-w-[640px] text-[15.5px] text-muted-foreground">
              Most health apps hide this page. We put it on the homepage.
            </p>
          </SlideIn>
          <div className="mt-[22px] grid gap-10 md:grid-cols-2 md:gap-0 md:divide-x md:divide-border">
            <SlideIn className="md:pr-10">
              <h3 className="text-xs font-medium text-[#1E7A46]">Available now</h3>
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
              <h3 className="text-xs font-medium text-muted-foreground">On the roadmap</h3>
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
        </section>

        {/* Inside the app */}
        <section className="pb-4 pt-12 lg:pt-16">
          <SlideIn direction="up" className="text-center">
            <h2 className="font-heading text-3xl font-bold sm:text-4xl 2xl:text-[44px]">Inside the app</h2>
            <p className="mx-auto mt-1.5 max-w-[640px] text-[15.5px] text-muted-foreground">
              One admin, one login, a live overview of the whole practice.
            </p>
          </SlideIn>
          <SlideIn direction="up" delay={0.1} className="mt-[22px]">
          <div className="overflow-hidden rounded-[14px] border border-border bg-card shadow-premium">
            <div className="flex items-center gap-3 border-b border-border bg-secondary/60 px-4 py-2.5">
              <span className="flex gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-[#DE6B5F]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#E3B341]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#57AB5A]" />
              </span>
              <span className="rounded-md bg-background px-3 py-1 font-mono text-[11px] text-muted-foreground">
                whyrisk.vercel.app
              </span>
            </div>
            <div className="grid md:grid-cols-[200px_1fr]">
            <div className="hidden bg-foreground p-5 text-[#CCD0CF] md:block">
              <div className="font-display text-[17px] uppercase tracking-wide text-white">WhyRisk</div>
              <ul className="mt-[18px] space-y-1 text-[13.5px]">
                {["Dashboard", "Risk Queue", "Alerts Center", "AI Assistant", "Model Registry", "Audit Logs"].map((item, i) => (
                  <li key={item} className={i === 0 ? "rounded-lg bg-primary px-2.5 py-[9px] font-bold text-white" : "px-2.5 py-[9px] opacity-80"}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-5">
              <div className="text-[11px] font-medium text-muted-foreground">Admin overview</div>
              <div className="mt-3 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
                {["Total patients (live count)", "Total doctors (live count)", "Pending approvals", "Appointments"].map((label) => (
                  <div key={label} className="rounded-[10px] border border-secondary bg-background p-3.5">
                    <span className="block font-sans text-2xl font-bold">—</span>
                    <span className="text-xs text-muted-foreground">{label}</span>
                  </div>
                ))}
              </div>
              <p className="mt-3.5 text-[13px] text-muted-foreground">
                Counts load live from the database, the preview leaves them blank rather than inventing numbers.
              </p>
            </div>
            </div>
          </div>
          </SlideIn>
        </section>
        </div>
      </main>

      {/* Footer — the landing's closing band. Step B: the landing has
          no separate CTA band, so the pills-on-navy photograph backs
          this band instead, under a heavy ink overlay (the guest
          risk-check backdrop carries the CT scanner, per the photo
          map). Background only; links and disclaimer render above. */}
      <footer className="relative mt-14 overflow-hidden bg-foreground py-[30px] text-[#CCD0CF] lg:mt-20">
        <Image
          src="https://images.pexels.com/photos/9742893/pexels-photo-9742893.jpeg?auto=compress&cs=tinysrgb&w=2400"
          alt="Assorted medication capsules and tablets arranged on a deep navy surface"
          fill
          sizes="100vw"
          className="scale-[1.06] object-cover blur-[2px]"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-foreground/[0.94]" />
        <div className="relative z-10 mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-3.5 px-5">
          <span className="font-display text-lg uppercase tracking-wide text-white">WhyRisk</span>
          <PublicFooterLinks
            className="flex flex-wrap items-center gap-4"
            linkClassName="text-xs font-semibold text-white underline decoration-[#2E7FA8] decoration-2 underline-offset-4 hover:opacity-80"
          />
          <p className="max-w-[640px] text-xs leading-relaxed opacity-75">
            WhyRisk is an experimental clinical decision-support and research tool. It is not a certified medical
            device and does not replace professional diagnosis. Built during a machine-learning internship at Ezitech
            Institute, Islamabad.
          </p>
        </div>
      </footer>
    </div>
  )
}
