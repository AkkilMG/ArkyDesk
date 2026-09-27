"use client";

import { useState } from "react";

import SideNav from "@/components/dashboard/sideNav";
import AccountSettings from "@/components/settings/settings";
import UserManagement from "@/components/settings/userManagement";
import TicketCreate from "@/components/ticket/create";
import AccessRestricted from "@/components/auth/AccessRestricted";
import Shimmer from "@/components/ui/Shimmer";
import { useSession } from "@/lib/useSession";
import type { UserDetails } from "@/types/settings";

export default function AdminUsersPage() {
  /*
   * `(app)/admin/layout.tsx` already rejects non-admins server-side, so this
   * page no longer re-verifies the role and redirects by hand; it just mirrors
   * the resolved session into a loading and a denied state.
   */
  const { user, loading, isAdmin, isGuest } = useSession();

  const [settings, setSettings] = useState(false);
  const [create, setCreate] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const userDetails: UserDetails | null = user
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
        details={userDetails}
        settings={settings}
        setSettings={setSettings}
      />

      {create ? (
        <TicketCreate create={create} setCreate={setCreate} />
      ) : null}

      <div className="flex h-screen overflow-hidden bg-muted">
        {/* Sidebar — handles both desktop sidebar and mobile overlay */}
        <SideNav
          setCreate={setCreate}
          setSettings={setSettings}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />

        {/* Main content */}
        <div className="min-w-0 flex-1 overflow-hidden bg-muted h-screen">
          <UserManagement settings={true} setSettings={() => {}} isMobile={true} />
        </div>
      </div>
    </div>
  );
}
