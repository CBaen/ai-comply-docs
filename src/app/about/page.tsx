import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About AI Compliance Documents — Our Methodology",
  description:
    "AI compliance templates verified against enacted statute text. Learn how we build documents and why every citation is checked against the actual law.",
  keywords: [
    "ai compliance document templates",
    "ai regulation templates",
    "ai compliance methodology",
    "ai compliance for small business",
    "compliance document methodology",
  ],
  alternates: {
    canonical: "https://aicompliancedocuments.com/about",
  },
  openGraph: {
    title: "About AI Compliance Documents — Our Methodology",
    description:
      "AI compliance templates verified against enacted statute text. Not summaries. Not AI-generated legal claims. The actual law, turned into usable templates.",
    url: "https://aicompliancedocuments.com/about",
    type: "website",
  },
};

function OrganizationSchema() {
  const data = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AI Compliance Documents",
    url: "https://aicompliancedocuments.com",
    email: "info@aicompliancedocuments.com",
    description:
      "AI compliance documentation templates for US state and federal AI regulations. Built from enacted statute text.",
  });
  return <script type="application/ld+json">{data}</script>;
}

export default function AboutPage() {
  return (
    <>
      <OrganizationSchema />
      <Nav />
      <main id="main-content" className="min-h-screen bg-white">

        {/* Hero */}
        <header className="bg-gray-900 text-white py-12 md:py-24">
          <div className="max-w-3xl mx-auto px-6 sm:px-8">
            <p className="text-blue-400 text-sm font-semibold uppercase tracking-wider mb-4">
              About Us
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display leading-tight mb-6">
              AI compliance templates built from the actual law. Not summaries. Not paraphrases.
            </h1>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              Every citation in our documents is verified against enacted statute text from official
              .gov sources. That&apos;s it. That&apos;s the whole methodology.
            </p>
          </div>
        </header>

        <div className="max-w-3xl mx-auto px-6 sm:px-8 py-12 md:py-24 space-y-14 md:space-y-16">

          {/* Why this exists */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-gray-900 mb-5">
              Why this exists
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                State AI laws are taking effect across the country. Illinois, Colorado, California,
                New York City, Virginia &mdash; and more every year. Most businesses that use AI need
                compliance documentation. The options are a $5,000+ law firm engagement or generic
                checklists that don&apos;t reference the actual statute.
              </p>
              <p>
                AI Compliance Documents closes that gap. We produce statute-specific templates that
                give you a professional, verified starting point &mdash; for a fraction of what a law
                firm charges. Take them to your attorney for final review instead of paying for every
                hour of research from scratch.
              </p>
            </div>
          </section>

          {/* Methodology */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-gray-900 mb-5">
              How we build our templates
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-800 text-white rounded-full flex items-center justify-center text-sm font-bold" aria-hidden="true">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">We start with the enacted text</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We read the actual statute &mdash; not a summary, not a legal blog post, not an
                    AI-generated overview. We go to the official .gov source: ILGA.gov for Illinois,
                    leg.colorado.gov for Colorado, cppa.ca.gov for California. The statute text is
                    the foundation.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-800 text-white rounded-full flex items-center justify-center text-sm font-bold" aria-hidden="true">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Every claim is verified, not inferred</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Every requirement in our templates links back to a specific statutory citation. If
                    the law says employers must provide a notice, we show you where it says that (e.g.,
                    775 ILCS 5/2-102(L)). We don&apos;t include requirements that we can&apos;t trace
                    to the text.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-800 text-white rounded-full flex items-center justify-center text-sm font-bold" aria-hidden="true">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">We flag what&apos;s still pending</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Some regulations require implementing rules from agencies that haven&apos;t been
                    finalized yet. When that&apos;s the case, we say so explicitly &mdash; we don&apos;t
                    speculate about what pending rules will require or pretend certainty where none exists.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-800 text-white rounded-full flex items-center justify-center text-sm font-bold" aria-hidden="true">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Templates, not legal opinions</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Our documents tell you what the law requires and give you a structured template to
                    document your compliance. They do not tell you that you are compliant. That
                    determination requires a licensed attorney reviewing your specific facts. We say
                    that plainly, in every document, because it&apos;s true.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* What we are not */}
          <section className="bg-amber-50 border border-amber-200 rounded-xl p-5 sm:p-8">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
              What we are not
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We are not a law firm. Our documents are not legal advice. Purchasing a template from
              us does not create an attorney-client relationship, and it does not mean you are
              compliant with any law.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We recommend consulting a licensed attorney before finalizing any compliance
              documentation. Our templates are designed to give that conversation a productive
              starting point &mdash; not to replace it.
            </p>
          </section>

          {/* Products */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-gray-900 mb-5">
              Available templates
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              We offer 53 compliance packages covering state AI employment laws (Illinois, NYC,
              Colorado), state consumer data privacy laws (Virginia, Connecticut, California, Oregon,
              Texas, Delaware, Minnesota, Montana, New Jersey, Indiana, Kentucky), federal frameworks
              (EEOC, NIST AI RMF), industry-specific packages (healthcare, financial services), the
              EU AI Act, and a full library of universal governance documents &mdash; bias audits,
              incident response plans, vendor due diligence, employee AI policies, and more.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div className="border border-gray-200 rounded-lg p-4 sm:p-5">
                <p className="text-xs font-semibold text-red-700 uppercase tracking-wider mb-2">
                  Employment AI Laws
                </p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>Illinois HB3773</li>
                  <li>NYC Local Law 144</li>
                  <li>Colorado SB 24-205</li>
                  <li>EEOC AI Hiring Guidance</li>
                  <li>Multi-State Employer Bundle</li>
                </ul>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 sm:p-5">
                <p className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-2">
                  Consumer Privacy Laws
                </p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>Virginia, Connecticut, Oregon</li>
                  <li>Texas, Delaware, California</li>
                  <li>Minnesota, Montana, Indiana</li>
                  <li>Kentucky, New Jersey</li>
                  <li>Multi-State Profiling Bundle</li>
                </ul>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 sm:p-5">
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                  Frameworks &amp; Universal
                </p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>EU AI Act, NIST AI RMF</li>
                  <li>Healthcare AI (HIPAA)</li>
                  <li>Financial Services AI</li>
                  <li>AI Governance &amp; Registry</li>
                  <li>+ 8 add-on packages</li>
                </ul>
              </div>
            </div>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 underline"
            >
              View all 53 products<span aria-hidden="true"> →</span>
            </Link>
          </section>

          {/* Contact */}
          <section className="border-t border-gray-200 pt-10 sm:pt-12">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">Get in touch</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Questions about our methodology, a specific regulation, or whether a product is right
              for your situation?
            </p>
            <Link
              href="/contact"
              className="inline-block w-full sm:w-auto text-center bg-blue-800 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-blue-900 transition"
            >
              Contact Us
            </Link>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
