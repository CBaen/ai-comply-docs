/**
 * DESIGN 4 — Premium Pricing Page
 *
 * Philosophy: Stripe/Linear pricing page energy. Confident, spacious, unambiguous.
 * The page has three acts:
 *   1. Hero — sets the "fraction of legal fees" frame before showing any prices
 *   2. Hero Products — 4 large cards (Colorado, Illinois, California, EU AI Act)
 *      laid out like a premium SaaS tier grid, with attorney-fee comparison baked in
 *   3. Full Library — compact, filterable, browsable — not overwhelming
 *
 * Architecture:
 *   - This file exports the page component (server component, no "use client")
 *   - Interactive parts (filter tabs, search, hero card hover) live in
 *     PremiumProductsClient (client component, defined below with "use client")
 *   - Structured data / metadata live in the server layer
 *
 * Images used from /images/landing/:
 *   Hero background   → product-tablet-desk.png
 *   Colorado card     → colorado-denver-skyline.png
 *   Illinois card     → illinois-chicago-skyline.png
 *   California card   → california-golden-gate.png
 *   EU AI Act card    → financial-building.png  (EU governance feel)
 *   Trust strip       → team-compliance-meeting.png
 */

// ─────────────────────────────────────────────────────────────────────────────
// FILE STRUCTURE
//
//  This file is intentionally self-contained for the competition submission.
//  In production you would split it:
//    src/app/products/page.tsx          ← server wrapper (metadata, schema)
//    src/components/PremiumProductsClient.tsx  ← everything below "use client"
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { useState, useId } from "react";
import Link from "next/link";
import type { Regulation } from "@/data/regulations";

// ─── STATIC DATA FOR HERO PRODUCTS ───────────────────────────────────────────
// These four are featured at the top as large cards.
// Slugs must match regulations.ts exactly.

const HERO_SLUGS = [
  "colorado-sb24-205",
  "illinois-hb3773",
  "california-ccpa-admt",
  "eu-ai-act",
] as const;

// Per-hero visual metadata (image, accent color class, attorney fee anchor)
const HERO_META: Record<
  string,
  {
    image: string;
    imageAlt: string;
    accentBg: string;       // Tailwind bg class for the card accent bar
    accentText: string;     // Tailwind text class for accent elements
    attorneyComparison: string;  // Human-readable comparison line
    tagline: string;        // One punchy line under the name
  }
> = {
  "colorado-sb24-205": {
    image: "/images/landing/colorado-denver-skyline.png",
    imageAlt: "Denver, Colorado skyline",
    accentBg: "bg-amber-500",
    accentText: "text-amber-600",
    attorneyComparison: "vs. $3,000–$8,000 in attorney time",
    tagline: "Consequential AI decisions. Deadline: June 30, 2026.",
  },
  "illinois-hb3773": {
    image: "/images/landing/illinois-chicago-skyline.png",
    imageAlt: "Chicago, Illinois skyline",
    accentBg: "bg-blue-600",
    accentText: "text-blue-600",
    attorneyComparison: "vs. $2,500–$6,000 in attorney time",
    tagline: "AI in hiring or promotions? Illinois requires documentation.",
  },
  "california-ccpa-admt": {
    image: "/images/landing/california-golden-gate.png",
    imageAlt: "Golden Gate Bridge, San Francisco",
    accentBg: "bg-rose-500",
    accentText: "text-rose-600",
    attorneyComparison: "vs. $4,000–$10,000 in attorney time",
    tagline: "Automated decisions about California consumers. Two deadlines.",
  },
  "eu-ai-act": {
    image: "/images/landing/financial-building.png",
    imageAlt: "EU regulatory compliance",
    accentBg: "bg-indigo-600",
    accentText: "text-indigo-600",
    attorneyComparison: "vs. $15,000–$40,000 in attorney time",
    tagline: "The world's first comprehensive AI law. Fines up to 7% of global revenue.",
  },
};

// ─── FILTER TYPES ─────────────────────────────────────────────────────────────

type FilterKey = "all" | "in-effect" | "effective-soon" | "federal" | "industry";

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All Packages" },
  { key: "in-effect", label: "In Effect Now" },
  { key: "effective-soon", label: "Deadline Approaching" },
  { key: "federal", label: "Federal & Universal" },
  { key: "industry", label: "Industry-Specific" },
];

function applyFilter(regs: Regulation[], filter: FilterKey): Regulation[] {
  switch (filter) {
    case "in-effect":
      return regs.filter((r) => r.status === "in-effect");
    case "effective-soon":
      return regs.filter((r) => r.status === "effective-soon");
    case "federal":
      return regs.filter((r) => r.tier === "federal" || r.tier === "universal");
    case "industry":
      return regs.filter((r) => r.tier === "industry" || r.tier === "international");
    default:
      return regs;
  }
}

// ─── STATUS PILL ──────────────────────────────────────────────────────────────

function StatusPill({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "in-effect":     "bg-red-100 text-red-700 border-red-200",
    "effective-soon": "bg-amber-100 text-amber-700 border-amber-200",
    "proposed":      "bg-slate-100 text-slate-600 border-slate-200",
  };
  const labels: Record<string, string> = {
    "in-effect":      "In Effect",
    "effective-soon": "Effective Soon",
    "proposed":       "Proposed",
  };
  const dots: Record<string, string> = {
    "in-effect":      "bg-red-500",
    "effective-soon": "bg-amber-500",
    "proposed":       "bg-slate-400",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${styles[status] ?? styles.proposed}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dots[status] ?? dots.proposed}`} aria-hidden="true" />
      {labels[status] ?? "Proposed"}
    </span>
  );
}

// ─── HERO PRODUCT CARD ────────────────────────────────────────────────────────
// Large premium card. ~280px tall. Prominent price, attorney comparison, CTA.

function HeroProductCard({ reg }: { reg: Regulation }) {
  const meta = HERO_META[reg.slug];
  if (!meta) return null;

  const firstSentence =
    reg.description.match(/^[^.!?]+[.!?]/)?.[0] ?? reg.description;

  return (
    <Link
      href={`/products/${reg.slug}`}
      className="group relative flex flex-col rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
      aria-label={`View ${reg.shortName} — $${reg.price}`}
    >
      {/* Accent bar at top */}
      <div className={`h-1 w-full ${meta.accentBg}`} />

      {/* Photo strip */}
      <div className="relative h-36 overflow-hidden bg-slate-100">
        <img
          src={meta.image}
          alt={meta.imageAlt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />
        {/* Status pill overlaid on photo */}
        <div className="absolute top-3 left-3">
          <StatusPill status={reg.status} />
        </div>
        {/* Doc count badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-full">
          {reg.documentCount} docs
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        {/* Name + jurisdiction */}
        <div className="mb-3">
          <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${meta.accentText}`}>
            {reg.state}
          </p>
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 font-display leading-tight group-hover:text-blue-700 transition-colors">
            {reg.shortName}
          </h3>
          <p className="text-sm text-slate-500 mt-1 leading-snug">{meta.tagline}</p>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-600 leading-relaxed flex-1 mb-5">
          {firstSentence}
        </p>

        {/* Price block */}
        <div className="border-t border-slate-100 pt-4">
          <div className="flex items-end justify-between mb-1">
            <div>
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display leading-none">
                ${reg.price.toLocaleString()}
              </span>
              <span className="text-slate-500 text-sm ml-1.5">one-time</span>
            </div>
            {/* Arrow CTA */}
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-700 group-hover:bg-blue-800 transition-colors shrink-0">
              <svg
                className="w-5 h-5 text-white translate-x-0 group-hover:translate-x-0.5 transition-transform"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
          {/* Attorney comparison */}
          <p className="text-xs text-slate-400 italic">{meta.attorneyComparison}</p>
        </div>
      </div>
    </Link>
  );
}

// ─── COMPACT LIBRARY CARD ─────────────────────────────────────────────────────
// Used for the full library below the hero products.
// Horizontal layout on sm+: name | price | CTA.

function CompactCard({ reg }: { reg: Regulation }) {
  const firstSentence =
    reg.description.match(/^[^.!?]+[.!?]/)?.[0] ?? reg.description;

  return (
    <div className="group flex flex-col sm:flex-row sm:items-center gap-4 bg-white rounded-xl border border-slate-200 p-4 sm:p-5 hover:border-blue-300 hover:shadow-md transition-all duration-200">
      {/* Left: text info */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug group-hover:text-blue-700 transition-colors">
            {reg.shortName}
          </h3>
          <StatusPill status={reg.status} />
        </div>
        <p className="text-xs text-slate-500 mb-1.5">
          {reg.state} &middot; Effective {reg.effectiveDate}
        </p>
        <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
          {firstSentence}
        </p>
      </div>

      {/* Right: price + CTA */}
      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 sm:gap-1 sm:shrink-0 sm:text-right">
        <div>
          <span className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display leading-none">
            ${reg.price.toLocaleString()}
          </span>
          <span className="text-xs text-slate-400 ml-1">one-time</span>
        </div>
        <Link
          href={`/products/${reg.slug}`}
          className="shrink-0 inline-flex items-center gap-1.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap"
        >
          View Details
          <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M6.22 3.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 010-1.06z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

// ─── TRUST STRIP ──────────────────────────────────────────────────────────────
// Social proof bar between hero products and full library.

function TrustStrip() {
  const stats = [
    { value: "53", label: "Compliance packages" },
    { value: "10+", label: "US state laws covered" },
    { value: "1/20th", label: "The cost of attorney fees" },
    { value: "Instant", label: "Download after purchase" },
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl bg-slate-900 text-white my-12 sm:my-16">
      {/* Background image */}
      <img
        src="/images/landing/team-compliance-meeting.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-10"
        aria-hidden="true"
      />
      <div className="relative z-10 px-6 sm:px-10 py-8 sm:py-10">
        <p className="text-center text-sm text-slate-400 uppercase tracking-widest font-semibold mb-6">
          Why teams choose AI Compliance Documents
        </p>
        <dl className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <dt className="text-3xl sm:text-4xl font-extrabold font-display text-white mb-1">
                {s.value}
              </dt>
              <dd className="text-xs text-slate-400 leading-snug">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

// ─── ATTORNEY FEE COMPARISON BANNER ───────────────────────────────────────────
// Appears just above the hero product grid. Anchors the value frame.

function AttorneyFeeBanner() {
  return (
    <div className="flex items-start sm:items-center gap-3 bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-5 mb-8 sm:mb-10">
      <div className="shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
        <svg
          className="w-5 h-5 text-blue-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <div>
        <p className="text-sm font-bold text-blue-900 leading-snug">
          Built by attorneys. Priced for businesses.
        </p>
        <p className="text-sm text-blue-700 mt-0.5">
          Attorney-drafted compliance documents typically run $2,500–$40,000 per project.
          Every package below is a fraction of that — with the statute citations included.
        </p>
      </div>
    </div>
  );
}

// ─── MAIN CLIENT COMPONENT ────────────────────────────────────────────────────

export default function PremiumPricingPage({
  regulations,
}: {
  regulations: Regulation[];
}) {
  const searchId = useId();
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Split hero vs library
  const heroRegs = HERO_SLUGS
    .map((slug) => regulations.find((r) => r.slug === slug))
    .filter((r): r is Regulation => r !== undefined);

  const libraryRegs = regulations.filter((r) => !HERO_SLUGS.includes(r.slug as typeof HERO_SLUGS[number]));

  // Apply search + filter to library
  const searchFiltered = searchTerm.trim()
    ? libraryRegs.filter((r) => {
        const q = searchTerm.toLowerCase();
        return (
          r.shortName.toLowerCase().includes(q) ||
          r.state.toLowerCase().includes(q) ||
          r.name.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.keywords.some((k) => k.toLowerCase().includes(q))
        );
      })
    : libraryRegs;

  const filtered = applyFilter(searchFiltered, activeFilter);

  const counts: Record<FilterKey, number> = {
    all: searchFiltered.length,
    "in-effect": searchFiltered.filter((r) => r.status === "in-effect").length,
    "effective-soon": searchFiltered.filter((r) => r.status === "effective-soon").length,
    federal: searchFiltered.filter((r) => r.tier === "federal" || r.tier === "universal").length,
    industry: searchFiltered.filter((r) => r.tier === "industry" || r.tier === "international").length,
  };

  return (
    <main id="main-content">
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <header className="relative overflow-hidden bg-slate-950 text-white">
        {/* Background photo */}
        <div className="absolute inset-0">
          <img
            src="/images/landing/product-tablet-desk.png"
            alt=""
            className="w-full h-full object-cover opacity-20"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/80 to-slate-950" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          {/* Label pill */}
          <div className="inline-flex items-center gap-2 border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm text-blue-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" aria-hidden="true" />
            {regulations.length} compliance packages
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-display leading-[1.1] tracking-tight text-white mb-5">
            AI Compliance Templates
          </h1>

          <p className="text-slate-300 text-lg sm:text-xl max-w-2xl leading-relaxed mb-8">
            State-specific and universal AI compliance packages built directly against
            enacted statute text. Instant download — at a fraction of attorney fees.
          </p>

          {/* Quick value props row */}
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {[
              "Statute citations included",
              "Instant PDF download",
              "No subscription",
              "Attorney-reviewed",
            ].map((prop) => (
              <span key={prop} className="flex items-center gap-1.5 text-sm text-slate-300">
                <svg
                  className="w-4 h-4 text-blue-400 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                {prop}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* ── HERO PRODUCTS ─────────────────────────────────────────────────── */}
      <section
        className="bg-white py-14 sm:py-20"
        aria-labelledby="featured-heading"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Section header */}
          <div className="mb-8 sm:mb-10">
            <h2
              id="featured-heading"
              className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 mb-2"
            >
              Most-purchased packages
            </h2>
            <p className="text-slate-500 text-base">
              The regulations most teams need first. Larger packages, more documents,
              highest-stakes deadlines.
            </p>
          </div>

          <AttorneyFeeBanner />

          {/* 2-up grid on md, 1-up on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {heroRegs.map((reg) => (
              <HeroProductCard key={reg.slug} reg={reg} />
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ───────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <TrustStrip />
      </div>

      {/* ── FULL LIBRARY ──────────────────────────────────────────────────── */}
      <section
        className="bg-slate-50 py-14 sm:py-20"
        aria-labelledby="library-heading"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Section header */}
          <div className="mb-8">
            <h2
              id="library-heading"
              className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 mb-2"
            >
              All packages
            </h2>
            <p className="text-slate-500 text-base">
              Every jurisdiction, searchable and filterable.
            </p>
          </div>

          {/* Search */}
          <div className="mb-4">
            <label htmlFor={searchId} className="sr-only">
              Search compliance packages
            </label>
            <div className="relative">
              <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <input
                id={searchId}
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by state, law name, or topic…"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Filter tabs */}
          <div className="flex overflow-x-auto gap-2 mb-8 pb-1 -mx-1 px-1 scrollbar-none" role="group" aria-label="Filter packages">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                aria-pressed={activeFilter === f.key}
                className={`shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  activeFilter === f.key
                    ? "bg-blue-700 text-white shadow-sm ring-1 ring-blue-700"
                    : "bg-white border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-700"
                }`}
              >
                {f.label}
                <span
                  className={`ml-2 text-xs font-semibold ${
                    activeFilter === f.key ? "text-blue-200" : "text-slate-400"
                  }`}
                >
                  {counts[f.key]}
                </span>
              </button>
            ))}
          </div>

          {/* "Not sure" accordion */}
          <details className="mb-8 group">
            <summary className="cursor-pointer list-none flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-blue-700 transition select-none">
              <svg
                className="w-4 h-4 text-blue-600 shrink-0 transition-transform group-open:rotate-90"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              Not sure where to start?
            </summary>
            <div className="mt-3 bg-white border border-slate-200 rounded-xl p-5 grid sm:grid-cols-3 gap-6 shadow-sm">
              <div>
                <p className="font-semibold text-slate-800 text-sm mb-1">Using AI in hiring?</p>
                <p className="text-xs text-slate-500 mb-3">
                  Employees or candidates in Illinois, NYC, or Colorado? These laws apply.
                </p>
                <ul className="space-y-1.5">
                  {[
                    { href: "/products/illinois-hb3773", label: "Illinois HB3773" },
                    { href: "/products/nyc-local-law-144", label: "NYC Local Law 144" },
                    { href: "/products/colorado-sb24-205", label: "Colorado SB 24-205" },
                    { href: "/products/multi-state-employer-ai-disclosure", label: "Multi-State Employer Bundle" },
                  ].map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-xs text-blue-700 hover:underline">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-semibold text-slate-800 text-sm mb-1">Collecting consumer data?</p>
                <p className="text-xs text-slate-500 mb-3">
                  Using customer data for targeting, profiling, or automated decisions?
                </p>
                <ul className="space-y-1.5">
                  {[
                    { href: "/products/virginia-cdpa", label: "Virginia CDPA" },
                    { href: "/products/california-ccpa-admt", label: "California CCPA ADMT" },
                    { href: "/products/multi-state-profiling-assessment", label: "Multi-State Profiling Bundle" },
                  ].map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-xs text-blue-700 hover:underline">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-semibold text-slate-800 text-sm mb-1">Not sure what AI you use?</p>
                <p className="text-xs text-slate-500 mb-3">
                  Start with an inventory before worrying about which laws apply.
                </p>
                <ul className="space-y-1.5">
                  {[
                    { href: "/products/ai-system-registry", label: "AI System Registry" },
                    { href: "/products/ai-governance-framework", label: "AI Governance Framework" },
                  ].map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-xs text-blue-700 hover:underline">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </details>

          {/* Compact card list */}
          <div className="flex flex-col gap-3">
            {filtered.map((reg) => (
              <CompactCard key={reg.slug} reg={reg} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-slate-500">
              <svg
                className="w-10 h-10 text-slate-300 mx-auto mb-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <p className="font-semibold text-slate-700 mb-1">No packages found</p>
              <p className="text-sm">
                {searchTerm.trim()
                  ? `No packages match "${searchTerm}".`
                  : "No packages match this filter."}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── BOTTOM CTA ────────────────────────────────────────────────────── */}
      <section className="bg-slate-950 text-white py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white mb-3">
            Not sure which package applies to you?
          </h2>
          <p className="text-slate-400 text-base mb-8 max-w-xl mx-auto">
            Tell us how you use AI and where your employees or customers are located.
            We&apos;ll identify which regulations apply to your business at no charge.
          </p>
          <a
            href="mailto:info@aicompliancedocuments.com"
            className="inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl text-base transition-colors shadow-lg shadow-blue-900/30"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
            Get a free recommendation
          </a>
          <p className="text-slate-500 text-sm mt-4">
            Response within one business day. No sales pressure.
          </p>
        </div>
      </section>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SERVER WRAPPER — how this plugs into src/app/products/page.tsx
//
// Replace the existing page.tsx with:
//
//   import type { Metadata } from "next";
//   import Nav from "@/components/Nav";
//   import Footer from "@/components/Footer";
//   import PremiumPricingPage from "@/components/PremiumPricingPage";
//   import { regulations } from "@/data/regulations";
//
//   // ... keep existing metadata + ItemListSchema unchanged ...
//
//   export default function RegulationsIndexPage() {
//     return (
//       <>
//         <ItemListSchema />
//         <Nav />
//         <PremiumPricingPage regulations={regulations.filter(r => r.ready)} />
//         <Footer />
//       </>
//     );
//   }
// ─────────────────────────────────────────────────────────────────────────────
