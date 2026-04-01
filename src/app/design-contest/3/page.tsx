import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { regulations } from "@/data/regulations";
import QuizGuidedLibrary from "./QuizGuidedLibrary";

export const metadata: Metadata = {
  title: "Design Contest #3 — Quiz-Guided Experience",
  robots: { index: false, follow: false },
};

export default function Design3Page() {
  const readyRegulations = regulations.filter((r) => r.ready);

  return (
    <>
      <Nav />
      <main id="main-content">
        <header className="hero-bg text-white py-12 md:py-20 relative overflow-hidden">
          <div className="absolute inset-0">
            <img src="/images/landing/product-tablet-desk.png" alt="" className="w-full h-full object-cover opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/90 to-slate-900" />
          </div>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="inline-flex items-center gap-2 border border-blue-400/40 px-3 sm:px-4 py-1.5 mb-4 sm:mb-5 text-xs sm:text-sm rounded text-blue-200">
              <span className="inline-block w-1.5 h-1.5 bg-blue-400 rounded-sm" />
              {readyRegulations.length} compliance packages available
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white mb-3 sm:mb-4 leading-tight tracking-tight">
              Find Your AI Compliance Package
            </h1>
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              Answer 3 quick questions — we&apos;ll surface exactly which regulations apply to your business.
            </p>
          </div>
        </header>

        <section className="py-10 sm:py-16 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <QuizGuidedLibrary regulations={readyRegulations} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
