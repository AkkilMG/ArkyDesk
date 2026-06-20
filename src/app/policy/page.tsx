'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function PolicyIndex() {
    useEffect(() => {
        document.title = 'Policies - Arkynox Support';
    }, []);

    const policies = [
        {
            title: 'Privacy Policy',
            description: 'How we collect, use, and protect your personal information — compliant with 25+ global privacy laws including GDPR, DPDP Act (India), LGPD, and more',
            href: '/policy/privacy-policy',
            icon: '🔒',
            category: 'Privacy & Security',
            lastUpdated: 'June 20, 2026'
        },
        {
            title: 'Terms and Conditions',
            description: 'Legal terms governing the use of our support services with multi-jurisdiction coverage',
            href: '/policy/terms-and-condition',
            icon: '📋',
            category: 'Legal',
            lastUpdated: 'June 20, 2026'
        },
        {
            title: 'Service Level Agreement',
            description: 'Our commitments for service availability, response times, and regional support coverage',
            href: '/policy/sla',
            icon: '⚡',
            category: 'Service Standards',
            lastUpdated: 'June 20, 2026'
        },
        {
            title: 'Acceptable Use Policy',
            description: 'Guidelines for appropriate use aligned with cybercrime laws across 25+ jurisdictions',
            href: '/policy/acceptable-use',
            icon: '✅',
            category: 'Usage Guidelines',
            lastUpdated: 'June 20, 2026'
        },
        {
            title: 'Data Retention Policy',
            description: 'Country-specific data retention periods and disposal procedures per local laws',
            href: '/policy/data-retention',
            icon: '🗂️',
            category: 'Privacy & Security',
            lastUpdated: 'June 20, 2026'
        }
    ];

    const categories = Array.from(new Set(policies.map(policy => policy.category)));

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <img src="/logo/logo.png" alt="Arkynox Logo" className="h-16 mx-auto mb-6" />
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Arkynox Policies</h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Our comprehensive policies ensure transparency, security, and quality service delivery. 
                        Please review these documents to understand your rights and our commitments.
                    </p>
                </div>

                {/* How Policies Work Together - Visual Diagram */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">📐 How Our Policies Work Together</h2>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-xs">
                        <div className="bg-blue-50 border-2 border-blue-300 rounded-xl px-4 py-3 text-center min-w-[130px]">
                            <div className="text-lg mb-1">🔒</div>
                            <div className="font-bold text-blue-800">Privacy Policy</div>
                            <div className="text-blue-600">Your data, your rights</div>
                        </div>
                        <div className="text-gray-400 text-2xl font-bold">+</div>
                        <div className="bg-slate-50 border-2 border-slate-300 rounded-xl px-4 py-3 text-center min-w-[130px]">
                            <div className="text-lg mb-1">📋</div>
                            <div className="font-bold text-slate-800">Terms & Conditions</div>
                            <div className="text-slate-600">Rules of using our service</div>
                        </div>
                        <div className="text-gray-400 text-2xl font-bold">+</div>
                        <div className="bg-green-50 border-2 border-green-300 rounded-xl px-4 py-3 text-center min-w-[130px]">
                            <div className="text-lg mb-1">✅</div>
                            <div className="font-bold text-green-800">Acceptable Use</div>
                            <div className="text-green-600">What's OK / not OK</div>
                        </div>
                        <div className="text-gray-400 text-2xl font-bold">+</div>
                        <div className="bg-amber-50 border-2 border-amber-300 rounded-xl px-4 py-3 text-center min-w-[130px]">
                            <div className="text-lg mb-1">🗂️</div>
                            <div className="font-bold text-amber-800">Data Retention</div>
                            <div className="text-amber-600">How long we keep data</div>
                        </div>
                        <div className="text-gray-400 text-2xl font-bold">+</div>
                        <div className="bg-purple-50 border-2 border-purple-300 rounded-xl px-4 py-3 text-center min-w-[130px]">
                            <div className="text-lg mb-1">⚡</div>
                            <div className="font-bold text-purple-800">SLA</div>
                            <div className="text-purple-600">Service promises</div>
                        </div>
                    </div>
                    <div className="text-center mt-3 text-xs text-gray-500">
                        Together, these 5 policies create a complete framework for transparent, secure, and lawful support services across 25+ countries
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    <div className="bg-white rounded-lg shadow-md p-6 text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-2">{policies.length}</div>
                        <div className="text-gray-600">Active Policies</div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 text-center">
                        <div className="text-3xl font-bold text-green-600 mb-2">25+</div>
                        <div className="text-gray-600">Jurisdictions Covered</div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 text-center">
                        <div className="text-3xl font-bold text-purple-600 mb-2">GDPR</div>
                        <div className="text-gray-600">Compliant</div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 text-center">
                        <div className="text-3xl font-bold text-orange-600 mb-2">DPDP</div>
                        <div className="text-gray-600">India Compliant</div>
                    </div>
                </div>

                {/* Policy Categories */}
                {categories.map((category) => (
                    <div key={category} className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                            <div className="h-1 w-8 bg-blue-600 rounded mr-3"></div>
                            {category}
                        </h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {policies
                                .filter(policy => policy.category === category)
                                .map((policy) => (
                                    <Link
                                        key={policy.href}
                                        href={policy.href}
                                        className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                                    >
                                        <div className="p-6">
                                            <div className="flex items-start">
                                                <div className="text-4xl mr-4 flex-shrink-0">
                                                    {policy.icon}
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                                        {policy.title}
                                                    </h3>
                                                    <p className="text-gray-600 mb-4 leading-relaxed">
                                                        {policy.description}
                                                    </p>
                                                    <div className="flex items-center justify-between text-sm">
                                                        <span className="text-blue-600 font-medium hover:text-blue-800">
                                                            Read Policy →
                                                        </span>
                                                        <span className="text-gray-500">
                                                            Updated: {policy.lastUpdated}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                        </div>
                    </div>
                ))}

                {/* Additional Information */}
                <div className="bg-blue-50 rounded-lg p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Important Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Policy Updates</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                We review and update our policies regularly to ensure they remain current with 
                                laws, regulations, and best practices. Material changes will be communicated 
                                with advance notice.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Your Rights</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                You have rights regarding your personal information and our services. 
                                Our policies outline these rights and how to exercise them. Contact us 
                                if you have questions.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Compliance</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Our policies are designed to comply with applicable laws including GDPR (EU), 
                                UK GDPR, DPDP Act (India), LGPD (Brazil), APPI (Japan), POPIA (South Africa),
                                CCPA/CPRA (California), KVKK (Turkey), PIPA (South Korea), PDPA (Thailand),
                                PDP Law (Indonesia), Data Protection Act 2019 (Kenya), NDPR (Nigeria),
                                PDPA (Sri Lanka), 152-FZ (Russia), and other applicable privacy regulations
                                across 25+ jurisdictions. We maintain regular compliance assessments and audits.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Questions?</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                If you have questions about any of our policies, please contact our 
                                legal team at legal@arkynox.com or create a support ticket for 
                                assistance.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white rounded-lg shadow-md p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Contact Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-2">Legal Team</h3>
                            <p className="text-gray-600 text-sm">legal@arkynox.com</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-2">Privacy Officer</h3>
                            <p className="text-gray-600 text-sm">privacy@arkynox.com</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-2">Support Team</h3>
                            <p className="text-gray-600 text-sm">Create a ticket</p>
                        </div>
                    </div>
                </div>

                {/* Footer Navigation */}
                <div className="mt-12 text-center">
                    <Link href="/dashboard" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Return to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}
