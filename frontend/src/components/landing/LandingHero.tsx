"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion, type Variants } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { Crosshair } from "@/components/landing/chrome"

/**
 * Landing hero in the Watermelon template's composition (22 Nov
 * 2026), skinned to PrimeDental violet: centred badge, two-line
 * display heading with a rotating final word (template timings:
 * 2.8s cycle, blur/y swap), mono subheading, solid + outline CTAs,
 * a proof-chip strip, and the fanned screenshot collage in browser
 * frames (template IMAGE_POSITIONS) — the frames hold captures of WhyRisk's own
 * pages, self-hosted under /public/landing.
 */

const ROTATING_WORDS = ["why.", "the reasons.", "the factors.", "the evidence."] as const

const SHOTS: Record<string, string> = {
  "https://whyrisk.vercel.app/login": "/landing/shot-login.png",
  "https://whyrisk.vercel.app/model-card": "/landing/shot-modelcard.png",
  "https://whyrisk.vercel.app/signup": "/landing/shot-signup.png",
  "https://whyrisk.vercel.app/welcome": "/landing/shot-welcome.png",
}

function shot(url: string) {
  return SHOTS[url] ?? url
}

const FRAMES: {
  img: string
  alt: string
  style: React.CSSProperties
}[] = [
  {
    img: shot("https://whyrisk.vercel.app/login"),
    alt: "WhyRisk sign-in page",
    style: { top: "-6%", left: "-4%", width: "27%", transform: "rotate(-10deg)", zIndex: 2 },
  },
  {
    img: shot("https://whyrisk.vercel.app/model-card"),
    alt: "WhyRisk model card page",
    style: { top: "-6%", right: "-4%", width: "27%", transform: "rotate(10deg)", zIndex: 2 },
  },
  {
    img: shot("https://whyrisk.vercel.app/signup"),
    alt: "WhyRisk create-account page",
    style: { top: "12%", left: "6%", width: "36%", transform: "rotate(-5deg)", zIndex: 3 },
  },
  {
    img: shot("https://whyrisk.vercel.app/login"),
    alt: "WhyRisk sign-in page",
    style: { top: "12%", right: "6%", width: "36%", transform: "rotate(5deg)", zIndex: 3 },
  },
  {
    img: shot("https://whyrisk.vercel.app/welcome"),
    alt: "WhyRisk landing page",
    style: { top: "15%", left: "38%", width: "24%", transform: "rotate(0deg)", zIndex: 0 },
  },
  {
    img: shot("https://whyrisk.vercel.app/welcome"),
    alt: "WhyRisk landing page",
    style: { top: "34%", left: "24%", width: "52%", transform: "rotate(0deg)", zIndex: 10 },
  },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
}

export function LandingHero() {
  const [wordIndex, setWordIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setWordIndex((i) => (i + 1) % ROTATING_WORDS.length), 2800)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden pb-24 pt-36 font-mono">
      {/* Dot grid + violet ambient glow (template layers, re-skinned) */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(87,76,214,0.08) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[600px] max-w-[90vw] -translate-x-1/2 rounded-full"
        style={{
          translateY: "-60%",
          background:
            "radial-gradient(ellipse at center, rgba(107,99,255,0.10) 0%, rgba(107,99,255,0.04) 40%, transparent 70%)",
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      />
      {/* Technical borders + crosshairs */}
      <div aria-hidden="true" className="absolute inset-x-0 top-24 hidden h-px bg-foreground/[0.06] lg:block" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-24 hidden h-px bg-foreground/[0.06] lg:block" />
      <div aria-hidden="true" className="absolute inset-y-0 left-16 hidden w-px bg-foreground/[0.06] lg:block" />
      <div aria-hidden="true" className="absolute inset-y-0 right-16 hidden w-px bg-foreground/[0.06] lg:block" />
      <Crosshair className="left-16 top-24 -translate-x-1/2 -translate-y-1/2" />
      <Crosshair className="right-16 top-24 -translate-y-1/2 translate-x-1/2" />
      <Crosshair className="bottom-24 left-16 -translate-x-1/2 translate-y-1/2" />
      <Crosshair className="bottom-24 right-16 translate-x-1/2 translate-y-1/2" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center px-4 sm:px-5 lg:px-16">
        <motion.div
          className="mx-auto flex max-w-4xl flex-col items-center text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <span className="mb-10 inline-flex items-center gap-2 border border-border bg-white/60 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-text backdrop-blur-sm">
              Trained model — live today
            </span>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h1 className="font-sans text-[clamp(42px,7vw,80px)] font-bold leading-[0.98] tracking-tight text-foreground">
              Know your risk.
            </h1>
          </motion.div>
          <motion.div variants={itemVariants}>
            <h1 className="mb-8 font-sans text-[clamp(42px,7vw,80px)] font-bold leading-[0.98] tracking-tight text-foreground">
              See exactly{" "}
              <span className="relative inline-block text-primary">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={ROTATING_WORDS[wordIndex]}
                    className="inline-block"
                    initial={{ y: 12, opacity: 0, filter: "blur(4px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: -12, opacity: 0, filter: "blur(4px)", transition: { duration: 0.15, ease: "easeIn" } }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    {ROTATING_WORDS[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>
          </motion.div>

          <motion.div variants={itemVariants}>
            <p className="mb-12 max-w-2xl text-pretty font-mono text-base leading-relaxed text-muted-foreground md:text-lg">
              A trained LightGBM model estimates a patient&rsquo;s diabetes risk from 21 health
              indicators — and shows the reasons behind every score. No black box. No invented
              numbers.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/signup"
              className="group inline-flex items-center justify-center gap-2 bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground transition hover:bg-primary/90 active:scale-[0.97]"
            >
              Create your account
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <a
              href="#how"
              className="inline-flex items-center justify-center border border-foreground/20 px-8 py-3.5 text-sm font-bold text-foreground transition hover:bg-white/60 active:scale-[0.97]"
            >
              How the model works
            </a>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-16 flex flex-col items-center gap-4">
            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              <span className="h-px w-8 bg-foreground/15" />
              Verified model facts
              <span className="h-px w-8 bg-foreground/15" />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {["0.8222 AUC-ROC", "70,692 records", "SHAP explained"].map((chip) => (
                <span
                  key={chip}
                  className="border border-border bg-white/50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-foreground/60"
                >
                  {chip}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Screenshot collage (template IMAGE_POSITIONS + BgFrame) */}
        <motion.div
          className="pointer-events-none relative mx-auto mt-24 flex h-[380px] w-full max-w-6xl items-center justify-center sm:mt-32 sm:h-[560px] lg:h-[720px]"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.8 } } }}
        >
          {FRAMES.map((f, i) => (
            <motion.div
              key={i}
              className="pointer-events-auto absolute bg-white p-1.5 shadow-2xl ring-1 ring-border"
              style={f.style}
              variants={{
                hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              whileHover={{ scale: 1.05, zIndex: 50, transition: { duration: 0.4 } }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.img} alt={f.alt} className="h-auto w-full object-cover" loading="lazy" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
