import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { regulations } from "@/data/regulations";
import ProductLibraryTrustFirst from "@/components/ProductLibraryTrustFirst";

export const metadata: Metadata = {
  title: "Design Contest #6 — Trust First",
  robots: { index: false, follow: false },
};

function VerifiedGovIcon() {
  return (
    <svg className="w-3 h-3 text-blue-600 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
    </svg>
  );
}

function MethodologyStrip() {
  return (
    <section aria-labelledby="methodology-heading" className="bg-white border-b border-slate-200 py-10 sm:py-14">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="mb-8 sm:mb-10">
          <p className="text-xs font-bold tracking-widest text-blue-700 uppercase mb-2">Our Methodology</p>
          <h2 id="methodology-heading" className="text-xl sm:text-2xl font-extrabold font-display text-slate-900 leading-snug">
            Every template starts with the statute — not a blog post about it
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-2xl">
            Here is exactly how each compliance package is built. You can verify every source yourself — they all link to official government domains.
          </p>
        </div>
        <ol className="grid sm:grid-cols-3 gap-6 sm:gap-8 list-none">
          <li>
            <div className="flex items-center gap-3 mb-3">
              <span aria-hidden="true" className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-800 text-white text-sm font-bold flex items-center justify-center">1</span>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">Read the enacted statute text</h3>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed pl-11">We read the full enrolled bill or code section from the official legislative website — not a law firm summary. Every obligation, threshold, and exemption is mapped directly from the primary source.</p>
            <div className="mt-3 pl-11">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Example primary sources</p>
              <ul className="space-y-1">
                <li>
                  <a href="https://www.ilga.gov/legislation/ilcs/fulltext?DocName=077500050K2-102" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-700 hover:underline inline-flex items-center gap-1">
                    <VerifiedGovIcon />ilga.gov — IL HB3773 (775 ILCS 5/2-102)
                  </a>
                </li>
                <li>
                  <a href="https://leg.colorado.gov/bills/sb24-205" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-700 hover:underline inline-flex items-center gap-1">
                    <VerifiedGovIcon />leg.colorado.gov — CO SB 24-205
                  </a>
                </li>
                <li>
                  <a href="https://cppa.ca.gov/regulations/ccpa_updates.html" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-700 hover:underline inline-flex items-center gap-1">
                    <VerifiedGovIcon />cppa.ca.gov — CA CCPA ADMT regulations
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-3 mb-3">
              <span aria-hidden="true" className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-800 text-white text-sm font-bold flex items-center justify-center">2</span>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">Map every required document</h3>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed pl-11">Each document in a package traces to a specific statutory requirement — not a general best practice. The package page shows you exactly which section of the law each document satisfies.</p>
            <div className="mt-3 pl-11">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">What this looks like in practice</p>
              <ul className="space-y-1 text-xs text-slate-600">
                <li className="flex items-start gap-1.5"><span className="text-blue-600 mt-0.5" aria-hidden="true">→</span>Colorado SB 24-205 §6-1-1703(1): Risk management program → Risk Management Policy document</li>
                <li className="flex items-start gap-1.5"><span className="text-blue-600 mt-0.5" aria-hidden="true">→</span>NYC LL144 §20-871: Annual bias audit summary → Bias Audit Summary Report</li>
                <li className="flex items-start gap-1.5"><span className="text-blue-600 mt-0.5" aria-hidden="true">→</span>IL 775 ILCS 5/2-102(L): Notice to candidates → Employee &amp; Applicant AI Notification</li>
              </ul>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-3 mb-3">
              <span aria-hidden="true" className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-800 text-white text-sm font-bold flex items-center justify-center">3</span>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">Write templates that can be used as-is</h3>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed pl-11">Templates include the required language, the required structure, and clear bracketed instructions for your specific organization. They are designed to be completed in a single review session, not reconstructed from scratch.</p>
            <div className="mt-3 pl-11">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Not included — and why</p>
              <ul className="space-y-1 text-xs text-slate-600">
                <li className="flex items-start gap-1.5"><span className="text-slate-400 mt-0.5" aria-hidden="true">✕</span>Legal advice — these are compliance frameworks, not attorney-client work product</li>
                <li className="flex items-start gap-1.5"><span className="text-slate-400 mt-0.5" aria-hidden="true">✕</span>Audit services — we provide the documentation; you or your auditor conduct the audit</li>
              </ul>
            </div>
          </li>
        </ol>
      </div>
    </section>
  );
}

function SourceVerificationStrip() {
  const sourceTypes = [
    { label: "State legislative sites", examples: "ilga.gov · leg.colorado.gov · revisor.mn.gov", icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3 6l9-4 9 4v2H3V6z" /><path strokeLinecap="round" strokeLinejoin="round" d="M3 20h18M5 8v12M19 8v12M9 8v12M15 8v12" /></svg> },
    { label: "State code repositories", examples: "law.lis.virginia.gov · oregonlegislature.gov · statutes.capitol.texas.gov", icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> },
    { label: "Federal agencies", examples: "nist.gov · eeoc.gov · nyc.gov/dca", icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2 17l10 5 10-5M2 12l10 5 10-5" /></svg> },
    { label: "EU official journal", examples: "eur-lex.europa.eu (EU AI Act Regulation 2024/1689)", icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" /></svg> },
  ];
  return (
    <section aria-labelledby="sources-heading" className="bg-slate-50 border-b border-slate-200 py-6 sm:py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <p id="sources-heading" className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-4">Source types used across all packages</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {sourceTypes.map((s) => (
            <div key={s.label} className="bg-white border border-slate-200 rounded-lg px-4 py-3 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-blue-700">
                {s.icon}
                <span className="text-xs font-semibold text-slate-800">{s.label}</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{s.examples}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Design6Page() {
  const ready = regulations.filter((r) => r.ready);
  return (
    <>
      <Nav />
      <main id="main-content">
        {/* Hero */}
        <header className="hero-bg text-white py-12 md:py-20 relative overflow-hidden">
          <div className="absolute inset-0">
            <img src="/images/landing/product-tablet-desk.png" alt="" className="w-full h-full object-cover opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/90 to-slate-900" />
          </div>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="inline-flex items-center gap-2 border border-blue-400/40 px-3 sm:px-4 py-1.5 mb-4 sm:mb-5 text-xs sm:text-sm rounded text-blue-200">
              <span className="inline-block w-1.5 h-1.5 bg-blue-400 rounded-sm" />
              {ready.length} compliance packages available
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white mb-3 sm:mb-4 leading-tight tracking-tight">
              AI Compliance Templates
            </h1>
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              State-specific and universal AI compliance packages. Each built against the actual enacted statute text. Instant download, fraction of legal fees.
            </p>
          </div>
        </header>

        <MethodologyStrip />
        <SourceVerificationStrip />

        <section className="py-10 sm:py-16 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="sr-only">Available Packages</h2>
            <ProductLibraryTrustFirst regulations={ready} />
          </div>
        </section>

        <section className="py-10 sm:py-14 bg-slate-900">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-display text-white mb-3">Not sure which package you need?</h2>
            <p className="text-slate-300 text-sm sm:text-base mb-6">Email us and we&apos;ll help you identify which regulations apply to your business.</p>
            <a href="mailto:info@aicompliancedocuments.com" className="inline-flex items-center gap-2 bg-blue-700 text-white px-6 sm:px-7 py-3 sm:py-3.5 rounded-lg font-bold text-sm sm:text-base hover:bg-blue-800 transition">
              Contact Us
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
