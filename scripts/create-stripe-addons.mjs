#!/usr/bin/env node
/**
 * Create 17 add-on Stripe products with prices
 * Outputs the price IDs for wiring into regulations.ts
 */

import { config } from "dotenv";
config({ path: ".env.local" });

const STRIPE_KEY = process.env.STRIPE_SECRET_KEY;
if (!STRIPE_KEY) {
  console.error("STRIPE_SECRET_KEY not found in .env.local");
  process.exit(1);
}

const PRODUCTS = [
  { slug: "il-notice-response-kit", name: "Illinois Employee AI Notice & Response Kit", price: 79 },
  { slug: "il-zip-proxy-audit", name: "Illinois Zip Code Proxy Audit Workbook", price: 99 },
  { slug: "co-appeal-correction-kit", name: "Colorado Consumer Appeal & Correction Process Kit", price: 99 },
  { slug: "co-ag-reporting-kit", name: "Colorado Algorithmic Discrimination Discovery & AG Reporting Kit", price: 129 },
  { slug: "co-dev-deploy-exchange", name: "Colorado Developer-Deployer Documentation Exchange Kit", price: 109 },
  { slug: "ca-admt-notice-optout", name: "California ADMT Pre-Use Notice & Opt-Out Processing Kit", price: 99 },
  { slug: "ca-admt-access-kit", name: "California ADMT Access Request Response Kit", price: 89 },
  { slug: "ca-cyber-audit-kit", name: "California Cybersecurity Audit & Risk Assessment Companion Kit", price: 149 },
  { slug: "nyc-bias-audit-mgmt", name: "NYC Bias Audit Management & Publication Kit", price: 129 },
  { slug: "nyc-candidate-notice-kit", name: "NYC Candidate/Employee Notice & Alternative Process Kit", price: 89 },
  { slug: "va-consumer-rights-kit", name: "Virginia Consumer Rights Exercise & Appeal Processing Kit", price: 99 },
  { slug: "va-profiling-assessment-kit", name: "Virginia Profiling & AI Data Protection Assessment Workbook", price: 109 },
  { slug: "va-controller-processor-kit", name: "Virginia Controller-Processor Contract & Vendor Compliance Kit", price: 89 },
  { slug: "eu-fria-kit", name: "EU AI Act Fundamental Rights Impact Assessment Kit", price: 149 },
  { slug: "eu-post-market-kit", name: "EU AI Act Post-Market Monitoring & Serious Incident Response Kit", price: 139 },
  { slug: "eu-human-oversight-kit", name: "EU AI Act Human Oversight & Worker Notification Kit", price: 99 },
  { slug: "eu-registration-transparency", name: "EU AI Act Database Registration & Transparency Kit", price: 89 },
];

async function createProduct(product) {
  // Create Stripe product
  const productRes = await fetch("https://api.stripe.com/v1/products", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${STRIPE_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      name: product.name,
      "metadata[slug]": product.slug,
    }),
  });

  if (!productRes.ok) {
    const err = await productRes.text();
    console.error(`Failed to create product ${product.slug}:`, err);
    return null;
  }

  const stripeProduct = await productRes.json();

  // Create price
  const priceRes = await fetch("https://api.stripe.com/v1/prices", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${STRIPE_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      product: stripeProduct.id,
      unit_amount: (product.price * 100).toString(),
      currency: "usd",
    }),
  });

  if (!priceRes.ok) {
    const err = await priceRes.text();
    console.error(`Failed to create price for ${product.slug}:`, err);
    return null;
  }

  const stripePrice = await priceRes.json();
  return { slug: product.slug, priceId: stripePrice.id, productId: stripeProduct.id };
}

async function main() {
  console.log("Creating 17 Stripe products...\n");
  const results = [];

  for (const product of PRODUCTS) {
    const result = await createProduct(product);
    if (result) {
      console.log(`✓ ${result.slug}: ${result.priceId}`);
      results.push(result);
    }
  }

  console.log("\n--- Copy these into regulations.ts ---\n");
  for (const r of results) {
    console.log(`"${r.slug}": "${r.priceId}",`);
  }
}

main().catch(console.error);
