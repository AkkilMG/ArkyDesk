"use client";

import Link from "next/link";
import { useState } from "react";
import dynamic from "next/dynamic";

import AuthShell, { AuthHeading, AuthSubtitle } from "@/components/auth/AuthShell";
import FormMessage from "@/components/auth/FormMessage";
import Button, { buttonVariants } from "@/components/ui/Button";
import Field from "@/components/ui/Field";
import SpinnerIcon from "@/components/ui/SpinnerIcon";
import Completed from "@/assets/lottie/completed.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "submitting" | "sent">("idle");
  const [error, setError] = useState("");

  async function forgotPasswordForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }

    setState("submitting");

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = (await response.json()) as { success: boolean; message?: string };

      if (response.ok && data.success) {
        setState("sent");
      } else {
        setState("idle");
        setError(data.message ?? "We could not process that request.");
      }
    } catch {
      setState("idle");
      setError("We could not reach the server. Please try again.");
    }
  }

  if (state === "sent") {
    return (
      <AuthShell>
        {/* `AuthHeading` is a flex container, so `text-center` on a wrapper
            would not centre it — the anonymous flex item stays at flex-start.
            `justify-center` is what actually centres these. */}
        <div className="text-center">
          <div className="mx-auto mb-2 w-40">
            <Lottie loop={false} autoplay animationData={Completed} />
          </div>
          <AuthHeading className="justify-center">Check your inbox</AuthHeading>
          <AuthSubtitle>
            If an account exists for that address, a reset link is on its way.
            The link expires in one hour.
          </AuthSubtitle>
        </div>

        <Link
          href="/signin"
          className={buttonVariants({ variant: "brand", size: "lg", fullWidth: true })}
        >
          Back to sign in
        </Link>
      </AuthShell>
    );
  }

  return (
    <AuthShell>
      <AuthHeading>Forgot your password?</AuthHeading>
      <AuthSubtitle>
        Enter the email address on your account and we will send a reset link.
      </AuthSubtitle>

      <form onSubmit={forgotPasswordForm} noValidate>
        <Field
          label="Email"
          id="email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@arkynox.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={state === "submitting"}
          required
        />

        {error ? (
          <div className="mt-[var(--auth-block)]">
            <FormMessage tone="error">{error}</FormMessage>
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
                Sending…
              </>
            ) : (
              "Send reset link"
            )}
          </Button>
        </div>

        <p className="mt-[var(--auth-block)] text-center text-sm text-muted-foreground">
          Remembered it?{" "}
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
