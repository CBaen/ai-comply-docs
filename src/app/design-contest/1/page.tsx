/**
 * Design Contest #1 — Category Showcase
 * Preview page. Not indexed by search engines.
 *
 * Design 1 is a complete, self-contained server page with its own Nav, Footer,
 * metadata, and schema. We import and re-export it directly.
 */

import type { Metadata } from "next";

// Override metadata for the preview context (no-index)
export const metadata: Metadata = {
  title: "Design Contest #1 — Category Showcase",
  description: "Preview of product page design concept 1: Category Showcase.",
  robots: { index: false, follow: false },
};

// The design file is a complete page — import and re-export its default component
export { default } from "@/research/products-redesign/design-1-category-showcase";
