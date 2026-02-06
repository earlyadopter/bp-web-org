import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import EmailProvider from "next-auth/providers/email";
import { getDb } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { sendMagicLink } from "@/lib/email";

export const { handlers, auth, signIn, signOut } = NextAuth(() => {
  const db = getDb();
  return {
    adapter: DrizzleAdapter(db),
    providers: [
      EmailProvider({
        server: { host: "stub", port: 587, auth: { user: "stub", pass: "stub" } },
        from: "noreply@borderlesspress.org",
        sendVerificationRequest: async ({ identifier: email, url }) => {
          await sendMagicLink(email, url);
        },
      }),
    ],
    pages: {
      signIn: "/admin/login",
      verifyRequest: "/admin/check-email",
    },
    callbacks: {
      async signIn({ user }) {
        if (!user.email) return false;

        const dbUser = await db
          .select()
          .from(users)
          .where(eq(users.email, user.email))
          .limit(1);

        if (dbUser.length === 0 || dbUser[0].role !== "admin") {
          return false;
        }

        return true;
      },
      async session({ session, user }) {
        const dbUser = await db
          .select()
          .from(users)
          .where(eq(users.id, user.id))
          .limit(1);

        if (dbUser.length > 0) {
          session.user.role = dbUser[0].role;
        }

        return session;
      },
    },
  };
});
