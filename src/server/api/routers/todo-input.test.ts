import assert from "node:assert/strict";
import test from "node:test";
import { TRPCError } from "@trpc/server";

import { todoIdSchema, todoTextSchema } from "./todo-input.ts";
import {
  createTodo,
  deleteTodo,
  toggleTodoComplete,
  type TodoRecord,
  type TodoRepository,
  updateTodoText,
} from "./todo-service.ts";

const baseTodo: TodoRecord = {
  id: 1,
  userId: "user_123",
  text: "Buy groceries",
  isCompleted: false,
  createdAt: new Date("2026-01-01T00:00:00.000Z"),
  updatedAt: new Date("2026-01-01T00:00:00.000Z"),
};

function createRepository(
  overrides: Partial<TodoRepository> = {},
): TodoRepository {
  return {
    create: async () => baseTodo,
    updateText: async () => baseTodo,
    toggleComplete: async () => baseTodo,
    delete: async () => ({ id: baseTodo.id }),
    ...overrides,
  };
}

void test("todoTextSchema trims surrounding whitespace", () => {
  const result = todoTextSchema.parse("  Buy groceries  ");

  assert.equal(result, "Buy groceries");
});

void test("todoTextSchema rejects empty todo text after trimming", () => {
  const result = todoTextSchema.safeParse("   ");

  assert.equal(result.success, false);
});

void test("todoTextSchema rejects todo text longer than 280 characters", () => {
  const result = todoTextSchema.safeParse("a".repeat(281));

  assert.equal(result.success, false);
});

void test("todoIdSchema accepts positive integer ids only", () => {
  assert.equal(todoIdSchema.parse(42), 42);
  assert.equal(todoIdSchema.safeParse(0).success, false);
  assert.equal(todoIdSchema.safeParse(-1).success, false);
  assert.equal(todoIdSchema.safeParse(1.5).success, false);
});

void test("createTodo creates a todo for the authenticated user", async () => {
  let receivedInput:
    | {
        text: string;
        userId: string;
      }
    | undefined;

  const todo = await createTodo(
    createRepository({
      create: async (input) => {
        receivedInput = input;
        return { ...baseTodo, text: input.text, userId: input.userId };
      },
    }),
    {
      text: "Write tests",
      userId: "user_456",
    },
  );

  assert.deepEqual(receivedInput, {
    text: "Write tests",
    userId: "user_456",
  });
  assert.equal(todo.text, "Write tests");
  assert.equal(todo.userId, "user_456");
});

void test("updateTodoText edits an existing todo", async () => {
  let receivedInput:
    | {
        id: number;
        text: string;
        updatedAt: Date;
        userId: string;
      }
    | undefined;

  const todo = await updateTodoText(
    createRepository({
      updateText: async (input) => {
        receivedInput = input;
        return { ...baseTodo, text: input.text, updatedAt: input.updatedAt };
      },
    }),
    {
      id: 1,
      text: "Write more tests",
      userId: "user_123",
    },
  );

  assert.equal(todo.text, "Write more tests");
  assert.ok(receivedInput?.updatedAt instanceof Date);
  assert.equal(receivedInput?.id, 1);
  assert.equal(receivedInput?.userId, "user_123");
});

void test("toggleTodoComplete marks a todo complete", async () => {
  let receivedInput:
    | {
        id: number;
        isCompleted: boolean;
        updatedAt: Date;
        userId: string;
      }
    | undefined;

  const todo = await toggleTodoComplete(
    createRepository({
      toggleComplete: async (input) => {
        receivedInput = input;
        return {
          ...baseTodo,
          isCompleted: input.isCompleted,
          updatedAt: input.updatedAt,
        };
      },
    }),
    {
      id: 1,
      isCompleted: true,
      userId: "user_123",
    },
  );

  assert.equal(todo.isCompleted, true);
  assert.ok(receivedInput?.updatedAt instanceof Date);
  assert.equal(receivedInput?.isCompleted, true);
});

void test("deleteTodo deletes an existing todo", async () => {
  let receivedInput:
    | {
        id: number;
        userId: string;
      }
    | undefined;

  const result = await deleteTodo(
    createRepository({
      delete: async (input) => {
        receivedInput = input;
        return { id: input.id };
      },
    }),
    {
      id: 1,
      userId: "user_123",
    },
  );

  assert.deepEqual(receivedInput, {
    id: 1,
    userId: "user_123",
  });
  assert.deepEqual(result, { success: true });
});

void test("updateTodoText throws when the todo does not exist", async () => {
  await assert.rejects(
    updateTodoText(
      createRepository({
        updateText: async () => undefined,
      }),
      {
        id: 999,
        text: "Missing todo",
        userId: "user_123",
      },
    ),
    (error: unknown) =>
      error instanceof TRPCError && error.code === "NOT_FOUND",
  );
});
