import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About AI Compliance Documents — Our Methodology",
  description:
    "AI compliance templates built from enacted statute text. Learn how we verify every citation, why we built this, and what sets us apart from AI-generated legal summaries.",
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

          {/* Why we built this */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-gray-900 mb-5">
              Why this exists
            </h2>
            <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6 mb-8">
              <div className="shrink-0">
                <div className="w-[120px] h-[120px] rounded-full bg-slate-200 overflow-hidden flex items-center justify-center shadow-md ring-2 ring-slate-300">
                  <Image
                    src="/cameron-founder.png"
                    alt="Cameron, Founder of AI Compliance Documents"
                    width={120}
                    height={120}
                    className="object-cover"
                  />
                </div>
              </div>
              <div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  I&apos;m Cameron. I built AI Compliance Documents because I needed it myself.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  I&apos;m a small business owner who uses AI across every part of my business. When
                  state AI laws started taking effect, I went looking for compliance documentation I
                  could actually afford and use. What I found was either $5,000+ law firm packages or
                  generic checklists that didn&apos;t reference the actual statute text. Nothing in between.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  So I built it. I&apos;ve run multiple small businesses. I&apos;ve worked in medical
                  and tech compliance — including building HIPAA compliance software for one of the
                  country&apos;s most respected hospital systems. I know what compliance documentation
                  needs to look like, how it needs to be structured, and what regulators actually ask
                  for when they come knocking. That experience is what these templates are built on.
                </p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              AI Compliance Documents exists to close the gap between &quot;I can&apos;t afford a law
              firm&quot; and &quot;I can&apos;t afford to ignore this.&quot; Our templates give you a
              professional, statute-verified starting point that you can take to your attorney for
              final review — instead of starting from zero and paying for every hour of research.
            </p>
          </section>

          {/* Methodology */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-gray-900 mb-5">
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
              starting point — not to replace it.
            </p>
          </section>

          {/* Products */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-gray-900 mb-5">
              Available templates
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              We offer 53 compliance packages covering state AI employment laws (Illinois, NYC, Colorado),
              state consumer data privacy laws (Virginia, Connecticut, California, Oregon, Texas, Delaware,
              Minnesota, Montana, New Jersey, Indiana, Kentucky), federal frameworks (EEOC, NIST AI RMF),
              industry-specific packages (healthcare, financial services), the EU AI Act, and a full library
              of universal governance documents &mdash; bias audits, incident response plans, vendor due
              diligence, employee AI policies, and more.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div className="border border-gray-200 rounded-lg p-4 sm:p-5">
                <p className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-2">
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
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
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
              href="/regulations"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:underline"
            >
              View all 53 products &rarr;
            </Link>
          </section>

          {/* Contact */}
          <section className="border-t border-gray-200 pt-10 sm:pt-12">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">Get in touch</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Questions about our methodology, a specific regulation, or whether a product is right
              for your situation? We&apos;re glad to help.
            </p>
            <a
              href="mailto:info@aicompliancedocuments.com"
              className="inline-block w-full sm:w-auto text-center bg-blue-800 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-blue-900 transition"
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
