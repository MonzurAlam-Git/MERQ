// auth.ts
import { db } from "@/lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  adapter: PrismaAdapter(db),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as string;
      return session;
    },

    async signIn({ account }) {
      if (account?.provider === "google") {
        return true;
      }
      return false;
    },
  },

  pages: {
    signIn: "/login",
  },

  logger: {
    error(error) {
      if (error.message.includes("InvalidCheck")) {
        console.error(
          "[Auth] State validation failed, clearing stale auth cookies:",
          error.message,
        );
      } else {
        console.error("[Auth] Error:", error.message);
      }
    },
    warn(code) {
      console.warn("[Auth] Warning:", code);
    },
    debug(code, metadata) {
      if (process.env.NODE_ENV === "development") {
        console.debug("[Auth] Debug:", code, metadata);
      }
    },
  },
});
