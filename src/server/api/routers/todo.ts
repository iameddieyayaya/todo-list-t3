import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import type * as DatabaseModule from "~/server/db";
import { todos } from "~/server/db/schema";
import { todoIdSchema, todoTextSchema } from "./todo-input.ts";
import {
  createTodo,
  deleteTodo,
  toggleTodoComplete,
  type TodoRepository,
  updateTodoText,
} from "./todo-service.ts";

type Database = typeof DatabaseModule.db;

const createTodoRepository = (
  db: Database,
): TodoRepository => ({
  create: async ({ userId, text }) => {
    const [todo] = await db
      .insert(todos)
      .values({
        userId,
        text,
      })
      .returning();

    return todo;
  },
  updateText: async ({ id, userId, text, updatedAt }) => {
    const [todo] = await db
      .update(todos)
      .set({
        text,
        updatedAt,
      })
      .where(and(eq(todos.id, id), eq(todos.userId, userId)))
      .returning();

    return todo;
  },
  toggleComplete: async ({ id, userId, isCompleted, updatedAt }) => {
    const [todo] = await db
      .update(todos)
      .set({
        isCompleted,
        updatedAt,
      })
      .where(and(eq(todos.id, id), eq(todos.userId, userId)))
      .returning();

    return todo;
  },
  delete: async ({ id, userId }) => {
    const [todo] = await db
      .delete(todos)
      .where(and(eq(todos.id, id), eq(todos.userId, userId)))
      .returning({ id: todos.id });

    return todo;
  },
});

export const todoRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.query.todos.findMany({
      where: (table, { eq }) => eq(table.userId, ctx.session.user.id),
      orderBy: (table, { asc }) => [asc(table.createdAt)],
    });
  }),

  create: protectedProcedure
    .input(z.object({ text: todoTextSchema }))
    .mutation(async ({ ctx, input }) => {
      return createTodo(createTodoRepository(ctx.db), {
        userId: ctx.session.user.id,
        text: input.text,
      });
    }),

  updateText: protectedProcedure
    .input(
      z.object({
        id: todoIdSchema,
        text: todoTextSchema,
      }),
    )
    .mutation(async ({ ctx, input }) =>
      updateTodoText(createTodoRepository(ctx.db), {
        id: input.id,
        userId: ctx.session.user.id,
        text: input.text,
      }),
    ),

  toggleComplete: protectedProcedure
    .input(
      z.object({
        id: todoIdSchema,
        isCompleted: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) =>
      toggleTodoComplete(createTodoRepository(ctx.db), {
        id: input.id,
        userId: ctx.session.user.id,
        isCompleted: input.isCompleted,
      }),
    ),

  delete: protectedProcedure
    .input(z.object({ id: todoIdSchema }))
    .mutation(async ({ ctx, input }) =>
      deleteTodo(createTodoRepository(ctx.db), {
        id: input.id,
        userId: ctx.session.user.id,
      }),
    ),
});
