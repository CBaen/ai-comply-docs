import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { regulations } from "@/data/regulations";
import ProductLibraryMinimal from "@/components/ProductLibraryMinimal";

export const metadata: Metadata = {
  title: "Design Contest #8 — Minimal Conversion",
  robots: { index: false, follow: false },
};

export default function Design8Page() {
  const readyRegulations = regulations.filter((r) => r.ready);
  return (
    <>
      <Nav />
      <main id="main-content">
        <ProductLibraryMinimal regulations={readyRegulations} />
      </main>
      <Footer />
    </>
  );
}
