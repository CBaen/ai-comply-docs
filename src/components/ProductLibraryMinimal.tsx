/**
 * DESIGN 8 — MINIMAL CONVERSION MACHINE
 *
 * Philosophy: Every element earns its place or gets cut.
 * The space between a visitor and a purchase is friction.
 * This design removes friction.
 *
 * Key decisions:
 * - Default card view: name + one line + price + Buy button. Done.
 * - Progressive disclosure: expand reveals docs, applicability, penalty.
 * - Filters hidden in a single compact dropdown, not a tab bar.
 * - Buy button ON the card. "See Details" sends people away — this doesn't.
 * - 2-col grid on desktop (not 3) — wider = premium, less catalog anxiety.
 * - Urgency is earned: "In Effect" cards get a left-border accent, nothing more.
 * - Hero kept, tightened.
 *
 * Architecture: Server page (page.tsx shape) + ProductLibraryMinimal client component.
 * Pattern matches existing app structure.
 */

// ─────────────────────────────────────────────────────────────────
// FILE 1 of 2: This would be src/app/products/page.tsx
// ─────────────────────────────────────────────────────────────────
//
// import type { Metadata } from "next";
// import Nav from "@/components/Nav";
// import Footer from "@/components/Footer";
// import { regulations } from "@/data/regulations";
// import ProductLibraryMinimal from "@/components/ProductLibraryMinimal";
//
// export const metadata: Metadata = { ...same as current... };
//
// export default function RegulationsIndexPage() {
//   return (
//     <>
//       <Nav />
//       <main id="main-content">
//         <header className="relative overflow-hidden bg-slate-950 text-white py-16 md:py-24">
//           <div className="absolute inset-0">
//             <img
//               src="/images/landing/professional-reviewing-documents.png"
//               alt=""
//               className="w-full h-full object-cover opacity-20"
//             />
//             <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 to-slate-950" />
//           </div>
//           <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
//             <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-4">
//               {regulations.filter(r => r.ready).length} packages available
//             </p>
//             <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-none mb-5">
//               AI Compliance<br />Templates
//             </h1>
//             <p className="text-slate-400 text-lg max-w-xl mx-auto">
//               Built against enacted statute text. Instant download.
//               A fraction of legal fees.
//             </p>
//           </div>
//         </header>
//         <section className="bg-white py-12 md:py-20">
//           <div className="max-w-4xl mx-auto px-6">
//             <ProductLibraryMinimal regulations={regulations.filter(r => r.ready)} />
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </>
//   );
// }

// ─────────────────────────────────────────────────────────────────
// FILE 2 of 2: src/components/ProductLibraryMinimal.tsx
// This is the full client component.
// ─────────────────────────────────────────────────────────────────

"use client";

import { useState, useId } from "react";
import Link from "next/link";
import type { Regulation } from "@/data/regulations";

// ── Types ──────────────────────────────────────────────────────
type FilterKey = "all" | "in-effect" | "effective-soon" | "federal" | "industry";

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all",             label: "All packages"         },
  { key: "in-effect",      label: "In effect now"        },
  { key: "effective-soon", label: "Effective soon"       },
  { key: "federal",        label: "Federal & universal"  },
  { key: "industry",       label: "Industry-specific"    },
];

function applyFilter(regs: Regulation[], key: FilterKey): Regulation[] {
  switch (key) {
    case "in-effect":      return regs.filter(r => r.status === "in-effect");
    case "effective-soon": return regs.filter(r => r.status === "effective-soon");
    case "federal":        return regs.filter(r => r.tier === "federal" || r.tier === "universal");
    case "industry":       return regs.filter(r => r.tier === "industry" || r.tier === "international");
    default:               return regs;
  }
}

// ── Urgency strip at the top — only renders when there's something pressing ──
function UrgencyStrip({ regulations }: { regulations: Regulation[] }) {
  const urgent = regulations.filter(
    r => r.status === "in-effect" || r.status === "effective-soon"
  ).slice(0, 3);

  if (urgent.length === 0) return null;

  return (
    <div className="mb-10 flex flex-wrap gap-2 items-center">
      <span className="text-xs font-semibold text-red-700 uppercase tracking-wider shrink-0">
        Active enforcement:
      </span>
      {urgent.map(r => (
        <span
          key={r.slug}
          className="inline-flex items-center gap-1.5 text-xs font-medium bg-red-50 text-red-800 border border-red-200 rounded-full px-3 py-1"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" aria-hidden="true" />
          {r.shortName}
        </span>
      ))}
    </div>
  );
}

// ── The card — the whole design lives or dies here ──
function ProductCard({ reg }: { reg: Regulation }) {
  const detailsId = useId();

  // One sentence. The user will buy or not based on this line.
  const hook = reg.description.match(/^[^.!?]+[.!?]/)?.[0] ?? reg.description;

  const isUrgent = reg.status === "in-effect";
  const isSoon   = reg.status === "effective-soon";

  return (
    <article
      className={[
        "group relative bg-white rounded-xl border transition-all duration-200",
        isUrgent
          ? "border-l-4 border-l-red-500 border-t-gray-200 border-r-gray-200 border-b-gray-200 hover:border-l-red-600 hover:shadow-lg"
          : isSoon
          ? "border-l-4 border-l-amber-400 border-t-gray-200 border-r-gray-200 border-b-gray-200 hover:border-l-amber-500 hover:shadow-lg"
          : "border-gray-200 hover:border-gray-300 hover:shadow-md",
      ].join(" ")}
      aria-labelledby={`product-name-${reg.slug}`}
    >
      {/* ── Card body ─────────────────────────────────────────── */}
      <div className="p-6">

        {/* Top row: name + status pill */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <h2
            id={`product-name-${reg.slug}`}
            className="text-lg font-bold text-gray-900 leading-snug"
          >
            {reg.shortName}
          </h2>
          {isUrgent && (
            <span className="shrink-0 text-xs font-bold text-red-700 bg-red-50 border border-red-200 rounded px-2 py-0.5 uppercase tracking-wide">
              In Effect
            </span>
          )}
          {isSoon && (
            <span className="shrink-0 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 rounded px-2 py-0.5 uppercase tracking-wide">
              Effective Soon
            </span>
          )}
        </div>

        {/* The one line that has to do all the selling */}
        <p className="text-sm text-gray-500 leading-relaxed mb-5">
          {hook}
        </p>

        {/* Price row + buy button — THE CONVERSION MOMENT */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-extrabold text-gray-900 tabular-nums">
              ${reg.price}
            </span>
            <span className="text-xs text-gray-400 font-medium">one-time</span>
          </div>

          <Link
            href={`/products/${reg.slug}`}
            className={[
              "shrink-0 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-bold transition-all",
              isUrgent
                ? "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                : "bg-blue-700 text-white hover:bg-blue-800 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
            ].join(" ")}
          >
            Get Package
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        {/* Progressive disclosure toggle */}
        <button
          type="button"
          aria-expanded="false"
          aria-controls={detailsId}
          onClick={e => {
            const btn = e.currentTarget;
            const panel = document.getElementById(detailsId);
            if (!panel) return;
            const isOpen = btn.getAttribute("aria-expanded") === "true";
            btn.setAttribute("aria-expanded", String(!isOpen));
            panel.hidden = isOpen;
            btn.querySelector("span")!.textContent = isOpen ? "What's included" : "Show less";
            btn.querySelector("svg")!.style.transform = isOpen ? "" : "rotate(180deg)";
          }}
          className="mt-4 flex items-center gap-1 text-xs text-gray-400 hover:text-blue-600 transition-colors group/toggle w-full"
        >
          <svg
            className="w-3.5 h-3.5 transition-transform duration-200 shrink-0"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
          <span>What&apos;s included</span>
          <span className="ml-auto text-gray-300 group-hover/toggle:text-blue-400">
            {reg.documentCount} {reg.documentCount === 1 ? "document" : "documents"}
          </span>
        </button>
      </div>

      {/* ── Expanded detail panel — hidden by default ─────────── */}
      <div id={detailsId} hidden>
        <div className="px-6 pb-6 border-t border-gray-100 pt-5 space-y-5">

          {/* Document list */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Included documents
            </p>
            <ul className="space-y-1.5" role="list">
              {reg.documents.map((doc, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <svg className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
                  </svg>
                  {doc}
                </li>
              ))}
            </ul>
          </div>

          {/* Applies to */}
          {reg.appliesToBullets && reg.appliesToBullets.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                This applies to you if
              </p>
              <ul className="space-y-1.5" role="list">
                {reg.appliesToBullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <svg className="w-4 h-4 text-green-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Penalty — only if urgency exists */}
          {(isUrgent || isSoon) && (
            <div className="rounded-lg bg-red-50 border border-red-100 px-4 py-3">
              <p className="text-xs font-semibold text-red-800 mb-0.5">Maximum penalty</p>
              <p className="text-sm text-red-700 font-medium">{reg.maxPenalty}</p>
            </div>
          )}

          {/* Second buy button in the expanded state — re-reduces friction */}
          <Link
            href={`/products/${reg.slug}`}
            className="block w-full text-center bg-gray-900 text-white py-3 rounded-lg font-bold text-sm hover:bg-gray-800 transition-colors"
          >
            Get Package — ${reg.price}
          </Link>
        </div>
      </div>
    </article>
  );
}

// ── Main export ────────────────────────────────────────────────
export default function ProductLibraryMinimal({
  regulations,
}: {
  regulations: Regulation[];
}) {
  const [filter, setFilter]   = useState<FilterKey>("all");
  const [search, setSearch]   = useState("");
  const searchId              = useId();

  const searched = search.trim()
    ? regulations.filter(r => {
        const q = search.toLowerCase();
        return (
          r.shortName.toLowerCase().includes(q) ||
          r.state.toLowerCase().includes(q) ||
          r.name.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.keywords.some(k => k.toLowerCase().includes(q))
        );
      })
    : regulations;

  const filtered = applyFilter(searched, filter);

  return (
    <>
      <UrgencyStrip regulations={regulations} />

      {/* ── Controls row ──────────────────────────────────────── */}
      {/*
       * One search box. One filter dropdown. No tab bar eating vertical space.
       * On mobile they stack. On desktop they sit side by side.
       */}
      <div className="flex flex-col sm:flex-row gap-3 mb-10">
        <div className="relative flex-1">
          <label htmlFor={searchId} className="sr-only">
            Search packages
          </label>
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            id={searchId}
            type="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by state, law name, or topic…"
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
          />
        </div>

        <div className="relative sm:w-52">
          <label htmlFor="filter-select" className="sr-only">
            Filter packages
          </label>
          <select
            id="filter-select"
            value={filter}
            onChange={e => setFilter(e.target.value as FilterKey)}
            className="w-full appearance-none pl-4 pr-9 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition cursor-pointer"
          >
            {FILTERS.map(f => (
              <option key={f.key} value={f.key}>
                {f.label} {f.key !== "all" ? `(${applyFilter(searched, f.key).length})` : `(${searched.length})`}
              </option>
            ))}
          </select>
          <svg
            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* ── Product grid ──────────────────────────────────────── */}
      {/*
       * 2-column on desktop, not 3.
       * Wider cards = more room for the hook line to breathe.
       * Less visual noise = easier decision.
       */}
      {filtered.length > 0 ? (
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
          role="list"
          aria-label="Compliance packages"
        >
          {filtered.map(reg => (
            <div key={reg.slug} role="listitem">
              <ProductCard reg={reg} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg mb-2">No packages match.</p>
          <button
            onClick={() => { setSearch(""); setFilter("all"); }}
            className="text-sm text-blue-600 hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* ── Bottom assist strip — replaces the full CTA section ─ */}
      {/*
       * One quiet line. Not a banner. Not a section.
       * "Not sure which package you need? Email us."
       * That's it. The less we say here, the more the products speak.
       */}
      <div className="mt-16 pt-8 border-t border-gray-100 text-center">
        <p className="text-sm text-gray-400">
          Not sure which package applies to your business?{" "}
          <a
            href="mailto:info@aicompliancedocuments.com"
            className="text-blue-600 hover:underline font-medium"
          >
            Email us
          </a>
          {" "}and we&apos;ll help you identify what you need.
        </p>
      </div>
    </>
  );
}
