"use client";

import { useEffect, useState } from "react";

import Dialog from "@/components/ui/Dialog";
import Button, { type ButtonProps } from "@/components/ui/Button";

/**
 * Destructive-action confirmation.
 *
 * Every irreversible action in ArkyDesk (delete account, close a ticket, reject
 * an admin action) routes through here so the copy, the button order and the
 * `role="alertdialog"` semantics stay identical everywhere.
 *
 * `action` runs after the dialog closes, and the dialog cannot be dismissed
 * while the request is in flight.
 */
export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  tone = "destructive",
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title: string;
  description: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: NonNullable<ButtonProps["variant"]>;
}) {
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!open) setBusy(false);
  }, [open]);

  const confirm = async () => {
    setBusy(true);
    try {
      await onConfirm();
      onClose();
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={title}
      size="sm"
      dismissible={!busy}
      role="alertdialog"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={busy}>
            {cancelLabel}
          </Button>
          <Button
            variant={tone === "destructive" ? "destructive" : tone}
            onClick={confirm}
            disabled={busy}
            data-autofocus
          >
            {busy ? "Working…" : confirmLabel}
          </Button>
        </>
      }
    >
      <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
    </Dialog>
  );
}
