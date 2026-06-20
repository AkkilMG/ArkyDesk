"use client";

import { useEffect, useState } from "react";
import Shimmer from '@/components/ui/Shimmer';
import { useRouter } from "next/navigation";
import Link from "next/link";
import PrivacySettings from "../ui/PrivacySettings";

export default function SideNav({ create, setCreate, settings, setSettings, isMobileMenuOpen, setIsMobileMenuOpen }: any) {
    return (
        <div>

            {/* Mobile Menu */}
            <div
                className={`sm:hidden bg-white transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"} fixed z-50 top-0 left-0 h-full w-5/6 max-w-xs p-4 overflow-y-auto`}>
                <MenuContent
                    create={create}
                    setCreate={setCreate}
                    settings={settings}
                    setSettings={setSettings}
                    setIsMobileMenuOpen={setIsMobileMenuOpen}
                    isMobileMenuOpen={isMobileMenuOpen}
                />
            </div>

            {/* Backdrop for mobile menu */}
            {isMobileMenuOpen && (
                <div 
                    className="sm:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                ></div>
            )}

            {/* Regular Sidebar for sm and above */}
            <div className="hidden sm:block bg-white p-4 lg:p-6 h-full overflow-y-auto">
                <MenuContent
                    create={create}
                    setCreate={setCreate}
                    settings={settings}
                    setSettings={setSettings}
                />
            </div>
        </div>
    );
}

function MenuContent({ create, setCreate, settings, setSettings, setIsMobileMenuOpen, isMobileMenuOpen }: any) {
    interface Details {
        name: string;
    }

    const [details, setDetails] = useState<Details | null>(null);
    const [loadingDetails, setLoadingDetails] = useState(true);
    const router = useRouter();

    async function getDetails() {
        try {
            const res = await fetch("/api/auth/details", {
                method: "GET",
                headers: {
                "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            if (data.success) {
                setDetails(data.details);
                setLoadingDetails(false);
            } else {
                console.error("details failed:", data.message);
                setLoadingDetails(false);
            }
        } catch (error) {
            console.error("Error during details:", error);
            setLoadingDetails(false);
        }
    }
    useEffect(() => {
        getDetails();
    }, []);

    async function signOut() {
        try {
            const res = await fetch('/api/auth/signout', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            if (data.success) {
                router.push('/signin');
            } else {
                console.error('Sign out failed:', data.message);
            }
        } catch (error) {
            console.error('Error during sign out:', error);
        }
    }

    const [admin, setAdmin] = useState(false);
    async function handleNav() {
        try {
            const res = await fetch('/api/auth/verify', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            if (data.success) {
                if (data.admin) {
                    setAdmin(true);
                } else {
                    setAdmin(false);
                }
            } else {
                console.error('Verify failed:', data.message);
            }
        } catch (error) {
            console.error('Error verify out:', error);
        }
    }

    useEffect(() => {
        handleNav();
    }, []);

    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center justify-between space-x-2 mb-4">
                <div className="flex items-center space-x-3 min-w-0 flex-1">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center flex-shrink-0">
                        {loadingDetails ? (
                            <Shimmer className="h-10 w-10 rounded-full" shape="circle" />
                        ) : (
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-400 flex items-center justify-center text-white font-semibold text-base sm:text-lg">
                                {details?.name ? details?.name?.charAt(0).toUpperCase() : '!'}
                            </div>
                        )}
                    </div>
                    <div className="min-w-0 flex-1">
                        {loadingDetails ? (
                            <div className="space-y-1">
                                <Shimmer className="h-4 w-32 rounded" />
                                <Shimmer className="h-3 w-20 rounded" />
                            </div>
                        ) : (
                            <>
                                <h2 className="font-semibold text-sm sm:text-base truncate">{details?.name ? details?.name : 'Mr. Customer'}</h2>
                                <p className="text-xs sm:text-sm text-green-500">Online</p>
                            </>
                        )}
                    </div>
                </div>
                {isMobileMenuOpen !== undefined && (
                    <button 
                        className="sm:hidden focus:outline-none font-semibold p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex-shrink-0" 
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <img src={isMobileMenuOpen ? "/icons/close.svg" : "/icons/menu.svg"} alt="Toggle Menu" className="h-4 w-4" />
                    </button>
                )}
            </div>

            <div onClick={() => setCreate(true)} className="p-3 border-dashed border-2 border-green-600 bg-green-400 rounded-lg mb-4 cursor-pointer transition-all duration-200 hover:bg-green-500 hover:border-green-700 hover:shadow-md">
                <div className="flex items-center justify-center space-x-2">
                    <img src="/icons/plus-circle.svg" alt="create" className="w-5 h-5 sm:w-6 sm:h-6" />
                    <p className="font-medium text-base sm:text-lg text-white">
                        {details?.guest || details?.temporary ? 'Report an Issue' : 'Create Ticket'}
                    </p>
                </div>
            </div>

            <hr className="text-gray-300 mb-4" />

            <nav className="flex-1 overflow-y-auto">
                <ul className="space-y-1">
                    {admin && (
                        <li>
                            <Link href="/dashboard" className="flex items-center space-x-3 text-gray-600 hover:text-purple-600 p-3 rounded-lg hover:bg-purple-50 transition-all duration-200 text-sm sm:text-base group">
                                <img src="/icons/dashboard.svg" className="h-5 sm:h-6 group-hover:scale-110 transition-transform" />
                                <span>Dashboard</span>
                            </Link>
                        </li>
                    )}
                    <li>
                        <Link href="/tickets" className="flex items-center space-x-3 text-gray-600 hover:text-purple-600 p-3 rounded-lg hover:bg-purple-50 transition-all duration-200 text-sm sm:text-base group">
                            <img src="/icons/ticket.svg" className="h-5 sm:h-6 group-hover:scale-110 transition-transform" />
                            <span>Tickets</span>
                        </Link>
                    </li>
                    {admin && (
                        <>
                            <li>
                                <Link href="/admin/users" className="flex items-center space-x-3 text-gray-600 hover:text-purple-600 p-3 rounded-lg hover:bg-purple-50 transition-all duration-200 text-sm sm:text-base group">
                                    <svg className="h-5 sm:h-6 w-5 sm:w-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m3 4.197V9a3 3 0 00-6 0v2.25" />
                                    </svg>
                                    <span>User Management</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/admin/chat" className="flex items-center space-x-3 text-gray-600 hover:text-purple-600 p-3 rounded-lg hover:bg-purple-50 transition-all duration-200 text-sm sm:text-base group">
                                    <svg className="h-5 sm:h-6 w-5 sm:w-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                    <span>Admin Chat</span>
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>

            <div className="mt-auto pt-4 border-t border-gray-200">
                <h4 className="text-gray-400 text-xs sm:text-sm uppercase tracking-wide mb-3">Profile & Settings</h4>
                <ul className="space-y-1">
                    <li>
                        <Link href="/profile" className="flex items-center space-x-3 text-gray-600 hover:text-purple-600 p-3 rounded-lg hover:bg-purple-50 transition-all duration-200 text-sm sm:text-base group">
                            <img src="/icons/profile.svg" className="h-4 group-hover:scale-110 transition-transform" />
                            <span>Profile</span>
                        </Link>
                    </li>
                    <li onClick={() => setSettings(true)} className="cursor-pointer">
                        <div className="flex items-center space-x-3 text-gray-600 hover:text-purple-600 p-3 rounded-lg hover:bg-purple-50 transition-all duration-200 text-sm sm:text-base group">
                            <img src="/icons/settings.svg" className="h-4 group-hover:scale-110 transition-transform" />
                            <span>Settings</span>
                        </div>
                    </li>
                    {/* <li>
                        <PrivacySettings />
                    </li> */}
                    <li onClick={signOut} className="cursor-pointer">
                        <div className="flex items-center space-x-3 text-gray-600 hover:text-red-600 p-3 rounded-lg hover:bg-red-50 transition-all duration-200 text-sm sm:text-base group">
                            <img src="/icons/signout.svg" className="h-4 group-hover:scale-110 transition-transform" />
                            <span>Sign Out</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}
