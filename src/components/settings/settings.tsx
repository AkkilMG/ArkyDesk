"use client";

import { useEffect, useState } from "react";

import Dialog from "@/components/ui/Dialog";
import SettingsSideBar, {
  type SettingsSection,
} from "@/components/settings/settingsSideBar";
import SettingsAccount from "@/components/settings/settingsAccount";
import SettingsProfile from "@/components/settings/settingsProfile";
import SettingsDangerous from "@/components/settings/settingsDangerous";
import type { UserDetails, SettingsProps } from "@/types/settings";

const TITLES: Record<SettingsSection, string> = {
  profile: "Profile",
  account: "Account & security",
  danger: "Danger zone",
};

/**
 * Account settings dialog.
 *
 * Mounted by every authenticated page, so it is the most-shared surface in the
 * app. It previously hand-rolled its own overlay: a full-screen wrapper with a
 * manual `Escape` listener, a manual `body.style.overflow = "hidden"` that was
 * cleared to the literal string `"unset"` (so any page that had set its own
 * overflow lost it), a `role="dialog"` on the *backdrop* rather than the panel,
 * and no focus trap — Tab walked straight out of the dialog into the page
 * behind it.
 *
 * All of that now comes from the shared `Dialog`, so settings looks and behaves
 * exactly like every other modal in ArkyDesk.
 */
export default function AccountSettings({ details, settings, setSettings }: SettingsProps) {
  const [section, setSection] = useState<SettingsSection>("profile");
  const [isMobile, setIsMobile] = useState(false);

  const isAdmin = details?.admin || false;

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsMobile(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  // Always reopen on the profile section rather than wherever the user left off.
  useEffect(() => {
    if (settings) setSection("profile");
  }, [settings]);

  const body =
    section === "profile" ? (
      <SettingsProfile
        details={details}
        settings={settings}
        setSettings={setSettings}
        isMobile={isMobile}
      />
    ) : section === "account" ? (
      <SettingsAccount
        details={details}
        settings={settings}
        setSettings={setSettings}
        isMobile={isMobile}
      />
    ) : (
      <SettingsDangerous
        settings={settings}
        setSettings={setSettings}
        isMobile={isMobile}
      />
    );

  return (
    <Dialog
      open={settings}
      onClose={() => setSettings(false)}
      title={TITLES[section]}
      description="Manage your ArkyDesk account and preferences."
      size="full"
      bodyClassName="p-0 overflow-hidden"
    >
      {/* The sidebar + panel row lives in the body, so the Dialog header stays
          full-width across the top on both mobile and desktop. */}
      <div className="flex h-full min-h-0 flex-col md:flex-row">
        <SettingsSideBar
          section={section}
          onSectionChange={setSection}
          isAdmin={isAdmin}
        />

        <div className="min-h-0 flex-1 overflow-y-auto">{body}</div>
      </div>
    </Dialog>
  );
}
