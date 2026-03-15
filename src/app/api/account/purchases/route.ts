import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getPool } from "@/lib/db";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const pool = getPool();
    const result = await pool.query(
      `SELECT
         id,
         stripe_session_id,
         regulation_slug,
         amount_paid,
         created_at,
         form_data
       FROM purchases
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [session.user.id]
    );

    return NextResponse.json(result.rows);
  } catch (err) {
    console.error("Purchases fetch error:", err);
    return NextResponse.json(
      { error: "Failed to fetch purchases" },
      { status: 500 }
    );
  }
}
