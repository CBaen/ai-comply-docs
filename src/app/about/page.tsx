import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About AI Compliance Documents — Our Methodology",
  description:
    "AI compliance document templates built from enacted statute text. Learn how we verify every citation, why we built this, and what sets us apart from AI-generated legal summaries.",
  keywords: [
    "ai compliance document templates",
    "ai regulation templates",
    "illinois hb3773 template",
    "colorado sb24-205 template",
    "ai compliance methodology",
    "ai compliance for small business",
  ],
  alternates: {
    canonical: "https://aicompliancedocuments.com/about",
  },
  openGraph: {
    title: "About AI Compliance Documents — Our Methodology",
    description:
      "AI compliance document templates verified against enacted statute text. Not summaries. Not AI-generated legal claims. The actual law, turned into usable templates.",
    url: "https://aicompliancedocuments.com/about",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className="min-h-screen bg-white">

        {/* Hero */}
        <header className="bg-gray-900 text-white py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-4">
            <p className="text-blue-400 text-sm font-semibold uppercase tracking-wider mb-4">
              About Us
            </p>
            <h1 className="text-3xl md:text-4xl font-bold font-display leading-tight mb-6">
              AI compliance templates built from the actual law. Not summaries. Not paraphrases.
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              Every citation in our documents is verified against enacted statute text from official
              .gov sources. That&apos;s it. That&apos;s the whole methodology.
            </p>
          </div>
        </header>

        <div className="max-w-3xl mx-auto px-4 py-16 md:py-24 space-y-16">

          {/* Why we built this */}
          <section>
            <h2 className="text-2xl font-bold font-display text-gray-900 mb-5">
              Why this exists
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              AI regulations are multiplying. Illinois enacted HB3773 in 2024. Colorado passed SB
              24-205 that same year. Texas, California, and a dozen other states have bills in
              various stages. Federal frameworks are in development. The pace is not slowing down.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The problem: a custom compliance package from a law firm typically runs $5,000 to
              $25,000. That&apos;s reasonable for a Fortune 500 company with a dedicated legal
              department. It&apos;s not reasonable for the mid-size HR tech company, the regional
              staffing firm, or the healthcare startup that also has to comply — and has the same
              risk exposure.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We built AI Compliance Documents to close that gap. Our templates give you a
              professional, statute-verified starting point that you can take to your attorney for
              final review — instead of starting from zero and paying for every hour of research.
            </p>
          </section>

          {/* Methodology */}
          <section>
            <h2 className="text-2xl font-bold font-display text-gray-900 mb-5">
              How we build our templates
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-800 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">We start with the enacted text</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We read the actual statute — not a summary, not a legal blog post, not an AI-generated
                    overview. We go to the official .gov source: ILGA.gov for Illinois, leg.colorado.gov for
                    Colorado. The statute text is the foundation.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-800 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Every claim is verified, not inferred</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Every requirement in our templates links back to a specific statutory citation. If the
                    law says employers must provide a notice, we show you where it says that (e.g., 775 ILCS
                    5/2-102(L)). We don&apos;t include requirements that we can&apos;t trace to the text.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-800 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">We flag what&apos;s still pending</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Some regulations require implementing rules from agencies like IDHR (Illinois Department
                    of Human Rights) that haven&apos;t been finalized yet. When that&apos;s the case, we say so
                    explicitly — we don&apos;t speculate about what pending rules will require or pretend
                    certainty doesn&apos;t exist.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-800 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Templates, not legal opinions</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Our documents tell you what the law requires and give you a structured template to
                    document your compliance. They do not tell you that you are compliant. That determination
                    requires a licensed attorney reviewing your specific facts. We say that plainly, in every
                    document, because it&apos;s true.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* What we are not */}
          <section className="bg-amber-50 border border-amber-200 rounded-xl p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
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
              starting point — not to replace it.
            </p>
          </section>

          {/* Products */}
          <section>
            <h2 className="text-2xl font-bold font-display text-gray-900 mb-5">
              Available templates
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              We currently offer compliance templates for enacted state AI regulations, plus a set
              of universal governance documents applicable across jurisdictions.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="border border-gray-200 rounded-lg p-5">
                <p className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
                  Illinois
                </p>
                <h3 className="font-bold text-gray-900 mb-1">HB3773</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Employer AI notice and disclosure compliance package for Illinois&apos;s artificial
                  intelligence in employment law (775 ILCS 5/2-102(L)).
                </p>
                <Link
                  href="/regulations/illinois-hb3773"
                  className="inline-block mt-3 text-sm font-semibold text-blue-700 hover:underline"
                >
                  View product &rarr;
                </Link>
              </div>

              <div className="border border-gray-200 rounded-lg p-5">
                <p className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
                  Colorado
                </p>
                <h3 className="font-bold text-gray-900 mb-1">SB 24-205</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  High-risk AI system governance documentation package for Colorado&apos;s AI Act,
                  covering risk management, impact assessments, and consumer disclosure.
                </p>
                <Link
                  href="/regulations/colorado-sb24-205"
                  className="inline-block mt-3 text-sm font-semibold text-blue-700 hover:underline"
                >
                  View product &rarr;
                </Link>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-5">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Universal Governance Templates
              </p>
              <ul className="grid sm:grid-cols-2 gap-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-700 mt-0.5">&#10003;</span>
                  Employee AI Use Policy
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-700 mt-0.5">&#10003;</span>
                  Vendor AI Due Diligence Framework
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-700 mt-0.5">&#10003;</span>
                  AI Bias Audit Documentation
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-700 mt-0.5">&#10003;</span>
                  AI Incident Response Plan
                </li>
              </ul>
              <Link
                href="/regulations"
                className="inline-block mt-4 text-sm font-semibold text-blue-700 hover:underline"
              >
                View all products &rarr;
              </Link>
            </div>
          </section>

          {/* Contact */}
          <section className="border-t border-gray-200 pt-12">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Get in touch</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Questions about our methodology, a specific regulation, or whether a product is right
              for your situation? We&apos;re glad to help.
            </p>
            <a
              href="mailto:info@aicompliancedocuments.com"
              className="inline-block bg-blue-800 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-blue-900 transition"
            >
              info@aicompliancedocuments.com
            </a>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
