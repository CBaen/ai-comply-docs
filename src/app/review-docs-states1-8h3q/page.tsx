import type { Metadata } from "next";
import DocumentReviewPanel from "@/components/DocumentReviewPanel";

export const metadata: Metadata = {
  title: "Document Review: State Privacy Laws Group 1 — Internal",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <DocumentReviewPanel
      slugs={["connecticut-ctdpa", "oregon-cpa", "minnesota-mcdpa", "montana-mcdpa"]}
      groupName="State Privacy Laws (CT, OR, MN, MT)"
    />
  );
}
