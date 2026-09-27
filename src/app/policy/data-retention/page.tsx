'use client';

import PolicyLayout from '@/components/policy/PolicyLayout';
import {
    ClockIcon, RefreshCwIcon, DownloadIcon, DatabaseIcon,
    ArchiveIcon, TrashIcon, FileTextIcon, LockIcon,
    EyeIcon, ShieldIcon, SearchIcon, CheckIcon,
    InfoIcon, AlertTriangleIcon, GlobeIcon, MailIcon,
    UsersIcon
} from '@/components/policy/Icons';

export default function DataRetentionPolicy() {
    return (
        <PolicyLayout
            title="Data Retention Policy"
            links={[
                { href: '/policy/privacy-policy', label: 'Privacy Policy' },
                { href: '/policy/terms-and-condition', label: 'Terms & Conditions' },
                { href: '/dashboard', label: 'Return to Dashboard' },
            ]}
        >
            {/* Quick Summary */}
            <div className="not-prose bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-50 border border-amber-200/60 rounded-2xl p-6 sm:p-8 mb-10 shadow-sm">
                <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-md shadow-amber-200 flex items-center justify-center">
                        <ClockIcon size={24} className="text-white" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-amber-900">Quick Summary</h3>
                        <p className="text-sm text-amber-600 font-medium">How long we keep your data and when we delete it</p>
                    </div>
                </div>

                {/* Data Lifecycle Visual Diagram */}
                <div className="bg-white/90 backdrop-blur rounded-xl p-5 border border-amber-200 shadow-sm mb-4">
                    <h4 className="font-bold text-amber-800 mb-4 text-center flex items-center justify-center gap-2">
                        <RefreshCwIcon size={18} className="text-amber-600" />
                        Data Lifecycle
                    </h4>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3 text-xs">
                        <div className="bg-green-100 border-2 border-green-300 rounded-xl px-4 py-3 text-center min-w-[100px] shadow-sm">
                            <DownloadIcon size={20} className="text-green-600 mx-auto mb-1" />
                            <div className="font-bold text-green-800">Collect</div>
                            <div className="text-green-600">When you create ticket</div>
                        </div>
                        <ArrowRightIcon size={18} className="text-green-400 flex-shrink-0" />
                        <div className="bg-blue-100 border-2 border-blue-300 rounded-xl px-4 py-3 text-center min-w-[100px] shadow-sm">
                            <DatabaseIcon size={20} className="text-blue-600 mx-auto mb-1" />
                            <div className="font-bold text-blue-800">Active</div>
                            <div className="text-blue-600">Until ticket resolved</div>
                        </div>
                        <ArrowRightIcon size={18} className="text-green-400 flex-shrink-0" />
                        <div className="bg-yellow-100 border-2 border-yellow-300 rounded-xl px-4 py-3 text-center min-w-[100px] shadow-sm">
                            <ArchiveIcon size={20} className="text-yellow-600 mx-auto mb-1" />
                            <div className="font-bold text-yellow-800">Archive</div>
                            <div className="text-yellow-600">Read-only storage</div>
                        </div>
                        <ArrowRightIcon size={18} className="text-green-400 flex-shrink-0" />
                        <div className="bg-red-100 border-2 border-red-300 rounded-xl px-4 py-3 text-center min-w-[100px] shadow-sm">
                            <TrashIcon size={20} className="text-red-600 mx-auto mb-1" />
                            <div className="font-bold text-red-800">Delete</div>
                            <div className="text-red-600">Securely destroyed</div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white/90 backdrop-blur rounded-xl p-4 border border-amber-100 shadow-sm">
                        <div className="flex items-center gap-2 font-semibold text-amber-800 mb-2">
                            <FileTextIcon size={16} className="text-amber-600" />
                            <span>How Long We Keep Things</span>
                        </div>
                        <ul className="text-amber-700 space-y-0.5">
                            <li><strong>Tickets & billing:</strong> 7 years</li>
                            <li><strong>Account info:</strong> 3 years after last use</li>
                            <li><strong>File attachments:</strong> 3 years after ticket closed</li>
                            <li><strong>Access logs:</strong> 90 days</li>
                            <li><strong>Feedback:</strong> 5 years</li>
                        </ul>
                    </div>
                    <div className="bg-white/90 backdrop-blur rounded-xl p-4 border border-amber-100 shadow-sm">
                        <div className="flex items-center gap-2 font-semibold text-amber-800 mb-2">
                            <GlobeIcon size={16} className="text-amber-600" />
                            <span>Country-Specific Rules</span>
                        </div>
                        <p className="text-amber-700">We auto-apply the longest required period based on your country. <strong>India (DPDP):</strong> delete when purpose served. <strong>EU (GDPR):</strong> proportionate retention. <strong>Turkey:</strong> up to 10 years. <strong>Indonesia:</strong> up to 30 years for civil claims.</p>
                    </div>
                    <div className="bg-white/90 backdrop-blur rounded-xl p-4 border border-amber-100 shadow-sm">
                        <div className="flex items-center gap-2 font-semibold text-amber-800 mb-2">
                            <LockIcon size={16} className="text-amber-600" />
                            <span>Secure Deletion</span>
                        </div>
                        <p className="text-amber-700">Data is permanently destroyed with multi-pass overwriting. Backups are purged too. You can request early deletion anytime &mdash; we will honor it unless the law says we must keep it longer.</p>
                    </div>
                </div>
                <div className="mt-4 text-xs text-amber-500 text-center font-medium bg-amber-50/50 rounded-lg py-2">
                    This summary is for understanding. The full policy below is the legally binding document.
                </div>
            </div>

            <section className="mb-10">
                <h2>1. Policy Overview</h2>
                <p>
                    This Data Retention Policy outlines how Arkynox manages, retains, and disposes of data
                    collected through the ArkyDesk support system. This policy ensures compliance with
                    legal requirements, business needs, and privacy regulations while minimizing data storage risks.
                </p>
                <p>
                    This policy applies to all data processed through our support system, including personal
                    information, support tickets, communications, and system logs.
                </p>
            </section>

            <section className="mb-10">
                <h2>2. Data Categories and Retention Periods</h2>

                <div className="not-prose overflow-x-auto mb-6">
                    <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                        <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                            <tr>
                                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Data Category</th>
                                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Retention Period</th>
                                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Justification</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            <tr className="hover:bg-gray-50/30 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">User Account Information</td>
                                <td className="px-6 py-4 text-sm text-gray-600">3 years after last activity</td>
                                <td className="px-6 py-4 text-sm text-gray-600">Business continuity and service history</td>
                            </tr>
                            <tr className="hover:bg-gray-50/30 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Support Tickets</td>
                                <td className="px-6 py-4 text-sm text-gray-600">7 years</td>
                                <td className="px-6 py-4 text-sm text-gray-600">Legal compliance and knowledge base</td>
                            </tr>
                            <tr className="hover:bg-gray-50/30 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Ticket Communications</td>
                                <td className="px-6 py-4 text-sm text-gray-600">7 years</td>
                                <td className="px-6 py-4 text-sm text-gray-600">Support continuity and training</td>
                            </tr>
                            <tr className="hover:bg-gray-50/30 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">File Attachments</td>
                                <td className="px-6 py-4 text-sm text-gray-600">3 years after ticket closure</td>
                                <td className="px-6 py-4 text-sm text-gray-600">Technical reference and troubleshooting</td>
                            </tr>
                            <tr className="hover:bg-gray-50/30 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">System Access Logs</td>
                                <td className="px-6 py-4 text-sm text-gray-600">90 days</td>
                                <td className="px-6 py-4 text-sm text-gray-600">Security monitoring and troubleshooting</td>
                            </tr>
                            <tr className="hover:bg-gray-50/30 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Error Logs</td>
                                <td className="px-6 py-4 text-sm text-gray-600">1 year</td>
                                <td className="px-6 py-4 text-sm text-gray-600">System improvement and debugging</td>
                            </tr>
                            <tr className="hover:bg-gray-50/30 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Performance Metrics</td>
                                <td className="px-6 py-4 text-sm text-gray-600">2 years</td>
                                <td className="px-6 py-4 text-sm text-gray-600">Service improvement and capacity planning</td>
                            </tr>
                            <tr className="hover:bg-gray-50/30 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Customer Feedback</td>
                                <td className="px-6 py-4 text-sm text-gray-600">5 years</td>
                                <td className="px-6 py-4 text-sm text-gray-600">Quality improvement and analysis</td>
                            </tr>
                            <tr className="hover:bg-gray-50/30 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Billing Records</td>
                                <td className="px-6 py-4 text-sm text-gray-600">7 years</td>
                                <td className="px-6 py-4 text-sm text-gray-600">Tax and regulatory compliance</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="mb-10">
                <h2>3. Data Lifecycle Management</h2>

                <h3>3.1 Active Data Phase</h3>
                <ul>
                    <li><strong>Storage:</strong> Primary production systems with regular backups</li>
                    <li><strong>Access:</strong> Available to authorized users and support staff</li>
                    <li><strong>Processing:</strong> Used for active support operations and service delivery</li>
                    <li><strong>Security:</strong> Full encryption and access controls applied</li>
                </ul>

                <h3>3.2 Archive Phase</h3>
                <ul>
                    <li><strong>Migration:</strong> Data moved to long-term archive systems</li>
                    <li><strong>Access:</strong> Read-only access for authorized personnel only</li>
                    <li><strong>Retrieval:</strong> Available upon request for legal or business needs</li>
                    <li><strong>Cost Optimization:</strong> Stored in cost-effective archive storage</li>
                </ul>

                <h3>3.3 Disposal Phase</h3>
                <ul>
                    <li><strong>Secure Deletion:</strong> Data permanently destroyed using industry standards</li>
                    <li><strong>Certification:</strong> Disposal process documented and certified</li>
                    <li><strong>Verification:</strong> Deletion verified through automated processes</li>
                    <li><strong>Audit Trail:</strong> Complete record of disposal activities maintained</li>
                </ul>
            </section>

            <section className="mb-10">
                <h2>4. Legal Hold Procedures</h2>

                <div className="not-prose bg-gradient-to-br from-yellow-50 to-amber-50/50 border border-yellow-200 rounded-xl p-6 shadow-sm mb-6">
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
                            <AlertTriangleIcon size={20} className="text-yellow-500" />
                        </div>
                        <div>
                            <h3 className="font-bold text-yellow-800 mb-1">Legal Hold Override</h3>
                            <p className="text-sm text-yellow-700">
                                When subject to legal hold, litigation, or regulatory investigation,
                                normal retention periods are suspended until the hold is released.
                            </p>
                        </div>
                    </div>
                </div>

                <h3>4.1 Legal Hold Process</h3>
                <ol>
                    <li><strong>Identification:</strong> Legal team identifies data subject to hold</li>
                    <li><strong>Preservation:</strong> Automated systems prevent data deletion</li>
                    <li><strong>Notification:</strong> Relevant staff notified of hold requirements</li>
                    <li><strong>Monitoring:</strong> Ongoing monitoring ensures hold compliance</li>
                    <li><strong>Release:</strong> Hold released only upon legal authorization</li>
                </ol>

                <h3>4.2 Hold Categories</h3>
                <ul>
                    <li><strong>Litigation Hold:</strong> Data relevant to legal proceedings</li>
                    <li><strong>Regulatory Hold:</strong> Data required for regulatory investigations</li>
                    <li><strong>Internal Investigation:</strong> Data related to internal compliance matters</li>
                    <li><strong>Audit Hold:</strong> Data subject to external audits</li>
                </ul>
            </section>

            <section className="mb-10">
                <h2>5. Data Subject Rights</h2>

                <h3>5.1 Right to Erasure</h3>
                <p>
                    Data subjects may request deletion of their personal information before the standard
                    retention period expires, subject to legal and business requirements.
                </p>

                <h3>5.2 Erasure Limitations</h3>
                <div className="not-prose bg-gradient-to-br from-red-50 to-rose-50/50 border border-red-200 rounded-xl p-6 shadow-sm mb-6">
                    <p className="text-sm text-gray-700 mb-3"><strong>Erasure may be limited when data is:</strong></p>
                    <ul className="text-sm text-gray-600 space-y-1.5">
                        <li className="flex items-start gap-2"><InfoIcon size={14} className="text-red-500 mt-0.5 flex-shrink-0" />Required for legal compliance or defense</li>
                        <li className="flex items-start gap-2"><InfoIcon size={14} className="text-red-500 mt-0.5 flex-shrink-0" />Necessary for contract performance</li>
                        <li className="flex items-start gap-2"><InfoIcon size={14} className="text-red-500 mt-0.5 flex-shrink-0" />Subject to legal hold or investigation</li>
                        <li className="flex items-start gap-2"><InfoIcon size={14} className="text-red-500 mt-0.5 flex-shrink-0" />Required for public interest or safety</li>
                        <li className="flex items-start gap-2"><InfoIcon size={14} className="text-red-500 mt-0.5 flex-shrink-0" />Needed for legitimate business purposes</li>
                    </ul>
                </div>

                <h3>5.3 Request Process</h3>
                <ol>
                    <li>Submit request through support portal or email</li>
                    <li>Identity verification and request validation</li>
                    <li>Assessment of legal and business requirements</li>
                    <li>Approval or explanation of limitations</li>
                    <li>Data deletion or archival as appropriate</li>
                    <li>Confirmation of action taken</li>
                </ol>
            </section>

            <section className="mb-10">
                <h2>6. Security and Access Controls</h2>

                <h3>6.1 Access Restrictions</h3>
                <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-200 rounded-xl p-6 shadow-sm">
                        <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <DatabaseIcon size={18} className="text-blue-500" />
                            Active Data Access
                        </h4>
                        <ul className="text-sm text-gray-600 space-y-1.5">
                            <li className="flex items-center gap-2"><UsersIcon size={14} className="text-blue-400" />Support staff (role-based)</li>
                            <li className="flex items-center gap-2"><UsersIcon size={14} className="text-blue-400" />System administrators</li>
                            <li className="flex items-center gap-2"><CheckIcon size={14} className="text-blue-400" />Data subjects (own data only)</li>
                            <li className="flex items-center gap-2"><UsersIcon size={14} className="text-blue-400" />Authorized managers</li>
                        </ul>
                    </div>
                    <div className="bg-gradient-to-br from-orange-50 to-amber-50/50 border border-orange-200 rounded-xl p-6 shadow-sm">
                        <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <ArchiveIcon size={18} className="text-orange-500" />
                            Archived Data Access
                        </h4>
                        <ul className="text-sm text-gray-600 space-y-1.5">
                            <li className="flex items-center gap-2"><ShieldIcon size={14} className="text-orange-400" />Legal team (as needed)</li>
                            <li className="flex items-center gap-2"><UsersIcon size={14} className="text-orange-400" />Senior management</li>
                            <li className="flex items-center gap-2"><SearchIcon size={14} className="text-orange-400" />Compliance officers</li>
                            <li className="flex items-center gap-2"><EyeIcon size={14} className="text-orange-400" />External auditors</li>
                        </ul>
                    </div>
                </div>

                <h3>6.2 Security Measures</h3>
                <ul>
                    <li><strong>Encryption:</strong> Data encrypted at rest and in transit</li>
                    <li><strong>Access Logging:</strong> All data access logged and monitored</li>
                    <li><strong>Authentication:</strong> Multi-factor authentication required</li>
                    <li><strong>Authorization:</strong> Principle of least privilege enforced</li>
                    <li><strong>Monitoring:</strong> Automated monitoring for unauthorized access</li>
                </ul>
            </section>

            <section className="mb-10">
                <h2>7. Backup and Disaster Recovery</h2>

                <h3>7.1 Backup Strategy</h3>
                <ul>
                    <li><strong>Frequency:</strong> Daily incremental, weekly full backups</li>
                    <li><strong>Retention:</strong> 30 days online, 90 days offline</li>
                    <li><strong>Testing:</strong> Monthly backup restoration tests</li>
                    <li><strong>Security:</strong> Backups encrypted and access-controlled</li>
                </ul>

                <h3>7.2 Disaster Recovery</h3>
                <div className="not-prose bg-gradient-to-br from-green-50 to-emerald-50/50 border border-green-200 rounded-xl p-6 shadow-sm">
                    <ul className="text-sm text-gray-600 space-y-2">
                        <li className="flex items-start gap-2"><ClockIcon size={14} className="text-green-500 mt-0.5 flex-shrink-0" /><strong>RTO (Recovery Time Objective):</strong> 4 hours</li>
                        <li className="flex items-start gap-2"><ClockIcon size={14} className="text-green-500 mt-0.5 flex-shrink-0" /><strong>RPO (Recovery Point Objective):</strong> 1 hour</li>
                        <li className="flex items-start gap-2"><GlobeIcon size={14} className="text-green-500 mt-0.5 flex-shrink-0" /><strong>Geographic Redundancy:</strong> Multi-region backup storage</li>
                        <li className="flex items-start gap-2"><RefreshCwIcon size={14} className="text-green-500 mt-0.5 flex-shrink-0" /><strong>Testing:</strong> Quarterly disaster recovery drills</li>
                    </ul>
                </div>
            </section>

            <section className="mb-10">
                <h2>8. Compliance and Monitoring</h2>

                <h3>8.1 Automated Processes</h3>
                <ul>
                    <li><strong>Retention Tracking:</strong> Automated tracking of retention periods</li>
                    <li><strong>Disposal Alerts:</strong> Automated alerts for data eligible for deletion</li>
                    <li><strong>Policy Enforcement:</strong> System-level enforcement of retention rules</li>
                    <li><strong>Audit Logging:</strong> Comprehensive logging of all data operations</li>
                </ul>

                <h3>8.2 Regular Reviews</h3>
                <ul>
                    <li><strong>Monthly:</strong> Data disposal process review</li>
                    <li><strong>Quarterly:</strong> Retention policy compliance audit</li>
                    <li><strong>Annually:</strong> Full policy review and update</li>
                    <li><strong>Ad-hoc:</strong> Reviews triggered by legal or regulatory changes</li>
                </ul>
            </section>

            <section className="mb-10">
                <h2>9. Policy Exceptions</h2>

                <h3>9.1 Exception Process</h3>
                <ol>
                    <li>Submit written request with business justification</li>
                    <li>Review by Data Protection Officer and Legal team</li>
                    <li>Risk assessment and approval process</li>
                    <li>Documentation of exception and monitoring requirements</li>
                    <li>Regular review of ongoing exceptions</li>
                </ol>

                <h3>9.2 Valid Exception Reasons</h3>
                <ul>
                    <li>Legal or regulatory requirements</li>
                    <li>Active litigation or investigation</li>
                    <li>Critical business continuity needs</li>
                    <li>Customer-specific contractual obligations</li>
                </ul>
            </section>

            <section className="mb-10">
                <h2>10. Country-Specific Retention Requirements</h2>
                <p>
                    Different jurisdictions mandate minimum and maximum data retention periods for various
                    data categories. Where local law requires a longer retention period than our standard
                    policy, the local requirement prevails. Where local law requires earlier deletion,
                    we accommodate that for users in that jurisdiction.
                </p>

                <div className="not-prose overflow-x-auto mb-6">
                    <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-xl overflow-hidden text-sm shadow-sm">
                        <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                            <tr>
                                <th className="px-4 py-3.5 text-left font-semibold text-gray-700">Country</th>
                                <th className="px-4 py-3.5 text-left font-semibold text-gray-700">Key Retention Requirements</th>
                                <th className="px-4 py-3.5 text-left font-semibold text-gray-700">Statute of Limitations</th>
                                <th className="px-4 py-3.5 text-left font-semibold text-gray-700">Impact on Our Policy</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-4 py-3 font-medium">EU/EEA</td><td className="px-4 py-3 text-xs">GDPR Art. 5(1)(e): Data kept no longer than necessary. Limitation periods vary by country (typically 3-6 years for contracts).</td><td className="px-4 py-3">3-6 yrs</td><td className="px-4 py-3 text-xs">Our 7-year max covers all EU limitation periods</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-4 py-3 font-medium">UK</td><td className="px-4 py-3 text-xs">Limitation Act 1980: 6 years for contracts. Data retention must be proportionate.</td><td className="px-4 py-3">6 yrs</td><td className="px-4 py-3 text-xs">7-year retention aligns with UK requirements</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-4 py-3 font-medium">India</td><td className="px-4 py-3 text-xs">DPDP Act 2023: Data to be deleted when purpose is served. IT Act: 8 years for certain financial records. Companies Act: 8 years for books of account.</td><td className="px-4 py-3">3 yrs</td><td className="px-4 py-3 text-xs">Compliant. Deletion on request per DPDP Act.</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-4 py-3 font-medium">Brazil</td><td className="px-4 py-3 text-xs">LGPD Art. 16: Data can be retained for compliance, research, or anonymization. Civil Code: 3-10 years depending on claim type.</td><td className="px-4 py-3">3-10 yrs</td><td className="px-4 py-3 text-xs">7-year policy covers most LGPD requirements</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-4 py-3 font-medium">Russia</td><td className="px-4 py-3 text-xs">152-FZ: No fixed retention period, must be based on purpose. Tax Code: 4-6 years for accounting records. Data must be stored on Russian servers.</td><td className="px-4 py-3">3 yrs</td><td className="px-4 py-3 text-xs">We apply purpose-based retention + in-country storage</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-4 py-3 font-medium">Japan</td><td className="px-4 py-3 text-xs">APPI: Personal data must be deleted when purpose is achieved. Civil Code: 5 years for contractual claims (amended from 10 in 2020).</td><td className="px-4 py-3">5 yrs</td><td className="px-4 py-3 text-xs">Deletion on request. 5 years for contractual records.</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-4 py-3 font-medium">United States</td><td className="px-4 py-3 text-xs">Federal: 3-7 years for various regulated records. State laws vary. CCPA: No mandatory retention period, but must disclose retention.</td><td className="px-4 py-3">2-6 yrs</td><td className="px-4 py-3 text-xs">7-year policy covers US federal and state variation</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-4 py-3 font-medium">Australia</td><td className="px-4 py-3 text-xs">Privacy Act: Must destroy or de-identify when no longer needed. Corporations Act: 7 years for financial records.</td><td className="px-4 py-3">6 yrs</td><td className="px-4 py-3 text-xs">7-year retention aligns with Corporations Act</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-4 py-3 font-medium">Turkey</td><td className="px-4 py-3 text-xs">KVKK: Data must be deleted/anonymized when processing purpose ends. Turkish Code of Obligations: 10 years.</td><td className="px-4 py-3">10 yrs</td><td className="px-4 py-3 text-xs">7-year policy extended to 10 years for Turkish users where required</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-4 py-3 font-medium">South Africa</td><td className="px-4 py-3 text-xs">POPIA: Retention must be justifiable. Prescription Act: 3-6 years depending on debt type.</td><td className="px-4 py-3">3-6 yrs</td><td className="px-4 py-3 text-xs">7-year policy covers all POPIA requirements</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-4 py-3 font-medium">Nigeria</td><td className="px-4 py-3 text-xs">NDPR: Data must be retained only as long as necessary for lawful purpose. Companies and Allied Matters Act: 6 years for records.</td><td className="px-4 py-3">6 yrs</td><td className="px-4 py-3 text-xs">7-year retention covers CAMA requirements</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-4 py-3 font-medium">Kenya</td><td className="px-4 py-3 text-xs">Data Protection Act 2019: Retain only as long as necessary. Limitation of Actions Act: 6 years for contracts.</td><td className="px-4 py-3">6 yrs</td><td className="px-4 py-3 text-xs">7-year retention covers Kenyan requirements</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-4 py-3 font-medium">Indonesia</td><td className="px-4 py-3 text-xs">UU PDP: Data must be deleted when retention period expires or purpose is fulfilled. Civil Code: 30 years for certain claims.</td><td className="px-4 py-3">30 yrs</td><td className="px-4 py-3 text-xs">Longer retention for Indonesian users where required by Civil Code</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-4 py-3 font-medium">Thailand</td><td className="px-4 py-3 text-xs">PDPA: No fixed retention period. Civil and Commercial Code: 10 years for contracts.</td><td className="px-4 py-3">10 yrs</td><td className="px-4 py-3 text-xs">Extended to 10 years for Thai users where required</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-4 py-3 font-medium">Philippines</td><td className="px-4 py-3 text-xs">Data Privacy Act: Retain only as long as necessary. Civil Code: 10 years for written contracts.</td><td className="px-4 py-3">10 yrs</td><td className="px-4 py-3 text-xs">Extended to 10 years for Philippine users where required</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-4 py-3 font-medium">South Korea</td><td className="px-4 py-3 text-xs">PIPA: Must destroy when purpose achieved. Act on Consumer Protection: 5 years for transaction records.</td><td className="px-4 py-3">3-5 yrs</td><td className="px-4 py-3 text-xs">5-year minimum for records, deletion on request</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-4 py-3 font-medium">Sri Lanka</td><td className="px-4 py-3 text-xs">PDPA No. 9 of 2022: Data must be destroyed when purpose is fulfilled. Prescription Ordinance: 6 years for contracts.</td><td className="px-4 py-3">6 yrs</td><td className="px-4 py-3 text-xs">7-year policy covers Sri Lankan requirements</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-4 py-3 font-medium">Kazakhstan</td><td className="px-4 py-3 text-xs">Law No. 94-V: No fixed period, purpose-based. Civil Code: 3 years general. Data must be stored in Kazakhstan.</td><td className="px-4 py-3">3 yrs</td><td className="px-4 py-3 text-xs">Purpose-based retention with in-country storage</td></tr>
                        </tbody>
                    </table>
                </div>

                <div className="not-prose bg-gradient-to-br from-yellow-50 to-amber-50/50 border border-yellow-200 rounded-xl p-5 shadow-sm">
                    <div className="flex items-start gap-3">
                        <EyeIcon size={18} className="text-yellow-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-yellow-800">
                            <strong>How this works in practice:</strong> Our system automatically applies the
                            longest legally required retention period based on your country of residence and the
                            type of data. Upon your request, we will delete data earlier where permitted by law.
                            If you move to a different country, the retention rules of your new country of
                            residence will apply to data collected after the move.
                        </p>
                    </div>
                </div>
            </section>

            <section className="mb-10">
                <h2>11. Contact Information</h2>
                <div className="not-prose bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-200 rounded-xl p-6 shadow-sm">
                    <p className="text-sm text-gray-600 mb-4">
                        For questions about data retention or to request data deletion:
                    </p>
                    <ul className="text-sm text-gray-600 space-y-2">
                        <li className="flex items-center gap-2"><ShieldIcon size={16} className="text-blue-500" /><strong>Data Protection Officer:</strong> dpo@arkynox.com</li>
                        <li className="flex items-center gap-2"><FileTextIcon size={16} className="text-blue-500" /><strong>Support Portal:</strong> Create a ticket with &ldquo;Data Retention&rdquo; subject</li>
                        <li className="flex items-center gap-2"><ScaleIcon size={16} className="text-blue-500" /><strong>Legal Team:</strong> legal@arkynox.com</li>
                        <li className="flex items-center gap-2"><LockIcon size={16} className="text-blue-500" /><strong>Privacy Requests:</strong> privacy@arkynox.com</li>
                    </ul>
                </div>
            </section>
        </PolicyLayout>
    );
}

function ArrowRightIcon({ size, className }: { size?: number; className?: string }) {
    return (
        <svg
            width={size || 24}
            height={size || 24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
        </svg>
    );
}

function ScaleIcon({ size, className }: { size?: number; className?: string }) {
    return (
        <svg
            width={size || 24}
            height={size || 24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M12 22V8" />
            <path d="M6 12H2v4h4" />
            <path d="M18 12h4v4h-4" />
            <path d="M12 2L8 6h8z" />
            <path d="M10 14h4" />
        </svg>
    );
}
