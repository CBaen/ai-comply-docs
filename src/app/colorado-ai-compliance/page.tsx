import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Colorado SB 24-205 Compliance Package — Ready Before June 30",
  description:
    "Get all 8 required AI compliance documents for Colorado SB 24-205. Instant download. Covers risk management, impact assessments, consumer notices, and discrimination prevention. $449 — fraction of legal fees.",
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
    title: "Colorado SB 24-205 Compliance Package — All 8 Required Documents",
    description:
      "Instant-download AI compliance documents built specifically for Colorado SB 24-205. Covers every deployer obligation. $449.",
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

const documents = [
  {
    name: "Risk Management Policy",
    desc: "Your AI risk management program, aligned to NIST AI RMF",
  },
  {
    name: "Impact Assessment",
    desc: "Required before deploying any high-risk AI system",
  },
  {
    name: "Consumer Notification Template",
    desc: "Notify consumers when AI affects their decisions",
  },
  {
    name: "Consumer Disclosure Statement",
    desc: "Transparent disclosure of how AI is used",
  },
  {
    name: "Algorithmic Discrimination Prevention Plan",
    desc: "Demonstrate proactive bias prevention efforts",
  },
  {
    name: "Human Oversight Protocol",
    desc: "Document human review processes for AI decisions",
  },
  {
    name: "Compliance Checklist",
    desc: "Track every SB 24-205 requirement in one place",
  },
  {
    name: "Affirmative Defense Documentation",
    desc: "Build your legal defense before you need it",
  },
];

const whoNeeds = [
  "Companies using AI in hiring, recruiting, or performance reviews",
  "Lenders and financial institutions using algorithmic underwriting",
  "Insurance companies with AI-driven risk scoring",
  "Healthcare organizations using AI for triage or treatment decisions",
  "Housing providers using AI tenant screening tools",
  "Any business deploying AI that affects Colorado consumers",
];

export default function ColoradoAICompliancePage() {
  return (
    <>
      <LandingSchema />

      {/* Minimal header — logo only, no navigation */}
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
        {/* Hero */}
        <section className="bg-gray-950 text-white py-16 sm:py-20 md:py-28">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-red-400 text-sm font-semibold uppercase tracking-wider mb-4">
              Colorado SB 24-205 takes effect June 30, 2026
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display leading-tight mb-6">
              Get Your AI Compliance
              <br />
              Documents Today
            </h1>
            <p className="text-gray-300 text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl mx-auto">
              All 8 required documents. Built specifically for SB 24-205.
              Instant download. Ready to customize for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link
                href="/products/colorado-sb24-205"
                className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-semibold text-lg px-8 py-4 rounded-lg transition-colors shadow-lg shadow-blue-600/25 w-full sm:w-auto"
              >
                Get All 8 Documents — $449
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Instant download
              </span>
              <span className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Built from enacted statute text
              </span>
              <span className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                30-day money-back guarantee
              </span>
            </div>
          </div>
        </section>

        {/* Penalty warning */}
        <section className="bg-red-950/30 border-y border-red-900/40 py-10 sm:py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-red-400 font-semibold text-sm uppercase tracking-wider mb-2">
              Enforcement under Colorado Consumer Protection Act
            </p>
            <p className="text-2xl sm:text-3xl font-bold font-display text-white mb-2">
              Up to $20,000 per violation
            </p>
            <p className="text-gray-400">
              $50,000 per violation involving persons age 60+. Attorney General
              enforcement. No private right of action — but no compliance
              documents means no affirmative defense.
            </p>
          </div>
        </section>

        {/* What's included */}
        <section className="bg-gray-900 py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white text-center mb-4">
              8 Documents. Every Deployer Obligation Covered.
            </h2>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
              Each document is mapped to specific sections of SB 24-205
              (C.R.S. &sect; 6-1-1701 et seq.) and aligned with the NIST AI
              Risk Management Framework.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {documents.map((doc, i) => (
                <div
                  key={i}
                  className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-5"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 bg-blue-600/20 text-blue-400 rounded-full flex items-center justify-center text-sm font-semibold">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="text-white font-semibold mb-1">
                        {doc.name}
                      </h3>
                      <p className="text-gray-400 text-sm">{doc.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who needs this */}
        <section className="bg-gray-950 py-16 sm:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white text-center mb-12">
              Do You Need This?
            </h2>
            <div className="space-y-4">
              {whoNeeds.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  <p className="text-gray-300 text-lg">{item}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-500 text-sm mt-8 text-center">
              If your business uses AI tools that affect decisions about Colorado
              residents, SB 24-205 applies to you — regardless of company size.
            </p>
          </div>
        </section>

        {/* Price comparison */}
        <section className="bg-gray-900 py-16 sm:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mb-8">
              A Fraction of the Cost
            </h2>
            <div className="grid sm:grid-cols-2 gap-6 max-w-lg mx-auto">
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                <p className="text-gray-400 text-sm mb-2">Law firm</p>
                <p className="text-3xl font-bold text-gray-500 line-through">
                  $5,000–$25,000
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  Weeks of back-and-forth
                </p>
              </div>
              <div className="bg-blue-600/10 border border-blue-500/30 rounded-lg p-6">
                <p className="text-blue-400 text-sm mb-2">
                  AI Compliance Documents
                </p>
                <p className="text-3xl font-bold text-white">$449</p>
                <p className="text-gray-400 text-sm mt-1">
                  Instant download, ready now
                </p>
              </div>
            </div>
            <p className="text-gray-500 text-sm mt-6">
              Use our documents as-is or hand them to your attorney for review.
              Either way, you start with a defensible foundation — not a blank
              page.
            </p>
          </div>
        </section>

        {/* Trust & guarantee */}
        <section className="bg-gray-950 py-16 sm:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="bg-green-950/30 border border-green-800/40 rounded-xl p-8 text-center">
              <p className="text-green-400 font-semibold text-lg mb-2">
                30-Day Money-Back Guarantee
              </p>
              <p className="text-gray-300 max-w-xl mx-auto">
                If the documents don&apos;t meet your compliance needs, email us
                within 30 days for a full refund. No questions asked.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-6 mt-10 text-center">
              <div>
                <p className="text-white font-semibold mb-1">
                  Statute-sourced
                </p>
                <p className="text-gray-500 text-sm">
                  Every document built from the enacted text on
                  leg.colorado.gov
                </p>
              </div>
              <div>
                <p className="text-white font-semibold mb-1">NIST-aligned</p>
                <p className="text-gray-500 text-sm">
                  Risk management mapped to the AI Risk Management Framework
                </p>
              </div>
              <div>
                <p className="text-white font-semibold mb-1">
                  Attorney-ready
                </p>
                <p className="text-gray-500 text-sm">
                  Hand directly to legal counsel for review and customization
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Add-ons mention */}
        <section className="bg-gray-900 py-16 sm:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white mb-4">
              Need More Coverage?
            </h2>
            <p className="text-gray-400 mb-8">
              Three add-on kits for specialized SB 24-205 obligations:
            </p>
            <div className="grid sm:grid-cols-3 gap-4 text-left">
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-5">
                <p className="text-white font-semibold text-sm mb-1">
                  Appeal &amp; Correction Kit
                </p>
                <p className="text-gray-500 text-xs mb-2">
                  Consumer appeal forms, data correction process
                </p>
                <p className="text-blue-400 font-semibold">$99</p>
              </div>
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-5">
                <p className="text-white font-semibold text-sm mb-1">
                  AG Reporting Kit
                </p>
                <p className="text-gray-500 text-xs mb-2">
                  Discrimination discovery and Attorney General notification
                </p>
                <p className="text-blue-400 font-semibold">$129</p>
              </div>
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-5">
                <p className="text-white font-semibold text-sm mb-1">
                  Dev-Deploy Exchange Kit
                </p>
                <p className="text-gray-500 text-xs mb-2">
                  Documentation exchange between AI developers and deployers
                </p>
                <p className="text-blue-400 font-semibold">$109</p>
              </div>
            </div>
            <p className="text-gray-500 text-sm mt-6">
              Add-ons available during checkout on the product page.
            </p>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-gray-950 py-16 sm:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-red-400 text-sm font-semibold uppercase tracking-wider mb-4">
              June 30, 2026 is coming
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-white mb-6">
              Don&apos;t Wait Until Enforcement Begins
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
              8 documents. Built for SB 24-205. Instant download.
              30-day guarantee. $449.
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
