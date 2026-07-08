// AI-assisted: Codex helped implement this signup router from the take-home
// requirements for credentials auth and user creation. See PROMPTS.md.
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { publicProcedure, createTRPCRouter } from "~/server/api/trpc";
import { hashPassword } from "~/server/auth/password";
import { users } from "~/server/db/schema";

const usernameSchema = z
  .string()
  .trim()
  .min(3, "Username must be at least 3 characters.")
  .max(32, "Username must be 32 characters or fewer.")
  .regex(
    /^[a-zA-Z0-9_-]+$/,
    "Use only letters, numbers, hyphens, and underscores.",
  )
  .transform((value) => value.toLowerCase());

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters.")
  .max(128, "Password must be 128 characters or fewer.");

export const authRouter = createTRPCRouter({
  signUp: publicProcedure
    .input(
      z.object({
        username: usernameSchema,
        password: passwordSchema,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const existingUser = await ctx.db.query.users.findFirst({
        where: (table, { eq }) => eq(table.username, input.username),
        columns: { id: true },
      });

      if (existingUser) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "That username is already taken.",
        });
      }

      const passwordHash = await hashPassword(input.password);
      const syntheticEmail = `${input.username}@todo.local`;

      const [user] = await ctx.db
        .insert(users)
        .values({
          username: input.username,
          passwordHash,
          name: input.username,
          email: syntheticEmail,
        })
        .returning({
          id: users.id,
          username: users.username,
        });

      if (!user) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Unable to create your account.",
        });
      }

      return user;
    }),
});
