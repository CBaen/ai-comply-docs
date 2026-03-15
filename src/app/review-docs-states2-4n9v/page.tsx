import type { Metadata } from "next";
import DocumentReviewPanel from "@/components/DocumentReviewPanel";

export const metadata: Metadata = {
  title: "Document Review: State Privacy Laws Group 2 — Internal",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <DocumentReviewPanel
      slugs={["indiana-icdpa", "kentucky-kcdpa", "new-jersey-njdpa", "delaware-pdpa", "texas-tdpsa"]}
      groupName="State Privacy Laws (IN, KY, NJ, DE, TX)"
    />
  );
}
