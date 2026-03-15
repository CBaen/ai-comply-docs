#!/usr/bin/env node
/**
 * Generate blog hero images using fal.ai flux schnell
 * Usage: node scripts/generate-blog-image.mjs "prompt text" "output-filename"
 * Output: public/blog/{output-filename}.png
 */

import { writeFile } from "fs/promises";
import { resolve } from "path";
import { config } from "dotenv";

// Load .env.local
config({ path: ".env.local" });

const API_KEY = process.env.VITE_FAL_API_KEY || process.env.FAL_API_KEY;
if (!API_KEY) {
  console.error("Error: FAL_API_KEY or VITE_FAL_API_KEY not found in .env.local");
  process.exit(1);
}

const prompt = process.argv[2];
const outputName = process.argv[3];

if (!prompt || !outputName) {
  console.error("Usage: node scripts/generate-blog-image.mjs \"prompt\" \"output-filename\"");
  console.error("Example: node scripts/generate-blog-image.mjs \"California state flag on desk\" \"blog-hero-california\"");
  process.exit(1);
}

async function generateImage() {
  console.log(`Generating image: ${outputName}`);
  console.log(`Prompt: ${prompt.substring(0, 80)}...`);

  const response = await fetch("https://fal.run/fal-ai/flux/schnell", {
    method: "POST",
    headers: {
      "Authorization": `Key ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
      image_size: { width: 1200, height: 630 },
      num_images: 1,
      enable_safety_checker: false,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error(`fal.ai API error (${response.status}):`, error);
    process.exit(1);
  }

  const data = await response.json();
  const imageUrl = data.images?.[0]?.url;

  if (!imageUrl) {
    console.error("No image URL in response:", JSON.stringify(data));
    process.exit(1);
  }

  console.log(`Downloading image from fal.ai...`);
  const imageResponse = await fetch(imageUrl);
  const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());

  const outputPath = resolve("public/blog", `${outputName}.png`);
  await writeFile(outputPath, imageBuffer);
  console.log(`Saved: ${outputPath}`);
}

generateImage().catch((err) => {
  console.error("Failed:", err.message);
  process.exit(1);
});
