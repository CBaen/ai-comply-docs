"use client";

import Link from "next/link";

interface BundleDef {
  slug: string;
  name: string;
  tagline: string;
  image: string;
  imageAlt: string;
  bundlePrice: number;
  individualItems: { name: string; price: number; state: string }[];
  documents: number;
  jurisdictions: string[];
  highlights: string[];
  status: "in-effect" | "effective-soon";
  ctaLabel: string;
}

const BUNDLES: BundleDef[] = [
  {
    slug: "multi-state-employer-ai-disclosure",
    name: "Employer AI Disclosure Kit",
    tagline: "Hiring AI compliance for IL, NYC, and CO — all three in one.",
    image: "/images/landing/team-compliance-meeting.png",
    imageAlt: "Team reviewing AI compliance documents",
    bundlePrice: 299,
    individualItems: [
      { name: "Illinois HB3773", price: 299, state: "Illinois" },
      { name: "NYC Local Law 144", price: 399, state: "New York City" },
      { name: "Colorado SB 24-205", price: 449, state: "Colorado" },
    ],
    documents: 5,
    jurisdictions: ["Illinois", "New York City", "Colorado"],
    highlights: [
      "Unified notice covers all 3 jurisdictions",
      "Built for employers — not just privacy teams",
      "Covers hiring, promotion, and AI evaluation tools",
    ],
    status: "in-effect",
    ctaLabel: "Get the Employer Bundle",
  },
  {
    slug: "multi-state-profiling-assessment",
    name: "Multi-State Profiling Bundle",
    tagline: "One assessment framework for 15+ state privacy laws.",
    image: "/images/landing/professional-reviewing-documents.png",
    imageAlt: "Professional reviewing multi-state compliance documents",
    bundlePrice: 399,
    individualItems: [
      { name: "Virginia CDPA", price: 249, state: "Virginia" },
      { name: "Connecticut CTDPA", price: 249, state: "Connecticut" },
      { name: "Texas TDPSA", price: 249, state: "Texas" },
      { name: "Oregon CPA", price: 249, state: "Oregon" },
      { name: "Minnesota MCDPA", price: 349, state: "Minnesota" },
      { name: "+ 10 more states", price: 0, state: "" },
    ],
    documents: 5,
    jurisdictions: ["VA", "CT", "TX", "OR", "MN", "DE", "+ 10 more"],
    highlights: [
      "Covers 15+ states with one framework",
      "State Comparison Matrix included",
      "Threshold analysis so you know what applies",
    ],
    status: "in-effect",
    ctaLabel: "Get the Profiling Bundle",
  },
];

function SavingsCalculator({ items, bundlePrice }: { items: BundleDef["individualItems"]; bundlePrice: number }) {
  const pricedItems = items.filter((i) => i.price > 0);
  const individualTotal = pricedItems.reduce((sum, i) => sum + i.price, 0);
  const savings = individualTotal - bundlePrice;
  const hasMore = items.some((i) => i.price === 0);

  return (
    <div className="bg-slate-800/60 rounded-xl border border-slate-700 p-4 space-y-2">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">What you&apos;d pay separately</p>
      {pricedItems.map((item) => (
        <div key={item.name} className="flex justify-between items-center text-sm">
          <span className="text-slate-300">{item.name}</span>
          <span className="text-slate-400 font-mono">${item.price}</span>
        </div>
      ))}
      {hasMore && (
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-400 italic">+ additional states</span>
          <span className="text-slate-500 font-mono">$$$</span>
        </div>
      )}
      <div className="border-t border-slate-600 pt-2 mt-2 flex justify-between items-center text-sm">
        <span className="text-slate-400">Individual total ({pricedItems.length}{hasMore ? "+" : ""} items)</span>
        <span className="text-slate-300 font-mono line-through">${individualTotal}{hasMore ? "+" : ""}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-white font-bold text-base">Bundle price</span>
        <span className="text-2xl font-extrabold text-white font-display">${bundlePrice}</span>
      </div>
      <div className="bg-green-500/15 border border-green-500/30 rounded-lg px-3 py-2 flex justify-between items-center">
        <span className="text-green-300 font-semibold text-sm">You save</span>
        <span className="text-green-300 font-extrabold text-lg font-display">${savings}{hasMore ? "+" : ""}</span>
      </div>
    </div>
  );
}

export default function BundleShowcase() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
      {BUNDLES.map((bundle) => (
        <article
          key={bundle.slug}
          className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden flex flex-col hover:border-blue-500/60 transition-colors group"
        >
          <div className="relative h-40 sm:h-48 overflow-hidden">
            <img src={bundle.image} alt={bundle.imageAlt} className="w-full h-full object-cover opacity-60 group-hover:opacity-70 transition-opacity" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/40 to-slate-800" />
            <div className="absolute top-3 left-3">
              <span className="inline-flex items-center gap-1.5 bg-red-500/90 text-white text-xs font-bold px-2.5 py-1 rounded">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                IN EFFECT
              </span>
            </div>
            <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
              {bundle.jurisdictions.map((j) => (
                <span key={j} className="bg-slate-900/80 text-slate-200 text-xs px-2 py-0.5 rounded font-medium">{j}</span>
              ))}
            </div>
          </div>

          <div className="p-5 sm:p-6 flex flex-col flex-1">
            <h3 className="text-lg sm:text-xl font-extrabold font-display text-white leading-snug mb-1">{bundle.name}</h3>
            <p className="text-slate-400 text-sm mb-5">{bundle.tagline}</p>

            <ul className="space-y-2 mb-6" aria-label="What&apos;s included">
              {bundle.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm text-slate-300">
                  <svg className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {h}
                </li>
              ))}
              <li className="flex items-start gap-2 text-sm text-slate-300">
                <svg className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {bundle.documents} documents — instant download
              </li>
            </ul>

            <SavingsCalculator items={bundle.individualItems} bundlePrice={bundle.bundlePrice} />

            <Link
              href={`/products/${bundle.slug}`}
              className="mt-5 block text-center bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm sm:text-base py-3.5 rounded-xl transition-colors"
            >
              {bundle.ctaLabel} →
            </Link>

            <p className="mt-2 text-center text-xs text-slate-500">One-time payment · Instant download · No subscription</p>
          </div>
        </article>
      ))}
    </div>
  );
}
