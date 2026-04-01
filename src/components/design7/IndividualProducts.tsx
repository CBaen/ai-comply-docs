"use client";

import { useState } from "react";
import Link from "next/link";
import type { Regulation } from "@/data/regulations";

const BUNDLE_SLUGS = new Set([
  "multi-state-profiling-assessment",
  "multi-state-employer-ai-disclosure",
]);

type FilterKey = "all" | "in-effect" | "effective-soon" | "federal" | "industry";

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "in-effect", label: "In Effect Now" },
  { key: "effective-soon", label: "Effective Soon" },
  { key: "federal", label: "Federal & Universal" },
  { key: "industry", label: "Industry-Specific" },
];

function filterRegs(regs: Regulation[], filter: FilterKey): Regulation[] {
  switch (filter) {
    case "in-effect": return regs.filter((r) => r.status === "in-effect");
    case "effective-soon": return regs.filter((r) => r.status === "effective-soon");
    case "federal": return regs.filter((r) => r.tier === "federal" || r.tier === "universal");
    case "industry": return regs.filter((r) => r.tier === "industry" || r.tier === "international");
    default: return regs;
  }
}

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
    <span className={`inline-flex items-center gap-1.5 text-xs px-2 py-0.5 rounded font-semibold shrink-0 ${styles[status] || styles.proposed}`}>
      <span className={`inline-block w-1.5 h-1.5 rounded-sm ${dotColors[status] || dotColors.proposed}`} aria-hidden="true" />
      {labels[status] || "PROPOSED"}
    </span>
  );
}

export default function IndividualProducts({ regulations }: { regulations: Regulation[] }) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const nonBundleRegs = regulations.filter((r) => !BUNDLE_SLUGS.has(r.slug));

  const searchFiltered = searchTerm.trim()
    ? nonBundleRegs.filter((r) => {
        const q = searchTerm.toLowerCase();
        return (
          r.shortName.toLowerCase().includes(q) ||
          r.state.toLowerCase().includes(q) ||
          r.name.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.keywords.some((k) => k.toLowerCase().includes(q))
        );
      })
    : nonBundleRegs;

  const filtered = filterRegs(searchFiltered, activeFilter);

  const counts: Record<FilterKey, number> = {
    all: searchFiltered.length,
    "in-effect": searchFiltered.filter((r) => r.status === "in-effect").length,
    "effective-soon": searchFiltered.filter((r) => r.status === "effective-soon").length,
    federal: searchFiltered.filter((r) => r.tier === "federal" || r.tier === "universal").length,
    industry: searchFiltered.filter((r) => r.tier === "industry" || r.tier === "international").length,
  };

  return (
    <>
      <div className="mb-4">
        <input
          type="search"
          aria-label="Search individual products"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by state, law, or topic..."
          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition"
        />
      </div>

      <div className="flex overflow-x-auto gap-2 mb-6 pb-1 -mx-1 px-1 scrollbar-none">
        {FILTERS.map((f) => (
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
            <span className={`ml-1.5 text-xs ${activeFilter === f.key ? "text-blue-200" : "text-gray-400"}`}>
              {counts[f.key]}
            </span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((reg) => {
          const firstSentence = reg.description.match(/^[^.!?]+[.!?]/)?.[0] ?? reg.description;
          return (
            <div key={reg.slug} className="bg-white rounded-lg border border-gray-200 p-4 hover:border-blue-600 hover:shadow-sm transition flex flex-col">
              <div className="flex justify-between items-start gap-2 mb-1">
                <h3 className="font-bold text-base font-display text-gray-900 leading-snug">{reg.shortName}</h3>
                <StatusBadge status={reg.status} />
              </div>
              <p className="text-xs text-gray-500 mb-3">
                {reg.status === "in-effect" ? "In effect" : "Effective"} {reg.effectiveDate} · {reg.state}
              </p>
              <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-4">{firstSentence}</p>
              <div className="flex items-end justify-between mb-3 pt-3 border-t border-gray-100">
                <div>
                  <span className="text-2xl font-extrabold text-gray-900 font-display leading-none">${reg.price}</span>
                  <span className="text-gray-500 text-xs ml-1">one-time</span>
                </div>
                <span className="text-gray-400 text-xs">{reg.documentCount} docs</span>
              </div>
              <Link
                href={`/products/${reg.slug}`}
                className="block text-center border border-blue-700 text-blue-700 py-2.5 rounded-lg font-semibold text-sm hover:bg-blue-50 transition"
              >
                See Details
              </Link>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-600 py-12">
          {searchTerm.trim() ? `No products match "${searchTerm}".` : "No products match this filter."}
        </p>
      )}
    </>
  );
}
