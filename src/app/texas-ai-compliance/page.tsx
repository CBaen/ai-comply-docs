import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Texas TRAIGA AI Compliance — HB 149 In Effect January 1, 2026",
  description:
    "Texas HB 149 (TRAIGA) took effect January 1, 2026. No high-risk carveout, no small-business exemption. Uncurable violations start at $80,000. Get all 7 compliance documents — built from the enrolled statute text. $299, instant download.",
  keywords: [
    "Texas AI law compliance",
    "TRAIGA compliance template",
    "Texas HB 149 AI requirements",
    "Texas Responsible AI Governance Act",
    "Texas AI governance documents",
    "NIST AI 600-1 compliance Texas",
    "Texas AI compliance 2026",
    "HB149 compliance checklist",
  ],
  alternates: {
    canonical: "https://aicompliancedocuments.com/texas-ai-compliance",
  },
  openGraph: {
    title:
      "Texas TRAIGA AI Compliance — HB 149 In Effect January 1, 2026",
    description:
      "7 compliance documents for Texas TRAIGA (HB 149). No exemptions. Law is already in effect. Built from enrolled statute text. Instant download. $299.",
    url: "https://aicompliancedocuments.com/texas-ai-compliance",
    type: "website",
  },
};

function LandingSchema() {
  const data = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Texas TRAIGA (HB 149) AI Governance Compliance Package",
    description:
      "Complete 7-document compliance package for Texas HB 149 — the Responsible AI Governance Act. Covers both developer and deployer obligations, built around the NIST AI 600-1 safe harbor standard.",
    url: "https://aicompliancedocuments.com/texas-ai-compliance",
    brand: {
      "@type": "Organization",
      name: "AI Compliance Documents",
      url: "https://aicompliancedocuments.com",
    },
    offers: {
      "@type": "Offer",
      price: "299",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: "https://aicompliancedocuments.com/products/texas-traiga",
    },
  });
  return <script type="application/ld+json">{data}</script>;
}

/* --- Verified data — sourced from blog post and regulations.ts only --- */

const microFacts = [
  {
    fact: "TRAIGA passed the Texas House 146-3 and the Senate 31-0 — one of the most bipartisan AI governance laws ever enacted.",
    source: "Texas Legislature Online — HB 149 History",
    sourceUrl:
      "https://capitol.texas.gov/BillLookup/History.aspx?LegSess=89R&Bill=HB149",
  },
  {
    fact: "A single uncurable violation under TRAIGA can cost between $80,000 and $200,000 — four times Colorado's $20,000 maximum first-offense penalty.",
    source: "HB 149 Sec. 552.105(a)",
    sourceUrl:
      "https://capitol.texas.gov/BillLookup/Text.aspx?LegSess=89R&Bill=HB149",
  },
  {
    fact: "TRAIGA creates a 36-month regulatory sandbox allowing companies to test AI systems without a state license — with legal immunity during the testing period.",
    source: "HB 149 Sec. 553.051",
    sourceUrl:
      "https://capitol.texas.gov/BillLookup/Text.aspx?LegSess=89R&Bill=HB149",
  },
  {
    fact: "Unlike Colorado's SB 24-205, TRAIGA never uses the term 'high-risk' — its rules apply to any AI system regardless of risk tier.",
    source: "HB 149 Enrolled Text",
    sourceUrl:
      "https://capitol.texas.gov/BillLookup/Text.aspx?LegSess=89R&Bill=HB149",
  },
  {
    fact: "Texas preempts local governments from enacting their own AI ordinances — one statewide framework, no patchwork of city rules.",
    source: "HB 149 Sec. 552.003",
    sourceUrl:
      "https://capitol.texas.gov/BillLookup/Text.aspx?LegSess=89R&Bill=HB149",
  },
  {
    fact: "The Attorney General's complaint portal goes live by September 1, 2026. Consumer complaints will have a direct path to enforcement review from that date.",
    source: "HB 149 Sec. 552.102",
    sourceUrl:
      "https://capitol.texas.gov/BillLookup/Text.aspx?LegSess=89R&Bill=HB149",
  },
];

const documents = [
  {
    name: "AI System Inventory & Classification",
    citation: "HB 149 Enrolled Text",
    desc: "Unlike Colorado, there is no high-risk filter. Any AI system in your Texas operations is in scope. This document is how you know what you have.",
  },
  {
    name: "Risk Management Policy (NIST AI 600-1 Aligned)",
    citation: "§ 552.105(e)",
    desc: "The safe harbor requires substantial compliance with NIST AI 600-1 or an equivalent framework. This policy is the documented foundation that supports the rebuttable presumption of reasonable care.",
  },
  {
    name: "Developer Disclosure Documentation Template",
    citation: "HB 149 Enrolled Text",
    desc: "If you build AI systems and make them available to others, you must give deployers the documentation they need to run their own compliance program. This is that document.",
  },
  {
    name: "Consumer AI Notification Template",
    citation: "HB 149 Enrolled Text",
    desc: "Deployers must notify consumers when they are interacting with or affected by an AI system. The obligation is not limited to high-stakes decisions.",
  },
  {
    name: "Consumer Correction Request Process",
    citation: "HB 149 Enrolled Text",
    desc: "Consumers must have a mechanism to submit corrections or concerns. This document establishes that process and how responses are handled.",
  },
  {
    name: "Bias Evaluation & Anti-Discrimination Documentation",
    citation: "§ 552.056(c)",
    desc: "TRAIGA requires intent for a discrimination violation — disparate impact alone is not enough. Documented good-faith bias evaluation is evidence of that intent, or absence of it.",
  },
  {
    name: "Compliance Checklist",
    citation: "All sections",
    desc: "Every developer and deployer obligation in one place. Cross-referenced to statute sections so you can verify each requirement yourself.",
  },
];

const selfAssessment = [
  {
    question: "Do you use any AI tool in your Texas business operations?",
    note: "No high-risk carveout — any AI system is in scope",
  },
  {
    question:
      "Do you build, train, or substantially modify AI systems that others use?",
    note: "You are a 'developer' under TRAIGA",
  },
  {
    question:
      "Do you use AI systems in products or services offered to Texas consumers or employees?",
    note: "You are a 'deployer' under TRAIGA",
  },
  {
    question:
      "Do you use AI to screen job applicants, make lending decisions, or provide services to Texas residents?",
    note: "Consumer-facing AI obligations apply",
  },
  {
    question:
      "Do you license AI tools to businesses that operate in Texas?",
    note: "Developer disclosure obligations likely apply",
  },
];

export default function TexasAICompliancePage() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:text-blue-800 focus:px-4 focus:py-2 focus:rounded focus:shadow-lg"
      >
        Skip to main content
      </a>
      <LandingSchema />

      {/* Minimal header */}
      <header className="bg-gray-950 border-b border-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-white font-display font-bold text-lg hover:text-blue-400 transition-colors"
          >
            AI Compliance Documents
          </Link>
          <span className="text-red-400 text-sm font-semibold">
            In effect: January 1, 2026
          </span>
        </div>
      </header>

      <main id="main-content">
        {/* Hero */}
        <section className="bg-gray-950 text-white py-16 sm:py-20 md:py-24 relative overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0">
            <img
              src="/images/landing/professional-on-phone.png"
              alt=""
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-gray-950/80 via-gray-950/90 to-gray-950" />
          </div>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
            <p className="text-red-400 text-sm font-semibold uppercase tracking-wider mb-4">
              Texas TRAIGA (HB 149) &middot; Already in effect — January 1, 2026
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display leading-tight mb-6">
              Texas AI Law Covers
              <br />
              Every Business. No Exceptions.
            </h1>
            <p className="text-gray-300 text-lg sm:text-xl leading-relaxed mb-4 max-w-2xl mx-auto">
              Texas HB 149 — the Responsible AI Governance Act — took effect
              January 1, 2026. No high-risk carveout. No small-business
              exemption. No revenue threshold. If you use AI in Texas, you are
              in scope right now.
            </p>
            <p className="text-gray-400 text-sm mb-8 max-w-xl mx-auto">
              Built from the{" "}
              <a
                href="https://capitol.texas.gov/BillLookup/Text.aspx?LegSess=89R&Bill=HB149"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                enrolled HB 149 bill text
              </a>{" "}
              on capitol.texas.gov. Not summaries. Not paraphrases. Not
              training data.
            </p>
            <Link
              href="/products/texas-traiga"
              className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-semibold text-lg px-8 py-4 rounded-lg transition-colors shadow-lg shadow-blue-600/25"
            >
              Get All 7 Documents — $299
            </Link>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400 mt-6">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                Instant download
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                Statute-cited
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                NIST AI 600-1 aligned
              </span>
            </div>
          </div>
        </section>

        {/* Penalty strip */}
        <section className="bg-red-950/30 border-y border-red-900/40 py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="grid sm:grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-2xl sm:text-3xl font-bold font-display text-white">
                  $80K–$200K
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  per uncurable violation
                  <br />
                  <span className="text-gray-500 text-xs">
                    HB 149 &sect; 552.105(a)
                  </span>
                </p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold font-display text-white">
                  $2K–$40K/day
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  continuing violations
                  <br />
                  <span className="text-gray-500 text-xs">
                    HB 149 &sect; 552.105(a)
                  </span>
                </p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold font-display text-white">
                  AG Only
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  no private right of action
                  <br />
                  <span className="text-gray-500 text-xs">
                    HB 149 &sect; 552.101
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Three-column content area */}
        <section className="bg-gray-900 py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid xl:grid-cols-[240px_minmax(0,640px)_240px] gap-8 xl:gap-10 justify-center">

              {/* Left sidebar — Deep Dive */}
              <aside className="hidden xl:block">
                <div className="sticky top-8">
                  <div className="border-l-4 border-indigo-500 pl-4">
                    <p className="text-indigo-400 font-semibold text-sm mb-3 flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                      Deep Dive
                    </p>
                    <div className="text-gray-400 text-xs leading-relaxed space-y-3">
                      <p>
                        Most AI laws work like a parking ticket: you park wrong,
                        you get fined. Texas HB 149 works more like a
                        professional license exam — it tells you exactly what
                        studying earns you legal protection, and it starts you
                        off with the benefit of the doubt.
                      </p>
                      <p>
                        Under Section 552.105(c), there is a{" "}
                        <strong className="text-gray-300">
                          rebuttable presumption
                        </strong>{" "}
                        that any defendant used reasonable care. You start with
                        the legal assumption you acted reasonably. The
                        government has to overcome that presumption to make a
                        violation stick.
                      </p>
                      <p>
                        Section 552.105(e) provides the safe harbor: substantial
                        compliance with the{" "}
                        <strong className="text-gray-300">
                          NIST AI 600-1
                        </strong>{" "}
                        (Generative AI Profile) or an equivalent framework. If
                        your compliance program is built around it and
                        documented, you are in the strongest available legal
                        position.
                      </p>
                      <p>
                        Before the AG can bring an enforcement action, the
                        business must receive notice and have{" "}
                        <strong className="text-gray-300">60 days to cure</strong>{" "}
                        the violation (&sect; 552.104). Enforcement is
                        complaint-driven — businesses don&apos;t face random
                        audits.
                      </p>
                      <p>
                        The AG complaint portal goes live by{" "}
                        <strong className="text-gray-300">
                          September 1, 2026
                        </strong>{" "}
                        (&sect; 552.102). The window between now and then is
                        real compliance time — not a grace period.
                      </p>
                    </div>
                  </div>
                </div>
              </aside>

              {/* Center column — Main content */}
              <div>
                {/* Mobile-only Deep Dive */}
                <details className="xl:hidden mb-8 bg-gray-800/50 rounded-lg border border-indigo-500/30">
                  <summary className="p-4 text-indigo-400 font-semibold text-sm cursor-pointer flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                    Deep Dive — How the Law Actually Works
                  </summary>
                  <div className="px-4 pb-4 text-gray-400 text-sm leading-relaxed space-y-3 border-t border-gray-700/50 mt-1 pt-4">
                    <p>
                      Texas HB 149 builds in a rebuttable presumption of
                      reasonable care (&sect; 552.105(c)) — you start with the
                      assumption you acted correctly. The government has to
                      overcome that presumption, not the other way around.
                    </p>
                    <p>
                      The safe harbor (&sect; 552.105(e)) requires substantial
                      compliance with NIST AI 600-1 or an equivalent recognized
                      framework. NIST AI 600-1 is NIST&apos;s framework
                      specifically designed for generative AI risk management —
                      more targeted than the general AI RMF 1.0.
                    </p>
                    <p>
                      Before enforcement action, the business receives notice
                      and has 60 days to cure curable violations (&sect;
                      552.104). Uncurable violations carry a floor of $80,000 —
                      four times Colorado&apos;s maximum first-offense penalty.
                    </p>
                    <p>
                      The law distinguishes developers (who build AI systems)
                      from deployers (who use them). Both have obligations, but
                      they are different obligations with different
                      documentation requirements.
                    </p>
                  </div>
                </details>

                {/* Main narrative */}
                <h2 className="text-2xl font-bold font-display text-white mb-4">
                  Here&apos;s what&apos;s actually different about Texas.
                </h2>
                <p className="text-gray-300 leading-relaxed mb-5">
                  Texas signed HB 149 — the Responsible Artificial Intelligence
                  Governance Act — on June 22, 2025. It took effect January 1,
                  2026. There is no delay period, no extended phase-in. If you
                  use AI in Texas, you are operating under this law today.
                </p>
                <p className="text-gray-300 leading-relaxed mb-5">
                  Colorado&apos;s SB 24-205 uses a &ldquo;high-risk&rdquo;
                  classification — if your AI system doesn&apos;t meet the
                  definition of high-risk, you&apos;re largely outside the
                  law&apos;s scope. Texas doesn&apos;t do that. TRAIGA applies
                  to <strong className="text-white">any AI system</strong>, and
                  to two categories of business: developers and deployers. No
                  carveout. No threshold.
                </p>

                {/* Urgency callout */}
                <div className="bg-red-950/30 border border-red-800/40 rounded-lg p-5 mb-8">
                  <p className="text-red-400 font-semibold text-sm mb-2">
                    The Law Is Already In Effect
                  </p>
                  <p className="text-gray-400 text-sm">
                    January 1, 2026 has passed. The AG&apos;s complaint portal
                    goes live by September 1, 2026 (&sect; 552.102). Once it
                    does, consumer complaints will have a direct path to
                    enforcement review. The window between now and then is not a
                    grace period — it is time to build your compliance program
                    before complaints arrive.
                  </p>
                </div>

                {/* Self-assessment */}
                <h3 className="text-xl font-bold font-display text-white mb-4 mt-10">
                  Does this apply to you?
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  If you answer &ldquo;yes&rdquo; to any of these, TRAIGA
                  covers your business. There is no minimum size, revenue floor,
                  or employee threshold.
                </p>
                <fieldset>
                  <legend className="sr-only">
                    Self-assessment: Does Texas TRAIGA apply to you?
                  </legend>
                  <div className="space-y-3 mb-8">
                    {selfAssessment.map((item, i) => (
                      <label
                        key={i}
                        htmlFor={`assessment-${i}`}
                        className="flex items-start gap-3 bg-gray-800/50 border border-gray-700/50 rounded-lg p-4 cursor-pointer hover:border-blue-500/30 transition-colors group"
                      >
                        <input
                          type="checkbox"
                          id={`assessment-${i}`}
                          name={`assessment-${i}`}
                          className="mt-1 w-4 h-4 rounded border-gray-600 text-blue-600 focus:ring-blue-500 bg-gray-700"
                        />
                        <div>
                          <p className="text-gray-200 text-sm group-hover:text-white transition-colors">
                            {item.question}
                          </p>
                          <p className="text-gray-500 text-xs mt-0.5">
                            {item.note}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                </fieldset>

                {/* No-exemption callout */}
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-5 mb-8">
                  <p className="text-white font-semibold text-sm mb-2">
                    There Is No Small-Business Exemption
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Unlike Colorado&apos;s 50-employee partial exemption, TRAIGA
                    has no size-based carveout. A company with five employees
                    that uses an AI-powered tool to screen job applicants is a
                    deployer under this law with the same obligations as a
                    Fortune 500 company. The only safe harbor is for federally
                    insured financial institutions subject to federal AI
                    oversight (&sect; 552.056(e)).
                  </p>
                </div>

                {/* Lifestyle image break */}
                <div className="my-10 rounded-xl overflow-hidden">
                  <img
                    src="/images/landing/team-compliance-meeting.png"
                    alt="Compliance team reviewing AI governance documents in a modern office"
                    className="w-full h-48 sm:h-56 object-cover"
                  />
                </div>

                {/* Documents section */}
                <h2 className="text-2xl font-bold font-display text-white mb-2">
                  7 Documents. Both Developer and Deployer Obligations.
                </h2>
                <p className="text-gray-400 text-sm mb-8">
                  Each document maps to specific sections of{" "}
                  <a
                    href="https://capitol.texas.gov/BillLookup/Text.aspx?LegSess=89R&Bill=HB149"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    HB 149 (Tex. Gov&apos;t Code Ch. 552)
                  </a>{" "}
                  and aligns with the NIST AI 600-1 safe harbor standard.
                </p>
                <div className="space-y-4 mb-10">
                  {documents.map((doc, i) => (
                    <div
                      key={i}
                      className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-5"
                    >
                      <div className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-7 h-7 bg-blue-600/20 text-blue-400 rounded-full flex items-center justify-center text-sm font-semibold mt-0.5">
                          {i + 1}
                        </span>
                        <div>
                          <div className="flex items-baseline gap-2 flex-wrap">
                            <h3 className="text-white font-semibold">
                              {doc.name}
                            </h3>
                            <span className="text-gray-500 text-xs">
                              {doc.citation}
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm mt-1">
                            {doc.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Rebuttable presumption callout */}
                <div className="bg-blue-950/30 border border-blue-800/40 rounded-lg p-6 mb-10">
                  <h3 className="text-blue-400 font-semibold mb-2">
                    The Rebuttable Presumption — Texas&apos;s Safe Harbor
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-3">
                    Unlike Colorado&apos;s affirmative defense (where you must
                    argue your way out of an accusation), Texas builds in a
                    rebuttable presumption of reasonable care under &sect;
                    552.105(c). You start with the legal assumption that you
                    acted correctly — the government has to overcome it.
                  </p>
                  <p className="text-gray-300 text-sm leading-relaxed mb-3">
                    Section 552.105(e) specifies how to lock that presumption in
                    place: substantial compliance with the{" "}
                    <strong className="text-white">NIST AI 600-1</strong>{" "}
                    (Generative AI Profile) or an equivalent recognized
                    framework. Document it. Keep it current.
                  </p>
                  <p className="text-gray-400 text-xs">
                    Every document in this package is built to the NIST AI 600-1
                    standard. That is the documented path to TRAIGA&apos;s safe
                    harbor.
                  </p>
                </div>

                {/* Price comparison */}
                <h2 className="text-2xl font-bold font-display text-white mb-6">
                  A lot of our customers have lawyers.
                </h2>
                <p className="text-gray-300 leading-relaxed mb-6">
                  They don&apos;t buy these templates instead of legal counsel.
                  They buy them so their attorney isn&apos;t starting from a
                  blank page at $400 an hour.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-5 text-center">
                    <p className="text-gray-400 text-sm mb-1">Law firm</p>
                    <p className="text-2xl font-bold text-gray-400 line-through">
                      $5,000–$25,000
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      Weeks of back-and-forth
                    </p>
                  </div>
                  <div className="bg-blue-600/10 border border-blue-500/30 rounded-lg p-5 text-center">
                    <p className="text-blue-400 text-sm mb-1">
                      AI Compliance Documents
                    </p>
                    <p className="text-2xl font-bold text-white">$299</p>
                    <p className="text-gray-400 text-xs mt-1">
                      Instant download, customize today
                    </p>
                  </div>
                </div>

                {/* CTA — mid-page */}
                <div className="text-center my-10">
                  <Link
                    href="/products/texas-traiga"
                    className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-lg transition-colors shadow-lg shadow-blue-600/25"
                  >
                    Get Your Compliance Package — $299
                  </Link>
                </div>

                <hr className="border-gray-700/50 my-10" />

                {/* FAQ */}
                <h3 className="text-xl font-bold font-display text-white mb-6">
                  Questions we hear a lot.
                </h3>
                <div className="space-y-3 mb-10">
                  <details className="bg-gray-800/50 border border-gray-700/50 rounded-lg group">
                    <summary className="p-4 text-gray-200 font-medium text-sm cursor-pointer">
                      We&apos;re not in Texas. Does this still apply?
                    </summary>
                    <div className="px-4 pb-4 text-gray-400 text-sm border-t border-gray-700/50 pt-3">
                      If your AI system affects Texas consumers or employees, it
                      likely applies. The law covers AI systems used in Texas
                      operations — the consumer&apos;s location matters, not just
                      your company&apos;s headquarters. A company based in
                      California that uses AI to screen applicants for Texas jobs
                      is a deployer under TRAIGA.
                    </div>
                  </details>
                  <details className="bg-gray-800/50 border border-gray-700/50 rounded-lg group">
                    <summary className="p-4 text-gray-200 font-medium text-sm cursor-pointer">
                      What&apos;s the difference between a developer and a
                      deployer?
                    </summary>
                    <div className="px-4 pb-4 text-gray-400 text-sm border-t border-gray-700/50 pt-3">
                      A developer creates, trains, or substantially modifies an
                      AI system and makes it available to others. A deployer uses
                      an AI system in a product or service offered to consumers
                      or employees in Texas. Both categories carry real
                      obligations under TRAIGA, but they are different
                      obligations. This package covers both.
                    </div>
                  </details>
                  <details className="bg-gray-800/50 border border-gray-700/50 rounded-lg group">
                    <summary className="p-4 text-gray-200 font-medium text-sm cursor-pointer">
                      We already comply with Colorado SB 24-205. Does that cover
                      Texas too?
                    </summary>
                    <div className="px-4 pb-4 text-gray-400 text-sm border-t border-gray-700/50 pt-3">
                      Significant overlap exists. Both laws reference NIST
                      frameworks as the path to legal protection, both give the
                      AG exclusive enforcement authority, and both distinguish
                      developers from deployers. But TRAIGA&apos;s scope is
                      broader — it covers all AI systems, not just high-risk
                      ones — and the penalty structure is materially different.
                      If you&apos;re building for both states, a unified program
                      can satisfy both with targeted additions.
                    </div>
                  </details>
                  <details className="bg-gray-800/50 border border-gray-700/50 rounded-lg group">
                    <summary className="p-4 text-gray-200 font-medium text-sm cursor-pointer">
                      What does the 60-day cure period actually mean?
                    </summary>
                    <div className="px-4 pb-4 text-gray-400 text-sm border-t border-gray-700/50 pt-3">
                      Before the AG can file an enforcement action, your
                      business must receive written notice of the violation and
                      have 60 days to cure it (&sect; 552.104). For curable
                      violations, if you fix the problem within that window,
                      enforcement cannot proceed. This is meaningful — but it is
                      not a loophole. The AG can still investigate and build a
                      record during that period. Businesses with real compliance
                      documentation have something concrete to show.
                    </div>
                  </details>
                  <details className="bg-gray-800/50 border border-gray-700/50 rounded-lg group">
                    <summary className="p-4 text-gray-200 font-medium text-sm cursor-pointer">
                      Are these documents legal advice?
                    </summary>
                    <div className="px-4 pb-4 text-gray-400 text-sm border-t border-gray-700/50 pt-3">
                      No. We are not a law firm. These are compliance templates
                      built from the enrolled statute text — a defensible
                      starting point, not a substitute for legal counsel. A lot
                      of our customers hand these to their attorney for review.
                      That saves their attorney hours of drafting time at $400
                      an hour.
                    </div>
                  </details>
                  <details className="bg-gray-800/50 border border-gray-700/50 rounded-lg group">
                    <summary className="p-4 text-gray-200 font-medium text-sm cursor-pointer">
                      What about the DIR rulemaking?
                    </summary>
                    <div className="px-4 pb-4 text-gray-400 text-sm border-t border-gray-700/50 pt-3">
                      Rulemaking authority under TRAIGA sits with the Texas
                      Department of Information Resources (DIR). Our templates
                      address the statutory requirements directly from the
                      enrolled bill text. When DIR publishes rules that affect
                      the compliance requirements, we will update the documents
                      and notify customers.
                    </div>
                  </details>
                </div>

                {/* Trust section */}
                <div className="bg-green-950/30 border border-green-800/40 rounded-xl p-6 mb-8">
                  <p className="text-green-400 font-semibold mb-2">
                    Verified Against Enrolled Statute Text
                  </p>
                  <p className="text-gray-300 text-sm">
                    Every requirement in these documents traces to a specific
                    section of HB 149. No summaries. No AI-generated legal
                    claims.
                  </p>
                </div>
                <div className="grid sm:grid-cols-3 gap-4 mb-10">
                  <div className="text-center">
                    <p className="text-white font-semibold text-sm mb-1">
                      Statute-sourced
                    </p>
                    <p className="text-gray-400 text-xs">
                      Built from the enrolled text on{" "}
                      <a
                        href="https://capitol.texas.gov/BillLookup/Text.aspx?LegSess=89R&Bill=HB149"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-white underline"
                      >
                        capitol.texas.gov
                      </a>
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-white font-semibold text-sm mb-1">
                      NIST AI 600-1 aligned
                    </p>
                    <p className="text-gray-400 text-xs">
                      Built to the safe harbor standard in &sect; 552.105(e)
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-white font-semibold text-sm mb-1">
                      Attorney-ready
                    </p>
                    <p className="text-gray-400 text-xs">
                      Hand directly to legal counsel for review
                    </p>
                  </div>
                </div>
              </div>

              {/* Right sidebar — Did You Know? */}
              <aside className="hidden xl:block">
                <div className="sticky top-8">
                  <div className="border-l-4 border-amber-500 pl-4">
                    <p className="text-amber-400 font-semibold text-sm mb-3 flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                      </svg>
                      Did You Know?
                    </p>
                    <div className="space-y-4">
                      {microFacts.map((mf, i) => (
                        <div key={i}>
                          <p className="text-gray-400 text-xs leading-relaxed">
                            {mf.fact}
                          </p>
                          <a
                            href={mf.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-amber-600 hover:text-amber-500 text-[10px] mt-1 inline-block"
                          >
                            Source: {mf.source}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </aside>
            </div>

            {/* Mobile-only Did You Know */}
            <details className="xl:hidden mt-8 bg-gray-800/50 rounded-lg border border-amber-500/30">
              <summary className="p-4 text-amber-400 font-semibold text-sm cursor-pointer flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.72 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
                Did You Know? — Quick Facts About TRAIGA
              </summary>
              <div className="px-4 pb-4 space-y-4 border-t border-gray-700/50 mt-1 pt-4">
                {microFacts.map((mf, i) => (
                  <div key={i}>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {mf.fact}
                    </p>
                    <a
                      href={mf.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-600 hover:text-amber-500 text-xs mt-1 inline-block"
                    >
                      Source: {mf.source}
                    </a>
                  </div>
                ))}
              </div>
            </details>
          </div>
        </section>

        {/* Sources bibliography */}
        <section className="bg-slate-900 py-8">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">
              Sources
            </p>
            <ol className="list-decimal list-inside text-gray-400 text-xs space-y-1.5">
              <li>
                <a
                  href="https://capitol.texas.gov/BillLookup/History.aspx?LegSess=89R&Bill=HB149"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 underline"
                >
                  Texas Legislature Online — HB 149 Bill History (89th
                  Legislature)
                </a>
              </li>
              <li>
                <a
                  href="https://capitol.texas.gov/BillLookup/Text.aspx?LegSess=89R&Bill=HB149"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 underline"
                >
                  Texas Legislature Online — HB 149 Enrolled Text (Texas
                  Responsible AI Governance Act)
                </a>
              </li>
              <li>
                <a
                  href="https://iapp.org/news/a/governor-signs-texas-responsible-artificial-intelligence-governance-act"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 underline"
                >
                  IAPP — Governor Signs Texas Responsible Artificial
                  Intelligence Governance Act
                </a>
              </li>
              <li>
                <a
                  href="https://www.ncsl.org/technology-and-communication/artificial-intelligence-2025-legislation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 underline"
                >
                  NCSL — Artificial Intelligence 2025 Legislation
                </a>
              </li>
            </ol>
          </div>
        </section>

        {/* Lifestyle image before CTA */}
        <div className="bg-gray-950">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8">
            <img
              src="/images/landing/professional-reviewing-documents.png"
              alt="Professional reviewing AI compliance documents on a laptop"
              className="w-full h-48 sm:h-64 object-cover rounded-xl"
            />
          </div>
        </div>

        {/* Final CTA */}
        <section className="bg-gray-950 py-16 sm:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-red-400 text-sm font-semibold uppercase tracking-wider mb-4">
              In effect since January 1, 2026
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-white mb-4">
              Don&apos;t wait for a complaint.
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              7 documents. Mapped to the statute. Aligned to NIST AI 600-1.
              Instant download. All sales final. $299.
            </p>
            <Link
              href="/products/texas-traiga"
              className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-semibold text-lg px-8 py-4 rounded-lg transition-colors shadow-lg shadow-blue-600/25"
            >
              Get Your Compliance Package Now
            </Link>
            <p className="text-gray-400 text-xs mt-6">
              These documents are compliance templates, not legal advice. We
              recommend attorney review for your specific situation.
            </p>
          </div>
        </section>
      </main>

      {/* Minimal footer */}
      <footer className="bg-gray-950 border-t border-gray-800 py-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} AI Compliance Documents LLC. All
            rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-gray-300">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-gray-300">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-gray-300">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
