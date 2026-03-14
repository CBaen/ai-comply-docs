import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getRegulation } from "@/data/regulations";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-02-25.clover",
  });
}

// Add-on price IDs for products with optional training kit upsell
const ADDON_PRICES: Record<string, { trainingKit?: string }> = {
  "illinois-hb3773": {
    trainingKit: "price_1TA3XHGidFVHIL99h2UwiLd9",
  },
};

export async function POST(request: Request) {
  const body = await request.json();
  const { includeTrainingKit, regulation } = body;

  const slug = regulation || "illinois-hb3773";
  const reg = getRegulation(slug);

  if (!reg || !reg.stripePriceId) {
    const name = reg?.shortName || slug;
    return NextResponse.json(
      { error: `Product not yet available for ${name}. Please check back soon.` },
      { status: 400 }
    );
  }

  try {
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      { price: reg.stripePriceId, quantity: 1 },
    ];

    const addons = ADDON_PRICES[slug];
    if (includeTrainingKit && addons?.trainingKit) {
      lineItems.push({ price: addons.trainingKit, quantity: 1 });
    }

    const origin = request.headers.get("origin") || "https://aicompliancedocuments.com";

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      allow_promotion_codes: true,
      success_url: `${origin}/regulations/${slug}?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/regulations/${slug}?payment=cancelled`,
      metadata: { regulation: slug },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout session creation error:", err);
    return NextResponse.json(
      { error: "Could not create checkout session" },
      { status: 500 }
    );
  }
}
