


// export default function SettingsProfile({ settings, setSettings }: any) {
//     return (
//         <div className="flex-1 px-8 py-4 shadow-md">  
//             <div className="flex flex-col items-end pb-5">
//                 <button onClick={(e) => setSettings(false)} type="button" className="text-gray-500 hover:text-gray-900 shadow-lg rounded-lg p-1">
//                     <img src="/icons/close.svg" className="h-4 w-4" alt="Close" />
//                 </button>
//             </div>
//             <div className="flex justify-between items-center mb-8">
//                 <h2 className="text-xl font-bold">Profile</h2>
//                 <button className="text-sm font-medium text-gray-600 hover:text-gray-800">Edit</button>
//             </div>
//             <div className="flex items-center mb-6">
//                 <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center text-white text-lg font-semibold">
//                 M
//                 </div>
//                 <div className="ml-4">
//                     <h3 className="text-lg font-medium">Akkil M G</h3>
//                     {/* <p className="text-sm text-gray-500">Admin</p> */}
//                 </div>
//                 <button className="ml-auto bg-gray-200 text-gray-600 text-sm px-4 py-2 rounded">Upload Avatar</button>
//             </div>

//             {/* Full Name */}
//             <div className="mb-4">
//                 <label className="block text-sm text-gray-600">Full Name</label>
//                 <input type="text" className="w-full mt-1 p-2 border rounded" value="Akkil M G" readOnly />
//             </div>
//         </div>
//     );
// }


// settingsProfile
import { useState } from "react";
import type { UserDetails, Message } from "@/types/settings";

interface SettingsProfileProps {
  details: UserDetails | null;
  settings: boolean;
  setSettings: (value: boolean) => void;
  isMobile: boolean;
}

export default function SettingsProfile({ details, settings, setSettings, isMobile }: SettingsProfileProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(details?.name || '');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<Message>({ type: '', text: '' });

    const handleEdit = () => {
        setIsEditing(true);
        setEditedName(details?.name || '');
        setMessage({ type: '', text: '' });
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedName(details?.name || '');
        setMessage({ type: '', text: '' });
    };

    const handleSave = async () => {
        if (!editedName.trim()) {
            setMessage({ type: 'error', text: 'Name cannot be empty' });
            return;
        }

        setIsLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const response = await fetch('/api/auth/update-profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: editedName.trim(),
                }),
            });

            const data = await response.json();

            if (data.success) {
                setMessage({ type: 'success', text: 'Profile updated successfully!' });
                setIsEditing(false);
                // Update the details in parent component
                if (details) {
                    details.name = editedName.trim();
                }
                
                // Clear success message after 3 seconds
                setTimeout(() => {
                    setMessage({ type: '', text: '' });
                }, 3000);
            } else {
                setMessage({ type: 'error', text: data.message || 'Failed to update profile' });
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            setMessage({ type: 'error', text: 'Network error. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex-1 px-4 py-2 pt-5 md:px-8 md:py-4">  
            <div className="flex justify-between items-center mb-8 mt-8">
                <h2 className="text-xl font-bold">Profile</h2>
                <div className="flex flex-row gap-3 items-center">
                    {isEditing ? (
                        <>
                            <button 
                                onClick={handleCancel}
                                className="text-sm font-medium text-gray-600 hover:text-gray-800 px-3 py-2 sm:py-1 border border-gray-300 rounded"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleSave}
                                disabled={isLoading}
                                className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 px-3 py-2 sm:py-1 rounded"
                            >
                                {isLoading ? 'Saving...' : 'Save'}
                            </button>
                        </>
                    ) : (
                        <button 
                            onClick={handleEdit}
                            className="text-sm font-medium text-blue-600 hover:text-blue-800"
                        >
                            Edit
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

            <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-lg font-semibold">
                    {details?.name ? details.name.charAt(0).toUpperCase() : '?'}
                </div>
                <div className="ml-4">
                    <h3 className="text-lg font-medium">{details?.name || 'User'}</h3>
                    <p className="text-sm text-gray-500">
                        {details?.tickets !== undefined ? `${details.tickets} tickets created` : 'No tickets yet'}
                    </p>
                </div>
                <button 
                    disabled 
                    className="ml-auto bg-gray-200 text-gray-600 text-sm px-4 py-2 rounded cursor-not-allowed"
                    title="Avatar upload feature coming soon"
                >
                    Upload Avatar
                </button>
            </div>

            {/* Full Name */}
            <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-1">Full Name</label>
                {isEditing ? (
                    <input 
                        type="text" 
                        className="w-full mt-1 p-2 border rounded focus:border-blue-500 focus:outline-none" 
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        placeholder="Enter your full name"
                        maxLength={100}
                    />
                ) : (
                    <input 
                        type="text" 
                        className="w-full mt-1 p-2 border rounded bg-gray-50" 
                        value={details?.name || 'Not set'} 
                        readOnly 
                    />
                )}
            </div>

            {/* Additional Profile Info */}
            <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-1">Email</label>
                <input 
                    type="email" 
                    className="w-full mt-1 p-2 border rounded bg-gray-50" 
                    value={details?.email || 'Not available'} 
                    readOnly 
                />
                <p className="text-xs text-gray-500 mt-1">
                    Email cannot be changed. Contact administrator if needed.
                </p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                        {details?.tickets || 0}
                    </div>
                    <div className="text-sm text-gray-600">Total Tickets</div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                        {details?.closedTickets || 0}
                    </div>
                    <div className="text-sm text-gray-600">Closed Tickets</div>
                </div>
            </div>
        </div>
    );
}
