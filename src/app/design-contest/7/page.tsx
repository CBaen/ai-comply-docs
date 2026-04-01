import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { regulations } from "@/data/regulations";
import BundleShowcase from "@/components/design7/BundleShowcase";
import IndividualProducts from "@/components/design7/IndividualProducts";

export const metadata: Metadata = {
  title: "Design Contest #7 — Bundle First",
  robots: { index: false, follow: false },
};

export default function Design7Page() {
  const readyProducts = regulations.filter((r) => r.ready);

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
              {readyProducts.length} compliance packages available
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white mb-3 sm:mb-4 leading-tight tracking-tight">
              AI Compliance Templates
            </h1>
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              State-specific and universal AI compliance packages. Each built against the actual enacted statute text. Instant download, fraction of legal fees.
            </p>
          </div>
        </header>

        {/* Bundle Showcase */}
        <section aria-labelledby="bundles-heading" className="py-12 sm:py-16 bg-slate-900">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="mb-8 sm:mb-10">
              <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 px-3 py-1 rounded text-blue-300 text-xs font-semibold uppercase tracking-wide mb-3">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Best value
              </div>
              <h2 id="bundles-heading" className="text-2xl sm:text-3xl font-extrabold font-display text-white">Multi-State Bundles</h2>
              <p className="text-slate-400 text-sm sm:text-base mt-1 max-w-xl">
                Most businesses operate across state lines. Bundles cover every jurisdiction you need — at a fraction of buying each separately.
              </p>
            </div>
            <BundleShowcase />
          </div>
        </section>

        {/* Bridge */}
        <div className="bg-slate-800 border-y border-slate-700">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p className="text-slate-300 text-sm">
              <span className="font-semibold text-white">Only need one state?</span>{" "}
              Browse individual packages below, or{" "}
              <a href="mailto:info@aicompliancedocuments.com" className="text-blue-400 hover:underline">email us</a>{" "}
              and we&apos;ll point you to exactly what applies.
            </p>
            <a href="#individual-packages" className="shrink-0 text-xs text-slate-400 hover:text-white flex items-center gap-1 transition">
              Skip to individual packages
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>
        </div>

        {/* Individual Products */}
        <section id="individual-packages" aria-labelledby="individual-heading" className="py-10 sm:py-16 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="mb-6 sm:mb-8">
              <h2 id="individual-heading" className="text-xl sm:text-2xl font-bold font-display text-gray-900">
                Individual State &amp; Federal Packages
              </h2>
              <p className="text-gray-500 text-sm mt-1">Already know which law applies? Go straight to the package you need.</p>
            </div>
            <IndividualProducts regulations={readyProducts} />
          </div>
        </section>

        {/* CTA */}
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
