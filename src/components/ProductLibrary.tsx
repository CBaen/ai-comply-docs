"use client";

import { useState } from "react";
import Link from "next/link";
import type { Regulation } from "@/data/regulations";

type FilterKey =
  | "all"
  | "in-effect"
  | "effective-soon"
  | "federal"
  | "industry";

const filters: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "in-effect", label: "In Effect Now" },
  { key: "effective-soon", label: "Effective Soon" },
  { key: "federal", label: "Federal & Universal" },
  { key: "industry", label: "Industry-Specific" },
];

function filterRegulations(
  regulations: Regulation[],
  filter: FilterKey
): Regulation[] {
  switch (filter) {
    case "in-effect":
      return regulations.filter((r) => r.status === "in-effect");
    case "effective-soon":
      return regulations.filter((r) => r.status === "effective-soon");
    case "federal":
      return regulations.filter(
        (r) => r.tier === "federal" || r.tier === "universal"
      );
    case "industry":
      return regulations.filter(
        (r) => r.tier === "industry" || r.tier === "international"
      );
    default:
      return regulations;
  }
}

function StatusBadge({ status, ready }: { status: string; ready: boolean }) {
  if (!ready) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded font-semibold shrink-0 bg-slate-100 text-slate-600">
        <span className="inline-block w-1.5 h-1.5 rounded-sm bg-slate-400" aria-hidden="true" />
        COMING SOON
      </span>
    );
  }
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
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded font-semibold shrink-0 ${styles[status] || styles.proposed}`}
    >
      <span
        aria-hidden="true"
        className={`inline-block w-1.5 h-1.5 rounded-sm ${status === "in-effect" ? "bg-red-500" : status === "effective-soon" ? "bg-amber-500" : "bg-slate-400"}`}
      />
      {labels[status] || "PROPOSED"}
    </span>
  );
}

function DeadlineBanner({
  regulations,
}: {
  regulations: Regulation[];
}) {
  const urgent = regulations
    .filter(
      (r) =>
        r.status === "effective-soon" ||
        (r.status === "in-effect" && r.effectiveDate.includes("2026"))
    )
    .slice(0, 4);

  if (urgent.length === 0) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-5 mb-8">
      <div className="flex items-center gap-2 mb-1">
        <svg
          className="w-5 h-5 text-red-600 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="font-bold text-red-900 font-display">
          These Laws Are In Effect Now — Penalties Are Live
        </h3>
      </div>
      <p className="text-xs text-red-700 mb-3">
        Last updated {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
      </p>
      <div className="grid sm:grid-cols-2 gap-3">
        {urgent.map((r) => {
          const effectiveParsed = new Date(r.effectiveDate);
          const isPast = !isNaN(effectiveParsed.getTime()) && effectiveParsed < new Date();
          return (
            <Link
              key={r.slug}
              href={`/products/${r.slug}`}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white border border-red-100 rounded p-3 hover:border-red-300 transition group gap-1"
            >
              <div className="min-w-0">
                <p className="font-semibold text-gray-900 text-sm group-hover:text-blue-700 transition truncate">
                  {r.shortName}
                </p>
                <p className="text-xs text-gray-500">{r.state}</p>
              </div>
              <div className="sm:text-right sm:shrink-0 sm:ml-3 max-w-[55%]">
                <p className="text-xs font-bold text-red-700 line-clamp-2">
                  {isPast ? "In effect since" : "Effective"} {r.effectiveDate}
                </p>
                <p className="text-xs text-gray-500 line-clamp-1">{r.maxPenalty}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default function ProductLibrary({
  regulations,
}: {
  regulations: Regulation[];
}) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [searchTerm, setSearchTerm] = useState("");

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

  const filtered = filterRegulations(searchFiltered, activeFilter);

  const counts: Record<FilterKey, number> = {
    all: searchFiltered.length,
    "in-effect": searchFiltered.filter((r) => r.status === "in-effect").length,
    "effective-soon": searchFiltered.filter((r) => r.status === "effective-soon")
      .length,
    federal: searchFiltered.filter(
      (r) => r.tier === "federal" || r.tier === "universal"
    ).length,
    industry: searchFiltered.filter(
      (r) => r.tier === "industry" || r.tier === "international"
    ).length,
  };

  return (
    <>
      <DeadlineBanner regulations={regulations} />

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="search"
          aria-label="Search products"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by state, law, or topic..."
          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex overflow-x-auto gap-2 mb-6 pb-1 -mx-1 px-1 scrollbar-none">
        {filters.map((f) => (
          <button
            key={f.key}
            aria-pressed={activeFilter === f.key}
            onClick={() => setActiveFilter(f.key)}
            className={`shrink-0 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${
              activeFilter === f.key
                ? "bg-blue-800 text-white shadow-sm"
                : "bg-white border border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-700"
            }`}
          >
            {f.label}
            <span
              className={`ml-1.5 text-xs ${activeFilter === f.key ? "text-blue-200" : "text-gray-500"}`}
            >
              {counts[f.key]}
            </span>
          </button>
        ))}
      </div>

      {/* Not Sure Where to Start Guide */}
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
        <div className="mt-3 bg-slate-50 border border-slate-200 rounded-lg p-5 grid sm:grid-cols-3 gap-6">
          <div>
            <p className="font-semibold text-slate-800 text-sm mb-1">Using AI in hiring?</p>
            <p className="text-xs text-slate-600 mb-3">
              If you have employees in Illinois, NYC, or Colorado and use automated tools in hiring decisions:
            </p>
            <ul className="space-y-1">
              <li>
                <Link href="/products/illinois-hb3773" className="text-xs text-blue-700 hover:underline">Illinois HB3773</Link>
              </li>
              <li>
                <Link href="/products/nyc-local-law-144" className="text-xs text-blue-700 hover:underline">NYC LL144</Link>
              </li>
              <li>
                <Link href="/products/colorado-sb24-205" className="text-xs text-blue-700 hover:underline">Colorado SB 24-205</Link>
              </li>
              <li>
                <Link href="/products/multi-state-employer-ai-disclosure" className="text-xs text-blue-700 hover:underline">Multi-State Employer Bundle</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-slate-800 text-sm mb-1">Collecting consumer data?</p>
            <p className="text-xs text-slate-600 mb-3">
              If you use customer data for targeting, profiling, or automated decisions:
            </p>
            <ul className="space-y-1">
              <li>
                <Link href="/products/virginia-cdpa" className="text-xs text-blue-700 hover:underline">Virginia CDPA</Link>
              </li>
              <li>
                <Link href="/products/california-ccpa-admt" className="text-xs text-blue-700 hover:underline">California CCPA ADMT</Link>
              </li>
              <li>
                <Link href="/products/multi-state-profiling-assessment" className="text-xs text-blue-700 hover:underline">Multi-State Profiling Bundle</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-slate-800 text-sm mb-1">Don&apos;t know what you have?</p>
            <p className="text-xs text-slate-600 mb-3">
              Start by inventorying your AI systems before worrying about which laws apply:
            </p>
            <ul className="space-y-1">
              <li>
                <Link href="/products/ai-system-registry" className="text-xs text-blue-700 hover:underline">AI System Registry</Link>
              </li>
              <li>
                <Link href="/products/ai-governance-framework" className="text-xs text-blue-700 hover:underline">AI Governance Framework</Link>
              </li>
            </ul>
          </div>
        </div>
      </details>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filtered.map((reg) => {
          // Show only the first sentence of the description for scannability
          const firstSentence = reg.description.match(/^[^.!?]+[.!?]/)?.[0] ?? reg.description;
          return (
          <div
            key={reg.slug}
            className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 hover:border-blue-700 hover:shadow-md transition flex flex-col"
          >
            {/* Header: name + status badge */}
            <div className="flex justify-between items-start mb-1 gap-2">
              <div className="min-w-0">
                <h3 className="font-bold text-base sm:text-lg font-display text-gray-900 leading-snug">
                  {reg.shortName}
                </h3>
              </div>
              <StatusBadge status={reg.status} ready={reg.ready} />
            </div>

            {/* Effective date — scannable at a glance */}
            <p className="text-xs text-gray-500 mb-3">
              {reg.status === "in-effect" ? "In effect" : "Effective"} {reg.effectiveDate} &middot; {reg.state}
            </p>

            {/* First-sentence description */}
            <p className="text-gray-600 text-sm mb-3 leading-relaxed">
              {firstSentence}
            </p>

            {/* Who needs this — the key question */}
            <p className="text-xs text-blue-800 bg-blue-50 rounded px-3 py-2 mb-4 leading-relaxed flex-1">
              <span className="font-semibold">Applies to: </span>
              {reg.appliesToSummary.split(/[.!]/)[0]}.
            </p>

            {/* Price (prominent) + doc count */}
            <div className="flex items-end justify-between mb-4 pt-3 border-t border-gray-100">
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-display leading-none">
                  ${reg.price}
                </span>
                <span className="text-gray-500 text-xs ml-1">one-time</span>
              </div>
              <span className="text-gray-600 text-xs">
                {reg.documentCount} documents
              </span>
            </div>

            {reg.ready ? (
              <Link
                href={`/products/${reg.slug}`}
                className="block text-center bg-blue-800 text-white py-3 rounded-lg font-semibold text-sm hover:bg-blue-900 transition"
              >
                See Details
              </Link>
            ) : (
              <Link
                href={`/products/${reg.slug}`}
                className="block text-center bg-slate-50 border border-gray-200 text-gray-700 py-3 rounded-lg font-semibold text-sm hover:border-blue-300 hover:text-blue-700 transition"
              >
                Coming Soon — Learn More
              </Link>
            )}
          </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-500 py-12">
          {searchTerm.trim()
            ? `No products match "${searchTerm}".`
            : "No products match this filter."}
        </p>
      )}
    </>
  );
}
