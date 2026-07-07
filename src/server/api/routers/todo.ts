import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { todos } from "~/server/db/schema";

const todoIdSchema = z.number().int().positive();
const todoTextSchema = z
  .string()
  .trim()
  .min(1, "Todo text cannot be empty.")
  .max(280, "Todo text must be 280 characters or fewer.");

export const todoRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.query.todos.findMany({
      where: (table, { eq }) => eq(table.userId, ctx.session.user.id),
      orderBy: (table, { desc }) => [desc(table.createdAt)],
    });
  }),

  create: protectedProcedure
    .input(z.object({ text: todoTextSchema }))
    .mutation(async ({ ctx, input }) => {
      const [todo] = await ctx.db
        .insert(todos)
        .values({
          userId: ctx.session.user.id,
          text: input.text,
        })
        .returning();

      if (!todo) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Unable to create todo.",
        });
      }

      return todo;
    }),

  updateText: protectedProcedure
    .input(
      z.object({
        id: todoIdSchema,
        text: todoTextSchema,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const [todo] = await ctx.db
        .update(todos)
        .set({
          text: input.text,
          updatedAt: new Date(),
        })
        .where(
          and(eq(todos.id, input.id), eq(todos.userId, ctx.session.user.id)),
        )
        .returning();

      if (!todo) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Todo not found.",
        });
      }

      return todo;
    }),

  toggleComplete: protectedProcedure
    .input(
      z.object({
        id: todoIdSchema,
        isCompleted: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const [todo] = await ctx.db
        .update(todos)
        .set({
          isCompleted: input.isCompleted,
          updatedAt: new Date(),
        })
        .where(
          and(eq(todos.id, input.id), eq(todos.userId, ctx.session.user.id)),
        )
        .returning();

      if (!todo) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Todo not found.",
        });
      }

      return todo;
    }),

  delete: protectedProcedure
    .input(z.object({ id: todoIdSchema }))
    .mutation(async ({ ctx, input }) => {
      const [todo] = await ctx.db
        .delete(todos)
        .where(
          and(eq(todos.id, input.id), eq(todos.userId, ctx.session.user.id)),
        )
        .returning({ id: todos.id });

      if (!todo) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Todo not found.",
        });
      }

      return { success: true };
    }),
});
