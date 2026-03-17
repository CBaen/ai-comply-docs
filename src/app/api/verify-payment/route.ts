import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getRegulation } from "@/data/regulations";
import { generateDeliveryToken } from "@/lib/delivery-token";
import { getPool } from "@/lib/db";
import { getStripe } from "@/lib/stripe";

async function trackPurchase(session: Stripe.Checkout.Session) {
  const measurementId = process.env.GA_MEASUREMENT_ID;
  const apiSecret = process.env.GA_API_SECRET;
  if (!measurementId || !apiSecret) return;

  const slug = session.metadata?.regulation ?? "unknown";
  const reg = getRegulation(slug);
  const totalCents = session.amount_total ?? 0;

  try {
    await fetch(
      `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
      {
        method: "POST",
        body: JSON.stringify({
          client_id: session.client_reference_id || session.id,
          events: [
            {
              name: "purchase",
              params: {
                currency: "USD",
                value: totalCents / 100,
                transaction_id: session.id,
                items: [
                  {
                    item_id: slug,
                    item_name: reg?.shortName ?? slug,
                    price: totalCents / 100,
                    quantity: 1,
                  },
                ],
              },
            },
          ],
        }),
      }
    );
  } catch (err) {
    console.error("GA analytics track failed (non-blocking):", err);
  }
}

async function savePurchaseFallback(
  session: Stripe.Checkout.Session,
  formData: Record<string, unknown> | null
) {
  if (!process.env.DATABASE_URL) return; // Database not configured yet
  try {
    const pool = getPool();
    const slug = session.metadata?.regulation ?? null;
    const email = session.customer_details?.email ?? null;
    const amountCents = session.amount_total ?? 0;

    await pool.query(
      `INSERT INTO purchases
         (stripe_session_id, regulation_slug, amount_paid, email_at_purchase, form_data)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (stripe_session_id) DO NOTHING`,
      [
        session.id,
        slug,
        amountCents,
        email,
        formData ? JSON.stringify(formData) : null,
      ]
    );
  } catch (err) {
    // Fallback save must never block payment verification — webhook is the primary path
    console.error("verify-payment DB fallback error:", err);
  }
}

export async function POST(request: Request) {
  const { sessionId, formData } = await request.json();

  if (!sessionId || typeof sessionId !== "string") {
    return NextResponse.json(
      { verified: false, error: "Missing session ID" },
      { status: 400 }
    );
  }

  if (!sessionId.startsWith("cs_")) {
    return NextResponse.json(
      { verified: false, error: "Invalid session ID format" },
      { status: 400 }
    );
  }

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (
      session.payment_status === "paid" ||
      session.payment_status === "no_payment_required"
    ) {
      trackPurchase(session);
      // Synchronous fallback: save to DB in case the webhook hasn't fired yet.
      // ON CONFLICT DO NOTHING means this is safe to call even if webhook already ran.
      savePurchaseFallback(session, formData ?? null);
      return NextResponse.json({
        verified: true,
        deliveryToken: generateDeliveryToken(sessionId),
      });
    }

    return NextResponse.json(
      {
        verified: false,
        error: "Payment not completed",
        status: session.payment_status,
      },
      { status: 402 }
    );
  } catch (err: unknown) {
    const stripeErr = err as { type?: string; message?: string };
    if (stripeErr.type === "StripeInvalidRequestError") {
      return NextResponse.json(
        { verified: false, error: "Invalid session" },
        { status: 400 }
      );
    }
    console.error("Stripe verification error:", stripeErr.message);
    return NextResponse.json(
      { verified: false, error: "Verification failed" },
      { status: 500 }
    );
  }
}
