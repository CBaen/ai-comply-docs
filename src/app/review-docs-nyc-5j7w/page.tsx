import type { Metadata } from "next";
import DocumentReviewPanel from "@/components/DocumentReviewPanel";

export const metadata: Metadata = {
  title: "Document Review: NYC — Internal",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <DocumentReviewPanel
      slugs={["nyc-local-law-144", "nyc-bias-audit-mgmt", "nyc-candidate-notice-kit"]}
      groupName="NYC (Local Law 144 + Add-Ons)"
    />
  );
}
