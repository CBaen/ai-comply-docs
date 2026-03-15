import type { Metadata } from "next";
import DocumentReviewPanel from "@/components/DocumentReviewPanel";

export const metadata: Metadata = {
  title: "Document Review: Colorado — Internal",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <DocumentReviewPanel
      slugs={["colorado-sb24-205", "co-appeal-correction-kit", "co-ag-reporting-kit", "co-dev-deploy-exchange"]}
      groupName="Colorado (SB 24-205 + Add-Ons)"
    />
  );
}
