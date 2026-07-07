import { type AuthMode } from "./auth-types";
import { Input } from "../ui/input";

type AuthFieldsProps = {
  mode: AuthMode;
};

function AuthFieldLabel(props: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label
      className="text-sm font-medium text-slate-900"
      htmlFor={props.htmlFor}
    >
      {props.children}
    </label>
  );
}

export function AuthFields({ mode }: AuthFieldsProps) {
  return (
    <>
      <div className="space-y-2">
        <AuthFieldLabel htmlFor="username">Username</AuthFieldLabel>
        <Input
          autoComplete="username"
          id="username"
          name="username"
          placeholder="studio-checklist"
          required
        />
      </div>
      <div className="space-y-2">
        <AuthFieldLabel htmlFor="password">Password</AuthFieldLabel>
        <Input
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          id="password"
          name="password"
          placeholder="At least 8 characters"
          required
          type="password"
        />
      </div>
      {mode === "signup" ? (
        <div className="space-y-2">
          <AuthFieldLabel htmlFor="confirmPassword">
            Confirm password
          </AuthFieldLabel>
          <Input
            autoComplete="new-password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Re-enter your password"
            required
            type="password"
          />
        </div>
      ) : null}
    </>
  );
}
