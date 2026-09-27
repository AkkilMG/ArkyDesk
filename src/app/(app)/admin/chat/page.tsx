"use client";

import { useState } from "react";

import SideNav from "@/components/dashboard/sideNav";
import AccountSettings from "@/components/settings/settings";
import AdminChat from "@/components/settings/adminChat";
import TicketCreate from "@/components/ticket/create";
import AccessRestricted from "@/components/auth/AccessRestricted";
import Shimmer from "@/components/ui/Shimmer";
import { useSession } from "@/lib/useSession";
import type { UserDetails } from "@/types/settings";

export default function AdminChatPage() {
  /*
   * The admin check lives in `(app)/admin/layout.tsx`; this page only needs to
   * render the right loading/denied state while the shared session resolves.
   * It used to re-run `/api/auth/verify` plus `/api/auth/details` on mount and
   * redirect by hand, which duplicated both the request and the decision.
   */
  const { user, loading, isAdmin, isGuest } = useSession();

  const [settings, setSettings] = useState(false);
  const [create, setCreate] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const currentUser: UserDetails | null = user
    ? {
        _id: user.id,
        name: user.name,
        email: user.email,
        admin: user.admin,
        createdAt: user.createdAt ? new Date(user.createdAt) : undefined,
      }
    : null;

  if (loading) {
    return (
      <div className="min-h-screen bg-muted p-8">
        <div className="mx-auto w-full max-w-lg space-y-6">
          <div className="flex items-center justify-center gap-3">
            <Shimmer className="size-10 rounded-full" shape="circle" />
            <div className="space-y-2">
              <Shimmer className="h-4 w-40 rounded" />
              <Shimmer className="h-3 w-28 rounded" />
            </div>
          </div>
          {[40, 52, 36, 60].map((w, i) => (
            <Shimmer key={i} className="h-12 w-full rounded-xl" variant="card" />
          ))}
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <AccessRestricted
        reason={isGuest ? "guest" : "role"}
        user={user ? { name: user.name, guest: user.guest } : null}
      />
    );
  }

  return (
    <div className="min-h-screen bg-muted">
      <AccountSettings
        details={currentUser}
        settings={settings}
        setSettings={setSettings}
      />

      {create ? (
        <TicketCreate create={create} setCreate={setCreate} />
      ) : null}

      <div className="flex h-screen overflow-hidden bg-muted">
        <SideNav
          setCreate={setCreate}
          setSettings={setSettings}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />

        <div className="flex h-screen min-w-0 flex-1 flex-col overflow-hidden">
          <AdminChat
            settings={true}
            setSettings={() => {}}
            isMobile={true}
            currentUser={currentUser}
          />
        </div>
      </div>
    </div>
  );
}
