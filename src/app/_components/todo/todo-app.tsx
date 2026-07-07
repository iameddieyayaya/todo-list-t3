"use client";

import { type SyntheticEvent, useMemo, useState } from "react";
import { signOut } from "next-auth/react";

import { api } from "~/trpc/react";
import { TodoCreateCard } from "./todo-create-card";
import { TodoListCard } from "./todo-list-card";
import { TodoOverview } from "./todo-overview";
import { type Filter, type Todo } from "./todo-types";

export function TodoApp({ username }: { username: string }) {
  const utils = api.useUtils();
  const [filter, setFilter] = useState<Filter>("all");
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

  const filteredTodos = useMemo(() => {
    const todos = todosQuery.data ?? [];

    if (filter === "active") {
      return todos.filter((todo) => !todo.isCompleted);
    }

    if (filter === "completed") {
      return todos.filter((todo) => todo.isCompleted);
    }

    return todos;
  }, [filter, todosQuery.data]);

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

  async function handleToggle(todo: Todo) {
    setUiMessage(null);

    try {
      await toggleTodo.mutateAsync({
        id: todo.id,
        isCompleted: !todo.isCompleted,
      });
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

  const totalCount = todosQuery.data?.length ?? 0;
  const completedCount =
    todosQuery.data?.filter((todo) => todo.isCompleted).length ?? 0;

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <TodoOverview
        completedCount={completedCount}
        onLogout={handleLogout}
        totalCount={totalCount}
        username={username}
      />

      <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <TodoCreateCard
          isPending={createTodo.isPending}
          newTodoText={newTodoText}
          onChange={setNewTodoText}
          onSubmit={handleCreateTodo}
        />
        <TodoListCard
          editingId={editingId}
          editingText={editingText}
          filter={filter}
          filteredTodos={filteredTodos}
          isDeletingTodo={(todoId) =>
            deleteTodo.isPending &&
            isMutationTarget(deleteTodo.variables?.id, todoId)
          }
          isError={todosQuery.isError}
          isLoading={todosQuery.isLoading}
          isSavingTodo={(todoId) =>
            updateTodo.isPending &&
            isMutationTarget(updateTodo.variables?.id, todoId)
          }
          isTogglingTodo={(todoId) =>
            toggleTodo.isPending &&
            isMutationTarget(toggleTodo.variables?.id, todoId)
          }
          onCancelEdit={clearEditingState}
          onDelete={handleDelete}
          onEdit={startEditing}
          onFilterChange={setFilter}
          onRetry={todosQuery.refetch}
          onSave={handleSave}
          onTextChange={setEditingText}
          onToggle={handleToggle}
          totalCount={totalCount}
          uiMessage={uiMessage}
        />
      </section>
    </div>
  );
}
