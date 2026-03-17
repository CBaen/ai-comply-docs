import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getPool } from "@/lib/db";

// Stripe requires the raw body for signature verification.
// Next.js App Router handles this natively — request.text() returns raw body.
// No config needed (bodyParser config is a Pages Router pattern).

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-02-25.clover",
  });
}

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET is not configured");
    return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
  }

  let event: Stripe.Event;
  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Stripe webhook signature verification failed:", message);
    return NextResponse.json({ error: `Webhook signature invalid: ${message}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const stripeSessionId = session.id;
    const email = session.customer_details?.email ?? null;
    const regulation = session.metadata?.regulation ?? null;
    const userId = session.metadata?.user_id ?? null;
    const amountCents = session.amount_total ?? 0;
    const stripeCustomerId =
      typeof session.customer === "string" ? session.customer : null;

    if (!process.env.DATABASE_URL) {
      // Database not configured — skip purchase recording, acknowledge webhook
      return NextResponse.json({ received: true });
    }

    try {
      const pool = getPool();

      // Upsert: insert the purchase row; if the verify-payment fallback already
      // inserted it, the ON CONFLICT skips but we still update user_id if present.
      await pool.query(
        `INSERT INTO purchases
           (stripe_session_id, regulation_slug, amount_paid, email_at_purchase, stripe_customer_id, user_id)
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT (stripe_session_id) DO UPDATE
           SET user_id = COALESCE(purchases.user_id, EXCLUDED.user_id),
               stripe_customer_id = COALESCE(purchases.stripe_customer_id, EXCLUDED.stripe_customer_id)`,
        [
          stripeSessionId,
          regulation,
          amountCents,
          email,
          stripeCustomerId,
          userId && userId !== "" ? userId : null,
        ]
      );
    } catch (err) {
      console.error("Webhook DB error:", err);
      // Return 500 so Stripe retries — do not swallow DB errors silently
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
  }

  // Acknowledge all other event types with 200 to prevent Stripe retries
  return NextResponse.json({ received: true });
}
