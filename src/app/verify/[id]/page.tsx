"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import AuthShell, { AuthHeading, AuthSubtitle } from "@/components/auth/AuthShell";
import FormMessage from "@/components/auth/FormMessage";
import { buttonVariants } from "@/components/ui/Button";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Completed from "@/assets/lottie/completed.json";

// `ssr: false` matters here: lottie-react touches `window` during render, and
// this route renders on the server as part of the static pass. The other two
// auth pages already imported it this way; this one did not.
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

type Status = "pending" | "success" | "error" | "already";

export default function VerifyEmail({ params }: { params: { id: string } }) {
  const token = decodeURIComponent(params.id);
  const [status, setStatus] = useState<Status>("pending");
  const [message, setMessage] = useState("Verifying your email address…");

  useEffect(() => {
    let cancelled = false;

    const verify = async () => {
      try {
        const response = await fetch(
          `/api/auth/verify-email?token=${encodeURIComponent(token)}`
        );
        const data = (await response.json()) as {
          success: boolean;
          message?: string;
          alreadyVerified?: boolean;
        };

        if (cancelled) return;

        if (response.ok && data.success) {
          setStatus(data.alreadyVerified ? "already" : "success");
          setMessage(
            data.alreadyVerified
              ? "This email address was already verified."
              : "Your email address has been verified."
          );
        } else {
          setStatus("error");
          setMessage(
            data.message ?? "This verification link is invalid or has expired."
          );
        }
      } catch {
        if (cancelled) return;
        setStatus("error");
        setMessage("We could not verify this link. Please request a new one.");
      }
    };

    verify();
    return () => {
      cancelled = true;
    };
  }, [token]);

  if (status === "pending") {
    return (
      <AuthShell>
        {/* `LoadingSpinner` brings its own `role="status"`/`aria-live`, so this
            is not wrapped in another live region. */}
        <LoadingSpinner size="lg" text={message} />
      </AuthShell>
    );
  }

  const failed = status === "error";

  return (
    <AuthShell>
      <div className="text-center">
        {!failed ? (
          <div className="mx-auto mb-2 w-40">
            <Lottie loop={false} autoplay animationData={Completed} />
          </div>
        ) : null}

        <AuthHeading className="justify-center">
          {failed ? "Verification failed" : "Email verified"}
        </AuthHeading>

        {failed ? (
          <FormMessage tone="error" className="mb-[var(--auth-block)] text-left">
            {message}
          </FormMessage>
        ) : (
          <AuthSubtitle>{message}</AuthSubtitle>
        )}
      </div>

      <div className="auth-stack">
        {failed ? (
          <Link
            href="/forgot-password"
            className={buttonVariants({ variant: "brand", size: "lg", fullWidth: true })}
          >
            Request a new link
          </Link>
        ) : null}

        <Link
          href="/signin"
          className={buttonVariants({
            variant: failed ? "secondary" : "brand",
            size: "lg",
            fullWidth: true,
          })}
        >
          Continue to sign in
        </Link>
      </div>
    </AuthShell>
  );
}
