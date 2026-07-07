import { type HTMLAttributes } from "react";

import { cn } from "~/lib/utils";

export function Badge({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold tracking-[0.16em] text-blue-700 uppercase",
        className,
      )}
      {...props}
    />
  );
}
