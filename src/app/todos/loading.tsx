export default function TodosLoading() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid animate-pulse gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="h-56 rounded-[28px] border border-[var(--border)] bg-white/70" />
        <div className="h-56 rounded-[28px] border border-[var(--border)] bg-white/70" />
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="h-72 rounded-[28px] border border-[var(--border)] bg-white/70" />
        <div className="h-72 rounded-[28px] border border-[var(--border)] bg-white/70" />
      </div>
    </main>
  );
}
