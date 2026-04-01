/**
 * DESIGN 7 — Bundle-First Strategy
 *
 * Core thesis: Bundles are the primary product. Individual state packages are
 * the fallback for buyers who already know exactly what they need. The page
 * earns more per order by making the math visible and the bundle the obvious
 * smart choice — not a upsell buried at the bottom.
 *
 * Page structure:
 * 1. Hero (preserved from original)
 * 2. Bundle showcase — full-width, prominent, savings math visible
 * 3. "Or shop by state" section — individual packages as secondary
 * 4. CTA strip
 *
 * Bundle savings math (verified from regulations.ts):
 *   Employer Bundle:  IL $299 + NYC $399 + CO $449 = $1,147 separately → $299 bundle = save $848
 *   Profiling Bundle: VA $249 + CT $249 + TX $249 + DE $249 + OR $249 + MN $349 = $1,594 (6 of 15+ states) → $399 bundle = save $1,195+
 */

import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { regulations } from "@/data/regulations";
import BundleShowcase from "@/components/design7/BundleShowcase";
import IndividualProducts from "@/components/design7/IndividualProducts";

export const metadata: Metadata = {
  title: "AI Compliance Templates — All Products",
  description:
    "Browse all AI compliance templates for US state and federal AI regulations. State-specific packages for Illinois, Colorado, Texas, California, New York, and more. Instant download.",
  keywords: [
    "ai compliance templates",
    "ai regulation compliance",
    "state ai law compliance",
    "illinois hb3773 template",
    "colorado sb24-205 template",
    "texas traiga compliance",
    "california ccpa admt",
    "ai governance documents",
  ],
  alternates: {
    canonical: "https://aicompliancedocuments.com/products",
  },
  openGraph: {
    title: "AI Compliance Templates — All Products",
    description:
      "Browse all AI compliance templates for US state and federal regulations. Instant download, fraction of legal fees.",
    url: "https://aicompliancedocuments.com/products",
    type: "website",
  },
};

function ItemListSchema() {
  const ready = regulations.filter((r) => r.ready);
  const data = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "AI Compliance Document Packages",
    numberOfItems: ready.length,
    itemListElement: ready.map((r, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://aicompliancedocuments.com/products/${r.slug}`,
      name: r.shortName,
    })),
  });
  return <script type="application/ld+json">{data}</script>;
}

export default function RegulationsIndexPage() {
  const readyProducts = regulations.filter((r) => r.ready);

  return (
    <>
      <ItemListSchema />
      <Nav />
      <main id="main-content">
        {/* ── Hero (preserved) ─────────────────────────────────────────── */}
        <header className="hero-bg text-white py-12 md:py-20 relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/images/landing/product-tablet-desk.png"
              alt=""
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/90 to-slate-900" />
          </div>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="inline-flex items-center gap-2 border border-blue-400/40 px-3 sm:px-4 py-1.5 mb-4 sm:mb-5 text-xs sm:text-sm rounded text-blue-200">
              <span className="inline-block w-1.5 h-1.5 bg-blue-400 rounded-sm" />
              {readyProducts.length} compliance packages available
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white mb-3 sm:mb-4 leading-tight tracking-tight">
              AI Compliance Templates
            </h1>
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              State-specific and universal AI compliance packages. Each built
              against the actual enacted statute text. Instant download, fraction
              of legal fees.
            </p>
          </div>
        </header>

        {/* ── Bundle Showcase ───────────────────────────────────────────── */}
        <section
          aria-labelledby="bundles-heading"
          className="py-12 sm:py-16 bg-slate-900"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            {/* Section header */}
            <div className="mb-8 sm:mb-10">
              <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 px-3 py-1 rounded text-blue-300 text-xs font-semibold uppercase tracking-wide mb-3">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Best value
              </div>
              <h2
                id="bundles-heading"
                className="text-2xl sm:text-3xl font-extrabold font-display text-white"
              >
                Multi-State Bundles
              </h2>
              <p className="text-slate-400 text-sm sm:text-base mt-1 max-w-xl">
                Most businesses operate across state lines. Bundles cover every
                jurisdiction you need — at a fraction of buying each separately.
              </p>
            </div>

            <BundleShowcase />
          </div>
        </section>

        {/* ── Bridge / transition ───────────────────────────────────────── */}
        <div className="bg-slate-800 border-y border-slate-700">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p className="text-slate-300 text-sm">
              <span className="font-semibold text-white">Only need one state?</span>{" "}
              Browse individual packages below, or{" "}
              <a
                href="mailto:info@aicompliancedocuments.com"
                className="text-blue-400 hover:underline"
              >
                email us
              </a>{" "}
              and we&apos;ll point you to exactly what applies.
            </p>
            <a
              href="#individual-packages"
              className="shrink-0 text-xs text-slate-400 hover:text-white flex items-center gap-1 transition"
            >
              Skip to individual packages
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* ── Individual Products ───────────────────────────────────────── */}
        <section
          id="individual-packages"
          aria-labelledby="individual-heading"
          className="py-10 sm:py-16 bg-slate-50"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="mb-6 sm:mb-8">
              <h2
                id="individual-heading"
                className="text-xl sm:text-2xl font-bold font-display text-gray-900"
              >
                Individual State &amp; Federal Packages
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Already know which law applies? Go straight to the package you
                need.
              </p>
            </div>
            <IndividualProducts regulations={readyProducts} />
          </div>
        </section>

        {/* ── CTA strip ─────────────────────────────────────────────────── */}
        <section className="py-10 sm:py-14 bg-slate-900">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-display text-white mb-3">
              Not sure which package you need?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mb-6">
              Email us and we&apos;ll help you identify which regulations apply
              to your business.
            </p>
            <a
              href="mailto:info@aicompliancedocuments.com"
              className="inline-flex items-center gap-2 bg-blue-700 text-white px-6 sm:px-7 py-3 sm:py-3.5 rounded-lg font-bold text-sm sm:text-base hover:bg-blue-800 transition"
            >
              Contact Us
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CLIENT COMPONENT: BundleShowcase
// File: src/components/design7/BundleShowcase.tsx
// ─────────────────────────────────────────────────────────────────────────────
//
// "use client";
//
// import Link from "next/link";
//
// interface BundleDef {
//   slug: string;
//   name: string;
//   tagline: string;
//   image: string;
//   imageAlt: string;
//   bundlePrice: number;
//   individualItems: { name: string; price: number; state: string }[];
//   documents: number;
//   jurisdictions: string[];
//   highlights: string[];
//   status: "in-effect" | "effective-soon";
//   ctaLabel: string;
// }
//
// const BUNDLES: BundleDef[] = [
//   {
//     slug: "multi-state-employer-ai-disclosure",
//     name: "Employer AI Disclosure Kit",
//     tagline: "Hiring AI compliance for IL, NYC, and CO — all three in one.",
//     image: "/images/landing/team-compliance-meeting.png",
//     imageAlt: "Team reviewing AI compliance documents",
//     bundlePrice: 299,
//     individualItems: [
//       { name: "Illinois HB3773", price: 299, state: "Illinois" },
//       { name: "NYC Local Law 144", price: 399, state: "New York City" },
//       { name: "Colorado SB 24-205", price: 449, state: "Colorado" },
//     ],
//     documents: 5,
//     jurisdictions: ["Illinois", "New York City", "Colorado"],
//     highlights: [
//       "Unified notice covers all 3 jurisdictions",
//       "Built for employers — not just privacy teams",
//       "Covers hiring, promotion, and AI evaluation tools",
//     ],
//     status: "in-effect",
//     ctaLabel: "Get the Employer Bundle",
//   },
//   {
//     slug: "multi-state-profiling-assessment",
//     name: "Multi-State Profiling Bundle",
//     tagline: "One assessment framework for 15+ state privacy laws.",
//     image: "/images/landing/professional-reviewing-documents.png",
//     imageAlt: "Professional reviewing multi-state compliance documents",
//     bundlePrice: 399,
//     individualItems: [
//       { name: "Virginia CDPA", price: 249, state: "Virginia" },
//       { name: "Connecticut CTDPA", price: 249, state: "Connecticut" },
//       { name: "Texas TDPSA", price: 249, state: "Texas" },
//       { name: "Oregon CPA", price: 249, state: "Oregon" },
//       { name: "Minnesota MCDPA", price: 349, state: "Minnesota" },
//       { name: "+ 10 more states", price: 0, state: "" },
//     ],
//     documents: 5,
//     jurisdictions: ["VA", "CT", "TX", "OR", "MN", "DE", "+ 10 more"],
//     highlights: [
//       "Covers 15+ states with one framework",
//       "State Comparison Matrix included",
//       "Threshold analysis so you know what applies",
//     ],
//     status: "in-effect",
//     ctaLabel: "Get the Profiling Bundle",
//   },
// ];
//
// function SavingsCalculator({
//   items,
//   bundlePrice,
// }: {
//   items: BundleDef["individualItems"];
//   bundlePrice: number;
// }) {
//   const pricedItems = items.filter((i) => i.price > 0);
//   const individualTotal = pricedItems.reduce((sum, i) => sum + i.price, 0);
//   const savings = individualTotal - bundlePrice;
//   const hasMore = items.some((i) => i.price === 0);
//
//   return (
//     <div className="bg-slate-800/60 rounded-xl border border-slate-700 p-4 space-y-2">
//       <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">
//         What you'd pay separately
//       </p>
//       {pricedItems.map((item) => (
//         <div key={item.name} className="flex justify-between items-center text-sm">
//           <span className="text-slate-300">{item.name}</span>
//           <span className="text-slate-400 font-mono">${item.price}</span>
//         </div>
//       ))}
//       {hasMore && (
//         <div className="flex justify-between items-center text-sm">
//           <span className="text-slate-400 italic">+ additional states</span>
//           <span className="text-slate-500 font-mono">$$$</span>
//         </div>
//       )}
//       <div className="border-t border-slate-600 pt-2 mt-2 flex justify-between items-center text-sm">
//         <span className="text-slate-400">Individual total ({pricedItems.length}{hasMore ? "+" : ""} items)</span>
//         <span className="text-slate-300 font-mono line-through">${individualTotal}{hasMore ? "+" : ""}</span>
//       </div>
//       <div className="flex justify-between items-center">
//         <span className="text-white font-bold text-base">Bundle price</span>
//         <span className="text-2xl font-extrabold text-white font-display">${bundlePrice}</span>
//       </div>
//       <div className="bg-green-500/15 border border-green-500/30 rounded-lg px-3 py-2 flex justify-between items-center">
//         <span className="text-green-300 font-semibold text-sm">You save</span>
//         <span className="text-green-300 font-extrabold text-lg font-display">
//           ${savings}{hasMore ? "+" : ""}
//         </span>
//       </div>
//     </div>
//   );
// }
//
// export default function BundleShowcase() {
//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
//       {BUNDLES.map((bundle) => (
//         <article
//           key={bundle.slug}
//           className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden flex flex-col hover:border-blue-500/60 transition-colors group"
//         >
//           {/* Image banner */}
//           <div className="relative h-40 sm:h-48 overflow-hidden">
//             <img
//               src={bundle.image}
//               alt={bundle.imageAlt}
//               className="w-full h-full object-cover opacity-60 group-hover:opacity-70 transition-opacity"
//             />
//             <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/40 to-slate-800" />
//             {/* Status badge */}
//             <div className="absolute top-3 left-3">
//               <span className="inline-flex items-center gap-1.5 bg-red-500/90 text-white text-xs font-bold px-2.5 py-1 rounded">
//                 <span className="inline-block w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
//                 IN EFFECT
//               </span>
//             </div>
//             {/* Jurisdictions pill list */}
//             <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
//               {bundle.jurisdictions.map((j) => (
//                 <span
//                   key={j}
//                   className="bg-slate-900/80 text-slate-200 text-xs px-2 py-0.5 rounded font-medium"
//                 >
//                   {j}
//                 </span>
//               ))}
//             </div>
//           </div>
//
//           <div className="p-5 sm:p-6 flex flex-col flex-1">
//             {/* Name + tagline */}
//             <h3 className="text-lg sm:text-xl font-extrabold font-display text-white leading-snug mb-1">
//               {bundle.name}
//             </h3>
//             <p className="text-slate-400 text-sm mb-5">{bundle.tagline}</p>
//
//             {/* Highlights */}
//             <ul className="space-y-2 mb-6" aria-label="What's included">
//               {bundle.highlights.map((h) => (
//                 <li key={h} className="flex items-start gap-2 text-sm text-slate-300">
//                   <svg
//                     className="w-4 h-4 text-blue-400 mt-0.5 shrink-0"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                     strokeWidth={2.5}
//                     aria-hidden="true"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
//                   </svg>
//                   {h}
//                 </li>
//               ))}
//               <li className="flex items-start gap-2 text-sm text-slate-300">
//                 <svg
//                   className="w-4 h-4 text-blue-400 mt-0.5 shrink-0"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   strokeWidth={2.5}
//                   aria-hidden="true"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
//                 </svg>
//                 {bundle.documents} documents — instant download
//               </li>
//             </ul>
//
//             {/* Savings calculator */}
//             <SavingsCalculator
//               items={bundle.individualItems}
//               bundlePrice={bundle.bundlePrice}
//             />
//
//             {/* CTA */}
//             <Link
//               href={`/products/${bundle.slug}`}
//               className="mt-5 block text-center bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm sm:text-base py-3.5 rounded-xl transition-colors"
//             >
//               {bundle.ctaLabel} →
//             </Link>
//
//             <p className="mt-2 text-center text-xs text-slate-500">
//               One-time payment · Instant download · No subscription
//             </p>
//           </div>
//         </article>
//       ))}
//     </div>
//   );
// }

// ─────────────────────────────────────────────────────────────────────────────
// CLIENT COMPONENT: IndividualProducts
// File: src/components/design7/IndividualProducts.tsx
// ─────────────────────────────────────────────────────────────────────────────
//
// "use client";
//
// import { useState } from "react";
// import Link from "next/link";
// import type { Regulation } from "@/data/regulations";
//
// // Filter out the bundles — they live in the showcase above
// const BUNDLE_SLUGS = new Set([
//   "multi-state-profiling-assessment",
//   "multi-state-employer-ai-disclosure",
// ]);
//
// type FilterKey = "all" | "in-effect" | "effective-soon" | "federal" | "industry";
//
// const FILTERS: { key: FilterKey; label: string }[] = [
//   { key: "all", label: "All" },
//   { key: "in-effect", label: "In Effect Now" },
//   { key: "effective-soon", label: "Effective Soon" },
//   { key: "federal", label: "Federal & Universal" },
//   { key: "industry", label: "Industry-Specific" },
// ];
//
// function filterRegs(regs: Regulation[], filter: FilterKey): Regulation[] {
//   switch (filter) {
//     case "in-effect": return regs.filter((r) => r.status === "in-effect");
//     case "effective-soon": return regs.filter((r) => r.status === "effective-soon");
//     case "federal": return regs.filter((r) => r.tier === "federal" || r.tier === "universal");
//     case "industry": return regs.filter((r) => r.tier === "industry" || r.tier === "international");
//     default: return regs;
//   }
// }
//
// function StatusBadge({ status }: { status: string }) {
//   const styles: Record<string, string> = {
//     "in-effect": "bg-red-100 text-red-800",
//     "effective-soon": "bg-amber-100 text-amber-800",
//     proposed: "bg-slate-100 text-slate-600",
//   };
//   const labels: Record<string, string> = {
//     "in-effect": "IN EFFECT",
//     "effective-soon": "EFFECTIVE SOON",
//     proposed: "PROPOSED",
//   };
//   const dotColors: Record<string, string> = {
//     "in-effect": "bg-red-500",
//     "effective-soon": "bg-amber-500",
//     proposed: "bg-slate-400",
//   };
//   return (
//     <span className={`inline-flex items-center gap-1.5 text-xs px-2 py-0.5 rounded font-semibold shrink-0 ${styles[status] || styles.proposed}`}>
//       <span className={`inline-block w-1.5 h-1.5 rounded-sm ${dotColors[status] || dotColors.proposed}`} aria-hidden="true" />
//       {labels[status] || "PROPOSED"}
//     </span>
//   );
// }
//
// export default function IndividualProducts({
//   regulations,
// }: {
//   regulations: Regulation[];
// }) {
//   const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
//   const [searchTerm, setSearchTerm] = useState("");
//
//   // Exclude bundles from this section
//   const nonBundleRegs = regulations.filter((r) => !BUNDLE_SLUGS.has(r.slug));
//
//   const searchFiltered = searchTerm.trim()
//     ? nonBundleRegs.filter((r) => {
//         const q = searchTerm.toLowerCase();
//         return (
//           r.shortName.toLowerCase().includes(q) ||
//           r.state.toLowerCase().includes(q) ||
//           r.name.toLowerCase().includes(q) ||
//           r.description.toLowerCase().includes(q) ||
//           r.keywords.some((k) => k.toLowerCase().includes(q))
//         );
//       })
//     : nonBundleRegs;
//
//   const filtered = filterRegs(searchFiltered, activeFilter);
//
//   const counts: Record<FilterKey, number> = {
//     all: searchFiltered.length,
//     "in-effect": searchFiltered.filter((r) => r.status === "in-effect").length,
//     "effective-soon": searchFiltered.filter((r) => r.status === "effective-soon").length,
//     federal: searchFiltered.filter((r) => r.tier === "federal" || r.tier === "universal").length,
//     industry: searchFiltered.filter((r) => r.tier === "industry" || r.tier === "international").length,
//   };
//
//   return (
//     <>
//       {/* Search */}
//       <div className="mb-4">
//         <input
//           type="search"
//           aria-label="Search individual products"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           placeholder="Search by state, law, or topic..."
//           className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition"
//         />
//       </div>
//
//       {/* Filter tabs */}
//       <div className="flex overflow-x-auto gap-2 mb-6 pb-1 -mx-1 px-1 scrollbar-none">
//         {FILTERS.map((f) => (
//           <button
//             key={f.key}
//             aria-pressed={activeFilter === f.key}
//             onClick={() => setActiveFilter(f.key)}
//             className={`shrink-0 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${
//               activeFilter === f.key
//                 ? "bg-blue-800 text-white shadow-sm"
//                 : "bg-white border border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-700"
//             }`}
//           >
//             {f.label}
//             <span className={`ml-1.5 text-xs ${activeFilter === f.key ? "text-blue-200" : "text-gray-400"}`}>
//               {counts[f.key]}
//             </span>
//           </button>
//         ))}
//       </div>
//
//       {/* Product grid — compact variant since bundles are the hero */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         {filtered.map((reg) => {
//           const firstSentence = reg.description.match(/^[^.!?]+[.!?]/)?.[0] ?? reg.description;
//           return (
//             <div
//               key={reg.slug}
//               className="bg-white rounded-lg border border-gray-200 p-4 hover:border-blue-600 hover:shadow-sm transition flex flex-col"
//             >
//               {/* Header */}
//               <div className="flex justify-between items-start gap-2 mb-1">
//                 <h3 className="font-bold text-base font-display text-gray-900 leading-snug">
//                   {reg.shortName}
//                 </h3>
//                 <StatusBadge status={reg.status} />
//               </div>
//               <p className="text-xs text-gray-500 mb-3">
//                 {reg.status === "in-effect" ? "In effect" : "Effective"} {reg.effectiveDate} · {reg.state}
//               </p>
//               <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-4">
//                 {firstSentence}
//               </p>
//               {/* Price row */}
//               <div className="flex items-end justify-between mb-3 pt-3 border-t border-gray-100">
//                 <div>
//                   <span className="text-2xl font-extrabold text-gray-900 font-display leading-none">
//                     ${reg.price}
//                   </span>
//                   <span className="text-gray-500 text-xs ml-1">one-time</span>
//                 </div>
//                 <span className="text-gray-400 text-xs">{reg.documentCount} docs</span>
//               </div>
//               {/* CTA — secondary style to reinforce bundle preference */}
//               <Link
//                 href={`/products/${reg.slug}`}
//                 className="block text-center border border-blue-700 text-blue-700 py-2.5 rounded-lg font-semibold text-sm hover:bg-blue-50 transition"
//               >
//                 See Details
//               </Link>
//             </div>
//           );
//         })}
//       </div>
//
//       {filtered.length === 0 && (
//         <p className="text-center text-gray-600 py-12">
//           {searchTerm.trim()
//             ? `No products match "${searchTerm}".`
//             : "No products match this filter."}
//         </p>
//       )}
//     </>
//   );
// }
