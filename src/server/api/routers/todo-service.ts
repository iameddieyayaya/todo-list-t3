import { TRPCError } from "@trpc/server";
import type * as Schema from "../../db/schema.ts";

export type TodoRecord = typeof Schema.todos.$inferSelect;

type TodoCreateInput = Pick<TodoRecord, "userId" | "text">;
type TodoUpdateTextInput = Pick<TodoRecord, "id" | "userId" | "text"> & {
  updatedAt: Date;
};
type TodoToggleCompleteInput = Pick<
  TodoRecord,
  "id" | "userId" | "isCompleted"
> & {
  updatedAt: Date;
};
type TodoDeleteInput = Pick<TodoRecord, "id" | "userId">;

export type TodoRepository = {
  create: (input: TodoCreateInput) => Promise<TodoRecord | undefined>;
  updateText: (input: TodoUpdateTextInput) => Promise<TodoRecord | undefined>;
  toggleComplete: (
    input: TodoToggleCompleteInput,
  ) => Promise<TodoRecord | undefined>;
  delete: (input: TodoDeleteInput) => Promise<{ id: number } | undefined>;
};

export async function createTodo(
  repository: TodoRepository,
  input: TodoCreateInput,
) {
  const todo = await repository.create(input);

  if (!todo) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Unable to create todo.",
    });
  }

  return todo;
}

export async function updateTodoText(
  repository: TodoRepository,
  input: Omit<TodoUpdateTextInput, "updatedAt">,
) {
  const todo = await repository.updateText({
    ...input,
    updatedAt: new Date(),
  });

  if (!todo) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Todo not found.",
    });
  }

  return todo;
}

export async function toggleTodoComplete(
  repository: TodoRepository,
  input: Omit<TodoToggleCompleteInput, "updatedAt">,
) {
  const todo = await repository.toggleComplete({
    ...input,
    updatedAt: new Date(),
  });

  if (!todo) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Todo not found.",
    });
  }

  return todo;
}

export async function deleteTodo(
  repository: TodoRepository,
  input: TodoDeleteInput,
) {
  const todo = await repository.delete(input);

  if (!todo) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Todo not found.",
    });
  }

  return { success: true as const };
}
