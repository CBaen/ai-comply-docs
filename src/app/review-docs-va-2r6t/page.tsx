import type { Metadata } from "next";
import DocumentReviewPanel from "@/components/DocumentReviewPanel";

export const metadata: Metadata = {
  title: "Document Review: Virginia — Internal",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <DocumentReviewPanel
      slugs={["virginia-cdpa", "va-consumer-rights-kit", "va-profiling-assessment-kit", "va-controller-processor-kit"]}
      groupName="Virginia (CDPA + Add-Ons)"
    />
  );
}
