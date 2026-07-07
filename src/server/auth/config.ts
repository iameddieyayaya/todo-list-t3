import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import { type JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";

import { db } from "~/server/db";
import {
  accounts,
  sessions,
  users,
  verificationTokens,
} from "~/server/db/schema";
import { authorizeWithCredentials } from "./credentials.ts";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      username: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    username?: string;
  }
}

type AuthUser = {
  id: string;
  username?: string | null;
};

function isAuthUser(user: unknown): user is AuthUser {
  return (
    typeof user === "object" &&
    user !== null &&
    "id" in user &&
    typeof user.id === "string"
  );
}

function getSessionUsername(token: JWT) {
  return token.username ?? "";
}

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
      if (isAuthUser(user)) {
        token.sub = user.id;
        token.username = user.username ?? undefined;
      }

      return token;
    },
    session: ({ session, token }) => {
      const username = getSessionUsername(token);

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
