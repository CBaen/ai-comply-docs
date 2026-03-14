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
        <span className="inline-block w-1.5 h-1.5 rounded-sm bg-slate-400" />
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
      <div className="flex items-center gap-2 mb-3">
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
          Upcoming Compliance Deadlines
        </h3>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {urgent.map((r) => (
          <Link
            key={r.slug}
            href={`/regulations/${r.slug}`}
            className="flex items-center justify-between bg-white border border-red-100 rounded p-3 hover:border-red-300 transition group"
          >
            <div>
              <p className="font-semibold text-gray-900 text-sm group-hover:text-blue-700 transition">
                {r.shortName}
              </p>
              <p className="text-xs text-gray-500">{r.state}</p>
            </div>
            <div className="text-right shrink-0 ml-3">
              <p className="text-sm font-bold text-red-700">
                {r.effectiveDate}
              </p>
              <p className="text-xs text-gray-500">{r.maxPenalty}</p>
            </div>
          </Link>
        ))}
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
  const filtered = filterRegulations(regulations, activeFilter);

  const counts: Record<FilterKey, number> = {
    all: regulations.length,
    "in-effect": regulations.filter((r) => r.status === "in-effect").length,
    "effective-soon": regulations.filter((r) => r.status === "effective-soon")
      .length,
    federal: regulations.filter(
      (r) => r.tier === "federal" || r.tier === "universal"
    ).length,
    industry: regulations.filter(
      (r) => r.tier === "industry" || r.tier === "international"
    ).length,
  };

  return (
    <>
      <DeadlineBanner regulations={regulations} />

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-8" role="tablist">
        {filters.map((f) => (
          <button
            key={f.key}
            role="tab"
            aria-selected={activeFilter === f.key}
            onClick={() => setActiveFilter(f.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              activeFilter === f.key
                ? "bg-blue-800 text-white shadow-sm"
                : "bg-white border border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-700"
            }`}
          >
            {f.label}
            <span
              className={`ml-1.5 text-xs ${activeFilter === f.key ? "text-blue-200" : "text-gray-400"}`}
            >
              {counts[f.key]}
            </span>
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((reg) => (
          <div
            key={reg.slug}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:border-blue-700 hover:shadow-md transition flex flex-col"
          >
            <div className="flex justify-between items-start mb-3 gap-2">
              <div className="min-w-0">
                <h3 className="font-bold text-lg font-display text-gray-900 leading-snug">
                  {reg.shortName}
                </h3>
                <p className="text-gray-500 text-xs mt-0.5 truncate">
                  {reg.citation}
                </p>
              </div>
              <StatusBadge status={reg.status} ready={reg.ready} />
            </div>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-1">
              {reg.description.length > 140
                ? reg.description.slice(0, 140) + "..."
                : reg.description}
            </p>
            <div className="flex items-center justify-between mb-4 pt-2 border-t border-gray-100">
              <span className="text-2xl font-bold text-gray-900 font-display">
                ${reg.price}
              </span>
              <span className="text-gray-500 text-xs">
                {reg.documentCount} documents
              </span>
            </div>
            {reg.ready ? (
              <Link
                href={`/regulations/${reg.slug}`}
                className="block text-center bg-blue-800 text-white py-3 rounded-lg font-semibold text-sm hover:bg-blue-900 transition"
              >
                View Package
              </Link>
            ) : (
              <Link
                href={`/regulations/${reg.slug}`}
                className="block text-center bg-slate-50 border border-gray-200 text-gray-700 py-3 rounded-lg font-semibold text-sm hover:border-blue-300 hover:text-blue-700 transition"
              >
                Coming Soon — Learn More
              </Link>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-500 py-12">
          No products match this filter.
        </p>
      )}
    </>
  );
}
