import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { regulations } from "@/data/regulations";

export const metadata: Metadata = {
  title: "AI Compliance Requirements by State — 2026 Guide",
  description:
    "Compare AI compliance laws across all 50 states. See which states require AI documentation, what the penalties are, and when deadlines hit. Updated March 2026.",
  keywords: [
    "ai compliance by state",
    "state ai laws",
    "ai regulation comparison",
    "which states have ai laws",
    "ai compliance requirements 2026",
  ],
  alternates: {
    canonical: "https://aicompliancedocuments.com/ai-compliance-by-state",
  },
  openGraph: {
    title: "AI Compliance Requirements by State — 2026 Guide",
    description:
      "Compare AI compliance laws across all 50 states. See which states require AI documentation, what the penalties are, and when deadlines hit.",
    url: "https://aicompliancedocuments.com/ai-compliance-by-state",
    type: "website",
  },
};

// Parse effective date strings into sortable values
// "Available now" → Infinity (no specific date)
function parseDateRank(dateStr: string): number {
  if (!dateStr || dateStr.toLowerCase().includes("available")) return Infinity;
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? Infinity : d.getTime();
}

function StateComparisonSchema({ stateRegs }: { stateRegs: typeof regulations }) {
  const data = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "AI Compliance Requirements by State — 2026",
    description: "Comparison of enacted US state AI and data privacy laws, including effective dates, penalty amounts, enforcement mechanisms, and required documentation. Covers 14+ state jurisdictions as of 2026.",
    about: "Comparison of US state AI and data privacy laws requiring business documentation",
    url: "https://aicompliancedocuments.com/ai-compliance-by-state",
    creator: {
      "@type": "Organization",
      name: "AI Compliance Documents",
      url: "https://aicompliancedocuments.com",
    },
    license: "https://aicompliancedocuments.com/terms",
  });
  return <script type="application/ld+json">{data}</script>;
}

export default function AIComplianceByStatePage() {
  const stateRegs = regulations
    .filter((r) => r.tier === "state" && r.ready)
    .sort((a, b) => parseDateRank(a.effectiveDate) - parseDateRank(b.effectiveDate));

  return (
    <>
      <StateComparisonSchema stateRegs={stateRegs} />
      <Nav />
      <main id="main-content">
        {/* ── Hero ── */}
        <header className="hero-bg text-white py-10 md:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="inline-flex items-center gap-2 border border-blue-400/40 px-3 py-1 sm:px-4 sm:py-1.5 mb-4 sm:mb-5 text-xs sm:text-sm rounded text-blue-200">
              <span aria-hidden="true" className="inline-block w-1.5 h-1.5 bg-blue-400 rounded-sm" />
              Updated March 2026
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold font-display text-white mb-3 sm:mb-4 leading-tight tracking-tight">
              AI Compliance Requirements by State
            </h1>
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed mb-6">
              {stateRegs.length} states have enacted AI or data privacy laws that require specific
              documentation from businesses using AI. Here&apos;s how they compare.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl">
              <Link href="/colorado-ai-compliance" className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400/40 rounded-lg p-3 transition-colors">
                <div className="text-amber-300 text-xs font-semibold uppercase tracking-widest mb-1">Colorado</div>
                <div className="text-white text-sm font-bold leading-snug group-hover:underline">SB 24-205 →</div>
                <div className="text-slate-400 text-xs mt-1">June 30, 2026</div>
              </Link>
              <Link href="/illinois-ai-compliance" className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-400/40 rounded-lg p-3 transition-colors">
                <div className="text-blue-300 text-xs font-semibold uppercase tracking-widest mb-1">Illinois</div>
                <div className="text-white text-sm font-bold leading-snug group-hover:underline">HB3773 →</div>
                <div className="text-slate-400 text-xs mt-1">In effect</div>
              </Link>
              <Link href="/california-ai-compliance" className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-rose-400/40 rounded-lg p-3 transition-colors">
                <div className="text-rose-300 text-xs font-semibold uppercase tracking-widest mb-1">California</div>
                <div className="text-white text-sm font-bold leading-snug group-hover:underline">CCPA ADMT →</div>
                <div className="text-slate-400 text-xs mt-1">In effect</div>
              </Link>
              <Link href="/texas-ai-compliance" className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-indigo-400/40 rounded-lg p-3 transition-colors">
                <div className="text-indigo-300 text-xs font-semibold uppercase tracking-widest mb-1">Texas</div>
                <div className="text-white text-sm font-bold leading-snug group-hover:underline">TRAIGA HB 149 →</div>
                <div className="text-slate-400 text-xs mt-1">In effect</div>
              </Link>
            </div>
          </div>
        </header>

        {/* ── Comparison table ── */}
        <section className="py-10 sm:py-14 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 mb-2">
              State AI Law Comparison
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mb-6 sm:mb-8">
              Sorted by effective date, earliest first. Only state-level laws with active
              documentation requirements shown.
            </p>

            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-sm">
                <caption className="sr-only">State AI Law Comparison — sorted by effective date</caption>
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-left">
                    <th scope="col" className="px-4 py-3 font-semibold text-slate-700 whitespace-nowrap">State</th>
                    <th scope="col" className="px-4 py-3 font-semibold text-slate-700 whitespace-nowrap">Law</th>
                    <th scope="col" className="px-4 py-3 font-semibold text-slate-700 whitespace-nowrap">Effective</th>
                    <th scope="col" className="px-4 py-3 font-semibold text-slate-700 whitespace-nowrap">Status</th>
                    <th scope="col" className="px-4 py-3 font-semibold text-slate-700 whitespace-nowrap">Max Penalty</th>
                    <th scope="col" className="px-4 py-3 font-semibold text-slate-700 whitespace-nowrap">Package</th>
                    <th scope="col" className="px-4 py-3 font-semibold text-slate-700 whitespace-nowrap"><span className="sr-only">Actions</span></th>
                  </tr>
                </thead>
                <tbody>
                  {stateRegs.map((reg, i) => (
                    <tr
                      key={reg.slug}
                      className={`border-b border-slate-100 hover:bg-slate-50 focus-within:bg-blue-50 transition-colors ${
                        i % 2 === 0 ? "bg-white" : "bg-slate-100"
                      }`}
                    >
                      <td className="px-4 py-3.5 font-medium text-slate-900 whitespace-nowrap">
                        {reg.state}
                      </td>
                      <td className="px-4 py-3.5 text-slate-700 whitespace-nowrap">
                        {reg.shortName}
                      </td>
                      <td className="px-4 py-3.5 text-slate-600 whitespace-nowrap">
                        {reg.effectiveDate}
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        {reg.status === "in-effect" ? (
                          <span className="text-green-700 font-semibold text-xs uppercase tracking-wide">
                            In Effect
                          </span>
                        ) : (
                          <span className="text-amber-800 font-semibold text-xs uppercase tracking-wide">
                            Effective Soon
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3.5 text-slate-600 whitespace-nowrap">
                        {reg.maxPenalty}
                      </td>
                      <td className="px-4 py-3.5 text-slate-700 font-medium whitespace-nowrap">
                        ${reg.price}
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <Link
                          href={`/products/${reg.slug}`}
                          aria-label={`View ${reg.state} compliance package`}
                          className="inline-flex items-center gap-1 text-blue-700 font-semibold text-sm hover:text-blue-900 transition-colors"
                        >
                          View Package<span aria-hidden="true"> →</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-3">
              {stateRegs.map((reg) => (
                <div
                  key={reg.slug}
                  className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="min-w-0">
                      <p className="font-bold text-slate-900 text-sm leading-snug">{reg.state}</p>
                      <p className="text-slate-600 text-xs mt-0.5 leading-snug">{reg.shortName}</p>
                    </div>
                    <div className="shrink-0">
                      {reg.status === "in-effect" ? (
                        <span className="text-green-800 font-semibold text-xs uppercase tracking-wide bg-green-50 border border-green-200 px-2 py-0.5 rounded">
                          In Effect
                        </span>
                      ) : (
                        <span className="text-amber-800 font-semibold text-xs uppercase tracking-wide bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                          Effective Soon
                        </span>
                      )}
                    </div>
                  </div>

                  <dl className="grid grid-cols-2 gap-x-3 gap-y-2 text-xs mb-4">
                    <div>
                      <dt className="text-slate-600 text-xs uppercase tracking-wide mb-0.5">Effective</dt>
                      <dd className="text-slate-700 leading-snug">{reg.effectiveDate}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-600 text-xs uppercase tracking-wide mb-0.5">Max Penalty</dt>
                      <dd className="text-slate-700 leading-snug">{reg.maxPenalty}</dd>
                    </div>
                  </dl>

                  <div className="flex items-center justify-between gap-3">
                    <span className="text-slate-700 font-semibold text-sm">${reg.price}</span>
                    <Link
                      href={`/products/${reg.slug}`}
                      aria-label={`View ${reg.state} compliance package`}
                      className="inline-flex items-center gap-1 min-h-[44px] bg-blue-700 text-white text-xs font-semibold px-4 py-2.5 rounded-lg hover:bg-blue-800 transition shrink-0"
                    >
                      View Package<span aria-hidden="true"> →</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── What these laws have in common ── */}
        <section className="py-10 sm:py-16 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-display text-slate-900 mb-4 sm:mb-6">
              What These Laws Have in Common
            </h2>

            <div className="space-y-4 sm:space-y-5 text-slate-700 text-sm sm:text-base leading-relaxed">
              <p>
                Despite being written independently across more than a dozen state legislatures, most
                of these laws follow a recognizable pattern. At the core, almost every state AI law
                requires some form of{" "}
                <strong>notice to people affected by AI-driven decisions</strong>. If your system is
                making or significantly influencing decisions about someone — who gets hired, who gets
                a loan, who pays more for insurance — that person is typically entitled to know that
                AI is involved.
              </p>
              <p>
                Most laws also require{" "}
                <strong>documented assessments of AI risk and potential for discrimination</strong>.
                These go by different names — data protection assessments, impact assessments,
                algorithmic impact assessments — but the core question is the same: have you evaluated
                whether this AI system treats different demographic groups differently, and have you
                documented that evaluation? Virginia, Connecticut, Oregon, Texas, Delaware, Minnesota,
                Indiana, Montana, Kentucky, and New Jersey all require this for profiling activities.
                Colorado requires it for consequential decisions more broadly.
              </p>
              <p>
                Enforcement across all these laws runs almost exclusively through{" "}
                <strong>state Attorneys General</strong>. None of the current state AI or privacy laws
                create a private right of action specifically for AI violations — meaning a consumer
                can&apos;t sue you directly for an ADMT violation the way they could for a contract
                breach. But AG offices in states like California, Colorado, and Minnesota have
                explicitly flagged AI enforcement as a priority heading into 2026, and AG offices
                don&apos;t need a consumer complaint to open an investigation.
              </p>
              <p>
                Perhaps the most important pattern is how{" "}
                <strong>penalties multiply with automated systems</strong>. Most of these laws set
                penalties on a per-violation basis — and when an AI system makes thousands of
                decisions per day, "per violation" can mean something very different than it does with
                a human-driven process. A $7,500 per-violation penalty is manageable when you make
                ten manual decisions a month. It&apos;s a different calculation when your hiring
                platform screens 500 resumes a day.
              </p>
            </div>
          </div>
        </section>

        {/* ── "Not sure which applies to you?" section ── */}
        <section className="py-10 sm:py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-display text-slate-900 mb-2 sm:mb-3">
              Not Sure Which Applies to You?
            </h2>
            <p className="text-slate-600 mb-6 sm:mb-10 text-sm sm:text-base">
              Your obligations depend on where you operate, who you serve, and how you use AI.
              Here&apos;s a quick guide by situation.
            </p>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {/* Card 1: Employers using AI in hiring */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-6">
                <div aria-hidden="true" className="text-2xl mb-3">🏢</div>
                <h3 className="font-bold text-slate-900 text-base mb-2">
                  Employers using AI in hiring
                </h3>
                <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                  If you use any automated tool to screen, rank, or score candidates, three states have
                  specific employer AI laws.
                </p>
                <ul className="space-y-1.5 mb-5">
                  <li>
                    <Link
                      href="/products/illinois-hb3773"
                      className="text-blue-700 text-sm font-medium hover:underline"
                    >
                      Illinois HB3773<span aria-hidden="true"> →</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/products/nyc-local-law-144"
                      className="text-blue-700 text-sm font-medium hover:underline"
                    >
                      NYC Local Law 144<span aria-hidden="true"> →</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/products/colorado-sb24-205"
                      className="text-blue-700 text-sm font-medium hover:underline"
                    >
                      Colorado SB 24-205<span aria-hidden="true"> →</span>
                    </Link>
                  </li>
                </ul>
                <Link
                  href="/products/multi-state-employer-ai-disclosure"
                  className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-blue-700 font-medium transition-colors"
                >
                  Or get the multi-state employer bundle<span aria-hidden="true"> →</span>
                </Link>
              </div>

              {/* Card 2: Businesses collecting consumer data */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-6">
                <div aria-hidden="true" className="text-2xl mb-3">🗂️</div>
                <h3 className="font-bold text-slate-900 text-base mb-2">
                  Businesses collecting consumer data
                </h3>
                <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                  If you use personal data for profiling, targeting, or automated decisions, most state
                  privacy laws require documented assessments.
                </p>
                <ul className="space-y-1.5 mb-5">
                  <li>
                    <Link
                      href="/products/virginia-cdpa"
                      className="text-blue-700 text-sm font-medium hover:underline"
                    >
                      Virginia CDPA<span aria-hidden="true"> →</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/products/california-ccpa-admt"
                      className="text-blue-700 text-sm font-medium hover:underline"
                    >
                      California CCPA ADMT<span aria-hidden="true"> →</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/products/connecticut-ctdpa"
                      className="text-blue-700 text-sm font-medium hover:underline"
                    >
                      Connecticut CTDPA<span aria-hidden="true"> →</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/products/oregon-cpa"
                      className="text-blue-700 text-sm font-medium hover:underline"
                    >
                      Oregon CPA<span aria-hidden="true"> →</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/products/texas-tdpsa"
                      className="text-blue-700 text-sm font-medium hover:underline"
                    >
                      Texas TDPSA<span aria-hidden="true"> →</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/products/delaware-pdpa"
                      className="text-blue-700 text-sm font-medium hover:underline"
                    >
                      Delaware PDPA<span aria-hidden="true"> →</span>
                    </Link>
                  </li>
                </ul>
                <Link
                  href="/products/multi-state-profiling-assessment"
                  className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-blue-700 font-medium transition-colors"
                >
                  Or get the multi-state profiling bundle<span aria-hidden="true"> →</span>
                </Link>
              </div>

              {/* Card 3: Operating in many states */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-6">
                <div aria-hidden="true" className="text-2xl mb-3">🗺️</div>
                <h3 className="font-bold text-slate-900 text-base mb-2">
                  Operating in many states
                </h3>
                <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                  If you serve customers in multiple states, the Multi-State Profiling Assessment
                  Bundle covers 15+ state assessment requirements in a single framework — so
                  you&apos;re not building separate documents for each jurisdiction.
                </p>
                <Link
                  href="/products/multi-state-profiling-assessment"
                  className="inline-flex items-center gap-1 bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-blue-800 transition"
                >
                  Multi-State Profiling Bundle<span aria-hidden="true"> →</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <section className="py-10 sm:py-14 bg-slate-900">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-display text-white mb-3">
              Browse All {regulations.filter((r) => r.ready).length} Compliance Packages
            </h2>
            <p className="text-slate-300 mb-6 text-sm sm:text-base">
              State laws, federal frameworks, multi-state bundles, and industry-specific packages.
              Each built against the actual enacted statute text.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 bg-blue-700 text-white px-7 py-3.5 rounded-lg font-bold text-sm sm:text-base hover:bg-blue-800 transition w-full sm:w-auto"
            >
              View All Packages<span aria-hidden="true"> →</span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
