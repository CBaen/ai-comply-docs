/**
 * Generate sample document preview images for all products.
 * Run: npx tsx scripts/generate-previews.mts
 *
 * Produces one WebP per regulation slug in public/previews/.
 * Re-run whenever PDF templates change.
 */

import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import { generateDocumentsInner } from "@/lib/pdf-generator";
import { regulations } from "@/data/regulations";
import type { ComplianceFormData } from "@/lib/pdf-types";

// pdfjs-dist for rendering PDF page 1 to canvas
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist/legacy/build/pdf.mjs";
import { createCanvas } from "canvas";
import sharp from "sharp";

// Disable web worker (not available in Node)
GlobalWorkerOptions.workerSrc = "";

const PREVIEW_DIR = join(process.cwd(), "public", "previews");
const PREVIEW_WIDTH = 800; // px — crisp on retina at 400px display

const SAMPLE_DATA: Omit<ComplianceFormData, "regulation"> = {
  company: {
    name: "Acme Corporation",
    state: "Illinois",
    size: "201-500 employees",
    industry: "Technology",
  },
  aiSystems: [
    {
      name: "HireVue Video Interview Platform",
      vendor: "HireVue Inc.",
      description:
        "AI-powered video interview analysis for candidate evaluation and scoring",
      decisions: ["hiring", "recruitment"],
    },
    {
      name: "Workday Recruiting AI",
      vendor: "Workday Inc.",
      description: "Resume screening, candidate ranking, and skills matching",
      decisions: ["screening", "hiring"],
    },
  ],
  dataInputs: ["resume", "video", "assessment", "performance_data"],
  protectedCharacteristics: ["race", "gender", "age", "disability"],
  biasAudit: "conducted",
  oversight: {
    aiRole: "advisory",
    oversightRole: "Chief Compliance Officer",
    humanReview: "always",
    reviewFrequency: "quarterly",
  },
  contact: {
    name: "Jane Smith",
    title: "Chief Compliance Officer",
    email: "compliance@acmecorp.com",
    phone: "(555) 123-4567",
  },
  generatedDate: "January 1, 2026",
  selectedAddons: [],
};

async function renderPage1ToPng(pdfBytes: ArrayBuffer): Promise<Buffer> {
  const pdfDoc = await getDocument({
    data: new Uint8Array(pdfBytes),
    useSystemFonts: true,
    standardFontDataUrl: undefined,
  }).promise;

  const page = await pdfDoc.getPage(1);
  const scale = 2; // 2x for retina
  const viewport = page.getViewport({ scale });

  const canvas = createCanvas(viewport.width, viewport.height);
  const ctx = canvas.getContext("2d");

  // White background
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, viewport.width, viewport.height);

  // @ts-expect-error pdfjs-dist types mismatch with node-canvas context
  await page.render({ canvasContext: ctx, viewport }).promise;

  // Get raw pixel data and resize with sharp
  const rawPixels = ctx.getImageData(0, 0, viewport.width, viewport.height);
  const webpBuffer = await sharp(Buffer.from(rawPixels.data), {
    raw: {
      width: viewport.width,
      height: viewport.height,
      channels: 4,
    },
  })
    .resize(PREVIEW_WIDTH)
    .webp({ quality: 85 })
    .toBuffer();

  return webpBuffer;
}

async function main() {
  mkdirSync(PREVIEW_DIR, { recursive: true });

  const readySlugs = regulations
    .filter((r) => r.ready)
    .map((r) => r.slug);

  console.log(`Generating previews for ${readySlugs.length} products...`);

  let success = 0;
  let failed = 0;

  for (const slug of readySlugs) {
    try {
      const data: ComplianceFormData = {
        ...SAMPLE_DATA,
        regulation: slug,
      };

      const docs = await generateDocumentsInner(data);
      if (docs.length === 0) {
        console.log(`  SKIP ${slug} — no documents generated`);
        continue;
      }

      // Take the first document (primary document for this product)
      const primaryDoc = docs[0];
      const pdfBytes = primaryDoc.doc.output("arraybuffer");
      const pngBuffer = await renderPage1ToPng(pdfBytes);

      const outPath = join(PREVIEW_DIR, `${slug}.webp`);
      writeFileSync(outPath, webpBuffer);
      console.log(`  OK   ${slug} (${(webpBuffer.length / 1024).toFixed(0)}KB)`);
      success++;
    } catch (err) {
      console.error(`  FAIL ${slug}:`, (err as Error).message);
      failed++;
    }
  }

  console.log(`\nDone: ${success} previews generated, ${failed} failed.`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
