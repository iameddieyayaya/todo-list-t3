import { cn } from "~/lib/utils";
import { FILTERS, type Filter } from "./todo-types";

type TodoFilterTabsProps = {
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
};

export function TodoFilterTabs({
  filter,
  onFilterChange,
}: TodoFilterTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {FILTERS.map((item) => (
        <button
          key={item.value}
          className={cn(
            "rounded-xl px-4 py-2 text-sm font-medium transition",
            filter === item.value
              ? "bg-slate-900 text-white shadow-sm"
              : "border border-slate-200 bg-white text-slate-600 hover:text-slate-900",
          )}
          onClick={() => onFilterChange(item.value)}
          type="button"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
