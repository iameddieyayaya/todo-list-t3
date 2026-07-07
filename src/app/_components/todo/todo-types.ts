import { type RouterOutputs } from "~/trpc/react";

export type Todo = RouterOutputs["todo"]["getAll"][number];
export type TodoStatus = Todo["status"];
export type TodoBoard = Record<TodoStatus, Todo[]>;

export const BOARD_COLUMNS: Array<{
  description: string;
  emptyCopy: string;
  title: string;
  value: TodoStatus;
}> = [
  {
    value: "backlog",
    title: "Backlog",
    description: "Ideas waiting for a focused start.",
    emptyCopy: "Nothing waiting here. Add the next task to backlog.",
  },
  {
    value: "in_progress",
    title: "In Progress",
    description: "Active work that has your attention.",
    emptyCopy: "Move one backlog item here when you start working it.",
  },
  {
    value: "completed",
    title: "Completed",
    description: "Finished tasks with clean closure.",
    emptyCopy: "Completed work will collect here with a strikethrough.",
  },
];

export const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});
