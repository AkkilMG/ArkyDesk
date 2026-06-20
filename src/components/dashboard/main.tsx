"use client";

import { useEffect, useState } from 'react';
import Shimmer from '@/components/ui/Shimmer';
import Link from "next/link";
import ConsentBanner from '../ui/ConsentBanner';

export default function MainLayout({ isMobileMenuOpen, setIsMobileMenuOpen }: any) {
    const [stats, setStats] = useState<any[]>([
        { label: 'Total Users', count: 0, suffix: '' },
        { label: 'Opened Tickets', count: 0, suffix: '' },
        { label: 'Resolved', count: 0, suffix: '' },
        { label: 'Pending', count: 0, suffix: '' },
    ]);

    const [displayCounts, setDisplayCounts] = useState<number[]>(Array(4).fill(0));
    const [loadingStats, setLoadingStats] = useState(true);

    useEffect(() => {
        fetch('/api/admin/stats')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    const realStats = [
                        { label: 'Total Users', count: data.stats.totalUsers, suffix: '' },
                        { label: 'Opened Tickets', count: data.stats.openTickets, suffix: '' },
                        { label: 'Resolved', count: data.stats.closedTickets, suffix: '' },
                        { label: 'Pending', count: data.stats.pendingActions, suffix: '' },
                    ];
                    setStats(realStats);
                }
            })
            .catch(console.error)
            .finally(() => {
                setLoadingStats(false);
                animateCounts();
            });
    }, []);

    const animateCounts = () => {
        setDisplayCounts(Array(stats.length).fill(0));
        const targetCounts = [...stats.map(s => s.count)];
        const intervals: NodeJS.Timeout[] = [];
        const maxCount = Math.max(...targetCounts, 1);

        targetCounts.forEach((target, index) => {
            const increment = Math.max(1, Math.ceil(target / 40));
            let current = 0;
            const interval = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(interval);
                }
                setDisplayCounts((prev) => {
                    const updated = [...prev];
                    updated[index] = current;
                    return updated;
                });
            }, 25);
            intervals.push(interval);
        });

        setTimeout(() => {
            intervals.forEach(i => clearInterval(i));
            setDisplayCounts(targetCounts);
        }, 1500);
    };

    return (
        <div className="flex-1 p-4 sm:p-6 overflow-auto">
            <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
                <div className="w-full sm:w-auto">
                    <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 fade-in">Welcome to ArkyDesk</h1>
                    <p className="text-gray-500 mt-1 text-sm sm:text-base">Manage your tickets and track progress</p>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto">
                    <button className="focus:outline-none p-2 pl-3 border border-gray-300 rounded-lg sm:hidden hover:bg-gray-50 transition-smooth" onClick={(e) => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
                        <img src={isMobileMenuOpen ? "/icons/close.svg" : "/icons/menu.svg"} alt="Menu Toggle" className="h-6 w-6" />
                    </button>
                    <div className="relative flex-1 sm:flex-initial">
                        <input 
                            type="text" 
                            className="bg-gray-100 border border-gray-300 rounded-full py-2 px-4 pr-10 w-full sm:w-64 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-smooth text-sm sm:text-base" 
                            placeholder="Search Dashboard" 
                        />
                        <img src="/icons/search.svg" className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" alt="Search" />
                    </div>
                </div>
            </header>

            <ConsentBanner />

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-4 sm:p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
                        {loadingStats ? (
                            <div className="space-y-3 py-1">
                                <Shimmer className="h-8 w-20 rounded" variant="card" />
                                <Shimmer className="h-3 w-16 rounded" variant="list" />
                            </div>
                        ) : (
                            <>
                                <span className="text-2xl sm:text-3xl font-bold text-gray-900 block">
                                    {displayCounts[index]}
                                    <span className="text-sm sm:text-base text-gray-500 ml-0.5">{stat.suffix}</span>
                                </span>
                                <span className="text-xs sm:text-sm text-gray-500 mt-1 block">{stat.label}</span>
                            </>
                        )}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* Team Section */}
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 card-hover transition-smooth fade-in">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Support Team
                    </h3>
                    <div className="flex items-center space-x-2 sm:space-x-3">
                        {[1, 2, 3, 4].map((member, index) => (
                            <div key={index} className="relative">
                                <img 
                                    src={`https://ui-avatars.com/api/?name=Member${member}&background=random`} 
                                    alt={`team member ${member}`} 
                                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full ring-2 ring-white hover:ring-purple-300 transition-smooth cursor-pointer" 
                                />
                                <div className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 border-2 border-white rounded-full"></div>
                            </div>
                        ))}
                        <button className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 font-semibold text-base sm:text-lg transition-smooth btn-hover flex items-center justify-center">
                            +
                        </button>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 card-hover transition-smooth fade-in">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Statistics Overview
                    </h3>
                    <div className="grid grid-cols-2 gap-2 sm:gap-4">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center bg-gray-50 p-2 sm:p-3 rounded-lg hover:bg-gray-100 transition-all">
                                {loadingStats ? (
                                    <div className="space-y-2 py-2">
                                        <Shimmer className="h-8 w-24 mx-auto rounded" />
                                        <Shimmer className="h-3 w-16 mx-auto rounded" />
                                    </div>
                                ) : (
                                    <>
                                        <span className="text-lg sm:text-2xl font-bold text-blue-600 block">
                                            {displayCounts[index]}
                                            <span className="text-sm sm:text-lg">{stat.suffix}</span>
                                        </span>
                                        <span className="text-xs sm:text-sm text-gray-600 mt-1 block">{stat.label}</span>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-4 sm:mt-6 bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 card-hover transition-smooth fade-in">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Quick Actions
                </h3>
                <div className="grid grid-cols-2 gap-2 sm:gap-4">
                    <Link href="/tickets" className="flex flex-col sm:flex-row items-center justify-center p-3 sm:p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-smooth btn-hover text-blue-700 font-medium text-sm sm:text-base">
                        <svg className="h-5 w-5 mb-1 sm:mb-0 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-center">View Tickets</span>
                    </Link>
                    <button className="flex flex-col sm:flex-row items-center justify-center p-3 sm:p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-smooth btn-hover text-green-700 font-medium text-sm sm:text-base">
                        <svg className="h-5 w-5 mb-1 sm:mb-0 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <span className="text-center">New Ticket</span>
                    </button>
                    <a href="/profile" className="flex flex-col sm:flex-row items-center justify-center p-3 sm:p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-smooth btn-hover text-purple-700 font-medium text-sm sm:text-base">
                        <svg className="h-5 w-5 mb-1 sm:mb-0 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="text-center">Profile</span>
                    </a>
                    <button className="flex flex-col sm:flex-row items-center justify-center p-3 sm:p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-smooth btn-hover text-gray-700 font-medium text-sm sm:text-base">
                        <svg className="h-5 w-5 mb-1 sm:mb-0 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-center">Settings</span>
                    </button>
                </div>
            </div>
        </div>
    );
}