/**
 * DESIGN 5 — State Map Visual
 *
 * Direction: Lead with jurisdictional scope. The hero becomes a coverage dashboard.
 * Before users scroll to products, they see a grid of jurisdiction cards — state
 * photos, status badges, and law names — so "15+ jurisdictions" lands as a visual
 * fact, not just marketing copy. Scrolling reveals a filtered product library
 * organized by that same geography.
 *
 * Key decisions:
 * - Hero shrinks to a slim identity bar; the coverage grid IS the above-fold story
 * - Jurisdiction cards use the existing state skyline photos where available, with
 *   a CSS gradient fallback for states that don't have a photo
 * - Status pills (IN EFFECT / EFFECTIVE SOON) appear on the cards so urgency is
 *   visible before the product library even loads
 * - "Jump to state" interaction: clicking a jurisdiction card scrolls to that
 *   state's products and highlights them
 * - Three-tier layout: Federal/Universal, US States, International — mirrors how
 *   compliance counsel actually thinks about the problem
 * - Product cards gain a jurisdiction color accent that matches their state card
 */

// ─────────────────────────────────────────────────────────────────────────────
// FILE: src/app/products/page.tsx  (server component — keep metadata and schema)
// ─────────────────────────────────────────────────────────────────────────────
/*
import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CoverageMap from "@/components/CoverageMap";          // NEW client component
import ProductLibraryV2 from "@/components/ProductLibraryV2"; // replaces ProductLibrary
import { regulations } from "@/data/regulations";

export const metadata: Metadata = {
  title: "AI Compliance Templates — All Products",
  description:
    "Browse all AI compliance templates for US state and federal AI regulations. State-specific packages for Illinois, Colorado, Texas, California, New York, and more. Instant download.",
  // ... (unchanged from current)
};

// ItemListSchema stays the same
function ItemListSchema() { ... }

export default function RegulationsIndexPage() {
  return (
    <>
      <ItemListSchema />
      <Nav />
      <main id="main-content">
        <CoverageHero regulations={regulations.filter(r => r.ready)} />
        <ProductLibraryV2 regulations={regulations.filter(r => r.ready)} />
        <CtaStrip />
      </main>
      <Footer />
    </>
  );
}
*/

// ─────────────────────────────────────────────────────────────────────────────
// FILE: src/components/CoverageMap.tsx  (the new client component — full implementation)
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import type { Regulation } from "@/data/regulations";

// ── Jurisdiction metadata ─────────────────────────────────────────────────────
// Maps state names to display config. Photo paths reference existing /images/landing/ assets.

type JurisdictionMeta = {
  photo?: string;           // path under /images/landing/
  abbr: string;             // 2-char abbreviation shown on card
  accentColor: string;      // Tailwind bg class for colored left border on product cards
  region: "state" | "federal" | "international";
};

const JURISDICTION_META: Record<string, JurisdictionMeta> = {
  "New York City":     { photo: "nyc-manhattan-skyline.png",     abbr: "NYC", accentColor: "border-blue-600",    region: "state" },
  "Texas":             { photo: undefined,                        abbr: "TX",  accentColor: "border-orange-500",  region: "state" },
  "Delaware":          { photo: undefined,                        abbr: "DE",  accentColor: "border-teal-600",    region: "state" },
  "Virginia":          { photo: undefined,                        abbr: "VA",  accentColor: "border-red-700",     region: "state" },
  "Connecticut":       { photo: undefined,                        abbr: "CT",  accentColor: "border-sky-600",     region: "state" },
  "Oregon":            { photo: undefined,                        abbr: "OR",  accentColor: "border-green-600",   region: "state" },
  "Minnesota":         { photo: undefined,                        abbr: "MN",  accentColor: "border-indigo-600",  region: "state" },
  "Illinois":          { photo: "illinois-chicago-skyline.png",   abbr: "IL",  accentColor: "border-blue-800",    region: "state" },
  "California":        { photo: "california-golden-gate.png",     abbr: "CA",  accentColor: "border-yellow-500",  region: "state" },
  "Colorado":          { photo: "colorado-denver-skyline.png",    abbr: "CO",  accentColor: "border-purple-600",  region: "state" },
  "Federal":           { photo: undefined,                        abbr: "US",  accentColor: "border-slate-700",   region: "federal" },
  "Universal":         { photo: undefined,                        abbr: "ALL", accentColor: "border-slate-500",   region: "federal" },
  "Multi-State":       { photo: undefined,                        abbr: "MS",  accentColor: "border-cyan-600",    region: "federal" },
  "Multi-Jurisdiction":{ photo: undefined,                        abbr: "MJ",  accentColor: "border-cyan-700",    region: "federal" },
  "European Union":    { photo: undefined,                        abbr: "EU",  accentColor: "border-blue-500",    region: "international" },
};

// Gradient fallbacks when no photo is available — one per state for visual variety
const GRADIENT_FALLBACKS: Record<string, string> = {
  "Texas":              "from-orange-900 to-orange-700",
  "Delaware":           "from-teal-900 to-teal-700",
  "Virginia":           "from-red-900 to-red-700",
  "Connecticut":        "from-sky-900 to-sky-700",
  "Oregon":             "from-green-900 to-green-700",
  "Minnesota":          "from-indigo-900 to-indigo-700",
  "Federal":            "from-slate-800 to-slate-600",
  "Universal":          "from-slate-700 to-slate-500",
  "Multi-State":        "from-cyan-900 to-cyan-700",
  "Multi-Jurisdiction": "from-cyan-900 to-teal-700",
  "European Union":     "from-blue-900 to-blue-600",
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function getUniqueJurisdictions(regulations: Regulation[]) {
  const seen = new Set<string>();
  return regulations.filter((r) => {
    if (seen.has(r.state)) return false;
    seen.add(r.state);
    return true;
  });
}

function getStatusForJurisdiction(regs: Regulation[], state: string) {
  const stateRegs = regs.filter((r) => r.state === state);
  if (stateRegs.some((r) => r.status === "in-effect")) return "in-effect";
  if (stateRegs.some((r) => r.status === "effective-soon")) return "effective-soon";
  return "proposed";
}

function getLawNamesForJurisdiction(regs: Regulation[], state: string): string[] {
  return regs
    .filter((r) => r.state === state)
    .map((r) => r.shortName)
    .slice(0, 2); // show at most 2 law names on the card
}

function slugify(state: string) {
  return state.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

// ── Sub-components ────────────────────────────────────────────────────────────

function StatusPill({ status }: { status: string }) {
  if (status === "in-effect") {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-500/90 text-white uppercase tracking-wide leading-none">
        <span className="w-1 h-1 rounded-full bg-white animate-pulse" aria-hidden="true" />
        In Effect
      </span>
    );
  }
  if (status === "effective-soon") {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-400/90 text-amber-900 uppercase tracking-wide leading-none">
        <span className="w-1 h-1 rounded-full bg-amber-800" aria-hidden="true" />
        Soon
      </span>
    );
  }
  return null;
}

function JurisdictionCard({
  state,
  regulations,
  isActive,
  onClick,
}: {
  state: string;
  regulations: Regulation[];
  isActive: boolean;
  onClick: () => void;
}) {
  const meta = JURISDICTION_META[state] ?? { abbr: state.slice(0, 3).toUpperCase(), accentColor: "border-slate-500", region: "state" };
  const status = getStatusForJurisdiction(regulations, state);
  const lawNames = getLawNamesForJurisdiction(regulations, state);
  const productCount = regulations.filter((r) => r.state === state).length;
  const gradient = GRADIENT_FALLBACKS[state] ?? "from-slate-900 to-slate-700";

  return (
    <button
      onClick={onClick}
      aria-pressed={isActive}
      aria-label={`Filter by ${state} — ${productCount} product${productCount !== 1 ? "s" : ""}`}
      className={`
        group relative overflow-hidden rounded-xl text-left transition-all duration-200
        focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
        ${isActive
          ? "ring-2 ring-blue-500 shadow-lg shadow-blue-500/20 scale-[1.03]"
          : "hover:scale-[1.02] hover:shadow-md"
        }
      `}
    >
      {/* Background — photo or gradient */}
      <div className="relative h-24 sm:h-28">
        {meta.photo ? (
          <>
            <img
              src={`/images/landing/${meta.photo}`}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/60 to-slate-900/20" />
          </>
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
        )}

        {/* Status pill — top right */}
        <div className="absolute top-2 right-2">
          <StatusPill status={status} />
        </div>

        {/* State abbreviation — large, bottom left */}
        <div className="absolute bottom-0 left-0 right-0 px-3 pb-2">
          <div className="flex items-end justify-between">
            <span className="text-2xl font-extrabold text-white font-display leading-none drop-shadow">
              {meta.abbr}
            </span>
            <span className="text-[10px] text-white/70 font-medium leading-none mb-0.5">
              {productCount} {productCount === 1 ? "package" : "packages"}
            </span>
          </div>
        </div>
      </div>

      {/* Footer — state name + law names */}
      <div className={`
        bg-white border-x border-b rounded-b-xl px-3 py-2
        ${isActive ? "border-blue-400" : "border-gray-200 group-hover:border-blue-200"}
        transition-colors
      `}>
        <p className="text-xs font-bold text-gray-900 leading-snug truncate">{state}</p>
        {lawNames.map((name) => (
          <p key={name} className="text-[10px] text-gray-500 truncate leading-tight mt-0.5">
            {name}
          </p>
        ))}
      </div>
    </button>
  );
}

// ── Stats bar ─────────────────────────────────────────────────────────────────

function CoverageStats({ regulations }: { regulations: Regulation[] }) {
  const jurisdictionCount = new Set(regulations.map((r) => r.state)).size;
  const inEffectCount = regulations.filter((r) => r.status === "in-effect").length;
  const stateCount = regulations.filter((r) => r.tier === "state").length;

  const stats = [
    { value: regulations.length.toString(), label: "Compliance Packages" },
    { value: `${jurisdictionCount}+`, label: "Jurisdictions Covered" },
    { value: `${inEffectCount}`, label: "Laws In Effect Now" },
    { value: `${stateCount}`, label: "State-Specific Products" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 border-t border-b border-slate-700/50 mb-0">
      {stats.map((s, i) => (
        <div
          key={s.label}
          className={`
            py-5 px-4 text-center
            ${i < stats.length - 1 ? "border-r border-slate-700/40" : ""}
          `}
        >
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-display leading-none mb-1">
            {s.value}
          </div>
          <div className="text-xs text-slate-400 font-medium leading-tight">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

// ── Coverage grid ─────────────────────────────────────────────────────────────

type RegionKey = "state" | "federal" | "international";

const REGION_LABELS: Record<RegionKey, string> = {
  state: "US States & Cities",
  federal: "Federal & Universal",
  international: "International",
};

function CoverageGrid({
  regulations,
  activeState,
  onStateClick,
}: {
  regulations: Regulation[];
  activeState: string | null;
  onStateClick: (state: string | null) => void;
}) {
  const uniqueJurisdictions = getUniqueJurisdictions(regulations);

  const byRegion: Record<RegionKey, string[]> = {
    state: [],
    federal: [],
    international: [],
  };

  uniqueJurisdictions.forEach((r) => {
    const meta = JURISDICTION_META[r.state];
    const region: RegionKey = meta?.region ?? "state";
    if (!byRegion[region].includes(r.state)) {
      byRegion[region].push(r.state);
    }
  });

  return (
    <div className="space-y-6">
      {(["state", "federal", "international"] as RegionKey[]).map((region) => {
        const states = byRegion[region];
        if (states.length === 0) return null;
        return (
          <div key={region}>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">
              {REGION_LABELS[region]}
            </h3>
            <div
              className={`
                grid gap-3
                ${region === "state"
                  ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
                  : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
                }
              `}
            >
              {states.map((state) => (
                <JurisdictionCard
                  key={state}
                  state={state}
                  regulations={regulations}
                  isActive={activeState === state}
                  onClick={() => onStateClick(activeState === state ? null : state)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Product card (with jurisdiction accent) ───────────────────────────────────

function ProductCard({
  reg,
  highlightState,
}: {
  reg: Regulation;
  highlightState: string | null;
}) {
  const meta = JURISDICTION_META[reg.state];
  const accentColor = meta?.accentColor ?? "border-slate-300";
  const isHighlighted = highlightState === null || highlightState === reg.state;
  const firstSentence = reg.description.match(/^[^.!?]+[.!?]/)?.[0] ?? reg.description;

  const statusStyles: Record<string, string> = {
    "in-effect": "bg-red-100 text-red-800",
    "effective-soon": "bg-amber-100 text-amber-800",
    proposed: "bg-slate-100 text-slate-600",
  };
  const statusLabels: Record<string, string> = {
    "in-effect": "IN EFFECT",
    "effective-soon": "EFFECTIVE SOON",
    proposed: "PROPOSED",
  };

  return (
    <div
      className={`
        bg-white rounded-lg border border-gray-200 p-4 sm:p-5 flex flex-col
        border-l-[3px] ${accentColor}
        transition-all duration-200
        ${isHighlighted
          ? "hover:border-blue-700 hover:shadow-md opacity-100"
          : "opacity-40 pointer-events-none"
        }
      `}
    >
      {/* Name + badge */}
      <div className="flex justify-between items-start gap-2 mb-1">
        <h3 className="font-bold text-sm sm:text-base font-display text-gray-900 leading-snug">
          {reg.shortName}
        </h3>
        <span
          className={`shrink-0 inline-flex items-center gap-1.5 text-[10px] sm:text-xs px-2 py-0.5 rounded font-bold
            ${statusStyles[reg.status] ?? statusStyles.proposed}`}
        >
          <span
            aria-hidden="true"
            className={`inline-block w-1.5 h-1.5 rounded-sm
              ${reg.status === "in-effect" ? "bg-red-500"
                : reg.status === "effective-soon" ? "bg-amber-500"
                : "bg-slate-400"}`}
          />
          {statusLabels[reg.status] ?? "PROPOSED"}
        </span>
      </div>

      {/* Date + state */}
      <p className="text-[11px] text-gray-500 mb-3">
        {reg.status === "in-effect" ? "In effect" : "Effective"} {reg.effectiveDate}
        {" · "}
        <span className="font-medium text-gray-700">{reg.state}</span>
      </p>

      {/* Description */}
      <p className="text-gray-600 text-xs sm:text-sm mb-4 leading-relaxed flex-1">
        {firstSentence}
      </p>

      {/* Price + doc count */}
      <div className="flex items-end justify-between mb-3 pt-3 border-t border-gray-100">
        <div>
          <span className="text-xl sm:text-2xl font-extrabold text-gray-900 font-display leading-none">
            ${reg.price}
          </span>
          <span className="text-gray-500 text-xs ml-1">one-time</span>
        </div>
        <span className="text-gray-500 text-xs">{reg.documentCount} documents</span>
      </div>

      {reg.ready ? (
        <Link
          href={`/products/${reg.slug}`}
          className="block text-center bg-blue-800 text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-blue-900 transition"
        >
          See Details
        </Link>
      ) : (
        <Link
          href={`/products/${reg.slug}`}
          className="block text-center bg-slate-50 border border-gray-200 text-gray-600 py-2.5 rounded-lg font-semibold text-sm hover:border-blue-300 hover:text-blue-700 transition"
        >
          Coming Soon — Learn More
        </Link>
      )}
    </div>
  );
}

// ── Deadline banner (unchanged logic, refreshed style) ────────────────────────

function DeadlineBanner({ regulations }: { regulations: Regulation[] }) {
  const urgent = regulations
    .filter(
      (r) =>
        r.status === "effective-soon" ||
        (r.status === "in-effect" && r.effectiveDate.includes("2026"))
    )
    .slice(0, 4);

  if (urgent.length === 0) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-8">
      <div className="flex items-center gap-2 mb-1">
        <svg className="w-4 h-4 text-red-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="font-bold text-red-900 text-sm font-display">
          These Laws Are In Effect Now — Penalties Are Live
        </h3>
      </div>
      <p className="text-[11px] text-red-600 mb-3">
        Last updated {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
      </p>
      <div className="grid sm:grid-cols-2 gap-2">
        {urgent.map((r) => {
          const effectiveParsed = new Date(r.effectiveDate);
          const isPast = !isNaN(effectiveParsed.getTime()) && effectiveParsed < new Date();
          return (
            <Link
              key={r.slug}
              href={`/products/${r.slug}`}
              className="flex items-center justify-between bg-white border border-red-100 rounded-lg px-3 py-2.5 hover:border-red-300 transition group gap-2"
            >
              <div className="min-w-0">
                <p className="font-semibold text-gray-900 text-xs group-hover:text-blue-700 transition truncate">
                  {r.shortName}
                </p>
                <p className="text-[10px] text-gray-500">{r.state}</p>
              </div>
              <p className="text-[10px] font-bold text-red-700 shrink-0 text-right leading-snug">
                {isPast ? "In effect since" : "Effective"}<br />
                {r.effectiveDate}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

// ── Main export: CoverageHero + integrated product library ────────────────────
// Split into two named exports so the page can use them separately if needed.

export function CoverageHero({
  regulations,
  activeState,
  onStateClick,
}: {
  regulations: Regulation[];
  activeState: string | null;
  onStateClick: (state: string | null) => void;
}) {
  return (
    <header className="bg-slate-900 text-white">
      {/* Slim identity bar with background photo */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/landing/product-tablet-desk.png"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 to-slate-900" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 relative z-10">
          <div className="inline-flex items-center gap-2 border border-blue-400/40 px-3 py-1.5 mb-4 text-xs rounded text-blue-200">
            <span className="inline-block w-1.5 h-1.5 bg-blue-400 rounded-sm" aria-hidden="true" />
            {regulations.filter((r) => r.ready).length} compliance packages available
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white mb-3 leading-tight tracking-tight">
            AI Compliance Templates
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            State-specific and universal AI compliance packages, each built against
            the enacted statute text. Select your jurisdiction below or browse all products.
          </p>
        </div>
      </div>

      {/* Stats bar */}
      <CoverageStats regulations={regulations} />

      {/* Coverage grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-bold text-slate-200 uppercase tracking-widest">
            Jurisdictions Covered
          </h2>
          {activeState && (
            <button
              onClick={() => onStateClick(null)}
              className="text-xs text-blue-400 hover:text-blue-300 transition font-medium flex items-center gap-1"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear filter
            </button>
          )}
        </div>
        <CoverageGrid
          regulations={regulations}
          activeState={activeState}
          onStateClick={onStateClick}
        />
        {activeState && (
          <p className="mt-5 text-sm text-blue-300 text-center">
            Showing packages for{" "}
            <strong className="text-white">{activeState}</strong> —{" "}
            <button onClick={() => onStateClick(null)} className="underline hover:no-underline">
              show all
            </button>
          </p>
        )}
      </div>
    </header>
  );
}

export function ProductLibraryV2({ regulations }: { regulations: Regulation[] }) {
  const [activeState, setActiveState] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const productSectionRef = useRef<HTMLDivElement>(null);

  const handleStateClick = useCallback(
    (state: string | null) => {
      setActiveState(state);
      // Smooth scroll into the product section so the filtered results are immediately visible
      if (state && productSectionRef.current) {
        productSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    []
  );

  const searchFiltered = searchTerm.trim()
    ? regulations.filter((r) => {
        const q = searchTerm.toLowerCase();
        return (
          r.shortName.toLowerCase().includes(q) ||
          r.state.toLowerCase().includes(q) ||
          r.name.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.keywords.some((k) => k.toLowerCase().includes(q))
        );
      })
    : regulations;

  const displayed = activeState
    ? searchFiltered.filter((r) => r.state === activeState)
    : searchFiltered;

  return (
    <>
      {/* Coverage hero is integrated here so state click → scroll works */}
      <CoverageHero
        regulations={regulations}
        activeState={activeState}
        onStateClick={handleStateClick}
      />

      {/* Product section */}
      <section
        ref={productSectionRef}
        className="py-10 sm:py-14 bg-slate-50"
        aria-label="Product packages"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Section heading + search */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-7">
            <div className="flex-1">
              <h2 className="text-lg sm:text-xl font-bold font-display text-gray-900">
                {activeState
                  ? `${activeState} Packages`
                  : "All Compliance Packages"}
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                {displayed.length} package{displayed.length !== 1 ? "s" : ""} shown
                {activeState ? ` · ` : ""}
                {activeState && (
                  <button
                    onClick={() => setActiveState(null)}
                    className="text-blue-700 hover:underline"
                  >
                    clear filter
                  </button>
                )}
              </p>
            </div>
            <div className="sm:w-72">
              <input
                type="search"
                aria-label="Search products"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by state, law, or topic…"
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Deadline banner */}
          <DeadlineBanner regulations={regulations} />

          {/* Product grid */}
          {displayed.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {displayed.map((reg) => (
                <ProductCard
                  key={reg.slug}
                  reg={reg}
                  highlightState={activeState}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 py-12 text-sm">
              {searchTerm.trim()
                ? `No products match "${searchTerm}".`
                : "No products match this filter."}
            </p>
          )}

          {/* "Not sure where to start" guide — preserved from current design */}
          <details className="mt-10 group">
            <summary className="cursor-pointer list-none flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-blue-700 transition select-none">
              <svg
                className="w-4 h-4 text-blue-600 shrink-0 transition-transform group-open:rotate-90"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              Not sure where to start?
            </summary>
            <div className="mt-3 bg-white border border-slate-200 rounded-xl p-5 grid sm:grid-cols-3 gap-6">
              <div>
                <p className="font-semibold text-slate-800 text-sm mb-1">Using AI in hiring?</p>
                <p className="text-xs text-slate-500 mb-3">
                  Employees in Illinois, NYC, or Colorado + automated hiring tools:
                </p>
                <ul className="space-y-1">
                  <li><Link href="/products/illinois-hb3773" className="text-xs text-blue-700 hover:underline">Illinois HB3773</Link></li>
                  <li><Link href="/products/nyc-local-law-144" className="text-xs text-blue-700 hover:underline">NYC Local Law 144</Link></li>
                  <li><Link href="/products/colorado-sb24-205" className="text-xs text-blue-700 hover:underline">Colorado SB 24-205</Link></li>
                  <li><Link href="/products/multi-state-employer-ai-disclosure" className="text-xs text-blue-700 hover:underline">Multi-State Employer Bundle</Link></li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-slate-800 text-sm mb-1">Collecting consumer data?</p>
                <p className="text-xs text-slate-500 mb-3">
                  Using customer data for targeting, profiling, or automated decisions:
                </p>
                <ul className="space-y-1">
                  <li><Link href="/products/virginia-cdpa" className="text-xs text-blue-700 hover:underline">Virginia CDPA</Link></li>
                  <li><Link href="/products/california-ccpa-admt" className="text-xs text-blue-700 hover:underline">California CCPA ADMT</Link></li>
                  <li><Link href="/products/multi-state-profiling-assessment" className="text-xs text-blue-700 hover:underline">Multi-State Profiling Bundle</Link></li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-slate-800 text-sm mb-1">Don&apos;t know what you have?</p>
                <p className="text-xs text-slate-500 mb-3">
                  Start with an AI inventory before choosing which laws apply:
                </p>
                <ul className="space-y-1">
                  <li><Link href="/products/ai-system-registry" className="text-xs text-blue-700 hover:underline">AI System Registry</Link></li>
                  <li><Link href="/products/ai-governance-framework" className="text-xs text-blue-700 hover:underline">AI Governance Framework</Link></li>
                </ul>
              </div>
            </div>
          </details>
        </div>
      </section>
    </>
  );
}

// ── Default export: the full page drop-in (hero + library) ───────────────────
// Usage: replace <ProductLibrary> in page.tsx with <ProductLibraryV2>
// The CoverageHero is embedded inside ProductLibraryV2 so state is shared.

export default ProductLibraryV2;

// ─────────────────────────────────────────────────────────────────────────────
// DESIGN RATIONALE
// ─────────────────────────────────────────────────────────────────────────────
//
// The core insight: a user landing on the products page has one subconscious
// question — "do you even cover my state?" This design answers that question
// before they read a single product name.
//
// VISUAL STRATEGY
// ─────────────────
// The coverage grid sits inside the dark hero, not below it. This creates a
// two-part visual: dark = "scope" (we cover all this), light = "products"
// (here's how to buy). The state cards use actual skyline photography for NYC,
// Illinois, California, and Colorado — the four states where photos already
// exist — giving the grid an immediate sense of geographic reality rather than
// abstract data.
//
// INTERACTION DESIGN
// ────────────────────
// Clicking a jurisdiction card:
//   1. Highlights the card (ring, scale)
//   2. Smooth-scrolls to the product section
//   3. Dims all products that don't belong to that state
//   4. Updates the section heading to "California Packages"
// This creates a "narrowing" UX — the user goes from understanding the full
// scope to finding their specific product in two clicks, not five.
//
// PRODUCT CARDS
// ───────────────
// Each card gets a 3px left border in its jurisdiction's accent color. This
// creates a subtle but persistent visual link between the jurisdiction grid and
// the products — you can see at a glance which state a product belongs to even
// when not filtering.
//
// STATS BAR
// ───────────
// Four numbers between the identity bar and the coverage grid: total packages,
// jurisdictions, laws in effect now, state-specific products. These exist to
// make "we cover 15+ jurisdictions" scannable and credible before the grid
// even loads. Numbers from the data, not marketing copy.
//
// WHAT WAS PRESERVED
// ────────────────────
// - Deadline banner (now styled to match)
// - "Not sure where to start" guide (moved below the grid, preserved in full)
// - Search functionality
// - Status badges
// - All product card data fields
// - Schema markup (in page.tsx, unchanged)
// - Metadata (in page.tsx, unchanged)
//
// IMPLEMENTATION NOTES FOR DEVELOPER
// ─────────────────────────────────────
// 1. Copy this file to src/components/ProductLibraryV2.tsx (remove the demo
//    comment block at the top)
// 2. In src/app/products/page.tsx, replace the import of ProductLibrary with
//    ProductLibraryV2. Remove the <header> hero section — CoverageHero is now
//    embedded in ProductLibraryV2 so the shared activeState works.
// 3. The CTA strip at the bottom stays in page.tsx unchanged.
// 4. No new dependencies. No new images needed (uses existing /images/landing/).
// 5. Tailwind classes used are all in core Tailwind — no custom config needed.
