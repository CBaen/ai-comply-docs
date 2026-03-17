import { NextResponse } from "next/server";

export async function GET() {
  const checks: Record<string, string> = {};

  // List all env var NAMES that contain relevant keywords (no values for security)
  const allKeys = Object.keys(process.env).sort();
  checks.all_env_var_names = allKeys.filter(k =>
    /AUTH|SECRET|NEXT|DATABASE|STRIPE|RESEND|GA_|POSTGRES|NEON/i.test(k)
  ).join(", ");

  // Check specific vars
  checks.AUTH_SECRET = process.env.AUTH_SECRET ? "SET" : "MISSING";
  checks.NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET ? "SET" : "MISSING";
  checks.DATABASE_URL = process.env.DATABASE_URL ? "SET" : "MISSING";
  checks.RESEND_API_KEY = process.env.RESEND_API_KEY ? "SET" : "MISSING";
  checks.NEXTAUTH_URL = process.env.NEXTAUTH_URL || "MISSING";

  // Try to import and init auth
  try {
    const { auth } = await import("@/lib/auth");
    checks.auth_import = "OK";

    try {
      const session = await auth();
      checks.auth_call = "OK — session: " + (session ? "exists" : "null");
    } catch (err) {
      checks.auth_call = "FAILED: " + (err instanceof Error ? err.message : String(err));
    }
  } catch (err) {
    checks.auth_import = "FAILED: " + (err instanceof Error ? err.message : String(err));
  }

  return NextResponse.json(checks);
}
