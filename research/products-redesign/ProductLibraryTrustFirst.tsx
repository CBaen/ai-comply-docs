/**
 * ProductLibraryTrustFirst.tsx
 * Client component for Design 6 — Trust and Methodology First.
 *
 * Key design decisions:
 *
 * 1. BURDEN TIERS before status filters.
 *    The compliance officer's first question is not "is this law in effect?"
 *    It is "how much work is this?" Organizing by documentation burden (light /
 *    medium / heavy) answers that faster than any status filter.
 *
 * 2. Citation inline on each card.
 *    Every card shows the statute citation and links directly to the .gov source.
 *    This is not a feature — it is a trust signal. A card that says
 *    "NYC Admin. Code § 20-870" next to a .gov link reads as authoritative.
 *    A card that doesn't reads like a template vendor.
 *
 * 3. Penalty displayed as consequence, not threat.
 *    The max penalty is shown as context for WHY the documentation matters —
 *    not as a scare tactic. Small text, factual tone.
 *
 * 4. No fake stats. No "trusted by X companies." No star ratings.
 *    The trust signals ARE the citations, the statute mapping, and the
 *    .gov source links. Adding manufactured social proof would undercut them.
 *
 * 5. Search and burden filter work together.
 *    Search narrows the full set; burden filter then applies within results.
 *    A compliance officer searching "illinois" should be able to also filter
 *    to "heavy compliance" to see which Illinois packages require more work.
 */

"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { Regulation } from "@/data/regulations";

// ─── Burden classification ────────────────────────────────────────────────────

type BurdenTier = "light" | "medium" | "heavy";

/**
 * Classify a regulation by documentation burden.
 * Light: 1–3 documents. Usually a single policy or disclosure.
 * Medium: 4–6 documents. State privacy assessment + notice package.
 * Heavy: 7+ documents. Full AI governance program with multiple assessments.
 */
function getBurden(reg: Regulation): BurdenTier {
  if (reg.documentCount <= 3) return "light";
  if (reg.documentCount <= 6) return "medium";
  return "heavy";
}

const BURDEN_META: Record<
  BurdenTier,
  { label: string; description: string; timeEstimate: string; color: string; dotColor: string; bgColor: string; borderColor: string }
> = {
  light: {
    label: "Light documentation",
    description: "1–3 documents. Single policy or notice. Complete in a day.",
    timeEstimate: "1–2 hours to complete",
    color: "text-emerald-800",
    dotColor: "bg-emerald-500",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
  },
  medium: {
    label: "Medium documentation",
    description: "4–6 documents. State assessment + notice + rights procedures.",
    timeEstimate: "Half-day to complete",
    color: "text-amber-800",
    dotColor: "bg-amber-500",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
  },
  heavy: {
    label: "Comprehensive documentation",
    description: "7+ documents. Full governance program, risk assessments, impact documentation.",
    timeEstimate: "1–2 days to complete",
    color: "text-blue-900",
    dotColor: "bg-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
};

// ─── Filter types ─────────────────────────────────────────────────────────────

type BurdenFilter = "all" | BurdenTier;
type StatusFilter = "all" | "in-effect" | "effective-soon";

// ─── Status badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "in-effect": "bg-red-100 text-red-800",
    "effective-soon": "bg-amber-100 text-amber-800",
    proposed: "bg-slate-100 text-slate-600",
  };
  const labels: Record<string, string> = {
    "in-effect": "IN EFFECT",
    "effective-soon": "EFFECTIVE SOON",
    proposed: "PROPOSED",
  };
  const dotColors: Record<string, string> = {
    "in-effect": "bg-red-500",
    "effective-soon": "bg-amber-500",
    proposed: "bg-slate-400",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs px-2 py-0.5 rounded font-semibold shrink-0 ${styles[status] || styles.proposed}`}
    >
      <span
        aria-hidden="true"
        className={`inline-block w-1.5 h-1.5 rounded-sm ${dotColors[status] || dotColors.proposed}`}
      />
      {labels[status] || "PROPOSED"}
    </span>
  );
}

// ─── Burden indicator ─────────────────────────────────────────────────────────

function BurdenIndicator({ tier }: { tier: BurdenTier }) {
  const meta = BURDEN_META[tier];
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs px-2 py-0.5 rounded font-medium ${meta.color} ${meta.bgColor} border ${meta.borderColor}`}
    >
      <span aria-hidden="true" className={`inline-block w-1.5 h-1.5 rounded-full ${meta.dotColor}`} />
      {meta.label}
    </span>
  );
}

// ─── Citation badge ───────────────────────────────────────────────────────────

/**
 * Compact citation shown on every card.
 * Links directly to the .gov source — this is the core trust signal.
 */
function CitationBadge({ citation, citationUrl }: { citation: string; citationUrl: string }) {
  return (
    <a
      href={citationUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-xs text-blue-700 hover:text-blue-900 hover:underline transition group"
      aria-label={`View ${citation} on official government website (opens in new tab)`}
    >
      {/* Shield icon — signals "verified source" */}
      <svg
        className="w-3 h-3 text-blue-600 shrink-0"
        fill="currentColor"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z"
          clipRule="evenodd"
        />
      </svg>
      <span className="font-mono">{citation}</span>
      {/* External link indicator */}
      <svg
        className="w-2.5 h-2.5 opacity-50 group-hover:opacity-100 transition"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>
  );
}

// ─── Product card ─────────────────────────────────────────────────────────────

function ProductCard({ reg }: { reg: Regulation }) {
  const burden = getBurden(reg);
  const firstSentence = reg.description.match(/^[^.!?]+[.!?]/)?.[0] ?? reg.description;

  return (
    <article
      className="bg-white rounded-lg border border-gray-200 p-4 sm:p-5 hover:border-blue-700 hover:shadow-md transition flex flex-col"
      aria-label={reg.shortName}
    >
      {/* Top row: name + status */}
      <div className="flex justify-between items-start gap-2 mb-1">
        <h3 className="font-bold text-base font-display text-gray-900 leading-snug min-w-0">
          {reg.shortName}
        </h3>
        <StatusBadge status={reg.status} />
      </div>

      {/* Jurisdiction + effective date */}
      <p className="text-xs text-gray-500 mb-2">
        {reg.state} &middot; {reg.status === "in-effect" ? "In effect" : "Effective"}{" "}
        {reg.effectiveDate}
      </p>

      {/* Citation — the trust anchor for this card */}
      <div className="mb-3">
        <CitationBadge citation={reg.citation} citationUrl={reg.citationUrl} />
      </div>

      {/* Burden indicator */}
      <div className="mb-3">
        <BurdenIndicator tier={burden} />
      </div>

      {/* Description — first sentence only for scannability */}
      <p className="text-gray-600 text-sm mb-3 leading-relaxed flex-1">
        {firstSentence}
      </p>

      {/* Max penalty — context, not scare */}
      {reg.maxPenalty && reg.maxPenalty !== "Liability reduction" && reg.maxPenalty !== "Best practice standard" && (
        <p className="text-xs text-gray-500 mb-3 leading-relaxed border-t border-gray-100 pt-3">
          <span className="font-semibold text-gray-700">Max penalty: </span>
          {reg.maxPenalty}
        </p>
      )}

      {/* Price + doc count */}
      <div className="flex items-end justify-between pt-2 mb-4 border-t border-gray-100">
        <div>
          <span className="text-2xl font-extrabold text-gray-900 font-display leading-none">
            ${reg.price}
          </span>
          <span className="text-gray-500 text-xs ml-1">one-time</span>
        </div>
        <span className="text-gray-500 text-xs">
          {reg.documentCount} document{reg.documentCount !== 1 ? "s" : ""}
        </span>
      </div>

      {/* CTA */}
      <Link
        href={`/products/${reg.slug}`}
        className="block text-center bg-blue-800 text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-blue-900 transition"
      >
        View Package Details
      </Link>
    </article>
  );
}

// ─── Burden section header ────────────────────────────────────────────────────

function BurdenSectionHeader({ tier, count }: { tier: BurdenTier; count: number }) {
  const meta = BURDEN_META[tier];
  const headingId = `burden-${tier}`;
  return (
    <div className="flex items-start gap-4 mb-5 pb-4 border-b border-slate-200">
      <div
        className={`flex-shrink-0 w-1 self-stretch rounded-full ${meta.dotColor}`}
        aria-hidden="true"
      />
      <div>
        <h3
          id={headingId}
          className={`text-base sm:text-lg font-bold font-display ${meta.color}`}
        >
          {meta.label}
          <span className="ml-2 text-sm font-normal text-slate-500">
            ({count} package{count !== 1 ? "s" : ""})
          </span>
        </h3>
        <p className="text-sm text-slate-500 mt-0.5">
          {meta.description}{" "}
          <span className="text-slate-400">{meta.timeEstimate}.</span>
        </p>
      </div>
    </div>
  );
}

// ─── Main client component ────────────────────────────────────────────────────

export default function ProductLibraryTrustFirst({
  regulations,
}: {
  regulations: Regulation[];
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [burdenFilter, setBurdenFilter] = useState<BurdenFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  // Apply search first
  const afterSearch = useMemo(() => {
    if (!searchTerm.trim()) return regulations;
    const q = searchTerm.toLowerCase();
    return regulations.filter(
      (r) =>
        r.shortName.toLowerCase().includes(q) ||
        r.state.toLowerCase().includes(q) ||
        r.name.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.citation.toLowerCase().includes(q) ||
        r.keywords.some((k) => k.toLowerCase().includes(q))
    );
  }, [regulations, searchTerm]);

  // Apply status filter
  const afterStatus = useMemo(() => {
    if (statusFilter === "all") return afterSearch;
    return afterSearch.filter((r) => r.status === statusFilter);
  }, [afterSearch, statusFilter]);

  // Apply burden filter
  const afterBurden = useMemo(() => {
    if (burdenFilter === "all") return afterStatus;
    return afterStatus.filter((r) => getBurden(r) === burdenFilter);
  }, [afterStatus, burdenFilter]);

  // Group remaining results by burden for display
  const byBurden = useMemo(() => {
    const tiers: BurdenTier[] = ["light", "medium", "heavy"];
    return tiers
      .map((tier) => ({
        tier,
        items: afterBurden.filter((r) => getBurden(r) === tier),
      }))
      .filter((g) => g.items.length > 0);
  }, [afterBurden]);

  const totalCount = afterBurden.length;

  // Count helpers for filter buttons
  const counts = useMemo(() => ({
    burden: {
      all: afterStatus.length,
      light: afterStatus.filter((r) => getBurden(r) === "light").length,
      medium: afterStatus.filter((r) => getBurden(r) === "medium").length,
      heavy: afterStatus.filter((r) => getBurden(r) === "heavy").length,
    },
    status: {
      all: afterSearch.length,
      "in-effect": afterSearch.filter((r) => r.status === "in-effect").length,
      "effective-soon": afterSearch.filter((r) => r.status === "effective-soon").length,
    },
  }), [afterSearch, afterStatus]);

  return (
    <div>
      {/* ── Search ──────────────────────────────────────────────────────── */}
      <div className="mb-5">
        <label htmlFor="product-search" className="sr-only">
          Search by state, law name, or citation
        </label>
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
          </svg>
          <input
            id="product-search"
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by state, law, citation, or topic..."
            className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition"
          />
        </div>
      </div>

      {/* ── Filter row: status + burden ──────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        {/* Status filters */}
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
            Status
          </p>
          <div className="flex flex-wrap gap-2">
            {(
              [
                { key: "all" as StatusFilter, label: "All" },
                { key: "in-effect" as StatusFilter, label: "In Effect Now" },
                { key: "effective-soon" as StatusFilter, label: "Effective Soon" },
              ] as { key: StatusFilter; label: string }[]
            ).map((f) => (
              <button
                key={f.key}
                aria-pressed={statusFilter === f.key}
                onClick={() => setStatusFilter(f.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap ${
                  statusFilter === f.key
                    ? "bg-slate-800 text-white"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-slate-400 hover:text-slate-800"
                }`}
              >
                {f.label}
                <span
                  className={`ml-1.5 ${statusFilter === f.key ? "text-slate-300" : "text-gray-500"}`}
                >
                  {counts.status[f.key]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px bg-slate-200 self-stretch my-1" aria-hidden="true" />

        {/* Burden filters */}
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
            Documentation burden
          </p>
          <div className="flex flex-wrap gap-2">
            {(
              [
                { key: "all" as BurdenFilter, label: "All" },
                { key: "light" as BurdenFilter, label: "Light (1–3 docs)" },
                { key: "medium" as BurdenFilter, label: "Medium (4–6 docs)" },
                { key: "heavy" as BurdenFilter, label: "Comprehensive (7+)" },
              ] as { key: BurdenFilter; label: string }[]
            ).map((f) => (
              <button
                key={f.key}
                aria-pressed={burdenFilter === f.key}
                onClick={() => setBurdenFilter(f.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap ${
                  burdenFilter === f.key
                    ? "bg-blue-800 text-white"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-700"
                }`}
              >
                {f.label}
                <span
                  className={`ml-1.5 ${burdenFilter === f.key ? "text-blue-200" : "text-gray-500"}`}
                >
                  {f.key === "all"
                    ? counts.burden.all
                    : counts.burden[f.key as BurdenTier]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Not sure where to start guide (collapsible) ──────────────────── */}
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
        <div className="mt-3 bg-white border border-slate-200 rounded-lg p-5 grid sm:grid-cols-3 gap-6">
          <div>
            <p className="font-semibold text-slate-800 text-sm mb-1">Using AI in hiring?</p>
            <p className="text-xs text-slate-500 mb-3">
              If you have employees in Illinois, NYC, or Colorado and use automated tools in hiring decisions:
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
              If you use customer data for targeting, profiling, or automated decisions:
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
              Start by inventorying your AI systems before worrying about which laws apply:
            </p>
            <ul className="space-y-1">
              <li><Link href="/products/ai-system-registry" className="text-xs text-blue-700 hover:underline">AI System Registry</Link></li>
              <li><Link href="/products/ai-governance-framework" className="text-xs text-blue-700 hover:underline">AI Governance Framework</Link></li>
            </ul>
          </div>
        </div>
      </details>

      {/* ── Results: grouped by burden tier ─────────────────────────────── */}
      {totalCount === 0 ? (
        <p className="text-center text-gray-600 py-16 text-sm">
          {searchTerm.trim()
            ? `No packages match "${searchTerm}". Try a state name, law name, or citation.`
            : "No packages match this filter combination."}
        </p>
      ) : (
        <div className="space-y-10 sm:space-y-14">
          {byBurden.map(({ tier, items }) => (
            <section
              key={tier}
              aria-labelledby={`burden-${tier}`}
            >
              <BurdenSectionHeader tier={tier} count={items.length} />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {items.map((reg) => (
                  <ProductCard key={reg.slug} reg={reg} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
