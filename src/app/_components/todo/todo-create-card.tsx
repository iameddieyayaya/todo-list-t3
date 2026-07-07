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
    <Card className="overflow-hidden border-slate-200 bg-white/95">
      <CardHeader>
        <CardDescription className="text-slate-500">
          Backlog intake
        </CardDescription>
        <CardTitle className="text-2xl text-slate-950">
          Add the next card
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <form className="space-y-3" onSubmit={onSubmit}>
          <Input
            name="todo"
            onChange={(event) => onChange(event.target.value)}
            placeholder="Drop a task into backlog..."
            value={newTodoText}
          />
          <Button
            className="h-11 w-full rounded-xl"
            disabled={isPending}
            type="submit"
          >
            {isPending ? "Adding..." : "Add to backlog"}
          </Button>
        </form>
        <div className="rounded-2xl border border-dashed border-slate-300 bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(241,245,249,0.9))] p-4 text-sm leading-6 text-slate-600">
          New tasks land in backlog first. Move them into in-progress when
          they become active, then send them to completed when they ship.
        </div>
      </CardContent>
    </Card>
  );
}
