'use client';

import PolicyLayout from '@/components/policy/PolicyLayout';
import {
    ShieldIcon, CheckIcon, XIcon, AlertTriangleIcon,
    ScaleIcon, GlobeIcon, AlertCircleIcon, InfoIcon,
    MailIcon, SearchIcon, LockIcon, UploadIcon,
    DownloadIcon, FileTextIcon, UsersIcon, EyeIcon,
    ClockIcon, ArrowRightIcon, BookIcon, FlagIcon,
    FileIcon, ImageIcon, VideoIcon, FolderIcon,
    MessageCircleIcon, BellIcon, CreditCardIcon
} from '@/components/policy/Icons';

const SeverityDot = ({ color }: { color: string }) => (
    <span className={`inline-block w-2.5 h-2.5 rounded-full ${color} flex-shrink-0 mt-0.5`} />
);

export default function AcceptableUsePolicy() {
    return (
        <PolicyLayout
            title="Acceptable Use Policy"
            links={[
                { href: '/policy/terms-and-condition', label: 'Terms & Conditions' },
                { href: '/policy/privacy-policy', label: 'Privacy Policy' },
                { href: '/dashboard', label: 'Return to Dashboard' },
            ]}
        >
            {/* Quick Summary */}
            <div className="not-prose bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 border border-purple-200/60 rounded-2xl p-6 sm:p-8 mb-10 shadow-sm">
                <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 shadow-md shadow-purple-200 flex items-center justify-center">
                        <ShieldIcon size={24} className="text-white" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-purple-900">Quick Summary</h3>
                        <p className="text-sm text-purple-600 font-medium">What is okay and what is not okay when using our support system</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="bg-white/90 backdrop-blur rounded-xl p-4 border border-green-200 shadow-sm">
                        <div className="flex items-center gap-2 font-semibold text-green-800 mb-2">
                            <CheckIcon size={16} className="text-green-600" />
                            <span>Allowed</span>
                        </div>
                        <ul className="text-green-700 space-y-0.5">
                            <li className="flex items-start gap-2"><CheckIcon size={14} className="text-green-500 mt-0.5 flex-shrink-0" />Submit real support requests</li>
                            <li className="flex items-start gap-2"><CheckIcon size={14} className="text-green-500 mt-0.5 flex-shrink-0" />Upload relevant files for troubleshooting</li>
                            <li className="flex items-start gap-2"><CheckIcon size={14} className="text-green-500 mt-0.5 flex-shrink-0" />Communicate professionally</li>
                            <li className="flex items-start gap-2"><CheckIcon size={14} className="text-green-500 mt-0.5 flex-shrink-0" />Report bugs & security issues responsibly</li>
                            <li className="flex items-start gap-2"><CheckIcon size={14} className="text-green-500 mt-0.5 flex-shrink-0" />Give constructive feedback</li>
                        </ul>
                    </div>
                    <div className="bg-white/90 backdrop-blur rounded-xl p-4 border border-red-200 shadow-sm">
                        <div className="flex items-center gap-2 font-semibold text-red-800 mb-2">
                            <XIcon size={16} className="text-red-600" />
                            <span>Not Allowed</span>
                        </div>
                        <ul className="text-red-700 space-y-0.5">
                            <li className="flex items-start gap-2"><XIcon size={14} className="text-red-500 mt-0.5 flex-shrink-0" />Illegal activities, fraud, hacking</li>
                            <li className="flex items-start gap-2"><XIcon size={14} className="text-red-500 mt-0.5 flex-shrink-0" />Harassment, threats, hate speech</li>
                            <li className="flex items-start gap-2"><XIcon size={14} className="text-red-500 mt-0.5 flex-shrink-0" />Malware, viruses, malicious code</li>
                            <li className="flex items-start gap-2"><XIcon size={14} className="text-red-500 mt-0.5 flex-shrink-0" />Spam, fake tickets, account sharing</li>
                            <li className="flex items-start gap-2"><XIcon size={14} className="text-red-500 mt-0.5 flex-shrink-0" />Uploading copyrighted/inappropriate content</li>
                        </ul>
                    </div>
                    <div className="bg-white/90 backdrop-blur rounded-xl p-4 border border-orange-200 shadow-sm">
                        <div className="flex items-center gap-2 font-semibold text-orange-800 mb-2">
                            <AlertTriangleIcon size={16} className="text-orange-600" />
                            <span>What Happens If You Violate</span>
                        </div>
                        <div className="space-y-1 text-orange-700">
                            <div className="flex items-center gap-2">
                                <SeverityDot color="bg-green-500" />
                                <span>Minor: Warning</span>
                                <SeverityDot color="bg-yellow-500" />
                                <span>Moderate: Suspension</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <SeverityDot color="bg-red-500" />
                                <span>Severe: Account terminated</span>
                                <SeverityDot color="bg-gray-800" />
                                <span>Critical: Legal action</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white/90 backdrop-blur rounded-xl p-4 border border-blue-200 shadow-sm">
                        <div className="flex items-center gap-2 font-semibold text-blue-800 mb-2">
                            <ScaleIcon size={16} className="text-blue-600" />
                            <span>Legal Consequences</span>
                        </div>
                        <p className="text-blue-700">Violations may lead to prosecution under cybercrime laws in 25+ countries (including India IT Act, US CFAA, EU Cybercrime Directive, UK Computer Misuse Act). We cooperate with law enforcement worldwide.</p>
                    </div>
                </div>
                <div className="mt-4 text-xs text-purple-500 text-center font-medium bg-purple-50/50 rounded-lg py-2">
                    This summary is for understanding. The full AUP below is the legally binding document.
                </div>
            </div>

            <section className="mb-10">
                <h2>1. Purpose and Scope</h2>
                <p>
                    This Acceptable Use Policy (&ldquo;AUP&rdquo;) governs the use of ArkyDesk support system and
                    related services provided by Arkynox. This policy is designed to protect Arkynox, our
                    customers, and the internet community from irresponsible or illegal activities.
                </p>
                <p>
                    By using our services, you agree to comply with this AUP and our Terms of Service.
                    Violations may result in service suspension or termination.
                </p>
            </section>

            <section className="mb-10">
                <h2>2. Permitted Uses</h2>

                <div className="not-prose bg-gradient-to-br from-green-50 to-emerald-50/50 border border-green-200 rounded-xl p-6 shadow-sm mb-6">
                    <h3 className="text-lg font-bold text-green-800 mb-4 flex items-center gap-2">
                        <CheckIcon size={20} className="text-green-600" />
                        Acceptable Activities
                    </h3>
                    <ul className="text-sm text-gray-600 space-y-2">
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-green-500 mt-0.5 flex-shrink-0" />Submit legitimate support requests and technical issues</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-green-500 mt-0.5 flex-shrink-0" />Communicate professionally with support staff</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-green-500 mt-0.5 flex-shrink-0" />Share relevant files and information for troubleshooting</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-green-500 mt-0.5 flex-shrink-0" />Access knowledge base and self-help resources</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-green-500 mt-0.5 flex-shrink-0" />Provide constructive feedback and suggestions</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-green-500 mt-0.5 flex-shrink-0" />Report bugs and security vulnerabilities responsibly</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-green-500 mt-0.5 flex-shrink-0" />Use the system for its intended business purposes</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-green-500 mt-0.5 flex-shrink-0" />Follow up on ticket status and updates</li>
                    </ul>
                </div>
            </section>

            <section className="mb-10">
                <h2>3. Prohibited Activities</h2>

                <div className="not-prose bg-gradient-to-br from-red-50 to-rose-50/50 border border-red-200 rounded-xl p-6 shadow-sm mb-6">
                    <h3 className="text-lg font-bold text-red-800 mb-2 flex items-center gap-2">
                        <XIcon size={20} className="text-red-600" />
                        Strictly Forbidden
                    </h3>
                    <p className="text-sm text-gray-600">The following activities are strictly prohibited:</p>
                </div>

                <h3>3.1 Illegal Activities</h3>
                <ul>
                    <li>Any activity that violates local, state, federal, or international laws</li>
                    <li>Copyright infringement or intellectual property violations</li>
                    <li>Fraud, identity theft, or financial crimes</li>
                    <li>Distribution of illegal content or materials</li>
                    <li>Money laundering or terrorist financing</li>
                </ul>

                <h3>3.2 Security Violations</h3>
                <ul>
                    <li>Attempting to gain unauthorized access to systems or accounts</li>
                    <li>Distributing viruses, malware, or malicious code</li>
                    <li>Port scanning, vulnerability scanning, or penetration testing</li>
                    <li>Password cracking or brute force attacks</li>
                    <li>Social engineering or phishing attempts</li>
                    <li>Bypassing security measures or access controls</li>
                </ul>

                <h3>3.3 Abuse and Harassment</h3>
                <ul>
                    <li>Harassment, threats, or intimidation of staff or other users</li>
                    <li>Hate speech, discriminatory language, or offensive content</li>
                    <li>Bullying, stalking, or persistent unwanted contact</li>
                    <li>Impersonation of other individuals or organizations</li>
                    <li>Defamatory, libelous, or slanderous statements</li>
                </ul>

                <h3>3.4 System Abuse</h3>
                <ul>
                    <li>Submitting false, misleading, or spam tickets</li>
                    <li>Excessive use of system resources or bandwidth</li>
                    <li>Automated ticket creation or system interactions</li>
                    <li>Reverse engineering or attempting to access source code</li>
                    <li>Creating multiple accounts to circumvent restrictions</li>
                    <li>Sharing account credentials with unauthorized persons</li>
                </ul>

                <h3>3.5 Content Violations</h3>
                <ul>
                    <li>Uploading inappropriate, offensive, or explicit content</li>
                    <li>Sharing confidential information of third parties</li>
                    <li>Distribution of spam, advertisements, or promotional content</li>
                    <li>Posting content that violates privacy rights</li>
                    <li>Sharing trade secrets or proprietary information without authorization</li>
                </ul>
            </section>

            <section className="mb-10">
                <h2>4. File Upload Guidelines</h2>

                <h3>4.1 Acceptable File Types</h3>
                <div className="not-prose bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-200 rounded-xl p-6 shadow-sm mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <p className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                <FileTextIcon size={18} className="text-blue-500" />
                                Documents
                            </p>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li className="flex items-center gap-2"><FileIcon size={14} className="text-gray-400" />PDF, DOC, DOCX, TXT</li>
                                <li className="flex items-center gap-2"><FileIcon size={14} className="text-gray-400" />XLS, XLSX, CSV</li>
                                <li className="flex items-center gap-2"><FileIcon size={14} className="text-gray-400" />PPT, PPTX</li>
                            </ul>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                <ImageIcon size={18} className="text-blue-500" />
                                Media
                            </p>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li className="flex items-center gap-2"><ImageIcon size={14} className="text-gray-400" />JPG, PNG, GIF (screenshots)</li>
                                <li className="flex items-center gap-2"><VideoIcon size={14} className="text-gray-400" />MP4, AVI (screen recordings)</li>
                                <li className="flex items-center gap-2"><FolderIcon size={14} className="text-gray-400" />ZIP, RAR (compressed files)</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <h3>4.2 File Size Limits</h3>
                <ul>
                    <li><strong>Individual File:</strong> Maximum 25 MB per file</li>
                    <li><strong>Total Attachments:</strong> Maximum 100 MB per ticket</li>
                    <li><strong>File Count:</strong> Maximum 10 files per ticket</li>
                    <li><strong>Storage Quota:</strong> 1 GB total per user account</li>
                </ul>

                <h3>4.3 Prohibited File Content</h3>
                <div className="not-prose bg-gradient-to-br from-red-50 to-rose-50/50 border border-red-200 rounded-xl p-6 shadow-sm">
                    <ul className="text-sm text-gray-600 space-y-1.5">
                        <li className="flex items-start gap-2"><XIcon size={14} className="text-red-500 mt-0.5 flex-shrink-0" />Executable files (.exe, .bat, .cmd, .scr)</li>
                        <li className="flex items-start gap-2"><XIcon size={14} className="text-red-500 mt-0.5 flex-shrink-0" />Scripts and code files (.js, .vbs, .ps1) unless specifically requested</li>
                        <li className="flex items-start gap-2"><XIcon size={14} className="text-red-500 mt-0.5 flex-shrink-0" />Files containing malware, viruses, or malicious code</li>
                        <li className="flex items-start gap-2"><XIcon size={14} className="text-red-500 mt-0.5 flex-shrink-0" />Copyrighted content without permission</li>
                        <li className="flex items-start gap-2"><XIcon size={14} className="text-red-500 mt-0.5 flex-shrink-0" />Personal information of third parties</li>
                        <li className="flex items-start gap-2"><XIcon size={14} className="text-red-500 mt-0.5 flex-shrink-0" />Encrypted or password-protected files without providing access</li>
                    </ul>
                </div>
            </section>

            <section className="mb-10">
                <h2>5. Communication Standards</h2>

                <h3>5.1 Professional Communication</h3>
                <div className="not-prose bg-gradient-to-br from-green-50 to-emerald-50/50 border border-green-200 rounded-xl p-6 shadow-sm mb-6">
                    <ul className="text-sm text-gray-600 space-y-2">
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-green-500 mt-0.5 flex-shrink-0" /><strong>Be Clear:</strong> Provide detailed, specific descriptions of issues</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-green-500 mt-0.5 flex-shrink-0" /><strong>Be Respectful:</strong> Use professional and courteous language</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-green-500 mt-0.5 flex-shrink-0" /><strong>Be Patient:</strong> Allow reasonable time for responses</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-green-500 mt-0.5 flex-shrink-0" /><strong>Be Accurate:</strong> Provide truthful and complete information</li>
                        <li className="flex items-start gap-2"><CheckIcon size={14} className="text-green-500 mt-0.5 flex-shrink-0" /><strong>Be Constructive:</strong> Focus on problem-solving</li>
                    </ul>
                </div>

                <h3>5.2 Response Expectations</h3>
                <ul>
                    <li><strong>Business Hours:</strong> Monday-Friday, 9 AM - 6 PM (local time)</li>
                    <li><strong>Response Times:</strong> As outlined in our Service Level Agreement</li>
                    <li><strong>Follow-up:</strong> Reasonable follow-up is acceptable after response time</li>
                    <li><strong>Escalation:</strong> Use proper escalation procedures if needed</li>
                </ul>

                <h3>5.3 Communication Violations</h3>
                <div className="not-prose bg-gradient-to-br from-red-50 to-rose-50/50 border border-red-200 rounded-xl p-6 shadow-sm">
                    <p className="text-sm text-gray-700 mb-3"><strong>The following communication behaviors are prohibited:</strong></p>
                    <ul className="text-sm text-gray-600 space-y-1.5">
                        <li className="flex items-start gap-2"><XIcon size={14} className="text-red-500 mt-0.5 flex-shrink-0" />Abusive, threatening, or disrespectful language</li>
                        <li className="flex items-start gap-2"><XIcon size={14} className="text-red-500 mt-0.5 flex-shrink-0" />Excessive or repetitive messaging (spam)</li>
                        <li className="flex items-start gap-2"><XIcon size={14} className="text-red-500 mt-0.5 flex-shrink-0" />Inappropriate personal comments or topics</li>
                        <li className="flex items-start gap-2"><XIcon size={14} className="text-red-500 mt-0.5 flex-shrink-0" />Attempts to manipulate or pressure staff</li>
                        <li className="flex items-start gap-2"><XIcon size={14} className="text-red-500 mt-0.5 flex-shrink-0" />False or misleading information</li>
                        <li className="flex items-start gap-2"><XIcon size={14} className="text-red-500 mt-0.5 flex-shrink-0" />Off-topic discussions unrelated to support</li>
                    </ul>
                </div>
            </section>

            <section className="mb-10">
                <h2>6. Privacy and Confidentiality</h2>

                <h3>6.1 Information Protection</h3>
                <ul>
                    <li><strong>Your Information:</strong> We protect your data according to our Privacy Policy</li>
                    <li><strong>Third-Party Information:</strong> Do not share others&rsquo; confidential information</li>
                    <li><strong>Company Information:</strong> Do not request or attempt to access unauthorized information</li>
                    <li><strong>Support Information:</strong> Support conversations are confidential</li>
                </ul>

                <h3>6.2 Data Sensitivity</h3>
                <div className="not-prose bg-gradient-to-br from-yellow-50 to-amber-50/50 border border-yellow-200 rounded-xl p-6 shadow-sm">
                    <p className="text-sm text-gray-700 mb-3 flex items-center gap-2">
                        <AlertTriangleIcon size={16} className="text-yellow-500" />
                        <strong>Exercise caution when sharing:</strong>
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1.5">
                        <li className="flex items-start gap-2"><LockIcon size={14} className="text-yellow-500 mt-0.5 flex-shrink-0" />Passwords, API keys, or authentication tokens</li>
                        <li className="flex items-start gap-2"><EyeIcon size={14} className="text-yellow-500 mt-0.5 flex-shrink-0" />Personal information of customers or employees</li>
                        <li className="flex items-start gap-2"><CreditCardIcon size={14} className="text-yellow-500 mt-0.5 flex-shrink-0" />Financial or payment information</li>
                        <li className="flex items-start gap-2"><FileTextIcon size={14} className="text-yellow-500 mt-0.5 flex-shrink-0" />Trade secrets or proprietary business information</li>
                        <li className="flex items-start gap-2"><ScaleIcon size={14} className="text-yellow-500 mt-0.5 flex-shrink-0" />Legal or compliance-related documents</li>
                    </ul>
                </div>
            </section>

            <section className="mb-10">
                <h2>7. Monitoring and Enforcement</h2>

                <h3>7.1 Monitoring Activities</h3>
                <p>
                    Arkynox reserves the right to monitor use of our services to ensure compliance with
                    this AUP. Monitoring may include:
                </p>
                <ul>
                    <li>Automated scanning for prohibited content</li>
                    <li>Review of reported violations</li>
                    <li>Investigation of suspicious activities</li>
                    <li>Analysis of usage patterns and system performance</li>
                </ul>

                <h3>7.2 Violation Reporting</h3>
                <div className="not-prose bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-200 rounded-xl p-6 shadow-sm mb-6">
                    <p className="text-sm text-gray-700 mb-3"><strong>Report violations to:</strong></p>
                    <ul className="text-sm text-gray-600 space-y-1">
                        <li className="flex items-center gap-2"><MailIcon size={16} className="text-blue-500" /><strong>Email:</strong> abuse@arkynox.com</li>
                        <li className="flex items-center gap-2"><FileTextIcon size={16} className="text-blue-500" /><strong>Subject Line:</strong> &ldquo;AUP Violation Report&rdquo;</li>
                        <li className="flex items-center gap-2"><SearchIcon size={16} className="text-blue-500" /><strong>Include:</strong> Details, evidence, and affected parties</li>
                    </ul>
                </div>

                <h3>7.3 Investigation Process</h3>
                <ol>
                    <li>Receipt and acknowledgment of violation report</li>
                    <li>Initial assessment and evidence gathering</li>
                    <li>Investigation and fact-finding process</li>
                    <li>Determination of violation severity</li>
                    <li>Implementation of appropriate enforcement action</li>
                    <li>Communication of results to affected parties</li>
                </ol>
            </section>

            <section className="mb-10">
                <h2>8. Enforcement Actions</h2>

                <h3>8.1 Progressive Discipline</h3>
                <div className="not-prose overflow-x-auto mb-6">
                    <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                        <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                            <tr>
                                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Violation Level</th>
                                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">First Offense</th>
                                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Repeat Offense</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            <tr className="hover:bg-green-50/30 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-900">Minor</td>
                                <td className="px-6 py-4 text-sm text-gray-600">Warning + Education</td>
                                <td className="px-6 py-4 text-sm text-gray-600">Temporary restrictions</td>
                            </tr>
                            <tr className="hover:bg-yellow-50/30 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-900">Moderate</td>
                                <td className="px-6 py-4 text-sm text-gray-600">Temporary suspension</td>
                                <td className="px-6 py-4 text-sm text-gray-600">Extended suspension</td>
                            </tr>
                            <tr className="hover:bg-orange-50/30 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-900">Severe</td>
                                <td className="px-6 py-4 text-sm text-gray-600">Account suspension</td>
                                <td className="px-6 py-4 text-sm text-gray-600">Account termination</td>
                            </tr>
                            <tr className="hover:bg-red-50/30 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-900">Critical</td>
                                <td className="px-6 py-4 text-sm text-gray-600">Immediate termination</td>
                                <td className="px-6 py-4 text-sm text-gray-600">Legal action</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3>8.2 Emergency Actions</h3>
                <p>
                    For violations that pose immediate risk to security, safety, or legal compliance,
                    Arkynox may take immediate action including:
                </p>
                <ul>
                    <li>Immediate account suspension or termination</li>
                    <li>Content removal or quarantine</li>
                    <li>System access restrictions</li>
                    <li>Law enforcement notification</li>
                    <li>Legal proceedings initiation</li>
                </ul>

                <h3>8.3 Appeal Process</h3>
                <div className="not-prose bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-200 rounded-xl p-6 shadow-sm">
                    <p className="text-sm text-gray-700 mb-3"><strong>To appeal an enforcement action:</strong></p>
                    <ol className="text-sm text-gray-600 space-y-1">
                        <li>Submit appeal within 30 days of action</li>
                        <li>Provide detailed explanation and evidence</li>
                        <li>Appeal reviewed by senior management</li>
                        <li>Decision communicated within 15 business days</li>
                    </ol>
                </div>
            </section>

            <section className="mb-10">
                <h2>9. Legal Consequences</h2>

                <div className="not-prose bg-gradient-to-br from-red-50 to-rose-50/50 border border-red-200 rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-red-800 mb-4 flex items-center gap-2">
                        <ScaleIcon size={20} className="text-red-600" />
                        Legal Action
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Serious violations of this AUP may result in civil or criminal legal action.
                        Arkynox will cooperate with law enforcement agencies in investigating violations
                        that may constitute criminal activity.
                    </p>
                    <p className="text-sm text-gray-600">
                        Users may be held liable for damages resulting from their violations, including
                        attorney fees, court costs, and other expenses incurred by Arkynox.
                    </p>
                </div>
            </section>

            <section className="mb-10">
                <h2>10. Applicable Cybercrime Laws by Jurisdiction</h2>
                <p>
                    Violations of this Acceptable Use Policy may also constitute violations of cybercrime and
                    computer misuse laws in multiple jurisdictions. We cooperate with law enforcement worldwide.
                    Below are key laws applicable to prohibited activities:
                </p>

                <div className="not-prose overflow-x-auto mb-6">
                    <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-xl overflow-hidden text-sm shadow-sm">
                        <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                            <tr>
                                <th className="px-4 py-3.5 text-left font-semibold text-gray-700">Country</th>
                                <th className="px-4 py-3.5 text-left font-semibold text-gray-700">Key Cybercrime Laws</th>
                                <th className="px-4 py-3.5 text-left font-semibold text-gray-700">Scope</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-4 py-3 font-medium">International</td><td className="px-4 py-3">Budapest Convention on Cybercrime</td><td className="px-4 py-3 text-xs">Council of Europe treaty (ratified by 60+ countries including US, Japan, EU members, South Africa, Sri Lanka)</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-4 py-3 font-medium">EU</td><td className="px-4 py-3">Directive 2013/40/EU (Cybercrime Directive)</td><td className="px-4 py-3 text-xs">Illegal access, system interference, data interference, interception</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-4 py-3 font-medium">United States</td><td className="px-4 py-3">CFAA (Computer Fraud and Abuse Act), ECPA, CAN-SPAM Act</td><td className="px-4 py-3 text-xs">Unauthorized access, computer fraud, wiretapping, spam</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-4 py-3 font-medium">United Kingdom</td><td className="px-4 py-3">Computer Misuse Act 1990, Fraud Act 2006</td><td className="px-4 py-3 text-xs">Unauthorized access, modification, making/supplying tools for hacking</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-4 py-3 font-medium">India</td><td className="px-4 py-3">IT Act 2000 (amended 2008) &mdash; Sections 43, 66, 66C-66F</td><td className="px-4 py-3 text-xs">Hacking, identity theft, cyber fraud, cyberstalking, phishing, child pornography</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-4 py-3 font-medium">Brazil</td><td className="px-4 py-3">Lei 12.737/2012 (Carolina Dieckmann Law), Lei 12.965/2014 (Marco Civil)</td><td className="px-4 py-3 text-xs">Invasion of devices, unauthorized access, data breach</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-4 py-3 font-medium">Japan</td><td className="px-4 py-3">Unauthorized Computer Access Law (Act No. 128 of 1999)</td><td className="px-4 py-3 text-xs">Unauthorized access, hacking tools possession</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-4 py-3 font-medium">Russia</td><td className="px-4 py-3">Criminal Code Chapter 28 (Arts. 272-274)</td><td className="px-4 py-3 text-xs">Unauthorized access, malicious software, data interference</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-4 py-3 font-medium">Germany</td><td className="px-4 py-3">German Criminal Code (StGB) &sect;&sect; 202a-202d, 303a-303c</td><td className="px-4 py-3 text-xs">Data espionage, hacking, computer sabotage, data suppression</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-4 py-3 font-medium">France</td><td className="px-4 py-3">French Penal Code Arts. 323-1 to 323-8</td><td className="px-4 py-3 text-xs">Unauthorized access, interference with automated systems</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-4 py-3 font-medium">Spain</td><td className="px-4 py-3">Spanish Penal Code Arts. 197-201, 264-270</td><td className="px-4 py-3 text-xs">Data discovery, computer damage, hacking</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-4 py-3 font-medium">Netherlands</td><td className="px-4 py-3">Dutch Criminal Code Arts. 138ab-138d, 161sexies, 350a-350d</td><td className="px-4 py-3 text-xs">Computer trespass, hacking tools, data breach</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-4 py-3 font-medium">Australia</td><td className="px-4 py-3">Criminal Code Act 1995 (Cth) Div 477-478</td><td className="px-4 py-3 text-xs">Unauthorized access, modification, impairment of electronic communications</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-4 py-3 font-medium">South Africa</td><td className="px-4 py-3">Cybercrimes Act 19 of 2020</td><td className="px-4 py-3 text-xs">Hacking, ransomware, data interference, cyber fraud, malicious communications</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-4 py-3 font-medium">Nigeria</td><td className="px-4 py-3">Cybercrimes (Prohibition, Prevention, etc.) Act 2015</td><td className="px-4 py-3 text-xs">Hacking, identity theft, cyberstalking, child pornography, phishing</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-4 py-3 font-medium">Kenya</td><td className="px-4 py-3">Computer Misuse and Cybercrimes Act No. 5 of 2018</td><td className="px-4 py-3 text-xs">Unauthorized access, cyber espionage, cyber harassment, identity theft</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-4 py-3 font-medium">Turkey</td><td className="px-4 py-3">Turkish Penal Code Arts. 243-246 (Cybercrime provisions)</td><td className="px-4 py-3 text-xs">Hacking, data destruction, blocking access, misuse of systems</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-4 py-3 font-medium">Indonesia</td><td className="px-4 py-3">Law No. 11/2008 (ITE Law, amended 2016)</td><td className="px-4 py-3 text-xs">Unauthorized access, electronic fraud, defamation, hate speech</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-4 py-3 font-medium">Thailand</td><td className="px-4 py-3">Computer Crime Act B.E. 2550 (2007, amended 2017)</td><td className="px-4 py-3 text-xs">Unauthorized access, data interference, computer-related fraud</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-4 py-3 font-medium">Philippines</td><td className="px-4 py-3">Cybercrime Prevention Act of 2012 (RA 10175)</td><td className="px-4 py-3 text-xs">Hacking, identity theft, cybersquatting, child pornography, libel</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-4 py-3 font-medium">South Korea</td><td className="px-4 py-3">Act on Promotion of Information and Communications Network Utilization</td><td className="px-4 py-3 text-xs">Hacking, spam, personal information breach, defamation</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-4 py-3 font-medium">Sri Lanka</td><td className="px-4 py-3">Computer Crimes Act No. 24 of 2007</td><td className="px-4 py-3 text-xs">Unauthorized access, data interference, device misuse</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-4 py-3 font-medium">Kazakhstan</td><td className="px-4 py-3">Criminal Code Arts. 205-211 (cybercrime provisions)</td><td className="px-4 py-3 text-xs">Hacking, data theft, illegal access to information systems</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-4 py-3 font-medium">Yemen</td><td className="px-4 py-3">Cybercrime Law No. 5 of 2015</td><td className="px-4 py-3 text-xs">Hacking, fraud, copyright infringement, system interference</td></tr>
                            <tr className="hover:bg-gray-50/30 transition-colors"><td className="px-4 py-3 font-medium">Iran</td><td className="px-4 py-3">Computer Crimes Law (ratified 2009)</td><td className="px-4 py-3 text-xs">Hacking, data theft, system disruption, cyber fraud</td></tr>
                        </tbody>
                    </table>
                </div>

                <div className="not-prose bg-gradient-to-br from-red-50 to-rose-50/50 border border-red-200 rounded-xl p-5 shadow-sm">
                    <div className="flex items-start gap-3">
                        <AlertTriangleIcon size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-red-800">
                            <strong>Important:</strong> If you engage in any activity prohibited under Section 3 of this
                            policy, you may be subject to criminal prosecution under one or more of the above laws.
                            We will fully cooperate with law enforcement authorities in investigating such violations.
                        </p>
                    </div>
                </div>
            </section>

            <section className="mb-10">
                <h2>11. Policy Updates</h2>
                <p>
                    This AUP may be updated periodically to address new technologies, threats, or
                    regulatory requirements. Users will be notified of material changes, and continued
                    use of the service constitutes acceptance of the updated policy.
                </p>
            </section>

            <section className="mb-10">
                <h2>12. Contact Information</h2>
                <div className="not-prose bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-200 rounded-xl p-6 shadow-sm">
                    <p className="text-sm text-gray-600 mb-4">
                        For questions about this Acceptable Use Policy:
                    </p>
                    <ul className="text-sm text-gray-600 space-y-2">
                        <li className="flex items-center gap-2"><MailIcon size={16} className="text-blue-500" /><strong>Policy Questions:</strong> policy@arkynox.com</li>
                        <li className="flex items-center gap-2"><AlertTriangleIcon size={16} className="text-blue-500" /><strong>Violation Reports:</strong> abuse@arkynox.com</li>
                        <li className="flex items-center gap-2"><ShieldIcon size={16} className="text-blue-500" /><strong>Appeals:</strong> appeals@arkynox.com</li>
                        <li className="flex items-center gap-2"><ScaleIcon size={16} className="text-blue-500" /><strong>Legal Team:</strong> legal@arkynox.com</li>
                    </ul>
                </div>
            </section>
        </PolicyLayout>
    );
}
