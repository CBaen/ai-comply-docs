"use client";

import { useState } from "react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Recommendation {
  name: string;
  slug: string;
  price: number;
  reason: string;
  isAddOn?: boolean;
}

interface Answers {
  q1: string | null;
  q2: string[];
  q3: string | null;
  q4: string | null;
  q5: string | null;
}

// ─── State → slug map for consumer data privacy laws ─────────────────────────

const STATE_PRIVACY_SLUGS: Record<string, { slug: string; name: string; price: number }> = {
  California: { slug: "california-ccpa-admt", name: "California CCPA ADMT", price: 499 },
  Virginia: { slug: "virginia-cdpa", name: "Virginia CDPA", price: 249 },
  Connecticut: { slug: "connecticut-ctdpa", name: "Connecticut CTDPA", price: 249 },
  Oregon: { slug: "oregon-cpa", name: "Oregon CPA", price: 249 },
  Texas: { slug: "texas-tdpsa", name: "Texas TDPSA", price: 249 },
  Delaware: { slug: "delaware-pdpa", name: "Delaware PDPA", price: 249 },
  Minnesota: { slug: "minnesota-mcdpa", name: "Minnesota MCDPA", price: 349 },
  Montana: { slug: "montana-mcdpa", name: "Montana MCDPA", price: 249 },
  Indiana: { slug: "indiana-icdpa", name: "Indiana ICDPA", price: 249 },
  Kentucky: { slug: "kentucky-kcdpa", name: "Kentucky KCDPA", price: 249 },
  "New Jersey": { slug: "new-jersey-njdpa", name: "New Jersey NJDPA", price: 249 },
};

const HIRING_STATE_SLUGS: Record<string, { slug: string; name: string; price: number }> = {
  Illinois: { slug: "illinois-hb3773", name: "Illinois HB3773", price: 299 },
  "New York City": { slug: "nyc-local-law-144", name: "NYC Local Law 144", price: 399 },
  Colorado: { slug: "colorado-sb24-205", name: "Colorado SB 24-205", price: 449 },
};

// ─── Recommendation engine ────────────────────────────────────────────────────

function computeRecommendations(answers: Answers): Recommendation[] {
  const recs: Recommendation[] = [];
  const added = new Set<string>();

  const push = (r: Recommendation) => {
    if (!added.has(r.slug)) {
      added.add(r.slug);
      recs.push(r);
    }
  };

  const { q1, q2, q4, q5 } = answers;

  // ── Hiring logic ──────────────────────────────────────────────────────────
  if (q1 === "hiring") {
    const hiringStates = q2.filter((s) => s in HIRING_STATE_SLUGS);
    const hasMultipleHiringStates = hiringStates.length > 1;

    if (hasMultipleHiringStates) {
      push({
        name: "Multi-State Employer AI Disclosure Kit",
        slug: "multi-state-employer-ai-disclosure",
        price: 299,
        reason:
          "You selected multiple states with employer AI hiring laws (Illinois, NYC, Colorado). This bundle covers all three in one package.",
      });
    } else {
      hiringStates.forEach((state) => {
        const reg = HIRING_STATE_SLUGS[state];
        push({
          name: reg.name,
          slug: reg.slug,
          price: reg.price,
          reason: `${state} has a specific employer AI law that applies to businesses using automated tools in hiring or promotion decisions.`,
        });
      });
    }

    // If hiring states selected but none are the specific hiring law states
    if (hiringStates.length === 0 && q2.length > 0 && !q2.includes("none")) {
      push({
        name: "EEOC AI Hiring Compliance",
        slug: "eeoc-ai-hiring",
        price: 349,
        reason:
          "Federal EEOC guidance on AI in hiring applies nationwide regardless of which states your employees are in.",
      });
    }
  }

  // ── Customer data / consumer privacy logic ────────────────────────────────
  if (q1 === "customer-data") {
    const privacyStates = q2.filter((s) => s in STATE_PRIVACY_SLUGS);
    const hasMultiplePrivacyStates = privacyStates.length > 1;

    if (hasMultiplePrivacyStates) {
      push({
        name: "Multi-State Profiling Assessment Bundle",
        slug: "multi-state-profiling-assessment",
        price: 399,
        reason:
          "You selected multiple states with consumer data privacy laws. This bundle covers 15+ states with one assessment framework.",
      });
    } else {
      privacyStates.forEach((state) => {
        const reg = STATE_PRIVACY_SLUGS[state];
        push({
          name: reg.name,
          slug: reg.slug,
          price: reg.price,
          reason: `${state} requires documented data protection assessments for businesses using personal data for profiling or automated decisions.`,
        });
      });
    }

    // If they sell/share data or use for targeted ads → add Consumer kits
    if (q4 === "yes") {
      push({
        name: "Consumer Rights Kit",
        slug: "consumer-rights-kit",
        price: 59,
        reason:
          "Since you sell or share personal data, you need documented consumer rights request procedures for opt-out, deletion, and access requests.",
        isAddOn: true,
      });
      push({
        name: "Consumer Notice Kit",
        slug: "consumer-notice-kit",
        price: 49,
        reason:
          "Targeted advertising requires consumer-facing notices explaining how their data is used and their rights.",
        isAddOn: true,
      });
    }
  }

  // ── Healthcare ────────────────────────────────────────────────────────────
  if (q1 === "healthcare") {
    push({
      name: "Healthcare AI / HIPAA Compliance",
      slug: "healthcare-ai-compliance",
      price: 497,
      reason:
        "Healthcare AI systems that influence patient decisions require HIPAA-aligned documentation, bias assessments, and transparency disclosures.",
    });
  }

  // ── Financial services ────────────────────────────────────────────────────
  if (q1 === "financial") {
    push({
      name: "Financial Services AI Compliance",
      slug: "financial-services-ai",
      price: 597,
      reason:
        "AI used in lending or financial decisions is subject to ECOA, fair lending requirements, and model risk management documentation obligations.",
    });
  }

  // ── EU / International ────────────────────────────────────────────────────
  if (q2.includes("EU / International")) {
    push({
      name: "EU AI Act Compliance Package",
      slug: "eu-ai-act",
      price: 997,
      reason:
        "The EU AI Act applies to any organization deploying AI to EU residents, with mandatory conformity assessments, transparency requirements, and prohibited use documentation.",
    });
  }

  // ── None / not sure on Q1 → starter recommendations ──────────────────────
  if (q1 === "none") {
    push({
      name: "AI System Registry",
      slug: "ai-system-registry",
      price: 199,
      reason:
        "The best starting point: document every AI tool your business uses before figuring out which laws apply.",
    });
    push({
      name: "AI Governance Framework",
      slug: "ai-governance-framework",
      price: 349,
      reason:
        "A foundational policy and governance structure that satisfies baseline requirements across most AI laws, even if you aren't sure which apply yet.",
    });
  }

  // ── Q5: Nothing yet → add AI Governance Framework as a foundation ─────────
  if (q5 === "nothing" || q5 === "dont-know") {
    push({
      name: "AI Governance Framework",
      slug: "ai-governance-framework",
      price: 349,
      reason:
        "Before anything else: a documented governance framework demonstrates good-faith compliance effort and is a prerequisite for most other compliance programs.",
    });
  }

  // ── Always recommend Annual Compliance Review as add-on ──────────────────
  push({
    name: "Annual Compliance Review",
    slug: "annual-compliance-review",
    price: 49,
    reason:
      "AI laws change. An annual review checklist ensures your documentation stays current as laws are amended and new ones take effect.",
    isAddOn: true,
  });

  return recs;
}

// ─── Step indicator ───────────────────────────────────────────────────────────

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-1.5 mb-8 flex-wrap">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center gap-1.5">
          <div
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-colors ${
              i + 1 < current
                ? "bg-blue-700 text-white"
                : i + 1 === current
                ? "bg-blue-700 text-white ring-2 ring-blue-300 ring-offset-2"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            {i + 1 < current ? (
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              i + 1
            )}
          </div>
          {i < total - 1 && (
            <div
              className={`h-0.5 w-4 sm:w-6 transition-colors ${
                i + 1 < current ? "bg-blue-700" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
      <span className="ml-1 text-xs sm:text-sm text-gray-500 font-medium">
        Question {current} of {total}
      </span>
    </div>
  );
}

// ─── Option button ────────────────────────────────────────────────────────────

function OptionButton({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-5 py-4 rounded-lg border-2 font-medium transition-all ${
        selected
          ? "border-blue-700 bg-blue-50 text-blue-900"
          : "border-gray-200 bg-white text-gray-800 hover:border-blue-300 hover:bg-blue-50/50"
      }`}
    >
      <span className="flex items-center gap-3">
        <span
          className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
            selected ? "border-blue-700 bg-blue-700" : "border-gray-300"
          }`}
        >
          {selected && (
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </span>
        {label}
      </span>
    </button>
  );
}

// ─── Checkbox option button ───────────────────────────────────────────────────

function CheckboxOption({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-5 py-4 rounded-lg border-2 font-medium transition-all ${
        selected
          ? "border-blue-700 bg-blue-50 text-blue-900"
          : "border-gray-200 bg-white text-gray-800 hover:border-blue-300 hover:bg-blue-50/50"
      }`}
    >
      <span className="flex items-center gap-3">
        <span
          className={`w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
            selected ? "border-blue-700 bg-blue-700" : "border-gray-300"
          }`}
        >
          {selected && (
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </span>
        {label}
      </span>
    </button>
  );
}

// ─── Results card ─────────────────────────────────────────────────────────────

function ResultsCard({
  recommendations,
  onRestart,
}: {
  recommendations: Recommendation[];
  onRestart: () => void;
}) {
  const primary = recommendations.filter((r) => !r.isAddOn);
  const addOns = recommendations.filter((r) => r.isAddOn);

  return (
    <div>
      {/* Green header */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-green-100 border-2 border-green-300 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold font-display text-green-900 mb-1">
              Based on your answers, here&apos;s what applies to you:
            </h2>
            <p className="text-green-700 text-sm">
              {primary.length > 0
                ? `We identified ${primary.length} compliance package${primary.length === 1 ? "" : "s"} that match your situation.`
                : "Review the recommendations below to get started with AI compliance."}
            </p>
          </div>
        </div>
      </div>

      {/* Primary recommendations */}
      {primary.length > 0 && (
        <div className="mb-8">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">
            Recommended packages
          </h3>
          <div className="space-y-4">
            {primary.map((rec) => (
              <div
                key={rec.slug}
                className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-bold text-gray-900 text-base">{rec.name}</h4>
                      <span className="text-blue-700 font-bold text-sm">${rec.price}</span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{rec.reason}</p>
                  </div>
                  <Link
                    href={`/regulations/${rec.slug}`}
                    className="flex-shrink-0 inline-flex items-center gap-1.5 bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-blue-800 transition whitespace-nowrap"
                  >
                    View Package
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add-on recommendations */}
      {addOns.length > 0 && (
        <div className="mb-8">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">
            Recommended add-ons
          </h3>
          <div className="space-y-3">
            {addOns.map((rec) => (
              <div
                key={rec.slug}
                className="bg-slate-50 border border-slate-200 rounded-xl p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1.5">
                      <h4 className="font-semibold text-gray-900 text-sm">{rec.name}</h4>
                      <span className="text-slate-600 font-semibold text-sm">${rec.price}</span>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed">{rec.reason}</p>
                  </div>
                  <Link
                    href={`/regulations/${rec.slug}`}
                    className="flex-shrink-0 inline-flex items-center gap-1 text-blue-700 font-semibold text-sm hover:text-blue-900 transition whitespace-nowrap"
                  >
                    View →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer actions */}
      <div className="flex flex-col sm:flex-row items-center gap-4 pt-6 border-t border-gray-200">
        <a
          href="mailto:info@aicompliancedocuments.com"
          className="text-sm text-gray-600 hover:text-blue-700 transition"
        >
          Not sure about these recommendations?{" "}
          <span className="text-blue-700 font-medium underline">Email us</span>
        </a>
        <button
          onClick={onRestart}
          className="sm:ml-auto text-sm text-gray-500 hover:text-gray-800 transition underline"
        >
          Start over
        </button>
      </div>
    </div>
  );
}

// ─── Main quiz component ──────────────────────────────────────────────────────

export default function ComplianceQuiz() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Answers>({
    q1: null,
    q2: [],
    q3: null,
    q4: null,
    q5: null,
  });
  const [showResults, setShowResults] = useState(false);

  const TOTAL_STEPS = 5;

  const handleQ1 = (value: string) => {
    setAnswers((prev) => ({ ...prev, q1: value }));
  };

  const handleQ2Toggle = (state: string) => {
    setAnswers((prev) => {
      if (state === "none") {
        return { ...prev, q2: ["none"] };
      }
      const without = prev.q2.filter((s) => s !== "none");
      if (without.includes(state)) {
        return { ...prev, q2: without.filter((s) => s !== state) };
      }
      return { ...prev, q2: [...without, state] };
    });
  };

  const handleQ3 = (value: string) => {
    setAnswers((prev) => ({ ...prev, q3: value }));
  };

  const handleQ4 = (value: string) => {
    setAnswers((prev) => ({ ...prev, q4: value }));
  };

  const handleQ5 = (value: string) => {
    setAnswers((prev) => ({ ...prev, q5: value }));
  };

  const canAdvance = () => {
    if (step === 1) return answers.q1 !== null;
    if (step === 2) return answers.q2.length > 0;
    if (step === 3) return answers.q3 !== null;
    if (step === 4) return answers.q4 !== null;
    if (step === 5) return answers.q5 !== null;
    return false;
  };

  const advance = () => {
    if (step < TOTAL_STEPS) {
      setStep((s) => s + 1);
    } else {
      setShowResults(true);
    }
  };

  const restart = () => {
    setStep(1);
    setAnswers({ q1: null, q2: [], q3: null, q4: null, q5: null });
    setShowResults(false);
  };

  const Q1_OPTIONS = [
    { value: "hiring", label: "Hiring, recruiting, or evaluating job candidates" },
    { value: "customer-data", label: "Customer data processing, targeting, or personalization" },
    { value: "healthcare", label: "Healthcare decisions or patient data" },
    { value: "financial", label: "Financial services or lending decisions" },
    { value: "none", label: "None of the above / I'm not sure" },
  ];

  const Q2_STATES = [
    "Illinois",
    "New York City",
    "Colorado",
    "California",
    "Virginia",
    "Connecticut",
    "Oregon",
    "Texas",
    "Delaware",
    "Minnesota",
    "Montana",
    "Indiana",
    "Kentucky",
    "New Jersey",
    "EU / International",
    "Other US states",
  ];

  const Q3_OPTIONS = [
    { value: "under-1k", label: "Under 1,000" },
    { value: "1k-25k", label: "1,000 – 25,000" },
    { value: "25k-100k", label: "25,000 – 100,000" },
    { value: "over-100k", label: "Over 100,000" },
  ];

  const Q4_OPTIONS = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
    { value: "unsure", label: "I'm not sure" },
  ];

  const Q5_OPTIONS = [
    { value: "comprehensive", label: "Yes, comprehensive program" },
    { value: "partial", label: "Some documents, but not complete" },
    { value: "nothing", label: "Nothing yet" },
    { value: "dont-know", label: "I don't know what I'd need" },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-2xl mx-auto px-4">
        {showResults ? (
          <ResultsCard
            recommendations={computeRecommendations(answers)}
            onRestart={restart}
          />
        ) : (
          <div>
            <StepIndicator current={step} total={TOTAL_STEPS} />

            {/* Question 1 */}
            {step === 1 && (
              <div>
                <h2 className="text-xl font-bold font-display text-gray-900 mb-2">
                  Does your business use AI or automated tools in any of these areas?
                </h2>
                <p className="text-gray-500 text-sm mb-6">
                  Select the one that best describes your primary use case.
                </p>
                <div className="space-y-3">
                  {Q1_OPTIONS.map((opt) => (
                    <OptionButton
                      key={opt.value}
                      label={opt.label}
                      selected={answers.q1 === opt.value}
                      onClick={() => handleQ1(opt.value)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Question 2 */}
            {step === 2 && (
              <div>
                <h2 className="text-xl font-bold font-display text-gray-900 mb-2">
                  Where are your employees or customers located?
                </h2>
                <p className="text-gray-500 text-sm mb-6">
                  Select all that apply. This determines which state laws are relevant to you.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {Q2_STATES.map((state) => (
                    <CheckboxOption
                      key={state}
                      label={state}
                      selected={answers.q2.includes(state)}
                      onClick={() => handleQ2Toggle(state)}
                    />
                  ))}
                  <CheckboxOption
                    label="Not sure"
                    selected={answers.q2.includes("none")}
                    onClick={() => handleQ2Toggle("none")}
                  />
                </div>
              </div>
            )}

            {/* Question 3 */}
            {step === 3 && (
              <div>
                <h2 className="text-xl font-bold font-display text-gray-900 mb-2">
                  How many employees or consumers does your business interact with?
                </h2>
                <p className="text-gray-500 text-sm mb-6">
                  Many state laws have applicability thresholds based on volume.
                </p>
                <div className="space-y-3">
                  {Q3_OPTIONS.map((opt) => (
                    <OptionButton
                      key={opt.value}
                      label={opt.label}
                      selected={answers.q3 === opt.value}
                      onClick={() => handleQ3(opt.value)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Question 4 */}
            {step === 4 && (
              <div>
                <h2 className="text-xl font-bold font-display text-gray-900 mb-2">
                  Does your business sell or share personal data, or use it for targeted advertising?
                </h2>
                <p className="text-gray-500 text-sm mb-6">
                  Selling, sharing, or using personal data for targeted ads triggers additional requirements in most state laws.
                </p>
                <div className="space-y-3">
                  {Q4_OPTIONS.map((opt) => (
                    <OptionButton
                      key={opt.value}
                      label={opt.label}
                      selected={answers.q4 === opt.value}
                      onClick={() => handleQ4(opt.value)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Question 5 */}
            {step === 5 && (
              <div>
                <h2 className="text-xl font-bold font-display text-gray-900 mb-2">
                  Do you currently have any AI compliance documentation in place?
                </h2>
                <p className="text-gray-500 text-sm mb-6">
                  This helps us understand where you&apos;re starting from.
                </p>
                <div className="space-y-3">
                  {Q5_OPTIONS.map((opt) => (
                    <OptionButton
                      key={opt.value}
                      label={opt.label}
                      selected={answers.q5 === opt.value}
                      onClick={() => handleQ5(opt.value)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
              {step > 1 ? (
                <button
                  onClick={() => setStep((s) => s - 1)}
                  className="text-sm text-gray-500 hover:text-gray-800 transition flex items-center gap-1.5"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                  </svg>
                  Back
                </button>
              ) : (
                <div />
              )}
              <button
                onClick={advance}
                disabled={!canAdvance()}
                className="inline-flex items-center gap-2 bg-blue-700 text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-blue-800 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {step === TOTAL_STEPS ? "See My Results" : "Next Question"}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Legal disclaimer */}
        <p className="mt-12 text-xs text-gray-400 text-center leading-relaxed">
          This assessment provides general guidance only and does not constitute legal advice.
          Results are based on the information you provide and may not capture every applicable law.
          Consult a licensed attorney to verify your specific compliance obligations.
        </p>
      </div>
    </section>
  );
}
