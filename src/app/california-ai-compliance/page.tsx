import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "California CCPA ADMT Compliance — Risk Assessments Required Now, Opt-Out Notices Due January 2027",
  description:
    "California's CCPA ADMT and risk assessment regulations are in effect. Risk assessments required January 1, 2026. ADMT opt-out notices due January 1, 2027. Penalties up to $7,500 per intentional violation. Get all 7 compliance documents — built from CalPrivacy's published regulations. $499, instant download.",
  keywords: [
    "California CCPA ADMT compliance",
    "California AI risk assessment template",
    "CCPA automated decision making compliance",
    "CalPrivacy ADMT regulations",
    "California AI compliance documents",
    "CCPA risk assessment template",
    "California automated decision-making opt-out",
    "CPPA ADMT compliance 2026",
    "California AI compliance 2027",
  ],
  alternates: {
    canonical: "https://aicompliancedocuments.com/california-ai-compliance",
  },
  openGraph: {
    title:
      "California CCPA ADMT Compliance — Risk Assessments Required Now, Opt-Out Notices Due January 2027",
    description:
      "7 compliance documents for California's CCPA ADMT and risk assessment regulations. Risk assessments required now. ADMT notices due January 2027. Built from CalPrivacy's published rules. $499, instant download.",
    url: "https://aicompliancedocuments.com/california-ai-compliance",
    type: "website",
  },
};

function LandingSchema() {
  const data = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Product",
    name: "California CCPA ADMT Compliance Package",
    description:
      "Complete 7-document compliance package for California's CCPA ADMT and risk assessment regulations. Covers risk assessment frameworks, pre-use ADMT notices, opt-out mechanisms, consumer rights procedures, and data processing inventory.",
    url: "https://aicompliancedocuments.com/california-ai-compliance",
    brand: {
      "@type": "Organization",
      name: "AI Compliance Documents",
      url: "https://aicompliancedocuments.com",
    },
    offers: {
      "@type": "Offer",
      price: "499",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: "https://aicompliancedocuments.com/products/california-ccpa-admt",
    },
  });
  return <script type="application/ld+json">{data}</script>;
}

/* --- Verified data — sourced from blog post and regulations.ts only --- */

const microFacts = [
  {
    fact: "The California Office of Administrative Law approved the ADMT, risk assessment, and cybersecurity audit regulations on September 22, 2025, concluding a rulemaking process that began with preliminary public comments in February 2023.",
    source: "California Privacy Protection Agency",
    sourceUrl: "https://cppa.ca.gov/announcements/2025/20250923.html",
  },
  {
    fact: "CalPrivacy fined Tractor Supply Company $1.35 million in September 2025 — the largest fine in the agency's history — for failing to properly notify consumers and job applicants of their privacy rights under the CCPA.",
    source: "California Privacy Protection Agency",
    sourceUrl: "https://cppa.ca.gov/announcements/2025/20250930.html",
  },
  {
    fact: "In January 2026, CalPrivacy ordered a data broker called Datamasters to stop selling all Californians' personal information after it was found reselling lists of people with Alzheimer's disease, drug addiction, and other health conditions for targeted advertising.",
    source: "California Privacy Protection Agency",
    sourceUrl: "https://cppa.ca.gov/announcements/2026/20260108.html",
  },
  {
    fact: "The California Privacy Protection Agency received public comments from more than 50 organizations — including the U.S. Chamber of Commerce, Mozilla, Consumer Reports, and Stanford's AI institute — during the preliminary comment period for the ADMT and risk assessment rules.",
    source: "California Privacy Protection Agency",
    sourceUrl: "https://cppa.ca.gov/regulations/ccpa_updates.html",
  },
];

const documents = [
  {
    name: "Pre-Use Notice Template",
    desc: "Before or at the point of using ADMT for a significant decision, you must provide this notice explaining what the technology is, how it's being used, and what kind of decision it's involved in. Required by January 1, 2027.",
  },
  {
    name: "Opt-Out Mechanism Documentation",
    desc: "Consumers must have the ability to opt out of ADMT in certain circumstances. This documents your opt-out process and the mechanism for consumers to exercise that right.",
  },
  {
    name: "ADMT Impact Assessment",
    desc: "A documented risk assessment for each processing activity involving automated decision-making technology. Covers purpose, data involved, benefits, risks to consumers, and your mitigation measures.",
  },
  {
    name: "Consumer Rights Response Procedures",
    desc: "Internal policies for how your organization handles opt-out requests and other consumer rights requests under the CCPA ADMT regulations.",
  },
  {
    name: "Data Processing Inventory",
    desc: "A structured inventory of every AI and automated decision-making system that processes personal information — the foundation document for all other compliance work.",
  },
  {
    name: "Human Oversight Protocol",
    desc: "Documents your process for human review of automated decisions, including how opt-out requests are escalated and handled by staff.",
  },
  {
    name: "Compliance Checklist",
    desc: "Every obligation under the CCPA ADMT regulations in one place — risk assessments, ADMT notices, opt-out mechanisms, and attestation deadlines — cross-referenced to the regulation's requirements.",
  },
];

const selfAssessment = [
  {
    question:
      "Do you use AI or automated tools to make hiring, promotion, or termination decisions?",
    domain: "Employment",
  },
  {
    question:
      "Do you use automated systems for credit scoring, loan approvals, or financial eligibility?",
    domain: "Financial services",
  },
  {
    question:
      "Do you use AI to determine insurance eligibility, pricing, or risk scores?",
    domain: "Insurance",
  },
  {
    question:
      "Do you use automated profiling to deliver targeted advertising to California consumers?",
    domain: "Advertising / profiling",
  },
  {
    question:
      "Do you use AI for service eligibility decisions — such as healthcare approvals or platform access?",
    domain: "Service eligibility",
  },
  {
    question:
      "Do you sell or share personal information of California consumers?",
    domain: "Data sharing / selling",
  },
];

export default function CaliforniaAICompliancePage() {
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
            Risk assessments: required now
          </span>
        </div>
      </header>

      <main id="main-content">
        {/* Hero */}
        <section className="bg-gray-950 text-white py-16 sm:py-20 md:py-24 relative overflow-hidden">
          {/* Background image — California Golden Gate */}
          <div className="absolute inset-0">
            <img
              src="/images/landing/california-golden-gate.png"
              alt=""
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-gray-950/80 via-gray-950/90 to-gray-950" />
          </div>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
            <p className="text-red-400 text-sm font-semibold uppercase tracking-wider mb-4">
              California CCPA ADMT &middot; Risk assessments required since
              January 1, 2026
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display leading-tight mb-6">
              California&apos;s AI Rules
              <br />
              Are Already in Effect
            </h1>
            <p className="text-gray-300 text-lg sm:text-xl leading-relaxed mb-4 max-w-2xl mx-auto">
              If your business uses automated systems to make decisions about
              California consumers — who gets hired, approved, or profiled — you
              needed to start documenting risk assessments on January 1, 2026.
              ADMT opt-out notices are due January 1, 2027.
            </p>
            <p className="text-gray-400 text-sm mb-8 max-w-xl mx-auto">
              Built from{" "}
              <a
                href="https://cppa.ca.gov/regulations/ccpa_updates.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                CalPrivacy&apos;s published regulations
              </a>{" "}
              at cppa.ca.gov. Not summaries. Not paraphrases. Not training data.
            </p>
            <Link
              href="/products/california-ccpa-admt"
              className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-semibold text-lg px-8 py-4 rounded-lg transition-colors shadow-lg shadow-blue-600/25"
            >
              Get All 7 Documents — $499
            </Link>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400 mt-6">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                Instant download
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                Regulation-cited
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
                  $2,500
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  per unintentional violation
                  <br />
                  <span className="text-gray-500 text-xs">
                    Cal. Civ. Code &sect; 1798.155
                  </span>
                </p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold font-display text-white">
                  $7,500
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  per intentional violation
                  <br />
                  <span className="text-gray-500 text-xs">
                    Cal. Civ. Code &sect; 1798.155
                  </span>
                </p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold font-display text-white">
                  Multiplies
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  per consumer, per violation
                  <br />
                  <span className="text-gray-500 text-xs">
                    CPPA + CA Attorney General
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
                        California&apos;s CCPA ADMT regulations were approved by
                        the Office of Administrative Law on September 22, 2025,
                        after a rulemaking process that began in February 2023.
                        They took effect January 1, 2026.
                      </p>
                      <p>
                        The regulations have staggered deadlines. Risk
                        assessments are required now — if you process personal
                        information for profiling, sell or share data, or use
                        ADMT for significant decisions, you must be conducting
                        and documenting risk assessments today. Summaries and
                        attestations must be submitted to CalPrivacy by April 1,
                        2028.
                      </p>
                      <p>
                        ADMT-specific requirements — pre-use notices and opt-out
                        rights — begin January 1, 2027. That deadline sounds
                        distant until you account for the time needed to
                        inventory every automated decision-making system, draft
                        notices, build opt-out mechanisms, and train staff.
                      </p>
                      <p>
                        The CCPA applies to your business if you do business in
                        California and meet any one of: annual gross revenue over
                        $25 million (national, not California-specific), buying
                        or selling the personal information of 100,000 or more
                        consumers or households per year, or deriving 50% or
                        more of annual revenue from selling or sharing
                        consumers&apos; personal information.
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
                    Deep Dive — How the Regulations Actually Work
                  </summary>
                  <div className="px-4 pb-4 text-gray-400 text-sm leading-relaxed space-y-3 border-t border-gray-700/50 mt-1 pt-4">
                    <p>
                      California&apos;s CCPA ADMT regulations were approved
                      September 22, 2025, and took effect January 1, 2026. They
                      cover cybersecurity audits, risk assessments, and
                      Automated Decisionmaking Technology (ADMT).
                    </p>
                    <p>
                      The deadlines are staggered. Risk assessments: required
                      now, with attestations due April 1, 2028. ADMT notices and
                      opt-out rights: required January 1, 2027. Cybersecurity
                      audits: phased by revenue, starting April 1, 2028 for
                      businesses over $100 million.
                    </p>
                    <p>
                      The CCPA covers your business if you do business in
                      California with annual gross revenue over $25 million (not
                      just California revenue), or you buy/sell/share data of
                      100,000+ consumers per year, or 50%+ of revenue comes from
                      selling or sharing consumer data.
                    </p>
                  </div>
                </details>

                {/* Realist voice — opening */}
                <h2 className="text-2xl font-bold font-display text-white mb-4">
                  Here&apos;s what&apos;s actually happening.
                </h2>
                <p className="text-gray-300 leading-relaxed mb-5">
                  On September 22, 2025, the California Office of Administrative
                  Law approved a package of regulations covering cybersecurity
                  audits, risk assessments, and Automated Decisionmaking
                  Technology. The{" "}
                  <a
                    href="https://cppa.ca.gov/announcements/2025/20250923.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    press release went out September 23
                  </a>
                  . Most businesses completely ignored it.
                </p>
                <p className="text-gray-300 leading-relaxed mb-5">
                  If your business is subject to the CCPA and uses automated
                  systems to make decisions about consumers — who gets hired,
                  who gets approved for credit, who sees which ads — the
                  compliance clock has already started. Risk assessments have
                  been required since January 1, 2026. That&apos;s not a future
                  deadline. It&apos;s now.
                </p>

                {/* Two-deadline callout */}
                <div className="bg-amber-950/30 border border-amber-800/40 rounded-lg p-5 mb-8">
                  <p className="text-amber-400 font-semibold text-sm mb-3">
                    Two Deadlines. Both Matter.
                  </p>
                  <div className="space-y-3">
                    <div>
                      <p className="text-white text-sm font-medium">
                        January 1, 2026 — Risk Assessments (Active Now)
                      </p>
                      <p className="text-gray-400 text-xs mt-1">
                        If you process personal information for profiling, sell
                        or share data, or use ADMT for significant decisions,
                        you must be conducting and documenting risk assessments
                        today. Attestation summary due to CalPrivacy by April 1,
                        2028.
                      </p>
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">
                        January 1, 2027 — ADMT Notices &amp; Opt-Outs
                      </p>
                      <p className="text-gray-400 text-xs mt-1">
                        Pre-use notices must be provided before or at the point
                        of using ADMT for significant decisions about consumers.
                        Opt-out mechanisms must be in place. Nine months to
                        identify every automated system, draft notices, build
                        opt-out processes, and train staff.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Interactive self-assessment */}
                <h3 className="text-xl font-bold font-display text-white mb-4 mt-10">
                  Does this apply to you?
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  If you answer &ldquo;yes&rdquo; to any of these, the CCPA
                  ADMT regulations likely cover your business — assuming you
                  meet the CCPA revenue and data thresholds.
                </p>
                <fieldset>
                  <legend className="sr-only">
                    Self-assessment: Does California CCPA ADMT apply to you?
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
                            Decision domain: {item.domain}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                </fieldset>

                {/* Revenue threshold callout */}
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-5 mb-8">
                  <p className="text-white font-semibold text-sm mb-2">
                    The $25 Million Threshold
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    The CCPA applies to your business if you do business in
                    California AND meet any one of: annual gross revenue over
                    $25 million (this is national revenue, not
                    California-specific), buying or selling the personal
                    information of 100,000 or more consumers or households per
                    year, or deriving 50% or more of annual revenue from selling
                    or sharing consumers&apos; personal information. If your
                    business makes $25 million nationally and has even one
                    California customer, you&apos;re covered.
                  </p>
                </div>

                {/* Lifestyle image break */}
                <div className="my-10 rounded-xl overflow-hidden">
                  <img
                    src="/images/landing/team-compliance-meeting.png"
                    alt="Compliance team reviewing AI risk assessment documents in a modern office"
                    className="w-full h-48 sm:h-56 object-cover"
                  />
                </div>

                {/* Documents section */}
                <h2 className="text-2xl font-bold font-display text-white mb-2">
                  7 Documents. Both Deadlines Covered.
                </h2>
                <p className="text-gray-400 text-sm mb-8">
                  Each document addresses specific requirements of the{" "}
                  <a
                    href="https://cppa.ca.gov/regulations/ccpa_updates.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    CPPA ADMT and risk assessment regulations
                  </a>{" "}
                  published at cppa.ca.gov.
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
                          <h3 className="text-white font-semibold">
                            {doc.name}
                          </h3>
                          <p className="text-gray-400 text-sm mt-1">
                            {doc.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Enforcement callout */}
                <div className="bg-blue-950/30 border border-blue-800/40 rounded-lg p-6 mb-10">
                  <h3 className="text-blue-400 font-semibold mb-2">
                    CalPrivacy Is Actively Enforcing
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-3">
                    In the last six months, CalPrivacy fined Tractor Supply
                    Company $1.35 million, American Honda Motor Co. $632,500,
                    and Todd Snyder $345,178. In January 2026 they issued two
                    more enforcement decisions and ordered Datamasters to stop
                    selling all Californians&apos; personal information.
                  </p>
                  <p className="text-gray-400 text-xs">
                    The California Attorney General retains independent
                    enforcement authority under the CCPA. Both can bring
                    actions. There is no private right of action for
                    ADMT-specific violations.
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
                    <p className="text-2xl font-bold text-white">$499</p>
                    <p className="text-gray-400 text-xs mt-1">
                      Instant download, customize today
                    </p>
                  </div>
                </div>

                {/* CTA — mid-page */}
                <div className="text-center my-10">
                  <Link
                    href="/products/california-ccpa-admt"
                    className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-lg transition-colors shadow-lg shadow-blue-600/25"
                  >
                    Get Your Compliance Package — $499
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
                      The risk assessment deadline already passed. Are we in
                      violation?
                    </summary>
                    <div className="px-4 pb-4 text-gray-400 text-sm border-t border-gray-700/50 pt-3">
                      The compliance obligation started January 1, 2026. If you
                      haven&apos;t started, the right move is to start now and
                      document that you did. The submission deadline for
                      attestations isn&apos;t until April 1, 2028 — but if
                      CalPrivacy comes knocking before then, you need to show
                      that assessments were being conducted. Starting today puts
                      you in a better position than not starting.
                    </div>
                  </details>
                  <details className="bg-gray-800/50 border border-gray-700/50 rounded-lg group">
                    <summary className="p-4 text-gray-200 font-medium text-sm cursor-pointer">
                      We&apos;re not in California. Does this still apply?
                    </summary>
                    <div className="px-4 pb-4 text-gray-400 text-sm border-t border-gray-700/50 pt-3">
                      The CCPA covers businesses that &ldquo;do business in
                      California&rdquo; — not businesses headquartered there.
                      The $25 million revenue threshold is based on your total
                      annual gross revenue, not California-specific revenue. A
                      company anywhere in the world that processes personal
                      information of California consumers and meets the CCPA
                      thresholds is covered.
                    </div>
                  </details>
                  <details className="bg-gray-800/50 border border-gray-700/50 rounded-lg group">
                    <summary className="p-4 text-gray-200 font-medium text-sm cursor-pointer">
                      What exactly counts as &ldquo;significant
                      decisions&rdquo;?
                    </summary>
                    <div className="px-4 pb-4 text-gray-400 text-sm border-t border-gray-700/50 pt-3">
                      The regulations address ADMT used for decisions that
                      substantially determine outcomes for consumers — such as
                      in hiring, lending, insurance approvals, and service
                      eligibility. Systems that merely assist a human review
                      (where the human makes the final determination based on
                      independent judgment) may be treated differently than
                      systems that substantially drive outcomes. This
                      package&apos;s ADMT Impact Assessment includes a framework
                      for evaluating your specific systems.
                    </div>
                  </details>
                  <details className="bg-gray-800/50 border border-gray-700/50 rounded-lg group">
                    <summary className="p-4 text-gray-200 font-medium text-sm cursor-pointer">
                      I have no idea which of our tools use automated
                      decision-making.
                    </summary>
                    <div className="px-4 pb-4 text-gray-400 text-sm border-t border-gray-700/50 pt-3">
                      That&apos;s the most common thing we hear. If a tool
                      screens, scores, ranks, recommends, or personalizes for
                      individual consumers — there&apos;s likely automated
                      decision-making involved. Hiring software, CRM systems,
                      ad-targeting platforms, and credit tools all commonly
                      qualify. Start with the Data Processing Inventory included
                      in this package — it gives you a structured format for
                      mapping every system.
                    </div>
                  </details>
                  <details className="bg-gray-800/50 border border-gray-700/50 rounded-lg group">
                    <summary className="p-4 text-gray-200 font-medium text-sm cursor-pointer">
                      Are these documents legal advice?
                    </summary>
                    <div className="px-4 pb-4 text-gray-400 text-sm border-t border-gray-700/50 pt-3">
                      No. We are not a law firm. These are compliance templates
                      built from CalPrivacy&apos;s published regulations — a
                      defensible starting point, not a substitute for legal
                      counsel. Many of our customers hand these to their
                      attorney for review. That saves their attorney hours of
                      drafting time at $400 an hour.
                    </div>
                  </details>
                  <details className="bg-gray-800/50 border border-gray-700/50 rounded-lg group">
                    <summary className="p-4 text-gray-200 font-medium text-sm cursor-pointer">
                      What about cybersecurity audits?
                    </summary>
                    <div className="px-4 pb-4 text-gray-400 text-sm border-t border-gray-700/50 pt-3">
                      Cybersecurity audit requirements are in the same
                      regulation package, but the deadlines are phased by
                      revenue: businesses over $100 million submit certifications
                      by April 1, 2028; $50–$100 million by April 1, 2029; under
                      $50 million by April 1, 2030. This package focuses on ADMT
                      and risk assessment obligations. If you need cybersecurity
                      audit documentation,{" "}
                      <Link
                        href="/contact"
                        className="text-blue-400 hover:text-blue-300 underline"
                      >
                        contact us
                      </Link>
                      .
                    </div>
                  </details>
                </div>

                {/* Trust section */}
                <div className="bg-green-950/30 border border-green-800/40 rounded-xl p-6 mb-8">
                  <p className="text-green-400 font-semibold mb-2">
                    Verified Against CalPrivacy&apos;s Published Regulations
                  </p>
                  <p className="text-gray-300 text-sm">
                    Every requirement in these documents traces to CalPrivacy&apos;s
                    published ADMT and risk assessment regulations at cppa.ca.gov.
                    No summaries. No AI-generated legal claims.
                  </p>
                </div>
                <div className="grid sm:grid-cols-3 gap-4 mb-10">
                  <div className="text-center">
                    <p className="text-white font-semibold text-sm mb-1">
                      Regulation-sourced
                    </p>
                    <p className="text-gray-400 text-xs">
                      Built from the published rules at{" "}
                      <a
                        href="https://cppa.ca.gov/regulations/ccpa_updates.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-white underline"
                      >
                        cppa.ca.gov
                      </a>
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-white font-semibold text-sm mb-1">
                      Both deadlines
                    </p>
                    <p className="text-gray-400 text-xs">
                      Covers January 2026 risk assessments and January 2027 ADMT
                      notices
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
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
                Did You Know? — Quick Facts About California CCPA ADMT
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
                  href="https://cppa.ca.gov/regulations/ccpa_updates.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 underline"
                >
                  CCPA Updates, Cybersecurity Audits, Risk Assessments, ADMT,
                  and Insurance Regulations — cppa.ca.gov
                </a>
              </li>
              <li>
                <a
                  href="https://cppa.ca.gov/announcements/2025/20250923.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 underline"
                >
                  CalPrivacy Press Release: California Finalizes Regulations to
                  Strengthen Consumers&apos; Privacy (September 23, 2025)
                </a>
              </li>
              <li>
                <a
                  href="https://cppa.ca.gov/announcements/2025/20250930.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 underline"
                >
                  CalPrivacy Enforcement: Tractor Supply Company $1.35M Fine
                  (September 30, 2025)
                </a>
              </li>
              <li>
                <a
                  href="https://cppa.ca.gov/announcements/2026/20260108.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 underline"
                >
                  CalPrivacy Enforcement: Datamasters and S&amp;P Global Data
                  Broker Actions (January 8, 2026)
                </a>
              </li>
              <li>
                <a
                  href="https://cppa.ca.gov/announcements/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 underline"
                >
                  CalPrivacy Announcements — Penalty Increases (2025)
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
              alt="Professional reviewing California CCPA ADMT compliance documents on a laptop"
              className="w-full h-48 sm:h-64 object-cover rounded-xl"
            />
          </div>
        </div>

        {/* Final CTA */}
        <section className="bg-gray-950 py-16 sm:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-red-400 text-sm font-semibold uppercase tracking-wider mb-4">
              Risk assessments: required now &middot; ADMT notices: January 1,
              2027
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-white mb-4">
              Don&apos;t wait for a complaint.
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              7 documents. Mapped to CalPrivacy&apos;s regulations. Covers both
              the 2026 risk assessment and 2027 ADMT deadlines. Instant
              download. All sales final. $499.
            </p>
            <Link
              href="/products/california-ccpa-admt"
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
