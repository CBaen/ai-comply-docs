import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ComplianceQuiz from "@/components/ComplianceQuiz";

export const metadata: Metadata = {
  title: "Do I Need AI Compliance? Free Assessment | AI Compliance Documents",
  description:
    "Answer 5 questions to find out which AI compliance laws apply to your business. Free assessment covers 14+ state laws, federal requirements, and industry-specific regulations.",
  keywords: [
    "do i need ai compliance",
    "ai compliance assessment",
    "which ai laws apply to me",
    "ai compliance quiz",
    "ai compliance requirements",
    "ai regulation checker",
  ],
  alternates: {
    canonical: "https://aicompliancedocuments.com/do-i-need-ai-compliance",
  },
  openGraph: {
    title: "Do I Need AI Compliance? Free Assessment | AI Compliance Documents",
    description:
      "Answer 5 questions to find out which AI compliance laws apply to your business. Free assessment covers 14+ state laws, federal requirements, and industry-specific regulations.",
    url: "https://aicompliancedocuments.com/do-i-need-ai-compliance",
    type: "website",
  },
};

export default function DoINeedAICompliancePage() {
  return (
    <>
      <Nav />
      <main id="main-content" className="min-h-screen bg-white">
        {/* Hero */}
        <header className="bg-gray-900 text-white py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-4">
            <p className="text-blue-400 text-sm font-semibold uppercase tracking-wider mb-4">
              Free Assessment
            </p>
            <h1 className="text-3xl md:text-4xl font-bold font-display leading-tight mb-6">
              Do I Need AI Compliance?
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
              Answer 5 questions to see which AI laws apply to your business — and which
              documentation packages cover your specific obligations.
            </p>
            <div className="flex flex-wrap gap-4 mt-8 text-sm text-gray-400">
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-400" />
                Takes about 2 minutes
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-400" />
                Covers 14+ state laws
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-400" />
                No email required
              </span>
            </div>
          </div>
        </header>

        {/* Quiz */}
        <ComplianceQuiz />
      </main>
      <Footer />
    </>
  );
}
