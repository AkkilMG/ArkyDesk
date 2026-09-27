'use client';

import PolicyLayout from '@/components/policy/PolicyLayout';
import {
    GlobeIcon, DownloadIcon, LockIcon, RefreshCwIcon,
    ClockIcon, PhoneIcon, InfoIcon, AlertTriangleIcon,
    CheckIcon, XIcon, MailIcon, EyeIcon, SearchIcon,
    ShieldIcon, FileTextIcon, UsersIcon, DatabaseIcon,
    BarChartIcon, HeartIcon, BookIcon, LinkIcon,
    BellIcon, TrashIcon, ArchiveIcon
} from '@/components/policy/Icons';

export default function PrivacyPolicy() {
    return (
        <PolicyLayout
            title="Privacy Policy"
            links={[
                { href: '/dashboard', label: 'Return to Dashboard' },
            ]}
        >
            {/* Quick Summary */}
            <div className="not-prose bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-50 border border-blue-200/60 rounded-2xl p-6 sm:p-8 mb-10 shadow-sm">
                <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 shadow-md shadow-blue-200 flex items-center justify-center">
                        <ShieldIcon size={24} className="text-white" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-blue-900">Quick Summary</h3>
                        <p className="text-sm text-blue-600 font-medium">What happens to your data when you use our support system</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white/90 backdrop-blur rounded-xl p-4 border border-blue-100 shadow-sm">
                        <div className="flex items-center gap-2 font-semibold text-blue-800 mb-1">
                            <DownloadIcon size={16} className="text-blue-600" />
                            <span>What We Collect</span>
                        </div>
                        <p className="text-blue-700">Name, email, ticket details, files you upload, and technical data (browser, IP). We only collect what is needed to help you.</p>
                    </div>
                    <div className="bg-white/90 backdrop-blur rounded-xl p-4 border border-blue-100 shadow-sm">
                        <div className="flex items-center gap-2 font-semibold text-blue-800 mb-1">
                            <LockIcon size={16} className="text-blue-600" />
                            <span>How We Protect It</span>
                        </div>
                        <p className="text-blue-700">AES-256 encryption, TLS 1.3, multi-factor auth, role-based access, regular security audits. Your data is locked down tight.</p>
                    </div>
                    <div className="bg-white/90 backdrop-blur rounded-xl p-4 border border-blue-100 shadow-sm">
                        <div className="flex items-center gap-2 font-semibold text-blue-800 mb-1">
                            <GlobeIcon size={16} className="text-blue-600" />
                            <span>Your Rights By Country</span>
                        </div>
                        <p className="text-blue-700">We honor GDPR (EU), DPDP Act (India), LGPD (Brazil), CCPA (US), POPIA (SA), and 20+ other privacy laws. See Section 11 for your specific rights.</p>
                    </div>
                    <div className="bg-white/90 backdrop-blur rounded-xl p-4 border border-blue-100 shadow-sm">
                        <div className="flex items-center gap-2 font-semibold text-blue-800 mb-1">
                            <RefreshCwIcon size={16} className="text-blue-600" />
                            <span>Data Sharing</span>
                        </div>
                        <p className="text-blue-700">We never sell your data. We share only with trusted service providers (hosting, email) under strict contracts. No third-party marketing.</p>
                    </div>
                    <div className="bg-white/90 backdrop-blur rounded-xl p-4 border border-blue-100 shadow-sm">
                        <div className="flex items-center gap-2 font-semibold text-blue-800 mb-1">
                            <ClockIcon size={16} className="text-blue-600" />
                            <span>How Long We Keep It</span>
                        </div>
                        <p className="text-blue-700">Tickets: 7 years. Account info: 3 years after last activity. Logs: 90 days. You can request earlier deletion anytime.</p>
                    </div>
                    <div className="bg-white/90 backdrop-blur rounded-xl p-4 border border-blue-100 shadow-sm">
                        <div className="flex items-center gap-2 font-semibold text-blue-800 mb-1">
                            <PhoneIcon size={16} className="text-blue-600" />
                            <span>Need Help?</span>
                        </div>
                        <p className="text-blue-700">Email privacy@arkynox.com or create a &ldquo;Privacy Request&rdquo; ticket. We respond within 48 hours. Your privacy matters to us.</p>
                    </div>
                </div>
                <div className="mt-4 text-xs text-blue-500 text-center font-medium bg-blue-50/50 rounded-lg py-2">
                    This summary is for understanding. The full policy below is the legally binding document.
                </div>
            </div>

            <section className="mb-10">
                <h2>1. Introduction</h2>
                <p>
                    At Arkynox (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), we are committed to protecting your privacy and personal information.
                    This Privacy Policy explains how we collect, use, store, and protect your information when you use our
                    ArkynoxDesk support ticket system, help desk services, knowledge base, live chat, and related customer
                    support tools (&ldquo;Services&rdquo;).
                </p>
                <p>
                    This policy applies to all users including end customers who submit tickets, agents who provide support,
                    administrators who manage the system, and visitors to our platform. By using our Services, you agree to
                    the collection and use of information in accordance with this policy.
                </p>
                <div className="not-prose bg-amber-50/80 border-l-4 border-amber-400 rounded-xl p-5 mb-6">
                    <div className="flex items-start gap-3">
                        <InfoIcon size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-amber-800">
                            <strong>Important:</strong> This policy covers data processing activities specific to support ticket
                            systems. If you also use other Arkynox products or services, additional privacy policies may apply.
                        </p>
                    </div>
                </div>
            </section>

            <section className="mb-10">
                <h2>2. Information We Collect</h2>

                <h3>2.1 Customer Information</h3>
                <p>When you create a support ticket or account, we collect:</p>
                <ul>
                    <li><strong>Identity Information:</strong> Full name, email address, phone number, job title</li>
                    <li><strong>Organization Details:</strong> Company name, department, organization size</li>
                    <li><strong>Account Credentials:</strong> Username, securely hashed passwords, security questions</li>
                    <li><strong>Profile Data:</strong> Avatar images, timezone, language preferences, notification settings</li>
                    <li><strong>Verification Data:</strong> Email verification tokens, two-factor authentication codes</li>
                </ul>

                <h3>2.2 Support Ticket Data</h3>
                <p>This is the core data of our support system and includes:</p>
                <ul>
                    <li><strong>Ticket Content:</strong> Subject lines, descriptions, problem details, solution requests</li>
                    <li><strong>Conversation History:</strong> All messages between customers and support agents</li>
                    <li><strong>File Attachments:</strong> Screenshots, documents, logs, videos, and other uploaded files</li>
                    <li><strong>Ticket Metadata:</strong> Priority levels, categories, tags, status changes, escalations</li>
                    <li><strong>Resolution Data:</strong> Solutions provided, customer satisfaction ratings, feedback</li>
                    <li><strong>Assignment Information:</strong> Which agents handled tickets, response times, resolution times</li>
                </ul>

                <h3>2.3 Communication Data</h3>
                <ul>
                    <li><strong>Email Communications:</strong> All emails sent and received through our system</li>
                    <li><strong>Live Chat Records:</strong> Real-time chat conversations and transcripts</li>
                    <li><strong>Phone Call Data:</strong> Call recordings (where legally permitted and disclosed)</li>
                    <li><strong>Internal Notes:</strong> Agent-to-agent communications about tickets (not visible to customers)</li>
                    <li><strong>Automated Messages:</strong> System-generated notifications and responses</li>
                </ul>

                <h3>2.4 Technical and Usage Data</h3>
                <ul>
                    <li><strong>Device Information:</strong> Browser type/version, operating system, screen resolution</li>
                    <li><strong>Network Data:</strong> IP addresses, ISP information, geographic location (city/country level)</li>
                    <li><strong>Session Data:</strong> Login/logout times, session duration, pages visited</li>
                    <li><strong>Performance Metrics:</strong> Page load times, error rates, feature usage statistics</li>
                    <li><strong>Security Logs:</strong> Failed login attempts, suspicious activities, access patterns</li>
                </ul>

                <h3>2.5 Integration Data</h3>
                <p>When you connect third-party services to your support system:</p>
                <ul>
                    <li><strong>API Credentials:</strong> Tokens and keys for integrated services (stored encrypted)</li>
                    <li><strong>Synchronized Data:</strong> User profiles, product information, order history from connected systems</li>
                    <li><strong>Webhook Data:</strong> Event notifications and status updates from external platforms</li>
                </ul>
            </section>

            <section className="mb-10">
                <h2>3. How We Use Your Information</h2>

                <h3>3.1 Primary Support Functions</h3>
                <ul>
                    <li><strong>Ticket Processing:</strong> Create, track, route, and resolve support requests</li>
                    <li><strong>Communication:</strong> Send notifications, updates, and responses via email, SMS, or in-app</li>
                    <li><strong>Agent Assignment:</strong> Route tickets to appropriate support agents based on expertise</li>
                    <li><strong>Escalation Management:</strong> Automatically escalate high-priority or overdue tickets</li>
                    <li><strong>Knowledge Base:</strong> Create and maintain help articles based on common issues</li>
                </ul>

                <h3>3.2 Service Improvement</h3>
                <ul>
                    <li><strong>Performance Analytics:</strong> Measure response times, resolution rates, and customer satisfaction</li>
                    <li><strong>Trend Analysis:</strong> Identify common issues and improve products/services</li>
                    <li><strong>Agent Training:</strong> Use anonymized ticket data to train support staff</li>
                    <li><strong>System Optimization:</strong> Improve platform performance and user experience</li>
                    <li><strong>Predictive Support:</strong> Proactively identify and prevent potential issues</li>
                </ul>

                <h3>3.3 Account and Security Management</h3>
                <ul>
                    <li><strong>Authentication:</strong> Verify identity and secure account access</li>
                    <li><strong>Authorization:</strong> Control access to features based on user roles and permissions</li>
                    <li><strong>Fraud Prevention:</strong> Detect and prevent unauthorized access or suspicious activities</li>
                    <li><strong>Security Monitoring:</strong> Monitor for potential security threats and vulnerabilities</li>
                    <li><strong>Backup and Recovery:</strong> Maintain data backups for business continuity</li>
                </ul>

                <h3>3.4 Legal Basis for Processing (GDPR)</h3>
                <div className="not-prose bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-200 rounded-xl p-6 shadow-sm mb-6">
                    <p className="text-sm text-gray-600 mb-3">We process your data based on the following legal grounds:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-blue-500 mt-0.5 flex-shrink-0" /><strong>Contract Performance:</strong> Processing necessary to provide support services</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-blue-500 mt-0.5 flex-shrink-0" /><strong>Legitimate Interest:</strong> Improving services, security, and business operations</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-blue-500 mt-0.5 flex-shrink-0" /><strong>Consent:</strong> Marketing communications and optional features</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-blue-500 mt-0.5 flex-shrink-0" /><strong>Legal Compliance:</strong> Compliance with regulations and legal obligations</li>
                    </ul>
                </div>
            </section>

            <section className="mb-10">
                <h2>4. Information Sharing and Disclosure</h2>
                <p>
                    We do not sell, trade, or rent your personal information to third parties. However, support ticket
                    systems require certain types of data sharing to function effectively:
                </p>

                <h3>4.1 Within Your Organization</h3>
                <ul>
                    <li><strong>Support Agents:</strong> Assigned agents can view tickets and customer information needed to provide support</li>
                    <li><strong>Supervisors and Managers:</strong> May access tickets for quality assurance and training purposes</li>
                    <li><strong>Administrators:</strong> System admins can access user accounts and tickets for system management</li>
                    <li><strong>Escalation Teams:</strong> Specialized teams may access escalated tickets requiring expert knowledge</li>
                </ul>

                <h3>4.2 Service Providers and Subprocessors</h3>
                <p>We may share data with trusted service providers who help us deliver our services:</p>
                <ul>
                    <li><strong>Cloud Infrastructure:</strong> AWS, Google Cloud, or Microsoft Azure for hosting and storage</li>
                    <li><strong>Email Services:</strong> SendGrid, Mailgun, or similar for sending notifications</li>
                    <li><strong>Authentication Providers:</strong> Single sign-on (SSO) providers like Okta or Auth0</li>
                    <li><strong>Analytics Services:</strong> Google Analytics, Mixpanel for usage analysis (anonymized data only)</li>
                    <li><strong>Monitoring Services:</strong> Error tracking and performance monitoring tools</li>
                </ul>

                <h3>4.3 Business Transfers</h3>
                <p>
                    If Arkynox is involved in a merger, acquisition, or sale of all or a portion of its assets,
                    your information may be transferred. We will provide notice before your personal information
                    is transferred and becomes subject to a different Privacy Policy.
                </p>

                <h3>4.4 Legal Requirements</h3>
                <p>We may disclose your information if required to do so by law or in response to:</p>
                <ul>
                    <li>Valid legal process (subpoenas, court orders)</li>
                    <li>Government investigations or law enforcement requests</li>
                    <li>Protection of our legal rights and property</li>
                    <li>Prevention of fraud or other illegal activities</li>
                    <li>Protection of the safety of our users or the public</li>
                </ul>

                <h3>4.5 Data Processing Agreements</h3>
                <div className="not-prose bg-gradient-to-br from-green-50 to-emerald-50/50 border border-green-200 rounded-xl p-6 shadow-sm">
                    <div className="flex items-start gap-3">
                        <ShieldIcon size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-green-800">
                            <strong>GDPR Compliance:</strong> All service providers and subprocessors sign Data Processing
                            Agreements (DPAs) ensuring they meet the same privacy standards we maintain. We conduct
                            regular audits of our service providers&rsquo; security and privacy practices.
                        </p>
                    </div>
                </div>
            </section>

            <section className="mb-10">
                <h2>5. Data Security and Protection</h2>
                <p>
                    Security is paramount in a support ticket system. We implement comprehensive security measures
                    specifically designed for support platforms:
                </p>

                <h3>5.1 Technical Security Measures</h3>
                <ul>
                    <li><strong>Encryption:</strong> AES-256 encryption for data at rest, TLS 1.3 for data in transit</li>
                    <li><strong>Database Security:</strong> Encrypted databases with restricted access and audit logs</li>
                    <li><strong>File Upload Security:</strong> Virus scanning, file type restrictions, and sandboxed storage</li>
                    <li><strong>Access Controls:</strong> Role-based permissions, multi-factor authentication, session timeouts</li>
                    <li><strong>Network Security:</strong> Firewalls, intrusion detection, DDoS protection</li>
                    <li><strong>Regular Penetration Testing:</strong> Third-party security assessments and vulnerability scans</li>
                </ul>

                <h3>5.2 Administrative Security</h3>
                <ul>
                    <li><strong>Employee Access:</strong> Strict need-to-know basis with background checks</li>
                    <li><strong>Training Programs:</strong> Regular security and privacy training for all staff</li>
                    <li><strong>Incident Response:</strong> Documented procedures for security breach response</li>
                    <li><strong>Audit Trails:</strong> Comprehensive logging of all system access and modifications</li>
                    <li><strong>Third-Party Assessments:</strong> SOC 2 Type II certification and regular audits</li>
                </ul>

                <h3>5.3 Support-Specific Security</h3>
                <ul>
                    <li><strong>Ticket Isolation:</strong> Customer tickets are isolated by organization/account</li>
                    <li><strong>Agent Permissions:</strong> Support agents only access tickets assigned to them</li>
                    <li><strong>Data Masking:</strong> Sensitive information (credit cards, SSNs) automatically masked</li>
                    <li><strong>Secure File Sharing:</strong> Encrypted file uploads with expiration dates</li>
                    <li><strong>Communication Security:</strong> All emails and chats encrypted and authenticated</li>
                </ul>

                <div className="not-prose bg-gradient-to-br from-red-50 to-rose-50/50 border border-red-200 rounded-xl p-5 shadow-sm">
                    <div className="flex items-start gap-3">
                        <AlertTriangleIcon size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-red-800">
                            <strong>Breach Notification:</strong> In the unlikely event of a data breach affecting your
                            personal information, we will notify you within 72 hours of discovery and provide details
                            about the incident and steps being taken to address it.
                        </p>
                    </div>
                </div>
            </section>

            <section className="mb-10">
                <h2>6. Data Retention and Deletion</h2>
                <p>
                    Support ticket systems require careful data retention policies to balance business needs,
                    legal requirements, and privacy rights:
                </p>

                <h3>6.1 Retention Periods</h3>
                <div className="not-prose overflow-x-auto mb-6">
                    <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-xl overflow-hidden text-sm shadow-sm">
                        <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                            <tr>
                                <th className="px-4 py-3 text-left font-semibold text-gray-700">Data Type</th>
                                <th className="px-4 py-3 text-left font-semibold text-gray-700">Retention Period</th>
                                <th className="px-4 py-3 text-left font-semibold text-gray-700">Reason</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-4 py-3 font-medium">Active Support Tickets</td><td className="px-4 py-3">Until resolved + 7 years</td><td className="px-4 py-3 text-xs">Legal compliance, warranty support</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-4 py-3 font-medium">Account Information</td><td className="px-4 py-3">Until deletion + 3 years</td><td className="px-4 py-3 text-xs">Business records, audit requirements</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-4 py-3 font-medium">Chat/Communication Logs</td><td className="px-4 py-3">5 years</td><td className="px-4 py-3 text-xs">Quality assurance, training</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-4 py-3 font-medium">File Attachments</td><td className="px-4 py-3">Same as related ticket</td><td className="px-4 py-3 text-xs">Support context, evidence</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-4 py-3 font-medium">System/Access Logs</td><td className="px-4 py-3">2 years</td><td className="px-4 py-3 text-xs">Security, troubleshooting</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-4 py-3 font-medium">Analytics Data</td><td className="px-4 py-3">3 years (anonymized)</td><td className="px-4 py-3 text-xs">Service improvement</td></tr>
                        </tbody>
                    </table>
                </div>

                <h3>6.2 Data Deletion Process</h3>
                <ul>
                    <li><strong>Automated Deletion:</strong> System automatically deletes data past retention periods</li>
                    <li><strong>Secure Deletion:</strong> Multi-pass overwriting ensuring data cannot be recovered</li>
                    <li><strong>Backup Purging:</strong> Data removed from all backups and archives</li>
                    <li><strong>Legal Holds:</strong> Data preserved longer when required by legal proceedings</li>
                    <li><strong>Verification:</strong> Regular audits confirm proper deletion procedures</li>
                </ul>

                <h3>6.3 Account Closure</h3>
                <p>
                    When you close your account, we will delete your personal information according to our
                    retention schedule. However, we may retain certain information longer if required for
                    legal compliance, fraud prevention, or legitimate business purposes.
                </p>
            </section>

            <section className="mb-10">
                <h2>7. Your Privacy Rights and Choices</h2>
                <p>
                    You have several rights regarding your personal information. Here is how to exercise them
                    within our support ticket system:
                </p>

                <h3>7.1 Access and Portability Rights</h3>
                <ul>
                    <li><strong>View Your Data:</strong> Access your profile, tickets, and communications through your account dashboard</li>
                    <li><strong>Download Tickets:</strong> Export your ticket history and attachments in standard formats</li>
                    <li><strong>Communication History:</strong> Request complete records of all communications</li>
                    <li><strong>Data Report:</strong> Request a comprehensive report of all data we hold about you</li>
                </ul>

                <h3>7.2 Correction and Update Rights</h3>
                <ul>
                    <li><strong>Profile Updates:</strong> Edit your personal information directly in your account settings</li>
                    <li><strong>Contact Information:</strong> Update email addresses, phone numbers, and notification preferences</li>
                    <li><strong>Ticket Corrections:</strong> Request corrections to ticket information (subject to audit trail requirements)</li>
                    <li><strong>Organization Details:</strong> Update company information and department assignments</li>
                </ul>

                <h3>7.3 Deletion and Restriction Rights</h3>
                <div className="not-prose bg-gradient-to-br from-yellow-50 to-amber-50/50 border border-yellow-200 rounded-xl p-6 shadow-sm mb-6">
                    <div className="flex items-start gap-3 mb-3">
                        <AlertTriangleIcon size={18} className="text-yellow-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-yellow-800">
                            <strong>Important Limitation:</strong> Some data cannot be deleted immediately due to
                            support ticket system requirements and legal obligations:
                        </p>
                    </div>
                    <ul className="text-sm text-yellow-700 space-y-1 ml-8">
                        <li>Active tickets must remain available until resolved</li>
                        <li>Historical tickets may be required for warranty or legal purposes</li>
                        <li>System audit logs cannot be modified for security compliance</li>
                    </ul>
                </div>
                <ul>
                    <li><strong>Account Deletion:</strong> Close your account and request deletion of personal information</li>
                    <li><strong>Selective Deletion:</strong> Remove specific tickets or communications (where legally permissible)</li>
                    <li><strong>Processing Restriction:</strong> Limit how we use your information while keeping necessary records</li>
                    <li><strong>Marketing Opt-out:</strong> Stop receiving promotional communications (support notifications continue)</li>
                </ul>

                <h3>7.4 How to Exercise Your Rights</h3>
                <div className="not-prose bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-200 rounded-xl p-6 shadow-sm mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-bold text-blue-800 mb-3">Online Methods:</h4>
                            <ul className="text-sm text-blue-700 space-y-1">
                                <li className="flex items-center gap-2"><CheckIcon size={14} className="text-blue-500" />Account Settings Dashboard</li>
                                <li className="flex items-center gap-2"><CheckIcon size={14} className="text-blue-500" />Privacy Rights Form (in-app)</li>
                                <li className="flex items-center gap-2"><CheckIcon size={14} className="text-blue-500" />Create a Privacy Ticket</li>
                                <li className="flex items-center gap-2"><CheckIcon size={14} className="text-blue-500" />Live Chat with Privacy Team</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-blue-800 mb-3">Contact Methods:</h4>
                            <ul className="text-sm text-blue-700 space-y-1">
                                <li className="flex items-center gap-2"><MailIcon size={14} className="text-blue-500" />Email: privacy@arkynox.com</li>
                                <li className="flex items-center gap-2"><PhoneIcon size={14} className="text-blue-500" />Phone: +1-555-PRIVACY</li>
                                <li className="flex items-center gap-2"><FileTextIcon size={14} className="text-blue-500" />Mail: Data Protection Officer</li>
                                <li className="flex items-center gap-2"><ClockIcon size={14} className="text-blue-500" />Response Time: Within 30 days</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <h3>7.5 Identity Verification</h3>
                <p>
                    To protect your privacy, we may need to verify your identity before processing requests.
                    This may involve confirming your email address, answering security questions, or providing
                    additional identification.
                </p>
            </section>

            <section className="mb-10">
                <h2>8. Cookies and Tracking Technologies</h2>
                <p>
                    Our support platform uses various technologies to enhance functionality and user experience:
                </p>

                <h3>8.1 Essential Cookies</h3>
                <ul>
                    <li><strong>Session Management:</strong> Maintain login status and user sessions</li>
                    <li><strong>Security Tokens:</strong> CSRF protection and secure form submissions</li>
                    <li><strong>Load Balancing:</strong> Distribute traffic across servers for performance</li>
                    <li><strong>Feature Toggles:</strong> Enable/disable features for your account</li>
                </ul>

                <h3>8.2 Functional Cookies</h3>
                <ul>
                    <li><strong>User Preferences:</strong> Remember language, timezone, and notification settings</li>
                    <li><strong>Interface Customization:</strong> Save dashboard layouts and view preferences</li>
                    <li><strong>Recent Activity:</strong> Track recently viewed tickets and searches</li>
                    <li><strong>Accessibility:</strong> Remember accessibility preferences and settings</li>
                </ul>

                <h3>8.3 Analytics Cookies (Optional)</h3>
                <div className="not-prose bg-gradient-to-br from-gray-50 to-slate-50/50 border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
                    <p className="text-sm text-gray-600 mb-3">
                        <strong>Your Choice:</strong> These cookies are optional and can be disabled in your privacy settings.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                        <li className="flex items-start gap-2"><BarChartIcon size={14} className="text-gray-400 mt-0.5 flex-shrink-0" /><strong>Usage Analytics:</strong> Understand which features are most helpful</li>
                        <li className="flex items-start gap-2"><BarChartIcon size={14} className="text-gray-400 mt-0.5 flex-shrink-0" /><strong>Performance Monitoring:</strong> Identify and fix slow-loading pages</li>
                        <li className="flex items-start gap-2"><SearchIcon size={14} className="text-gray-400 mt-0.5 flex-shrink-0" /><strong>Error Tracking:</strong> Detect and resolve technical issues</li>
                        <li className="flex items-start gap-2"><RefreshCwIcon size={14} className="text-gray-400 mt-0.5 flex-shrink-0" /><strong>A/B Testing:</strong> Test interface improvements (anonymized)</li>
                    </ul>
                </div>

                <h3>8.4 Managing Cookies</h3>
                <ul>
                    <li><strong>Browser Settings:</strong> Configure cookie preferences in your browser</li>
                    <li><strong>Privacy Dashboard:</strong> Control cookie categories in your account settings</li>
                    <li><strong>Do Not Track:</strong> We respect browser &ldquo;Do Not Track&rdquo; signals</li>
                    <li><strong>Cookie Banner:</strong> Manage preferences through our cookie consent banner</li>
                </ul>

                <h3>8.5 Third-Party Integrations</h3>
                <p>
                    When you connect third-party services (like CRM systems or chat tools), those integrations
                    may use their own cookies and tracking technologies governed by their privacy policies.
                </p>
            </section>

            <section className="mb-10">
                <h2>9. International Data Transfers</h2>
                <p>
                    As a global support platform, we may transfer and process your data in multiple jurisdictions
                    to provide optimal service performance and availability:
                </p>

                <h3>9.1 Data Residency Options</h3>
                <ul>
                    <li><strong>Regional Data Centers:</strong> Choose where your primary data is stored (US, EU, APAC)</li>
                    <li><strong>Data Localization:</strong> Option to keep all data within specific geographic regions</li>
                    <li><strong>Backup Locations:</strong> Encrypted backups stored in secure, compliant facilities</li>
                    <li><strong>Content Delivery:</strong> Cached content served from geographically close servers</li>
                </ul>

                <h3>9.2 Transfer Safeguards</h3>
                <div className="not-prose bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-200 rounded-xl p-6 shadow-sm mb-6">
                    <p className="text-sm text-blue-800 mb-3">
                        <strong>Legal Basis for Transfers:</strong> We ensure adequate protection through:
                    </p>
                    <ul className="text-sm text-blue-700 space-y-1">
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-blue-500 mt-0.5 flex-shrink-0" /><strong>Standard Contractual Clauses (SCCs):</strong> EU-approved transfer mechanisms</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-blue-500 mt-0.5 flex-shrink-0" /><strong>Adequacy Decisions:</strong> Transfers to countries with adequate protection</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-blue-500 mt-0.5 flex-shrink-0" /><strong>Binding Corporate Rules:</strong> Internal data protection standards</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-blue-500 mt-0.5 flex-shrink-0" /><strong>Certification Schemes:</strong> ISO 27001, SOC 2 compliance</li>
                    </ul>
                </div>

                <h3>9.3 Cross-Border Support</h3>
                <ul>
                    <li><strong>Follow-the-Sun Support:</strong> 24/7 support may involve agents in different time zones</li>
                    <li><strong>Escalation Teams:</strong> Complex issues may be routed to specialized global teams</li>
                    <li><strong>Data Access Controls:</strong> Agents only access data necessary for their assigned tickets</li>
                    <li><strong>Jurisdictional Compliance:</strong> All cross-border access complies with local privacy laws</li>
                </ul>
            </section>

            <section className="mb-10">
                <h2>10. Special Categories and Sensitive Data</h2>
                <p>
                    Support tickets may inadvertently contain sensitive personal information. Here is how we handle it:
                </p>

                <h3>10.1 Automatic Detection and Protection</h3>
                <ul>
                    <li><strong>Data Loss Prevention (DLP):</strong> Automatic detection of SSNs, credit card numbers, passwords</li>
                    <li><strong>Content Filtering:</strong> AI-powered scanning for sensitive information in tickets and attachments</li>
                    <li><strong>Automatic Masking:</strong> Sensitive data automatically redacted or encrypted</li>
                    <li><strong>Agent Alerts:</strong> Support agents warned when tickets may contain sensitive data</li>
                </ul>

                <h3>10.2 Handling Guidelines</h3>
                <div className="not-prose bg-gradient-to-br from-red-50 to-rose-50/50 border border-red-200 rounded-xl p-6 shadow-sm mb-6">
                    <div className="flex items-start gap-3 mb-3">
                        <AlertTriangleIcon size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-red-800">
                            <strong>Please Avoid Sharing:</strong> To protect your privacy, please do not include
                            sensitive information in support tickets:
                        </p>
                    </div>
                    <ul className="text-sm text-red-700 space-y-1 ml-8">
                        <li>Social Security Numbers or National ID numbers</li>
                        <li>Credit card numbers or financial account information</li>
                        <li>Passwords or authentication credentials</li>
                        <li>Medical or health information</li>
                        <li>Biometric data or genetic information</li>
                    </ul>
                </div>

                <h3>10.3 Secure Alternatives</h3>
                <ul>
                    <li><strong>Secure Upload Portal:</strong> Encrypted file transfer for sensitive documents</li>
                    <li><strong>Reference Numbers:</strong> Use order/account numbers instead of personal details</li>
                    <li><strong>Phone Verification:</strong> Verify sensitive information over secure phone lines</li>
                    <li><strong>Temporary Links:</strong> Self-destructing secure links for sensitive file sharing</li>
                </ul>
            </section>

            <section className="mb-10">
                <h2>11. Jurisdiction-Specific Rights and Compliance</h2>
                <p>
                    We recognize that privacy laws differ across the world. Below is a jurisdiction-by-jurisdiction
                    guide to your specific rights, the laws that protect you, and how we comply. This section
                    should be read together with the rest of this Privacy Policy.
                </p>

                <h3>11.1 Quick Reference by Country</h3>
                <div className="not-prose overflow-x-auto mb-6">
                    <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-xl overflow-hidden text-sm shadow-sm">
                        <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                            <tr>
                                <th className="px-3 py-3 text-left font-semibold text-gray-700">Country</th>
                                <th className="px-3 py-3 text-left font-semibold text-gray-700">Governing Law</th>
                                <th className="px-3 py-3 text-left font-semibold text-gray-700">Consent Age</th>
                                <th className="px-3 py-3 text-left font-semibold text-gray-700">Breach Notice</th>
                                <th className="px-3 py-3 text-left font-semibold text-gray-700">Localization</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-3 py-3 font-medium">United States</td><td className="px-3 py-3 text-xs">CCPA/CPRA, COPPA, HIPAA</td><td className="px-3 py-3">13</td><td className="px-3 py-3 text-xs">By state (30-60 days)</td><td className="px-3 py-3 text-gray-400">No</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-3 py-3 font-medium">EU/EEA</td><td className="px-3 py-3 text-xs">GDPR</td><td className="px-3 py-3">16</td><td className="px-3 py-3 text-xs">72 hours</td><td className="px-3 py-3 text-gray-400">No</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-3 py-3 font-medium">United Kingdom</td><td className="px-3 py-3 text-xs">UK GDPR / DPA 2018</td><td className="px-3 py-3">13</td><td className="px-3 py-3 text-xs">72 hours</td><td className="px-3 py-3 text-gray-400">No</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-3 py-3 font-medium">India</td><td className="px-3 py-3 text-xs">DPDP Act 2023</td><td className="px-3 py-3">18</td><td className="px-3 py-3 text-xs">72 hours to DPBI</td><td className="px-3 py-3 font-medium">Yes*</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-3 py-3 font-medium">Brazil</td><td className="px-3 py-3 text-xs">LGPD (Lei 13.709/2018)</td><td className="px-3 py-3">18</td><td className="px-3 py-3 text-xs">Reasonable time</td><td className="px-3 py-3 text-gray-400">No</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-3 py-3 font-medium">Japan</td><td className="px-3 py-3 text-xs">APPI (amended 2022)</td><td className="px-3 py-3">15</td><td className="px-3 py-3 text-xs">Promptly required</td><td className="px-3 py-3 text-gray-400">No</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-3 py-3 font-medium">South Africa</td><td className="px-3 py-3 text-xs">POPIA</td><td className="px-3 py-3">18</td><td className="px-3 py-3 text-xs">As soon as possible</td><td className="px-3 py-3 text-gray-400">No</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-3 py-3 font-medium">Russia</td><td className="px-3 py-3 text-xs">152-FZ on Personal Data</td><td className="px-3 py-3">18</td><td className="px-3 py-3 text-xs">24 hours to Roskomnadzor</td><td className="px-3 py-3 font-medium">Yes</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-3 py-3 font-medium">Turkey</td><td className="px-3 py-3 text-xs">KVKK No. 6698</td><td className="px-3 py-3">18</td><td className="px-3 py-3 text-xs">72 hours to KVKK</td><td className="px-3 py-3 text-gray-400">No</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-3 py-3 font-medium">Australia</td><td className="px-3 py-3 text-xs">Privacy Act 1988 (2023 amend.)</td><td className="px-3 py-3">15</td><td className="px-3 py-3 text-xs">30 days max</td><td className="px-3 py-3 text-gray-400">No</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-3 py-3 font-medium">Nigeria</td><td className="px-3 py-3 text-xs">Data Protection Act 2023</td><td className="px-3 py-3">18</td><td className="px-3 py-3 text-xs">72 hours to NDPC</td><td className="px-3 py-3 text-gray-400">No</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-3 py-3 font-medium">Indonesia</td><td className="px-3 py-3 text-xs">UU PDP No. 27/2022</td><td className="px-3 py-3">18</td><td className="px-3 py-3 text-xs">72 hours</td><td className="px-3 py-3 font-medium">Yes</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-3 py-3 font-medium">Thailand</td><td className="px-3 py-3 text-xs">PDPA B.E. 2562</td><td className="px-3 py-3">20</td><td className="px-3 py-3 text-xs">72 hours to PDPC</td><td className="px-3 py-3 text-gray-400">No</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-3 py-3 font-medium">Philippines</td><td className="px-3 py-3 text-xs">Data Privacy Act 2012</td><td className="px-3 py-3">18</td><td className="px-3 py-3 text-xs">72 hours to NPC</td><td className="px-3 py-3 text-gray-400">No</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-3 py-3 font-medium">Germany</td><td className="px-3 py-3 text-xs">BDSG + GDPR</td><td className="px-3 py-3">16</td><td className="px-3 py-3 text-xs">72 hours (GDPR)</td><td className="px-3 py-3 text-gray-400">No</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-3 py-3 font-medium">France</td><td className="px-3 py-3 text-xs">Loi Informatique et Libertes + GDPR</td><td className="px-3 py-3">15</td><td className="px-3 py-3 text-xs">72 hours to CNIL</td><td className="px-3 py-3 text-gray-400">No</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-3 py-3 font-medium">Spain</td><td className="px-3 py-3 text-xs">LOPDGDD + GDPR</td><td className="px-3 py-3">14</td><td className="px-3 py-3 text-xs">72 hours to AEPD</td><td className="px-3 py-3 text-gray-400">No</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-3 py-3 font-medium">Netherlands</td><td className="px-3 py-3 text-xs">UAVG + GDPR</td><td className="px-3 py-3">16</td><td className="px-3 py-3 text-xs">72 hours to AP</td><td className="px-3 py-3 text-gray-400">No</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-3 py-3 font-medium">Kenya</td><td className="px-3 py-3 text-xs">Data Protection Act 2019</td><td className="px-3 py-3">18</td><td className="px-3 py-3 text-xs">72 hours to ODPC</td><td className="px-3 py-3 font-medium">Yes</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-3 py-3 font-medium">South Korea</td><td className="px-3 py-3 text-xs">PIPA (amended 2023)</td><td className="px-3 py-3">14</td><td className="px-3 py-3 text-xs">72 hours to PIPC</td><td className="px-3 py-3 font-medium">Yes</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-3 py-3 font-medium">Sri Lanka</td><td className="px-3 py-3 text-xs">PDPA No. 9 of 2022</td><td className="px-3 py-3">18</td><td className="px-3 py-3 text-xs">72 hours to DPA</td><td className="px-3 py-3 text-gray-400">No</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-3 py-3 font-medium">Kazakhstan</td><td className="px-3 py-3 text-xs">Law No. 94-V</td><td className="px-3 py-3">18</td><td className="px-3 py-3 text-xs">3 days to MDDIAI</td><td className="px-3 py-3 font-medium">Yes</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-3 py-3 font-medium">Yemen</td><td className="px-3 py-3 text-xs">Constitutional provisions</td><td className="px-3 py-3">18</td><td className="px-3 py-3 text-xs">As soon as practicable</td><td className="px-3 py-3 text-gray-400">No</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-3 py-3 font-medium">Iran</td><td className="px-3 py-3 text-xs">Constitutional + Computer Crimes Law</td><td className="px-3 py-3">18</td><td className="px-3 py-3 text-xs">As soon as practicable</td><td className="px-3 py-3 font-medium">Yes*</td></tr>
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-gray-400 mb-6">
                    * Data localization: Russia&rsquo;s 152-FZ requires storing Russian citizens&rsquo; data on servers within Russia.
                    India&rsquo;s DPDP Act mandates notification of transfer arrangements. Kazakhstan requires servers in-country
                    for citizen data. Iran has sectoral localization requirements. Yemen does not currently mandate localization.
                    We provide localized hosting options where required by law.
                </p>

                <h3>11.2 GDPR (EU/EEA/UK) &mdash; Your Additional Rights</h3>
                <div className="not-prose bg-gradient-to-br from-indigo-50 to-blue-50/50 border border-indigo-200 rounded-xl p-6 shadow-sm mb-6">
                    <p className="text-sm text-indigo-800 mb-3">
                        If you are in the EU, EEA, or UK, you have these additional rights under the GDPR/UK GDPR:
                    </p>
                    <ul className="text-sm text-indigo-700 space-y-1">
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-indigo-500 mt-0.5 flex-shrink-0" /><strong>Right to Data Portability</strong> &mdash; Receive your data in a structured, machine-readable format</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-indigo-500 mt-0.5 flex-shrink-0" /><strong>Right to Restrict Processing</strong> &mdash; Temporarily limit how we use your data while a complaint is resolved</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-indigo-500 mt-0.5 flex-shrink-0" /><strong>Right to Object</strong> &mdash; Object to processing based on legitimate interests or direct marketing</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-indigo-500 mt-0.5 flex-shrink-0" /><strong>Automated Decision-Making</strong> &mdash; Not be subject to decisions based solely on automated processing</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-indigo-500 mt-0.5 flex-shrink-0" /><strong>Lodge a Complaint</strong> &mdash; With your local Data Protection Authority at any time</li>
                    </ul>
                </div>

                <h3>11.3 India (DPDP Act 2023) &mdash; Your Additional Rights</h3>
                <div className="not-prose bg-gradient-to-br from-orange-50 to-amber-50/50 border border-orange-200 rounded-xl p-6 shadow-sm mb-6">
                    <p className="text-sm text-orange-800 mb-3">
                        If you are in India, you have these additional rights under the Digital Personal Data Protection Act 2023:
                    </p>
                    <ul className="text-sm text-orange-700 space-y-1">
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-orange-500 mt-0.5 flex-shrink-0" /><strong>Right to Information</strong> &mdash; Know the purpose, categories, and recipients of your data</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-orange-500 mt-0.5 flex-shrink-0" /><strong>Right to Correction and Erasure</strong> &mdash; Update or delete your data</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-orange-500 mt-0.5 flex-shrink-0" /><strong>Right to Grievance Redressal</strong> &mdash; Our Grievance Officer will respond within 48 hours</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-orange-500 mt-0.5 flex-shrink-0" /><strong>Right to Nominate</strong> &mdash; Appoint a representative to exercise rights on your behalf after your death or incapacity</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-orange-500 mt-0.5 flex-shrink-0" /><strong>Consent Manager</strong> &mdash; You may withdraw consent at any time (note: this may affect service availability)</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-orange-500 mt-0.5 flex-shrink-0" /><strong>Parental Consent</strong> &mdash; For users under 18, we require verifiable parental consent</li>
                    </ul>
                    <div className="mt-4 p-3 bg-orange-100/80 rounded-lg">
                        <p className="text-orange-800 text-xs font-medium">Grievance Officer: grievance@arkynox.com | Response within 48 hours</p>
                    </div>
                </div>

                <h3>11.4 Brazil (LGPD) &mdash; Your Additional Rights</h3>
                <div className="not-prose bg-gradient-to-br from-green-50 to-emerald-50/50 border border-green-200 rounded-xl p-6 shadow-sm mb-6">
                    <p className="text-sm text-green-800 mb-3">
                        If you are in Brazil, under Lei Geral de Protecao de Dados (LGPD) you have:
                    </p>
                    <ul className="text-sm text-green-700 space-y-1">
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-green-500 mt-0.5 flex-shrink-0" /><strong>Confirmation</strong> &mdash; Know if we process your data</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-green-500 mt-0.5 flex-shrink-0" /><strong>Access</strong> &mdash; View your data held by us</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-green-500 mt-0.5 flex-shrink-0" /><strong>Correction</strong> &mdash; Fix incomplete or inaccurate data</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-green-500 mt-0.5 flex-shrink-0" /><strong>Anonymization/Blocking/Deletion</strong> &mdash; For unnecessary or excessive data</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-green-500 mt-0.5 flex-shrink-0" /><strong>Portability</strong> &mdash; Transfer your data to another service provider</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-green-500 mt-0.5 flex-shrink-0" /><strong>Revoke Consent</strong> &mdash; At any time (affects service capability)</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-green-500 mt-0.5 flex-shrink-0" /><strong>Oppose Processing</strong> &mdash; For certain purposes</li>
                    </ul>
                    <p className="text-green-700 text-xs mt-3">
                        DPO Contact: dpo@arkynox.com | ANPD may be contacted at anpd.gov.br
                    </p>
                </div>

                <h3>11.5 Japan (APPI) &mdash; Your Additional Rights</h3>
                <div className="not-prose bg-gradient-to-br from-red-50 to-rose-50/50 border border-red-200 rounded-xl p-6 shadow-sm mb-6">
                    <ul className="text-sm text-red-700 space-y-1">
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-red-500 mt-0.5 flex-shrink-0" /><strong>Disclosure</strong> &mdash; Request disclosure of retained personal data</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-red-500 mt-0.5 flex-shrink-0" /><strong>Correction/Addition/Deletion</strong> &mdash; Of your personal data</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-red-500 mt-0.5 flex-shrink-0" /><strong>Cessation of Use</strong> &mdash; Stop processing in cases of violation or where consent is withdrawn</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-red-500 mt-0.5 flex-shrink-0" /><strong>Explanation</strong> &mdash; Request explanation of our processing methods</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-red-500 mt-0.5 flex-shrink-0" /><strong>Opt-Out</strong> &mdash; You may opt out of third-party provision of your data</li>
                    </ul>
                    <p className="text-red-700 text-xs mt-3">
                        PPC Contact: ppc@arkynox.com (we will forward to PPC Japan upon request)
                    </p>
                </div>

                <h3>11.6 South Africa (POPIA) &mdash; Your Additional Rights</h3>
                <div className="not-prose bg-gradient-to-br from-yellow-50 to-amber-50/50 border border-yellow-200 rounded-xl p-6 shadow-sm mb-6">
                    <ul className="text-sm text-yellow-700 space-y-1">
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-yellow-500 mt-0.5 flex-shrink-0" /><strong>Access</strong> &mdash; Request confirmation of what data we hold</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-yellow-500 mt-0.5 flex-shrink-0" /><strong>Correction</strong> &mdash; Fix inaccurate or misleading information</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-yellow-500 mt-0.5 flex-shrink-0" /><strong>Deletion</strong> &mdash; Request deletion (subject to legal limits)</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-yellow-500 mt-0.5 flex-shrink-0" /><strong>Object to Marketing</strong> &mdash; Direct marketing opt-out at any time</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-yellow-500 mt-0.5 flex-shrink-0" /><strong>Breach Notification</strong> &mdash; Notified as soon as reasonably possible</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-yellow-500 mt-0.5 flex-shrink-0" /><strong>Complaint</strong> &mdash; Lodge with the Information Regulator</li>
                    </ul>
                    <p className="text-yellow-700 text-xs mt-3">
                        Information Regulator: inforeg@justice.gov.za | Our DPO: dpo@arkynox.com
                    </p>
                </div>

                <h3>11.7 Russia (152-FZ) &mdash; Data Localization</h3>
                <div className="not-prose bg-gradient-to-br from-red-50 to-rose-50/50 border border-red-200 rounded-xl p-6 shadow-sm mb-6">
                    <p className="text-sm text-red-800">
                        If you are in Russia, Federal Law No. 152-FZ requires that Russian citizens&rsquo; personal data
                        be processed using databases located within the Russian Federation. We comply by maintaining
                        localized data processing infrastructure for Russian users. Roskomnadzor may be contacted
                        regarding data protection matters.
                    </p>
                </div>

                <h3>11.8 Turkey (KVKK) &mdash; Your Additional Rights</h3>
                <div className="not-prose bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-200 rounded-xl p-6 shadow-sm mb-6">
                    <ul className="text-sm text-blue-700 space-y-1">
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />Learn whether your data is being processed</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />Request information about processing activities</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />Learn the purpose and whether data is used appropriately</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />Request correction of inaccurate/incomplete data</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />Request deletion or anonymization of data</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />Object to unfavorable automated processing results</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />Claim damages for unlawful processing</li>
                    </ul>
                    <p className="text-blue-700 text-xs mt-3">
                        KVKK: kvkk.gov.tr | Our Representative: kvkk@arkynox.com
                    </p>
                </div>

                <h3>11.9 Australia (Privacy Act) &mdash; Your Additional Rights</h3>
                <div className="not-prose bg-gradient-to-br from-green-50 to-emerald-50/50 border border-green-200 rounded-xl p-6 shadow-sm mb-6">
                    <ul className="text-sm text-green-700 space-y-1">
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-green-500 mt-0.5 flex-shrink-0" /><strong>Access</strong> &mdash; Request access to your personal information</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-green-500 mt-0.5 flex-shrink-0" /><strong>Correction</strong> &mdash; Update or correct your information</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-green-500 mt-0.5 flex-shrink-0" /><strong>Deletion</strong> &mdash; Request deletion in certain circumstances</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-green-500 mt-0.5 flex-shrink-0" /><strong>Notifiable Data Breaches</strong> &mdash; We will notify OAIC and affected individuals</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-green-500 mt-0.5 flex-shrink-0" /><strong>Children Privacy</strong> &mdash; Enhanced protections for under-15s</li>
                    </ul>
                    <p className="text-green-700 text-xs mt-3">
                        OAIC: oaic.gov.au | Our DPO: dpo@arkynox.com
                    </p>
                </div>

                <h3>11.10 Indonesia (UU PDP) &mdash; Your Additional Rights</h3>
                <div className="not-prose bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-200 rounded-xl p-6 shadow-sm mb-6">
                    <ul className="text-sm text-blue-700 space-y-1">
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />Right to Information about data processing</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />Right to Access your personal data</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />Right to Correction and Update of data</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />Right to Deletion of personal data</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />Right to Data Portability</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />Right to Withdraw consent</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />Right to Object to automated decisions</li>
                    </ul>
                </div>

                <h3>11.11 Thailand (PDPA) &mdash; Your Additional Rights</h3>
                <div className="not-prose bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-200 rounded-xl p-6 shadow-sm mb-6">
                    <ul className="text-sm text-blue-700 space-y-1">
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />Right of Access</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />Right to Data Portability</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />Right to Object to collection/use/disclosure</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />Right to Erasure</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />Right to Restrict Processing</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />Right to Rectification</li>
                    </ul>
                    <p className="text-blue-700 text-xs mt-3">
                        Note: Consent age in Thailand is 20. For users under 20, we require parental/guardian consent.
                    </p>
                </div>

                <h3>11.12 Philippines (Data Privacy Act) &mdash; Your Additional Rights</h3>
                <div className="not-prose bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-200 rounded-xl p-6 shadow-sm mb-6">
                    <ul className="text-sm text-blue-700 space-y-1">
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />Right to be Informed</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />Right to Access</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />Right to Object</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />Right to Erasure or Blocking</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />Right to Damages for violation</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />Right to Data Portability</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />Right to File a complaint with NPC</li>
                    </ul>
                    <p className="text-blue-700 text-xs mt-3">
                        NPC: privacy.gov.ph | Our DPO: dpo@arkynox.com
                    </p>
                </div>

                <h3>11.13 Nigeria, Kenya & South Africa &mdash; Data Protection</h3>
                <div className="not-prose bg-gradient-to-br from-green-50 to-emerald-50/50 border border-green-200 rounded-xl p-6 shadow-sm mb-6">
                    <p className="text-sm text-green-800 mb-3">
                        These African nations have comprehensive data protection laws. Key similarities:
                    </p>
                    <ul className="text-sm text-green-700 space-y-1">
                        <li className="flex items-start gap-2"><GlobeIcon size={14} className="text-green-500 mt-0.5 flex-shrink-0" /><strong>Nigeria (NDPR Act 2023):</strong> Right to access, correction, deletion, objection, portability. Consent required for sensitive data. Breach notification to NDPC within 72 hours.</li>
                        <li className="flex items-start gap-2"><GlobeIcon size={14} className="text-green-500 mt-0.5 flex-shrink-0" /><strong>Kenya (DPA 2019):</strong> Right to be informed, access, object, correct, delete, portability. Data localization required for critical data. Breach notification to ODPC within 72 hours.</li>
                        <li className="flex items-start gap-2"><GlobeIcon size={14} className="text-green-500 mt-0.5 flex-shrink-0" /><strong>South Africa (POPIA):</strong> 8 conditions for lawful processing including accountability, purpose specification, further processing limitation. See section 11.6 above.</li>
                    </ul>
                </div>

                <h3>11.14 South Korea (PIPA) &mdash; Your Additional Rights</h3>
                <div className="not-prose bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-200 rounded-xl p-6 shadow-sm mb-6">
                    <ul className="text-sm text-blue-700 space-y-1">
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />Right to Consent before collection and use</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />Right to Access personal information</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />Right to Correction of inaccurate info</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />Right to Deletion</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />Right to Suspension of processing</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-blue-500 mt-0.5 flex-shrink-0" /><strong>Strict cross-border transfer rules</strong> &mdash; We implement alternative safeguards per PIPA</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />Pseudonymized data may be processed without consent for specific purposes</li>
                    </ul>
                    <p className="text-blue-700 text-xs mt-3">
                        PIPC: pipc.go.kr | Consent age: 14
                    </p>
                </div>

                <h3>11.15 Sri Lanka (PDPA No. 9 of 2022)</h3>
                <div className="not-prose bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-200 rounded-xl p-6 shadow-sm mb-6">
                    <ul className="text-sm text-blue-700 space-y-1">
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />Right to be Informed</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />Right of Access</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />Right to Correction</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />Right to Erasure</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />Right to Restrict Processing</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />Right to Data Portability</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />Right to Object</li>
                    </ul>
                    <p className="text-blue-700 text-xs mt-3">
                        DPA of Sri Lanka: dpa.gov.lk | Breach notify: 72 hours
                    </p>
                </div>

                <h3>11.16 Kazakhstan (Law No. 94-V)</h3>
                <div className="not-prose bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-200 rounded-xl p-6 shadow-sm mb-6">
                    <p className="text-sm text-blue-800">
                        Kazakhstan requires that personal data of Kazakh citizens be stored on servers within
                        Kazakhstan. We comply through localized hosting infrastructure. Consent is required for
                        third-party sharing. Breach notification must be made within 3 days to the authorized body (MDDIAI).
                    </p>
                </div>

                <h3>11.17 Yemen & Iran &mdash; Privacy Protections</h3>
                <div className="not-prose bg-gradient-to-br from-gray-50 to-slate-50/50 border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
                    <p className="text-sm text-gray-600">
                        <strong>Yemen:</strong> Privacy is protected under Article 40 of the Constitution. There is no
                        comprehensive data protection law currently. We voluntarily extend the same high standard of
                        data protection to all users regardless of their country&rsquo;s legal framework.
                    </p>
                    <p className="text-sm text-gray-600 mt-3">
                        <strong>Iran:</strong> Privacy protections exist under Articles 22-25 of the Constitution and
                        the Computer Crimes Law. While no comprehensive data protection law exists, we apply our
                        global privacy standards to all users. Iran has sectoral data localization requirements that
                        we accommodate where applicable.
                    </p>
                </div>

                <h3>11.18 Children&rsquo;s Privacy Across Jurisdictions</h3>
                <div className="not-prose bg-gradient-to-br from-yellow-50 to-amber-50/50 border border-yellow-200 rounded-xl p-6 shadow-sm mb-6">
                    <p className="text-sm text-yellow-800 mb-3">
                        The age at which a child can independently consent to data processing varies by country:
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm text-yellow-700">
                        <div className="bg-white/50 rounded-lg p-2"><span className="font-medium">13+</span> &mdash; US (COPPA), UK</div>
                        <div className="bg-white/50 rounded-lg p-2"><span className="font-medium">14+</span> &mdash; Spain, South Korea</div>
                        <div className="bg-white/50 rounded-lg p-2"><span className="font-medium">15+</span> &mdash; Japan, France, Australia</div>
                        <div className="bg-white/50 rounded-lg p-2"><span className="font-medium">16+</span> &mdash; EU/EEA, Germany, Netherlands</div>
                        <div className="bg-white/50 rounded-lg p-2"><span className="font-medium">18+</span> &mdash; India, Brazil, Turkey, Nigeria, Kenya, Philippines, Sri Lanka, Kazakhstan, Yemen, Iran</div>
                        <div className="bg-white/50 rounded-lg p-2"><span className="font-medium">20+</span> &mdash; Thailand</div>
                    </div>
                    <p className="text-yellow-700 text-xs mt-3">
                        For users under the applicable age in their jurisdiction, we require verifiable parental
                        or guardian consent before processing personal data. Please contact privacy@arkynox.com
                        if you need to provide parental consent.
                    </p>
                </div>

                <h3>11.19 Cross-Border Data Transfer Mechanisms</h3>
                <div className="not-prose bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-200 rounded-xl p-6 shadow-sm mb-6">
                    <p className="text-sm text-blue-800 mb-3">
                        When we transfer your data across borders, we rely on these safeguards:
                    </p>
                    <ul className="text-sm text-blue-700 space-y-1">
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-blue-500 mt-0.5 flex-shrink-0" /><strong>Standard Contractual Clauses (SCCs)</strong> &mdash; EU/EEA/UK approved transfer agreements</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-blue-500 mt-0.5 flex-shrink-0" /><strong>Adequacy Decisions</strong> &mdash; Transfers to countries deemed adequate by the European Commission</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-blue-500 mt-0.5 flex-shrink-0" /><strong>Data Localization</strong> &mdash; In-country hosting for Russia, Kazakhstan, Indonesia, Kenya, South Korea, and India (where required)</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-blue-500 mt-0.5 flex-shrink-0" /><strong>Binding Corporate Rules</strong> &mdash; Internal privacy standards for our global operations</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-blue-500 mt-0.5 flex-shrink-0" /><strong>Explicit Consent</strong> &mdash; For cross-border transfers where other mechanisms are not available</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-blue-500 mt-0.5 flex-shrink-0" /><strong>DPDP Act (India)</strong> &mdash; Notice to Data Principal before transfer, with consent or deemed consent</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-blue-500 mt-0.5 flex-shrink-0" /><strong>PIPA (South Korea)</strong> &mdash; Alternative safeguards per PIPA Article 28-8</li>
                    </ul>
                </div>

                <div className="not-prose bg-gradient-to-br from-gray-50 to-slate-50/50 border border-gray-200 rounded-xl p-5 shadow-sm">
                    <p className="text-sm text-gray-500">
                        <strong>Questions about your specific jurisdiction?</strong> Contact privacy@arkynox.com with
                        your country of residence and we will provide you with the specific rights and protections
                        applicable to you. We respond to all jurisdictional inquiries within 48 hours.
                    </p>
                </div>
            </section>

            <section className="mb-10">
                <h2>12. Changes to This Privacy Policy</h2>
                <p>
                    We regularly review and may update this Privacy Policy to reflect changes in our services,
                    legal requirements, or industry best practices:
                </p>

                <h3>12.1 Types of Changes</h3>
                <ul>
                    <li><strong>Minor Updates:</strong> Clarifications, contact information updates, formatting changes</li>
                    <li><strong>Material Changes:</strong> New data collection, sharing practices, or use purposes</li>
                    <li><strong>Legal Changes:</strong> Updates required by new laws or regulations</li>
                    <li><strong>Feature Changes:</strong> Privacy implications of new product features</li>
                </ul>

                <h3>12.2 Notification Process</h3>
                <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50/50 border border-green-200 rounded-xl p-5 shadow-sm">
                        <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                            <CheckIcon size={16} className="text-green-600" />
                            Minor Changes
                        </h4>
                        <ul className="text-sm text-green-700 space-y-1">
                            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green-400 rounded-full flex-shrink-0" />Updated effective date</li>
                            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green-400 rounded-full flex-shrink-0" />In-app notification</li>
                            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green-400 rounded-full flex-shrink-0" />Version history available</li>
                            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green-400 rounded-full flex-shrink-0" />No additional consent required</li>
                        </ul>
                    </div>
                    <div className="bg-gradient-to-br from-orange-50 to-amber-50/50 border border-orange-200 rounded-xl p-5 shadow-sm">
                        <h4 className="font-bold text-orange-800 mb-3 flex items-center gap-2">
                            <AlertTriangleIcon size={16} className="text-orange-600" />
                            Material Changes
                        </h4>
                        <ul className="text-sm text-orange-700 space-y-1">
                            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-orange-400 rounded-full flex-shrink-0" />30-day advance notice</li>
                            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-orange-400 rounded-full flex-shrink-0" />Email notification</li>
                            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-orange-400 rounded-full flex-shrink-0" />Dashboard banner</li>
                            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-orange-400 rounded-full flex-shrink-0" />Consent may be required</li>
                        </ul>
                    </div>
                </div>

                <h3>12.3 Your Options</h3>
                <ul>
                    <li><strong>Review Changes:</strong> Compare current and previous versions side-by-side</li>
                    <li><strong>Ask Questions:</strong> Contact our privacy team for clarification</li>
                    <li><strong>Opt Out:</strong> Withdraw consent for new uses of your data</li>
                    <li><strong>Account Closure:</strong> Close your account if you disagree with changes</li>
                </ul>
            </section>

            <section className="mb-10">
                <h2>13. Contact Information and Support</h2>
                <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-200 rounded-xl p-6 shadow-sm">
                        <h3 className="font-bold text-blue-800 mb-4 flex items-center gap-2">
                            <UsersIcon size={18} className="text-blue-500" />
                            Privacy Team
                        </h3>
                        <ul className="text-sm text-blue-700 space-y-2">
                            <li className="flex items-center gap-2"><MailIcon size={16} className="text-blue-500" /><strong>Email:</strong> privacy@arkynox.com</li>
                            <li className="flex items-center gap-2"><ClockIcon size={16} className="text-blue-500" /><strong>Response Time:</strong> Within 48 hours</li>
                            <li className="flex items-center gap-2"><PhoneIcon size={16} className="text-blue-500" /><strong>Phone:</strong> +1-555-PRIVACY (Mon-Fri, 9AM-6PM EST)</li>
                            <li className="flex items-center gap-2"><FileTextIcon size={16} className="text-blue-500" /><strong>Support Ticket:</strong> Use category &ldquo;Privacy Request&rdquo;</li>
                        </ul>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50/50 border border-purple-200 rounded-xl p-6 shadow-sm">
                        <h3 className="font-bold text-purple-800 mb-4 flex items-center gap-2">
                            <ShieldIcon size={18} className="text-purple-500" />
                            Data Protection Officer
                        </h3>
                        <ul className="text-sm text-purple-700 space-y-2">
                            <li className="flex items-center gap-2"><MailIcon size={16} className="text-purple-500" /><strong>Email:</strong> dpo@arkynox.com</li>
                            <li className="flex items-center gap-2"><FileTextIcon size={16} className="text-purple-500" /><strong>Mail:</strong> Arkynox Data Protection Officer</li>
                            <li className="flex items-center gap-2"><GlobeIcon size={16} className="text-purple-500" /><strong>Secure Portal:</strong> Available in account settings</li>
                        </ul>
                    </div>
                </div>

                <div className="not-prose bg-gradient-to-br from-gray-50 to-slate-50/50 border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
                    <h3 className="font-bold text-gray-800 mb-4">Regulatory Contacts by Region</h3>
                    <p className="text-sm text-gray-500 mb-4">
                        If you believe we have not adequately addressed your privacy concerns, you have the
                        right to lodge a complaint with the relevant supervisory authority in your jurisdiction:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                        <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm"><GlobeIcon size={14} className="inline mr-1.5 text-gray-400" /><strong>EU/EEA (GDPR):</strong><br />Your local Data Protection Authority</div>
                        <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm"><GlobeIcon size={14} className="inline mr-1.5 text-gray-400" /><strong>UK (UK GDPR):</strong><br />Information Commissioner&rsquo;s Office (ICO)</div>
                        <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm"><GlobeIcon size={14} className="inline mr-1.5 text-gray-400" /><strong>India (DPDP Act):</strong><br />Data Protection Board of India</div>
                        <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm"><GlobeIcon size={14} className="inline mr-1.5 text-gray-400" /><strong>Brazil (LGPD):</strong><br />Autoridade Nacional (ANPD)</div>
                        <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm"><GlobeIcon size={14} className="inline mr-1.5 text-gray-400" /><strong>US (CCPA/COPPA):</strong><br />California Attorney General / FTC</div>
                        <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm"><GlobeIcon size={14} className="inline mr-1.5 text-gray-400" /><strong>South Africa (POPIA):</strong><br />Information Regulator</div>
                        <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm"><GlobeIcon size={14} className="inline mr-1.5 text-gray-400" /><strong>Japan (APPI):</strong><br />Personal Information Protection Commission (PPC)</div>
                        <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm"><GlobeIcon size={14} className="inline mr-1.5 text-gray-400" /><strong>Russia (152-FZ):</strong><br />Roskomnadzor</div>
                        <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm"><GlobeIcon size={14} className="inline mr-1.5 text-gray-400" /><strong>Turkey (KVKK):</strong><br />Kisisel Verileri Koruma Kurumu</div>
                        <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm"><GlobeIcon size={14} className="inline mr-1.5 text-gray-400" /><strong>South Korea (PIPA):</strong><br />Personal Information Protection Commission (PIPC)</div>
                        <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm"><GlobeIcon size={14} className="inline mr-1.5 text-gray-400" /><strong>Australia:</strong><br />Office of the Australian Information Commissioner (OAIC)</div>
                        <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm"><GlobeIcon size={14} className="inline mr-1.5 text-gray-400" /><strong>Nigeria:</strong><br />Nigeria Data Protection Commission (NDPC)</div>
                        <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm"><GlobeIcon size={14} className="inline mr-1.5 text-gray-400" /><strong>Kenya:</strong><br />Office of Data Protection Commissioner (ODPC)</div>
                        <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm"><GlobeIcon size={14} className="inline mr-1.5 text-gray-400" /><strong>Thailand (PDPA):</strong><br />Personal Data Protection Committee (PDPC)</div>
                        <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm"><GlobeIcon size={14} className="inline mr-1.5 text-gray-400" /><strong>Philippines:</strong><br />National Privacy Commission (NPC)</div>
                    </div>
                </div>

                <div className="not-prose bg-gradient-to-br from-green-50 to-emerald-50/50 border-2 border-green-200 rounded-xl p-5 shadow-sm">
                    <div className="flex items-start gap-3">
                        <BellIcon size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-green-800">
                            <strong>Quick Help:</strong> For urgent privacy concerns or suspected data breaches,
                            call our Privacy Hotline at +1-555-URGENT or create a &ldquo;Privacy Emergency&rdquo; ticket
                            for immediate attention.
                        </p>
                    </div>
                </div>
            </section>
        </PolicyLayout>
    );
}
