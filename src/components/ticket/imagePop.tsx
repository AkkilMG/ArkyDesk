"use client";

import { useState } from "react";

import Dialog from "@/components/ui/Dialog";
import ErrorDisplay from "@/components/ui/ErrorDisplay";
import Shimmer from "@/components/ui/Shimmer";
import { cn } from "@/lib/cn";

interface ImagePopupProps {
  imageUrl: string;
  onClose: () => void;
  /** Describes the image for screen readers. Defaults to the file name. */
  alt?: string;
}

/** Best-effort file name from a URL, used as the default accessible name. */
function altFromUrl(url: string): string {
  try {
    const path = new URL(url, "https://arkynox.com").pathname;
    const file = decodeURIComponent(path.split("/").pop() || "");
    return file || "Attachment preview";
  } catch {
    return "Attachment preview";
  }
}

/**
 * Attachment lightbox.
 *
 * Previously this was a hand-rolled overlay that:
 *  - used `z-[9999]` instead of the z-index scale,
 *  - listened for `Space`/`Enter` on `window`, so pressing Space anywhere
 *    (including to scroll) toggled zoom and it hijacked page scrolling,
 *  - had no `role="dialog"`, no focus trap and no focus restoration,
 *  - put `onClick` on the `<img>` itself, so zoom was not keyboard-reachable.
 *
 * It now uses the shared `Dialog` and makes the image a real `<button>`, which
 * gives keyboard activation and focus for free.
 */
const ImagePopup: React.FC<ImagePopupProps> = ({ imageUrl, onClose, alt }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const label = alt ?? altFromUrl(imageUrl);

  return (
    <Dialog
      open
      onClose={onClose}
      title="Image preview"
      size="xl"
      bodyClassName="space-y-4"
      footer={
        <p className="w-full text-center text-xs text-muted-foreground">
          {isZoomed
            ? "Click the image or press Escape to zoom out and close"
            : "Click the image to zoom in, or press Escape to close"}
        </p>
      }
    >
      <div className="flex min-h-[12rem] items-center justify-center overflow-auto rounded-xl bg-muted">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-8">
            <Shimmer className="size-8" shape="circle" />
            <p className="mt-2 text-sm text-muted-foreground">Loading image…</p>
          </div>
        ) : null}

        {imageError ? (
          <ErrorDisplay
            className="p-8"
            title="Failed to load image"
            message="The image may be corrupted or the link is invalid."
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsZoomed((z) => !z)}
            aria-pressed={isZoomed}
            aria-label={isZoomed ? `Zoom out: ${label}` : `Zoom in: ${label}`}
            className={cn(
              "block max-w-full cursor-zoom-in rounded-lg transition-transform duration-300",
              isZoomed && "max-w-none scale-150 cursor-zoom-out hover:scale-200"
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt={label}
              className="block max-w-full rounded-lg"
              onLoad={() => {
                setIsLoading(false);
                setImageError(false);
              }}
              onError={() => {
                setIsLoading(false);
                setImageError(true);
              }}
              style={{ display: isLoading ? "none" : "block" }}
            />
          </button>
        )}
      </div>
    </Dialog>
  );
};

export default ImagePopup;
