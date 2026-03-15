import type { Metadata } from "next";
import DocumentReviewPanel from "@/components/DocumentReviewPanel";

export const metadata: Metadata = {
  title: "Document Review: Federal & Industry Frameworks — Internal",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <DocumentReviewPanel
      slugs={["eeoc-ai-hiring", "nist-ai-rmf", "healthcare-ai-compliance", "financial-services-ai", "ai-governance-framework"]}
      groupName="Federal & Industry Frameworks"
    />
  );
}
