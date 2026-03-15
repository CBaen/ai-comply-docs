import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "FAQ — AI Compliance Documents",
  description:
    "Answers to common questions about AI compliance documentation. Do I need AI compliance? What laws apply to my business? How are documents generated?",
  keywords: [
    "ai compliance faq",
    "do i need ai compliance",
    "ai compliance questions",
    "ai regulation faq",
    "ai compliance for small business",
    "ai compliance documents help",
  ],
  alternates: {
    canonical: "https://aicompliancedocuments.com/faq",
  },
  openGraph: {
    title: "FAQ — AI Compliance Documents",
    description:
      "Do I need AI compliance? What laws apply? How are documents generated? Answers to the questions we hear most.",
    url: "https://aicompliancedocuments.com/faq",
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
        name: "How do I know if any of this applies to my business?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "If you use AI in hiring and you have employees or applicants in Illinois, NYC, or Colorado — yes. If you collect personal data from consumers in Virginia, Connecticut, Oregon, Texas, Delaware, California, or other states and use that data for targeted ads, profiling, or automated decisions — yes. If you sell or deploy AI systems used in consequential decisions — yes. If you're not sure, the AI System Registry ($199) helps you figure out what AI you're actually using before you worry about which laws apply.",
        },
      },
      {
        "@type": "Question",
        name: "What if I don't know whether my tools use AI?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most modern hiring platforms, CRM systems, marketing tools, and customer service chatbots have AI built in. If a tool screens, scores, ranks, recommends, or personalizes — there's likely AI involved. The vendor can confirm this. Our AI System Inventory document walks you through how to find out.",
        },
      },
      {
        "@type": "Question",
        name: "I have no idea where to start.",
        acceptedAnswer: {
          "@type": "Answer",
          text: "That's the most common thing we hear. Start by figuring out which states your employees or customers are in. Then look at our state-specific packages for those states. If you operate in a lot of states, the Multi-State Profiling Bundle covers 15+ states in one package. If you just want to get organized first, the AI Governance Framework ($349) and AI System Registry ($199) help you figure out what you have before you worry about which laws apply.",
        },
      },
      {
        "@type": "Question",
        name: "What AI regulations do you cover?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We offer 53 compliance packages covering 14 state-specific AI and privacy laws (Illinois, Colorado, NYC, California, Virginia, Connecticut, Oregon, Texas, Delaware, Minnesota, Montana, Indiana, Kentucky, New Jersey), the EU AI Act, EEOC AI hiring guidance, NIST AI RMF, healthcare AI (HIPAA), financial services AI, and universal tools like bias audit templates, incident response plans, and vendor due diligence. Each package is built from the actual enacted statute text.",
        },
      },
      {
        "@type": "Question",
        name: "Is this legal advice?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. We generate documentation templates based on the actual text of enacted statutes and published regulations. These templates help you get organized and demonstrate compliance effort — but they are not a substitute for a licensed attorney who can evaluate your specific situation. We recommend having your legal team review the output.",
        },
      },
      {
        "@type": "Question",
        name: "How are the documents generated?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You answer a short questionnaire about your company — what AI tools you use, what decisions they inform, how your organization is structured. Your answers populate templates that were drafted against each state's specific statute. Documents generate instantly as fillable PDFs with electronic signature blocks. The whole process takes about ten minutes.",
        },
      },
      {
        "@type": "Question",
        name: "What if the law changes?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Laws change. That's the nature of this space. Our templates reflect the enacted statute text at the time of purchase. If a law is amended or new implementing rules are published, your documents may need updating. We recommend checking back periodically and consulting qualified legal counsel to make sure your compliance posture stays current.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need this if I already have outside counsel?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A lot of our customers have lawyers. They use our templates as a starting point — it gives their attorney something to review and refine instead of drafting from scratch at $400–$800 an hour. Your lawyer's time is better spent on the nuances specific to your business, not on formatting a compliance checklist.",
        },
      },
      {
        "@type": "Question",
        name: "Are all sales final?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Documents are generated and delivered digitally at the time of purchase, so all sales are final. Take a look at the product description and document list before purchasing to make sure it's the right fit.",
        },
      },
      {
        "@type": "Question",
        name: "How long does it take to fill out the questionnaire?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "About ten minutes. The questionnaire asks about your company, what AI tools you use, and what decisions they inform. Your answers populate the document templates automatically.",
        },
      },
      {
        "@type": "Question",
        name: "Can I use these documents in multiple states?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Each state-specific package is built for that state's law. If you operate in multiple states, look at the Multi-State Profiling Bundle ($399) which covers 15+ states, or the Multi-State Employer AI Disclosure ($299) which covers Illinois, NYC, and Colorado in one package.",
        },
      },
      {
        "@type": "Question",
        name: "What format are the documents?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "All documents are generated as fillable PDF files with electronic signature blocks. You can fill them in on your computer, print them, or send them to your attorney for review.",
        },
      },
      {
        "@type": "Question",
        name: "Do you offer refunds?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "All sales are final because documents are generated and delivered digitally at the time of purchase. We recommend reviewing the product description and document list before purchasing.",
        },
      },
      {
        "@type": "Question",
        name: "How often should I update my compliance documents?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "At minimum, annually — and whenever the underlying law is amended, your AI tools change, or your business operations change. Our Annual Compliance Review package ($49) includes a structured checklist for this.",
        },
      },
    ],
  });

  return <script type="application/ld+json">{data}</script>;
}

export default function FAQPage() {
  return (
    <>
      <FAQStructuredData />
      <Nav />
      <main id="main-content" className="min-h-screen bg-white">

        {/* Hero */}
        <header className="bg-gray-900 text-white py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-4">
            <p className="text-blue-400 text-sm font-semibold uppercase tracking-wider mb-4">
              FAQ
            </p>
            <h1 className="text-3xl md:text-4xl font-bold font-display leading-tight mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              Everything you need to know about AI compliance documentation.
            </p>
          </div>
        </header>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <hr className="border-t border-gray-200 mb-10" />
            <div className="space-y-3">

              <details className="group bg-slate-50 rounded border border-gray-200 overflow-hidden" open>
                <summary className="flex items-center justify-between p-6 cursor-pointer font-bold font-display text-gray-900 hover:text-blue-700 transition list-none">
                  How do I know if any of this applies to my business?
                  <svg className="w-5 h-5 text-gray-600 group-open:rotate-180 transition-transform shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                </summary>
                <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                  If you use AI in hiring and you have employees or applicants in Illinois, NYC, or Colorado &mdash; yes. If you collect personal data from consumers in Virginia, Connecticut, Oregon, Texas, Delaware, California, or other states and you use that data for targeted ads, profiling, or automated decisions &mdash; yes. If you sell or deploy AI systems used in consequential decisions &mdash; yes. If you&apos;re not sure, the <Link href="/regulations/ai-system-registry" className="text-blue-700 hover:underline">AI System Registry</Link> ($199) helps you figure out what AI you&apos;re actually using before you worry about which laws apply.
                </div>
              </details>

              <details className="group bg-slate-50 rounded border border-gray-200 overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer font-bold font-display text-gray-900 hover:text-blue-700 transition list-none">
                  What if I don&apos;t know whether my tools use AI?
                  <svg className="w-5 h-5 text-gray-600 group-open:rotate-180 transition-transform shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                </summary>
                <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                  You&apos;re not alone. Most modern hiring platforms, CRM systems, marketing tools, and customer service chatbots have AI built in. If a tool screens, scores, ranks, recommends, or personalizes &mdash; there&apos;s likely AI involved. Your vendor can confirm this. Our AI System Inventory document walks you through how to find out what you&apos;re actually running.
                </div>
              </details>

              <details className="group bg-slate-50 rounded border border-gray-200 overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer font-bold font-display text-gray-900 hover:text-blue-700 transition list-none">
                  I have no idea where to start.
                  <svg className="w-5 h-5 text-gray-600 group-open:rotate-180 transition-transform shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                </summary>
                <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                  That&apos;s the most common thing we hear. Start by figuring out which states your employees or customers are in. Then look at our state-specific packages for those states. If you operate in a lot of states, the <Link href="/regulations/multi-state-profiling-assessment" className="text-blue-700 hover:underline">Multi-State Profiling Bundle</Link> covers 15+ states in one package. If you just want to get organized first, the <Link href="/regulations/ai-governance-framework" className="text-blue-700 hover:underline">AI Governance Framework</Link> ($349) and <Link href="/regulations/ai-system-registry" className="text-blue-700 hover:underline">AI System Registry</Link> ($199) help you figure out what you have before you worry about which laws apply.
                </div>
              </details>

              <details className="group bg-slate-50 rounded border border-gray-200 overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer font-bold font-display text-gray-900 hover:text-blue-700 transition list-none">
                  What AI regulations do you cover?
                  <svg className="w-5 h-5 text-gray-600 group-open:rotate-180 transition-transform shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                </summary>
                <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                  We offer 53 compliance packages covering 14 state-specific AI and privacy laws (Illinois, Colorado, NYC, California, Virginia, Connecticut, Oregon, Texas, Delaware, Minnesota, Montana, Indiana, Kentucky, New Jersey), the EU AI Act, EEOC AI hiring guidance, NIST AI RMF, healthcare AI (HIPAA), financial services AI, and universal tools like bias audit templates, incident response plans, and vendor due diligence. Each package is built from the actual enacted statute text &mdash; not summaries, not training data, not paraphrases.
                </div>
              </details>

              <details className="group bg-slate-50 rounded border border-gray-200 overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer font-bold font-display text-gray-900 hover:text-blue-700 transition list-none">
                  Is this legal advice?
                  <svg className="w-5 h-5 text-gray-600 group-open:rotate-180 transition-transform shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                </summary>
                <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                  No. We generate documentation templates based on the actual text of enacted statutes and published regulations. These templates help you get organized and demonstrate compliance effort &mdash; but they&apos;re not a substitute for a licensed attorney who can evaluate your specific situation. We recommend having your legal team review the output.
                </div>
              </details>

              <details className="group bg-slate-50 rounded border border-gray-200 overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer font-bold font-display text-gray-900 hover:text-blue-700 transition list-none">
                  How are the documents generated?
                  <svg className="w-5 h-5 text-gray-600 group-open:rotate-180 transition-transform shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                </summary>
                <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                  You answer a short questionnaire about your company &mdash; what AI tools you use, what decisions they inform, how your organization is structured. Your answers populate templates that were drafted against each state&apos;s specific statute. Documents generate instantly as fillable PDFs with electronic signature blocks. The whole process takes about ten minutes.
                </div>
              </details>

              <details className="group bg-slate-50 rounded border border-gray-200 overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer font-bold font-display text-gray-900 hover:text-blue-700 transition list-none">
                  What if the law changes?
                  <svg className="w-5 h-5 text-gray-600 group-open:rotate-180 transition-transform shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                </summary>
                <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                  Laws change. That&apos;s the nature of this space. Our templates reflect the enacted statute text at the time of purchase. If a law is amended or new implementing rules are published, your documents may need updating. We recommend checking back periodically and consulting qualified legal counsel to make sure your compliance posture stays current.
                </div>
              </details>

              <details className="group bg-slate-50 rounded border border-gray-200 overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer font-bold font-display text-gray-900 hover:text-blue-700 transition list-none">
                  Do I need this if I already have outside counsel?
                  <svg className="w-5 h-5 text-gray-600 group-open:rotate-180 transition-transform shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                </summary>
                <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                  A lot of our customers have lawyers. They use our templates as a starting point &mdash; it gives their attorney something to review and refine instead of drafting from scratch at $400&ndash;$800 an hour. Your lawyer&apos;s time is better spent on the nuances specific to your business, not on formatting a compliance checklist.
                </div>
              </details>

              <details className="group bg-slate-50 rounded border border-gray-200 overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer font-bold font-display text-gray-900 hover:text-blue-700 transition list-none">
                  Are all sales final?
                  <svg className="w-5 h-5 text-gray-600 group-open:rotate-180 transition-transform shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                </summary>
                <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                  Yes. Documents are generated and delivered digitally at the time of purchase, so all sales are final. Take a look at the product description and document list before purchasing to make sure it&apos;s the right fit.
                </div>
              </details>

              {/* New questions */}

              <details className="group bg-slate-50 rounded border border-gray-200 overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer font-bold font-display text-gray-900 hover:text-blue-700 transition list-none">
                  How long does it take to fill out the questionnaire?
                  <svg className="w-5 h-5 text-gray-600 group-open:rotate-180 transition-transform shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                </summary>
                <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                  About ten minutes. The questionnaire asks about your company, what AI tools you use, and what decisions they inform. Your answers populate the document templates automatically.
                </div>
              </details>

              <details className="group bg-slate-50 rounded border border-gray-200 overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer font-bold font-display text-gray-900 hover:text-blue-700 transition list-none">
                  Can I use these documents in multiple states?
                  <svg className="w-5 h-5 text-gray-600 group-open:rotate-180 transition-transform shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                </summary>
                <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                  Each state-specific package is built for that state&apos;s law. If you operate in multiple states, look at the <Link href="/regulations/multi-state-profiling-assessment" className="text-blue-700 hover:underline">Multi-State Profiling Bundle</Link> ($399) which covers 15+ states, or the <Link href="/regulations/multi-state-employer-ai-disclosure" className="text-blue-700 hover:underline">Multi-State Employer AI Disclosure</Link> ($299) which covers Illinois, NYC, and Colorado in one package.
                </div>
              </details>

              <details className="group bg-slate-50 rounded border border-gray-200 overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer font-bold font-display text-gray-900 hover:text-blue-700 transition list-none">
                  What format are the documents?
                  <svg className="w-5 h-5 text-gray-600 group-open:rotate-180 transition-transform shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                </summary>
                <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                  All documents are generated as fillable PDF files with electronic signature blocks. You can fill them in on your computer, print them, or send them to your attorney for review.
                </div>
              </details>

              <details className="group bg-slate-50 rounded border border-gray-200 overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer font-bold font-display text-gray-900 hover:text-blue-700 transition list-none">
                  Do you offer refunds?
                  <svg className="w-5 h-5 text-gray-600 group-open:rotate-180 transition-transform shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                </summary>
                <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                  All sales are final because documents are generated and delivered digitally at the time of purchase. We recommend reviewing the product description and document list before purchasing.
                </div>
              </details>

              <details className="group bg-slate-50 rounded border border-gray-200 overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer font-bold font-display text-gray-900 hover:text-blue-700 transition list-none">
                  How often should I update my compliance documents?
                  <svg className="w-5 h-5 text-gray-600 group-open:rotate-180 transition-transform shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                </summary>
                <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                  At minimum, annually &mdash; and whenever the underlying law is amended, your AI tools change, or your business operations change. Our <Link href="/regulations/annual-compliance-review" className="text-blue-700 hover:underline">Annual Compliance Review</Link> package ($49) includes a structured checklist for this.
                </div>
              </details>

            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 bg-slate-900">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold font-display text-white mb-4">
              Still have questions?
            </h2>
            <p className="text-slate-300 text-lg mb-8 max-w-xl mx-auto">
              Email us at{" "}
              <a
                href="mailto:info@aicompliancedocuments.com"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                info@aicompliancedocuments.com
              </a>
              . We&apos;re glad to help you figure out what applies to your situation.
            </p>
            <Link
              href="/regulations"
              className="inline-flex items-center gap-2 bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-800 transition"
            >
              Browse All Products
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
