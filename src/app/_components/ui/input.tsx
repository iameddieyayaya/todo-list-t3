import { type InputHTMLAttributes, forwardRef } from "react";

import { cn } from "~/lib/utils";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "flex h-11 w-full rounded-xl border border-[var(--border)] bg-white px-4 text-sm text-[var(--ink)] shadow-sm transition outline-none",
          "placeholder:text-slate-400 focus:border-[var(--accent)] focus:bg-white focus:ring-4 focus:ring-[color:rgba(37,99,235,0.12)]",
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
