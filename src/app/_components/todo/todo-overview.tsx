import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const boardStats = [
  {
    label: "Total",
    valueKey: "totalCount",
    tone: "border-slate-200 bg-slate-50/80 text-slate-600",
  },
  {
    label: "Backlog",
    valueKey: "backlogCount",
    tone: "border-amber-200 bg-amber-50/80 text-amber-700",
  },
  {
    label: "In Progress",
    valueKey: "inProgressCount",
    tone: "border-sky-200 bg-sky-50/80 text-sky-700",
  },
  {
    label: "Done",
    valueKey: "completedCount",
    tone: "border-emerald-200 bg-emerald-50/80 text-emerald-700",
  },
] as const;

type TodoOverviewProps = {
  backlogCount: number;
  completedCount: number;
  inProgressCount: number;
  onLogout: () => Promise<void>;
  totalCount: number;
  username: string;
};

export function TodoOverview({
  backlogCount,
  completedCount,
  inProgressCount,
  onLogout,
  totalCount,
  username,
}: TodoOverviewProps) {
  const statValues = {
    totalCount,
    backlogCount,
    inProgressCount,
    completedCount,
  } as const;

  return (
    <header className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
      <Card className="overflow-hidden border-slate-200 bg-white/95">
        <CardHeader className="relative">
          <div className="absolute" />
          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-3">
              <Badge>Kanban overview</Badge>
              <CardTitle className="max-w-2xl text-4xl text-slate-950">
                Move tasks across the board instead of letting them pile up.
              </CardTitle>
              <CardDescription className="max-w-2xl text-base leading-7 text-slate-600">
                Signed in as{" "}
                <span className="font-semibold text-slate-950">
                  @{username}
                </span>
                . Your board is loaded from Neon, scoped to your account, and
                split into backlog, in-progress, and completed lanes.
              </CardDescription>
            </div>
            <Button
              className="rounded-xl"
              onClick={() => void onLogout()}
              variant="secondary"
            >
              Logout
            </Button>
          </div>
        </CardHeader>
      </Card>
      <Card className="border-slate-200 bg-white/95">
        <CardHeader>
          <CardDescription className="text-slate-500">
            Flow snapshot
          </CardDescription>
          <CardTitle className="text-2xl text-slate-950">
            Board balance
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-3">
          {boardStats.map((stat) => (
            <div
              key={stat.label}
              className={`rounded-[1.75rem] border p-4 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] ${stat.tone}`}
            >
              <p className="text-[11px] tracking-[0.26em] uppercase">
                {stat.label}
              </p>
              <p className="mt-4 font-[family-name:var(--font-display)] text-5xl font-semibold text-slate-950">
                {statValues[stat.valueKey]}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </header>
  );
}
