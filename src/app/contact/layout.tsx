import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — AI Compliance Documents",
  description:
    "Questions about AI compliance documents? Contact our team for help choosing the right package, enterprise pricing, or partnership opportunities.",
  alternates: {
    canonical: "https://aicompliancedocuments.com/contact",
  },
  openGraph: {
    title: "Contact Us — AI Compliance Documents",
    description:
      "Questions about AI compliance documents? Contact our team for help choosing the right package, enterprise pricing, or partnership opportunities.",
    url: "https://aicompliancedocuments.com/contact",
    type: "website",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
