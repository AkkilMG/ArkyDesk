'use client';

import { useEffect } from 'react';

export default function ServiceLevelAgreement() {
    useEffect(() => {
        document.title = 'Service Level Agreement - Arkynox Support';
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="text-center mb-8">
                        <img src="/logo/logo.png" alt="Arkynox Logo" className="h-16 mx-auto mb-4" />
                        <h1 className="text-3xl font-bold text-gray-900">Service Level Agreement (SLA)</h1>
                        <p className="text-gray-600 mt-2">Effective Date: June 20, 2026</p>
                    </div>

                    <div className="prose max-w-none">
                        {/* Quick Summary - Plain Language */}
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 mb-8">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-green-100 rounded-full p-2">
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-green-900">Quick Summary (Plain English) ⚡</h3>
                                    <p className="text-sm text-green-700">What service levels you can expect from us</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div className="bg-white/80 rounded-lg p-3 border border-green-100">
                                    <div className="font-semibold text-green-800 mb-1">⏱️ Response Times</div>
                                    <ul className="text-green-700 space-y-1">
                                        <li>🔴 <strong>Critical</strong> (system down) → 2 hours</li>
                                        <li>🟠 <strong>High</strong> (major issue) → 4 hours</li>
                                        <li>🟡 <strong>Normal</strong> (standard) → 24 hours</li>
                                        <li>🔵 <strong>Low</strong> (inquiry) → 72 hours</li>
                                    </ul>
                                </div>
                                <div className="bg-white/80 rounded-lg p-3 border border-green-100">
                                    <div className="font-semibold text-green-800 mb-1">📊 Uptime Guarantee</div>
                                    <p className="text-green-700">99.9% uptime (~43 min downtime/month). If we miss it, you get service credits (10-50% of monthly fee).</p>
                                    <div className="mt-2 h-3 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-green-500 rounded-full" style={{width: '99.9%'}}></div>
                                    </div>
                                    <p className="text-xs text-green-600 mt-1">99.9% uptime target</p>
                                </div>
                                <div className="bg-white/80 rounded-lg p-3 border border-green-100">
                                    <div className="font-semibold text-green-800 mb-1">🌍 Global Coverage</div>
                                    <p className="text-green-700">Support centers in Americas, Europe, Asia, and Australasia. Follow-the-sun model means someone's always awake to help you.</p>
                                </div>
                                <div className="bg-white/80 rounded-lg p-3 border border-green-100">
                                    <div className="font-semibold text-green-800 mb-1">📈 Escalation Path</div>
                                    <p className="text-green-700">Level 1 Agent → Level 2 Specialist → Level 3 Expert → Engineering → Management. We escalate automatically if response times are missed.</p>
                                </div>
                            </div>
                            <div className="mt-3 text-xs text-green-600 text-center">
                                This summary is for understanding. The full SLA below is the legally binding document.
                            </div>
                        </div>

                        {/* Escalation Flow Diagram */}
                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8">
                            <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">🔄 Support Escalation Flow</h3>
                            <div className="flex flex-col md:flex-row items-center justify-center gap-2 text-xs">
                                <div className="bg-green-100 border-2 border-green-300 rounded-lg px-4 py-3 text-center min-w-[120px]">
                                    <div className="font-bold text-green-800">📝 Ticket</div>
                                    <div className="text-green-600">You submit</div>
                                </div>
                                <div className="text-green-500 text-2xl font-bold">→</div>
                                <div className="bg-blue-100 border-2 border-blue-300 rounded-lg px-4 py-3 text-center min-w-[120px]">
                                    <div className="font-bold text-blue-800">L1 Agent</div>
                                    <div className="text-blue-600">First response</div>
                                    <div className="text-blue-500">2-72 hrs</div>
                                </div>
                                <div className="text-green-500 text-2xl font-bold">→</div>
                                <div className="bg-yellow-100 border-2 border-yellow-300 rounded-lg px-4 py-3 text-center min-w-[120px]">
                                    <div className="font-bold text-yellow-800">L2 Specialist</div>
                                    <div className="text-yellow-600">Deep tech</div>
                                    <div className="text-yellow-500">Auto-escalate</div>
                                </div>
                                <div className="text-green-500 text-2xl font-bold">→</div>
                                <div className="bg-orange-100 border-2 border-orange-300 rounded-lg px-4 py-3 text-center min-w-[120px]">
                                    <div className="font-bold text-orange-800">L3 Expert</div>
                                    <div className="text-orange-600">SME</div>
                                </div>
                                <div className="text-green-500 text-2xl font-bold">→</div>
                                <div className="bg-red-100 border-2 border-red-300 rounded-lg px-4 py-3 text-center min-w-[120px]">
                                    <div className="font-bold text-red-800">🚀 Engineering</div>
                                    <div className="text-red-600">Code fix</div>
                                </div>
                            </div>
                            <div className="text-center mt-3 text-xs text-gray-500">If any level misses response time → auto-escalation to next level</div>
                        </div>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Overview</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                This Service Level Agreement (SLA) defines the performance standards and support commitments 
                                that Arkynox provides to users of the ArkyDesk support system. This SLA is part of our 
                                commitment to delivering reliable, high-quality technical support services.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Service Availability</h2>
                            
                            <h3 className="text-xl font-medium text-gray-800 mb-3">2.1 Uptime Commitment</h3>
                            <div className="bg-green-50 p-6 rounded-lg mb-4">
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-green-600 mb-2">99.9%</div>
                                    <p className="text-gray-700 font-medium">Monthly Uptime Guarantee</p>
                                    <p className="text-sm text-gray-600 mt-2">Maximum downtime: 43 minutes per month</p>
                                </div>
                            </div>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">2.2 Planned Maintenance</h3>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li><strong>Scheduled Windows:</strong> Sundays 2:00 AM - 4:00 AM (local time)</li>
                                <li><strong>Advance Notice:</strong> 72 hours minimum for planned maintenance</li>
                                <li><strong>Duration:</strong> Maximum 2 hours per maintenance window</li>
                                <li><strong>Frequency:</strong> Monthly or as needed for critical updates</li>
                            </ul>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">2.3 Emergency Maintenance</h3>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Emergency maintenance may be performed without advance notice to address security 
                                vulnerabilities or critical system issues. We will make every effort to minimize 
                                disruption and communicate status updates during such events.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Response Time Standards</h2>
                            
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 mb-6">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Priority Level
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Definition
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Response Time
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Resolution Target
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        <tr className="bg-red-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                    Critical
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                System down, complete service unavailable, security breach
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                                                2 hours
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                8 hours
                                            </td>
                                        </tr>
                                        <tr className="bg-orange-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                                    High
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                Major functionality impaired, affects multiple users
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                                                4 hours
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                24 hours
                                            </td>
                                        </tr>
                                        <tr className="bg-yellow-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                    Normal
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                Standard questions, minor issues, feature requests
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                                                24 hours
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                5 business days
                                            </td>
                                        </tr>
                                        <tr className="bg-blue-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                    Low
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                General inquiries, documentation requests, enhancements
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                                                72 hours
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                10 business days
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="bg-blue-50 p-4 rounded-lg">
                                <p className="text-sm text-gray-700">
                                    <strong>Note:</strong> Response times are calculated during business hours (Monday-Friday, 9 AM - 6 PM local time). 
                                    Resolution targets are estimates and may vary based on issue complexity.
                                </p>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Support Channels</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Primary Channels</h3>
                                    <ul className="space-y-3 text-gray-700">
                                        <li className="flex items-center">
                                            <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                                            <strong>Support Portal:</strong> 24/7 ticket submission
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                                            <strong>Email:</strong> support@arkynox.com
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                                            <strong>Knowledge Base:</strong> Self-service resources
                                        </li>
                                    </ul>
                                </div>
                                
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Emergency Contact</h3>
                                    <ul className="space-y-3 text-gray-700">
                                        <li className="flex items-center">
                                            <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                                            <strong>Critical Issues:</strong> Mark ticket as "Critical"
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                                            <strong>After Hours:</strong> Emergency escalation available
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-2 h-2 bg-gray-500 rounded-full mr-3"></span>
                                            <strong>Phone:</strong> Critical issues only
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Performance Metrics</h2>
                            
                            <h3 className="text-xl font-medium text-gray-800 mb-3">5.1 Key Performance Indicators</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <div className="bg-green-50 p-4 rounded-lg text-center">
                                    <div className="text-2xl font-bold text-green-600">≥ 95%</div>
                                    <div className="text-sm text-gray-700">First Response Target</div>
                                </div>
                                <div className="bg-blue-50 p-4 rounded-lg text-center">
                                    <div className="text-2xl font-bold text-blue-600">≥ 90%</div>
                                    <div className="text-sm text-gray-700">Resolution Target</div>
                                </div>
                                <div className="bg-purple-50 p-4 rounded-lg text-center">
                                    <div className="text-2xl font-bold text-purple-600">≥ 4.5</div>
                                    <div className="text-sm text-gray-700">Customer Satisfaction</div>
                                </div>
                            </div>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">5.2 Monthly Reporting</h3>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li>System uptime and availability statistics</li>
                                <li>Response time performance by priority level</li>
                                <li>Ticket volume and resolution rates</li>
                                <li>Customer satisfaction survey results</li>
                                <li>Service improvement recommendations</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Escalation Procedures</h2>
                            
                            <h3 className="text-xl font-medium text-gray-800 mb-3">6.1 Automatic Escalation</h3>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li><strong>Response Time Breach:</strong> Automatic escalation to supervisor</li>
                                <li><strong>Critical Issues:</strong> Immediate escalation to senior staff</li>
                                <li><strong>Customer Request:</strong> Manual escalation upon request</li>
                            </ul>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">6.2 Escalation Levels</h3>
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                                    <li><strong>Level 1:</strong> Front-line Support Technician</li>
                                    <li><strong>Level 2:</strong> Senior Support Specialist</li>
                                    <li><strong>Level 3:</strong> Technical Lead / Subject Matter Expert</li>
                                    <li><strong>Level 4:</strong> Engineering Team / Product Development</li>
                                    <li><strong>Management:</strong> Support Manager / Director</li>
                                </ol>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibent text-gray-800 mb-4">7. Service Credits</h2>
                            
                            <h3 className="text-xl font-medium text-gray-800 mb-3">7.1 Availability Credits</h3>
                            <div className="overflow-x-auto mb-4">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Monthly Uptime
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Service Credit
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        <tr>
                                            <td className="px-6 py-4 text-sm text-gray-700">99.0% - 99.9%</td>
                                            <td className="px-6 py-4 text-sm text-gray-700">10% of monthly fee</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 text-sm text-gray-700">95.0% - 98.9%</td>
                                            <td className="px-6 py-4 text-sm text-gray-700">25% of monthly fee</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 text-sm text-gray-700">&lt; 95.0%</td>
                                            <td className="px-6 py-4 text-sm text-gray-700">50% of monthly fee</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">7.2 Credit Claims</h3>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li>Credits must be requested within 30 days of the incident</li>
                                <li>Credits are applied to the next billing cycle</li>
                                <li>Maximum credit of 100% of monthly fee per incident</li>
                                <li>Credits do not apply to planned maintenance or force majeure events</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Exclusions</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                This SLA does not apply to service interruptions caused by:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li>Scheduled maintenance (with proper notice)</li>
                                <li>Acts of God, natural disasters, or force majeure events</li>
                                <li>Internet service provider or network connectivity issues</li>
                                <li>Customer's equipment, software, or configuration issues</li>
                                <li>Third-party service failures beyond our control</li>
                                <li>Security incidents or cyber attacks</li>
                                <li>Customer-requested changes or modifications</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Global Support Coverage</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Our support team operates across multiple time zones to provide coverage for users worldwide. 
                                Below are our regional support centers and their operating hours:
                            </p>

                            <div className="overflow-x-auto mb-6">
                                <table className="min-w-full divide-y divide-gray-200 text-sm">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left font-semibold text-gray-700">Region</th>
                                            <th className="px-4 py-3 text-left font-semibold text-gray-700">Coverage Timezone</th>
                                            <th className="px-4 py-3 text-left font-semibold text-gray-700">Business Hours</th>
                                            <th className="px-4 py-3 text-left font-semibold text-gray-700">Languages</th>
                                            <th className="px-4 py-3 text-left font-semibold text-gray-700">24/7 Available</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        <tr><td className="px-4 py-3 font-medium">Americas</td><td className="px-4 py-3">EST/PST (UTC-5/-8)</td><td className="px-4 py-3">9 AM - 9 PM local</td><td className="px-4 py-3">English, Spanish, Portuguese</td><td className="px-4 py-3 text-green-600 font-medium">✓</td></tr>
                                        <tr className="bg-gray-50"><td className="px-4 py-3 font-medium">Europe & Africa</td><td className="px-4 py-3">CET/SAST (UTC+1/+2)</td><td className="px-4 py-3">8 AM - 8 PM local</td><td className="px-4 py-3">English, French, German, Spanish, Dutch, Turkish, Russian</td><td className="px-4 py-3 text-green-600 font-medium">✓</td></tr>
                                        <tr><td className="px-4 py-3 font-medium">Middle East & Central Asia</td><td className="px-4 py-3">GST/AQTT (UTC+4/+5)</td><td className="px-4 py-3">8 AM - 6 PM local</td><td className="px-4 py-3">Arabic, Turkish, Russian, English</td><td className="px-4 py-3 text-gray-500">Critical only</td></tr>
                                        <tr className="bg-gray-50"><td className="px-4 py-3 font-medium">South Asia</td><td className="px-4 py-3">IST/PKT (UTC+5/+5:30)</td><td className="px-4 py-3">8 AM - 10 PM local</td><td className="px-4 py-3">Hindi, English, Tamil, Sinhala</td><td className="px-4 py-3 text-green-600 font-medium">✓</td></tr>
                                        <tr><td className="px-4 py-3 font-medium">Southeast Asia</td><td className="px-4 py-3">ICT/WIB (UTC+7/+8)</td><td className="px-4 py-3">7 AM - 9 PM local</td><td className="px-4 py-3">Indonesian, Thai, English, Filipino</td><td className="px-4 py-3 text-gray-500">Critical only</td></tr>
                                        <tr className="bg-gray-50"><td className="px-4 py-3 font-medium">East Asia</td><td className="px-4 py-3">JST/KST (UTC+9)</td><td className="px-4 py-3">9 AM - 9 PM local</td><td className="px-4 py-3">Japanese, Korean, English</td><td className="px-4 py-3 text-gray-500">Critical only</td></tr>
                                        <tr><td className="px-4 py-3 font-medium">Australasia</td><td className="px-4 py-3">AEST (UTC+10)</td><td className="px-4 py-3">8 AM - 8 PM local</td><td className="px-4 py-3">English</td><td className="px-4 py-3 text-gray-500">Critical only</td></tr>
                                    </tbody>
                                </table>
                            </div>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">9.1 Follow-the-Sun Coverage</h3>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Through our global support centers, we provide continuous coverage across all time zones. 
                                When a regional center closes, the next region takes over, ensuring that critical issues 
                                receive attention 24/7 regardless of your location.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                                <div className="bg-blue-50 p-4 rounded-lg text-center">
                                    <div className="text-lg font-bold text-blue-700">8 AM - 4 PM UTC</div>
                                    <div className="text-sm text-blue-600">Americas coverage</div>
                                </div>
                                <div className="bg-green-50 p-4 rounded-lg text-center">
                                    <div className="text-lg font-bold text-green-700">4 PM - 12 AM UTC</div>
                                    <div className="text-sm text-green-600">Europe/Africa coverage</div>
                                </div>
                                <div className="bg-orange-50 p-4 rounded-lg text-center">
                                    <div className="text-lg font-bold text-orange-700">12 AM - 8 AM UTC</div>
                                    <div className="text-sm text-orange-600">Asia/Pacific coverage</div>
                                </div>
                            </div>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">9.2 Country-Specific Contact Channels</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm mb-4">
                                <div className="bg-gray-50 p-3 rounded"><span className="font-medium">🇺🇸 US & Canada:</span> +1-555-SUPPORT (toll-free)</div>
                                <div className="bg-gray-50 p-3 rounded"><span className="font-medium">🇬🇧 United Kingdom:</span> +44-555-SUPPORT</div>
                                <div className="bg-gray-50 p-3 rounded"><span className="font-medium">🇮🇳 India:</span> +91-555-SUPPORT (toll-free)</div>
                                <div className="bg-gray-50 p-3 rounded"><span className="font-medium">🇧🇷 Brazil:</span> +55-555-SUPPORT</div>
                                <div className="bg-gray-50 p-3 rounded"><span className="font-medium">🇷🇺 Russia:</span> +7-555-SUPPORT</div>
                                <div className="bg-gray-50 p-3 rounded"><span className="font-medium">🇯🇵 Japan:</span> +81-555-SUPPORT</div>
                                <div className="bg-gray-50 p-3 rounded"><span className="font-medium">🇩🇪 Germany:</span> +49-555-SUPPORT</div>
                                <div className="bg-gray-50 p-3 rounded"><span className="font-medium">🇫🇷 France:</span> +33-555-SUPPORT</div>
                                <div className="bg-gray-50 p-3 rounded"><span className="font-medium">🇿🇦 South Africa:</span> +27-555-SUPPORT</div>
                                <div className="bg-gray-50 p-3 rounded"><span className="font-medium">🇦🇺 Australia:</span> +61-555-SUPPORT</div>
                                <div className="bg-gray-50 p-3 rounded"><span className="font-medium">🇳🇬 Nigeria:</span> +234-555-SUPPORT</div>
                                <div className="bg-gray-50 p-3 rounded"><span className="font-medium">🇹🇷 Turkey:</span> +90-555-SUPPORT</div>
                                <div className="bg-gray-50 p-3 rounded"><span className="font-medium">🇮🇩 Indonesia:</span> +62-555-SUPPORT</div>
                                <div className="bg-gray-50 p-3 rounded"><span className="font-medium">🇹🇭 Thailand:</span> +66-555-SUPPORT</div>
                                <div className="bg-gray-50 p-3 rounded"><span className="font-medium">🇰🇷 South Korea:</span> +82-555-SUPPORT</div>
                                <div className="bg-gray-50 p-3 rounded"><span className="font-medium">🇰🇪 Kenya:</span> +254-555-SUPPORT</div>
                                <div className="bg-gray-50 p-3 rounded"><span className="font-medium">🇵🇭 Philippines:</span> +63-555-SUPPORT</div>
                                <div className="bg-gray-50 p-3 rounded"><span className="font-medium">🇱🇰 Sri Lanka:</span> +94-555-SUPPORT</div>
                            </div>
                            <p className="text-xs text-gray-500">
                                Phone support is available for Critical and High priority issues. Normal and Low priority 
                                issues should be submitted via the support portal or email.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. SLA Review and Updates</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                This SLA is reviewed quarterly and may be updated to reflect changes in service 
                                capabilities, technology improvements, or customer requirements. Material changes 
                                will be communicated with 30 days advance notice.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Contact Information</h2>
                            <div className="bg-blue-50 p-6 rounded-lg">
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    For SLA-related questions or to report service level breaches:
                                </p>
                                <ul className="text-gray-700 space-y-2">
                                    <li><strong>Email:</strong> sla@arkynox.com</li>
                                    <li><strong>Support Portal:</strong> Create a ticket with "SLA" in the subject</li>
                                    <li><strong>Escalation:</strong> support-manager@arkynox.com</li>
                                    <li><strong>Response Time:</strong> SLA inquiries responded to within 4 hours</li>
                                </ul>
                            </div>
                        </section>
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-200 text-center">
                        <p className="text-sm text-gray-600">
                            This Service Level Agreement was last updated on June 20, 2026
                        </p>
                        <div className="mt-4 space-x-4">
                            <a href="/policy/terms-and-condition" className="text-blue-600 hover:text-blue-800 font-medium">
                                Terms & Conditions
                            </a>
                            <span className="text-gray-300">|</span>
                            <a href="/policy/privacy-policy" className="text-blue-600 hover:text-blue-800 font-medium">
                                Privacy Policy
                            </a>
                            <span className="text-gray-300">|</span>
                            <a href="/dashboard" className="text-blue-600 hover:text-blue-800 font-medium">
                                Return to Dashboard
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
