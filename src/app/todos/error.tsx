"use client";

import { Button } from "~/app/_components/ui/button";

export default function TodosError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl items-center px-4 py-10 sm:px-6">
      <div className="w-full rounded-[32px] border border-[rgba(186,79,92,0.2)] bg-white/85 p-8 shadow-[0_24px_60px_rgba(103,90,70,0.12)]">
        <p className="text-xs tracking-[0.22em] text-[var(--muted-ink)] uppercase">
          Todos
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl text-[var(--ink)]">
          The checklist hit a server error.
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--muted-ink)]">
          Try the request again. If the problem persists, check the database and
          auth configuration in your environment.
        </p>
        <Button className="mt-6" onClick={reset} variant="secondary">
          Retry
        </Button>
      </div>
    </main>
  );
}
