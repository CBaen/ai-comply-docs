import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | AI Compliance Documents",
  description:
    "Privacy Policy for AI Compliance Documents. We don't sell your data. Learn what we collect, how we use it, and your rights.",
  alternates: {
    canonical: "https://aicompliancedocuments.com/privacy",
  },
  openGraph: {
    title: "Privacy Policy | AI Compliance Documents",
    description:
      "Privacy Policy for AI Compliance Documents. We don't sell your data.",
    url: "https://aicompliancedocuments.com/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className="min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-gray-900 mb-3">
            Privacy Policy
          </h1>
          <p className="text-gray-500 text-sm mb-10">
            Effective date: <time dateTime="2026-03-14">March 14, 2026</time> &nbsp;|&nbsp; Last updated: <time dateTime="2026-03-14">March 14, 2026</time>
          </p>

          <div className="prose prose-gray max-w-none space-y-10 text-gray-700 leading-relaxed">

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">1. Overview</h2>
              <p>
                AI Compliance Documents (&quot;we,&quot; &quot;our,&quot; &quot;us&quot;) operates the website{" "}
                <span className="font-medium text-gray-900">aicompliancedocuments.com</span>. This
                Privacy Policy explains what information we collect, how we use it, and your rights
                with respect to that information.
              </p>
              <p className="mt-3">
                The short version: we collect only what we need to generate and deliver your document.
                We do not sell your personal information. We do not store your payment card data.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">2. What Data We Collect</h2>

              <h3 className="text-base font-semibold text-gray-900 mt-5 mb-2">Information you provide directly</h3>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>
                  <span className="font-medium">Company information:</span> Your company name, contact
                  name, and business email address — provided during the compliance questionnaire.
                </li>
                <li>
                  <span className="font-medium">AI system information:</span> Details about the AI
                  tools or systems you use in your business, entered in the product questionnaire and
                  used to customize your document.
                </li>
                <li>
                  <span className="font-medium">Contact information:</span> Your email address, used
                  to deliver your completed document.
                </li>
              </ul>

              <h3 className="text-base font-semibold text-gray-900 mt-5 mb-2">Payment information</h3>
              <p>
                Payment is processed by{" "}
                <span className="font-medium text-gray-900">Stripe</span>. We never see, receive, or
                store your credit card number, CVV, or bank account details. Stripe handles all payment
                processing under their own{" "}
                <a
                  href="https://stripe.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 underline"
                >
                  Privacy Policy
                </a>
                . We receive only a confirmation that payment was successful, along with the email
                address associated with the transaction.
              </p>

              <h3 className="text-base font-semibold text-gray-900 mt-5 mb-2">Automatically collected information</h3>
              <p>
                Like most websites, our hosting provider (Vercel) may collect standard server logs
                including IP addresses, browser type, pages visited, and timestamps. This information
                is used for security, performance monitoring, and abuse prevention — not for marketing.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">3. How We Use Your Data</h2>
              <p>We use the information you provide for two purposes:</p>
              <ul className="list-disc list-inside mt-3 space-y-2 ml-2">
                <li>
                  <span className="font-medium">To generate your compliance document.</span> The
                  questionnaire answers are used to populate your document template with information
                  specific to your business.
                </li>
                <li>
                  <span className="font-medium">To deliver your document.</span> We use your email
                  address to send your completed document via{" "}
                  <span className="font-medium text-gray-900">Resend</span>, our transactional email
                  provider.
                </li>
              </ul>
              <p className="mt-3">
                We do not use your information for advertising, profiling, or any purpose beyond
                delivering the service you purchased.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">4. Questionnaire Data and Storage</h2>
              <p>
                The compliance questionnaire you complete before purchase is stored in your
                browser&apos;s <span className="font-medium text-gray-900">sessionStorage</span> only.
                This means the questionnaire data exists locally in your browser for the duration of
                your session. It is not transmitted to or stored on our servers. When your session ends
                or your browser tab is closed, sessionStorage is cleared automatically.
              </p>
              <p className="mt-3">
                Your questionnaire answers are used to generate your documents in your browser. They
                are not stored on our servers. If you need to generate documents again, you will need
                to fill out the questionnaire again.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">5. Third-Party Service Providers</h2>
              <p>We use the following third-party services to operate our website:</p>
              <ul className="list-disc list-inside mt-3 space-y-2 ml-2">
                <li>
                  <span className="font-medium">Stripe</span> — Payment processing. Stripe is PCI
                  DSS compliant. We do not store payment card data.
                </li>
                <li>
                  <span className="font-medium">Resend</span> — Transactional email delivery. Your
                  email address is shared with Resend solely to deliver your document.
                </li>
                <li>
                  <span className="font-medium">Vercel</span> — Website hosting and infrastructure.
                  Vercel may collect server logs as described above.
                </li>
                <li>
                  <span className="font-medium">Google Analytics (Google LLC)</span> — We use Google
                  Analytics to understand how visitors use our website. Google Analytics collects
                  anonymized usage data including pages visited, time on site, and device information.
                  No personally identifiable information is shared with Google Analytics.{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 underline"
                  >
                    Google&apos;s privacy policy
                  </a>
                  .
                </li>
              </ul>
              <p className="mt-3">
                We do not share your personal information with any other third parties. We do not sell
                your personal information to anyone, for any price.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">6. We Do Not Sell Your Data</h2>
              <p>
                We do not sell, rent, trade, or otherwise transfer your personal information to outside
                parties for their own marketing or commercial purposes. This applies to all users,
                including California residents under the California Consumer Privacy Act (CCPA).
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">7. California Residents — Your CCPA Rights</h2>
              <p>
                If you are a California resident, you have the right to:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-2 ml-2">
                <li>
                  <span className="font-medium">Know</span> what personal information we have
                  collected about you and how it is used.
                </li>
                <li>
                  <span className="font-medium">Delete</span> personal information we hold about you,
                  subject to certain exceptions.
                </li>
                <li>
                  <span className="font-medium">Opt out</span> of the sale of your personal
                  information. (We don&apos;t sell it — but you have this right regardless.)
                </li>
                <li>
                  <span className="font-medium">Non-discrimination</span> — we will not treat you
                  differently for exercising your privacy rights.
                </li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, contact us at{" "}
                <a
                  href="mailto:info@aicompliancedocuments.com"
                  className="text-blue-700 underline"
                >
                  info@aicompliancedocuments.com
                </a>
                . We will respond within 45 days as required by law.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">8. Data Retention</h2>
              <p>
                Purchase records (email address, product purchased, amount paid) are retained for
                accounting and customer support purposes. Questionnaire responses are not retained
                after document generation.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">9. Security</h2>
              <p>
                We use industry-standard security practices to protect your information, including
                HTTPS encryption for all data in transit. Payment data is handled entirely by Stripe,
                which is PCI DSS Level 1 certified — the highest level of payment security
                certification available.
              </p>
              <p className="mt-3">
                No method of data transmission or storage is 100% secure. We cannot guarantee absolute
                security, but we take reasonable steps to protect your information.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">10. Children&apos;s Privacy</h2>
              <p>
                Our service is intended for business use by adults. We do not knowingly collect
                personal information from anyone under the age of 18. If you believe we have
                inadvertently collected information from a minor, please contact us and we will delete
                it promptly.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">11. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. When we do, we will update the
                effective date at the top of this page. We encourage you to review this page
                periodically. Continued use of the site after any changes constitutes your acceptance
                of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">12. Contact</h2>
              <p>
                Questions about this Privacy Policy or how we handle your data? Contact us at:{" "}
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
