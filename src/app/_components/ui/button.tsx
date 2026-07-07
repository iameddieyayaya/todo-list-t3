import { type ButtonHTMLAttributes, forwardRef } from "react";

import { cn } from "~/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--accent-strong)] text-white shadow-sm hover:bg-[var(--accent)]",
  secondary:
    "border border-[var(--border)] bg-white text-[var(--ink)] hover:bg-slate-50",
  ghost: "text-[var(--muted-ink)] hover:bg-slate-50 hover:text-[var(--ink)]",
  danger: "bg-[var(--danger)] text-white shadow-sm hover:bg-[#b91c1c]",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex h-10 items-center justify-center rounded-xl px-4 text-sm font-semibold transition duration-200 disabled:pointer-events-none disabled:opacity-60",
          "focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:outline-none",
          variantClasses[variant],
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
