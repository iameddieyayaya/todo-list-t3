"use client";

import { type SyntheticEvent, useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { api } from "~/trpc/react";
import { AuthFields } from "./auth-fields";
import { AuthModeToggle } from "./auth-mode-toggle";
import { type AuthMode } from "./auth-types";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

function readFormValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

export function AuthPanel() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("login");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isNavigating, startNavigation] = useTransition();
  const signUp = api.auth.signUp.useMutation();

  const isSubmitting = signUp.isPending || isNavigating;

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);
    const username = readFormValue(formData, "username");
    const password = readFormValue(formData, "password");
    const confirmPassword = readFormValue(formData, "confirmPassword");

    try {
      if (mode === "signup") {
        if (password !== confirmPassword) {
          setErrorMessage("Passwords do not match.");
          return;
        }

        await signUp.mutateAsync({ username, password });
      }

      const result = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (!result || result.error) {
        setErrorMessage("Invalid username or password.");
        return;
      }

      startNavigation(() => {
        router.push("/todos");
        router.refresh();
      });
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to continue.",
      );
    }
  }

  return (
    <Card className="relative overflow-hidden border-slate-200 bg-white/95">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.16),transparent_70%)]" />
      <CardHeader className="relative space-y-6 p-8">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold tracking-[0.24em] text-blue-700 uppercase">
              Account access
            </p>
            <CardTitle className="mt-2 text-4xl text-slate-950">
              Welcome back
            </CardTitle>
          </div>
          <AuthModeToggle
            mode={mode}
            onModeChange={(nextMode) => {
              setMode(nextMode);
              setErrorMessage(null);
            }}
          />
        </div>
        <CardDescription className="text-base leading-7 text-slate-600">
          {mode === "login"
            ? "Use your username and password to continue into your private checklist."
            : "Create a new account. Your todos stay private and scoped to your workspace."}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8 pt-0">
        <form className="space-y-5" onSubmit={handleSubmit}>
          <AuthFields mode={mode} />
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600">
            {mode === "login"
              ? "Use the username and password you created during signup."
              : "Passwords must match before we create the account."}
          </div>
          {errorMessage ? (
            <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {errorMessage}
            </p>
          ) : null}
          <Button
            className="h-11 w-full rounded-xl"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting
              ? "Working..."
              : mode === "login"
                ? "Login"
                : "Create account"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
