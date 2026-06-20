"use client";

import { useEffect, useState } from "react";
import Shimmer from '@/components/ui/Shimmer';
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import PrivacySettings from "../ui/PrivacySettings";

export default function SideNav({ create, setCreate, settings, setSettings, isMobileMenuOpen, setIsMobileMenuOpen }: any) {
    interface Details {
        name: string;
        guest?: boolean;
        temporary?: boolean;
    }

    const [details, setDetails] = useState<Details | null>(null);
    const [loadingDetails, setLoadingDetails] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    useEffect(() => {
        let cancelled = false;
        async function getDetails() {
            try {
                const res = await fetch("/api/auth/details", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });
                const data = await res.json();
                if (!cancelled) {
                    if (data.success) {
                        setDetails(data.details);
                    } else {
                        console.error("details failed:", data.message);
                        setDetails({} as Details);
                    }
                }
            } catch (error) {
                if (!cancelled) {
                    console.error("Error during details:", error);
                    setDetails({} as Details);
                }
            } finally {
                if (!cancelled) setLoadingDetails(false);
            }
        }
        getDetails();
        return () => { cancelled = true; };
    }, []);

    async function signOut() {
        try {
            const res = await fetch('/api/auth/signout', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
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
    const [adminLoading, setAdminLoading] = useState(true);
    useEffect(() => {
        let cancelled = false;
        async function handleNav() {
            try {
                const res = await fetch('/api/auth/verify', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });
                const data = await res.json();
                if (!cancelled) {
                    setAdmin(data.success ? (data.admin || false) : false);
                }
            } catch (error) {
                if (!cancelled) {
                    console.error('Error verify out:', error);
                    setAdmin(false);
                }
            } finally {
                if (!cancelled) setAdminLoading(false);
            }
        }
        handleNav();
        return () => { cancelled = true; };
    }, []);

    const navLinkClass = (path: string) =>
        `flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 text-sm sm:text-base group ${
            isActive(path)
                ? 'bg-purple-50 text-purple-700 font-semibold'
                : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
        }`;

    const navIconClass = (path: string) =>
        `h-5 sm:h-6 transition-transform duration-200 ${
            isActive(path) ? 'scale-110' : 'group-hover:scale-110'
        }`;

    const closeMobile = () => {
        if (setIsMobileMenuOpen) setIsMobileMenuOpen(false);
    };

    const content = (
        <div className="h-full flex flex-col">
            <div className="flex items-center justify-between space-x-2 mb-4 min-h-0">
                <div className="flex items-center space-x-3 min-w-0 flex-1">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center flex-shrink-0">
                        {loadingDetails ? (
                            <Shimmer className="h-10 w-10 rounded-full" shape="circle" />
                        ) : (
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-base sm:text-lg shadow-sm">
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
                                <p className="text-xs sm:text-sm text-green-500 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block"></span>
                                    Online
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div onClick={() => { setCreate(true); closeMobile(); }} className="p-3 border-dashed border-2 border-green-600 bg-green-400 rounded-lg mb-4 cursor-pointer transition-all duration-200 hover:bg-green-500 hover:border-green-700 hover:shadow-md active:scale-[0.98]">
                <div className="flex items-center justify-center space-x-2">
                    <img src="/icons/plus-circle.svg" alt="create" className="w-5 h-5 sm:w-6 sm:h-6" />
                    <p className="font-medium text-base sm:text-lg text-white">
                        {details?.guest || details?.temporary ? 'Report an Issue' : 'Create Ticket'}
                    </p>
                </div>
            </div>

            <hr className="text-gray-300 mb-4" />

            <nav className="flex-1 overflow-y-auto" aria-label="Main navigation">
                <ul className="space-y-1">
                    {adminLoading ? (
                        <>
                            <li><Shimmer className="h-11 w-full rounded-lg" variant="card" /></li>
                            <li><Shimmer className="h-11 w-full rounded-lg" variant="card" /></li>
                        </>
                    ) : (
                        <>
                            {admin && (
                                <li>
                                    <Link href="/dashboard" className={navLinkClass("/dashboard")} onClick={closeMobile}>
                                        <svg className={navIconClass("/dashboard")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                        </svg>
                                        <span>Dashboard</span>
                                    </Link>
                                </li>
                            )}
                            <li>
                                <Link href="/tickets" className={navLinkClass("/tickets")} onClick={closeMobile}>
                                    <svg className={navIconClass("/tickets")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <span>Tickets</span>
                                </Link>
                            </li>
                            {admin && (
                                <>
                                    <li>
                                        <Link href="/admin/users" className={navLinkClass("/admin/users")} onClick={closeMobile}>
                                            <svg className={navIconClass("/admin/users")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m3 4.197V9a3 3 0 00-6 0v2.25" />
                                            </svg>
                                            <span>User Management</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/admin/chat" className={navLinkClass("/admin/chat")} onClick={closeMobile}>
                                            <svg className={navIconClass("/admin/chat")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                            </svg>
                                            <span>Admin Chat</span>
                                        </Link>
                                    </li>
                                </>
                            )}
                        </>
                    )}
                </ul>
            </nav>

            <div className="mt-auto pt-4 border-t border-gray-200">
                {details?.guest || details?.temporary ? (
                    <div className="mb-3 p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
                        <p className="text-xs font-medium text-indigo-900">Guest Account</p>
                        <p className="text-xs text-indigo-700 mt-1">Upgrade to create tickets with full access.</p>
                        <a href="/signup" className="mt-2 inline-block w-full text-center px-3 py-3 sm:py-2 bg-indigo-600 text-white text-sm sm:text-xs rounded-lg hover:bg-indigo-700 transition-colors">
                            Create Account
                        </a>
                    </div>
                ) : null}
                <h4 className="text-gray-400 text-xs sm:text-sm uppercase tracking-wide mb-3 px-1">Profile & Settings</h4>
                <ul className="space-y-1">
                    <li>
                        <Link href="/profile" className={navLinkClass("/profile")} onClick={closeMobile}>
                            <svg className={navIconClass("/profile")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span>Profile</span>
                        </Link>
                    </li>
                    <li onClick={() => setSettings(true)} className="cursor-pointer">
                        <div className="flex items-center space-x-3 text-gray-600 hover:text-purple-600 p-3 rounded-lg hover:bg-purple-50 transition-all duration-200 text-sm sm:text-base group">
                            <svg className="h-5 sm:h-6 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>Settings</span>
                        </div>
                    </li>
                    <PrivacySettings />
                    <li onClick={signOut} className="cursor-pointer">
                        <div className="flex items-center space-x-3 text-gray-600 hover:text-red-600 p-3 rounded-lg hover:bg-red-50 transition-all duration-200 text-sm sm:text-base group">
                            <svg className="h-5 sm:h-6 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span>Sign Out</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop sidebar */}
            <div className="hidden sm:flex flex-col bg-white p-4 lg:p-6 h-full overflow-y-auto">
                {content}
            </div>

            {/* Mobile drawer */}
            <div
                className={`sm:hidden bg-white transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
                } fixed z-50 top-0 left-0 h-full w-5/6 max-w-xs p-4 overflow-y-auto`}
            >
                <div className="flex justify-end mb-4">
                    <button
                        className="focus:outline-none font-semibold p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                        aria-label="Close menu"
                    >
                        <img src="/icons/close.svg" alt="Close" className="h-4 w-4" />
                    </button>
                </div>
                {content}
            </div>

            {/* Mobile overlay */}
            {isMobileMenuOpen && (
                <div
                    className="sm:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
        </>
    );
}
