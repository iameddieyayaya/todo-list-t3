import { redirect } from "next/navigation";

import { AuthPanel } from "~/app/_components/auth-panel";
import { auth } from "~/server/auth";

const featureCards = [
  {
    title: "Private auth",
    description:
      "Username and password signup with protected routes and scoped sessions.",
  },
  {
    title: "Neon-backed data",
    description:
      "Todos load from Postgres on page load and stay isolated per account.",
  },
  {
    title: "Focused workflow",
    description:
      "Create, edit, filter, complete, and delete work without leaving the page.",
  },
];

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    redirect("/todos");
  }

  return (
    <main className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_35%),radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.12),transparent_30%)]"
      />
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
        <div>
          <p className="text-xs font-semibold tracking-[0.28em] text-blue-700 uppercase">
            Todo Checklist
          </p>
          <p className="mt-1 text-sm text-slate-500">
            T3 Stack, tRPC, Drizzle, NextAuth, and Neon.
          </p>
        </div>
      </header>
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] w-full max-w-7xl gap-16 px-4 py-8 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:px-8">
        <section className="max-w-3xl space-y-10">
          <div className="space-y-6">
            <h1 className="font-[family-name:var(--font-display)] text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
              Keep your team’s small tasks crisp, private, and easy to finish.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              A clean checklist experience with credentials auth, Neon-backed
              persistence, and a polished interface tuned for fast daily use.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {featureCards.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-slate-200 bg-white/85 p-5 shadow-sm ring-1 ring-white/70"
              >
                <p className="text-sm font-semibold text-slate-900">
                  {card.title}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_20px_60px_rgba(15,23,42,0.18)]">
              <p className="text-sm font-medium text-slate-300">
                Built for private workflows
              </p>
              <p className="mt-3 text-3xl font-semibold tracking-tight">
                Auth, data, and UI all wired for a real deploy.
              </p>
            </div>
            <div className="rounded-3xl border border-blue-100 bg-blue-50/80 p-6 shadow-sm">
              <p className="text-sm font-medium text-blue-700">
                App Router + tRPC
              </p>
              <p className="mt-3 text-lg leading-7 text-slate-700">
                Server-side prefetching on protected routes with a client
                checklist that stays responsive for day-to-day task management.
              </p>
            </div>
          </div>
        </section>
        <section className="relative">
          <div className="pointer-events-none absolute inset-x-8 -top-8 -z-10 h-40 rounded-full bg-blue-200/40 blur-3xl" />
          <AuthPanel />
        </section>
      </div>
    </main>
  );
}
