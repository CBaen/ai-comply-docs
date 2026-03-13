import { NextResponse } from "next/server";
import Stripe from "stripe";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-02-25.clover",
  });
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
