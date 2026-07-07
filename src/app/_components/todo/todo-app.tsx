"use client";

import { type SyntheticEvent, useState } from "react";
import { signOut } from "next-auth/react";

import { api } from "~/trpc/react";
import { TodoCreateCard } from "./todo-create-card";
import { TodoListCard } from "./todo-list-card";
import { TodoOverview } from "./todo-overview";
import { type Todo, type TodoBoard, type TodoStatus } from "./todo-types";

type TodoAppProps = {
  username: string;
};

function createTodoBoard(todos: Todo[]): TodoBoard {
  return {
    backlog: todos.filter((todo) => todo.status === "backlog"),
    in_progress: todos.filter((todo) => todo.status === "in_progress"),
    completed: todos.filter((todo) => todo.status === "completed"),
  };
}

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export function TodoApp({ username }: TodoAppProps) {
  const utils = api.useUtils();
  const [newTodoText, setNewTodoText] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");
  const [uiMessage, setUiMessage] = useState<string | null>(null);

  async function invalidateTodos() {
    await utils.todo.getAll.invalidate();
  }

  const todosQuery = api.todo.getAll.useQuery();
  const createTodo = api.todo.create.useMutation({
    onSuccess: async () => {
      setNewTodoText("");
      await invalidateTodos();
    },
  });
  const updateTodo = api.todo.updateText.useMutation({
    onSuccess: async () => {
      setEditingId(null);
      setEditingText("");
      await invalidateTodos();
    },
  });
  const updateTodoStatus = api.todo.updateStatus.useMutation({
    onSuccess: invalidateTodos,
  });
  const toggleTodo = api.todo.toggleComplete.useMutation({
    onSuccess: invalidateTodos,
  });
  const deleteTodo = api.todo.delete.useMutation({
    onSuccess: invalidateTodos,
  });

  const todos = todosQuery.data ?? [];
  const board = createTodoBoard(todos);

  async function handleCreateTodo(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setUiMessage(null);

    try {
      await createTodo.mutateAsync({ text: newTodoText });
    } catch (error) {
      setUiMessage(getErrorMessage(error, "Unable to create todo."));
    }
  }

  async function handleSave(todo: Todo) {
    setUiMessage(null);

    try {
      await updateTodo.mutateAsync({
        id: todo.id,
        text: editingText,
      });
    } catch (error) {
      setUiMessage(getErrorMessage(error, "Unable to save todo."));
    }
  }

  async function handleMove(todo: Todo, status: TodoStatus) {
    setUiMessage(null);

    try {
      await updateTodoStatus.mutateAsync({
        id: todo.id,
        status,
      });
    } catch (error) {
      setUiMessage(getErrorMessage(error, "Unable to move todo."));
    }
  }

  async function handleToggle(todo: Todo) {
    setUiMessage(null);

    try {
      if (todo.status === "completed") {
        await updateTodoStatus.mutateAsync({
          id: todo.id,
          status: "in_progress",
        });
      } else {
        await toggleTodo.mutateAsync({
          id: todo.id,
          isCompleted: true,
        });
      }
    } catch (error) {
      setUiMessage(getErrorMessage(error, "Unable to update todo."));
    }
  }

  async function handleDelete(todo: Todo) {
    setUiMessage(null);

    try {
      await deleteTodo.mutateAsync({ id: todo.id });
    } catch (error) {
      setUiMessage(getErrorMessage(error, "Unable to delete todo."));
    }
  }

  async function handleLogout() {
    await signOut({ callbackUrl: "/" });
  }

  function clearEditingState() {
    setEditingId(null);
    setEditingText("");
  }

  function startEditing(todo: Todo) {
    setEditingId(todo.id);
    setEditingText(todo.text);
  }

  function isMutationTarget(mutationId: number | undefined, todoId: number) {
    return mutationId === todoId;
  }

  const isSavingTodo = (todoId: number) =>
    updateTodo.isPending && isMutationTarget(updateTodo.variables?.id, todoId);
  const isMovingTodo = (todoId: number) =>
    updateTodoStatus.isPending &&
    isMutationTarget(updateTodoStatus.variables?.id, todoId);
  const isDeletingTodo = (todoId: number) =>
    deleteTodo.isPending && isMutationTarget(deleteTodo.variables?.id, todoId);
  const isTogglingTodo = (todoId: number) =>
    (toggleTodo.isPending && isMutationTarget(toggleTodo.variables?.id, todoId)) ||
    (updateTodoStatus.isPending &&
      isMutationTarget(updateTodoStatus.variables?.id, todoId));

  const totalCount = todos.length;
  const backlogCount = board.backlog.length;
  const inProgressCount = board.in_progress.length;
  const completedCount = board.completed.length;

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <TodoOverview
        backlogCount={backlogCount}
        completedCount={completedCount}
        inProgressCount={inProgressCount}
        onLogout={handleLogout}
        totalCount={totalCount}
        username={username}
      />

      <section className="grid gap-6 xl:grid-cols-[22rem_minmax(0,1fr)] xl:items-start">
        <TodoCreateCard
          isPending={createTodo.isPending}
          newTodoText={newTodoText}
          onChange={setNewTodoText}
          onSubmit={handleCreateTodo}
        />
        <TodoListCard
          board={board}
          editingId={editingId}
          editingText={editingText}
          isDeletingTodo={isDeletingTodo}
          isError={todosQuery.isError}
          isLoading={todosQuery.isLoading}
          isMovingTodo={isMovingTodo}
          isSavingTodo={isSavingTodo}
          isTogglingTodo={isTogglingTodo}
          onCancelEdit={clearEditingState}
          onDelete={handleDelete}
          onEdit={startEditing}
          onMove={handleMove}
          onRetry={todosQuery.refetch}
          onSave={handleSave}
          onTextChange={setEditingText}
          onToggle={handleToggle}
          uiMessage={uiMessage}
        />
      </section>
    </div>
  );
}
