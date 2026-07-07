import { type RouterOutputs } from "~/trpc/react";

export type Todo = RouterOutputs["todo"]["getAll"][number];
export type Filter = "all" | "active" | "completed";

export const FILTERS: Array<{ label: string; value: Filter }> = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Completed", value: "completed" },
];

export const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});
