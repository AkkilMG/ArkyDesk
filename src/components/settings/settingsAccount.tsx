

import type { UserDetails } from "@/types/settings";


interface SettingsAccountProps {
  details: UserDetails | null;
  settings: boolean;
  setSettings: (value: boolean) => void;
  isMobile: boolean;
}

export default function SettingsAccount({ details, settings, setSettings, isMobile }: SettingsAccountProps) {
    const authServerUrl = process.env.NEXT_PUBLIC_AUTH_URL || "https://auth.arkynox.com";

    return (
        <div className="flex-1 px-4 py-2 pt-5 md:px-8 md:py-4">  
            <div className="flex justify-between items-center mb-8 mt-8">
                <h2 className="text-xl font-bold text-foreground">Account</h2>
                <div className="flex flex-row gap-3 items-center">
                    <a
                        href={`${authServerUrl}/signin`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-primary hover:text-primary/80 px-3 py-2"
                    >
                        Manage Account →
                    </a>
                </div>
            </div>

            {/* Email */}
            <div className="mb-6">
                <label className="block text-sm text-muted-foreground mb-1">Email Address</label>
                <input 
                    type="text" 
                    className="w-full mt-1 p-2 border border-border rounded-lg bg-muted/50 cursor-not-allowed" 
                    value={details?.email || 'Not available'} 
                    readOnly
                />
                <p className="text-xs text-muted-foreground mt-1">
                    Manage your email and password from the{" "}
                    <a
                        href={`${authServerUrl}/signin`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline underline-offset-4"
                    >
                        Arkynox account settings
                    </a>.
                </p>
            </div>

            {/* Account Created */}
            <div className="mb-6">
                <label className="block text-sm text-muted-foreground mb-1">Account Created</label>
                <input 
                    type="text" 
                    className="w-full mt-1 p-2 border border-border rounded-lg bg-muted/50 cursor-not-allowed" 
                    value={details?._id ? new Date(parseInt(details._id.toString().substring(0,8), 16)*1000).toLocaleDateString() : 'Unknown'} 
                    readOnly
                />
            </div>

            {/* User ID */}
            <div className="mb-6">
                <label className="block text-sm text-muted-foreground mb-1">User ID</label>
                <input 
                    type="text" 
                    className="w-full mt-1 p-2 border border-border rounded-lg bg-muted/50 cursor-not-allowed font-mono text-sm" 
                    value={details?._id || 'Not available'} 
                    readOnly
                />
                <p className="text-xs text-muted-foreground mt-1">
                    This is your unique identifier in the system.
                </p>
            </div>

            {/* Security Info */}
            <div className="bg-muted/40 border border-border p-4 rounded-lg">
                <h3 className="text-sm font-medium text-foreground mb-2">Security Tips</h3>
                <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Use a strong password with at least 8 characters</li>
                    <li>• Include numbers, letters, and special characters</li>
                    <li>• Don&apos;t share your password with others</li>
                    <li>• Change your password regularly</li>
                </ul>
            </div>
        </div>
    );
}
