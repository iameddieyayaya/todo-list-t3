import { cn } from "~/lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { TodoStatusActions } from "./todo-status-actions";
import {
  dateFormatter,
  type Todo,
  type TodoStatus,
} from "./todo-types";

type TodoItemProps = {
  editingId: number | null;
  editingText: string;
  isDeleting: boolean;
  isMoving: boolean;
  isSaving: boolean;
  isToggling: boolean;
  onCancel: () => void;
  onDelete: (todo: Todo) => Promise<void>;
  onEdit: (todo: Todo) => void;
  onMove: (todo: Todo, status: TodoStatus) => Promise<void>;
  onSave: (todo: Todo) => Promise<void>;
  onTextChange: (value: string) => void;
  onToggle: (todo: Todo) => Promise<void>;
  todo: Todo;
};

export function TodoItem({
  editingId,
  editingText,
  isDeleting,
  isMoving,
  isSaving,
  isToggling,
  onCancel,
  onDelete,
  onEdit,
  onMove,
  onSave,
  onTextChange,
  onToggle,
  todo,
}: TodoItemProps) {
  const isEditing = editingId === todo.id;
  const createdAt = new Date(todo.createdAt);
  const cardTone = {
    backlog:
      "border-amber-200/80 bg-[linear-gradient(180deg,rgba(255,251,235,0.98),rgba(255,247,237,0.94))]",
    in_progress:
      "border-sky-200/80 bg-[linear-gradient(180deg,rgba(240,249,255,0.98),rgba(239,246,255,0.94))]",
    completed:
      "border-emerald-200/80 bg-[linear-gradient(180deg,rgba(236,253,245,0.98),rgba(240,253,250,0.94))]",
  }[todo.status];

  return (
    <li
      className={cn(
        "rounded-[1.75rem] border p-5 shadow-[0_12px_32px_rgba(15,23,42,0.08)]",
        cardTone,
      )}
    >
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <button
            aria-label={
              todo.isCompleted ? "Mark todo active" : "Mark todo completed"
            }
            className={cn(
              "mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition",
              todo.isCompleted
                ? "border-[var(--accent-strong)] bg-[var(--accent-strong)] text-white"
                : "border-slate-300 bg-white text-transparent hover:border-slate-500",
            )}
            disabled={isToggling || isMoving}
            onClick={() => void onToggle(todo)}
            type="button"
          >
            ✓
          </button>
          {isEditing ? (
            <div className="min-w-0 flex-1 space-y-3">
              <Input
                aria-label="Edit todo"
                autoFocus
                onChange={(event) => onTextChange(event.target.value)}
                value={editingText}
              />
              <div className="flex flex-wrap gap-2">
                <Button
                  disabled={isSaving || isMoving}
                  onClick={() => void onSave(todo)}
                  variant="primary"
                >
                  Save
                </Button>
                <Button onClick={onCancel} variant="ghost">
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="min-w-0 flex-1 space-y-3">
              <p
                className={cn(
                  "text-lg leading-7 text-slate-900",
                  todo.isCompleted && "text-slate-400 line-through decoration-2",
                )}
              >
                {todo.text}
              </p>
              <div className="flex flex-wrap items-center gap-2 text-[11px] tracking-[0.22em] text-slate-500 uppercase">
                <span>Created {dateFormatter.format(createdAt)}</span>
              </div>
            </div>
          )}
        </div>
        {!isEditing ? (
          <div className="space-y-3 border-t border-slate-100 pt-4">
            <TodoStatusActions
              isPending={isMoving}
              onMove={(status) => void onMove(todo, status)}
              status={todo.status}
            />
            <div className="grid grid-cols-2 gap-2">
              <Button
                className="h-10 rounded-xl"
                onClick={() => onEdit(todo)}
                variant="secondary"
              >
                Edit
              </Button>
              <Button
                className="h-10 rounded-xl"
                disabled={isDeleting}
                onClick={() => void onDelete(todo)}
                variant="danger"
              >
                Delete
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </li>
  );
}
