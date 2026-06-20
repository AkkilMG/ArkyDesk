"use client";

import SideNav from "@/components/dashboard/sideNav";
import AccountSettings from "@/components/settings/settings";
import TicketCreate from "@/components/ticket/create";
import TicketsLists from '@/components/ticket/list';
import { use, useEffect, useState } from "react";
import Shimmer from '@/components/ui/Shimmer';
import { useRouter } from "next/navigation";


export default function ProfileCard() {
    const router = useRouter();
    const [create, setCreate] = useState(false);
    const [settings, setSettings] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [details, setDetails] = useState<{ name?: string; tickets?: number; closedTickets?: number } | null>(null);
    const [ticketsData, setTicketsData] = useState<any[]>([]);
    const [ticketsLoading, setTicketsLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');

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

    async function fetchTickets() {
        try {
            setTicketsLoading(true);
            const res = await fetch('/api/dashboard/tickets', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await res.json();
            if (data.success) {
                setTicketsData(data.tickets || []);
            } else {
                setTicketsData([]);
            }
        } catch (err) {
            console.error('Error fetching tickets on profile:', err);
            setTicketsData([]);
        } finally {
            setTicketsLoading(false);
        }
    }

    useEffect(() => {
        async function checkAuth() {
            try {
                const res = await fetch('/api/auth/verify');
                const data = await res.json();
                if (!data.success) {
                    router.push('/signin');
                }
            } catch {
                router.push('/signin');
            }
        }
        checkAuth();
        getDetails();
        fetchTickets();
    }, [router]);

    if (!details) {
        return (
            <div className="flex h-screen bg-gray-100">
                {/* Sidebar skeleton */}
                <div className="md:w-1/4 xl:w-1/5 2xl:w-1/5 shadow-xl bg-white p-4 space-y-4 hidden md:block">
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

                {/* Profile content skeleton */}
                <div className="flex-1 md:w-3/4 xl:w-4/5 2xl:w-4/5 p-4 sm:p-8 md:p-12 mx-auto bg-gray-200 overflow-auto">
                    <div className="rounded-xl bg-white shadow-lg overflow-hidden max-w-3xl mx-auto">
                        {/* Banner */}
                        <Shimmer className="h-40 w-full" variant="banner" />
                        
                        {/* Avatar overlapping banner */}
                        <div className="px-6 pb-6">
                            <div className="flex items-end -mt-12 mb-4">
                                <Shimmer className="h-24 w-24 rounded-full border-4 border-white flex-shrink-0" shape="circle" variant="avatar" />
                                <div className="ml-4 mb-2 space-y-2.5 flex-1">
                                    <Shimmer className="h-6 w-44 rounded" variant="card" />
                                    <Shimmer className="h-4 w-28 rounded" variant="list" />
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <Shimmer className="h-4 w-8 rounded" variant="list" />
                                    <Shimmer className="h-3.5 w-14 rounded" variant="list" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <Shimmer className="h-4 w-8 rounded" variant="list" />
                                    <Shimmer className="h-3.5 w-12 rounded" variant="list" />
                                </div>
                            </div>
                        </div>
                    </div>
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
        
        {details && (<div className="flex h-screen">
            
            {/* Sidebar */}
            <div className="hidden md:block md:w-1/4 xl:w-1/5 2xl:w-1/5 shadow-xl">
                <SideNav create={create} setCreate={setCreate} settings={settings} setSettings={setSettings} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
            </div>
            <div className="flex-1 w-full md:w-3/4 xl:w-4/5 2xl:w-4/5 p-4 sm:p-8 md:p-12 mx-auto bg-gray-200 shadow-lg">
                <div className="rounded-lg bg-white">
                    <div className="relative h-40">
                        <div className="absolute top-2 left-2">
                            <button className="focus:outline-none p-2 text-white border border-white shadow-lg rounded-lg sm:hidden" onClick={(e) => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                                <img src={isMobileMenuOpen ? "/icons/close.svg" : "/icons/menu.svg"} alt="Menu Toggle" className="h-6 w-6" />
                            </button>
                        </div>
                        <img src="/assets/images/fluid.jpg"
                            alt="Background Banner" className="w-full h-full object-cover rounded-t-lg" width={600} height={160} />
                        {/* Profile Image */}
                        <div className="absolute -bottom-12 left-6">
                            <div className="w-24 h-24 rounded-full border-4 border-white bg-blue-400 flex items-center justify-center text-white text-6xl font-bold">
                                {details?.name ? details?.name?.charAt(0).toUpperCase() : '!'}
                            </div>
                        </div>
                    </div>
                    {/* Details */}
                    <div className="pt-14 px-6 pb-6">
                        <h2 className="text-xl font-bold">{details?.name ? details?.name : 'Mr. Customer'}</h2>
                        {/* <p className="text-sm text-gray-600">@{username}<span>🧑‍💻</span></p> */}
                        <p className="text-sm text-gray-500 mt-1">🌍 Earth</p>
                        
                        {/* Stats */}
                        <div className="flex items-center space-x-4 mt-4">
                            <div className="text-blue-600 font-semibold">
                            {details?.tickets || '0'} <span className="text-gray-600 font-normal">tickets</span>
                            </div>
                            <div className="text-blue-600 font-semibold">
                            {details?.closedTickets || '0'} <span className="text-gray-600 font-normal">closed</span>
                            </div>
                        </div>
                
                        {/* Action Buttons */}
                        {/* <div className="flex space-x-2 mt-4">
                            <button className="flex-1 bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700">Follow</button>
                            <button className="flex-1 border border-gray-300 text-gray-700 py-2 rounded font-medium hover:bg-gray-100">More</button>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>)}
        </>
    );
}
  