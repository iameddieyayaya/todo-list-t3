import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { TodoFilterTabs } from "./todo-filter-tabs";
import { TodoItem } from "./todo-item";
import { TodoSkeleton } from "./todo-skeleton";
import { type Filter, type Todo } from "./todo-types";

type TodoListCardProps = {
  editingId: number | null;
  editingText: string;
  filter: Filter;
  filteredTodos: Todo[];
  isDeletingTodo: (todoId: number) => boolean;
  isError: boolean;
  isLoading: boolean;
  isSavingTodo: (todoId: number) => boolean;
  isTogglingTodo: (todoId: number) => boolean;
  onCancelEdit: () => void;
  onDelete: (todo: Todo) => Promise<void>;
  onEdit: (todo: Todo) => void;
  onFilterChange: (filter: Filter) => void;
  onRetry: () => Promise<unknown>;
  onSave: (todo: Todo) => Promise<void>;
  onTextChange: (value: string) => void;
  onToggle: (todo: Todo) => Promise<void>;
  totalCount: number;
  uiMessage: string | null;
};

function EmptyState({ totalCount }: { totalCount: number }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
      <p className="font-[family-name:var(--font-display)] text-3xl font-semibold text-slate-950">
        {totalCount === 0 ? "Your list is empty." : "Nothing in this filter."}
      </p>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        {totalCount === 0
          ? "Start with one task you can finish today."
          : "Switch filters or add a new task to keep momentum."}
      </p>
    </div>
  );
}

export function TodoListCard({
  editingId,
  editingText,
  filter,
  filteredTodos,
  isDeletingTodo,
  isError,
  isLoading,
  isSavingTodo,
  isTogglingTodo,
  onCancelEdit,
  onDelete,
  onEdit,
  onFilterChange,
  onRetry,
  onSave,
  onTextChange,
  onToggle,
  totalCount,
  uiMessage,
}: TodoListCardProps) {
  return (
    <Card className="border-slate-200 bg-white/95">
      <CardHeader className="gap-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardDescription className="text-slate-500">Queue</CardDescription>
            <CardTitle className="text-2xl text-slate-950">
              Your checklist
            </CardTitle>
          </div>
          <TodoFilterTabs filter={filter} onFilterChange={onFilterChange} />
        </div>
        {uiMessage ? (
          <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {uiMessage}
          </p>
        ) : null}
      </CardHeader>
      <CardContent>
        {isLoading ? <TodoSkeleton /> : null}
        {isError ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
            <p className="text-sm text-red-700">
              We couldn&apos;t load your todos right now.
            </p>
            <Button
              className="mt-4"
              onClick={() => void onRetry()}
              variant="secondary"
            >
              Retry
            </Button>
          </div>
        ) : null}
        {!isLoading && !isError && filteredTodos.length === 0 ? (
          <EmptyState totalCount={totalCount} />
        ) : null}
        {!isLoading && !isError && filteredTodos.length > 0 ? (
          <ul className="space-y-3">
            {filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                editingId={editingId}
                editingText={editingText}
                isDeleting={isDeletingTodo(todo.id)}
                isSaving={isSavingTodo(todo.id)}
                isToggling={isTogglingTodo(todo.id)}
                onCancel={onCancelEdit}
                onDelete={onDelete}
                onEdit={onEdit}
                onSave={onSave}
                onTextChange={onTextChange}
                onToggle={onToggle}
                todo={todo}
              />
            ))}
          </ul>
        ) : null}
      </CardContent>
    </Card>
  );
}
