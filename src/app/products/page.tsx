import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ProductLibrary from "@/components/ProductLibrary";
import { regulations } from "@/data/regulations";

export const metadata: Metadata = {
  title: "AI Compliance Templates — All Products",
  description:
    "Browse all AI compliance templates for US state and federal AI regulations. State-specific packages for Illinois, Colorado, Texas, California, New York, and more. Instant download.",
  keywords: [
    "ai compliance templates",
    "ai regulation compliance",
    "state ai law compliance",
    "illinois hb3773 template",
    "colorado sb24-205 template",
    "texas traiga compliance",
    "california ccpa admt",
    "ai governance documents",
  ],
  alternates: {
    canonical: "https://aicompliancedocuments.com/products",
  },
  openGraph: {
    title: "AI Compliance Templates — All Products",
    description:
      "Browse all AI compliance templates for US state and federal regulations. Instant download, fraction of legal fees.",
    url: "https://aicompliancedocuments.com/products",
    type: "website",
  },
};

function ItemListSchema() {
  const ready = regulations.filter((r) => r.ready);
  const data = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "AI Compliance Document Packages",
    numberOfItems: ready.length,
    itemListElement: ready.map((r, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://aicompliancedocuments.com/products/${r.slug}`,
      name: r.shortName,
    })),
  });
  return <script type="application/ld+json">{data}</script>;
}

export default function RegulationsIndexPage() {
  return (
    <>
      <ItemListSchema />
      <Nav />
      <main id="main-content">
        {/* Hero */}
        <header className="hero-bg text-white py-12 md:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="inline-flex items-center gap-2 border border-blue-400/40 px-3 sm:px-4 py-1.5 mb-4 sm:mb-5 text-xs sm:text-sm rounded text-blue-200">
              <span className="inline-block w-1.5 h-1.5 bg-blue-400 rounded-sm" />
              {regulations.filter(r => r.ready).length} compliance packages available
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white mb-3 sm:mb-4 leading-tight tracking-tight">
              AI Compliance Templates
            </h1>
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              State-specific and universal AI compliance packages. Each built
              against the actual enacted statute text. Instant download, fraction
              of legal fees.
            </p>
          </div>
        </header>

        {/* Product Library */}
        <section className="py-10 sm:py-16 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="sr-only">Available Packages</h2>
            <ProductLibrary regulations={regulations.filter(r => r.ready)} />
          </div>
        </section>

        {/* CTA strip */}
        <section className="py-10 sm:py-14 bg-slate-900">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-display text-white mb-3">
              Not sure which package you need?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mb-6">
              Email us and we&apos;ll help you identify which regulations apply
              to your business.
            </p>
            <a
              href="mailto:info@aicompliancedocuments.com"
              className="inline-flex items-center gap-2 bg-blue-700 text-white px-6 sm:px-7 py-3 sm:py-3.5 rounded-lg font-bold text-sm sm:text-base hover:bg-blue-800 transition"
            >
              Contact Us
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
