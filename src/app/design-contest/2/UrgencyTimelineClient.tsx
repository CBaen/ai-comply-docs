"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import type { Regulation } from "@/data/regulations";

function parseEffectiveDate(dateStr: string): Date | null {
  if (!dateStr || dateStr === "Available now" || dateStr.startsWith("Staggered")) {
    return null;
  }
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? null : d;
}

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

function urgencyLevel(reg: Regulation): 0 | 1 | 2 | 3 {
  const d = parseEffectiveDate(reg.effectiveDate);
  if (!d) return 0;
  const today = new Date();
  const diffDays = Math.round((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays > 0 && diffDays <= 180) return 3;
  if (diffDays > 0) return 2;
  if (diffDays >= -90) return 2;
  if (diffDays >= -365) return 1;
  return 0;
}

const HEAT_STYLES: Record<0 | 1 | 2 | 3, { ring: string; chip: string; dot: string; label: string }> = {
  3: { ring: "ring-2 ring-red-500 shadow-red-100 shadow-lg", chip: "bg-red-600 text-white", dot: "bg-red-500", label: "DEADLINE APPROACHING" },
  2: { ring: "ring-2 ring-orange-400 shadow-orange-50 shadow-md", chip: "bg-orange-500 text-white", dot: "bg-orange-400", label: "RECENTLY IN EFFECT" },
  1: { ring: "ring-1 ring-amber-300", chip: "bg-amber-100 text-amber-900", dot: "bg-amber-400", label: "IN EFFECT" },
  0: { ring: "ring-1 ring-gray-200", chip: "bg-slate-100 text-slate-600", dot: "bg-slate-400", label: "ACTIVE" },
};

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
      <div className="flex items-center justify-between mb-3 gap-2">
        <span className={`inline-flex items-center gap-1.5 text-[10px] font-extrabold px-2.5 py-1 rounded tracking-wider uppercase ${heat.chip}`}>
          <span className={`inline-block w-1.5 h-1.5 rounded-full ${heat.dot}`} aria-hidden="true" />
          {heat.label}
        </span>
        <span
          className={`text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${level >= 2 ? "bg-red-50 text-red-700" : "bg-slate-100 text-slate-600"}`}
          aria-label={`${isPast ? "Active" : "Effective in"} ${label}`}
        >
          {label}
        </span>
      </div>
      <h3 className="font-bold text-base text-slate-900 leading-snug mb-0.5">{reg.shortName}</h3>
      <p className="text-xs text-slate-500 mb-3">{reg.state} · {isPast ? "Effective" : "Takes effect"} {reg.effectiveDate}</p>
      <p className="text-sm text-slate-600 leading-relaxed flex-1 mb-4">{firstSentence}</p>
      <div className="bg-red-50 border border-red-100 rounded-lg px-3 py-2 mb-4">
        <p className="text-[11px] font-semibold text-red-700 uppercase tracking-wide mb-0.5">Non-compliance risk</p>
        <p className="text-xs text-red-800 leading-snug line-clamp-2">{reg.maxPenalty}</p>
      </div>
      <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
        <div>
          <span className="text-2xl font-extrabold text-slate-900 leading-none">${reg.price}</span>
          <span className="text-slate-500 text-xs ml-1">one-time</span>
          <div className="text-[11px] text-slate-400 mt-0.5">{reg.documentCount} documents</div>
        </div>
        {reg.ready ? (
          <Link
            href={`/products/${reg.slug}`}
            className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg font-bold text-sm transition whitespace-nowrap ${level >= 2 ? "bg-red-600 text-white hover:bg-red-700" : "bg-blue-800 text-white hover:bg-blue-900"}`}
          >
            Get compliant
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ) : (
          <Link href={`/products/${reg.slug}`} className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg font-bold text-sm bg-slate-100 text-slate-700 hover:bg-slate-200 transition whitespace-nowrap">
            Coming soon
          </Link>
        )}
      </div>
    </article>
  );
}

export default function UrgencyTimelineClient({ regulations }: { regulations: Regulation[] }) {
  const [activeFilter, setActiveFilter] = useState<"all" | "urgent" | "soon" | "universal">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const timelineRef = useRef<HTMLDivElement>(null);

  const sorted = [...regulations].sort((a, b) => {
    const da = parseEffectiveDate(a.effectiveDate);
    const db = parseEffectiveDate(b.effectiveDate);
    const today = new Date();
    const aUpcoming = da && da > today;
    const bUpcoming = db && db > today;
    if (aUpcoming && bUpcoming) return da!.getTime() - db!.getTime();
    if (aUpcoming) return -1;
    if (bUpcoming) return 1;
    if (da && db) return db.getTime() - da.getTime();
    if (da) return -1;
    if (db) return 1;
    return 0;
  });

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
      return r.shortName.toLowerCase().includes(q) || r.state.toLowerCase().includes(q) || r.name.toLowerCase().includes(q) || r.keywords.some((k) => k.toLowerCase().includes(q));
    });

  const urgentProducts = filtered.filter((r) => r.tier === "state" || r.tier === "international");
  const foundationalProducts = filtered.filter((r) => r.tier === "federal" || r.tier === "universal" || r.tier === "industry");
  const timelineNodes = sorted.filter((r) => parseEffectiveDate(r.effectiveDate) !== null).slice(0, 10);

  return (
    <main className="bg-slate-50 min-h-screen">
      {/* Timeline */}
      <section id="timeline" className="bg-white border-b border-slate-200 py-8 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-slate-900 tracking-tight">Your Compliance Timeline</h2>
            <span className="text-xs text-slate-500">Sorted oldest to newest · scroll right</span>
          </div>
          <div ref={timelineRef} className="overflow-x-auto pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 scrollbar-none" role="region" aria-label="Compliance deadline timeline">
            <div className="flex items-end gap-0 min-w-max relative">
              <div className="absolute bottom-[2.25rem] left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 via-orange-400 to-slate-300" aria-hidden="true" />
              {timelineNodes.map((reg) => {
                const level = urgencyLevel(reg);
                const heat = HEAT_STYLES[level];
                const d = parseEffectiveDate(reg.effectiveDate);
                const isPast = d ? d < new Date() : false;
                const label = urgencyLabel(reg.effectiveDate);
                return (
                  <a key={reg.slug} href={`#product-${reg.slug}`} className="flex flex-col items-center w-28 sm:w-32 shrink-0 group focus:outline-none" aria-label={`${reg.shortName} — ${label}`}>
                    <span className="text-[10px] text-slate-400 mb-1 font-mono">{d ? d.getFullYear() : "—"}</span>
                    <span className="text-[11px] font-semibold text-slate-700 text-center leading-tight mb-2 px-1 line-clamp-2 group-hover:text-blue-700 transition">{reg.shortName}</span>
                    <div className="flex flex-col items-center relative z-10 mb-3">
                      <span className={`w-3.5 h-3.5 rounded-full border-2 border-white shadow ${heat.dot} transition-transform group-hover:scale-125`} aria-hidden="true" />
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${heat.chip}`}>
                      {isPast ? "Since " : ""}{d ? d.toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "Now"}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
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

      {/* Filter bar */}
      <section className="bg-white border-b border-slate-200 py-4 sticky top-8 z-40 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <div className="flex overflow-x-auto gap-2 shrink-0 scrollbar-none">
            {([
              { key: "all" as const, label: "All products" },
              { key: "urgent" as const, label: "Active now" },
              { key: "soon" as const, label: "Coming soon" },
              { key: "universal" as const, label: "Universal" },
            ]).map(({ key, label }) => (
              <button key={key} onClick={() => setActiveFilter(key)} aria-pressed={activeFilter === key}
                className={`shrink-0 px-3.5 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${activeFilter === key ? "bg-red-600 text-white shadow-sm" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>
                {label}
              </button>
            ))}
          </div>
          <div className="flex-1 w-full sm:max-w-xs ml-auto">
            <input type="search" aria-label="Search by state, law, or topic" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search state, law, topic…"
              className="w-full px-3.5 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-600 transition" />
          </div>
        </div>
      </section>

      {/* Product grid */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {urgentProducts.length > 0 && (
          <section aria-labelledby="state-laws-heading" className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-1 h-8 bg-red-600 rounded-full" aria-hidden="true" />
              <div>
                <h2 id="state-laws-heading" className="text-lg font-bold text-slate-900">State Laws — Sorted by Urgency</h2>
                <p className="text-sm text-slate-500">Enforcement-active first. Your exposure is live.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {urgentProducts.map((reg) => <UrgencyProductCard key={reg.slug} reg={reg} />)}
            </div>
          </section>
        )}
        {foundationalProducts.length > 0 && (
          <section aria-labelledby="universal-laws-heading">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-1 h-8 bg-slate-400 rounded-full" aria-hidden="true" />
              <div>
                <h2 id="universal-laws-heading" className="text-lg font-bold text-slate-900">Foundational Compliance</h2>
                <p className="text-sm text-slate-500">Federal baselines and cross-state bundles — no specific deadline, always applicable.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {foundationalProducts.map((reg) => <UrgencyProductCard key={reg.slug} reg={reg} />)}
            </div>
          </section>
        )}
        {filtered.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            <p className="text-lg font-semibold mb-2">No matches found</p>
            <p className="text-sm">{searchTerm.trim() ? `Nothing matching "${searchTerm}".` : "No products match this filter."}</p>
          </div>
        )}

        <details className="mt-14 group">
          <summary className="cursor-pointer list-none flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-red-600 transition select-none">
            <svg className="w-4 h-4 shrink-0 text-red-500 transition-transform group-open:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            Still not sure which laws apply to you?
          </summary>
          <div className="mt-4 bg-white border border-slate-200 rounded-xl p-6 grid sm:grid-cols-3 gap-6">
            {[
              { trigger: "Using AI in hiring?", detail: "Employees in Illinois, NYC, or Colorado? You need disclosure docs.", links: [{ href: "/products/illinois-hb3773", label: "Illinois HB3773" }, { href: "/products/nyc-local-law-144", label: "NYC Local Law 144" }, { href: "/products/colorado-sb24-205", label: "Colorado SB 24-205" }, { href: "/products/multi-state-employer-ai-disclosure", label: "Multi-State Bundle" }] },
              { trigger: "Processing consumer data?", detail: "If you profile, target, or run automated decisions on customers:", links: [{ href: "/products/virginia-cdpa", label: "Virginia CDPA" }, { href: "/products/california-ccpa-admt", label: "California CCPA ADMT" }, { href: "/products/multi-state-profiling-assessment", label: "Multi-State Profiling Bundle" }] },
              { trigger: "Starting from scratch?", detail: "Inventory what you have before worrying about which laws apply:", links: [{ href: "/products/ai-system-registry", label: "AI System Registry" }, { href: "/products/ai-governance-framework", label: "AI Governance Framework" }, { href: "/products/nist-ai-rmf", label: "NIST AI RMF Guide" }] },
            ].map(({ trigger, detail, links }) => (
              <div key={trigger}>
                <p className="font-bold text-slate-800 text-sm mb-1">{trigger}</p>
                <p className="text-xs text-slate-500 mb-3">{detail}</p>
                <ul className="space-y-1.5">
                  {links.map(({ href, label }) => (
                    <li key={href}><Link href={href} className="text-xs text-blue-700 hover:underline">{label}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </details>
      </div>

      {/* Bottom CTA */}
      <section className="bg-slate-900 py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 font-display">The deadline already passed for some of these.</h2>
          <p className="text-slate-300 text-sm sm:text-base mb-7 max-w-xl mx-auto">
            The longer you wait, the higher your exposure. Email us — we&apos;ll tell you exactly which laws apply to your business and what you need to buy to be compliant.
          </p>
          <a href="mailto:info@aicompliancedocuments.com" className="inline-flex items-center gap-2 bg-red-600 text-white px-8 py-4 rounded-lg font-bold text-sm sm:text-base hover:bg-red-700 transition">
            Get clarity — email us now
          </a>
        </div>
      </section>
    </main>
  );
}
