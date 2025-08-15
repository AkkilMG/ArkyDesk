import { useState, useEffect } from "react";
import type { UserDetails, Message } from "@/types/settings";

interface UserManagementProps {
  settings: boolean;
  setSettings: (value: boolean) => void;
  isMobile: boolean;
}

interface UserAction {
  id: string;
  type: 'flag' | 'admin' | 'delete';
  status: 'pending' | 'approved' | 'rejected';
  requestedAt: Date;
  requestedBy: string;
  user: UserDetails;
  reason?: string;
}

export default function UserManagement({ settings, setSettings, isMobile }: UserManagementProps) {
    const [users, setUsers] = useState<UserDetails[]>([]);
    const [pendingActions, setPendingActions] = useState<UserAction[]>([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<Message>({ type: '', text: '' });
    const [selectedUser, setSelectedUser] = useState<UserDetails | null>(null);
    const [actionType, setActionType] = useState<'flag' | 'admin' | 'delete' | null>(null);
    const [actionReason, setActionReason] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'flagged' | 'admin'>('all');

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/admin/users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (data.success) {
                setUsers(data.users);
                setPendingActions(data.pendingActions || []);
            } else {
                setMessage({ type: 'error', text: data.message || 'Failed to fetch users' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Network error. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const handleUserAction = async (type: 'flag' | 'admin' | 'delete', user: UserDetails, reason?: string) => {
        try {
            const response = await fetch('/api/admin/user-action', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user._id,
                    action: type,
                    reason: reason || '',
                }),
            });
            
            const data = await response.json();
            if (data.success) {
                setMessage({ type: 'success', text: `${type} request submitted successfully` });
                fetchUsers(); // Refresh data
                setSelectedUser(null);
                setActionType(null);
                setActionReason('');
            } else {
                setMessage({ type: 'error', text: data.message || 'Action failed' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Network error. Please try again.' });
        }
    };

    const handleApproveReject = async (actionId: string, approved: boolean) => {
        try {
            const response = await fetch('/api/admin/approve-action', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    actionId,
                    approved,
                }),
            });
            
            const data = await response.json();
            if (data.success) {
                setMessage({ 
                    type: 'success', 
                    text: `Action ${approved ? 'approved' : 'rejected'} successfully` 
                });
                fetchUsers(); // Refresh data
            } else {
                setMessage({ type: 'error', text: data.message || 'Failed to process action' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Network error. Please try again.' });
        }
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            user.email?.toLowerCase().includes(searchTerm.toLowerCase());
        
        if (filterStatus === 'all') return matchesSearch;
        if (filterStatus === 'admin') return matchesSearch && user.admin;
        if (filterStatus === 'flagged') return matchesSearch && user.flagged;
        if (filterStatus === 'active') return matchesSearch && !user.flagged && !user.admin;
        
        return matchesSearch;
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="flex-1 px-4 py-4 pt-5 md:px-8 md:py-4 h-full overflow-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h2 className="text-xl font-bold hidden sm:block">User Management</h2>
                <button 
                    onClick={fetchUsers}
                    disabled={loading}
                    className="text-sm font-medium text-blue-600 hover:text-blue-800 disabled:text-gray-400 self-end sm:self-auto"
                >
                    {loading ? 'Refreshing...' : 'Refresh'}
                </button>
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

            {/* Search and Filters */}
            <div className="mb-6 flex flex-col gap-3">
                <input
                    type="text"
                    placeholder="Search users by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:border-blue-500 focus:outline-none text-sm"
                />
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as any)}
                    className="w-full sm:w-auto px-3 py-2 border rounded-lg focus:border-blue-500 focus:outline-none text-sm"
                >
                    <option value="all">All Users</option>
                    <option value="active">Active Users</option>
                    <option value="admin">Administrators</option>
                    <option value="flagged">Flagged Users</option>
                </select>
            </div>

            {/* Pending Actions */}
            {pendingActions.length > 0 && (
                <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-yellow-800 mb-3">Pending Actions</h3>
                    <div className="space-y-3">
                        {pendingActions.map((action) => (
                            <div key={action.id} className="bg-white p-3 rounded border">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                    <div className="flex-1">
                                        <div className="flex flex-wrap items-center gap-2 mb-2">
                                            <span className="font-medium text-sm">{action.user.name}</span>
                                            <span className="text-gray-500 text-xs">({action.user.email})</span>
                                            <span className={`px-2 py-1 text-xs rounded ${
                                                action.type === 'flag' ? 'bg-orange-100 text-orange-800' :
                                                action.type === 'admin' ? 'bg-blue-100 text-blue-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                                {action.type.toUpperCase()}
                                            </span>
                                        </div>
                                        {action.reason && <div className="text-sm text-gray-600">Reason: {action.reason}</div>}
                                    </div>
                                    <div className="flex gap-2 justify-end">
                                        <button
                                            onClick={(e) => handleApproveReject(action.id, true)}
                                            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={(e) => handleApproveReject(action.id, false)}
                                            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Users List - Mobile Cards / Desktop Table */}
            <div className="bg-white rounded-lg border overflow-hidden">
                {/* Mobile View - Cards */}
                <div className="block sm:hidden">
                    {filteredUsers.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">No users found</div>
                    ) : (
                        <div className="divide-y divide-gray-200">
                            {filteredUsers.map((user) => (
                                <div key={user._id} className="p-4">
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
                                            {user.name?.charAt(0).toUpperCase() || '?'}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="font-medium text-sm text-gray-900 truncate">{user.name}</div>
                                            <div className="text-xs text-gray-500 truncate">{user.email}</div>
                                            <div className="flex flex-wrap gap-1 mt-2">
                                                {user.admin && (
                                                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                                        Admin
                                                    </span>
                                                )}
                                                {user.flagged && (
                                                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                                                        Flagged
                                                    </span>
                                                )}
                                                {!user.admin && !user.flagged && (
                                                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                                        Active
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-xs text-gray-600 mb-3">
                                        <div>Tickets: {user.tickets || 0} total / {user.closedTickets || 0} closed</div>
                                        <div>Joined: {user._id ? new Date(parseInt(user._id.substring(0,8), 16)*1000).toLocaleDateString() : 'Unknown'}</div>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {!user.flagged && !user.admin && (
                                            <button
                                                onClick={(e) => {
                                                    setSelectedUser(user);
                                                    setActionType('flag');
                                                }}
                                                className="flex-1 min-w-0 text-orange-600 hover:text-orange-900 text-xs bg-orange-50 hover:bg-orange-100 px-2 py-1 rounded border border-orange-200"
                                            >
                                                Flag
                                            </button>
                                        )}
                                        {!user.admin && (
                                            <button
                                                onClick={(e) => {
                                                    setSelectedUser(user);
                                                    setActionType('admin');
                                                }}
                                                className="flex-1 min-w-0 text-blue-600 hover:text-blue-900 text-xs bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded border border-blue-200"
                                            >
                                                Make Admin
                                            </button>
                                        )}
                                        {!user.admin && (
                                            <button
                                                onClick={(e) => {
                                                    setSelectedUser(user);
                                                    setActionType('delete');
                                                }}
                                                className="flex-1 min-w-0 text-red-600 hover:text-red-900 text-xs bg-red-50 hover:bg-red-100 px-2 py-1 rounded border border-red-200"
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Desktop View - Table */}
                <div className="hidden sm:block overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tickets</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredUsers.map((user) => (
                                <tr key={user._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                                                {user.name?.charAt(0).toUpperCase() || '?'}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                <div className="text-sm text-gray-500">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex flex-col gap-1">
                                            {user.admin && (
                                                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                                    Admin
                                                </span>
                                            )}
                                            {user.flagged && (
                                                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                                                    Flagged
                                                </span>
                                            )}
                                            {!user.admin && !user.flagged && (
                                                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                                    Active
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {user.tickets || 0} total / {user.closedTickets || 0} closed
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {user._id ? new Date(parseInt(user._id.substring(0,8), 16)*1000).toLocaleDateString() : 'Unknown'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end gap-2">
                                            {!user.flagged && !user.admin && (
                                                <button
                                                    onClick={(e) => {
                                                        setSelectedUser(user);
                                                        setActionType('flag');
                                                    }}
                                                    className="text-orange-600 hover:text-orange-900 text-sm"
                                                >
                                                    Flag
                                                </button>
                                            )}
                                            {!user.admin && (
                                                <button
                                                    onClick={(e) => {
                                                        setSelectedUser(user);
                                                        setActionType('admin');
                                                    }}
                                                    className="text-blue-600 hover:text-blue-900 text-sm"
                                                >
                                                    Make Admin
                                                </button>
                                            )}
                                            {!user.admin && (
                                                <button
                                                    onClick={(e) => {
                                                        setSelectedUser(user);
                                                        setActionType('delete');
                                                    }}
                                                    className="text-red-600 hover:text-red-900 text-sm"
                                                >
                                                    Delete
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Action Modal */}
            {selectedUser && actionType && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <h3 className="text-lg font-semibold mb-4">
                            {actionType === 'flag' ? 'Flag User' : 
                             actionType === 'admin' ? 'Make Administrator' : 'Delete User'}
                        </h3>
                        <p className="text-gray-600 mb-4 text-sm">
                            Are you sure you want to {actionType} <strong>{selectedUser.name}</strong>?
                            {actionType === 'delete' && ' This action will preserve their email and tickets but deactivate the account.'}
                        </p>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Reason (optional)
                            </label>
                            <textarea
                                value={actionReason}
                                onChange={(e) => setActionReason(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg focus:border-blue-500 focus:outline-none text-sm"
                                rows={3}
                                placeholder="Provide a reason for this action..."
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row justify-end gap-3">
                            <button
                                onClick={(e) => {
                                    setSelectedUser(null);
                                    setActionType(null);
                                    setActionReason('');
                                }}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={(e) => handleUserAction(actionType, selectedUser, actionReason)}
                                className={`px-4 py-2 text-white rounded text-sm ${
                                    actionType === 'flag' ? 'bg-orange-600 hover:bg-orange-700' :
                                    actionType === 'admin' ? 'bg-blue-600 hover:bg-blue-700' :
                                    'bg-red-600 hover:bg-red-700'
                                }`}
                            >
                                Confirm {actionType === 'flag' ? 'Flag' : actionType === 'admin' ? 'Promote' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
