import NextAuth from "next-auth";
import Resend from "next-auth/providers/resend";
import PostgresAdapter from "@auth/pg-adapter";
import { getPool } from "@/lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PostgresAdapter(getPool()),
  providers: [
    Resend({
      apiKey: process.env.RESEND_API_KEY,
      from: "noreply@aicompliancedocuments.com",
    }),
  ],
  session: {
    strategy: "database",
  },
});
