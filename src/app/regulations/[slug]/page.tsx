import { regulations, getRegulation } from "@/data/regulations";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Questionnaire from "@/components/Questionnaire";
import PostPaymentHandler from "@/components/PostPaymentHandler";

export async function generateStaticParams() {
  return regulations.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const reg = getRegulation(slug);
  if (!reg) return {};
  return {
    title: `${reg.name} — Compliance Documents`,
    description: reg.description,
    keywords: reg.keywords,
    alternates: {
      canonical: `/regulations/${reg.slug}`,
    },
    openGraph: {
      title: `${reg.name} — AI Compliance Documents`,
      description: reg.description,
      url: `https://aicompliancedocuments.com/regulations/${reg.slug}`,
    },
  };
}

function StatusBadge({ status, ready }: { status: string; ready: boolean }) {
  // If the product isn't ready to buy, show COMING SOON regardless of law status
  if (!ready) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded font-semibold bg-slate-100 text-slate-600">
        <span className="inline-block w-1.5 h-1.5 rounded-sm bg-slate-400" />
        COMING SOON
      </span>
    );
  }
  const styles: Record<string, string> = {
    "in-effect": "bg-red-100 text-red-800",
    "effective-soon": "bg-amber-100 text-amber-800",
    proposed: "bg-slate-100 text-slate-600",
  };
  const labels: Record<string, string> = {
    "in-effect": "IN EFFECT",
    "effective-soon": "EFFECTIVE SOON",
    proposed: "PROPOSED",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded font-semibold ${styles[status] || styles.proposed}`}
    >
      <span
        className={`inline-block w-1.5 h-1.5 rounded-sm ${status === "in-effect" ? "bg-red-500" : status === "effective-soon" ? "bg-amber-500" : "bg-slate-400"}`}
      />
      {labels[status] || "PROPOSED"}
    </span>
  );
}

function StructuredData({ reg }: { reg: { name: string; description: string; price: number; ready: boolean } }) {
  const data = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Product",
    name: reg.name,
    description: reg.description,
    offers: {
      "@type": "Offer",
      price: reg.price.toString(),
      priceCurrency: "USD",
      availability: reg.ready
        ? "https://schema.org/InStock"
        : "https://schema.org/PreOrder",
    },
  });

  return <script type="application/ld+json">{data}</script>;
}

export default async function RegulationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const reg = getRegulation(slug);
  if (!reg) notFound();
  // Only show product pages for ready products — non-ready products
  // contain unverified data and should not be visible to customers
  if (!reg.ready) notFound();

  return (
    <>
      <Nav />
      <StructuredData reg={reg} />
      <main id="main-content">
        {/* Hero */}
        <div className="hero-bg text-white py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-4">
              <Link
                href="/#products"
                className="text-blue-300 hover:text-white text-sm transition"
              >
                &larr; All Products
              </Link>
              <span className="text-slate-500">|</span>
              <span className="text-slate-400 text-sm">{reg.state}</span>
            </div>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <StatusBadge status={reg.status} ready={reg.ready} />
              <span className="text-slate-400 text-sm">
                Effective: {reg.effectiveDate}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold font-display mb-4 leading-tight">
              {reg.name}
            </h1>
            <p className="text-lg text-slate-300 mb-6 max-w-2xl leading-relaxed">
              {reg.description}
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <div>
                <span className="text-4xl font-extrabold font-display text-white">
                  ${reg.price}
                </span>
                <span className="text-slate-400 text-sm ml-2">
                  one-time purchase
                </span>
              </div>
              {reg.ready ? (
                <a
                  href="#get-started"
                  className="hero-cta bg-white text-slate-900 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition shadow-lg"
                >
                  Get Started
                </a>
              ) : (
                <span className="bg-slate-700 text-slate-300 px-8 py-3 rounded-lg font-semibold text-lg cursor-default">
                  Coming Soon
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Key Stats Bar */}
        <div className="bg-white border-b border-gray-200 py-4">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex flex-wrap items-center justify-start gap-8 text-sm text-gray-600 font-medium">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                <span>{reg.documentCount} documents included</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-red-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
                <span>Max penalty: {reg.maxPenalty}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
                <span>Secure checkout via Stripe</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="md:col-span-2 space-y-10">
              {/* Penalties */}
              <section>
                <h2 className="text-2xl font-bold font-display text-gray-900 mb-4">
                  Penalties for Non-Compliance
                </h2>
                <div className="bg-red-50 border border-red-100 rounded p-6 border-l-4 border-l-red-400">
                  <p className="text-gray-700 leading-relaxed mb-3">
                    {reg.penaltySummary}
                  </p>
                  <p className="font-bold text-red-800 text-lg">
                    Maximum: {reg.maxPenalty}
                  </p>
                </div>
              </section>

              {/* Who Must Comply */}
              <section>
                <h2 className="text-2xl font-bold font-display text-gray-900 mb-4">
                  Who Must Comply
                </h2>
                <div className="bg-slate-50 border border-gray-200 rounded p-6">
                  <p className="text-gray-700 leading-relaxed">
                    {reg.appliesToSummary}
                  </p>
                </div>
              </section>

              {/* What You Get */}
              <section>
                <h2 className="text-2xl font-bold font-display text-gray-900 mb-4">
                  What&apos;s Included ({reg.documentCount} Documents)
                </h2>
                <div className="space-y-3">
                  {reg.documents.map((doc, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 bg-white border border-gray-200 rounded p-4"
                    >
                      <div className="w-8 h-8 bg-blue-50 border border-blue-100 rounded flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                      </div>
                      <p className="font-semibold text-gray-900">{doc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Citation */}
              <section>
                <h2 className="text-2xl font-bold font-display text-gray-900 mb-4">
                  Statutory Authority
                </h2>
                <div className="bg-slate-50 border border-gray-200 rounded p-6">
                  <p className="text-gray-700 text-sm mb-2">
                    <strong>Citation:</strong> {reg.citation}
                  </p>
                  <a
                    href={reg.citationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-900 text-sm font-medium underline"
                  >
                    View official source
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                    <span className="sr-only">(opens in new tab)</span>
                  </a>
                </div>
              </section>
            </div>

            {/* Sidebar — purchase card */}
            <div className="md:col-span-1">
              <div
                id="get-started"
                className="bg-white border-2 border-blue-800 rounded-xl p-6 shadow-lg sticky top-24"
              >
                <p className="text-sm font-semibold text-blue-700 uppercase tracking-wider mb-1">
                  Complete Package
                </p>
                <p className="text-4xl font-extrabold text-gray-900 font-display mb-1">
                  ${reg.price}
                </p>
                <p className="text-gray-600 text-sm mb-6">
                  One-time purchase. Instant download. All sales final.
                </p>
                <ul className="space-y-2 text-sm text-gray-700 mb-6">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                    {reg.documentCount} customized documents
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                    Instant digital download
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                    Based on {reg.citation}
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                    Secure checkout via Stripe
                  </li>
                </ul>
                {reg.ready ? (
                  <a
                    href={`/regulations/${reg.slug}#generator`}
                    className="block text-center bg-blue-800 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-900 transition shadow-md"
                  >
                    Get My Documents &mdash; ${reg.price}
                  </a>
                ) : (
                  <div className="text-center">
                    <span className="block bg-slate-100 text-slate-500 py-4 rounded-lg font-semibold text-lg cursor-default mb-3">
                      Coming Soon
                    </span>
                    <p className="text-gray-500 text-xs">
                      This package is under development. Check back soon.
                    </p>
                  </div>
                )}
                <p className="text-center text-xs text-gray-500 mt-4">
                  vs. $5,000&ndash;$25,000 at a law firm
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Questionnaire & Payment Flow */}
        {reg.ready && (
          <>
            <PostPaymentHandler regulationSlug={reg.slug} />
            <div className="border-t border-gray-200">
              <Questionnaire
                regulationSlug={reg.slug}
                regulationName={reg.shortName}
                price={reg.price}
              />
            </div>
          </>
        )}

        {/* Related Products */}
        {(() => {
          const related = regulations
            .filter(
              (r) =>
                r.slug !== reg.slug &&
                (r.category === reg.category ||
                  r.tier === reg.tier ||
                  (reg.tier === "state" && r.tier === "universal"))
            )
            .slice(0, 3);
          if (related.length === 0) return null;
          return (
            <div className="bg-white border-t border-gray-200 py-12">
              <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-2xl font-bold font-display text-gray-900 mb-2">
                  You May Also Need
                </h2>
                <p className="text-gray-600 text-sm mb-6">
                  Strengthen your compliance program with related documentation.
                </p>
                <div className="grid md:grid-cols-3 gap-5">
                  {related.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/regulations/${r.slug}`}
                      className="border border-gray-200 rounded-lg p-5 hover:border-blue-700 hover:shadow-md transition group"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`inline-block w-1.5 h-1.5 rounded-sm ${r.status === "in-effect" ? "bg-red-500" : r.status === "effective-soon" ? "bg-amber-500" : "bg-slate-400"}`}
                        />
                        <span className="text-xs text-gray-500 uppercase font-medium">
                          {r.state}
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-900 font-display group-hover:text-blue-700 transition mb-1">
                        {r.shortName}
                      </h3>
                      <p className="text-gray-600 text-xs leading-relaxed mb-3">
                        {r.description.length > 100
                          ? r.description.slice(0, 100) + "..."
                          : r.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-gray-900 font-display">
                          ${r.price}
                        </span>
                        <span className="text-xs text-gray-500">
                          {r.documentCount} docs
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}

      </main>
      <Footer />
    </>
  );
}
