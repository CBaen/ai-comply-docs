import type { Metadata } from "next";
import DocumentReviewPanel from "@/components/DocumentReviewPanel";

export const metadata: Metadata = {
  title: "Document Review: EU AI Act — Internal",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <DocumentReviewPanel
      slugs={["eu-ai-act", "eu-fria-kit", "eu-post-market-kit", "eu-human-oversight-kit", "eu-registration-transparency"]}
      groupName="EU AI Act + Add-Ons"
    />
  );
}
