import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Colorado SB 24-205 AI Compliance — What You Need Before June 30, 2026",
  description:
    "Colorado's AI law takes effect June 30, 2026. Penalties up to $20,000 per violation. Get all 8 required compliance documents — built from the enacted statute text, not summaries. $449, instant download.",
  keywords: [
    "Colorado SB205 compliance template",
    "Colorado AI law compliance",
    "SB24-205 compliance checklist",
    "AI impact assessment template Colorado",
    "Colorado AI compliance documents",
    "AI risk management policy template",
    "AI governance policy template",
    "Colorado AI Act requirements 2026",
  ],
  alternates: {
    canonical: "https://aicompliancedocuments.com/colorado-ai-compliance",
  },
  openGraph: {
    title:
      "Colorado SB 24-205 AI Compliance — What You Need Before June 30, 2026",
    description:
      "8 required compliance documents for Colorado's AI Consumer Protections Act. Built from enacted statute text. Instant download. $449.",
    url: "https://aicompliancedocuments.com/colorado-ai-compliance",
    type: "website",
  },
};

function LandingSchema() {
  const data = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Colorado SB 24-205 AI Compliance Package",
    description:
      "Complete 8-document compliance package for Colorado's AI Consumer Protections Act (SB 24-205). Covers risk management, impact assessments, consumer notices, and algorithmic discrimination prevention.",
    url: "https://aicompliancedocuments.com/colorado-ai-compliance",
    brand: {
      "@type": "Organization",
      name: "AI Compliance Documents",
      url: "https://aicompliancedocuments.com",
    },
    offers: {
      "@type": "Offer",
      price: "449",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: "https://aicompliancedocuments.com/products/colorado-sb24-205",
    },
  });
  return <script type="application/ld+json">{data}</script>;
}

/* --- Verified data --- */

const microFacts = [
  {
    fact: "The federal Executive Order on AI (EO 14110) was rescinded January 20, 2025 — making state laws like SB 24-205 the primary AI governance framework in the U.S.",
    source: "NIST",
    sourceUrl:
      "https://www.nist.gov/artificial-intelligence/executive-order-safe-secure-and-trustworthy-artificial-intelligence",
  },
  {
    fact: "NIST's AI RMF has 12 published crosswalks mapping it to standards from the EU, Japan, Korea, Singapore, and ISO — Colorado's affirmative defense shares DNA with EU-level AI regulation.",
    source: "NIST AI Resource Center",
    sourceUrl: "https://airc.nist.gov/airmf-resources/crosswalks/",
  },
  {
    fact: "The AG has exclusive enforcement authority — there is no private right of action. Consumers cannot sue you directly under this law.",
    source: "C.R.S. \u00A7 6-1-1706(6)",
    sourceUrl: "https://leg.colorado.gov/bills/sb24-205",
  },
  {
    fact: "Insurers and fraternal benefit societies are fully exempt if already subject to Colorado's existing algorithm and predictive model laws (\u00A7 10-3-1104.9).",
    source: "C.R.S. \u00A7 6-1-1705(7)",
    sourceUrl: "https://leg.colorado.gov/bills/sb24-205",
  },
  {
    fact: "Banks, credit unions, and affiliates are exempt if examined by a state or federal prudential regulator under published AI guidance.",
    source: "C.R.S. \u00A7 6-1-1705(8)",
    sourceUrl: "https://leg.colorado.gov/bills/sb24-205",
  },
  {
    fact: "Violations are treated as deceptive trade practices under the Colorado Consumer Protection Act — existing penalty structures apply, not a bespoke fine schedule.",
    source: "C.R.S. \u00A7 6-1-1706(2)",
    sourceUrl: "https://leg.colorado.gov/bills/sb24-205",
  },
  {
    fact: "Even the Colorado Attorney General's own website still lists the original February 1, 2026 effective date. SB 25B-004 delayed it to June 30, 2026, but the AG hasn't updated their page.",
    source: "Colorado AG / SB 25B-004",
    sourceUrl: "https://leg.colorado.gov/bills/sb25b-004",
  },
  {
    fact: "NIST AI RMF 1.0 is currently being revised — meaning the framework underpinning the affirmative defense is itself a moving target.",
    source: "NIST AI Resource Center",
    sourceUrl: "https://airc.nist.gov/airmf-resources/crosswalks/",
  },
];

const documents = [
  {
    name: "Risk Management Policy",
    citation: "\u00A7 6-1-1703(2)",
    desc: "Your risk management program — the law says it must be iterative, regularly reviewed, and consider NIST AI RMF or ISO/IEC 42001.",
  },
  {
    name: "Impact Assessment",
    citation: "\u00A7 6-1-1703(3)",
    desc: "Required at initial deployment, annually, and within 90 days of any substantial modification. Must be retained for 3+ years.",
  },
  {
    name: "Consumer Notification Template",
    citation: "\u00A7 6-1-1703(4)(a)",
    desc: "The notice you must give consumers before a high-risk AI system is used in a consequential decision. Not after. Before.",
  },
  {
    name: "Consumer Disclosure Statement",
    citation: "\u00A7 6-1-1704",
    desc: "Consumers have the right to know they're interacting with AI. This document covers that disclosure.",
  },
  {
    name: "Algorithmic Discrimination Prevention Plan",
    citation: "\u00A7 6-1-1703(2)(a)",
    desc: "Your documented approach to identifying, preventing, and mitigating discrimination across protected characteristics.",
  },
  {
    name: "Human Oversight Protocol",
    citation: "\u00A7 6-1-1703(4)(b)(III)",
    desc: "If a consumer appeals an adverse AI decision, human review is required 'if technically feasible.' This documents your process.",
  },
  {
    name: "Compliance Checklist",
    citation: "All sections",
    desc: "Every deployer obligation in one place. Cross-referenced to statute sections so you can verify each requirement yourself.",
  },
  {
    name: "Affirmative Defense Documentation",
    citation: "\u00A7 6-1-1706(3)",
    desc: "The affirmative defense requires two things: following NIST AI RMF and having a process to discover and cure violations. This builds both.",
  },
];

const selfAssessment = [
  {
    question: "Do you use AI in hiring, recruiting, or performance reviews?",
    domain: "Employment",
  },
  {
    question:
      "Do you use algorithmic underwriting, credit scoring, or lending decisions?",
    domain: "Financial services",
  },
  {
    question: "Do you use AI-driven risk scoring for insurance?",
    domain: "Insurance",
  },
  {
    question:
      "Do you use AI for patient triage, treatment recommendations, or clinical decisions?",
    domain: "Healthcare",
  },
  {
    question:
      "Do you use AI for tenant screening, rental decisions, or mortgage processing?",
    domain: "Housing",
  },
  {
    question:
      "Do you use AI to determine eligibility for education programs or financial aid?",
    domain: "Education",
  },
];

export default function ColoradoAICompliancePage() {
  return (
    <>
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
            Deadline: June 30, 2026
          </span>
        </div>
      </header>

      <main id="main-content">
        {/* Hero — Realist voice */}
        <section className="bg-gray-950 text-white py-16 sm:py-20 md:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-red-400 text-sm font-semibold uppercase tracking-wider mb-4">
              Colorado SB 24-205 &middot; Enforcement begins June 30, 2026
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display leading-tight mb-6">
              You Just Found Out Your
              <br />
              Business Uses AI
            </h1>
            <p className="text-gray-300 text-lg sm:text-xl leading-relaxed mb-4 max-w-2xl mx-auto">
              If that AI makes decisions about hiring, lending, insurance,
              healthcare, housing, or education for Colorado residents — you need
              compliance documentation. That&apos;s the law.
            </p>
            <p className="text-gray-500 text-sm mb-8 max-w-xl mx-auto">
              Built from the{" "}
              <a
                href="https://leg.colorado.gov/bills/sb24-205"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                enacted statute text
              </a>{" "}
              on leg.colorado.gov. Not summaries. Not paraphrases. Not training
              data.
            </p>
            <Link
              href="/products/colorado-sb24-205"
              className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-semibold text-lg px-8 py-4 rounded-lg transition-colors shadow-lg shadow-blue-600/25"
            >
              Get All 8 Documents — $449
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
                30-day money-back guarantee
              </span>
            </div>
          </div>
        </section>

        {/* Penalty strip — Credentialist voice */}
        <section className="bg-red-950/30 border-y border-red-900/40 py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="grid sm:grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-2xl sm:text-3xl font-bold font-display text-white">
                  $20,000
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  per violation
                  <br />
                  <span className="text-gray-600 text-xs">
                    C.R.S. &sect; 6-1-112(1)(a)
                  </span>
                </p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold font-display text-white">
                  $50,000
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  per violation, age 60+
                  <br />
                  <span className="text-gray-600 text-xs">
                    C.R.S. &sect; 6-1-112(1)(c)
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
                  <span className="text-gray-600 text-xs">
                    C.R.S. &sect; 6-1-1706(6)
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
                        Colorado SB 24-205, signed May 2024, is the first
                        comprehensive state law governing AI. It targets any AI
                        system that makes or substantially influences a
                        &ldquo;consequential decision&rdquo; — decisions about
                        employment, lending, housing, insurance, healthcare,
                        education, or government services (&sect; 6-1-1701(3)).
                      </p>
                      <p>
                        The law distinguishes &ldquo;developers&rdquo; (who
                        build AI systems) from &ldquo;deployers&rdquo; (who use
                        them). Developers must provide documentation about
                        training data, limitations, and discrimination risks
                        (&sect; 6-1-1702(2)). Deployers must implement risk
                        management programs and conduct impact assessments
                        (&sect; 6-1-1703(2)&ndash;(3)). Separate
                        responsibilities. Separate documents.
                      </p>
                      <p>
                        The affirmative defense (&sect; 6-1-1706(3)) requires
                        two things: following NIST AI RMF or ISO/IEC 42001,{" "}
                        <em>and</em> having a process to discover and cure
                        violations through feedback, adversarial testing, or
                        internal review. Following NIST alone is not enough.
                      </p>
                      <p>
                        If you discover algorithmic discrimination, a 90-day
                        clock starts. Deployers must notify the AG within 90
                        days of discovery (&sect; 6-1-1703(7)). Developers must
                        notify the AG <em>and</em> all known deployers (&sect;
                        6-1-1702(5)).
                      </p>
                      <p>
                        The original effective date was February 1, 2026.{" "}
                        <a
                          href="https://leg.colorado.gov/bills/sb25b-004"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-400 hover:text-indigo-300 underline"
                        >
                          SB 25B-004
                        </a>
                        , signed August 28, 2025, delayed it to June 30, 2026.
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
                      Colorado SB 24-205, signed May 2024, is the first
                      comprehensive state law governing AI. It targets any AI
                      system that makes or substantially influences a
                      &ldquo;consequential decision&rdquo; about employment,
                      lending, housing, insurance, healthcare, education, or
                      government services (&sect; 6-1-1701(3)).
                    </p>
                    <p>
                      The law distinguishes &ldquo;developers&rdquo; from
                      &ldquo;deployers.&rdquo; Developers must provide
                      documentation about training data, limitations, and
                      discrimination risks. Deployers must implement risk
                      management programs and conduct impact assessments.
                      Separate responsibilities. Separate documents.
                    </p>
                    <p>
                      The affirmative defense (&sect; 6-1-1706(3)) requires two
                      things: following NIST AI RMF or ISO/IEC 42001,{" "}
                      <em>and</em> having a process to discover and cure
                      violations. Following NIST alone is not enough.
                    </p>
                    <p>
                      If you discover algorithmic discrimination, a 90-day clock
                      starts. Deployers must notify the AG. Developers must
                      notify the AG <em>and</em> all known deployers.
                    </p>
                  </div>
                </details>

                {/* Realist voice — opening */}
                <h2 className="text-2xl font-bold font-display text-white mb-4">
                  Here&apos;s what&apos;s actually happening.
                </h2>
                <p className="text-gray-300 leading-relaxed mb-5">
                  Colorado passed SB 24-205 in May 2024. It was supposed to take
                  effect February 1, 2026. A{" "}
                  <a
                    href="https://leg.colorado.gov/bills/sb25b-004"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    special session bill
                  </a>{" "}
                  in August 2025 pushed it to June 30, 2026. That&apos;s the
                  deadline you&apos;re working with.
                </p>
                <p className="text-gray-300 leading-relaxed mb-5">
                  If your business deploys AI that makes or substantially
                  influences decisions about Colorado residents in any of eight
                  domains — employment, lending, insurance, healthcare, housing,
                  education, government services, or legal services — you are a
                  &ldquo;deployer&rdquo; under this law. That&apos;s probably
                  why you&apos;re here.
                </p>

                {/* Amber warning — AG rulemaking */}
                <div className="bg-amber-950/30 border border-amber-800/40 rounded-lg p-5 mb-8">
                  <p className="text-amber-400 font-semibold text-sm mb-2">
                    AG Rulemaking Has Not Begun
                  </p>
                  <p className="text-gray-400 text-sm">
                    As of March 2026, the Colorado Attorney General has not
                    published proposed rules for SB 24-205. The pre-rulemaking
                    input window is closed. Our templates address the statutory
                    requirements directly — when rules are finalized, we update.
                  </p>
                </div>

                {/* Interactive self-assessment */}
                <h3 className="text-xl font-bold font-display text-white mb-4 mt-10">
                  Does this apply to you?
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  If you answer &ldquo;yes&rdquo; to any of these, SB 24-205
                  likely covers your business. There is no revenue threshold. No
                  employee minimum for most obligations.
                </p>
                <div className="space-y-3 mb-8">
                  {selfAssessment.map((item, i) => (
                    <label
                      key={i}
                      className="flex items-start gap-3 bg-gray-800/50 border border-gray-700/50 rounded-lg p-4 cursor-pointer hover:border-blue-500/30 transition-colors group"
                    >
                      <input
                        type="checkbox"
                        className="mt-1 w-4 h-4 rounded border-gray-600 text-blue-600 focus:ring-blue-500 bg-gray-700"
                      />
                      <div>
                        <p className="text-gray-200 text-sm group-hover:text-white transition-colors">
                          {item.question}
                        </p>
                        <p className="text-gray-600 text-xs mt-0.5">
                          Consequential decision domain: {item.domain} (&sect;
                          6-1-1701(3))
                        </p>
                      </div>
                    </label>
                  ))}
                </div>

                {/* Credentialist voice — size exemption detail */}
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-5 mb-8">
                  <p className="text-white font-semibold text-sm mb-2">
                    The 50-Employee Exception
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Deployers with fewer than 50 FTE who don&apos;t use their
                    own data to train the AI system are exempt from the risk
                    management policy, impact assessment, and public statement
                    requirements (&sect; 6-1-1703(6)). But they are{" "}
                    <em>not</em> exempt from consumer notification, adverse
                    decision disclosures, or the 90-day AG reporting obligation.
                    Partial exemption, not a free pass.
                  </p>
                </div>

                {/* Divider */}
                <hr className="border-gray-700/50 my-10" />

                {/* Documents section — both voices */}
                <h2 className="text-2xl font-bold font-display text-white mb-2">
                  8 Documents. Every Deployer Obligation.
                </h2>
                <p className="text-gray-400 text-sm mb-8">
                  Each document maps to specific sections of{" "}
                  <a
                    href="https://leg.colorado.gov/bills/sb24-205"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    C.R.S. &sect; 6-1-1701 et seq.
                  </a>{" "}
                  and aligns with the NIST AI Risk Management Framework.
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
                            <span className="text-gray-600 text-xs">
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

                {/* Affirmative defense callout — Credentialist */}
                <div className="bg-blue-950/30 border border-blue-800/40 rounded-lg p-6 mb-10">
                  <h3 className="text-blue-400 font-semibold mb-2">
                    The Affirmative Defense — What It Actually Requires
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-3">
                    Under &sect; 6-1-1706(3), if the AG brings an enforcement
                    action, you can defend yourself by demonstrating{" "}
                    <strong className="text-white">two things</strong>:
                  </p>
                  <ol className="list-decimal list-inside text-gray-300 text-sm space-y-2 ml-2">
                    <li>
                      You discovered and cured any violation through user
                      feedback, adversarial testing, or internal review
                    </li>
                    <li>
                      You were following NIST AI RMF <em>and</em> ISO/IEC
                      42001, or an equivalent framework the AG designates
                    </li>
                  </ol>
                  <p className="text-gray-500 text-xs mt-3">
                    The burden is on you. Following NIST alone is not enough —
                    you also need the discovery-and-cure process. Our Affirmative
                    Defense Documentation template builds both.
                  </p>
                </div>

                {/* Price comparison — Realist */}
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
                    <p className="text-gray-500 text-sm mb-1">Law firm</p>
                    <p className="text-2xl font-bold text-gray-500 line-through">
                      $5,000–$25,000
                    </p>
                    <p className="text-gray-600 text-xs mt-1">
                      Weeks of back-and-forth
                    </p>
                  </div>
                  <div className="bg-blue-600/10 border border-blue-500/30 rounded-lg p-5 text-center">
                    <p className="text-blue-400 text-sm mb-1">
                      AI Compliance Documents
                    </p>
                    <p className="text-2xl font-bold text-white">$449</p>
                    <p className="text-gray-400 text-xs mt-1">
                      Instant download, customize today
                    </p>
                  </div>
                </div>

                {/* CTA — mid-page */}
                <div className="text-center my-10">
                  <Link
                    href="/products/colorado-sb24-205"
                    className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-lg transition-colors shadow-lg shadow-blue-600/25"
                  >
                    Get Your Compliance Package — $449
                  </Link>
                </div>

                <hr className="border-gray-700/50 my-10" />

                {/* Add-ons — Realist */}
                <h3 className="text-xl font-bold font-display text-white mb-2">
                  Three situations the base package doesn&apos;t cover.
                </h3>
                <p className="text-gray-400 text-sm mb-6">
                  If any of these apply, add the kit during checkout.
                </p>
                <div className="space-y-4 mb-10">
                  <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-5">
                    <div className="flex items-baseline justify-between mb-1">
                      <h4 className="text-white font-semibold text-sm">
                        Appeal &amp; Correction Kit
                      </h4>
                      <span className="text-blue-400 font-semibold text-sm">
                        $99
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm">
                      A consumer got an adverse decision and wants to appeal or
                      correct their data. You need an intake form, a correction
                      process, and an outcome letter. This kit has all three.
                    </p>
                  </div>
                  <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-5">
                    <div className="flex items-baseline justify-between mb-1">
                      <h4 className="text-white font-semibold text-sm">
                        AG Reporting Kit
                      </h4>
                      <span className="text-blue-400 font-semibold text-sm">
                        $129
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm">
                      You discovered algorithmic discrimination. You have 90
                      days to notify the Attorney General (&sect; 6-1-1703(7)).
                      Discovery form, notification letter, corrective action
                      plan.
                    </p>
                  </div>
                  <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-5">
                    <div className="flex items-baseline justify-between mb-1">
                      <h4 className="text-white font-semibold text-sm">
                        Dev-Deploy Exchange Kit
                      </h4>
                      <span className="text-blue-400 font-semibold text-sm">
                        $109
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm">
                      Developers must provide deployers with documentation about
                      training data, known risks, and limitations (&sect;
                      6-1-1702(2)). This standardizes that exchange with
                      checklists and gap analysis.
                    </p>
                  </div>
                </div>

                {/* FAQ — Realist questions, Credentialist answers */}
                <h3 className="text-xl font-bold font-display text-white mb-6">
                  Questions we hear a lot.
                </h3>
                <div className="space-y-3 mb-10">
                  <details className="bg-gray-800/50 border border-gray-700/50 rounded-lg group">
                    <summary className="p-4 text-gray-200 font-medium text-sm cursor-pointer">
                      I have no idea if our tools use AI.
                    </summary>
                    <div className="px-4 pb-4 text-gray-400 text-sm border-t border-gray-700/50 pt-3">
                      That&apos;s the most common thing we hear. If a tool
                      screens, scores, ranks, recommends, or personalizes —
                      there&apos;s likely AI involved. Hiring platforms (ATS
                      tools with resume screening), CRM systems, marketing
                      personalization, and customer service chatbots all
                      commonly use AI. Start with your{" "}
                      <Link
                        href="/do-i-need-ai-compliance"
                        className="text-blue-400 hover:text-blue-300 underline"
                      >
                        free assessment
                      </Link>
                      .
                    </div>
                  </details>
                  <details className="bg-gray-800/50 border border-gray-700/50 rounded-lg group">
                    <summary className="p-4 text-gray-200 font-medium text-sm cursor-pointer">
                      We&apos;re not in Colorado. Does this still apply?
                    </summary>
                    <div className="px-4 pb-4 text-gray-400 text-sm border-t border-gray-700/50 pt-3">
                      If your AI system makes consequential decisions about
                      Colorado <em>residents</em>, yes. The law covers the
                      consumer&apos;s location, not yours. A New York company
                      using AI to screen job applicants in Colorado is a
                      deployer under SB 24-205.
                    </div>
                  </details>
                  <details className="bg-gray-800/50 border border-gray-700/50 rounded-lg group">
                    <summary className="p-4 text-gray-200 font-medium text-sm cursor-pointer">
                      What&apos;s the difference between a developer and a
                      deployer?
                    </summary>
                    <div className="px-4 pb-4 text-gray-400 text-sm border-t border-gray-700/50 pt-3">
                      A developer builds the AI system (&sect; 6-1-1701(7)). A
                      deployer uses it (&sect; 6-1-1701(6)). If you bought
                      hiring software that uses AI, you&apos;re the deployer.
                      The company that built the software is the developer. Both
                      have obligations, but they&apos;re different obligations.
                      This package covers deployer obligations.
                    </div>
                  </details>
                  <details className="bg-gray-800/50 border border-gray-700/50 rounded-lg group">
                    <summary className="p-4 text-gray-200 font-medium text-sm cursor-pointer">
                      Are these documents legal advice?
                    </summary>
                    <div className="px-4 pb-4 text-gray-400 text-sm border-t border-gray-700/50 pt-3">
                      No. We are not a law firm. These are compliance templates
                      built from the enacted statute text — a defensible
                      starting point, not a substitute for legal counsel. A lot
                      of our customers hand these to their attorney for review.
                      That saves their attorney hours of drafting time at $400
                      an hour.
                    </div>
                  </details>
                  <details className="bg-gray-800/50 border border-gray-700/50 rounded-lg group">
                    <summary className="p-4 text-gray-200 font-medium text-sm cursor-pointer">
                      What happens when the AG publishes rules?
                    </summary>
                    <div className="px-4 pb-4 text-gray-400 text-sm border-t border-gray-700/50 pt-3">
                      We update. As of March 2026, formal rulemaking has not
                      begun (&sect; 6-1-1707 authorizes rulemaking but no
                      proposed rules have been published). Our templates address
                      the statutory requirements directly. When rules are
                      finalized, we&apos;ll update the documents and notify
                      customers.
                    </div>
                  </details>
                </div>

                {/* Trust section — Credentialist */}
                <div className="bg-green-950/30 border border-green-800/40 rounded-xl p-6 mb-8">
                  <p className="text-green-400 font-semibold mb-2">
                    30-Day Money-Back Guarantee
                  </p>
                  <p className="text-gray-300 text-sm">
                    If the documents don&apos;t meet your compliance needs,
                    email us within 30 days for a full refund.
                  </p>
                </div>
                <div className="grid sm:grid-cols-3 gap-4 mb-10">
                  <div className="text-center">
                    <p className="text-white font-semibold text-sm mb-1">
                      Statute-sourced
                    </p>
                    <p className="text-gray-500 text-xs">
                      Built from the enacted text on{" "}
                      <a
                        href="https://leg.colorado.gov/bills/sb24-205"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-300 underline"
                      >
                        leg.colorado.gov
                      </a>
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-white font-semibold text-sm mb-1">
                      NIST-aligned
                    </p>
                    <p className="text-gray-500 text-xs">
                      Risk management mapped to{" "}
                      <a
                        href="https://airc.nist.gov/airmf-resources/crosswalks/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-300 underline"
                      >
                        NIST AI RMF
                      </a>
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-white font-semibold text-sm mb-1">
                      Attorney-ready
                    </p>
                    <p className="text-gray-500 text-xs">
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
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
                Did You Know? — Quick Facts About SB 24-205
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
            <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-3">
              Sources
            </p>
            <ol className="list-decimal list-inside text-gray-500 text-xs space-y-1.5">
              <li>
                <a
                  href="https://leg.colorado.gov/bills/sb24-205"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 underline"
                >
                  Colorado SB 24-205 — Bill Page, Colorado General Assembly
                </a>
              </li>
              <li>
                <a
                  href="https://leg.colorado.gov/sites/default/files/2024a_205_signed.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 underline"
                >
                  SB 24-205 Enrolled Bill (Signed Act) — PDF
                </a>
              </li>
              <li>
                <a
                  href="https://leg.colorado.gov/bills/sb25b-004"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 underline"
                >
                  SB 25B-004 — Effective Date Delay (2025 Extraordinary Session)
                </a>
              </li>
              <li>
                <a
                  href="https://coag.gov/ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 underline"
                >
                  Colorado Attorney General — AI Rulemaking Page
                </a>
              </li>
              <li>
                <a
                  href="https://airc.nist.gov/airmf-resources/crosswalks/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 underline"
                >
                  NIST AI RMF Crosswalks — AI Resource Center
                </a>
              </li>
              <li>
                <a
                  href="https://www.nist.gov/artificial-intelligence/executive-order-safe-secure-and-trustworthy-artificial-intelligence"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 underline"
                >
                  NIST — Executive Order on AI (Rescission Notice)
                </a>
              </li>
            </ol>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-gray-950 py-16 sm:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-red-400 text-sm font-semibold uppercase tracking-wider mb-4">
              June 30, 2026
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-white mb-4">
              Don&apos;t wait for a complaint.
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              8 documents. Mapped to the statute. Aligned to NIST AI RMF.
              Instant download. 30-day guarantee. $449.
            </p>
            <Link
              href="/products/colorado-sb24-205"
              className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-semibold text-lg px-8 py-4 rounded-lg transition-colors shadow-lg shadow-blue-600/25"
            >
              Get Your Compliance Package Now
            </Link>
            <p className="text-gray-600 text-xs mt-6">
              These documents are compliance templates, not legal advice. We
              recommend attorney review for your specific situation.
            </p>
          </div>
        </section>
      </main>

      {/* Minimal footer */}
      <footer className="bg-gray-950 border-t border-gray-800 py-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
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
