import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ProductLibrary from "@/components/ProductLibrary";
import { regulations } from "@/data/regulations";

export const metadata: Metadata = {
  title: "AI Compliance Documents — AI Compliance Documents Generated in Minutes",
  description:
    "Generate state-specific AI compliance documents for Illinois, Colorado, Texas, California, and federal requirements. $299-$499 vs $5,000+ at a law firm. Instant download.",
  keywords: [
    "ai compliance",
    "ai regulation",
    "ai compliance documents",
    "illinois hb3773",
    "colorado sb24-205",
    "texas traiga",
    "ai hiring compliance",
    "ai law",
    "ai compliance for small business",
  ],
  openGraph: {
    title: "AI Compliance Documents — AI Compliance Documents Generated in Minutes",
    description:
      "State AI regulations are here. Generate compliance documentation in minutes for a fraction of legal fees.",
    url: "https://aicompliancedocuments.com",
    type: "website",
  },
};

function FAQStructuredData() {
  const data = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What AI regulations do you cover?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We currently offer compliance packages for Illinois HB3773 (775 ILCS 5/2-102(L)) and Colorado SB 24-205. Texas TRAIGA, California CCPA ADMT, and universal products (Employee AI Policy, Vendor Due Diligence) are coming soon. Each package is tailored to the specific statute's requirements.",
        },
      },
      {
        "@type": "Question",
        name: "Is this legal advice?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. This tool generates documentation templates based on published regulatory text and proposed rules. It assists with compliance documentation but does not constitute legal advice. We recommend consulting a qualified attorney for formal compliance verification.",
        },
      },
      {
        "@type": "Question",
        name: "How are the documents generated?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Your answers to the questionnaire populate templates drafted against each state's specific statute and proposed rules. Documents are generated instantly in PDF format and available for immediate download after payment.",
        },
      },
      {
        "@type": "Question",
        name: "What if the law changes?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our templates are based on the current published regulatory text at the time of purchase. Regulatory requirements may change over time. We recommend consulting qualified legal counsel to verify your documents remain current.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need this if I already have outside counsel?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our documents complement legal counsel. Many companies use our templates as a starting point and have their attorneys review the output — saving significant legal fees compared to drafting from scratch.",
        },
      },
      {
        "@type": "Question",
        name: "Are all sales final?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Because documents are generated and delivered digitally at the time of purchase, all sales are final. Please review the product description before purchasing.",
        },
      },
      {
        "@type": "Question",
        name: "How much do lawyers charge for this?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Employment law attorneys typically charge $300–600 per hour. A custom AI compliance package can cost $5,000–$25,000 from a law firm. AI Compliance Documents generates comparable documentation for $299–$499.",
        },
      },
    ],
  });

  return <script type="application/ld+json">{data}</script>;
}

export default function Home() {
  return (
    <>
      <FAQStructuredData />
      <Nav />
      <main id="main-content">
        {/* Hero Section */}
        <header className="hero-bg text-white py-20 md:py-28">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <div className="flex justify-center mb-6">
              <svg
                className="w-24 h-24 md:w-28 md:h-28 text-blue-400 drop-shadow-xl"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                />
              </svg>
            </div>

            <div className="inline-flex items-center gap-2 border border-red-400 px-4 py-2 mb-5 text-sm rounded">
              <span className="inline-block w-2 h-2 bg-red-400 rounded-sm" />
              <span className="text-red-200">
                Multiple state AI laws now in effect &mdash;{" "}
                <strong className="text-white">compliance is mandatory</strong>
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold font-display mb-5 leading-tight tracking-tight text-white">
              AI Compliance Documents
              <br />
              <span className="text-blue-300">Generated in Minutes</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              State AI regulations are here. Illinois, Colorado, Texas,
              California &mdash; each with different requirements, deadlines, and
              penalties. Generate your compliance documentation for a fraction of
              legal fees.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <a
                href="#products"
                className="hero-cta bg-white text-slate-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition shadow-lg flex items-center justify-center gap-2"
              >
                Browse Products
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </a>
              <a
                href="#how-it-works"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-slate-900 transition flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                  />
                </svg>
                How It Works
              </a>
            </div>

            <div className="inline-flex items-center gap-2 bg-green-900/40 border border-green-400/30 rounded-full px-4 py-1.5 text-xs">
              <svg
                className="w-3.5 h-3.5 text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-green-100">
                Templates based on published statutes and proposed rules as of{" "}
                <strong className="text-white">March 2026</strong>
              </span>
            </div>
          </div>
        </header>

        {/* Trust Bar */}
        <div className="bg-white border-b border-gray-200 py-5">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-sm text-gray-600 font-medium">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>Multi-State Coverage</span>
              </div>
              <div className="hidden md:block w-px h-5 bg-gray-200" aria-hidden="true" />
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                <span>Instant Download</span>
              </div>
              <div className="hidden md:block w-px h-5 bg-gray-200" aria-hidden="true" />
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21" /></svg>
                <span>Built for compliance teams</span>
              </div>
              <div className="hidden md:block w-px h-5 bg-gray-200" aria-hidden="true" />
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" /></svg>
                <span>$299&ndash;$499 vs $5,000+ legal fees</span>
              </div>
              <div className="hidden md:block w-px h-5 bg-gray-200" aria-hidden="true" />
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
                <span>Secure checkout via Stripe</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pain Section */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4">
            <div className="mb-10">
              <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900 mb-3">
                What happens if you don&apos;t comply?
              </h2>
              <p className="text-gray-700 text-lg max-w-2xl">
                AI regulations aren&apos;t suggestions. They&apos;re law, with real
                enforcement teeth and penalties up to $200,000 per violation.
              </p>
            </div>
            <hr className="border-t border-gray-200 my-4" />
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-red-50 border border-red-100 rounded p-6 border-l-4 border-l-red-400">
                <div className="w-10 h-10 bg-red-100 rounded flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
                </div>
                <h3 className="font-bold text-lg font-display mb-2 text-gray-900">Employee Complaints</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Employees can file charges with state agencies, which may lead to civil penalties or civil court actions with actual damages. Attorney fees may be awarded at the adjudicator&apos;s discretion.
                </p>
              </div>
              <div className="bg-amber-50 border border-amber-100 rounded p-6 border-l-4 border-l-amber-400">
                <div className="w-10 h-10 bg-amber-100 rounded flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21" /></svg>
                </div>
                <h3 className="font-bold text-lg font-display mb-2 text-gray-900">State Enforcement</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Attorney General offices and state agencies can investigate and issue civil penalties ranging from $7,500 to $200,000 per violation depending on the state.
                </p>
              </div>
              <div className="bg-slate-100 border border-slate-200 rounded p-6 border-l-4 border-l-slate-400">
                <div className="w-10 h-10 bg-slate-200 rounded flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75" /></svg>
                </div>
                <h3 className="font-bold text-lg font-display mb-2 text-gray-900">Legal Fees to Fix It Later</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Reacting to a complaint costs $5,000&ndash;$25,000 in legal fees &mdash; minimum. Having the right documents in place costs $299&ndash;$499.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900 mb-3">
                How It Works
              </h2>
              <p className="text-gray-700 text-lg">Three steps from zero to fully documented.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-14 h-14 bg-blue-800 rounded flex items-center justify-center mx-auto mb-5 text-white text-2xl font-extrabold font-display">1</div>
                <h3 className="font-bold text-xl font-display mb-3 text-gray-900">Choose Your Regulation</h3>
                <p className="text-gray-700 leading-relaxed">Select the state regulation you need to comply with. Answer a short questionnaire about your company and AI systems. Takes about 10 minutes.</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 bg-blue-800 rounded flex items-center justify-center mx-auto mb-5 text-white text-2xl font-extrabold font-display">2</div>
                <h3 className="font-bold text-xl font-display mb-3 text-gray-900">Pay Once</h3>
                <p className="text-gray-700 leading-relaxed">One-time purchase, no subscription. Secure checkout via Stripe. Your answers generate customized documents &mdash; never stored or shared.</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 bg-blue-800 rounded flex items-center justify-center mx-auto mb-5 text-white text-2xl font-extrabold font-display">3</div>
                <h3 className="font-bold text-xl font-display mb-3 text-gray-900">Download Your PDFs</h3>
                <p className="text-gray-700 leading-relaxed">Your complete compliance package downloads instantly. Post, distribute, and file. You&apos;re done.</p>
              </div>
            </div>
            <div className="text-center mt-10">
              <a href="#products" className="inline-flex items-center gap-2 bg-blue-800 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-900 transition shadow-md">
                Browse Products
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </a>
            </div>
          </div>
        </section>

        {/* Product Library */}
        <section id="products" className="py-16 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-3 text-gray-900">
                Compliance Document Library
              </h2>
              <p className="text-gray-700 text-lg">
                State-specific and universal AI compliance packages. Each includes customized documentation, instant download.
              </p>
            </div>
            <ProductLibrary regulations={regulations} />
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-3 text-gray-900">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-700 text-lg">
                Everything you need to know before getting started.
              </p>
            </div>
            <hr className="border-t border-gray-200 my-4" />
            <div className="space-y-3">
              <details className="group bg-slate-50 rounded border border-gray-200 overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer font-bold font-display text-gray-900 hover:text-blue-700 transition list-none">
                  What AI regulations do you cover?
                  <svg className="w-5 h-5 text-gray-600 group-open:rotate-180 transition-transform shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                </summary>
                <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                  We currently offer compliance packages for Illinois HB3773 (775 ILCS 5/2-102(L)) and Colorado SB 24-205. Texas TRAIGA, California CCPA ADMT, and universal products (Employee AI Policy, Vendor Due Diligence) are coming soon. Each package is tailored to the specific statute&apos;s requirements.
                </div>
              </details>
              <details className="group bg-slate-50 rounded border border-gray-200 overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer font-bold font-display text-gray-900 hover:text-blue-700 transition list-none">
                  Is this legal advice?
                  <svg className="w-5 h-5 text-gray-600 group-open:rotate-180 transition-transform shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                </summary>
                <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                  No. This tool generates documentation templates based on published regulatory text and proposed rules. It assists with compliance documentation but does not constitute legal advice. We recommend consulting a qualified attorney for formal compliance verification.
                </div>
              </details>
              <details className="group bg-slate-50 rounded border border-gray-200 overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer font-bold font-display text-gray-900 hover:text-blue-700 transition list-none">
                  How are the documents generated?
                  <svg className="w-5 h-5 text-gray-600 group-open:rotate-180 transition-transform shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                </summary>
                <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                  Your answers to the questionnaire populate templates drafted against each state&apos;s specific statute and proposed rules. Documents are generated instantly in PDF format and available for immediate download after payment.
                </div>
              </details>
              <details className="group bg-slate-50 rounded border border-gray-200 overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer font-bold font-display text-gray-900 hover:text-blue-700 transition list-none">
                  What if the law changes?
                  <svg className="w-5 h-5 text-gray-600 group-open:rotate-180 transition-transform shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                </summary>
                <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                  Our templates are based on the current published regulatory text at the time of purchase. Regulatory requirements may change over time. We recommend consulting qualified legal counsel to verify your documents remain current.
                </div>
              </details>
              <details className="group bg-slate-50 rounded border border-gray-200 overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer font-bold font-display text-gray-900 hover:text-blue-700 transition list-none">
                  Do I need this if I already have outside counsel?
                  <svg className="w-5 h-5 text-gray-600 group-open:rotate-180 transition-transform shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                </summary>
                <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                  Our documents complement legal counsel. Many companies use our templates as a starting point and have their attorneys review the output &mdash; saving significant legal fees compared to drafting from scratch.
                </div>
              </details>
              <details className="group bg-slate-50 rounded border border-gray-200 overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer font-bold font-display text-gray-900 hover:text-blue-700 transition list-none">
                  Are all sales final?
                  <svg className="w-5 h-5 text-gray-600 group-open:rotate-180 transition-transform shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                </summary>
                <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                  Yes. Because documents are generated and delivered digitally at the time of purchase, all sales are final. Please review the product description before purchasing.
                </div>
              </details>
              <details className="group bg-slate-50 rounded border border-gray-200 overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer font-bold font-display text-gray-900 hover:text-blue-700 transition list-none">
                  How much do lawyers charge for this?
                  <svg className="w-5 h-5 text-gray-600 group-open:rotate-180 transition-transform shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                </summary>
                <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                  Employment law attorneys typically charge $300&ndash;600 per hour. A custom AI compliance package can cost $5,000&ndash;$25,000 from a law firm. AI Compliance Documents generates comparable documentation for $299&ndash;$499.
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-slate-900">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-white mb-4">
              Don&apos;t wait for a complaint
            </h2>
            <p className="text-slate-300 text-lg mb-8 max-w-xl mx-auto">
              AI regulations are in effect now. Get your compliance documents today for a fraction of what a law firm charges.
            </p>
            <a
              href="#products"
              className="inline-flex items-center gap-2 bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-800 transition"
            >
              Browse Products
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
