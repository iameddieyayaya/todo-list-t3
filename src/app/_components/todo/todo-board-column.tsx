import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { TodoItem } from "./todo-item";
import { type Todo, type TodoStatus } from "./todo-types";

type TodoBoardColumnProps = {
  description: string;
  editingId: number | null;
  editingText: string;
  emptyCopy: string;
  isDeletingTodo: (todoId: number) => boolean;
  isMovingTodo: (todoId: number) => boolean;
  isSavingTodo: (todoId: number) => boolean;
  isTogglingTodo: (todoId: number) => boolean;
  onCancelEdit: () => void;
  onDelete: (todo: Todo) => Promise<void>;
  onEdit: (todo: Todo) => void;
  onMove: (todo: Todo, status: TodoStatus) => Promise<void>;
  onSave: (todo: Todo) => Promise<void>;
  onTextChange: (value: string) => void;
  onToggle: (todo: Todo) => Promise<void>;
  title: string;
  tone: string;
  todos: Todo[];
};

export function TodoBoardColumn({
  description,
  editingId,
  editingText,
  emptyCopy,
  isDeletingTodo,
  isMovingTodo,
  isSavingTodo,
  isTogglingTodo,
  onCancelEdit,
  onDelete,
  onEdit,
  onMove,
  onSave,
  onTextChange,
  onToggle,
  title,
  tone,
  todos,
}: TodoBoardColumnProps) {
  return (
    <Card
      className={`min-h-[28rem] border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(246,249,252,0.94))] ${tone}`}
    >
      <CardHeader className="gap-3 border-b border-white/80 pb-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <CardDescription className="text-slate-500">
              {description}
            </CardDescription>
            <CardTitle className="mt-1 text-2xl text-slate-950">
              {title}
            </CardTitle>
          </div>
          <span className="inline-flex h-10 min-w-10 items-center justify-center rounded-full border border-white/70 bg-white/90 px-3 text-sm font-semibold text-slate-700 shadow-sm">
            {todos.length}
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-5 pt-5">
        {todos.length === 0 ? (
          <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-white/70 p-6 text-sm leading-6 text-slate-500">
            {emptyCopy}
          </div>
        ) : (
          <ul className="space-y-4">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                editingId={editingId}
                editingText={editingText}
                isDeleting={isDeletingTodo(todo.id)}
                isMoving={isMovingTodo(todo.id)}
                isSaving={isSavingTodo(todo.id)}
                isToggling={isTogglingTodo(todo.id)}
                onCancel={onCancelEdit}
                onDelete={onDelete}
                onEdit={onEdit}
                onMove={onMove}
                onSave={onSave}
                onTextChange={onTextChange}
                onToggle={onToggle}
                todo={todo}
              />
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
