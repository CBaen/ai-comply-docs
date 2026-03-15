import type { Metadata } from "next";
import DocumentReviewPanel from "@/components/DocumentReviewPanel";

export const metadata: Metadata = {
  title: "Document Review: Universal Tools & Add-Ons — Internal",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <DocumentReviewPanel
      slugs={[
        "employee-ai-policy",
        "vendor-ai-due-diligence",
        "ai-bias-audit-template",
        "ai-incident-response-plan",
        "ai-system-registry",
        "ai-transparency-report",
        "ai-whistleblower-policy",
        "customer-ai-aup",
        "multi-state-profiling-assessment",
        "multi-state-employer-ai-disclosure",
        "manager-ai-training-kit",
        "annual-compliance-review",
        "board-ai-summary",
        "consumer-notice-kit",
        "data-mapping-inventory",
        "consumer-rights-kit",
      ]}
      groupName="Universal Tools & General Add-Ons"
    />
  );
}
