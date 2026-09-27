'use client';

import { useEffect, ReactNode } from 'react';
import Link from 'next/link';

interface PolicyLayoutProps {
    title: string;
    children: ReactNode;
    links?: { href: string; label: string }[];
}

export default function PolicyLayout({ title, children, links }: PolicyLayoutProps) {
    useEffect(() => {
        document.title = `${title} - Arkynox Support`;
    }, [title]);

    const defaultLinks = [
        { href: '/dashboard', label: 'Return to Dashboard' },
    ];

    const navLinks = links || defaultLinks;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                    <div className="p-8 sm:p-10">
                        <div className="text-center mb-10">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-200 mb-6">
                                <img src="/logo/logo.png" alt="Arkynox Logo" className="w-10 h-10 brightness-0 invert" />
                            </div>
                            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">{title}</h1>
                            <p className="text-gray-500 mt-2 text-sm font-medium">Effective Date: June 20, 2026</p>
                        </div>

                        <div className="prose prose-gray max-w-none prose-headings:text-gray-900 prose-a:text-blue-600">
                            {children}
                        </div>

                        <div className="mt-12 pt-8 border-t border-gray-100 text-center">
                            <p className="text-sm text-gray-400">
                                This {title} was last updated on June 20, 2026
                            </p>
                            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
                                {navLinks.map((link, i) => (
                                    <span key={link.href} className="inline-flex items-center gap-2">
                                        {i > 0 && <span className="text-gray-200">|</span>}
                                        <Link
                                            href={link.href}
                                            className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 hover:underline underline-offset-4"
                                        >
                                            {link.label}
                                        </Link>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
