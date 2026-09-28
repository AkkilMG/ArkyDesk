
// settingsDangerous
import { useState } from "react";
import type { Message } from "@/types/settings";

interface SettingsDangerousProps {
  settings: boolean;
  setSettings: (value: boolean) => void;
  isMobile: boolean;
}

export default function SettingsDangerous({ settings, setSettings, isMobile }: SettingsDangerousProps) {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteConfirmText, setDeleteConfirmText] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<Message>({ type: '', text: '' });

    const handleDeleteRequest = () => {
        setShowDeleteConfirm(true);
        setDeleteConfirmText('');
        setPassword('');
        setMessage({ type: '', text: '' });
    };

    const handleDeleteCancel = () => {
        setShowDeleteConfirm(false);
        setDeleteConfirmText('');
        setPassword('');
        setMessage({ type: '', text: '' });
    };

    const handleDeleteConfirm = async () => {
        if (deleteConfirmText !== 'DELETE') {
            setMessage({ type: 'error', text: 'Please type "DELETE" to confirm account deletion' });
            return;
        }

        if (password.length < 8) {
            setMessage({ type: 'error', text: 'Enter your current password to confirm.' });
            return;
        }

        setIsLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const response = await fetch('/api/auth/delete-account', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                // The server re-authenticates with this before deleting anything.
                body: JSON.stringify({ password, confirm: password }),
            });

            const data = await response.json();

            if (data.success) {
                setMessage({ type: 'success', text: 'Account deleted. You will be logged out shortly.' });
                setPassword('');
                
                // Redirect to login after a delay
                setTimeout(() => {
                    window.location.href = '/signin';
                }, 2000);
            } else {
                setMessage({ type: 'error', text: data.message || 'Failed to delete account' });
            }
        } catch (error) {
            console.error('Error deleting account:', error);
            setMessage({ type: 'error', text: 'Network error. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex-1 px-4 py-2 pt-5 md:px-8 md:py-4">
            <div className="flex justify-between items-center mb-8 mt-8">
                <h2 className="text-xl font-bold text-destructive">Danger Zone</h2>
            </div>

            {/* Message Display */}
            {message.text && (
                <div className={`mb-4 p-3 rounded-lg ${
                    message.type === 'success' 
                        ? 'bg-success/10 text-success border border-success/30' 
                        : 'bg-destructive/10 text-destructive border border-destructive/25'
                }`}>
                    {message.text}
                </div>
            )}

            {/* Warning Box */}
            <div className="bg-destructive/10 border border-destructive/25 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-destructive" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-destructive">
                            Warning: Irreversible Actions
                        </h3>
                        <div className="mt-2 text-sm text-destructive">
                            <p>The actions in this section are permanent and cannot be undone. Please proceed with caution.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Account Section */}
            <div className="border border-destructive/25 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-medium text-destructive mb-2">Delete Account</h3>
                <p className="text-sm text-muted-foreground mb-4">
                    Once you delete your account, there is no going back. This will permanently delete your:
                </p>
                <ul className="text-sm text-muted-foreground mb-4 list-disc list-inside space-y-1">
                    <li>Profile information</li>
                    <li>All created tickets</li>
                    <li>Account preferences</li>
                    <li>Access to the platform</li>
                </ul>

                {!showDeleteConfirm ? (
                    <button 
                        onClick={handleDeleteRequest}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90 font-medium py-3 sm:py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-destructive/40"
                    >
                        Request Account Deletion
                    </button>
                ) : (
                    <div className="bg-muted/40 p-4 rounded-lg border border-border">
                        <p className="text-sm text-foreground mb-3">
                            This action cannot be undone. Type <strong>DELETE</strong> and enter your current
                            password to confirm:
                        </p>
                        <input 
                            type="text"
                            value={deleteConfirmText}
                            onChange={(e) => setDeleteConfirmText(e.target.value)}
                            className="w-full p-2 border border-border rounded-lg mb-3 bg-card text-foreground placeholder:text-muted-foreground focus:border-destructive/60 focus:ring-2 focus:ring-destructive/30 focus:outline-none"
                            placeholder="Type DELETE to confirm"
                            aria-label="Type DELETE to confirm"
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border border-border rounded-lg mb-3 bg-card text-foreground placeholder:text-muted-foreground focus:border-destructive/60 focus:ring-2 focus:ring-destructive/30 focus:outline-none"
                            placeholder="Your current password"
                            aria-label="Your current password"
                            autoComplete="current-password"
                        />
                        <div className="flex gap-3">
                            <button 
                                onClick={handleDeleteCancel}
                                className="px-4 py-3 sm:py-2 text-sm font-medium text-foreground hover:bg-muted border border-border rounded-lg"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleDeleteConfirm}
                                disabled={isLoading || deleteConfirmText !== 'DELETE' || password.length < 8}
                                className="px-4 py-3 sm:py-2 text-sm font-medium text-destructive-foreground bg-destructive hover:bg-destructive/90 disabled:opacity-60 rounded-lg"
                            >
                                {isLoading ? 'Deleting...' : 'Confirm Deletion'}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Data Export Section - Disabled for now */}
            <div className="border border-border rounded-lg p-6 bg-muted/40">
                <h3 className="text-lg font-medium text-muted-foreground mb-2">Export Data</h3>
                <p className="text-sm text-muted-foreground mb-4">
                    Download a copy of your data before deleting your account.
                </p>
                <button 
                    disabled 
                    className="bg-muted text-muted-foreground font-medium py-2 px-4 rounded-lg cursor-not-allowed"
                    title="Feature coming soon"
                >
                    Export Data (Coming Soon)
                </button>
            </div>
        </div>
    );
}