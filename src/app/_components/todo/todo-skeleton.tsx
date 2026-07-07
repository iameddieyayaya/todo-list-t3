export function TodoSkeleton() {
  return (
    <div className="overflow-x-auto">
      <div className="grid min-w-[58rem] gap-4 xl:min-w-0 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, columnIndex) => (
          <div
            key={columnIndex}
            className="rounded-3xl border border-slate-200 bg-white/80 p-5"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-3 w-24 rounded-full bg-slate-100" />
                <div className="h-6 w-32 rounded-full bg-slate-100" />
              </div>
              <div className="h-10 w-10 rounded-full bg-slate-100" />
            </div>
            <div className="space-y-3">
              {Array.from({ length: 2 }).map((_, itemIndex) => (
                <div
                  key={itemIndex}
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
          </div>
        ))}
      </div>
    </div>
  );
}
