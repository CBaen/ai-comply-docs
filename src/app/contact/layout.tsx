import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Questions about AI compliance documents? Contact us for help choosing the right package, bulk pricing, or partnership opportunities.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
