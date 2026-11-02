import type { Metadata, Viewport } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { MotionProvider } from "@/components/providers/MotionProvider";

// Quicksand across the whole site (Wadi's pick, 2026-11-02, approved from a
// full-site mockup): one rounded geometric sans for body, display and data.
// The three CSS variables keep their names, so every existing font-sans /
// font-display / font-mono class picks Quicksand up unchanged.
const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
});
// Display + mono slots are not the body face — don't let their preload
// compete with the body face and first paint on every page.
const quicksandDisplay = Quicksand({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-display',
  preload: false,
});
const quicksandMono = Quicksand({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-mono',
  preload: false,
});

const description =
  "Diabetes risk prediction with explainable machine learning — every score shows its reasons.";

export const viewport: Viewport = {
  themeColor: "#0D2B3E",
  // Edge-to-edge on notched phones; the chat + drawer footers pad
  // with env(safe-area-inset-bottom) (QA Round 3, mobile #16).
  viewportFit: "cover",
};

export const metadata: Metadata = {
  // Canonical base for sitemap/OG resolution; NEXT_PUBLIC_SITE_URL is the
  // same variable auth redirects use. Unset locally, which Next tolerates.
  // The fallback is the production origin, not localhost/undefined
  // (QA Round 3, SEO L7): a build missing the env var must still
  // resolve canonical/OG URLs to the real site.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://whyrisk.vercel.app"),
  title: {
    default: "WhyRisk",
    template: "%s — WhyRisk",
  },
  description,
  // Google Search Console ownership proof (Wadi, 2026-11-01) — the
  // HTML-tag method renders this meta in every page's head; removing it
  // after verification is fine for Google but harmless to keep.
  verification: {
    google: "V9W5eQmNGsddSR0k1tUxfbeawcnBWbiBXadOwRLmBoE",
  },
  openGraph: {
    type: "website",
    siteName: "WhyRisk",
    title: "WhyRisk",
    description,
    // The generated /opengraph-image route (src/app/opengraph-image.tsx)
    // renders a true 1200×630 card, so the declared dimensions are exact.
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "WhyRisk — Know your risk. See exactly why.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    // No title/description here (QA Round 3, SEO L1): page-level
    // values must win, and Twitter falls back to the page's
    // OpenGraph tags when its own are absent.
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", archivo.variable, anton.variable, jetbrainsMono.variable)}>
      <body className="antialiased">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
