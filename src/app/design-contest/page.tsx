import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Design Contest — Products Page Redesigns",
  robots: { index: false, follow: false },
};

const DESIGNS = [
  {
    num: 1,
    name: "Category Showcase",
    description: "Organized by law category (hiring AI, consumer privacy, governance). Static server render, fast load.",
    color: "bg-blue-50 border-blue-200",
    accent: "text-blue-700",
  },
  {
    num: 2,
    name: "Urgency Timeline",
    description: "Visual compliance deadline timeline. Products sorted by enforcement urgency. Sticky red nudge bar.",
    color: "bg-red-50 border-red-200",
    accent: "text-red-700",
  },
  {
    num: 3,
    name: "Quiz-Guided",
    description: "3-question wizard narrows the product list to exactly what applies to the user's business.",
    color: "bg-purple-50 border-purple-200",
    accent: "text-purple-700",
  },
  {
    num: 4,
    name: "Premium Pricing",
    description: "Stripe/Linear-style pricing page energy. Featured hero products with attorney-fee comparisons.",
    color: "bg-indigo-50 border-indigo-200",
    accent: "text-indigo-700",
  },
  {
    num: 5,
    name: "State Map",
    description: "Coverage hero with jurisdiction grid. Filter the product list by clicking a state.",
    color: "bg-cyan-50 border-cyan-200",
    accent: "text-cyan-700",
  },
  {
    num: 6,
    name: "Trust First",
    description: "Methodology strip before products. Statute citations and .gov sources shown before any selling.",
    color: "bg-emerald-50 border-emerald-200",
    accent: "text-emerald-700",
  },
  {
    num: 7,
    name: "Bundle First",
    description: "Bundles are the primary product. Savings math is visible. Individual packages are secondary.",
    color: "bg-amber-50 border-amber-200",
    accent: "text-amber-700",
  },
  {
    num: 8,
    name: "Minimal Conversion",
    description: "Clean, fast, distraction-free. Progressive disclosure reveals details on demand.",
    color: "bg-slate-50 border-slate-300",
    accent: "text-slate-700",
  },
];

export default function DesignContestIndex() {
  return (
    <>
      <Nav />
      <main id="main-content" className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="mb-10">
            <p className="text-xs font-bold tracking-widest text-blue-700 uppercase mb-2">Internal Preview</p>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 mb-3">
              Products Page Design Contest
            </h1>
            <p className="text-slate-500 text-base max-w-2xl">
              8 redesign proposals for the /products page. Each uses real product data and the live Nav/Footer. Click any design to preview it in your browser.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {DESIGNS.map((d) => (
              <Link
                key={d.num}
                href={`/design-contest/${d.num}`}
                className={`group block rounded-xl border-2 p-5 hover:shadow-md transition-all ${d.color}`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <span className={`text-xs font-bold uppercase tracking-widest ${d.accent}`}>
                      Design {d.num}
                    </span>
                    <h2 className="text-lg font-extrabold text-slate-900 leading-snug group-hover:underline">
                      {d.name}
                    </h2>
                  </div>
                  <svg
                    className={`w-5 h-5 shrink-0 mt-1 ${d.accent} opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{d.description}</p>
              </Link>
            ))}
          </div>

          <p className="mt-10 text-xs text-slate-400 text-center">
            These pages are noindexed and will not appear in search results.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
