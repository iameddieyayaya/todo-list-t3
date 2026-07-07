import { Button } from "../ui/button";
import { type TodoStatus } from "./todo-types";

type TodoStatusActionsProps = {
  isPending: boolean;
  onMove: (status: TodoStatus) => void;
  status: TodoStatus;
};

const statusActions: Record<
  TodoStatus,
  Array<{
    label: string;
    nextStatus: TodoStatus;
    variant: "ghost" | "primary" | "secondary";
  }>
> = {
  backlog: [
    { label: "Start", nextStatus: "in_progress", variant: "secondary" },
  ],
  in_progress: [
    { label: "Backlog", nextStatus: "backlog", variant: "ghost" },
  ],
  completed: [
    { label: "Reopen", nextStatus: "in_progress", variant: "secondary" },
  ],
};

export function TodoStatusActions({
  isPending,
  onMove,
  status,
}: TodoStatusActionsProps) {
  const actions = statusActions[status];

  return (
    <div className="grid grid-cols-1 gap-2">
      {actions.map((action) => (
        <Button
          key={action.label}
          className="h-9 rounded-xl px-3"
          disabled={isPending}
          onClick={() => onMove(action.nextStatus)}
          variant={action.variant}
        >
          {action.label}
        </Button>
      ))}
    </div>
  );
}
