"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import AuthShell, { AuthTitle } from "@/components/auth/AuthShell";
import FormMessage from "@/components/auth/FormMessage";
import Button from "@/components/ui/Button";
import Dialog from "@/components/ui/Dialog";
import Field from "@/components/ui/Field";
import Shimmer from "@/components/ui/Shimmer";
import SpinnerIcon from "@/components/ui/SpinnerIcon";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Banner = { tone: "error" | "success"; text: string } | null;

export default function Signin() {
  const [banner, setBanner] = useState<Banner>(null);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // One form, two modes. `guestMode` is the only mode switch; the guest fields
  // and password field are conditionally rendered below. Previously this was a
  // Tabs component rendering two entirely separate forms with their own state,
  // loading flags and banner slots — all of which collapsed into this.
  const [guestMode, setGuestMode] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [checkingSession, setCheckingSession] = useState(true);
  const router = useRouter();

  /** Send an already-signed-in visitor to the surface their role allows. */
  const handleAdmin = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/verify", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.success) {
        router.push(data.admin ? "/dashboard" : "/tickets");
        return;
      }
      console.error("Verify failed:", data.message);
    } catch (error) {
      console.error("Error verify out:", error);
    }
    setCheckingSession(false);
  }, [router]);

  useEffect(() => {
    if (document.cookie) {
      void handleAdmin();
    } else {
      setCheckingSession(false);
    }

    // Show the upgrade confirmation when redirected back from signup.
    const params = new URLSearchParams(window.location.search);
    if (params.get("upgraded") === "1") {
      setBanner({
        tone: "success",
        text: "Your guest account has been upgraded successfully. Sign in with your new password.",
      });
    }
  }, [handleAdmin]);

  if (checkingSession) {
    return (
      <AuthShell>
        <div className="auth-stack" aria-busy="true" aria-label="Loading sign in">
          <Shimmer className="h-8 w-48 rounded" variant="card" />
          <div className="auth-stack">
            <Shimmer className="h-4 w-16 rounded" variant="list" />
            <Shimmer className="h-11 w-full rounded-lg" variant="card" />
            <Shimmer className="h-5 w-64 rounded" variant="list" />
            <Shimmer className="h-4 w-16 rounded" variant="list" />
            <Shimmer className="h-11 w-full rounded-lg" variant="card" />
            <Shimmer className="h-11 w-full rounded-3xl" variant="card" />
          </div>
        </div>
      </AuthShell>
    );
  }

  const handleChange = (key: "name" | "email" | "password") => (value: string) =>
    setFormData(prev => ({ ...prev, [key]: value }));

  /** Guest flow: asks for a name and email and POSTs a login link. */
  const handleGuestContinue = async () => {
    setBanner(null);

    if (!formData.name.trim() || !formData.email.trim()) {
      setBanner({ tone: "error", text: "Name and email are required for guest access." });
      return;
    }

    if (!EMAIL_RE.test(formData.email)) {
      setBanner({ tone: "error", text: "Please enter a valid email address." });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/guest/login-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formData.name, email: formData.email }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setBanner({ tone: "error", text: data.message || "Unable to start guest session." });
        return;
      }

      if (data.loginUrl) {
        window.location.href = data.loginUrl;
        return;
      }

      setBanner({
        tone: "success",
        text: data.sent
          ? "Check your email for the guest login link."
          : "Guest login link created. Open the email link or ask support to resend it.",
      });
    } catch (error) {
      console.error("Guest login error:", error);
      setBanner({ tone: "error", text: "An error occurred while creating the guest session." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!forgotEmail.trim()) {
      setBanner({ tone: "error", text: "Please enter your email address." });
      return;
    }

    if (!EMAIL_RE.test(forgotEmail)) {
      setBanner({ tone: "error", text: "Please enter a valid email address." });
      return;
    }

    setIsLoading(true);
    setBanner(null);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setShowForgotModal(false);
        setForgotEmail("");
        setBanner({
          tone: "success",
          text: "Password reset instructions have been sent to your email address. Please check your inbox and spam folder.",
        });
      } else {
        setBanner({
          tone: "error",
          text: data.message || "Failed to send password reset email. Please try again.",
        });
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      setBanner({ tone: "error", text: "An error occurred. Please try again later." });
    } finally {
      setIsLoading(false);
    }
  };

  /** Single dismissal path for the reset dialog: closes it and clears the
   *  previous attempt's error and email so reopening starts clean. */
  const closeForgotModal = () => {
    setShowForgotModal(false);
    setBanner(null);
    setForgotEmail("");
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    // Without this the browser navigates and reloads instead of signing in.
    event.preventDefault();
    if (isLoading) return;

    // One form, two flows: the checkbox decides which. The guest branch never
    // sends the password, even though the field's value is preserved in state
    // for if the user toggles back.
    if (guestMode) {
      await handleGuestContinue();
      return;
    }

    setBanner(null);

    if (!formData.email.trim()) {
      setBanner({ tone: "error", text: "Email is required." });
      return;
    }
    if (!formData.password) {
      setBanner({ tone: "error", text: "Password is required." });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });
      const responseData = await response.json();

      if (response.ok && responseData.success) {
        await handleAdmin();
      } else {
        setBanner({
          tone: "error",
          text: responseData.message || "We couldn't sign you in. Please try again.",
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setBanner({ tone: "error", text: "An error occurred during sign in. Please try again." });
      setIsLoading(false);
    }
  };

  return (
    <>
      <AuthShell>
        <AuthTitle verb={guestMode ? "Guest sign in" : "Sign in"} />

        <form onSubmit={submit} noValidate>
          {banner ? (
            <div className="mb-[var(--auth-block)]">
              <FormMessage tone={banner.tone}>{banner.text}</FormMessage>
            </div>
          ) : null}

          <div className="auth-stack">
            {/* In guest mode the name field appears above the email field. */}
            {guestMode ? (
              <Field
                label="Guest name"
                id="guest-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Enter your display name"
                value={formData.name}
                onChange={e => handleChange("name")(e.target.value)}
                disabled={isLoading}
                required
              />
            ) : null}

            <Field
              label={guestMode ? "Guest email" : "Email"}
              id="email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder={guestMode ? "name@example.com" : "you@arkynox.com"}
              value={formData.email}
              onChange={e => handleChange("email")(e.target.value)}
              disabled={isLoading}
              required
            />

            {/* House checkbox pattern from TermsAcceptance/CookieConsent: the
                wrapping <label> is the hit target, so no id/htmlFor needed.
                Sits between email and password so the toggle lands right
                after the email the user just typed. */}
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={guestMode}
                onChange={e => setGuestMode(e.target.checked)}
                disabled={isLoading}
                className="mt-0.5 size-4 shrink-0 accent-primary"
              />
              <span className="text-sm text-muted-foreground">
                I don&apos;t have an account and want to continue as a guest.
              </span>
            </label>

            {/* The password field only exists in sign-in mode, so its
                "Forgot password?" link disappears in guest mode on its own. */}
            {!guestMode ? (
              <Field
                label="Password"
                id="password"
                name="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={e => handleChange("password")(e.target.value)}
                disabled={isLoading}
                revealable
                required
                action={
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(true)}
                    className="shrink-0 rounded text-sm font-medium text-primary underline underline-offset-4 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/20"
                  >
                    Forgot password?
                  </button>
                }
              />
            ) : null}
          </div>

          {guestMode ? (
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
              <div>
                <h2 className="mb-1 text-sm font-semibold text-foreground">Guest access</h2>
                <p className="text-sm text-muted-foreground">
                  Submit bug reports without creating an account. Guest sessions are limited
                  and some features stay restricted until you sign up.
                </p>
              </div>
            </div>
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
                  <SpinnerIcon className="size-4" />
                  {guestMode ? "Starting guest session…" : "Signing in…"}
                </>
              ) : guestMode ? (
                "Continue as guest"
              ) : (
                "Sign in"
              )}
            </Button>
          </div>

          <p className="mt-[var(--auth-block)] text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-medium text-primary underline underline-offset-4">
              Sign up
            </Link>
          </p>
        </form>
      </AuthShell>

      <Dialog
        open={showForgotModal}
        onClose={closeForgotModal}
        title="Reset your password"
        description="Enter your email to receive reset instructions"
        size="sm"
        dismissible={!isLoading}
        footer={
          <>
            <Button variant="secondary" onClick={closeForgotModal} disabled={isLoading}>
              Cancel
            </Button>
            <Button
              onClick={handleForgotPassword}
              disabled={isLoading || !forgotEmail.trim()}
              data-autofocus
            >
              {isLoading ? "Sending…" : "Send reset link"}
            </Button>
          </>
        }
      >
        <form
          onSubmit={e => {
            e.preventDefault();
            if (!isLoading && forgotEmail.trim()) void handleForgotPassword();
          }}
          className="space-y-4"
        >
          <div className="flex items-start gap-3 rounded-lg bg-muted p-4">
            <svg
              className="mt-0.5 size-6 shrink-0 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 4.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z"
              />
            </svg>
            <div>
              <h3 className="font-medium text-foreground">How it works</h3>
              <p className="text-sm text-muted-foreground">
                We&apos;ll send you a secure link to reset your password. The link expires in 1
                hour for security.
              </p>
            </div>
          </div>

          <Field
            label="Email address"
            id="forgot-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@arkynox.com"
            value={forgotEmail}
            onChange={e => setForgotEmail(e.target.value)}
            disabled={isLoading}
          />

          {banner ? <FormMessage tone="error">{banner.text}</FormMessage> : null}

          {/* The footer buttons submit; this keeps Enter in the field working. */}
          <button type="submit" className="sr-only" tabIndex={-1} aria-hidden="true">
            Send reset link
          </button>
        </form>
      </Dialog>
    </>
  );
}
