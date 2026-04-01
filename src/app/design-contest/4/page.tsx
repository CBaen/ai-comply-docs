import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { regulations } from "@/data/regulations";
import PremiumPricingClient from "./PremiumPricingClient";

export const metadata: Metadata = {
  title: "Design Contest #4 — Premium Pricing",
  robots: { index: false, follow: false },
};

export default function Design4Page() {
  const readyRegulations = regulations.filter((r) => r.ready);
  return (
    <>
      <Nav />
      <PremiumPricingClient regulations={readyRegulations} />
      <Footer />
    </>
  );
}
