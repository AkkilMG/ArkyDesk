'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SideNav from "@/components/dashboard/sideNav";
import AccountSettings from "@/components/settings/settings";
import UserManagement from "@/components/settings/userManagement";
import type { UserDetails } from "@/types/settings";

export default function AdminUsersPage() {
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [settings, setSettings] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        async function checkAdminAccess() {
            try {
                const res = await fetch('/api/auth/verify', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await res.json();
                
                if (data.success && data.admin) {
                    setIsAdmin(true);
                    // Get user details
                    const detailsRes = await fetch('/api/auth/details', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    const detailsData = await detailsRes.json();
                    if (detailsData.success) {
                        setUserDetails(detailsData.details);
                    }
                } else {
                    setIsAdmin(false);
                    router.push('/dashboard');
                }
            } catch (error) {
                console.error('Error checking admin access:', error);
                setIsAdmin(false);
                router.push('/dashboard');
            } finally {
                setLoading(false);
            }
        }

        checkAdminAccess();
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-2 text-gray-600">Verifying access...</p>
                </div>
            </div>
        );
    }

    if (!isAdmin) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h1>
                    <p className="text-gray-600">You need administrator privileges to access this page.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Settings Modal */}
            <AccountSettings 
                details={userDetails} 
                settings={settings} 
                setSettings={setSettings} 
            />
            
            {/* Mobile Header */}
            <div className="sm:hidden bg-white shadow-sm border-b">
                <div className="flex items-center justify-between px-4 py-3">
                    <h1 className="text-lg font-semibold text-gray-800">User Management</h1>
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="p-2 rounded-lg hover:bg-gray-100"
                    >
                        <img src="/icons/menu.svg" alt="Menu" className="h-6 w-6" />
                    </button>
                </div>
            </div>

            <div className="flex h-screen bg-gray-50 overflow-hidden">
                {/* Side Navigation */}
                <div className="hidden sm:block sm:w-64 lg:w-72 xl:w-80 shadow-xl bg-white flex-shrink-0">
                    <SideNav 
                        create={() => {}} 
                        setCreate={() => {}} 
                        settings={settings} 
                        setSettings={setSettings}
                        isMobileMenuOpen={isMobileMenuOpen}
                        setIsMobileMenuOpen={setIsMobileMenuOpen}
                    />
                </div>

                {/* Mobile Navigation Overlay */}
                <div className="sm:hidden">
                    <SideNav 
                        create={() => {}} 
                        setCreate={() => {}} 
                        settings={settings} 
                        setSettings={setSettings}
                        isMobileMenuOpen={isMobileMenuOpen}
                        setIsMobileMenuOpen={setIsMobileMenuOpen}
                    />
                </div>
                
                {/* Main Content */}
                <div className="flex-1 bg-gray-50 h-screen overflow-hidden min-w-0">
                    <UserManagement 
                        settings={true} 
                        setSettings={() => {}} 
                        isMobile={true}
                    />
                </div>
            </div>
        </div>
    );
}
