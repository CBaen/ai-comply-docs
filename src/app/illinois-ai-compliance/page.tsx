import type { Metadata } from "next";
import Link from "next/link";
import FeaturedInBar from "@/components/FeaturedInBar";

export const metadata: Metadata = {
  title:
    "Illinois HB3773 AI Compliance — What Illinois Employers Need Right Now",
  description:
    "Illinois HB3773 took effect January 1, 2026. If you use AI in hiring, promotion, or employment decisions for Illinois workers, you have obligations now — even without final IDHR rules. Penalties up to $70,000 per violation. Get all 6 compliance documents. $299, instant download.",
  keywords: [
    "Illinois AI hiring law compliance",
    "HB3773 compliance template",
    "Illinois AI employment law requirements",
    "Illinois HB3773 employer obligations",
    "775 ILCS 5/2-102 compliance",
    "IDHR AI employment notice",
    "Illinois AI discrimination law",
    "AI hiring notice template Illinois",
    "Illinois Human Rights Act AI",
  ],
  alternates: {
    canonical: "https://aicompliancedocuments.com/illinois-ai-compliance",
  },
  openGraph: {
    title:
      "Illinois HB3773 AI Compliance — What Illinois Employers Need Right Now",
    description:
      "6 compliance documents for Illinois HB3773 (775 ILCS 5/2-102(L)). AI notice templates, system inventory, impact assessment framework. Built from enacted statute text. Instant download. $299.",
    url: "https://aicompliancedocuments.com/illinois-ai-compliance",
    type: "website",
  },
};

function LandingSchema() {
  const data = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Illinois HB3773 AI Employment Compliance Package",
    description:
      "Complete 6-document compliance package for Illinois HB3773 (775 ILCS 5/2-102(L)). Covers employee and applicant AI notification, system inventory, impact assessment framework, human oversight protocol, accommodation request form, and compliance checklist.",
    url: "https://aicompliancedocuments.com/illinois-ai-compliance",
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
      url: "https://aicompliancedocuments.com/products/illinois-hb3773",
    },
  });
  return <script type="application/ld+json">{data}</script>;
}

/* --- Verified data --- */
/* Sources: blog post illinois-hb3773-ai-employment-law-what-employers-need.mdx
   and regulations.ts illinois-hb3773 entry */

const microFacts = [
  {
    fact: "Illinois was one of the first states to regulate AI in employment when it passed the Artificial Intelligence Video Interview Act (820 ILCS 42), which took effect on January 1, 2020, regulating AI analysis of video interviews.",
    source: "Illinois General Assembly",
    sourceUrl:
      "https://www.ilga.gov/Legislation/ILCS/Articles?ActID=4015&ChapterID=68&Print=True",
  },
  {
    fact: "The EEOC launched a formal initiative on Artificial Intelligence and Algorithmic Fairness in October 2021 to examine how AI tools used in hiring comply with federal anti-discrimination laws.",
    source: "U.S. Equal Employment Opportunity Commission",
    sourceUrl:
      "https://www.eeoc.gov/newsroom/eeoc-launches-initiative-artificial-intelligence-and-algorithmic-fairness",
  },
  {
    fact: "New York City's Local Law 144, which requires annual bias audits of automated employment decision tools, began enforcement on July 5, 2023 — making it one of the earliest local AI hiring laws in the country.",
    source: "NYC Department of Consumer and Worker Protection",
    sourceUrl:
      "https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page",
  },
  {
    fact: "Under the Illinois Human Rights Act, repeat violators face escalating penalties: up to $16,000 for a first offense, $42,500 for a second within five years, and $70,000 for employers with two or more prior violations within seven years.",
    source: "Illinois General Assembly (775 ILCS 5/8A-104)",
    sourceUrl:
      "https://www.ilga.gov/Documents/legislation/ilcs/documents/077500050K8A-104.htm",
  },
];

const documents = [
  {
    name: "Employee & Applicant AI Notification",
    citation: "775 ILCS 5/2-102(L)",
    desc: "The notice the statute requires you to give employees and applicants that you are using AI in employment decisions. Drafted around the statutory requirement — ready to update when IDHR publishes its implementing rules.",
  },
  {
    name: "AI System Inventory",
    citation: "775 ILCS 5/2-102(L)",
    desc: "You cannot give notice about systems you don't know about. This template documents every vendor platform and automated tool that touches hiring, promotion, discipline, or other employment decisions.",
  },
  {
    name: "Impact Assessment Framework",
    citation: "775 ILCS 5/2-102(L)",
    desc: "The law prohibits AI use that has a discriminatory effect. This framework gives you a documented process for periodically reviewing your AI tools for disparate impact on protected classes.",
  },
  {
    name: "Human Oversight Protocol",
    citation: "775 ILCS 5/2-102(L)",
    desc: "Documents who reviews AI-flagged employment actions, how edge cases are escalated, and how the system is used as a tool rather than the sole decision-maker.",
  },
  {
    name: "Compliance Checklist",
    citation: "All sections",
    desc: "Every employer obligation under HB3773 in one place. Cross-referenced to statute sections and mapped to the IDHR legislative update page so you can verify each requirement yourself.",
  },
  {
    name: "Accommodation Request Form",
    citation: "775 ILCS 5/2-102(L)",
    desc: "If an employee or applicant has concerns about AI being used in decisions that affect them — particularly based on a disability or other protected characteristic — this documents the process for raising that concern.",
  },
];

const selfAssessment = [
  {
    question: "Do you use any software that screens, ranks, or scores job applicants?",
    domain: "Recruitment / Hiring",
  },
  {
    question: "Do you use AI-assisted tools in performance reviews or promotion decisions?",
    domain: "Promotion / Tenure",
  },
  {
    question:
      "Do you use automated scheduling, attendance, or productivity tools that affect working conditions?",
    domain: "Terms & Conditions of Employment",
  },
  {
    question:
      "Do you use AI-driven tools in discipline, discharge, or termination decisions?",
    domain: "Discipline / Discharge",
  },
  {
    question:
      "Do you use AI in selecting employees for training, apprenticeship, or development programs?",
    domain: "Training / Apprenticeship",
  },
];

export default function IllinoisAICompliancePage() {
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
            In effect: January 1, 2026
          </span>
        </div>
      </header>

      <FeaturedInBar />

      <main id="main-content">
        {/* Hero */}
        <section className="bg-gray-950 text-white py-16 sm:py-20 md:py-24 relative overflow-hidden">
          {/* Background image — Chicago skyline */}
          <div className="absolute inset-0">
            <img
              src="/images/landing/illinois-chicago-skyline.png"
              alt=""
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-gray-950/80 via-gray-950/90 to-gray-950" />
          </div>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
            <p className="text-red-400 text-sm font-semibold uppercase tracking-wider mb-4">
              Illinois HB3773 &middot; In effect since January 1, 2026
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display leading-tight mb-6">
              Your Hiring Software
              <br />
              Is Now an IDHR Issue
            </h1>
            <p className="text-gray-300 text-lg sm:text-xl leading-relaxed mb-4 max-w-2xl mx-auto">
              If you use AI to screen, rank, or evaluate candidates or employees
              in Illinois, HB3773 requires you to give them notice — and to make
              sure your tools aren&apos;t discriminating. That obligation exists
              right now, even without final IDHR rules.
            </p>
            <p className="text-gray-400 text-sm mb-8 max-w-xl mx-auto">
              Built from the{" "}
              <a
                href="https://www.ilga.gov/legislation/PublicActs/View/103-0804"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                enacted statute text
              </a>{" "}
              (Public Act 103-0804) on ilga.gov. Not summaries. Not paraphrases. Not training
              data.
            </p>
            <Link
              href="/products/illinois-hb3773"
              className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-semibold text-lg px-8 py-4 rounded-lg transition-colors shadow-lg shadow-blue-600/25"
            >
              Get All 6 Documents — $299
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
            </div>
          </div>
        </section>

        {/* Penalty strip */}
        <section className="bg-red-950/30 border-y border-red-900/40 py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="grid sm:grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-2xl sm:text-3xl font-bold font-display text-white">
                  $16,000
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  per violation, first offense
                  <br />
                  <span className="text-gray-500 text-xs">
                    775 ILCS 5/8A-104
                  </span>
                </p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold font-display text-white">
                  $70,000
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  per violation, repeat offenders
                  <br />
                  <span className="text-gray-500 text-xs">
                    775 ILCS 5/8A-104
                  </span>
                </p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold font-display text-white">
                  Per Violation
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  each aggrieved party counts
                  <br />
                  <span className="text-gray-500 text-xs">
                    IDHR investigates charges
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
                        HB3773 amends the Illinois Human Rights Act by adding
                        subdivision (L) to Section 2-102. It does exactly two
                        things: prohibits using AI in a way that has a
                        discriminatory effect on protected classes, and requires
                        notice to employees and applicants when AI is used for
                        employment decisions.
                      </p>
                      <p>
                        The law covers recruitment, hiring, promotion, renewal
                        of employment, selection for training or apprenticeship,
                        discharge, discipline, tenure, and the terms, privileges,
                        or conditions of employment. It also specifically
                        prohibits using zip codes as a proxy for protected
                        classes.
                      </p>
                      <p>
                        &ldquo;Artificial intelligence&rdquo; is defined
                        broadly: any machine-based system that infers from its
                        input how to generate predictions, content,
                        recommendations, or decisions. The definition explicitly
                        includes generative AI.
                      </p>
                      <p>
                        The statute delegates the specifics of the notice
                        requirement — format, timing, means — to the Illinois
                        Department of Human Rights. As of March 2026,{" "}
                        <a
                          href="https://dhr.illinois.gov/about-us/legislative-updates/artificial-intelligence-in-employment.html"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-400 hover:text-indigo-300 underline"
                        >
                          IDHR has not published those rules
                        </a>
                        . But the underlying obligation is live now.
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
                      HB3773 amends the Illinois Human Rights Act by adding
                      subdivision (L) to Section 2-102 (775 ILCS 5/2-102(L)).
                      It does exactly two things: prohibits using AI in a way
                      that has a discriminatory effect, and requires notice to
                      employees and applicants when AI is used for employment
                      decisions.
                    </p>
                    <p>
                      The law covers recruitment, hiring, promotion, discharge,
                      discipline, tenure, and the terms, privileges, or
                      conditions of employment. &ldquo;Artificial
                      intelligence&rdquo; is defined broadly — including
                      generative AI.
                    </p>
                    <p>
                      The notice details are delegated to IDHR. As of March
                      2026, IDHR has not published implementing rules. But the
                      underlying obligation is live as of January 1, 2026.
                    </p>
                  </div>
                </details>

                {/* Realist voice — opening */}
                <h2 className="text-2xl font-bold font-display text-white mb-4">
                  Here&apos;s what&apos;s actually happening.
                </h2>
                <p className="text-gray-300 leading-relaxed mb-5">
                  Illinois HB3773 became law on January 1, 2026. It doesn&apos;t
                  matter where your company is headquartered. If you have
                  employees or applicants in Illinois and you use any form of
                  AI in employment decisions — resume screening, performance
                  analytics, scheduling tools — you have obligations under this
                  statute right now.
                </p>
                <p className="text-gray-300 leading-relaxed mb-5">
                  The statute is actually short. Two paragraphs. One says
                  don&apos;t use AI in a way that discriminates. The other says
                  tell your employees when you&apos;re using AI for employment
                  decisions. That&apos;s the entire operative text. The
                  complication is that the specifics of the notice requirement
                  are delegated to IDHR — and IDHR hasn&apos;t finished writing
                  them yet.
                </p>

                {/* Amber warning — IDHR rulemaking */}
                <div className="bg-amber-950/30 border border-amber-800/40 rounded-lg p-5 mb-8">
                  <p className="text-amber-400 font-semibold text-sm mb-2">
                    IDHR Rules Are Not Finalized Yet
                  </p>
                  <p className="text-gray-400 text-sm">
                    As of March 2026, the Illinois Department of Human Rights
                    has not published implementing rules specifying the exact
                    format, timing, or means for the required AI notice.{" "}
                    <a
                      href="https://dhr.illinois.gov/about-us/legislative-updates/artificial-intelligence-in-employment.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-400 hover:text-amber-300 underline"
                    >
                      IDHR&apos;s own page states
                    </a>{" "}
                    rules are in development. Our templates address the
                    statutory requirements directly — when rules are finalized,
                    we update.
                  </p>
                </div>

                {/* Why waiting is risky */}
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-5 mb-8">
                  <p className="text-white font-semibold text-sm mb-2">
                    &ldquo;No rules yet&rdquo; does not mean &ldquo;no
                    obligation yet&rdquo;
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    The statute is already in effect. An employee can file a
                    charge with IDHR today alleging you used AI without notice.
                    The non-discrimination provision needs no implementing
                    rules — using AI that has a discriminatory effect is already
                    a civil rights violation. If your resume screener
                    disproportionately screens out candidates by race, sex, or
                    disability, you are in violation now.
                  </p>
                </div>

                {/* Interactive self-assessment */}
                <h3 className="text-xl font-bold font-display text-white mb-4 mt-10">
                  Does this apply to you?
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  If you answer &ldquo;yes&rdquo; to any of these, HB3773
                  likely covers your business. There is no minimum employee
                  count in the statute. It applies to any Illinois employer
                  using AI for covered employment decisions (775 ILCS 5/2-102(L)).
                </p>
                <fieldset>
                  <legend className="sr-only">Self-assessment: Does Illinois HB3773 apply to you?</legend>
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
                            Covered domain: {item.domain} (775 ILCS 5/2-102(L))
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                </fieldset>

                {/* Lifestyle image break */}
                <div className="my-10 rounded-xl overflow-hidden">
                  <img
                    src="/images/landing/team-compliance-meeting.png"
                    alt="HR team reviewing AI employment compliance documents"
                    className="w-full h-48 sm:h-56 object-cover"
                  />
                </div>

                {/* Documents section */}
                <h2 className="text-2xl font-bold font-display text-white mb-2">
                  6 Documents. Every Employer Obligation.
                </h2>
                <p className="text-gray-400 text-sm mb-8">
                  Each document maps to specific requirements of{" "}
                  <a
                    href="https://www.ilga.gov/legislation/ilcs/fulltext?DocName=077500050K2-102"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    775 ILCS 5/2-102(L)
                  </a>{" "}
                  and the{" "}
                  <a
                    href="https://dhr.illinois.gov/about-us/legislative-updates/artificial-intelligence-in-employment.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    IDHR legislative update
                  </a>
                  .
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

                {/* Per-violation math callout */}
                <div className="bg-blue-950/30 border border-blue-800/40 rounded-lg p-6 mb-10">
                  <h3 className="text-blue-400 font-semibold mb-2">
                    The Per-Violation Math
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-3">
                    Penalties under{" "}
                    <a
                      href="https://www.ilga.gov/Documents/legislation/ilcs/documents/077500050K8A-104.htm"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 underline"
                    >
                      775 ILCS 5/8A-104
                    </a>{" "}
                    are imposed per violation and per aggrieved party:
                  </p>
                  <ol className="list-decimal list-inside text-gray-300 text-sm space-y-2 ml-2">
                    <li>Up to $16,000 — first civil rights violation</li>
                    <li>
                      Up to $42,500 — one prior violation within the past five
                      years
                    </li>
                    <li>
                      Up to $70,000 — two or more prior violations within the
                      past seven years
                    </li>
                  </ol>
                  <p className="text-gray-400 text-xs mt-3">
                    A discriminatory AI tool used across hundreds of applicants
                    can mean a separate penalty for each affected person. Beyond
                    fines, the Illinois Human Rights Commission can order actual
                    damages, back pay, hiring or reinstatement, and attorney
                    fees.
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
                      $3,000–$15,000
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
                    href="/products/illinois-hb3773"
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
                      We&apos;re not headquartered in Illinois. Does this still apply?
                    </summary>
                    <div className="px-4 pb-4 text-gray-400 text-sm border-t border-gray-700/50 pt-3">
                      Yes. The law applies to any employer who has employees or
                      applicants in Illinois and uses AI for employment
                      decisions affecting them. The statute covers the
                      employee&apos;s location, not the company&apos;s. A Texas
                      company using AI to screen candidates who would work in
                      Illinois is covered.
                    </div>
                  </details>
                  <details className="bg-gray-800/50 border border-gray-700/50 rounded-lg group">
                    <summary className="p-4 text-gray-200 font-medium text-sm cursor-pointer">
                      I have no idea if our tools use AI.
                    </summary>
                    <div className="px-4 pb-4 text-gray-400 text-sm border-t border-gray-700/50 pt-3">
                      That&apos;s the most common thing we hear. The statute
                      defines AI broadly: any machine-based system that infers
                      from its input how to generate predictions,
                      recommendations, or decisions. Resume screeners, ATS
                      scoring features, performance analytics, and
                      AI-assisted scheduling tools all qualify. Our AI System
                      Inventory template walks you through auditing your vendor
                      stack. Start with your{" "}
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
                      Can&apos;t I just wait until IDHR publishes its rules?
                    </summary>
                    <div className="px-4 pb-4 text-gray-400 text-sm border-t border-gray-700/50 pt-3">
                      That&apos;s a risky bet. The statute is already in effect.
                      The non-discrimination provision needs no implementing
                      rules — using AI that has a discriminatory effect is
                      already a civil rights violation under 775 ILCS 5/2-102(L).
                      The notice obligation is also live; IDHR&apos;s rules will
                      clarify the specifics, not create the obligation. An
                      employee can file a charge today. Having a written notice
                      ready when the rules come out lets you update it instead
                      of starting from nothing.
                    </div>
                  </details>
                  <details className="bg-gray-800/50 border border-gray-700/50 rounded-lg group">
                    <summary className="p-4 text-gray-200 font-medium text-sm cursor-pointer">
                      What exactly does the notice need to say?
                    </summary>
                    <div className="px-4 pb-4 text-gray-400 text-sm border-t border-gray-700/50 pt-3">
                      The statute says notice is required. The specifics —
                      format, timing, content — are delegated to IDHR, which
                      hasn&apos;t published rules yet. Based on the statutory
                      text, a reasonable notice identifies that you use AI,
                      explains what employment decisions it&apos;s involved in,
                      and provides contact information for questions. Our
                      Employee &amp; Applicant AI Notification template is
                      built around this framework and is designed to be updated
                      when IDHR&apos;s rules are finalized.
                    </div>
                  </details>
                  <details className="bg-gray-800/50 border border-gray-700/50 rounded-lg group">
                    <summary className="p-4 text-gray-200 font-medium text-sm cursor-pointer">
                      What about zip codes?
                    </summary>
                    <div className="px-4 pb-4 text-gray-400 text-sm border-t border-gray-700/50 pt-3">
                      The statute specifically prohibits using zip codes as a
                      proxy for protected classes in AI-assisted employment
                      decisions (775 ILCS 5/2-102(L)). If your AI tools use
                      location data as an input, this is a specific thing to
                      review in your Impact Assessment Framework.
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
                      of our customers hand these to their employment attorney
                      for review. That saves their attorney hours of drafting
                      time at $400 an hour.
                    </div>
                  </details>
                  <details className="bg-gray-800/50 border border-gray-700/50 rounded-lg group">
                    <summary className="p-4 text-gray-200 font-medium text-sm cursor-pointer">
                      What happens when IDHR publishes its rules?
                    </summary>
                    <div className="px-4 pb-4 text-gray-400 text-sm border-t border-gray-700/50 pt-3">
                      We update. Our templates address the statutory
                      requirements directly. When IDHR&apos;s implementing
                      rules are finalized, we&apos;ll update the documents —
                      particularly the Employee &amp; Applicant AI Notification
                      — and notify customers.
                    </div>
                  </details>
                </div>

                {/* Trust section */}
                <div className="bg-green-950/30 border border-green-800/40 rounded-xl p-6 mb-8">
                  <p className="text-green-400 font-semibold mb-2">
                    Verified Against Enacted Statute Text
                  </p>
                  <p className="text-gray-300 text-sm">
                    Every requirement in these documents traces to a specific
                    section of 775 ILCS 5/2-102(L) or 775 ILCS 5/8A-104. No
                    summaries. No AI-generated legal claims.
                  </p>
                </div>
                <div className="grid sm:grid-cols-3 gap-4 mb-10">
                  <div className="text-center">
                    <p className="text-white font-semibold text-sm mb-1">
                      Statute-sourced
                    </p>
                    <p className="text-gray-400 text-xs">
                      Built from the enacted text on{" "}
                      <a
                        href="https://www.ilga.gov/legislation/PublicActs/View/103-0804"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-white underline"
                      >
                        ilga.gov
                      </a>
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-white font-semibold text-sm mb-1">
                      IDHR-tracked
                    </p>
                    <p className="text-gray-400 text-xs">
                      Monitored against the{" "}
                      <a
                        href="https://dhr.illinois.gov/about-us/legislative-updates/artificial-intelligence-in-employment.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-white underline"
                      >
                        IDHR legislative update
                      </a>
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-white font-semibold text-sm mb-1">
                      Attorney-ready
                    </p>
                    <p className="text-gray-400 text-xs">
                      Hand directly to employment counsel for review
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
                Did You Know? — Quick Facts About HB3773
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
                  href="https://www.ilga.gov/legislation/PublicActs/View/103-0804"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 underline"
                >
                  Public Act 103-0804 (HB3773 Enrolled Text) — Illinois General Assembly
                </a>
              </li>
              <li>
                <a
                  href="https://www.ilga.gov/legislation/ilcs/ilcs3.asp?ActID=2266&ChapterID=64"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 underline"
                >
                  Illinois Human Rights Act, Section 2-102 (775 ILCS 5/2-102)
                </a>
              </li>
              <li>
                <a
                  href="https://www.ilga.gov/ftp/Public%20Acts/104/104-0417.htm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 underline"
                >
                  Public Act 104-0417 (Subsequent Amendment, effective August 15, 2025)
                </a>
              </li>
              <li>
                <a
                  href="https://www.ilga.gov/Documents/legislation/ilcs/documents/077500050K8A-104.htm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 underline"
                >
                  Illinois Human Rights Act, Section 8A-104 — Penalties (775 ILCS 5/8A-104)
                </a>
              </li>
              <li>
                <a
                  href="https://dhr.illinois.gov/about-us/legislative-updates/artificial-intelligence-in-employment.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 underline"
                >
                  IDHR Legislative Update: Artificial Intelligence in Employment
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
              alt="Professional reviewing employment compliance documents on a laptop"
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
              6 documents. Mapped to the statute. Ready to update when IDHR
              publishes its rules. Instant download. All sales final. $299.
            </p>
            <Link
              href="/products/illinois-hb3773"
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
