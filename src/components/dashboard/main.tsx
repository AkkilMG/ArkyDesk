"use client";

import { useEffect, useState } from 'react';
import Link from "next/link";
import ConsentBanner from '../ui/ConsentBanner';

export default function MainLayout({ isMobileMenuOpen, setIsMobileMenuOpen }: any) {
    const stats: any[] = [
        { label: 'Users', count: 12, suffix: 'k+' },
        { label: 'Opened', count: 84, suffix: '+' },
        { label: 'Closed', count: 4, suffix: '+' },
        { label: 'Ignored', count: 4, suffix: '+' },
    ];

    const [displayCounts, setDisplayCounts] = useState<number[]>(Array(stats.length).fill(0));

    useEffect(() => {
        const maxCount = Math.max(...stats.map((stat) => stat.count));
        const intervals: NodeJS.Timeout[] = [];

        stats.forEach((stat, index) => {
            const duration = Math.max(1000, (maxCount / 100) * 50); // Minimum 1 second
            const increment = Math.ceil(stat.count / 50);

            let currentCount = 0;
            const interval = setInterval(() => {
                currentCount += increment;
                if (currentCount >= stat.count) {
                    currentCount = stat.count;
                    clearInterval(interval);
                }
                setDisplayCounts((prev) => {
                    const updatedCounts = [...prev];
                    updatedCounts[index] = currentCount;
                    return updatedCounts;
                });
            }, 20);
            
            intervals.push(interval);
        });

        return () => {
            intervals.forEach(interval => clearInterval(interval));
        };
    }, []);

    return (
        <div className="flex-1 p-4 sm:p-6 overflow-auto">
            <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
                <div className="w-full sm:w-auto">
                    <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 fade-in">Welcome to ArkyDesk</h1>
                    <p className="text-gray-600 mt-1 text-sm sm:text-base">Manage your tickets and track progress</p>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto">
                    <button className="focus:outline-none p-2 pl-3 border border-gray-300 rounded-lg sm:hidden hover:bg-gray-50 transition-smooth" onClick={(e) => setIsMobileMenuOpen(!isMobileMenuOpen)}>
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

            {/* Consent Banner */}
            <ConsentBanner />

            <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 p-4 sm:p-6 rounded-xl shadow-md mb-6 card-hover transition-smooth">
                <div className="text-center py-2 sm:py-4">
                    <h2 className="text-xl sm:text-2xl font-bold text-yellow-800 mb-2">Welcome to the Dashboard!</h2>
                    <p className="text-yellow-700 text-sm sm:text-base">Here you can manage your tasks and view statistics.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* Team Section */}
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 sm:p-6 rounded-xl shadow-md card-hover transition-smooth fade-in">
                    <h3 className="text-base sm:text-lg font-semibold text-yellow-800 mb-4 flex items-center">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full ring-2 ring-white hover:ring-yellow-400 transition-smooth cursor-pointer" 
                                />
                                <div className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 border-2 border-white rounded-full"></div>
                            </div>
                        ))}
                        <button className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-yellow-200 hover:bg-yellow-300 text-yellow-800 font-semibold text-base sm:text-lg transition-smooth btn-hover">
                            +
                        </button>
                    </div>
                </div>

                {/* Statistics Section */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 sm:p-6 rounded-xl shadow-md card-hover transition-smooth fade-in">
                    <h3 className="text-base sm:text-lg font-semibold text-purple-800 mb-4 flex items-center">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Statistics Overview
                    </h3>
                    <div className="grid grid-cols-2 gap-2 sm:gap-4">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center bg-white p-2 sm:p-3 rounded-lg shadow-sm hover:shadow-md transition-smooth">
                                <span className="text-lg sm:text-2xl font-bold text-purple-600 block">
                                    {displayCounts[index]}
                                    <span className="text-sm sm:text-lg">{stat.suffix}</span>
                                </span>
                                <span className="text-xs sm:text-sm text-gray-600 mt-1 block">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-4 sm:mt-6 bg-white p-4 sm:p-6 rounded-xl shadow-md card-hover transition-smooth fade-in">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Quick Actions
                </h3>
                <div className="grid grid-cols-2 gap-2 sm:gap-4">
                    <Link href="/tickets" className="flex flex-col sm:flex-row items-center justify-center p-3 sm:p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-smooth btn-hover text-blue-700 font-medium text-sm sm:text-base">
                        <img src="/icons/ticket.svg" className="h-5 w-5 mb-1 sm:mb-0 sm:mr-2" />
                        <span className="text-center">View Tickets</span>
                    </Link>
                    <button className="flex flex-col sm:flex-row items-center justify-center p-3 sm:p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-smooth btn-hover text-green-700 font-medium text-sm sm:text-base">
                        <img src="/icons/plus-circle.svg" className="h-5 w-5 mb-1 sm:mb-0 sm:mr-2" />
                        <span className="text-center">New Ticket</span>
                    </button>
                    <a href="/profile" className="flex flex-col sm:flex-row items-center justify-center p-3 sm:p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-smooth btn-hover text-purple-700 font-medium text-sm sm:text-base">
                        <img src="/icons/profile.svg" className="h-5 w-5 mb-1 sm:mb-0 sm:mr-2" />
                        <span className="text-center">Profile</span>
                    </a>
                    <button className="flex flex-col sm:flex-row items-center justify-center p-3 sm:p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-smooth btn-hover text-gray-700 font-medium text-sm sm:text-base">
                        <img src="/icons/settings.svg" className="h-5 w-5 mb-1 sm:mb-0 sm:mr-2" />
                        <span className="text-center">Settings</span>
                    </button>
                </div>
            </div>
        </div>
    );
}