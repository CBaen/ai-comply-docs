import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { regulations } from "@/data/regulations";
import StateMapClient from "./StateMapClient";

export const metadata: Metadata = {
  title: "Design Contest #5 — State Map",
  robots: { index: false, follow: false },
};

export default function Design5Page() {
  const readyRegulations = regulations.filter((r) => r.ready);
  return (
    <>
      <Nav />
      <main id="main-content">
        <StateMapClient regulations={readyRegulations} />
      </main>
      <Footer />
    </>
  );
}
