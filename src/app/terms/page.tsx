import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for AI Compliance Documents. Our templates are for compliance planning purposes only and do not constitute legal advice.",
  alternates: {
    canonical: "https://aicompliancedocuments.com/terms",
  },
  openGraph: {
    title: "Terms of Service",
    description:
      "Terms of Service for AI Compliance Documents. Our templates are for compliance planning purposes only.",
    url: "https://aicompliancedocuments.com/terms",
  },
};

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className="min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-gray-900 mb-3">
            Terms of Service
          </h1>
          <p className="text-gray-600 text-sm mb-10">
            Effective date: <time dateTime="2026-03-14">March 14, 2026</time> &nbsp;|&nbsp; Last updated: <time dateTime="2026-03-14">March 14, 2026</time>
          </p>

          <div className="prose prose-gray max-w-none space-y-10 text-gray-700 leading-relaxed">

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">1. We Are Not a Law Firm</h2>
              <p>
                AI Compliance Documents is a document generation service. We are not a law firm, we do
                not employ attorneys in a client-facing capacity, and we do not practice law. Nothing on
                this website, and nothing in any document we generate, constitutes legal advice.
              </p>
              <p className="mt-3">
                The templates we provide are starting points for your compliance planning — not finished
                legal instruments. They are built from enacted statute text and published regulatory
                guidance, but applying that law to your specific business situation requires professional
                legal judgment that only a licensed attorney can provide.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">2. What Our Documents Are</h2>
              <p>
                Our documents are customizable templates intended to help businesses begin the process of
                AI compliance documentation. They are designed for compliance planning purposes and are
                not a substitute for the advice of qualified legal counsel.
              </p>
              <p className="mt-3">
                Specifically, our documents:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-2 ml-2">
                <li>Are based on enacted statute text from official government sources.</li>
                <li>Reflect the regulatory landscape at the time of publication.</li>
                <li>Do not account for your specific business circumstances, industry, size, or risk profile.</li>
                <li>Do not account for regulatory changes that occur after the time of purchase.</li>
                <li>Are templates — they require your review, customization, and attorney verification before use.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">3. Not Legal Advice — Consult an Attorney</h2>
              <p>
                We strongly recommend that you consult a licensed attorney admitted in your jurisdiction
                before relying on any document generated through this service. AI and algorithmic
                accountability laws are actively evolving, and the legal sufficiency of any compliance
                document depends on facts and circumstances specific to your organization.
              </p>
              <p className="mt-3">
                No attorney-client relationship is formed by your use of this website or purchase of any
                document. There is no privilege associated with any communication with AI Compliance
                Documents.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">4. No Guarantee of Legal Sufficiency</h2>
              <p>
                AI Compliance Documents makes no representation, warranty, or guarantee — express or
                implied — that any document generated through our service will satisfy the requirements
                of any law, regulation, agency guidance, enforcement action, or legal proceeding. We do
                not guarantee that a document generated today will remain compliant as regulations
                evolve.
              </p>
              <p className="mt-3">
                Regulatory compliance is ultimately your responsibility. We provide tools to help you
                get started; we cannot certify that you are compliant.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">5. Your Responsibility</h2>
              <p>
                By purchasing a document from AI Compliance Documents, you acknowledge and agree that:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-2 ml-2">
                <li>You are solely responsible for verifying the accuracy, completeness, and applicability of any document to your situation.</li>
                <li>You will review the document with qualified legal counsel before implementing it.</li>
                <li>You will monitor applicable laws and update your documentation as regulations change.</li>
                <li>AI Compliance Documents bears no responsibility for your compliance status, enforcement actions, penalties, or any other consequence arising from your use or non-use of our documents.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">6. All Sales Final</h2>
              <p>
                All sales are final. Documents are generated and delivered digitally at the time
                of purchase. We recommend reviewing the product description and document list
                before purchasing to ensure it meets your needs.
              </p>
              <p className="mt-3">
                If you experience a technical issue with delivery of your documents, contact us at{" "}
                <a
                  href="mailto:info@aicompliancedocuments.com"
                  className="text-blue-700 underline"
                >
                  info@aicompliancedocuments.com
                </a>{" "}
                and we will make it right.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">7. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by applicable law, AI Compliance Documents, its owners,
                employees, agents, and service providers shall not be liable for any indirect,
                incidental, special, consequential, or punitive damages arising from or related to your
                use of this website or any document obtained through it — including but not limited to
                regulatory fines, penalties, enforcement actions, legal fees, or business losses.
              </p>
              <p className="mt-3">
                In any event, our total liability to you for any claim shall not exceed the amount you
                paid for the specific document giving rise to the claim.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">8. Intellectual Property</h2>
              <p>
                Documents you purchase are licensed for your internal business use only. You may not
                resell, redistribute, or sublicense our templates or document output to third parties.
                The template structure, formatting, organization, and accompanying guidance text remain
                the intellectual property of AI Compliance Documents.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">9. Governing Law</h2>
              <p>
                These Terms of Service are governed by the laws of the State of Wyoming, without regard
                to its conflict of law provisions. Any dispute arising from these terms or your use of
                this service shall be resolved in the courts of Wyoming, and you consent to personal
                jurisdiction in that venue.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">10. Changes to These Terms</h2>
              <p>
                We may update these Terms of Service from time to time. When we do, we will update the
                effective date at the top of this page. Continued use of the site after any update
                constitutes your acceptance of the revised terms. We recommend reviewing this page
                periodically.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">11. Contact</h2>
              <p>
                Questions about these terms? Reach us at:{" "}
                <a
                  href="mailto:info@aicompliancedocuments.com"
                  className="text-blue-700 underline"
                >
                  info@aicompliancedocuments.com
                </a>
              </p>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
