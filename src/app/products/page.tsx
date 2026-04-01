import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PremiumPricingClient from "@/components/PremiumPricingClient";
import { regulations } from "@/data/regulations";

export const metadata: Metadata = {
  title: "AI Compliance Templates — All Products",
  description:
    "AI compliance templates for US state and federal AI regulations. Illinois, Colorado, California, Texas, NYC, EU AI Act. Instant download.",
  keywords: [
    "ai compliance templates",
    "ai regulation compliance",
    "state ai law compliance",
    "illinois hb3773 template",
    "colorado sb24-205 template",
    "texas traiga compliance",
    "california ccpa admt",
    "ai governance documents",
  ],
  alternates: {
    canonical: "https://aicompliancedocuments.com/products",
  },
  openGraph: {
    title: "AI Compliance Templates — All Products",
    description:
      "AI compliance templates for US state and federal regulations. Instant download, one-time purchase.",
    url: "https://aicompliancedocuments.com/products",
    type: "website",
  },
};

function ItemListSchema() {
  const ready = regulations.filter((r) => r.ready);
  const data = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "AI Compliance Document Packages",
    numberOfItems: ready.length,
    itemListElement: ready.map((r, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://aicompliancedocuments.com/products/${r.slug}`,
      name: r.shortName,
    })),
  });
  return <script type="application/ld+json">{data}</script>;
}

export default function ProductsPage() {
  const readyRegulations = regulations.filter((r) => r.ready);
  return (
    <>
      <ItemListSchema />
      <Nav />
      <PremiumPricingClient regulations={readyRegulations} />
      <Footer />
    </>
  );
}
