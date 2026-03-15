import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getRegulation } from "@/data/regulations";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-02-25.clover",
  });
}

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
  } catch {
    // Analytics failure must never block payment verification
  }
}

export async function POST(request: Request) {
  const { sessionId } = await request.json();

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
      return NextResponse.json({ verified: true });
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
