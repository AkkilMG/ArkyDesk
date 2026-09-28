"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import dynamic from "next/dynamic";

import AuthShell, { AuthHeading, AuthSubtitle } from "@/components/auth/AuthShell";
import FormMessage from "@/components/auth/FormMessage";
import Button, { buttonVariants } from "@/components/ui/Button";
import Field from "@/components/ui/Field";
import SpinnerIcon from "@/components/ui/SpinnerIcon";
import Completed from "@/assets/lottie/completed.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

type State = "idle" | "submitting" | "success" | "error";

/** Must match the server's zod rule in `app/api/auth/reset-password/route.ts`. */
const PASSWORD_MIN = 8;
const PASSWORD_MAX = 128;

export default function ResetPasswordPage({
  params,
}: {
  params: { token: string };
}) {
  const router = useRouter();
  const token = decodeURIComponent(params.token);

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (state === "submitting") return;

    if (password.length < PASSWORD_MIN) {
      setState("error");
      setMessage(`Use at least ${PASSWORD_MIN} characters.`);
      return;
    }
    if (password !== confirm) {
      setState("error");
      setMessage("Passwords do not match.");
      return;
    }

    setState("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password, confirm }),
      });
      const data = (await response.json()) as { success: boolean; message?: string };

      if (response.ok && data.success) {
        setState("success");
        setMessage(data.message ?? "Password updated.");
        setTimeout(() => router.push("/signin"), 2000);
      } else {
        setState("error");
        setMessage(data.message ?? "This reset link is invalid or has expired.");
      }
    } catch {
      setState("error");
      setMessage("We could not reach the server. Please try again.");
    }
  };

  if (state === "success") {
    return (
      <AuthShell>
        <div className="text-center">
          <div className="mx-auto mb-2 w-40">
            <Lottie loop={false} autoplay animationData={Completed} />
          </div>
          <AuthHeading className="justify-center">Password updated</AuthHeading>
          <AuthSubtitle>
            {message} Redirecting you to sign in…
          </AuthSubtitle>
        </div>

        <Link
          href="/signin"
          className={buttonVariants({ variant: "brand", size: "lg", fullWidth: true })}
        >
          Go to sign in
        </Link>
      </AuthShell>
    );
  }

  return (
    <AuthShell>
      <AuthHeading>Choose a new password</AuthHeading>
      <AuthSubtitle>This link can only be used once.</AuthSubtitle>

      <form onSubmit={submit} noValidate>
        <div className="auth-stack">
          <Field
            label="New password"
            id="new-password"
            name="password"
            autoComplete="new-password"
            placeholder={`${PASSWORD_MIN}+ characters`}
            value={password}
            onChange={e => setPassword(e.target.value)}
            minLength={PASSWORD_MIN}
            maxLength={PASSWORD_MAX}
            disabled={state === "submitting"}
            revealable
            revealed={revealed}
            onRevealChange={setRevealed}
            required
          />

          {/* One eye for both fields: the confirmation holds the same secret. */}
          <Field
            label="Confirm password"
            id="confirm-password"
            name="confirm"
            autoComplete="new-password"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            minLength={PASSWORD_MIN}
            maxLength={PASSWORD_MAX}
            disabled={state === "submitting"}
            revealable
            revealed={revealed}
            onRevealChange={setRevealed}
            required
          />
        </div>

        {message && state === "error" ? (
          <div className="mt-[var(--auth-block)]">
            <FormMessage tone="error">{message}</FormMessage>
          </div>
        ) : null}

        <div className="mt-[var(--auth-block)]">
          <Button
            type="submit"
            variant="brand"
            size="lg"
            fullWidth
            disabled={state === "submitting"}
          >
            {state === "submitting" ? (
              <>
                <SpinnerIcon className="size-4" />
                Updating…
              </>
            ) : (
              "Update password"
            )}
          </Button>
        </div>

        <p className="mt-[var(--auth-block)] text-center text-sm text-muted-foreground">
          <Link
            href="/signin"
            className="font-medium text-primary underline underline-offset-4"
          >
            Back to sign in
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
