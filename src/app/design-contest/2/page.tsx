import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { regulations } from "@/data/regulations";
import UrgencyTimelineClient from "./UrgencyTimelineClient";

export const metadata: Metadata = {
  title: "Design Contest #2 — Urgency Timeline",
  robots: { index: false, follow: false },
};

export default function Design2Page() {
  const ready = regulations.filter((r) => r.ready);
  const inEffect = ready.filter((r) => r.status === "in-effect").length;
  const soonCount = ready.filter((r) => r.status === "effective-soon").length;

  return (
    <>
      <Nav />
      {/* Sticky urgency bar */}
      <div
        aria-live="polite"
        className="sticky top-0 z-50 bg-red-600 text-white text-xs sm:text-sm py-2 px-4 flex items-center justify-between gap-2"
      >
        <span className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-white animate-pulse" aria-hidden="true" />
          <strong>{inEffect} AI laws are in active enforcement</strong>
          {soonCount > 0 && (
            <span className="hidden sm:inline text-red-200">· {soonCount} more take effect this year</span>
          )}
        </span>
        <a href="#timeline" className="shrink-0 underline underline-offset-2 hover:no-underline text-red-100 font-medium">
          See deadlines
        </a>
      </div>

      {/* Hero */}
      <header className="relative bg-slate-900 text-white py-14 md:py-24 overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <img src="/images/landing/professional-reviewing-documents.png" alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900/60" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 border border-red-500/60 bg-red-600/20 text-red-300 text-xs font-semibold px-3 py-1.5 rounded mb-5 tracking-wide uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" aria-hidden="true" />
            Enforcement is live — not coming soon
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] mb-5">
            Stop counting on<br />
            <span className="text-red-400">&ldquo;we&apos;ll deal with it later.&rdquo;</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed mb-8">
            {inEffect} state and federal AI laws are already in enforcement. Each one comes with its own deadline, penalty, and documentation requirement. This page is sorted by urgency — so you see what you need <em>right now</em>.
          </p>
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
            <a href="#timeline" className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3.5 rounded-lg font-bold text-sm hover:bg-red-700 transition">
              See my deadlines
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
            <a href="mailto:info@aicompliancedocuments.com" className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-6 py-3.5 rounded-lg font-bold text-sm hover:bg-white/20 transition">
              Not sure what applies? Email us
            </a>
          </div>
        </div>
      </header>

      <UrgencyTimelineClient regulations={ready} />
      <Footer />
    </>
  );
}
