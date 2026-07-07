import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { TodoBoardColumn } from "./todo-board-column";
import { TodoSkeleton } from "./todo-skeleton";
import { BOARD_COLUMNS, type Todo, type TodoStatus } from "./todo-types";

type TodoListCardProps = {
  board: Record<TodoStatus, Todo[]>;
  editingId: number | null;
  editingText: string;
  isDeletingTodo: (todoId: number) => boolean;
  isError: boolean;
  isLoading: boolean;
  isMovingTodo: (todoId: number) => boolean;
  isSavingTodo: (todoId: number) => boolean;
  isTogglingTodo: (todoId: number) => boolean;
  onCancelEdit: () => void;
  onDelete: (todo: Todo) => Promise<void>;
  onEdit: (todo: Todo) => void;
  onMove: (todo: Todo, status: TodoStatus) => Promise<void>;
  onRetry: () => Promise<unknown>;
  onSave: (todo: Todo) => Promise<void>;
  onTextChange: (value: string) => void;
  onToggle: (todo: Todo) => Promise<void>;
  uiMessage: string | null;
};

export function TodoListCard({
  board,
  editingId,
  editingText,
  isDeletingTodo,
  isError,
  isLoading,
  isMovingTodo,
  isSavingTodo,
  isTogglingTodo,
  onCancelEdit,
  onDelete,
  onEdit,
  onMove,
  onRetry,
  onSave,
  onTextChange,
  onToggle,
  uiMessage,
}: TodoListCardProps) {
  const columnTones: Record<TodoStatus, string> = {
    backlog:
      "before:absolute before:inset-x-6 before:top-0 before:h-1 before:rounded-full before:bg-amber-300/80 shadow-[0_24px_60px_rgba(245,158,11,0.10)]",
    in_progress:
      "before:absolute before:inset-x-6 before:top-0 before:h-1 before:rounded-full before:bg-sky-300/80 shadow-[0_24px_60px_rgba(14,165,233,0.10)]",
    completed:
      "before:absolute before:inset-x-6 before:top-0 before:h-1 before:rounded-full before:bg-emerald-300/80 shadow-[0_24px_60px_rgba(16,185,129,0.10)]",
  };

  return (
    <Card className="overflow-hidden border-slate-200 bg-white/95">
      <CardHeader className="gap-4">
        <div className="grid gap-4 xl:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] xl:items-end">
          <div className="max-w-sm">
            <CardDescription className="text-slate-500">
              Board view
            </CardDescription>
            <CardTitle className="text-2xl text-slate-950">
              Your workflow lanes
            </CardTitle>
          </div>
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
        {!isLoading && !isError ? (
          <div className="overflow-x-auto pb-2">
            <div className="grid min-w-[58rem] gap-4 xl:min-w-0 xl:grid-cols-3">
              {BOARD_COLUMNS.map((column) => (
                <TodoBoardColumn
                  key={column.value}
                  description={column.description}
                  editingId={editingId}
                  editingText={editingText}
                  emptyCopy={column.emptyCopy}
                  isDeletingTodo={isDeletingTodo}
                  isMovingTodo={isMovingTodo}
                  isSavingTodo={isSavingTodo}
                  isTogglingTodo={isTogglingTodo}
                  onCancelEdit={onCancelEdit}
                  onDelete={onDelete}
                  onEdit={onEdit}
                  onMove={onMove}
                  onSave={onSave}
                  onTextChange={onTextChange}
                  onToggle={onToggle}
                  title={column.title}
                  tone={columnTones[column.value]}
                  todos={board[column.value]}
                />
              ))}
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
