import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getRegulation } from "@/data/regulations";
import { REGULATION_CONFIG } from "@/lib/regulation-config";
import { auth } from "@/lib/auth";
import { getStripe } from "@/lib/stripe";

export async function POST(request: Request) {
  const body = await request.json();
  const { addonIds, regulation } = body;

  // Optional: attach logged-in user info to the session for post-purchase linking
  // Skip auth entirely if database is not configured (auth requires PostgreSQL)
  let userEmail: string | null = null;
  let userId: string | null = null;
  if (process.env.DATABASE_URL) {
    const userSession = await auth().catch(() => null);
    userEmail = userSession?.user?.email ?? null;
    userId = userSession?.user?.id ?? null;
  }

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

    const selectedAddonIds: string[] = Array.isArray(addonIds) ? addonIds : [];
    if (selectedAddonIds.length > 0) {
      const configEntry = REGULATION_CONFIG[slug];
      const availableAddons = configEntry?.addons ?? [];
      for (const addonId of selectedAddonIds) {
        const addon = availableAddons.find((a) => a.id === addonId);
        if (addon?.stripePriceId) {
          lineItems.push({ price: addon.stripePriceId, quantity: 1 });
        }
      }
    }

    const origin = "https://aicompliancedocuments.com";

    const stripe = getStripe();

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: "payment",
      line_items: lineItems,
      allow_promotion_codes: true,
      success_url: `${origin}/products/${slug}?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/products/${slug}?payment=cancelled`,
      metadata: {
        regulation: slug,
        ...(userId ? { user_id: userId } : {}),
      },
    };

    // Pre-fill customer email if logged in — reduces friction at checkout
    if (userEmail) {
      sessionParams.customer_email = userEmail;
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout session creation error:", err);
    return NextResponse.json(
      { error: "Could not create checkout session" },
      { status: 500 }
    );
  }
}
