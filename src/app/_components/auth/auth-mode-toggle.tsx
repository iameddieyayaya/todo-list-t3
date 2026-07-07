import { type AuthMode } from "./auth-types";

type AuthModeToggleProps = {
  mode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
};

export function AuthModeToggle({ mode, onModeChange }: AuthModeToggleProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-1">
      <button
        className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
          mode === "login"
            ? "bg-white text-slate-950 shadow-sm"
            : "text-slate-500"
        }`}
        onClick={() => onModeChange("login")}
        type="button"
      >
        Login
      </button>
      <button
        className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
          mode === "signup"
            ? "bg-white text-slate-950 shadow-sm"
            : "text-slate-500"
        }`}
        onClick={() => onModeChange("signup")}
        type="button"
      >
        Sign up
      </button>
    </div>
  );
}
