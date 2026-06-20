
'use client';

import { useEffect } from 'react';

export default function PrivacyPolicy() {
    useEffect(() => {
        document.title = 'Privacy Policy - Arkynox Support';
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="text-center mb-8">
                        <img src="/logo/logo.png" alt="Arkynox Logo" className="h-16 mx-auto mb-4" />
                        <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
                        <p className="text-gray-600 mt-2">Effective Date: June 20, 2026</p>
                    </div>

                    <div className="prose max-w-none">
                        {/* Quick Summary - Plain Language */}
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mb-8">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-blue-100 rounded-full p-2">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-blue-900">Quick Summary (Plain English) 🗺️</h3>
                                    <p className="text-sm text-blue-700">What happens to your data when you use our support system</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                <div className="bg-white/80 rounded-lg p-3 border border-blue-100">
                                    <div className="font-semibold text-blue-800 mb-1">📥 What We Collect</div>
                                    <p className="text-blue-700">Name, email, ticket details, files you upload, and technical data (browser, IP). We only collect what's needed to help you.</p>
                                </div>
                                <div className="bg-white/80 rounded-lg p-3 border border-blue-100">
                                    <div className="font-semibold text-blue-800 mb-1">🔒 How We Protect It</div>
                                    <p className="text-blue-700">AES-256 encryption, TLS 1.3, multi-factor auth, role-based access, regular security audits. Your data is locked down tight.</p>
                                </div>
                                <div className="bg-white/80 rounded-lg p-3 border border-blue-100">
                                    <div className="font-semibold text-blue-800 mb-1">🌍 Your Rights By Country</div>
                                    <p className="text-blue-700">We honor GDPR (EU), DPDP Act (India), LGPD (Brazil), CCPA (US), POPIA (SA), and 20+ other privacy laws. See Section 11 for your specific rights.</p>
                                </div>
                                <div className="bg-white/80 rounded-lg p-3 border border-blue-100">
                                    <div className="font-semibold text-blue-800 mb-1">🔄 Data Sharing</div>
                                    <p className="text-blue-700">We never sell your data. We share only with trusted service providers (hosting, email) under strict contracts. No third-party marketing.</p>
                                </div>
                                <div className="bg-white/80 rounded-lg p-3 border border-blue-100">
                                    <div className="font-semibold text-blue-800 mb-1">⏱️ How Long We Keep It</div>
                                    <p className="text-blue-700">Tickets: 7 years. Account info: 3 years after last activity. Logs: 90 days. You can request earlier deletion anytime.</p>
                                </div>
                                <div className="bg-white/80 rounded-lg p-3 border border-blue-100">
                                    <div className="font-semibold text-blue-800 mb-1">📞 Need Help?</div>
                                    <p className="text-blue-700">Email privacy@arkynox.com or create a "Privacy Request" ticket. We respond within 48 hours. Your privacy matters to us.</p>
                                </div>
                            </div>
                            <div className="mt-3 text-xs text-blue-600 text-center">
                                This summary is for understanding. The full policy below is the legally binding document.
                            </div>
                        </div>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                At Arkynox ("we," "us," or "our"), we are committed to protecting your privacy and personal information. 
                                This Privacy Policy explains how we collect, use, store, and protect your information when you use our 
                                ArkynoxDesk support ticket system, help desk services, knowledge base, live chat, and related customer 
                                support tools ("Services").
                            </p>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                This policy applies to all users including end customers who submit tickets, agents who provide support, 
                                administrators who manage the system, and visitors to our platform. By using our Services, you agree to 
                                the collection and use of information in accordance with this policy.
                            </p>
                            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-4">
                                <p className="text-sm text-amber-800">
                                    <strong>Important:</strong> This policy covers data processing activities specific to support ticket 
                                    systems. If you also use other Arkynox products or services, additional privacy policies may apply.
                                </p>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Information We Collect</h2>
                            
                            <h3 className="text-xl font-medium text-gray-800 mb-3">2.1 Customer Information</h3>
                            <p className="text-gray-700 leading-relaxed mb-3">
                                When you create a support ticket or account, we collect:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li><strong>Identity Information:</strong> Full name, email address, phone number, job title</li>
                                <li><strong>Organization Details:</strong> Company name, department, organization size</li>
                                <li><strong>Account Credentials:</strong> Username, securely hashed passwords, security questions</li>
                                <li><strong>Profile Data:</strong> Avatar images, timezone, language preferences, notification settings</li>
                                <li><strong>Verification Data:</strong> Email verification tokens, two-factor authentication codes</li>
                            </ul>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">2.2 Support Ticket Data</h3>
                            <p className="text-gray-700 leading-relaxed mb-3">
                                This is the core data of our support system and includes:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li><strong>Ticket Content:</strong> Subject lines, descriptions, problem details, solution requests</li>
                                <li><strong>Conversation History:</strong> All messages between customers and support agents</li>
                                <li><strong>File Attachments:</strong> Screenshots, documents, logs, videos, and other uploaded files</li>
                                <li><strong>Ticket Metadata:</strong> Priority levels, categories, tags, status changes, escalations</li>
                                <li><strong>Resolution Data:</strong> Solutions provided, customer satisfaction ratings, feedback</li>
                                <li><strong>Assignment Information:</strong> Which agents handled tickets, response times, resolution times</li>
                            </ul>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">2.3 Communication Data</h3>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li><strong>Email Communications:</strong> All emails sent and received through our system</li>
                                <li><strong>Live Chat Records:</strong> Real-time chat conversations and transcripts</li>
                                <li><strong>Phone Call Data:</strong> Call recordings (where legally permitted and disclosed)</li>
                                <li><strong>Internal Notes:</strong> Agent-to-agent communications about tickets (not visible to customers)</li>
                                <li><strong>Automated Messages:</strong> System-generated notifications and responses</li>
                            </ul>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">2.4 Technical and Usage Data</h3>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li><strong>Device Information:</strong> Browser type/version, operating system, screen resolution</li>
                                <li><strong>Network Data:</strong> IP addresses, ISP information, geographic location (city/country level)</li>
                                <li><strong>Session Data:</strong> Login/logout times, session duration, pages visited</li>
                                <li><strong>Performance Metrics:</strong> Page load times, error rates, feature usage statistics</li>
                                <li><strong>Security Logs:</strong> Failed login attempts, suspicious activities, access patterns</li>
                            </ul>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">2.5 Integration Data</h3>
                            <p className="text-gray-700 leading-relaxed mb-3">
                                When you connect third-party services to your support system:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li><strong>API Credentials:</strong> Tokens and keys for integrated services (stored encrypted)</li>
                                <li><strong>Synchronized Data:</strong> User profiles, product information, order history from connected systems</li>
                                <li><strong>Webhook Data:</strong> Event notifications and status updates from external platforms</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. How We Use Your Information</h2>
                            
                            <h3 className="text-xl font-medium text-gray-800 mb-3">3.1 Primary Support Functions</h3>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li><strong>Ticket Processing:</strong> Create, track, route, and resolve support requests</li>
                                <li><strong>Communication:</strong> Send notifications, updates, and responses via email, SMS, or in-app</li>
                                <li><strong>Agent Assignment:</strong> Route tickets to appropriate support agents based on expertise</li>
                                <li><strong>Escalation Management:</strong> Automatically escalate high-priority or overdue tickets</li>
                                <li><strong>Knowledge Base:</strong> Create and maintain help articles based on common issues</li>
                            </ul>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">3.2 Service Improvement</h3>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li><strong>Performance Analytics:</strong> Measure response times, resolution rates, and customer satisfaction</li>
                                <li><strong>Trend Analysis:</strong> Identify common issues and improve products/services</li>
                                <li><strong>Agent Training:</strong> Use anonymized ticket data to train support staff</li>
                                <li><strong>System Optimization:</strong> Improve platform performance and user experience</li>
                                <li><strong>Predictive Support:</strong> Proactively identify and prevent potential issues</li>
                            </ul>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">3.3 Account and Security Management</h3>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li><strong>Authentication:</strong> Verify identity and secure account access</li>
                                <li><strong>Authorization:</strong> Control access to features based on user roles and permissions</li>
                                <li><strong>Fraud Prevention:</strong> Detect and prevent unauthorized access or suspicious activities</li>
                                <li><strong>Security Monitoring:</strong> Monitor for potential security threats and vulnerabilities</li>
                                <li><strong>Backup and Recovery:</strong> Maintain data backups for business continuity</li>
                            </ul>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">3.4 Legal Basis for Processing (GDPR)</h3>
                            <div className="bg-blue-50 p-4 rounded-lg mb-4">
                                <p className="text-gray-700 text-sm mb-3">We process your data based on the following legal grounds:</p>
                                <ul className="list-disc pl-6 text-gray-700 text-sm space-y-1">
                                    <li><strong>Contract Performance:</strong> Processing necessary to provide support services</li>
                                    <li><strong>Legitimate Interest:</strong> Improving services, security, and business operations</li>
                                    <li><strong>Consent:</strong> Marketing communications and optional features</li>
                                    <li><strong>Legal Compliance:</strong> Compliance with regulations and legal obligations</li>
                                </ul>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Information Sharing and Disclosure</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We do not sell, trade, or rent your personal information to third parties. However, support ticket 
                                systems require certain types of data sharing to function effectively:
                            </p>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">4.1 Within Your Organization</h3>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li><strong>Support Agents:</strong> Assigned agents can view tickets and customer information needed to provide support</li>
                                <li><strong>Supervisors and Managers:</strong> May access tickets for quality assurance and training purposes</li>
                                <li><strong>Administrators:</strong> System admins can access user accounts and tickets for system management</li>
                                <li><strong>Escalation Teams:</strong> Specialized teams may access escalated tickets requiring expert knowledge</li>
                            </ul>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">4.2 Service Providers and Subprocessors</h3>
                            <p className="text-gray-700 leading-relaxed mb-3">
                                We may share data with trusted service providers who help us deliver our services:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li><strong>Cloud Infrastructure:</strong> AWS, Google Cloud, or Microsoft Azure for hosting and storage</li>
                                <li><strong>Email Services:</strong> SendGrid, Mailgun, or similar for sending notifications</li>
                                <li><strong>Authentication Providers:</strong> Single sign-on (SSO) providers like Okta or Auth0</li>
                                <li><strong>Analytics Services:</strong> Google Analytics, Mixpanel for usage analysis (anonymized data only)</li>
                                <li><strong>Monitoring Services:</strong> Error tracking and performance monitoring tools</li>
                            </ul>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">4.3 Business Transfers</h3>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                If Arkynox is involved in a merger, acquisition, or sale of all or a portion of its assets, 
                                your information may be transferred. We will provide notice before your personal information 
                                is transferred and becomes subject to a different Privacy Policy.
                            </p>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">4.4 Legal Requirements</h3>
                            <p className="text-gray-700 leading-relaxed mb-3">
                                We may disclose your information if required to do so by law or in response to:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li>Valid legal process (subpoenas, court orders)</li>
                                <li>Government investigations or law enforcement requests</li>
                                <li>Protection of our legal rights and property</li>
                                <li>Prevention of fraud or other illegal activities</li>
                                <li>Protection of the safety of our users or the public</li>
                            </ul>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">4.5 Data Processing Agreements</h3>
                            <div className="bg-green-50 p-4 rounded-lg mb-4">
                                <p className="text-green-800 text-sm">
                                    <strong>GDPR Compliance:</strong> All service providers and subprocessors sign Data Processing 
                                    Agreements (DPAs) ensuring they meet the same privacy standards we maintain. We conduct 
                                    regular audits of our service providers' security and privacy practices.
                                </p>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Data Security and Protection</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Security is paramount in a support ticket system. We implement comprehensive security measures 
                                specifically designed for support platforms:
                            </p>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">5.1 Technical Security Measures</h3>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li><strong>Encryption:</strong> AES-256 encryption for data at rest, TLS 1.3 for data in transit</li>
                                <li><strong>Database Security:</strong> Encrypted databases with restricted access and audit logs</li>
                                <li><strong>File Upload Security:</strong> Virus scanning, file type restrictions, and sandboxed storage</li>
                                <li><strong>Access Controls:</strong> Role-based permissions, multi-factor authentication, session timeouts</li>
                                <li><strong>Network Security:</strong> Firewalls, intrusion detection, DDoS protection</li>
                                <li><strong>Regular Penetration Testing:</strong> Third-party security assessments and vulnerability scans</li>
                            </ul>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">5.2 Administrative Security</h3>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li><strong>Employee Access:</strong> Strict need-to-know basis with background checks</li>
                                <li><strong>Training Programs:</strong> Regular security and privacy training for all staff</li>
                                <li><strong>Incident Response:</strong> Documented procedures for security breach response</li>
                                <li><strong>Audit Trails:</strong> Comprehensive logging of all system access and modifications</li>
                                <li><strong>Third-Party Assessments:</strong> SOC 2 Type II certification and regular audits</li>
                            </ul>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">5.3 Support-Specific Security</h3>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li><strong>Ticket Isolation:</strong> Customer tickets are isolated by organization/account</li>
                                <li><strong>Agent Permissions:</strong> Support agents only access tickets assigned to them</li>
                                <li><strong>Data Masking:</strong> Sensitive information (credit cards, SSNs) automatically masked</li>
                                <li><strong>Secure File Sharing:</strong> Encrypted file uploads with expiration dates</li>
                                <li><strong>Communication Security:</strong> All emails and chats encrypted and authenticated</li>
                            </ul>

                            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                                <p className="text-red-800 text-sm">
                                    <strong>Breach Notification:</strong> In the unlikely event of a data breach affecting your 
                                    personal information, we will notify you within 72 hours of discovery and provide details 
                                    about the incident and steps being taken to address it.
                                </p>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Data Retention and Deletion</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Support ticket systems require careful data retention policies to balance business needs, 
                                legal requirements, and privacy rights:
                            </p>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">6.1 Retention Periods</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse border border-gray-300 text-sm mb-4">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Data Type</th>
                                            <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Retention Period</th>
                                            <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Reason</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="border border-gray-300 px-4 py-2">Active Support Tickets</td>
                                            <td className="border border-gray-300 px-4 py-2">Until resolved + 7 years</td>
                                            <td className="border border-gray-300 px-4 py-2">Legal compliance, warranty support</td>
                                        </tr>
                                        <tr className="bg-gray-50">
                                            <td className="border border-gray-300 px-4 py-2">Account Information</td>
                                            <td className="border border-gray-300 px-4 py-2">Until deletion + 3 years</td>
                                            <td className="border border-gray-300 px-4 py-2">Business records, audit requirements</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 px-4 py-2">Chat/Communication Logs</td>
                                            <td className="border border-gray-300 px-4 py-2">5 years</td>
                                            <td className="border border-gray-300 px-4 py-2">Quality assurance, training</td>
                                        </tr>
                                        <tr className="bg-gray-50">
                                            <td className="border border-gray-300 px-4 py-2">File Attachments</td>
                                            <td className="border border-gray-300 px-4 py-2">Same as related ticket</td>
                                            <td className="border border-gray-300 px-4 py-2">Support context, evidence</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 px-4 py-2">System/Access Logs</td>
                                            <td className="border border-gray-300 px-4 py-2">2 years</td>
                                            <td className="border border-gray-300 px-4 py-2">Security, troubleshooting</td>
                                        </tr>
                                        <tr className="bg-gray-50">
                                            <td className="border border-gray-300 px-4 py-2">Analytics Data</td>
                                            <td className="border border-gray-300 px-4 py-2">3 years (anonymized)</td>
                                            <td className="border border-gray-300 px-4 py-2">Service improvement</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">6.2 Data Deletion Process</h3>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li><strong>Automated Deletion:</strong> System automatically deletes data past retention periods</li>
                                <li><strong>Secure Deletion:</strong> Multi-pass overwriting ensuring data cannot be recovered</li>
                                <li><strong>Backup Purging:</strong> Data removed from all backups and archives</li>
                                <li><strong>Legal Holds:</strong> Data preserved longer when required by legal proceedings</li>
                                <li><strong>Verification:</strong> Regular audits confirm proper deletion procedures</li>
                            </ul>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">6.3 Account Closure</h3>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                When you close your account, we will delete your personal information according to our 
                                retention schedule. However, we may retain certain information longer if required for 
                                legal compliance, fraud prevention, or legitimate business purposes.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Your Privacy Rights and Choices</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                You have several rights regarding your personal information. Here's how to exercise them 
                                within our support ticket system:
                            </p>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">7.1 Access and Portability Rights</h3>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li><strong>View Your Data:</strong> Access your profile, tickets, and communications through your account dashboard</li>
                                <li><strong>Download Tickets:</strong> Export your ticket history and attachments in standard formats</li>
                                <li><strong>Communication History:</strong> Request complete records of all communications</li>
                                <li><strong>Data Report:</strong> Request a comprehensive report of all data we hold about you</li>
                            </ul>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">7.2 Correction and Update Rights</h3>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li><strong>Profile Updates:</strong> Edit your personal information directly in your account settings</li>
                                <li><strong>Contact Information:</strong> Update email addresses, phone numbers, and notification preferences</li>
                                <li><strong>Ticket Corrections:</strong> Request corrections to ticket information (subject to audit trail requirements)</li>
                                <li><strong>Organization Details:</strong> Update company information and department assignments</li>
                            </ul>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">7.3 Deletion and Restriction Rights</h3>
                            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                                <p className="text-yellow-800 text-sm mb-3">
                                    <strong>Important Limitation:</strong> Some data cannot be deleted immediately due to 
                                    support ticket system requirements and legal obligations:
                                </p>
                                <ul className="list-disc pl-6 text-yellow-800 text-sm space-y-1">
                                    <li>Active tickets must remain available until resolved</li>
                                    <li>Historical tickets may be required for warranty or legal purposes</li>
                                    <li>System audit logs cannot be modified for security compliance</li>
                                </ul>
                            </div>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li><strong>Account Deletion:</strong> Close your account and request deletion of personal information</li>
                                <li><strong>Selective Deletion:</strong> Remove specific tickets or communications (where legally permissible)</li>
                                <li><strong>Processing Restriction:</strong> Limit how we use your information while keeping necessary records</li>
                                <li><strong>Marketing Opt-out:</strong> Stop receiving promotional communications (support notifications continue)</li>
                            </ul>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">7.4 How to Exercise Your Rights</h3>
                            <div className="bg-blue-50 p-6 rounded-lg">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="font-semibold text-blue-800 mb-2">Online Methods:</h4>
                                        <ul className="text-blue-700 text-sm space-y-1">
                                            <li>• Account Settings Dashboard</li>
                                            <li>• Privacy Rights Form (in-app)</li>
                                            <li>• Create a Privacy Ticket</li>
                                            <li>• Live Chat with Privacy Team</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-blue-800 mb-2">Contact Methods:</h4>
                                        <ul className="text-blue-700 text-sm space-y-1">
                                            <li>• Email: privacy@arkynox.com</li>
                                            <li>• Phone: +1-555-PRIVACY</li>
                                            <li>• Mail: Data Protection Officer</li>
                                            <li>• Response Time: Within 30 days</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-xl font-medium text-gray-800 mb-3 mt-6">7.5 Identity Verification</h3>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                To protect your privacy, we may need to verify your identity before processing requests. 
                                This may involve confirming your email address, answering security questions, or providing 
                                additional identification.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Cookies and Tracking Technologies</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Our support platform uses various technologies to enhance functionality and user experience:
                            </p>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">8.1 Essential Cookies</h3>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li><strong>Session Management:</strong> Maintain login status and user sessions</li>
                                <li><strong>Security Tokens:</strong> CSRF protection and secure form submissions</li>
                                <li><strong>Load Balancing:</strong> Distribute traffic across servers for performance</li>
                                <li><strong>Feature Toggles:</strong> Enable/disable features for your account</li>
                            </ul>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">8.2 Functional Cookies</h3>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li><strong>User Preferences:</strong> Remember language, timezone, and notification settings</li>
                                <li><strong>Interface Customization:</strong> Save dashboard layouts and view preferences</li>
                                <li><strong>Recent Activity:</strong> Track recently viewed tickets and searches</li>
                                <li><strong>Accessibility:</strong> Remember accessibility preferences and settings</li>
                            </ul>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">8.3 Analytics Cookies (Optional)</h3>
                            <div className="bg-gray-50 p-4 rounded-lg mb-4">
                                <p className="text-gray-700 text-sm mb-3">
                                    <strong>Your Choice:</strong> These cookies are optional and can be disabled in your privacy settings.
                                </p>
                                <ul className="list-disc pl-6 text-gray-700 text-sm space-y-1">
                                    <li><strong>Usage Analytics:</strong> Understand which features are most helpful</li>
                                    <li><strong>Performance Monitoring:</strong> Identify and fix slow-loading pages</li>
                                    <li><strong>Error Tracking:</strong> Detect and resolve technical issues</li>
                                    <li><strong>A/B Testing:</strong> Test interface improvements (anonymized)</li>
                                </ul>
                            </div>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">8.4 Managing Cookies</h3>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li><strong>Browser Settings:</strong> Configure cookie preferences in your browser</li>
                                <li><strong>Privacy Dashboard:</strong> Control cookie categories in your account settings</li>
                                <li><strong>Do Not Track:</strong> We respect browser "Do Not Track" signals</li>
                                <li><strong>Cookie Banner:</strong> Manage preferences through our cookie consent banner</li>
                            </ul>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">8.5 Third-Party Integrations</h3>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                When you connect third-party services (like CRM systems or chat tools), those integrations 
                                may use their own cookies and tracking technologies governed by their privacy policies.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. International Data Transfers</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                As a global support platform, we may transfer and process your data in multiple jurisdictions 
                                to provide optimal service performance and availability:
                            </p>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">9.1 Data Residency Options</h3>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li><strong>Regional Data Centers:</strong> Choose where your primary data is stored (US, EU, APAC)</li>
                                <li><strong>Data Localization:</strong> Option to keep all data within specific geographic regions</li>
                                <li><strong>Backup Locations:</strong> Encrypted backups stored in secure, compliant facilities</li>
                                <li><strong>Content Delivery:</strong> Cached content served from geographically close servers</li>
                            </ul>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">9.2 Transfer Safeguards</h3>
                            <div className="bg-blue-50 p-4 rounded-lg mb-4">
                                <p className="text-blue-800 text-sm mb-3">
                                    <strong>Legal Basis for Transfers:</strong> We ensure adequate protection through:
                                </p>
                                <ul className="list-disc pl-6 text-blue-800 text-sm space-y-1">
                                    <li><strong>Standard Contractual Clauses (SCCs):</strong> EU-approved transfer mechanisms</li>
                                    <li><strong>Adequacy Decisions:</strong> Transfers to countries with adequate protection</li>
                                    <li><strong>Binding Corporate Rules:</strong> Internal data protection standards</li>
                                    <li><strong>Certification Schemes:</strong> ISO 27001, SOC 2 compliance</li>
                                </ul>
                            </div>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">9.3 Cross-Border Support</h3>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li><strong>Follow-the-Sun Support:</strong> 24/7 support may involve agents in different time zones</li>
                                <li><strong>Escalation Teams:</strong> Complex issues may be routed to specialized global teams</li>
                                <li><strong>Data Access Controls:</strong> Agents only access data necessary for their assigned tickets</li>
                                <li><strong>Jurisdictional Compliance:</strong> All cross-border access complies with local privacy laws</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Special Categories and Sensitive Data</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Support tickets may inadvertently contain sensitive personal information. Here's how we handle it:
                            </p>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">10.1 Automatic Detection and Protection</h3>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li><strong>Data Loss Prevention (DLP):</strong> Automatic detection of SSNs, credit card numbers, passwords</li>
                                <li><strong>Content Filtering:</strong> AI-powered scanning for sensitive information in tickets and attachments</li>
                                <li><strong>Automatic Masking:</strong> Sensitive data automatically redacted or encrypted</li>
                                <li><strong>Agent Alerts:</strong> Support agents warned when tickets may contain sensitive data</li>
                            </ul>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">10.2 Handling Guidelines</h3>
                            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                                <p className="text-red-800 text-sm mb-3">
                                    <strong>Please Avoid Sharing:</strong> To protect your privacy, please do not include 
                                    sensitive information in support tickets:
                                </p>
                                <ul className="list-disc pl-6 text-red-800 text-sm space-y-1">
                                    <li>Social Security Numbers or National ID numbers</li>
                                    <li>Credit card numbers or financial account information</li>
                                    <li>Passwords or authentication credentials</li>
                                    <li>Medical or health information</li>
                                    <li>Biometric data or genetic information</li>
                                </ul>
                            </div>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">10.3 Secure Alternatives</h3>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li><strong>Secure Upload Portal:</strong> Encrypted file transfer for sensitive documents</li>
                                <li><strong>Reference Numbers:</strong> Use order/account numbers instead of personal details</li>
                                <li><strong>Phone Verification:</strong> Verify sensitive information over secure phone lines</li>
                                <li><strong>Temporary Links:</strong> Self-destructing secure links for sensitive file sharing</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Jurisdiction-Specific Rights and Compliance</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We recognize that privacy laws differ across the world. Below is a jurisdiction-by-jurisdiction 
                                guide to your specific rights, the laws that protect you, and how we comply. This section 
                                should be read together with the rest of this Privacy Policy.
                            </p>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">11.1 Quick Reference by Country</h3>
                            <div className="overflow-x-auto mb-6">
                                <table className="min-w-full divide-y divide-gray-200 text-sm">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-3 py-2 text-left font-semibold text-gray-700">Country</th>
                                            <th className="px-3 py-2 text-left font-semibold text-gray-700">Governing Law</th>
                                            <th className="px-3 py-2 text-left font-semibold text-gray-700">Consent Age</th>
                                            <th className="px-3 py-2 text-left font-semibold text-gray-700">Breach Notice</th>
                                            <th className="px-3 py-2 text-left font-semibold text-gray-700">Localization</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        <tr><td className="px-3 py-2">🇺🇸 United States</td><td className="px-3 py-2 text-xs">CCPA/CPRA, COPPA, HIPAA</td><td className="px-3 py-2">13</td><td className="px-3 py-2 text-xs">By state (30-60 days)</td><td className="px-3 py-2 text-gray-500">No</td></tr>
                                        <tr className="bg-gray-50"><td className="px-3 py-2">🇪🇺 EU/EEA</td><td className="px-3 py-2 text-xs">GDPR</td><td className="px-3 py-2">16</td><td className="px-3 py-2 text-xs">72 hours</td><td className="px-3 py-2 text-gray-500">No</td></tr>
                                        <tr><td className="px-3 py-2">🇬🇧 United Kingdom</td><td className="px-3 py-2 text-xs">UK GDPR / DPA 2018</td><td className="px-3 py-2">13</td><td className="px-3 py-2 text-xs">72 hours</td><td className="px-3 py-2 text-gray-500">No</td></tr>
                                        <tr className="bg-gray-50"><td className="px-3 py-2">🇮🇳 India</td><td className="px-3 py-2 text-xs">DPDP Act 2023</td><td className="px-3 py-2">18</td><td className="px-3 py-2 text-xs">72 hours to DPBI</td><td className="px-3 py-2 text-red-600 font-medium">Yes*</td></tr>
                                        <tr><td className="px-3 py-2">🇧🇷 Brazil</td><td className="px-3 py-2 text-xs">LGPD (Lei 13.709/2018)</td><td className="px-3 py-2">18</td><td className="px-3 py-2 text-xs">Reasonable time</td><td className="px-3 py-2 text-gray-500">No</td></tr>
                                        <tr className="bg-gray-50"><td className="px-3 py-2">🇯🇵 Japan</td><td className="px-3 py-2 text-xs">APPI (amended 2022)</td><td className="px-3 py-2">15</td><td className="px-3 py-2 text-xs">Promptly required</td><td className="px-3 py-2 text-gray-500">No</td></tr>
                                        <tr><td className="px-3 py-2">🇿🇦 South Africa</td><td className="px-3 py-2 text-xs">POPIA</td><td className="px-3 py-2">18</td><td className="px-3 py-2 text-xs">As soon as possible</td><td className="px-3 py-2 text-gray-500">No</td></tr>
                                        <tr className="bg-gray-50"><td className="px-3 py-2">🇷🇺 Russia</td><td className="px-3 py-2 text-xs">152-FZ on Personal Data</td><td className="px-3 py-2">18</td><td className="px-3 py-2 text-xs">24 hours to Roskomnadzor</td><td className="px-3 py-2 text-red-600 font-medium">Yes</td></tr>
                                        <tr><td className="px-3 py-2">🇹🇷 Turkey</td><td className="px-3 py-2 text-xs">KVKK No. 6698</td><td className="px-3 py-2">18</td><td className="px-3 py-2 text-xs">72 hours to KVKK</td><td className="px-3 py-2 text-gray-500">No</td></tr>
                                        <tr className="bg-gray-50"><td className="px-3 py-2">🇦🇺 Australia</td><td className="px-3 py-2 text-xs">Privacy Act 1988 (2023 amend.)</td><td className="px-3 py-2">15</td><td className="px-3 py-2 text-xs">30 days max</td><td className="px-3 py-2 text-gray-500">No</td></tr>
                                        <tr><td className="px-3 py-2">🇳🇬 Nigeria</td><td className="px-3 py-2 text-xs">Data Protection Act 2023</td><td className="px-3 py-2">18</td><td className="px-3 py-2 text-xs">72 hours to NDPC</td><td className="px-3 py-2 text-gray-500">No</td></tr>
                                        <tr className="bg-gray-50"><td className="px-3 py-2">🇮🇩 Indonesia</td><td className="px-3 py-2 text-xs">UU PDP No. 27/2022</td><td className="px-3 py-2">18</td><td className="px-3 py-2 text-xs">72 hours</td><td className="px-3 py-2 text-red-600 font-medium">Yes</td></tr>
                                        <tr><td className="px-3 py-2">🇹🇭 Thailand</td><td className="px-3 py-2 text-xs">PDPA B.E. 2562</td><td className="px-3 py-2">20</td><td className="px-3 py-2 text-xs">72 hours to PDPC</td><td className="px-3 py-2 text-gray-500">No</td></tr>
                                        <tr className="bg-gray-50"><td className="px-3 py-2">🇵🇭 Philippines</td><td className="px-3 py-2 text-xs">Data Privacy Act 2012</td><td className="px-3 py-2">18</td><td className="px-3 py-2 text-xs">72 hours to NPC</td><td className="px-3 py-2 text-gray-500">No</td></tr>
                                        <tr><td className="px-3 py-2">🇩🇪 Germany</td><td className="px-3 py-2 text-xs">BDSG + GDPR</td><td className="px-3 py-2">16</td><td className="px-3 py-2 text-xs">72 hours (GDPR)</td><td className="px-3 py-2 text-gray-500">No</td></tr>
                                        <tr className="bg-gray-50"><td className="px-3 py-2">🇫🇷 France</td><td className="px-3 py-2 text-xs">Loi Informatique et Libertés + GDPR</td><td className="px-3 py-2">15</td><td className="px-3 py-2 text-xs">72 hours to CNIL</td><td className="px-3 py-2 text-gray-500">No</td></tr>
                                        <tr><td className="px-3 py-2">🇪🇸 Spain</td><td className="px-3 py-2 text-xs">LOPDGDD + GDPR</td><td className="px-3 py-2">14</td><td className="px-3 py-2 text-xs">72 hours to AEPD</td><td className="px-3 py-2 text-gray-500">No</td></tr>
                                        <tr className="bg-gray-50"><td className="px-3 py-2">🇳🇱 Netherlands</td><td className="px-3 py-2 text-xs">UAVG + GDPR</td><td className="px-3 py-2">16</td><td className="px-3 py-2 text-xs">72 hours to AP</td><td className="px-3 py-2 text-gray-500">No</td></tr>
                                        <tr><td className="px-3 py-2">🇰🇪 Kenya</td><td className="px-3 py-2 text-xs">Data Protection Act 2019</td><td className="px-3 py-2">18</td><td className="px-3 py-2 text-xs">72 hours to ODPC</td><td className="px-3 py-2 text-red-600 font-medium">Yes</td></tr>
                                        <tr className="bg-gray-50"><td className="px-3 py-2">🇰🇷 South Korea</td><td className="px-3 py-2 text-xs">PIPA (amended 2023)</td><td className="px-3 py-2">14</td><td className="px-3 py-2 text-xs">72 hours to PIPC</td><td className="px-3 py-2 text-red-600 font-medium">Yes</td></tr>
                                        <tr><td className="px-3 py-2">🇱🇰 Sri Lanka</td><td className="px-3 py-2 text-xs">PDPA No. 9 of 2022</td><td className="px-3 py-2">18</td><td className="px-3 py-2 text-xs">72 hours to DPA</td><td className="px-3 py-2 text-gray-500">No</td></tr>
                                        <tr className="bg-gray-50"><td className="px-3 py-2">🇰🇿 Kazakhstan</td><td className="px-3 py-2 text-xs">Law No. 94-V</td><td className="px-3 py-2">18</td><td className="px-3 py-2 text-xs">3 days to MDDIAI</td><td className="px-3 py-2 text-red-600 font-medium">Yes</td></tr>
                                        <tr><td className="px-3 py-2">🇾🇪 Yemen</td><td className="px-3 py-2 text-xs">Constitutional provisions</td><td className="px-3 py-2">18</td><td className="px-3 py-2 text-xs">As soon as practicable*</td><td className="px-3 py-2 text-gray-500">No</td></tr>
                                        <tr className="bg-gray-50"><td className="px-3 py-2">🇮🇷 Iran</td><td className="px-3 py-2 text-xs">Constitutional + Computer Crimes Law</td><td className="px-3 py-2">18</td><td className="px-3 py-2 text-xs">As soon as practicable*</td><td className="px-3 py-2 text-red-600 font-medium">Yes*</td></tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-xs text-gray-500 mb-6">
                                * Data localization: Russia's 152-FZ requires storing Russian citizens' data on servers within Russia. 
                                India's DPDP Act mandates notification of transfer arrangements. Kazakhstan requires servers in-country 
                                for citizen data. Iran has sectoral localization requirements. Yemen does not currently mandate localization.
                                We provide localized hosting options where required by law.
                            </p>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">11.2 GDPR (EU/EEA/UK) — Your Additional Rights</h3>
                            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-4">
                                <p className="text-indigo-800 text-sm mb-2">
                                    If you are in the EU, EEA, or UK, you have these additional rights under the GDPR/UK GDPR:
                                </p>
                                <ul className="list-disc pl-6 text-indigo-700 text-sm space-y-1">
                                    <li><strong>Right to Data Portability</strong> — Receive your data in a structured, machine-readable format</li>
                                    <li><strong>Right to Restrict Processing</strong> — Temporarily limit how we use your data while a complaint is resolved</li>
                                    <li><strong>Right to Object</strong> — Object to processing based on legitimate interests or direct marketing</li>
                                    <li><strong>Automated Decision-Making</strong> — Not be subject to decisions based solely on automated processing</li>
                                    <li><strong>Lodge a Complaint</strong> — With your local Data Protection Authority at any time</li>
                                </ul>
                            </div>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">11.3 India (DPDP Act 2023) — Your Additional Rights</h3>
                            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                                <p className="text-orange-800 text-sm mb-2">
                                    If you are in India, you have these additional rights under the Digital Personal Data Protection Act 2023:
                                </p>
                                <ul className="list-disc pl-6 text-orange-700 text-sm space-y-1">
                                    <li><strong>Right to Information</strong> — Know the purpose, categories, and recipients of your data</li>
                                    <li><strong>Right to Correction and Erasure</strong> — Update or delete your data</li>
                                    <li><strong>Right to Grievance Redressal</strong> — Our Grievance Officer will respond within 48 hours</li>
                                    <li><strong>Right to Nominate</strong> — Appoint a representative to exercise rights on your behalf after your death or incapacity</li>
                                    <li><strong>Consent Manager</strong> — You may withdraw consent at any time (note: this may affect service availability)</li>
                                    <li><strong>Parental Consent</strong> — For users under 18, we require verifiable parental consent</li>
                                </ul>
                                <div className="mt-3 p-3 bg-orange-100 rounded">
                                    <p className="text-orange-800 text-xs font-medium">Grievance Officer: grievance@arkynox.com | Response within 48 hours</p>
                                </div>
                            </div>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">11.4 Brazil (LGPD) — Your Additional Rights</h3>
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                                <p className="text-green-800 text-sm mb-2">
                                    If you are in Brazil, under Lei Geral de Proteção de Dados (LGPD) you have:
                                </p>
                                <ul className="list-disc pl-6 text-green-700 text-sm space-y-1">
                                    <li><strong>Confirmation</strong> — Know if we process your data</li>
                                    <li><strong>Access</strong> — View your data held by us</li>
                                    <li><strong>Correction</strong> — Fix incomplete or inaccurate data</li>
                                    <li><strong>Anonymization/Blocking/Deletion</strong> — For unnecessary or excessive data</li>
                                    <li><strong>Portability</strong> — Transfer your data to another service provider</li>
                                    <li><strong>Revoke Consent</strong> — At any time (affects service capability)</li>
                                    <li><strong>Oppose Processing</strong> — For certain purposes</li>
                                </ul>
                                <p className="text-green-700 text-xs mt-2">
                                    DPO Contact: dpo@arkynox.com | ANPD may be contacted at anpd.gov.br
                                </p>
                            </div>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">11.5 Japan (APPI) — Your Additional Rights</h3>
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                                <ul className="list-disc pl-6 text-red-700 text-sm space-y-1">
                                    <li><strong>Disclosure</strong> — Request disclosure of retained personal data</li>
                                    <li><strong>Correction/Addition/Deletion</strong> — Of your personal data</li>
                                    <li><strong>Cessation of Use</strong> — Stop processing in cases of violation or where consent is withdrawn</li>
                                    <li><strong>Explanation</strong> — Request explanation of our processing methods</li>
                                    <li><strong>Opt-Out</strong> — You may opt out of third-party provision of your data</li>
                                </ul>
                                <p className="text-red-700 text-xs mt-2">
                                    PPC Contact: ppc@arkynox.com (we will forward to PPC Japan upon request)
                                </p>
                            </div>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">11.6 South Africa (POPIA) — Your Additional Rights</h3>
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                                <ul className="list-disc pl-6 text-yellow-700 text-sm space-y-1">
                                    <li><strong>Access</strong> — Request confirmation of what data we hold</li>
                                    <li><strong>Correction</strong> — Fix inaccurate or misleading information</li>
                                    <li><strong>Deletion</strong> — Request deletion (subject to legal limits)</li>
                                    <li><strong>Object to Marketing</strong> — Direct marketing opt-out at any time</li>
                                    <li><strong>Breach Notification</strong> — Notified as soon as reasonably possible</li>
                                    <li><strong>Complaint</strong> — Lodge with the Information Regulator</li>
                                </ul>
                                <p className="text-yellow-700 text-xs mt-2">
                                    Information Regulator: inforeg@justice.gov.za | Our DPO: dpo@arkynox.com
                                </p>
                            </div>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">11.7 Russia (152-FZ) — Data Localization</h3>
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                                <p className="text-red-800 text-sm">
                                    If you are in Russia, Federal Law No. 152-FZ requires that Russian citizens' personal data 
                                    be processed using databases located within the Russian Federation. We comply by maintaining 
                                    localized data processing infrastructure for Russian users. Roskomnadzor may be contacted 
                                    regarding data protection matters.
                                </p>
                            </div>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">11.8 Turkey (KVKK) — Your Additional Rights</h3>
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                                <ul className="list-disc pl-6 text-blue-700 text-sm space-y-1">
                                    <li>Learn whether your data is being processed</li>
                                    <li>Request information about processing activities</li>
                                    <li>Learn the purpose and whether data is used appropriately</li>
                                    <li>Request correction of inaccurate/incomplete data</li>
                                    <li>Request deletion or anonymization of data</li>
                                    <li>Object to unfavorable automated processing results</li>
                                    <li>Claim damages for unlawful processing</li>
                                </ul>
                                <p className="text-blue-700 text-xs mt-2">
                                    KVKK: kvkk.gov.tr | Our Representative: kvkk@arkynox.com
                                </p>
                            </div>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">11.9 Australia (Privacy Act) — Your Additional Rights</h3>
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                                <ul className="list-disc pl-6 text-green-700 text-sm space-y-1">
                                    <li><strong>Access</strong> — Request access to your personal information</li>
                                    <li><strong>Correction</strong> — Update or correct your information</li>
                                    <li><strong>Deletion</strong> — Request deletion in certain circumstances</li>
                                    <li><strong>Notifiable Data Breaches</strong> — We will notify OAIC and affected individuals</li>
                                    <li><strong>Children's Privacy</strong> — Enhanced protections for under-15s</li>
                                </ul>
                                <p className="text-green-700 text-xs mt-2">
                                    OAIC: oaic.gov.au | Our DPO: dpo@arkynox.com
                                </p>
                            </div>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">11.10 Indonesia (UU PDP) — Your Additional Rights</h3>
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                                <ul className="list-disc pl-6 text-blue-700 text-sm space-y-1">
                                    <li>Right to Information about data processing</li>
                                    <li>Right to Access your personal data</li>
                                    <li>Right to Correction and Update of data</li>
                                    <li>Right to Deletion of personal data</li>
                                    <li>Right to Data Portability</li>
                                    <li>Right to Withdraw consent</li>
                                    <li>Right to Object to automated decisions</li>
                                </ul>
                            </div>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">11.11 Thailand (PDPA) — Your Additional Rights</h3>
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                                <ul className="list-disc pl-6 text-blue-700 text-sm space-y-1">
                                    <li>Right of Access</li>
                                    <li>Right to Data Portability</li>
                                    <li>Right to Object to collection/use/disclosure</li>
                                    <li>Right to Erasure</li>
                                    <li>Right to Restrict Processing</li>
                                    <li>Right to Rectification</li>
                                </ul>
                                <p className="text-blue-700 text-xs mt-2">
                                    Note: Consent age in Thailand is 20. For users under 20, we require parental/guardian consent.
                                </p>
                            </div>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">11.12 Philippines (Data Privacy Act) — Your Additional Rights</h3>
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                                <ul className="list-disc pl-6 text-blue-700 text-sm space-y-1">
                                    <li>Right to be Informed</li>
                                    <li>Right to Access</li>
                                    <li>Right to Object</li>
                                    <li>Right to Erasure or Blocking</li>
                                    <li>Right to Damages for violation</li>
                                    <li>Right to Data Portability</li>
                                    <li>Right to File a complaint with NPC</li>
                                </ul>
                                <p className="text-blue-700 text-xs mt-2">
                                    NPC: privacy.gov.ph | Our DPO: dpo@arkynox.com
                                </p>
                            </div>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">11.13 Nigeria, Kenya & South Africa — Data Protection</h3>
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                                <p className="text-green-800 text-sm mb-2">
                                    These African nations have comprehensive data protection laws. Key similarities:
                                </p>
                                <ul className="list-disc pl-6 text-green-700 text-sm space-y-1">
                                    <li><strong>Nigeria (NDPR Act 2023):</strong> Right to access, correction, deletion, objection, portability. Consent required for sensitive data. Breach notification to NDPC within 72 hours.</li>
                                    <li><strong>Kenya (DPA 2019):</strong> Right to be informed, access, object, correct, delete, portability. <strong>Data localization required</strong> for critical data. Breach notification to ODPC within 72 hours.</li>
                                    <li><strong>South Africa (POPIA):</strong> 8 conditions for lawful processing including accountability, purpose specification, further processing limitation. See section 11.6 above.</li>
                                </ul>
                            </div>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">11.14 South Korea (PIPA) — Your Additional Rights</h3>
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                                <ul className="list-disc pl-6 text-blue-700 text-sm space-y-1">
                                    <li>Right to Consent before collection and use</li>
                                    <li>Right to Access personal information</li>
                                    <li>Right to Correction of inaccurate info</li>
                                    <li>Right to Deletion</li>
                                    <li>Right to Suspension of processing</li>
                                    <li><strong>Strict cross-border transfer rules</strong> — We implement alternative safeguards per PIPA</li>
                                    <li>Pseudonymized data may be processed without consent for specific purposes</li>
                                </ul>
                                <p className="text-blue-700 text-xs mt-2">
                                    PIPC: pipc.go.kr | Consent age: 14
                                </p>
                            </div>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">11.15 Sri Lanka (PDPA No. 9 of 2022)</h3>
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                                <ul className="list-disc pl-6 text-blue-700 text-sm space-y-1">
                                    <li>Right to be Informed</li>
                                    <li>Right of Access</li>
                                    <li>Right to Correction</li>
                                    <li>Right to Erasure</li>
                                    <li>Right to Restrict Processing</li>
                                    <li>Right to Data Portability</li>
                                    <li>Right to Object</li>
                                </ul>
                                <p className="text-blue-700 text-xs mt-2">
                                    DPA of Sri Lanka: dpa.gov.lk | Breach notify: 72 hours
                                </p>
                            </div>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">11.16 Kazakhstan (Law No. 94-V)</h3>
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                                <p className="text-blue-800 text-sm">
                                    Kazakhstan requires that personal data of Kazakh citizens be stored on servers within 
                                    Kazakhstan. We comply through localized hosting infrastructure. Consent is required for 
                                    third-party sharing. Breach notification must be made within 3 days to the authorized body (MDDIAI).
                                </p>
                            </div>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">11.17 Yemen & Iran — Privacy Protections</h3>
                            <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-4">
                                <p className="text-gray-700 text-sm">
                                    <strong>Yemen:</strong> Privacy is protected under Article 40 of the Constitution. There is no 
                                    comprehensive data protection law currently. We voluntarily extend the same high standard of 
                                    data protection to all users regardless of their country's legal framework.
                                </p>
                                <p className="text-gray-700 text-sm mt-2">
                                    <strong>Iran:</strong> Privacy protections exist under Articles 22-25 of the Constitution and 
                                    the Computer Crimes Law. While no comprehensive data protection law exists, we apply our 
                                    global privacy standards to all users. Iran has sectoral data localization requirements that 
                                    we accommodate where applicable.
                                </p>
                            </div>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">11.18 Children's Privacy Across Jurisdictions</h3>
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                                <p className="text-yellow-800 text-sm mb-2">
                                    The age at which a child can independently consent to data processing varies by country:
                                </p>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm text-yellow-700">
                                    <div><span className="font-medium">13+</span> — US (COPPA), UK</div>
                                    <div><span className="font-medium">14+</span> — Spain, South Korea</div>
                                    <div><span className="font-medium">15+</span> — Japan, France, Australia</div>
                                    <div><span className="font-medium">16+</span> — EU/EEA, Germany, Netherlands</div>
                                    <div><span className="font-medium">18+</span> — India, Brazil, Turkey, Nigeria, Kenya, Philippines, Sri Lanka, Kazakhstan, Yemen, Iran</div>
                                    <div><span className="font-medium">20+</span> — Thailand</div>
                                </div>
                                <p className="text-yellow-700 text-xs mt-2">
                                    For users under the applicable age in their jurisdiction, we require verifiable parental 
                                    or guardian consent before processing personal data. Please contact privacy@arkynox.com 
                                    if you need to provide parental consent.
                                </p>
                            </div>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">11.19 Cross-Border Data Transfer Mechanisms</h3>
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                                <p className="text-blue-800 text-sm mb-2">
                                    When we transfer your data across borders, we rely on these safeguards:
                                </p>
                                <ul className="list-disc pl-6 text-blue-700 text-sm space-y-1">
                                    <li><strong>Standard Contractual Clauses (SCCs)</strong> — EU/EEA/UK approved transfer agreements</li>
                                    <li><strong>Adequacy Decisions</strong> — Transfers to countries deemed adequate by the European Commission</li>
                                    <li><strong>Data Localization</strong> — In-country hosting for Russia, Kazakhstan, Indonesia, Kenya, South Korea, and India (where required)</li>
                                    <li><strong>Binding Corporate Rules</strong> — Internal privacy standards for our global operations</li>
                                    <li><strong>Explicit Consent</strong> — For cross-border transfers where other mechanisms are not available</li>
                                    <li><strong>DPDP Act (India)</strong> — Notice to Data Principal before transfer, with consent or deemed consent</li>
                                    <li><strong>PIPA (South Korea)</strong> — Alternative safeguards per PIPA Article 28-8</li>
                                </ul>
                            </div>

                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                <p className="text-gray-600 text-sm">
                                    <strong>Questions about your specific jurisdiction?</strong> Contact privacy@arkynox.com with 
                                    your country of residence and we will provide you with the specific rights and protections 
                                    applicable to you. We respond to all jurisdictional inquiries within 48 hours.
                                </p>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">12. Changes to This Privacy Policy</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We regularly review and may update this Privacy Policy to reflect changes in our services, 
                                legal requirements, or industry best practices:
                            </p>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">12.1 Types of Changes</h3>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li><strong>Minor Updates:</strong> Clarifications, contact information updates, formatting changes</li>
                                <li><strong>Material Changes:</strong> New data collection, sharing practices, or use purposes</li>
                                <li><strong>Legal Changes:</strong> Updates required by new laws or regulations</li>
                                <li><strong>Feature Changes:</strong> Privacy implications of new product features</li>
                            </ul>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">12.2 Notification Process</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <h4 className="font-semibold text-green-800 mb-2">Minor Changes</h4>
                                    <ul className="text-green-700 text-sm space-y-1">
                                        <li>• Updated effective date</li>
                                        <li>• In-app notification</li>
                                        <li>• Version history available</li>
                                        <li>• No additional consent required</li>
                                    </ul>
                                </div>
                                <div className="bg-orange-50 p-4 rounded-lg">
                                    <h4 className="font-semibold text-orange-800 mb-2">Material Changes</h4>
                                    <ul className="text-orange-700 text-sm space-y-1">
                                        <li>• 30-day advance notice</li>
                                        <li>• Email notification</li>
                                        <li>• Dashboard banner</li>
                                        <li>• Consent may be required</li>
                                    </ul>
                                </div>
                            </div>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">12.3 Your Options</h3>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li><strong>Review Changes:</strong> Compare current and previous versions side-by-side</li>
                                <li><strong>Ask Questions:</strong> Contact our privacy team for clarification</li>
                                <li><strong>Opt Out:</strong> Withdraw consent for new uses of your data</li>
                                <li><strong>Account Closure:</strong> Close your account if you disagree with changes</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">13. Contact Information and Support</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-blue-50 p-6 rounded-lg">
                                    <h3 className="text-xl font-medium text-blue-800 mb-4">Privacy Team</h3>
                                    <ul className="text-blue-700 space-y-2">
                                        <li><strong>Email:</strong> privacy@arkynox.com</li>
                                        <li><strong>Response Time:</strong> Within 48 hours</li>
                                        <li><strong>Phone:</strong> +1-555-PRIVACY (Mon-Fri, 9AM-6PM EST)</li>
                                        <li><strong>Support Ticket:</strong> Use category "Privacy Request"</li>
                                    </ul>
                                </div>
                                <div className="bg-purple-50 p-6 rounded-lg">
                                    <h3 className="text-xl font-medium text-purple-800 mb-4">Data Protection Officer</h3>
                                    <ul className="text-purple-700 space-y-2">
                                        <li><strong>Email:</strong> dpo@arkynox.com</li>
                                        <li><strong>Mail:</strong> Arkynox Data Protection Officer</li>
                                        <li><strong>Address:</strong> [Your Business Address]</li>
                                        <li><strong>Secure Portal:</strong> Available in account settings</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-6 bg-gray-50 p-6 rounded-lg">
                                <h3 className="text-xl font-medium text-gray-800 mb-4">Regulatory Contacts by Region</h3>
                                <p className="text-gray-700 text-sm mb-3">
                                    If you believe we have not adequately addressed your privacy concerns, you have the 
                                    right to lodge a complaint with the relevant supervisory authority in your jurisdiction:
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                                    <div className="bg-white p-3 rounded border">
                                        <strong className="text-gray-800">🇪🇺 EU/EEA (GDPR):</strong>
                                        <br />Your local Data Protection Authority
                                    </div>
                                    <div className="bg-white p-3 rounded border">
                                        <strong className="text-gray-800">🇬🇧 UK (UK GDPR):</strong>
                                        <br />Information Commissioner's Office (ICO)
                                    </div>
                                    <div className="bg-white p-3 rounded border">
                                        <strong className="text-gray-800">🇮🇳 India (DPDP Act):</strong>
                                        <br />Data Protection Board of India
                                    </div>
                                    <div className="bg-white p-3 rounded border">
                                        <strong className="text-gray-800">🇧🇷 Brazil (LGPD):</strong>
                                        <br />Autoridade Nacional (ANPD)
                                    </div>
                                    <div className="bg-white p-3 rounded border">
                                        <strong className="text-gray-800">🇺🇸 US (CCPA/COPPA):</strong>
                                        <br />California Attorney General / FTC
                                    </div>
                                    <div className="bg-white p-3 rounded border">
                                        <strong className="text-gray-800">🇿🇦 South Africa (POPIA):</strong>
                                        <br />Information Regulator
                                    </div>
                                    <div className="bg-white p-3 rounded border">
                                        <strong className="text-gray-800">🇯🇵 Japan (APPI):</strong>
                                        <br />Personal Information Protection Commission (PPC)
                                    </div>
                                    <div className="bg-white p-3 rounded border">
                                        <strong className="text-gray-800">🇷🇺 Russia (152-FZ):</strong>
                                        <br />Roskomnadzor
                                    </div>
                                    <div className="bg-white p-3 rounded border">
                                        <strong className="text-gray-800">🇹🇷 Turkey (KVKK):</strong>
                                        <br />Kişisel Verileri Koruma Kurumu
                                    </div>
                                    <div className="bg-white p-3 rounded border">
                                        <strong className="text-gray-800">🇰🇷 South Korea (PIPA):</strong>
                                        <br />Personal Information Protection Commission (PIPC)
                                    </div>
                                    <div className="bg-white p-3 rounded border">
                                        <strong className="text-gray-800">🇦🇺 Australia:</strong>
                                        <br />Office of the Australian Information Commissioner (OAIC)
                                    </div>
                                    <div className="bg-white p-3 rounded border">
                                        <strong className="text-gray-800">🇳🇬 Nigeria:</strong>
                                        <br />Nigeria Data Protection Commission (NDPC)
                                    </div>
                                    <div className="bg-white p-3 rounded border">
                                        <strong className="text-gray-800">🇰🇪 Kenya:</strong>
                                        <br />Office of Data Protection Commissioner (ODPC)
                                    </div>
                                    <div className="bg-white p-3 rounded border">
                                        <strong className="text-gray-800">🇹🇭 Thailand (PDPA):</strong>
                                        <br />Personal Data Protection Committee (PDPC)
                                    </div>
                                    <div className="bg-white p-3 rounded border">
                                        <strong className="text-gray-800">🇵🇭 Philippines:</strong>
                                        <br />National Privacy Commission (NPC)
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 p-4 border-2 border-green-200 rounded-lg bg-green-50">
                                <p className="text-green-800 text-sm">
                                    <strong>Quick Help:</strong> For urgent privacy concerns or suspected data breaches, 
                                    call our Privacy Hotline at +1-555-URGENT or create a "Privacy Emergency" ticket 
                                    for immediate attention.
                                </p>
                            </div>
                        </section>
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-200 text-center">
                        <p className="text-sm text-gray-600">
                            This Privacy Policy was last updated on June 20, 2026
                        </p>
                        <div className="mt-4">
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