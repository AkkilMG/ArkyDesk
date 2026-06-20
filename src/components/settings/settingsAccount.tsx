


// export default function SettingsAccount({ settings, setSettings }: any) {
//     return (
//         <div className="flex-1 px-8 py-4 shadow-md">  
//             <div className="flex flex-col items-end pb-5">
//                 <button onClick={(e) => setSettings(false)} type="button" className="text-gray-500 hover:text-gray-900 shadow-lg rounded-lg p-1">
//                     <img src="/icons/close.svg" className="h-4 w-4" alt="Close" />
//                 </button>
//             </div>
//             <div className="flex justify-between items-center mb-8">
//                 <h2 className="text-xl font-bold">Account</h2>
//                 <button className="text-sm font-medium text-gray-600 hover:text-gray-800">Edit</button>
//             </div>
//             <div className="mb-4">
//                 <label className="block text-sm text-gray-600">Email</label>
//                 <input type="text" className="w-full mt-1 p-2 border rounded bg-gray-100 cursor-not-allowed" value="akkilcharanmg@gmail.com" readOnly />
//                 <p className="text-xs text-blue-600 mt-1">Please contact the administrator to change your email.</p>
//             </div>
//         </div>
//     );
// }


// settingsAccount
import { useState } from "react";
import type { UserDetails, Message, PasswordChangeForm } from "@/types/settings";

interface SettingsAccountProps {
  details: UserDetails | null;
  settings: boolean;
  setSettings: (value: boolean) => void;
  isMobile: boolean;
}

export default function SettingsAccount({ details, settings, setSettings, isMobile }: SettingsAccountProps) {
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [passwordForm, setPasswordForm] = useState<PasswordChangeForm>({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<Message>({ type: '', text: '' });

    const handlePasswordChange = () => {
        setIsChangingPassword(true);
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setMessage({ type: '', text: '' });
    };

    const handlePasswordCancel = () => {
        setIsChangingPassword(false);
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setMessage({ type: '', text: '' });
    };

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
            setMessage({ type: 'error', text: 'All password fields are required' });
            return;
        }

        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            setMessage({ type: 'error', text: 'New passwords do not match' });
            return;
        }

        if (passwordForm.newPassword.length < 6) {
            setMessage({ type: 'error', text: 'New password must be at least 6 characters long' });
            return;
        }

        setIsLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const response = await fetch('/api/auth/change-password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    currentPassword: passwordForm.currentPassword,
                    newPassword: passwordForm.newPassword,
                }),
            });

            const data = await response.json();

            if (data.success) {
                setMessage({ type: 'success', text: 'Password changed successfully!' });
                setIsChangingPassword(false);
                setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
                
                // Clear success message after 3 seconds
                setTimeout(() => {
                    setMessage({ type: '', text: '' });
                }, 3000);
            } else {
                setMessage({ type: 'error', text: data.message || 'Failed to change password' });
            }
        } catch (error) {
            console.error('Error changing password:', error);
            setMessage({ type: 'error', text: 'Network error. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setPasswordForm(prev => ({ ...prev, [field]: value }));
        // Clear error message when user starts typing
        if (message.type === 'error') {
            setMessage({ type: '', text: '' });
        }
    };

    return (
        <div className="flex-1 px-4 py-2 pt-5 md:px-8 md:py-4">  
            <div className="flex justify-between items-center mb-8 mt-8">
                <h2 className="text-xl font-bold">Account</h2>
                <div className="flex flex-row gap-3 items-center">
                    {!isChangingPassword && (
                        <button 
                            onClick={handlePasswordChange}
                            className="text-sm font-medium text-blue-600 hover:text-blue-800 px-3 py-2"
                        >
                            Change Password
                        </button>
                    )}
                </div>
            </div>

            {/* Message Display */}
            {message.text && (
                <div className={`mb-4 p-3 rounded ${
                    message.type === 'success' 
                        ? 'bg-green-100 text-green-700 border border-green-200' 
                        : 'bg-red-100 text-red-700 border border-red-200'
                }`}>
                    {message.text}
                </div>
            )}

            {/* Email */}
            <div className="mb-6">
                <label className="block text-sm text-gray-600 mb-1">Email Address</label>
                <input 
                    type="text" 
                    className="w-full mt-1 p-2 border rounded bg-gray-100 cursor-not-allowed" 
                    value={details?.email || 'Not available'} 
                    readOnly
                />
                <p className="text-xs text-blue-600 mt-1">
                    Please contact the administrator to change your email address.
                </p>
            </div>

            {/* Account Created */}
            <div className="mb-6">
                <label className="block text-sm text-gray-600 mb-1">Account Created</label>
                <input 
                    type="text" 
                    className="w-full mt-1 p-2 border rounded bg-gray-100 cursor-not-allowed" 
                    value={details?._id ? new Date(parseInt(details._id.toString().substring(0,8), 16)*1000).toLocaleDateString() : 'Unknown'} 
                    readOnly
                />
            </div>

            {/* User ID */}
            <div className="mb-6">
                <label className="block text-sm text-gray-600 mb-1">User ID</label>
                <input 
                    type="text" 
                    className="w-full mt-1 p-2 border rounded bg-gray-100 cursor-not-allowed font-mono text-sm" 
                    value={details?._id || 'Not available'} 
                    readOnly
                />
                <p className="text-xs text-gray-500 mt-1">
                    This is your unique identifier in the system.
                </p>
            </div>

            {/* Password Change Section */}
            {isChangingPassword && (
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h3 className="text-lg font-medium mb-4">Change Password</h3>
                    <form onSubmit={handlePasswordSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm text-gray-600 mb-1">Current Password</label>
                            <input 
                                type="password" 
                                className="w-full mt-1 p-2 border rounded focus:border-blue-500 focus:outline-none" 
                                value={passwordForm.currentPassword}
                                onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                                placeholder="Enter your current password"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm text-gray-600 mb-1">New Password</label>
                            <input 
                                type="password" 
                                className="w-full mt-1 p-2 border rounded focus:border-blue-500 focus:outline-none" 
                                value={passwordForm.newPassword}
                                onChange={(e) => handleInputChange('newPassword', e.target.value)}
                                placeholder="Enter your new password (min 6 characters)"
                                minLength={6}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm text-gray-600 mb-1">Confirm New Password</label>
                            <input 
                                type="password" 
                                className="w-full mt-1 p-2 border rounded focus:border-blue-500 focus:outline-none" 
                                value={passwordForm.confirmPassword}
                                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                placeholder="Confirm your new password"
                                minLength={6}
                                required
                            />
                        </div>
                        <div className="flex gap-3">
                            <button 
                                type="button"
                                onClick={handlePasswordCancel}
                                className="px-4 py-3 sm:py-2 text-sm font-medium text-gray-600 hover:text-gray-800 border border-gray-300 rounded"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit"
                                disabled={isLoading}
                                className="px-4 py-3 sm:py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 rounded"
                            >
                                {isLoading ? 'Changing...' : 'Change Password'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Security Info */}
            <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-blue-800 mb-2">Security Tips</h3>
                <ul className="text-xs text-blue-700 space-y-1">
                    <li>• Use a strong password with at least 8 characters</li>
                    <li>• Include numbers, letters, and special characters</li>
                    <li>• Don't share your password with others</li>
                    <li>• Change your password regularly</li>
                </ul>
            </div>
        </div>
    );
}
