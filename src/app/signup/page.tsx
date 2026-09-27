"use client";

import Link from "next/link";
import { useState } from "react";

import AuthShell, { AuthTitle } from "@/components/auth/AuthShell";
import FormMessage from "@/components/auth/FormMessage";
import Button from "@/components/ui/Button";
import Field from "@/components/ui/Field";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import TermsAcceptance from "@/components/ui/TermsAcceptance";
import { useConsent } from "@/lib/ConsentContext";

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const EMPTY: FormData = { name: "", email: "", password: "", confirmPassword: "" };

/** Human labels for validation messages. Previously the raw state key was shown
 *  to users, producing copy like "confirmPassword is required". */
const FIELD_LABELS: Record<keyof FormData, string> = {
  name: "Name",
  email: "Email",
  password: "Password",
  confirmPassword: "Password confirmation",
};

/** Must match the server's zod rule in `app/api/auth/signup/route.ts`
 *  (`z.string().min(8).max(128)`), so users are not told "too short" only after
 *  a round-trip. */
const PASSWORD_MIN = 8;
const PASSWORD_MAX = 128;

export default function Signup() {
  const [formData, setFormData] = useState<FormData>(EMPTY);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [formError, setFormError] = useState("");
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // One eye for both password fields: they hold the same secret, so toggling
  // one to plain text while the other stayed masked would be misleading.
  const [revealed, setRevealed] = useState(false);
  const { hasValidConsent } = useConsent();

  const update = (key: keyof FormData) => (value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    // Clear the field's error as soon as the user edits it, so the form stops
    // shouting at someone who has started fixing it.
    setFieldErrors(prev => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  const validate = (): boolean => {
    const errors: Partial<Record<keyof FormData, string>> = {};

    (Object.keys(formData) as (keyof FormData)[]).forEach(key => {
      if (formData[key].trim() === "") {
        errors[key] = `${FIELD_LABELS[key]} is required`;
      }
    });

    if (!errors.password) {
      if (formData.password.length < PASSWORD_MIN) {
        errors.password = `Password must be at least ${PASSWORD_MIN} characters`;
      } else if (formData.password.length > PASSWORD_MAX) {
        errors.password = `Password must be at most ${PASSWORD_MAX} characters`;
      }
    }

    if (!errors.confirmPassword && formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords don't match";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const proceedWithSignup = async () => {
    setIsLoading(true);
    setFormError("");

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          termsAccepted: true,
          consentTimestamp: new Date().toISOString(),
        }),
      });

      const responseData = (await response.json()) as {
        success?: boolean;
        upgraded?: boolean;
        message?: string;
      };

      if (!response.ok || !responseData.success) {
        setFormError(responseData.message || "We couldn't create your account. Please try again.");
        setIsLoading(false);
        return;
      }

      // Full navigation on purpose: the session cookie was just set and the app
      // shell must not be reused from this route's client bundle.
      window.location.href = responseData.upgraded ? "/signin?upgraded=1" : "/signin";
    } catch (caught) {
      console.error("Signup error:", caught);
      setFormError("An error occurred during signup. Please try again.");
      setIsLoading(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // Without this the browser would navigate away and reload the page.
    event.preventDefault();

    if (isLoading) return;
    setFormError("");

    if (!validate()) return;

    if (hasValidConsent()) {
      void proceedWithSignup();
    } else {
      setShowTermsModal(true);
    }
  };

  return (
    <>
      <AuthShell>
        <AuthTitle verb="Sign up" />

        <form onSubmit={handleSubmit} noValidate>
          <div className="auth-stack">
            <Field
              label="Name"
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              value={formData.name}
              onChange={e => update("name")(e.target.value)}
              error={fieldErrors.name}
              disabled={isLoading}
              required
            />

            <Field
              label="Email"
              id="email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@arkynox.com"
              value={formData.email}
              onChange={e => update("email")(e.target.value)}
              error={fieldErrors.email}
              disabled={isLoading}
              required
            />

            <Field
              label="Password"
              id="password"
              name="password"
              autoComplete="new-password"
              hint={`${PASSWORD_MIN}+ characters`}
              value={formData.password}
              onChange={e => update("password")(e.target.value)}
              error={fieldErrors.password}
              disabled={isLoading}
              minLength={PASSWORD_MIN}
              maxLength={PASSWORD_MAX}
              revealable
              revealed={revealed}
              onRevealChange={setRevealed}
              required
            />

            <Field
              label="Confirm password"
              id="confirmPassword"
              name="confirmPassword"
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={e => update("confirmPassword")(e.target.value)}
              error={fieldErrors.confirmPassword}
              disabled={isLoading}
              revealable
              revealed={revealed}
              onRevealChange={setRevealed}
              required
            />
          </div>

          <div
            className="mt-[var(--auth-block)] flex items-start gap-3 rounded-xl bg-muted p-3"
          >
            <svg
              className="mt-0.5 size-5 shrink-0 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
              />
            </svg>
            {/* The heading was a separate <h2> above the paragraph, which cost
                24px of vertical budget on the tallest page for no information
                gain — the label is now a bold lead-in on the same paragraph. */}
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Terms &amp; privacy agreement. </span>
              By creating an account, you&apos;ll be asked to review and accept our{" "}
              <Link
                href="/policy/terms-and-condition"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary underline underline-offset-4"
              >
                Terms &amp; Conditions
              </Link>{" "}
              and{" "}
              <Link
                href="/policy/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary underline underline-offset-4"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>

          {formError ? (
            <FormMessage tone="error" className="mt-[var(--auth-block)]">
              {formError}
            </FormMessage>
          ) : null}

          <div className="mt-[var(--auth-block)]">
            <Button
              type="submit"
              variant="brand"
              size="lg"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <LoadingSpinner size="sm" />
                  Creating account…
                </>
              ) : (
                "Create account"
              )}
            </Button>
          </div>

          <p className="mt-[var(--auth-block)] text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="font-medium text-primary underline underline-offset-4"
            >
              Sign in
            </Link>
          </p>
        </form>
      </AuthShell>

      <TermsAcceptance
        isOpen={showTermsModal}
        onAccept={() => {
          setShowTermsModal(false);
          void proceedWithSignup();
        }}
        onDecline={() => {
          setShowTermsModal(false);
          setFormError("You must accept the terms and conditions to create an account.");
        }}
        userEmail={formData.email}
      />
    </>
  );
}
