'use client';

import { useEffect } from 'react';

export default function DataRetentionPolicy() {
    useEffect(() => {
        document.title = 'Data Retention Policy - Arkynox Support';
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="text-center mb-8">
                        <img src="/logo/logo.png" alt="Arkynox Logo" className="h-16 mx-auto mb-4" />
                        <h1 className="text-3xl font-bold text-gray-900">Data Retention Policy</h1>
                        <p className="text-gray-600 mt-2">Effective Date: August 15, 2025</p>
                    </div>

                    <div className="prose max-w-none">
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Policy Overview</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                This Data Retention Policy outlines how Arkynox manages, retains, and disposes of data 
                                collected through the ArkyDesk support system. This policy ensures compliance with 
                                legal requirements, business needs, and privacy regulations while minimizing data storage risks.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                This policy applies to all data processed through our support system, including personal 
                                information, support tickets, communications, and system logs.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Data Categories and Retention Periods</h2>
                            
                            <div className="overflow-x-auto mb-6">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Data Category
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Retention Period
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Justification
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                                User Account Information
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                3 years after last activity
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                Business continuity and service history
                                            </td>
                                        </tr>
                                        <tr className="bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                                Support Tickets
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                7 years
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                Legal compliance and knowledge base
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                                Ticket Communications
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                7 years
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                Support continuity and training
                                            </td>
                                        </tr>
                                        <tr className="bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                                File Attachments
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                3 years after ticket closure
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                Technical reference and troubleshooting
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                                System Access Logs
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                90 days
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                Security monitoring and troubleshooting
                                            </td>
                                        </tr>
                                        <tr className="bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                                Error Logs
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                1 year
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                System improvement and debugging
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                                Performance Metrics
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                2 years
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                Service improvement and capacity planning
                                            </td>
                                        </tr>
                                        <tr className="bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                                Customer Feedback
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                5 years
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                Quality improvement and analysis
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                                Billing Records
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                7 years
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                Tax and regulatory compliance
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Data Lifecycle Management</h2>
                            
                            <h3 className="text-xl font-medium text-gray-800 mb-3">3.1 Active Data Phase</h3>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li><strong>Storage:</strong> Primary production systems with regular backups</li>
                                <li><strong>Access:</strong> Available to authorized users and support staff</li>
                                <li><strong>Processing:</strong> Used for active support operations and service delivery</li>
                                <li><strong>Security:</strong> Full encryption and access controls applied</li>
                            </ul>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">3.2 Archive Phase</h3>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li><strong>Migration:</strong> Data moved to long-term archive systems</li>
                                <li><strong>Access:</strong> Read-only access for authorized personnel only</li>
                                <li><strong>Retrieval:</strong> Available upon request for legal or business needs</li>
                                <li><strong>Cost Optimization:</strong> Stored in cost-effective archive storage</li>
                            </ul>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">3.3 Disposal Phase</h3>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li><strong>Secure Deletion:</strong> Data permanently destroyed using industry standards</li>
                                <li><strong>Certification:</strong> Disposal process documented and certified</li>
                                <li><strong>Verification:</strong> Deletion verified through automated processes</li>
                                <li><strong>Audit Trail:</strong> Complete record of disposal activities maintained</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Legal Hold Procedures</h2>
                            
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-4">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <h3 className="text-sm font-medium text-yellow-800">Legal Hold Override</h3>
                                        <div className="mt-2 text-sm text-yellow-700">
                                            <p>When subject to legal hold, litigation, or regulatory investigation, 
                                            normal retention periods are suspended until the hold is released.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">4.1 Legal Hold Process</h3>
                            <ol className="list-decimal pl-6 mb-4 text-gray-700 space-y-2">
                                <li><strong>Identification:</strong> Legal team identifies data subject to hold</li>
                                <li><strong>Preservation:</strong> Automated systems prevent data deletion</li>
                                <li><strong>Notification:</strong> Relevant staff notified of hold requirements</li>
                                <li><strong>Monitoring:</strong> Ongoing monitoring ensures hold compliance</li>
                                <li><strong>Release:</strong> Hold released only upon legal authorization</li>
                            </ol>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">4.2 Hold Categories</h3>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li><strong>Litigation Hold:</strong> Data relevant to legal proceedings</li>
                                <li><strong>Regulatory Hold:</strong> Data required for regulatory investigations</li>
                                <li><strong>Internal Investigation:</strong> Data related to internal compliance matters</li>
                                <li><strong>Audit Hold:</strong> Data subject to external audits</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Data Subject Rights</h2>
                            
                            <h3 className="text-xl font-medium text-gray-800 mb-3">5.1 Right to Erasure</h3>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Data subjects may request deletion of their personal information before the standard 
                                retention period expires, subject to legal and business requirements.
                            </p>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">5.2 Erasure Limitations</h3>
                            <div className="bg-red-50 p-4 rounded-lg mb-4">
                                <p className="text-gray-700 mb-2"><strong>Erasure may be limited when data is:</strong></p>
                                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                                    <li>Required for legal compliance or defense</li>
                                    <li>Necessary for contract performance</li>
                                    <li>Subject to legal hold or investigation</li>
                                    <li>Required for public interest or safety</li>
                                    <li>Needed for legitimate business purposes</li>
                                </ul>
                            </div>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">5.3 Request Process</h3>
                            <ol className="list-decimal pl-6 mb-4 text-gray-700 space-y-2">
                                <li>Submit request through support portal or email</li>
                                <li>Identity verification and request validation</li>
                                <li>Assessment of legal and business requirements</li>
                                <li>Approval or explanation of limitations</li>
                                <li>Data deletion or archival as appropriate</li>
                                <li>Confirmation of action taken</li>
                            </ol>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Security and Access Controls</h2>
                            
                            <h3 className="text-xl font-medium text-gray-800 mb-3">6.1 Access Restrictions</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <h4 className="font-medium text-gray-800 mb-2">Active Data Access</h4>
                                    <ul className="text-sm text-gray-700 space-y-1">
                                        <li>• Support staff (role-based)</li>
                                        <li>• System administrators</li>
                                        <li>• Data subjects (own data only)</li>
                                        <li>• Authorized managers</li>
                                    </ul>
                                </div>
                                <div className="bg-orange-50 p-4 rounded-lg">
                                    <h4 className="font-medium text-gray-800 mb-2">Archived Data Access</h4>
                                    <ul className="text-sm text-gray-700 space-y-1">
                                        <li>• Legal team (as needed)</li>
                                        <li>• Senior management</li>
                                        <li>• Compliance officers</li>
                                        <li>• External auditors</li>
                                    </ul>
                                </div>
                            </div>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">6.2 Security Measures</h3>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li><strong>Encryption:</strong> Data encrypted at rest and in transit</li>
                                <li><strong>Access Logging:</strong> All data access logged and monitored</li>
                                <li><strong>Authentication:</strong> Multi-factor authentication required</li>
                                <li><strong>Authorization:</strong> Principle of least privilege enforced</li>
                                <li><strong>Monitoring:</strong> Automated monitoring for unauthorized access</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Backup and Disaster Recovery</h2>
                            
                            <h3 className="text-xl font-medium text-gray-800 mb-3">7.1 Backup Strategy</h3>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li><strong>Frequency:</strong> Daily incremental, weekly full backups</li>
                                <li><strong>Retention:</strong> 30 days online, 90 days offline</li>
                                <li><strong>Testing:</strong> Monthly backup restoration tests</li>
                                <li><strong>Security:</strong> Backups encrypted and access-controlled</li>
                            </ul>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">7.2 Disaster Recovery</h3>
                            <div className="bg-green-50 p-4 rounded-lg">
                                <ul className="text-gray-700 space-y-2">
                                    <li><strong>RTO (Recovery Time Objective):</strong> 4 hours</li>
                                    <li><strong>RPO (Recovery Point Objective):</strong> 1 hour</li>
                                    <li><strong>Geographic Redundancy:</strong> Multi-region backup storage</li>
                                    <li><strong>Testing:</strong> Quarterly disaster recovery drills</li>
                                </ul>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Compliance and Monitoring</h2>
                            
                            <h3 className="text-xl font-medium text-gray-800 mb-3">8.1 Automated Processes</h3>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li><strong>Retention Tracking:</strong> Automated tracking of retention periods</li>
                                <li><strong>Disposal Alerts:</strong> Automated alerts for data eligible for deletion</li>
                                <li><strong>Policy Enforcement:</strong> System-level enforcement of retention rules</li>
                                <li><strong>Audit Logging:</strong> Comprehensive logging of all data operations</li>
                            </ul>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">8.2 Regular Reviews</h3>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li><strong>Monthly:</strong> Data disposal process review</li>
                                <li><strong>Quarterly:</strong> Retention policy compliance audit</li>
                                <li><strong>Annually:</strong> Full policy review and update</li>
                                <li><strong>Ad-hoc:</strong> Reviews triggered by legal or regulatory changes</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Policy Exceptions</h2>
                            
                            <h3 className="text-xl font-medium text-gray-800 mb-3">9.1 Exception Process</h3>
                            <ol className="list-decimal pl-6 mb-4 text-gray-700 space-y-2">
                                <li>Submit written request with business justification</li>
                                <li>Review by Data Protection Officer and Legal team</li>
                                <li>Risk assessment and approval process</li>
                                <li>Documentation of exception and monitoring requirements</li>
                                <li>Regular review of ongoing exceptions</li>
                            </ol>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">9.2 Valid Exception Reasons</h3>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li>Legal or regulatory requirements</li>
                                <li>Active litigation or investigation</li>
                                <li>Critical business continuity needs</li>
                                <li>Customer-specific contractual obligations</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Contact Information</h2>
                            <div className="bg-blue-50 p-6 rounded-lg">
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    For questions about data retention or to request data deletion:
                                </p>
                                <ul className="text-gray-700 space-y-2">
                                    <li><strong>Data Protection Officer:</strong> dpo@arkynox.com</li>
                                    <li><strong>Support Portal:</strong> Create a ticket with "Data Retention" subject</li>
                                    <li><strong>Legal Team:</strong> legal@arkynox.com</li>
                                    <li><strong>Privacy Requests:</strong> privacy@arkynox.com</li>
                                </ul>
                            </div>
                        </section>
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-200 text-center">
                        <p className="text-sm text-gray-600">
                            This Data Retention Policy was last updated on August 15, 2025
                        </p>
                        <div className="mt-4 space-x-4">
                            <a href="/policy/privacy-policy" className="text-blue-600 hover:text-blue-800 font-medium">
                                Privacy Policy
                            </a>
                            <span className="text-gray-300">|</span>
                            <a href="/policy/terms-and-condition" className="text-blue-600 hover:text-blue-800 font-medium">
                                Terms & Conditions
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
