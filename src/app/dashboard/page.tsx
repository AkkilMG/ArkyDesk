"use client";

import { useRouter } from "next/navigation";
import MainLayout from "@/components/dashboard/main";
import SideNav from "@/components/dashboard/sideNav";
import AccountSettings from "@/components/settings/settings";
import TicketCreate from "@/components/ticket/create";
import { useEffect, useState } from "react";
import Shimmer from "@/components/ui/Shimmer";


export default function Dashboard() {
    const [create, setCreate] = useState(false);
    const [settings, setSettings] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const auth = true;
    const router = useRouter();
    
    useEffect(() => {
        if (!auth) {
            router.push("/signin");
        }
    }, [auth, router]);

    const [admin, setAdmin] = useState(false);
    const [adminLoading, setAdminLoading] = useState(true);
    const [pageLoading, setPageLoading] = useState(true);
    
    async function handleAdmin() {
        try {
            setAdminLoading(true);
            const res = await fetch('/api/auth/verify', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            if (data.success) {
                setAdmin(data.admin || false);
            } else {
                console.error('Verify failed:', data.message);
                setAdmin(false);
            }
        } catch (error) {
            console.error('Error verify out:', error);
            setAdmin(false);
        } finally {
            setAdminLoading(false);
            setPageLoading(false);
        }
    }

    useEffect(() => {
        handleAdmin();
    }, []);

    // Periodically refresh session to keep it alive
    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                await fetch('/api/auth/refresh', { method: 'GET' });
            } catch {
                // Silently fail - session will expire eventually
            }
        }, 30 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (!adminLoading && !admin) {
            router.push("/tickets");
        }
    }, [admin, adminLoading, router]);

    const [details, setDetails] = useState<any>(null);
    
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
          } else {
            console.error("details failed:", data.message);
            setDetails({});
          }
        } catch (error) {
          console.error("Error during details:", error);
          setDetails({});
        }
      }
      useEffect(() => {
        getDetails();
      }, []);

    if (pageLoading) {
        return (
            <div className="flex h-screen bg-gray-50 overflow-hidden">
                {/* Sidebar skeleton */}
                <div className="hidden sm:block sm:w-64 lg:w-72 xl:w-80 shadow-xl bg-white flex-shrink-0 p-4 space-y-4">
                    <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                        <Shimmer className="h-10 w-10 rounded-full" shape="circle" variant="avatar" />
                        <div className="space-y-2 flex-1">
                            <Shimmer className="h-3.5 w-28 rounded" variant="list" />
                            <Shimmer className="h-3 w-20 rounded" variant="list" />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-3 px-3 py-2.5">
                                <Shimmer className="h-5 w-5 rounded-lg" variant="list" />
                                <Shimmer className="h-3.5 w-24 rounded" variant="list" />
                            </div>
                        ))}
                    </div>
                    <div className="border-t border-gray-100 pt-3">
                        <Shimmer className="h-9 w-full rounded-xl" variant="card" />
                    </div>
                </div>

                {/* Main content */}
                <div className="flex-1 p-4 sm:p-6 overflow-auto space-y-6">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="space-y-2">
                            <Shimmer className="h-7 w-56 rounded" variant="card" />
                            <Shimmer className="h-4 w-40 rounded" variant="list" />
                        </div>
                        <Shimmer className="h-9 w-64 rounded-full" variant="card" />
                    </div>

                    {/* 4 stat cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 space-y-3">
                                <Shimmer className="h-8 w-16 rounded" variant="card" />
                                <Shimmer className="h-3 w-24 rounded" variant="list" />
                            </div>
                        ))}
                    </div>

                    {/* Two-column section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
                            <div className="flex items-center gap-2">
                                <Shimmer className="h-5 w-5 rounded" variant="list" />
                                <Shimmer className="h-4 w-28 rounded" variant="list" />
                            </div>
                            <div className="flex items-center gap-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <Shimmer key={i} className="h-12 w-12 rounded-full" shape="circle" variant="avatar" />
                                ))}
                                <Shimmer className="h-12 w-12 rounded-full" shape="circle" variant="avatar" />
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
                            <div className="flex items-center gap-2">
                                <Shimmer className="h-5 w-5 rounded" variant="list" />
                                <Shimmer className="h-4 w-36 rounded" variant="list" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="bg-gray-50 p-3 rounded-lg space-y-2">
                                        <Shimmer className="h-6 w-12 mx-auto rounded" variant="card" />
                                        <Shimmer className="h-3 w-16 mx-auto rounded" variant="list" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Quick actions */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
                        <div className="flex items-center gap-2">
                            <Shimmer className="h-5 w-5 rounded" variant="list" />
                            <Shimmer className="h-4 w-28 rounded" variant="list" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {[1, 2, 3, 4].map((i) => (
                                <Shimmer key={i} className="h-14 rounded-lg" variant="card" />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Mobile bottom loading indicator */}
                <div className="sm:hidden fixed bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-gray-100 flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-500 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <span className="text-xs text-gray-500 font-medium">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <>
        {create && (
            <TicketCreate create={create} setCreate={setCreate} />  
        )}
        { 
            <AccountSettings details={details} settings={settings} setSettings={setSettings} />
        }
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Sidebar — handles both desktop sidebar and mobile overlay */}
            <div className="hidden sm:block sm:w-64 lg:w-72 xl:w-80 shadow-xl bg-white flex-shrink-0">
                <SideNav create={create} setCreate={setCreate} settings={settings} setSettings={setSettings} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
            </div>

            {/* Main content */}
            <div className="flex-1 bg-gray-50 h-screen overflow-hidden min-w-0">
                <MainLayout isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
            </div>

        </div>
        </>
       
    );
}