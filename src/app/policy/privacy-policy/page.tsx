
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
                        <p className="text-gray-600 mt-2">Effective Date: August 15, 2025</p>
                    </div>

                    <div className="prose max-w-none">
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
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Changes to This Privacy Policy</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We regularly review and may update this Privacy Policy to reflect changes in our services, 
                                legal requirements, or industry best practices:
                            </p>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">11.1 Types of Changes</h3>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li><strong>Minor Updates:</strong> Clarifications, contact information updates, formatting changes</li>
                                <li><strong>Material Changes:</strong> New data collection, sharing practices, or use purposes</li>
                                <li><strong>Legal Changes:</strong> Updates required by new laws or regulations</li>
                                <li><strong>Feature Changes:</strong> Privacy implications of new product features</li>
                            </ul>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">11.2 Notification Process</h3>
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

                            <h3 className="text-xl font-medium text-gray-800 mb-3">11.3 Your Options</h3>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li><strong>Review Changes:</strong> Compare current and previous versions side-by-side</li>
                                <li><strong>Ask Questions:</strong> Contact our privacy team for clarification</li>
                                <li><strong>Opt Out:</strong> Withdraw consent for new uses of your data</li>
                                <li><strong>Account Closure:</strong> Close your account if you disagree with changes</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">12. Contact Information and Support</h2>
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
                                <h3 className="text-xl font-medium text-gray-800 mb-4">Regulatory Contacts</h3>
                                <p className="text-gray-700 text-sm mb-3">
                                    If you believe we have not adequately addressed your privacy concerns, you have the 
                                    right to lodge a complaint with the relevant supervisory authority:
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                    <div>
                                        <strong className="text-gray-800">EU/GDPR:</strong>
                                        <br />Your local Data Protection Authority
                                    </div>
                                    <div>
                                        <strong className="text-gray-800">US/CCPA:</strong>
                                        <br />California Attorney General
                                    </div>
                                    <div>
                                        <strong className="text-gray-800">Canada/PIPEDA:</strong>
                                        <br />Privacy Commissioner of Canada
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
                            This Privacy Policy was last updated on August 15, 2025
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