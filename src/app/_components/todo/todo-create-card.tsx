import { type SyntheticEvent } from "react";

import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";

type TodoCreateCardProps = {
  isPending: boolean;
  newTodoText: string;
  onChange: (value: string) => void;
  onSubmit: (event: SyntheticEvent<HTMLFormElement>) => Promise<void>;
};

export function TodoCreateCard({
  isPending,
  newTodoText,
  onChange,
  onSubmit,
}: TodoCreateCardProps) {
  return (
    <Card className="border-slate-200 bg-white/95">
      <CardHeader>
        <CardDescription className="text-slate-500">
          Create todo
        </CardDescription>
        <CardTitle className="text-2xl text-slate-950">
          Add the next task
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <form className="space-y-3" onSubmit={onSubmit}>
          <Input
            name="todo"
            onChange={(event) => onChange(event.target.value)}
            placeholder="Draft the next task..."
            value={newTodoText}
          />
          <Button
            className="h-11 w-full rounded-xl"
            disabled={isPending}
            type="submit"
          >
            {isPending ? "Adding..." : "Add todo"}
          </Button>
        </form>
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm leading-6 text-slate-600">
          Keep tasks short, concrete, and easy to complete in one pass.
        </div>
      </CardContent>
    </Card>
  );
}
