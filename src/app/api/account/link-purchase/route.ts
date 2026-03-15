import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getPool } from "@/lib/db";

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.id || !session.user.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let stripeSessionId: string;
  try {
    const body = await request.json();
    stripeSessionId = body.stripe_session_id;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!stripeSessionId || typeof stripeSessionId !== "string") {
    return NextResponse.json({ error: "stripe_session_id is required" }, { status: 400 });
  }

  if (!stripeSessionId.startsWith("cs_")) {
    return NextResponse.json({ error: "Invalid session ID format" }, { status: 400 });
  }

  try {
    const pool = getPool();

    // Security check: only link purchases whose email matches the authenticated user
    const result = await pool.query(
      `UPDATE purchases
       SET user_id = $1
       WHERE stripe_session_id = $2
         AND email_at_purchase = $3
         AND user_id IS NULL
       RETURNING id`,
      [session.user.id, stripeSessionId, session.user.email]
    );

    if (result.rowCount === 0) {
      // Either not found, email mismatch, or already linked
      return NextResponse.json(
        { error: "Purchase not found or email does not match" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, purchaseId: result.rows[0].id });
  } catch (err) {
    console.error("Link purchase error:", err);
    return NextResponse.json(
      { error: "Failed to link purchase" },
      { status: 500 }
    );
  }
}
