"use client";

import { useState, useId } from "react";
import Link from "next/link";
import type { Regulation } from "@/data/regulations";

// ── Types ───────────────────────────────────────────────────────────────────

type QuizStep = 1 | 2 | 3 | "results";

interface QuizAnswers {
  states: string[];       // step 1: which states/jurisdictions
  useCases: string[];     // step 2: what kind of AI use
  urgency: string;        // step 3: how urgent / where to start
}

// ── State options ────────────────────────────────────────────────────────────

const STATE_OPTIONS = [
  { id: "illinois",     label: "Illinois",        img: null },
  { id: "new-york",     label: "New York / NYC",  img: null },
  { id: "colorado",     label: "Colorado",        img: null },
  { id: "california",   label: "California",      img: null },
  { id: "texas",        label: "Texas",           img: null },
  { id: "virginia",     label: "Virginia",        img: null },
  { id: "connecticut",  label: "Connecticut",     img: null },
  { id: "delaware",     label: "Delaware",        img: null },
  { id: "multiple",     label: "Multiple states", img: null },
  { id: "national",     label: "Nationwide",      img: null },
];

// ── Use-case options ─────────────────────────────────────────────────────────

const USE_CASE_OPTIONS = [
  {
    id: "hiring",
    label: "AI in hiring or HR",
    description: "Screening candidates, performance tools, promotion decisions",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    id: "consumer-data",
    label: "Consumer data / profiling",
    description: "Targeted ads, automated decisions, customer data processing",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    id: "ai-governance",
    label: "General AI governance",
    description: "Deploying or developing AI systems, risk management, documentation",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    id: "healthcare",
    label: "Healthcare AI",
    description: "Clinical decisions, patient data, health system AI tools",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
  {
    id: "financial",
    label: "Financial services AI",
    description: "Credit decisions, lending, fraud detection, investment tools",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: "not-sure",
    label: "Not sure yet",
    description: "Help me figure out what I have and what applies",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
      </svg>
    ),
  },
];

// ── Urgency options ──────────────────────────────────────────────────────────

const URGENCY_OPTIONS = [
  {
    id: "now",
    label: "Laws in effect now",
    description: "Already active — penalties are live",
    badge: "Most urgent",
    badgeColor: "bg-red-100 text-red-800",
  },
  {
    id: "soon",
    label: "Laws effective soon",
    description: "Effective within the next 12 months",
    badge: "Prepare ahead",
    badgeColor: "bg-amber-100 text-amber-800",
  },
  {
    id: "all",
    label: "Show me everything",
    description: "All packages that match my states and use cases",
    badge: "Full picture",
    badgeColor: "bg-blue-100 text-blue-800",
  },
];

// ── Matching logic ───────────────────────────────────────────────────────────

function matchRegulations(
  regulations: Regulation[],
  answers: QuizAnswers
): { primary: Regulation[]; secondary: Regulation[] } {
  const { states, useCases, urgency } = answers;

  const stateKeywords: Record<string, string[]> = {
    illinois:    ["illinois", "hb3773", "hb 3773"],
    "new-york":  ["new york", "nyc", "local law 144", "aedt"],
    colorado:    ["colorado", "sb24-205", "sb 24-205"],
    california:  ["california", "ccpa", "admt"],
    texas:       ["texas", "tdpsa", "traiga", "hb149"],
    virginia:    ["virginia", "cdpa", "vcdpa"],
    connecticut: ["connecticut", "ctdpa"],
    delaware:    ["delaware", "pdpa"],
    multiple:    ["multi-state", "bundle", "multi-jurisdiction"],
    national:    ["federal", "universal", "multi-state", "bundle", "national"],
  };

  const useCaseKeywords: Record<string, string[]> = {
    hiring:           ["hiring", "employment", "employer", "aedt", "automated hiring", "candidate", "hb3773", "local law 144", "sb24-205"],
    "consumer-data":  ["consumer privacy", "profiling", "data privacy", "targeted advertising", "data protection", "tdpsa", "cdpa", "ctdpa", "pdpa", "ccpa"],
    "ai-governance":  ["ai governance", "governance", "framework", "registry", "developer", "deployer", "traiga", "risk management", "nist"],
    healthcare:       ["healthcare", "clinical", "health", "hipaa", "patient"],
    financial:        ["financial", "credit", "lending", "fraud", "investment"],
    "not-sure":       [],
  };

  const includesNotSure = useCases.includes("not-sure");
  const includesNational = states.includes("national") || states.includes("multiple");

  function scoreRegulation(reg: Regulation): number {
    let score = 0;
    const regText = [reg.shortName, reg.name, reg.description, reg.category, reg.state, ...reg.keywords].join(" ").toLowerCase();

    if (states.length === 0 || includesNational) {
      score += 1;
    } else {
      for (const s of states) {
        const keywords = stateKeywords[s] ?? [];
        if (keywords.some((kw) => regText.includes(kw))) { score += 3; break; }
      }
      if (reg.tier === "universal" || reg.state === "Multi-State" || reg.state === "Multi-Jurisdiction") score += 2;
    }

    if (includesNotSure || useCases.length === 0) {
      score += 1;
    } else {
      for (const uc of useCases) {
        const keywords = useCaseKeywords[uc] ?? [];
        if (keywords.some((kw) => regText.includes(kw))) { score += 3; break; }
        if (uc === "consumer-data" && reg.category === "Consumer Privacy") score += 2;
        if (uc === "hiring" && reg.category === "Employment") score += 2;
        if (uc === "ai-governance" && reg.category === "AI Governance") score += 2;
      }
    }

    if (urgency === "now" && reg.status === "in-effect") score += 2;
    if (urgency === "soon" && reg.status === "effective-soon") score += 2;
    if (urgency === "all") score += 1;
    if (urgency === "now" && reg.status !== "in-effect") score -= 1;

    return score;
  }

  const scored = regulations.map((reg) => ({ reg, score: scoreRegulation(reg) })).sort((a, b) => b.score - a.score);
  const primary = scored.filter((s) => s.score >= 5).map((s) => s.reg);
  const secondary = scored.filter((s) => s.score >= 2 && s.score < 5).map((s) => s.reg).slice(0, 4);

  return { primary, secondary };
}

// ── Progress bar ─────────────────────────────────────────────────────────────

function ProgressBar({ step }: { step: QuizStep }) {
  const steps = [1, 2, 3];
  const current = step === "results" ? 4 : (step as number);
  return (
    <div className="flex items-center gap-2 mb-8" role="progressbar" aria-valuenow={current} aria-valuemin={1} aria-valuemax={4} aria-label="Quiz progress">
      {steps.map((s) => (
        <div key={s} className="flex items-center gap-2">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${current > s ? "bg-blue-700 text-white" : current === s ? "bg-blue-700 text-white ring-4 ring-blue-200" : "bg-slate-200 text-slate-500"}`}>
            {current > s ? (
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            ) : s}
          </div>
          {s < 3 && <div className={`h-0.5 w-8 sm:w-12 rounded transition-all ${current > s ? "bg-blue-700" : "bg-slate-200"}`} />}
        </div>
      ))}
      <div className={`ml-2 h-0.5 w-8 sm:w-12 rounded transition-all ${step === "results" ? "bg-blue-700" : "bg-slate-200"}`} />
      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step === "results" ? "bg-green-600 text-white" : "bg-slate-200 text-slate-500"}`}>
        {step === "results" ? "✓" : "4"}
      </div>
      <span className="ml-3 text-xs text-slate-500 font-medium">
        {step === "results" ? "Your matches" : `Step ${step} of 3`}
      </span>
    </div>
  );
}

// ── Status badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; className: string }> = {
    "in-effect":      { label: "IN EFFECT",      className: "bg-red-100 text-red-800" },
    "effective-soon": { label: "EFFECTIVE SOON",  className: "bg-amber-100 text-amber-800" },
    proposed:         { label: "PROPOSED",        className: "bg-slate-100 text-slate-600" },
  };
  const { label, className } = map[status] ?? map.proposed;
  return (
    <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded font-bold shrink-0 ${className}`}>
      <span className={`inline-block w-1.5 h-1.5 rounded-sm ${status === "in-effect" ? "bg-red-500" : status === "effective-soon" ? "bg-amber-500" : "bg-slate-400"}`} aria-hidden="true" />
      {label}
    </span>
  );
}

// ── Product card ─────────────────────────────────────────────────────────────

function ProductCard({ reg, isPrimary }: { reg: Regulation; isPrimary: boolean }) {
  const firstSentence = reg.description.match(/^[^.!?]+[.!?]/)?.[0] ?? reg.description;
  return (
    <div className={`bg-white rounded-xl border flex flex-col transition group ${isPrimary ? "border-blue-200 shadow-md hover:border-blue-500 hover:shadow-lg" : "border-gray-200 hover:border-blue-300 hover:shadow-md"}`}>
      {isPrimary && (
        <div className="bg-blue-700 text-white text-xs font-bold px-4 py-1.5 rounded-t-xl flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Matches your answers
        </div>
      )}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start gap-2 mb-1">
          <h3 className="font-bold text-base sm:text-lg font-display text-gray-900 leading-snug group-hover:text-blue-700 transition">
            {reg.shortName}
          </h3>
          <StatusBadge status={reg.status} />
        </div>
        <p className="text-xs text-gray-500 mb-3">
          {reg.status === "in-effect" ? "In effect" : "Effective"} {reg.effectiveDate} · {reg.state}
        </p>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-1">{firstSentence}</p>
        {reg.appliesToBullets && reg.appliesToBullets.length > 0 && (
          <ul className="mb-4 space-y-1">
            {reg.appliesToBullets.slice(0, 2).map((b, i) => (
              <li key={i} className="flex items-start gap-1.5 text-xs text-gray-600">
                <svg className="w-3.5 h-3.5 text-green-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                {b}
              </li>
            ))}
          </ul>
        )}
        <div className="flex items-end justify-between mb-4 pt-3 border-t border-gray-100">
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-display leading-none">${reg.price}</span>
            <span className="text-gray-500 text-xs ml-1">one-time</span>
          </div>
          <span className="text-gray-500 text-xs">{reg.documentCount} documents</span>
        </div>
        <Link
          href={`/products/${reg.slug}`}
          className={`block text-center py-3 rounded-lg font-semibold text-sm transition ${isPrimary ? "bg-blue-800 text-white hover:bg-blue-900" : "bg-slate-50 border border-gray-200 text-gray-700 hover:border-blue-300 hover:text-blue-700"}`}
        >
          {isPrimary ? "See Details & Buy" : "See Details"}
        </Link>
      </div>
    </div>
  );
}

// ── Results view ─────────────────────────────────────────────────────────────

function ResultsView({
  primary,
  secondary,
  answers,
  allRegulations,
  onReset,
  onEditAnswers,
}: {
  primary: Regulation[];
  secondary: Regulation[];
  answers: QuizAnswers;
  allRegulations: Regulation[];
  onReset: () => void;
  onEditAnswers: (step: QuizStep) => void;
}) {
  const [showAll, setShowAll] = useState(false);
  const totalMatched = primary.length + secondary.length;

  return (
    <div>
      <div className="bg-white border border-slate-200 rounded-xl p-4 mb-8 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
        <div className="flex-1">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Your answers</p>
          <div className="flex flex-wrap gap-2">
            {answers.states.length > 0 && (
              <button onClick={() => onEditAnswers(1)} className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full hover:bg-blue-100 hover:text-blue-700 transition">
                {answers.states.map(s => STATE_OPTIONS.find(o => o.id === s)?.label ?? s).join(", ")}
              </button>
            )}
            {answers.useCases.length > 0 && (
              <button onClick={() => onEditAnswers(2)} className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full hover:bg-blue-100 hover:text-blue-700 transition">
                {answers.useCases.map(u => USE_CASE_OPTIONS.find(o => o.id === u)?.label ?? u).join(", ")}
              </button>
            )}
            {answers.urgency && (
              <button onClick={() => onEditAnswers(3)} className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full hover:bg-blue-100 hover:text-blue-700 transition">
                {URGENCY_OPTIONS.find(o => o.id === answers.urgency)?.label ?? answers.urgency}
              </button>
            )}
          </div>
        </div>
        <button onClick={onReset} className="text-xs text-blue-700 font-semibold hover:underline shrink-0 self-start sm:self-center">Start over</button>
      </div>

      {primary.length > 0 ? (
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold font-display text-gray-900 mb-1">
            {primary.length === 1 ? "1 package" : `${primary.length} packages`} match your situation
          </h2>
          <p className="text-sm text-gray-600">Based on your answers. Click any card to see the full details and documents included.</p>
        </div>
      ) : (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-8">
          <p className="font-semibold text-blue-900 mb-1">No exact matches found</p>
          <p className="text-sm text-blue-800">
            We couldn&apos;t narrow it to a specific match, but here are the most relevant packages below.
            You can also{" "}
            <button onClick={() => setShowAll(true)} className="underline font-semibold">browse everything</button>
            {" "}or{" "}
            <a href="mailto:info@aicompliancedocuments.com" className="underline font-semibold">email us</a>
            {" "}for a personal recommendation.
          </p>
        </div>
      )}

      {primary.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10">
          {primary.map((reg) => <ProductCard key={reg.slug} reg={reg} isPrimary={true} />)}
        </div>
      )}

      {secondary.length > 0 && (
        <div className="mb-10">
          <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-4">Also worth considering</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {secondary.map((reg) => <ProductCard key={reg.slug} reg={reg} isPrimary={false} />)}
          </div>
        </div>
      )}

      {!showAll && totalMatched < allRegulations.length && (
        <div className="text-center py-6 border-t border-slate-200">
          <p className="text-sm text-slate-600 mb-3">Showing {totalMatched} of {allRegulations.length} packages based on your answers.</p>
          <button onClick={() => setShowAll(true)} className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900 transition">
            Show all {allRegulations.length} packages
          </button>
        </div>
      )}

      {showAll && (
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-4">All packages</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {allRegulations
              .filter((r) => !primary.some((p) => p.slug === r.slug) && !secondary.some((s) => s.slug === r.slug))
              .map((reg) => <ProductCard key={reg.slug} reg={reg} isPrimary={false} />)}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────

export default function QuizGuidedLibrary({ regulations }: { regulations: Regulation[] }) {
  const [step, setStep] = useState<QuizStep>(1);
  const [answers, setAnswers] = useState<QuizAnswers>({ states: [], useCases: [], urgency: "" });
  const headingId = useId();

  const toggleState = (id: string) => setAnswers((prev) => ({ ...prev, states: prev.states.includes(id) ? prev.states.filter((s) => s !== id) : [...prev.states, id] }));
  const toggleUseCase = (id: string) => setAnswers((prev) => ({ ...prev, useCases: prev.useCases.includes(id) ? prev.useCases.filter((u) => u !== id) : [...prev.useCases, id] }));
  const selectUrgency = (id: string) => setAnswers((prev) => ({ ...prev, urgency: id }));
  const handleReset = () => { setAnswers({ states: [], useCases: [], urgency: "" }); setStep(1); };
  const handleEditAnswers = (targetStep: QuizStep) => setStep(targetStep);

  const results = step === "results" ? matchRegulations(regulations, answers) : { primary: [], secondary: [] };

  return (
    <div>
      <ProgressBar step={step} />

      {step === 1 && (
        <div>
          <div className="mb-6">
            <h2 id={headingId} className="text-xl sm:text-2xl font-bold font-display text-gray-900 mb-1">Where does your business operate?</h2>
            <p className="text-sm text-gray-600">Select all that apply. We&rsquo;ll only show you laws that affect your locations.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8" role="group" aria-labelledby={headingId}>
            {STATE_OPTIONS.map((opt) => {
              const selected = answers.states.includes(opt.id);
              return (
                <button key={opt.id} onClick={() => toggleState(opt.id)} aria-pressed={selected}
                  className={`relative flex flex-col items-center justify-center text-center p-3 sm:p-4 rounded-xl border-2 font-medium text-sm transition ${selected ? "border-blue-700 bg-blue-50 text-blue-900" : "border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-slate-50"}`}>
                  {selected && (
                    <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-blue-700 rounded-full flex items-center justify-center" aria-hidden="true">
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                    </span>
                  )}
                  <div className={`w-8 h-8 rounded-full mb-2 flex items-center justify-center text-lg font-bold ${selected ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-500"}`}>{opt.label.charAt(0)}</div>
                  <span className="leading-tight">{opt.label}</span>
                </button>
              );
            })}
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-500">{answers.states.length === 0 ? "Select at least one state to continue" : `${answers.states.length} selected`}</p>
            <button onClick={() => setStep(2)} disabled={answers.states.length === 0}
              className="inline-flex items-center gap-2 bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-blue-900 transition disabled:opacity-40 disabled:cursor-not-allowed">
              Next: What kind of AI?
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold font-display text-gray-900 mb-1">What kind of AI does your business use?</h2>
            <p className="text-sm text-gray-600">Select all that apply.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
            {USE_CASE_OPTIONS.map((opt) => {
              const selected = answers.useCases.includes(opt.id);
              return (
                <button key={opt.id} onClick={() => toggleUseCase(opt.id)} aria-pressed={selected}
                  className={`flex items-start gap-3 p-4 rounded-xl border-2 text-left transition ${selected ? "border-blue-700 bg-blue-50" : "border-gray-200 bg-white hover:border-blue-300 hover:bg-slate-50"}`}>
                  <span className={`shrink-0 mt-0.5 ${selected ? "text-blue-700" : "text-slate-500"}`}>{opt.icon}</span>
                  <span className="flex flex-col gap-0.5">
                    <span className={`font-semibold text-sm ${selected ? "text-blue-900" : "text-gray-900"}`}>{opt.label}</span>
                    <span className="text-xs text-gray-500 leading-relaxed">{opt.description}</span>
                  </span>
                  {selected && (
                    <span className="ml-auto shrink-0 w-5 h-5 bg-blue-700 rounded-full flex items-center justify-center" aria-hidden="true">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <div className="flex items-center justify-between">
            <button onClick={() => setStep(1)} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
              Back
            </button>
            <button onClick={() => setStep(3)} disabled={answers.useCases.length === 0}
              className="inline-flex items-center gap-2 bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-blue-900 transition disabled:opacity-40 disabled:cursor-not-allowed">
              Next: How urgent?
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold font-display text-gray-900 mb-1">Where do you want to start?</h2>
            <p className="text-sm text-gray-600">Choose one — you can always adjust later.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {URGENCY_OPTIONS.map((opt) => {
              const selected = answers.urgency === opt.id;
              return (
                <button key={opt.id} onClick={() => selectUrgency(opt.id)} aria-pressed={selected}
                  className={`flex flex-col p-5 rounded-xl border-2 text-left transition ${selected ? "border-blue-700 bg-blue-50" : "border-gray-200 bg-white hover:border-blue-300 hover:bg-slate-50"}`}>
                  <span className={`inline-flex items-center text-xs font-bold px-2 py-0.5 rounded mb-3 ${opt.badgeColor}`}>{opt.badge}</span>
                  <span className={`font-bold text-base mb-1 ${selected ? "text-blue-900" : "text-gray-900"}`}>{opt.label}</span>
                  <span className="text-xs text-gray-500 leading-relaxed">{opt.description}</span>
                  {selected && (
                    <span className="mt-3 flex items-center gap-1 text-xs text-blue-700 font-semibold">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                      Selected
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <div className="flex items-center justify-between">
            <button onClick={() => setStep(2)} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
              Back
            </button>
            <button onClick={() => setStep("results")} disabled={!answers.urgency}
              className="inline-flex items-center gap-2 bg-green-700 text-white px-7 py-3 rounded-lg font-bold text-sm hover:bg-green-800 transition disabled:opacity-40 disabled:cursor-not-allowed shadow-sm">
              Show my matches
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </button>
          </div>
        </div>
      )}

      {step === "results" && (
        <ResultsView
          primary={results.primary}
          secondary={results.secondary}
          answers={answers}
          allRegulations={regulations}
          onReset={handleReset}
          onEditAnswers={handleEditAnswers}
        />
      )}

      {step !== "results" && (
        <div className="mt-8 pt-8 border-t border-slate-200 text-center">
          <p className="text-xs text-slate-500 mb-2">Just want to browse everything?</p>
          <button
            onClick={() => { setAnswers({ states: ["national"], useCases: ["not-sure"], urgency: "all" }); setStep("results"); }}
            className="text-sm font-semibold text-blue-700 hover:text-blue-900 hover:underline transition"
          >
            Skip quiz — show all {regulations.length} packages
          </button>
        </div>
      )}
    </div>
  );
}
