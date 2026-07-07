import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

type TodoOverviewProps = {
  completedCount: number;
  onLogout: () => Promise<void>;
  totalCount: number;
  username: string;
};

export function TodoOverview({
  completedCount,
  onLogout,
  totalCount,
  username,
}: TodoOverviewProps) {
  return (
    <header className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
      <Card className="overflow-hidden border-slate-200 bg-white/95">
        <CardHeader className="relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.14),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.08),transparent_40%)]" />
          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-3">
              <Badge>Workspace overview</Badge>
              <CardTitle className="max-w-2xl text-4xl text-slate-950">
                Keep the queue visible and move through it without friction.
              </CardTitle>
              <CardDescription className="max-w-2xl text-base leading-7 text-slate-600">
                Signed in as{" "}
                <span className="font-semibold text-slate-950">
                  @{username}
                </span>
                . Your checklist is loaded from Neon and scoped to your account.
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
            Progress snapshot
          </CardDescription>
          <CardTitle className="text-2xl text-slate-950">
            Today&apos;s pace
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs tracking-[0.18em] text-slate-500 uppercase">
              Total
            </p>
            <p className="mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold text-slate-950">
              {totalCount}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs tracking-[0.18em] text-slate-500 uppercase">
              Done
            </p>
            <p className="mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold text-slate-950">
              {completedCount}
            </p>
          </div>
        </CardContent>
      </Card>
    </header>
  );
}
