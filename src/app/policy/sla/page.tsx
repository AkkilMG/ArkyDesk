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
                        <p className="text-gray-600 mt-2">Effective Date: August 15, 2025</p>
                    </div>

                    <div className="prose max-w-none">
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
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. SLA Review and Updates</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                This SLA is reviewed quarterly and may be updated to reflect changes in service 
                                capabilities, technology improvements, or customer requirements. Material changes 
                                will be communicated with 30 days advance notice.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Contact Information</h2>
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
                            This Service Level Agreement was last updated on August 15, 2025
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
