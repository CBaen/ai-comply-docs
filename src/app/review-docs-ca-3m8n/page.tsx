import type { Metadata } from "next";
import DocumentReviewPanel from "@/components/DocumentReviewPanel";

export const metadata: Metadata = {
  title: "Document Review: California — Internal",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <DocumentReviewPanel
      slugs={["california-ccpa-admt", "ca-admt-notice-optout", "ca-admt-access-kit", "ca-cyber-audit-kit"]}
      groupName="California (CCPA ADMT + Add-Ons)"
    />
  );
}
