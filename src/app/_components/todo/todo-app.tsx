"use client";

import { type SyntheticEvent, useState } from "react";
import { signOut } from "next-auth/react";

import { api } from "~/trpc/react";
import { TodoCreateCard } from "./todo-create-card";
import { TodoListCard } from "./todo-list-card";
import { TodoOverview } from "./todo-overview";
import { type Todo, type TodoStatus } from "./todo-types";

export function TodoApp({ username }: { username: string }) {
  const utils = api.useUtils();
  const [newTodoText, setNewTodoText] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");
  const [uiMessage, setUiMessage] = useState<string | null>(null);

  const todosQuery = api.todo.getAll.useQuery();
  const createTodo = api.todo.create.useMutation({
    onSuccess: async () => {
      setNewTodoText("");
      await utils.todo.getAll.invalidate();
    },
  });
  const updateTodo = api.todo.updateText.useMutation({
    onSuccess: async () => {
      setEditingId(null);
      setEditingText("");
      await utils.todo.getAll.invalidate();
    },
  });
  const updateTodoStatus = api.todo.updateStatus.useMutation({
    onSuccess: async () => {
      await utils.todo.getAll.invalidate();
    },
  });
  const toggleTodo = api.todo.toggleComplete.useMutation({
    onSuccess: async () => {
      await utils.todo.getAll.invalidate();
    },
  });
  const deleteTodo = api.todo.delete.useMutation({
    onSuccess: async () => {
      await utils.todo.getAll.invalidate();
    },
  });

  const todos = todosQuery.data ?? [];
  const board = {
    backlog: todos.filter((todo) => todo.status === "backlog"),
    in_progress: todos.filter((todo) => todo.status === "in_progress"),
    completed: todos.filter((todo) => todo.status === "completed"),
  } satisfies Record<TodoStatus, Todo[]>;

  async function handleCreateTodo(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setUiMessage(null);

    try {
      await createTodo.mutateAsync({ text: newTodoText });
    } catch (error) {
      setUiMessage(
        error instanceof Error ? error.message : "Unable to create todo.",
      );
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
      setUiMessage(
        error instanceof Error ? error.message : "Unable to save todo.",
      );
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
      setUiMessage(
        error instanceof Error ? error.message : "Unable to move todo.",
      );
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
      setUiMessage(
        error instanceof Error ? error.message : "Unable to update todo.",
      );
    }
  }

  async function handleDelete(todo: Todo) {
    setUiMessage(null);

    try {
      await deleteTodo.mutateAsync({ id: todo.id });
    } catch (error) {
      setUiMessage(
        error instanceof Error ? error.message : "Unable to delete todo.",
      );
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
          isDeletingTodo={(todoId) =>
            deleteTodo.isPending &&
            isMutationTarget(deleteTodo.variables?.id, todoId)
          }
          isError={todosQuery.isError}
          isLoading={todosQuery.isLoading}
          isMovingTodo={(todoId) =>
            updateTodoStatus.isPending &&
            isMutationTarget(updateTodoStatus.variables?.id, todoId)
          }
          isSavingTodo={(todoId) =>
            updateTodo.isPending &&
            isMutationTarget(updateTodo.variables?.id, todoId)
          }
          isTogglingTodo={(todoId) =>
            (toggleTodo.isPending &&
              isMutationTarget(toggleTodo.variables?.id, todoId)) ||
            (updateTodoStatus.isPending &&
              isMutationTarget(updateTodoStatus.variables?.id, todoId))
          }
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
