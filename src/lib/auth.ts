import NextAuth from "next-auth";
import Resend from "next-auth/providers/resend";
import PostgresAdapter from "@auth/pg-adapter";
import { getPool } from "@/lib/db";

const adapter = process.env.DATABASE_URL
  ? PostgresAdapter(getPool())
  : undefined;

const authSecret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET;

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
  secret: authSecret,
  trustHost: true,
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    async signIn() {
      if (!authSecret) {
        console.error("AUTH_SECRET is not set — sessions will not persist. Generate one with: openssl rand -base64 32");
      }
      return true;
    },
  },
});
