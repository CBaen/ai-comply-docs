import NextAuth from "next-auth";
import Resend from "next-auth/providers/resend";
import PostgresAdapter from "@auth/pg-adapter";
import { getPool } from "@/lib/db";

const adapter = process.env.DATABASE_URL
  ? PostgresAdapter(getPool())
  : undefined;

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter,
  providers: [
    Resend({
      apiKey: process.env.RESEND_API_KEY!,
      from: "noreply@aicompliancedocuments.com",
    }),
  ],
  session: {
    strategy: adapter ? "database" : "jwt",
  },
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  trustHost: true,
  debug: process.env.NODE_ENV === "development",
});
