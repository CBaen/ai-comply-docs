/**
 * DESIGN 2 — Urgency-First Timeline
 *
 * Philosophy: Compliance is a race against deadlines. The page is built
 * around a single question every visitor asks first: "What do I need NOW?"
 *
 * Visual architecture:
 * 1. Hero: Headline built around time pressure, not features.
 * 2. "Your Compliance Clock" — a horizontal timeline showing laws sorted by
 *    effective date, with the most urgent pinned to the left. Clicking a
 *    node jumps to that product.
 * 3. The product grid itself is sorted by urgency (in-effect first, then
 *    effective-soon), with a countdown chip on each card showing how long
 *    until/since the law took effect.
 * 4. Below-the-fold: universal/foundational products in a lower-urgency
 *    secondary grid so they don't dilute the urgency message.
 * 5. Sticky "You're already late for X laws" nudge bar.
 *
 * Component split (Next.js 16 App Router):
 * - page.tsx               → server component (metadata, layout, hero)
 * - UrgencyTimeline.tsx    → client component (timeline + grid)
 * - TimelineNode.tsx       → pure presentational (no state)
 * - UrgencyProductCard.tsx → pure presentational (no state)
 *
 * All components below are written as a single file for the design proposal.
 * In the real implementation they would be split per the naming above.
 */

// ─────────────────────────────────────────────────────────────────────────────
// TYPE IMPORTS (mirrors @/data/regulations exactly)
// ─────────────────────────────────────────────────────────────────────────────

import type { Regulation } from "@/data/regulations";

// ─────────────────────────────────────────────────────────────────────────────
// UTILITY HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Convert an effectiveDate string into a sortable Date (or null for
 * "Available now" / staggered entries).
 */
function parseEffectiveDate(dateStr: string): Date | null {
  if (!dateStr || dateStr === "Available now" || dateStr.startsWith("Staggered")) {
    return null;
  }
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? null : d;
}

/**
 * Returns a human-readable urgency label relative to today.
 * Examples: "14 days ago", "in 91 days", "3+ years ago"
 */
function urgencyLabel(dateStr: string): string {
  const d = parseEffectiveDate(dateStr);
  if (!d) return "Active now";
  const today = new Date();
  const diffMs = d.getTime() - today.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Effective today";
  if (diffDays > 0) return `${diffDays} days left`;
  const absDays = Math.abs(diffDays);
  if (absDays < 30) return `${absDays} days ago`;
  if (absDays < 365) return `${Math.round(absDays / 30)} months ago`;
  return `${Math.round(absDays / 365)}+ years ago`;
}

/**
 * Heat level: drives color-coding throughout the page.
 * 0 = already in effect for years (cool/muted)
 * 1 = in effect within the past year (warm amber)
 * 2 = in effect <90 days OR effective in <90 days (hot red/orange)
 * 3 = effective within the next 180 days (urgent yellow)
 */
function urgencyLevel(reg: Regulation): 0 | 1 | 2 | 3 {
  const d = parseEffectiveDate(reg.effectiveDate);
  if (!d) return 0;
  const today = new Date();
  const diffDays = Math.round((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays > 0 && diffDays <= 180) return 3; // upcoming soon
  if (diffDays > 0) return 2;                     // upcoming not urgent
  if (diffDays >= -90) return 2;                  // very recently in effect
  if (diffDays >= -365) return 1;                 // in effect < 1 year
  return 0;                                       // well established
}

const HEAT_STYLES: Record<0 | 1 | 2 | 3, { ring: string; chip: string; dot: string; label: string }> = {
  3: {
    ring: "ring-2 ring-red-500 shadow-red-100 shadow-lg",
    chip: "bg-red-600 text-white",
    dot: "bg-red-500",
    label: "DEADLINE APPROACHING",
  },
  2: {
    ring: "ring-2 ring-orange-400 shadow-orange-50 shadow-md",
    chip: "bg-orange-500 text-white",
    dot: "bg-orange-400",
    label: "RECENTLY IN EFFECT",
  },
  1: {
    ring: "ring-1 ring-amber-300",
    chip: "bg-amber-100 text-amber-900",
    dot: "bg-amber-400",
    label: "IN EFFECT",
  },
  0: {
    ring: "ring-1 ring-gray-200",
    chip: "bg-slate-100 text-slate-600",
    dot: "bg-slate-400",
    label: "ACTIVE",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE COMPONENT (server component in the real implementation)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * === PAGE.TSX (server component) ===
 *
 * In the real split this is the only server file. Hero lives here so it
 * renders without JS. UrgencyTimeline is the client island.
 */
export function ProductsPageDesign2({
  regulations,
}: {
  regulations: Regulation[];
}) {
  const ready = regulations.filter((r) => r.ready);
  const inEffect = ready.filter((r) => r.status === "in-effect").length;
  const soonCount = ready.filter((r) => r.status === "effective-soon").length;

  return (
    <>
      {/* ── STICKY URGENCY NUDGE BAR ── */}
      {/* Sticks to the top on scroll. Shows active violation count. */}
      <div
        aria-live="polite"
        className="sticky top-0 z-50 bg-red-600 text-white text-xs sm:text-sm py-2 px-4 flex items-center justify-between gap-2"
      >
        <span className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-white animate-pulse" aria-hidden="true" />
          <strong>{inEffect} AI laws are in active enforcement</strong>
          {soonCount > 0 && (
            <span className="hidden sm:inline text-red-200">
              · {soonCount} more take effect this year
            </span>
          )}
        </span>
        <a
          href="#timeline"
          className="shrink-0 underline underline-offset-2 hover:no-underline text-red-100 font-medium"
        >
          See deadlines
        </a>
      </div>

      {/* ── HERO ── */}
      <header className="relative bg-slate-900 text-white py-14 md:py-24 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0" aria-hidden="true">
          <img
            src="/images/landing/professional-reviewing-documents.png"
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900/60" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
          {/* Eyebrow pill */}
          <div className="inline-flex items-center gap-2 border border-red-500/60 bg-red-600/20 text-red-300 text-xs font-semibold px-3 py-1.5 rounded mb-5 tracking-wide uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" aria-hidden="true" />
            Enforcement is live — not coming soon
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] mb-5">
            Stop counting on<br />
            <span className="text-red-400">"we'll deal with it later."</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed mb-8">
            {inEffect} state and federal AI laws are already in enforcement. Each
            one comes with its own deadline, penalty, and documentation
            requirement. This page is sorted by urgency — so you see what you
            need <em>right now</em> before what comes next.
          </p>

          {/* Stat row */}
          <div className="flex flex-wrap gap-6 mb-8">
            {[
              { value: `${inEffect}`, label: "Laws in active enforcement" },
              { value: `${soonCount}`, label: "Deadlines approaching in 2026" },
              { value: ready.length.toString(), label: "Packages available now" },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="text-3xl font-extrabold text-white">{value}</div>
                <div className="text-xs text-slate-400 mt-0.5">{label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="#timeline"
              className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3.5 rounded-lg font-bold text-sm hover:bg-red-700 transition"
            >
              See my deadlines
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
            <a
              href="mailto:info@aicompliancedocuments.com"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-6 py-3.5 rounded-lg font-bold text-sm hover:bg-white/20 transition"
            >
              Not sure what applies? Email us
            </a>
          </div>
        </div>
      </header>

      {/* ── CLIENT ISLAND: timeline + sorted product grid ── */}
      {/* In real implementation: <UrgencyTimeline regulations={ready} /> */}
      <UrgencyTimeline regulations={ready} />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// URGENCY TIMELINE (client component)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * === URGENCY-TIMELINE.TSX (client component) ===
 *
 * The core of the design. Two sections:
 * A) Visual compliance timeline — scrollable horizontal track showing
 *    each law as a dated node. Color-coded by urgency heat level.
 * B) Sorted product grid — same urgency ordering, with urgency chips
 *    prominent above the product name.
 */
"use client";

import { useState, useRef } from "react";
import Link from "next/link";

function UrgencyTimeline({ regulations }: { regulations: Regulation[] }) {
  const [activeFilter, setActiveFilter] = useState<"all" | "urgent" | "soon" | "universal">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const timelineRef = useRef<HTMLDivElement>(null);

  // Sort: effective-soon (upcoming) first, then in-effect sorted by most recent
  // Then universal/federal with no date last
  const sorted = [...regulations].sort((a, b) => {
    const da = parseEffectiveDate(a.effectiveDate);
    const db = parseEffectiveDate(b.effectiveDate);
    const today = new Date();

    // Upcoming laws: sort by days remaining (fewest first = most urgent)
    const aUpcoming = da && da > today;
    const bUpcoming = db && db > today;
    if (aUpcoming && bUpcoming) {
      return da!.getTime() - db!.getTime();
    }
    if (aUpcoming) return -1;
    if (bUpcoming) return 1;

    // In-effect laws: most recently effective first
    if (da && db) return db.getTime() - da.getTime();
    if (da) return -1;
    if (db) return 1;
    return 0;
  });

  // Filter by tab
  const filtered = sorted
    .filter((r) => {
      if (activeFilter === "urgent") return r.status === "in-effect" && urgencyLevel(r) >= 2;
      if (activeFilter === "soon") return r.status === "effective-soon";
      if (activeFilter === "universal") return r.tier === "federal" || r.tier === "universal";
      return true;
    })
    .filter((r) => {
      if (!searchTerm.trim()) return true;
      const q = searchTerm.toLowerCase();
      return (
        r.shortName.toLowerCase().includes(q) ||
        r.state.toLowerCase().includes(q) ||
        r.name.toLowerCase().includes(q) ||
        r.keywords.some((k) => k.toLowerCase().includes(q))
      );
    });

  // Separate "urgent" (state-specific with dates) from "foundational" (universal/federal)
  const urgentProducts = filtered.filter((r) => r.tier === "state" || r.tier === "international");
  const foundationalProducts = filtered.filter((r) => r.tier === "federal" || r.tier === "universal" || r.tier === "industry");

  // Timeline nodes: only state/international products with real dates
  const timelineNodes = sorted
    .filter((r) => parseEffectiveDate(r.effectiveDate) !== null)
    .slice(0, 10); // Show up to 10 on the track

  return (
    <main className="bg-slate-50 min-h-screen">

      {/* ── VISUAL COMPLIANCE TIMELINE ── */}
      <section id="timeline" className="bg-white border-b border-slate-200 py-8 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">

          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Your Compliance Timeline
            </h2>
            <span className="text-xs text-slate-500">Sorted oldest to newest · scroll right</span>
          </div>

          {/* Horizontal scrollable track */}
          <div
            ref={timelineRef}
            className="overflow-x-auto pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 scrollbar-none"
            role="region"
            aria-label="Compliance deadline timeline"
          >
            <div className="flex items-end gap-0 min-w-max relative">
              {/* Track line */}
              <div className="absolute bottom-[2.25rem] left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 via-orange-400 to-slate-300" aria-hidden="true" />

              {timelineNodes.map((reg, i) => {
                const level = urgencyLevel(reg);
                const heat = HEAT_STYLES[level];
                const d = parseEffectiveDate(reg.effectiveDate);
                const isPast = d ? d < new Date() : false;
                const label = urgencyLabel(reg.effectiveDate);

                return (
                  <a
                    key={reg.slug}
                    href={`#product-${reg.slug}`}
                    className="flex flex-col items-center w-28 sm:w-32 shrink-0 group focus:outline-none"
                    aria-label={`${reg.shortName} — ${label}`}
                  >
                    {/* Year label above */}
                    <span className="text-[10px] text-slate-400 mb-1 font-mono">
                      {d ? d.getFullYear() : "—"}
                    </span>

                    {/* Node name */}
                    <span className="text-[11px] font-semibold text-slate-700 text-center leading-tight mb-2 px-1 line-clamp-2 group-hover:text-blue-700 transition">
                      {reg.shortName}
                    </span>

                    {/* Dot + urgency chip */}
                    <div className="flex flex-col items-center relative z-10 mb-3">
                      <span
                        className={`w-3.5 h-3.5 rounded-full border-2 border-white shadow ${heat.dot} transition-transform group-hover:scale-125`}
                        aria-hidden="true"
                      />
                    </div>

                    {/* Date chip */}
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${heat.chip}`}
                    >
                      {isPast ? "Since " : ""}
                      {d ? d.toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "Now"}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-4" aria-label="Timeline color key">
            {[
              { color: "bg-red-500", label: "Deadline approaching" },
              { color: "bg-orange-400", label: "Recently in effect" },
              { color: "bg-amber-400", label: "In effect < 1 year" },
              { color: "bg-slate-400", label: "Long in effect" },
            ].map(({ color, label }) => (
              <span key={label} className="flex items-center gap-1.5 text-xs text-slate-600">
                <span className={`w-2.5 h-2.5 rounded-full ${color}`} aria-hidden="true" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FILTER + SEARCH BAR ── */}
      <section className="bg-white border-b border-slate-200 py-4 sticky top-8 z-40 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row gap-3 items-start sm:items-center">

          {/* Tab filters */}
          <div className="flex overflow-x-auto gap-2 shrink-0 scrollbar-none">
            {(
              [
                { key: "all", label: "All products" },
                { key: "urgent", label: "Active now" },
                { key: "soon", label: "Coming soon" },
                { key: "universal", label: "Universal" },
              ] as const
            ).map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                aria-pressed={activeFilter === key}
                className={`shrink-0 px-3.5 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${
                  activeFilter === key
                    ? "bg-red-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="flex-1 w-full sm:max-w-xs ml-auto">
            <input
              type="search"
              aria-label="Search by state, law, or topic"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search state, law, topic…"
              className="w-full px-3.5 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
            />
          </div>
        </div>
      </section>

      {/* ── PRODUCT GRID ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">

        {/* ── SECTION A: State-specific + time-critical ── */}
        {urgentProducts.length > 0 && (
          <section aria-labelledby="state-laws-heading" className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-1 h-8 bg-red-600 rounded-full" aria-hidden="true" />
              <div>
                <h2 id="state-laws-heading" className="text-lg font-bold text-slate-900">
                  State Laws — Sorted by Urgency
                </h2>
                <p className="text-sm text-slate-500">Enforcement-active first. Your exposure is live.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {urgentProducts.map((reg) => (
                <UrgencyProductCard key={reg.slug} reg={reg} />
              ))}
            </div>
          </section>
        )}

        {/* ── SECTION B: Universal / foundational ── */}
        {foundationalProducts.length > 0 && (
          <section aria-labelledby="universal-laws-heading">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-1 h-8 bg-slate-400 rounded-full" aria-hidden="true" />
              <div>
                <h2 id="universal-laws-heading" className="text-lg font-bold text-slate-900">
                  Foundational Compliance
                </h2>
                <p className="text-sm text-slate-500">
                  Federal baselines and cross-state bundles — no specific deadline, always applicable.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {foundationalProducts.map((reg) => (
                <UrgencyProductCard key={reg.slug} reg={reg} />
              ))}
            </div>
          </section>
        )}

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            <p className="text-lg font-semibold mb-2">No matches found</p>
            <p className="text-sm">
              {searchTerm.trim()
                ? `Nothing matching "${searchTerm}".`
                : "No products match this filter."}
            </p>
          </div>
        )}

        {/* ── HELP ACCORDION ── */}
        <details className="mt-14 group">
          <summary className="cursor-pointer list-none flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-red-600 transition select-none">
            <svg
              className="w-4 h-4 shrink-0 text-red-500 transition-transform group-open:rotate-90"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            Still not sure which laws apply to you?
          </summary>
          <div className="mt-4 bg-white border border-slate-200 rounded-xl p-6 grid sm:grid-cols-3 gap-6">
            {[
              {
                trigger: "Using AI in hiring?",
                detail: "Employees in Illinois, NYC, or Colorado? You need disclosure docs.",
                links: [
                  { href: "/products/illinois-hb3773", label: "Illinois HB3773" },
                  { href: "/products/nyc-local-law-144", label: "NYC Local Law 144" },
                  { href: "/products/colorado-sb24-205", label: "Colorado SB 24-205" },
                  { href: "/products/multi-state-employer-ai-disclosure", label: "Multi-State Bundle" },
                ],
              },
              {
                trigger: "Processing consumer data?",
                detail: "If you profile, target, or run automated decisions on customers:",
                links: [
                  { href: "/products/virginia-cdpa", label: "Virginia CDPA" },
                  { href: "/products/california-ccpa-admt", label: "California CCPA ADMT" },
                  { href: "/products/multi-state-profiling-assessment", label: "Multi-State Profiling Bundle" },
                ],
              },
              {
                trigger: "Starting from scratch?",
                detail: "Inventory what you have before worrying about which laws apply:",
                links: [
                  { href: "/products/ai-system-registry", label: "AI System Registry" },
                  { href: "/products/ai-governance-framework", label: "AI Governance Framework" },
                  { href: "/products/nist-ai-rmf", label: "NIST AI RMF Guide" },
                ],
              },
            ].map(({ trigger, detail, links }) => (
              <div key={trigger}>
                <p className="font-bold text-slate-800 text-sm mb-1">{trigger}</p>
                <p className="text-xs text-slate-500 mb-3">{detail}</p>
                <ul className="space-y-1.5">
                  {links.map(({ href, label }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="text-xs text-blue-700 hover:underline"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </details>
      </div>

      {/* ── BOTTOM CTA ── */}
      <section className="bg-slate-900 py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 font-display">
            The deadline already passed for some of these.
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mb-7 max-w-xl mx-auto">
            The longer you wait, the higher your exposure. Email us — we&apos;ll
            tell you exactly which laws apply to your business and what you need
            to buy to be compliant.
          </p>
          <a
            href="mailto:info@aicompliancedocuments.com"
            className="inline-flex items-center gap-2 bg-red-600 text-white px-8 py-4 rounded-lg font-bold text-sm sm:text-base hover:bg-red-700 transition"
          >
            Get clarity — email us now
          </a>
        </div>
      </section>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// URGENCY PRODUCT CARD
// ─────────────────────────────────────────────────────────────────────────────

/**
 * === URGENCY-PRODUCT-CARD.TSX ===
 *
 * Differentiators vs current design:
 * - Urgency chip is the FIRST thing you see, not the name
 * - Countdown/elapsed label is prominent
 * - Penalty is shown inline (the "what happens if I don't")
 * - "Get compliant" instead of the neutral "See Details"
 * - The heat-level ring visually encodes urgency without text
 */
function UrgencyProductCard({ reg }: { reg: Regulation }) {
  const level = urgencyLevel(reg);
  const heat = HEAT_STYLES[level];
  const d = parseEffectiveDate(reg.effectiveDate);
  const isPast = d ? d < new Date() : false;
  const label = urgencyLabel(reg.effectiveDate);
  const firstSentence = reg.description.match(/^[^.!?]+[.!?]/)?.[0] ?? reg.description;

  return (
    <article
      id={`product-${reg.slug}`}
      className={`bg-white rounded-xl border border-slate-200 p-5 flex flex-col transition hover:shadow-lg ${heat.ring}`}
      aria-label={reg.shortName}
    >
      {/* ── Top row: urgency chip + countdown ── */}
      <div className="flex items-center justify-between mb-3 gap-2">
        <span className={`inline-flex items-center gap-1.5 text-[10px] font-extrabold px-2.5 py-1 rounded tracking-wider uppercase ${heat.chip}`}>
          <span className={`inline-block w-1.5 h-1.5 rounded-full ${heat.dot}`} aria-hidden="true" />
          {heat.label}
        </span>

        {/* Countdown chip — the number people need */}
        <span
          className={`text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${
            level >= 2 ? "bg-red-50 text-red-700" : "bg-slate-100 text-slate-600"
          }`}
          aria-label={`${isPast ? "Active" : "Effective in"} ${label}`}
        >
          {label}
        </span>
      </div>

      {/* ── Product name ── */}
      <h3 className="font-bold text-base text-slate-900 leading-snug mb-0.5">
        {reg.shortName}
      </h3>

      {/* ── Effective date + state ── */}
      <p className="text-xs text-slate-500 mb-3">
        {reg.state} · {isPast ? "Effective" : "Takes effect"} {reg.effectiveDate}
      </p>

      {/* ── First-sentence description ── */}
      <p className="text-sm text-slate-600 leading-relaxed flex-1 mb-4">
        {firstSentence}
      </p>

      {/* ── Penalty — the hook ── */}
      <div className="bg-red-50 border border-red-100 rounded-lg px-3 py-2 mb-4">
        <p className="text-[11px] font-semibold text-red-700 uppercase tracking-wide mb-0.5">
          Non-compliance risk
        </p>
        <p className="text-xs text-red-800 leading-snug line-clamp-2">
          {reg.maxPenalty}
        </p>
      </div>

      {/* ── Price + CTA ── */}
      <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
        <div>
          <span className="text-2xl font-extrabold text-slate-900 leading-none">
            ${reg.price}
          </span>
          <span className="text-slate-500 text-xs ml-1">one-time</span>
          <div className="text-[11px] text-slate-400 mt-0.5">{reg.documentCount} documents</div>
        </div>

        {reg.ready ? (
          <Link
            href={`/products/${reg.slug}`}
            className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg font-bold text-sm transition whitespace-nowrap ${
              level >= 2
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-blue-800 text-white hover:bg-blue-900"
            }`}
          >
            Get compliant
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ) : (
          <Link
            href={`/products/${reg.slug}`}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg font-bold text-sm bg-slate-100 text-slate-700 hover:bg-slate-200 transition whitespace-nowrap"
          >
            Coming soon
          </Link>
        )}
      </div>
    </article>
  );
}

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * DESIGN RATIONALE
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * WHY THIS BEATS OTHER DESIGNS FOR THIS SPECIFIC PRODUCT:
 *
 * 1. The stickied red urgency bar.
 *    Other designs treat urgency as a filter the user has to choose.
 *    This design makes the urgency ambient — it's always there, at the top
 *    of the viewport, even as you scroll. The user never stops seeing "X
 *    laws are in active enforcement." This is the single most important
 *    conversion message on the page.
 *
 * 2. The headline.
 *    "Stop counting on 'we'll deal with it later'" directly names the
 *    psychological objection that causes procrastination on compliance
 *    purchases. It's not features-forward — it's pain-forward. Compliance
 *    buyers respond to fear of exposure, not to feature lists.
 *
 * 3. The visual timeline.
 *    A horizontal scrollable track converts abstract dates into a spatial
 *    "you are here" experience. The gradient from red (left/urgent) to
 *    slate (right/future) encodes urgency without needing to read labels.
 *    Clicking a node scrolls directly to that product.
 *
 * 4. Urgency heat rings on product cards.
 *    The colored ring around each card means you can scan the grid and
 *    immediately see which products need attention. Red ring = you should
 *    probably buy this today. This is an ambient signal — it works even
 *    when the visitor is skimming.
 *
 * 5. The "Non-compliance risk" penalty box on every card.
 *    The current design buries maxPenalty below the fold on the detail
 *    page. This design shows it on the card. The penalty is the reason
 *    someone buys compliance software. Showing it at point-of-decision
 *    closes the loop: "what happens if I don't buy this?" is answered
 *    before they have to ask.
 *
 * 6. "Get compliant" vs "See Details."
 *    The current CTA is informational. "See Details" suggests there's
 *    more research to do before a decision. "Get compliant" is the
 *    action the buyer actually wants to complete. Red button for urgent
 *    products ties the action to the urgency signal.
 *
 * 7. Two-section grid.
 *    State-specific (with deadlines) above the fold. Universal/federal
 *    (no specific deadline) below. This prevents the "I don't know which
 *    state laws apply to me so I'll read the NIST framework instead and
 *    buy nothing" failure mode. Urgency products get first attention.
 *
 * 8. Urgency sort order.
 *    Products are sorted so that approaching deadlines (effective-soon)
 *    come first, followed by recently-in-effect laws (where you're already
 *    exposed), followed by long-established laws. This mirrors how a
 *    compliance attorney would triage a client's exposure.
 * ─────────────────────────────────────────────────────────────────────────────
 */
