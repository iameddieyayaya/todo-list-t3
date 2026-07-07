export function TodoSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="flex animate-pulse items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4"
        >
          <div className="h-5 w-5 rounded-full bg-slate-100" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-2/3 rounded-full bg-slate-100" />
            <div className="h-3 w-1/3 rounded-full bg-slate-100" />
          </div>
        </div>
      ))}
    </div>
  );
}
