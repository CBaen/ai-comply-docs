import type { Metadata } from "next";
import DocumentReviewPanel from "@/components/DocumentReviewPanel";

export const metadata: Metadata = {
  title: "Document Review: Illinois — Internal",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <DocumentReviewPanel
      slugs={["illinois-hb3773", "il-notice-response-kit", "il-zip-proxy-audit"]}
      groupName="Illinois (HB3773 + Add-Ons)"
    />
  );
}
