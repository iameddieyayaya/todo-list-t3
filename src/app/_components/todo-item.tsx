import { cn } from "~/lib/utils";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { dateFormatter, type Todo } from "./todo-types";

type TodoItemProps = {
  editingId: number | null;
  editingText: string;
  isDeleting: boolean;
  isSaving: boolean;
  isToggling: boolean;
  onCancel: () => void;
  onDelete: (todo: Todo) => Promise<void>;
  onEdit: (todo: Todo) => void;
  onSave: (todo: Todo) => Promise<void>;
  onTextChange: (value: string) => void;
  onToggle: (todo: Todo) => Promise<void>;
  todo: Todo;
};

export function TodoItem({
  editingId,
  editingText,
  isDeleting,
  isSaving,
  isToggling,
  onCancel,
  onDelete,
  onEdit,
  onSave,
  onTextChange,
  onToggle,
  todo,
}: TodoItemProps) {
  const isEditing = editingId === todo.id;
  const createdAt = new Date(todo.createdAt);

  return (
    <li className="rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-start">
        <button
          aria-label={
            todo.isCompleted ? "Mark todo active" : "Mark todo completed"
          }
          className={cn(
            "mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition",
            todo.isCompleted
              ? "border-[var(--accent-strong)] bg-[var(--accent-strong)] text-white"
              : "border-slate-300 bg-white text-transparent hover:border-[var(--accent)]",
          )}
          disabled={isToggling}
          onClick={() => void onToggle(todo)}
          type="button"
        >
          ✓
        </button>
        <div className="flex-1 space-y-3">
          {isEditing ? (
            <div className="space-y-3">
              <Input
                aria-label="Edit todo"
                autoFocus
                onChange={(event) => onTextChange(event.target.value)}
                value={editingText}
              />
              <div className="flex flex-wrap gap-2">
                <Button
                  disabled={isSaving}
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
            <div className="space-y-2">
              <p
                className={cn(
                  "text-base leading-7 text-slate-900",
                  todo.isCompleted && "text-slate-400 line-through",
                )}
              >
                {todo.text}
              </p>
              <div className="flex flex-wrap items-center gap-2 text-xs tracking-[0.18em] text-slate-500 uppercase">
                <span>Created {dateFormatter.format(createdAt)}</span>
                {todo.isCompleted ? (
                  <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700">
                    Completed
                  </Badge>
                ) : (
                  <Badge className="border-slate-200 bg-slate-50 text-slate-600">
                    Active
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>
        {!isEditing ? (
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => onEdit(todo)} variant="secondary">
              Edit
            </Button>
            <Button
              disabled={isDeleting}
              onClick={() => void onDelete(todo)}
              variant="danger"
            >
              Delete
            </Button>
          </div>
        ) : null}
      </div>
    </li>
  );
}
