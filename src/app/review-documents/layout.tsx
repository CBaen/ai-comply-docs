import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Document Review — Internal",
  robots: { index: false, follow: false },
};

export default function ReviewDocumentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
