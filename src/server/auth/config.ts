import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { db } from "~/server/db";
import {
  accounts,
  sessions,
  users,
  verificationTokens,
} from "~/server/db/schema";
import { authorizeWithCredentials } from "./credentials.ts";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      username: string;
    } & DefaultSession["user"];
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        return authorizeWithCredentials(credentials, {
          findUserByUsername: (username) =>
            db.query.users.findFirst({
              where: (table, { eq }) => eq(table.username, username),
            }),
        });
      },
    }),
  ],
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        const authUser = user as typeof user & {
          id: string;
          username?: string;
        };

        token.sub = authUser.id;
        if (authUser.username) {
          token.username = authUser.username;
        }
      }

      return token;
    },
    session: ({ session, token }) => {
      const username =
        typeof (token as { username?: unknown }).username === "string"
          ? ((token as { username?: string }).username ?? "")
          : "";

      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub ?? "",
          username,
          name: (session.user?.name ?? username) || null,
        },
      };
    },
  },
} satisfies NextAuthConfig;
