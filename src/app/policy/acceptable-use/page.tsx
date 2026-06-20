'use client';

import { useEffect } from 'react';

export default function AcceptableUsePolicy() {
    useEffect(() => {
        document.title = 'Acceptable Use Policy - Arkynox Support';
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="text-center mb-8">
                        <img src="/logo/logo.png" alt="Arkynox Logo" className="h-16 mx-auto mb-4" />
                        <h1 className="text-3xl font-bold text-gray-900">Acceptable Use Policy</h1>
                        <p className="text-gray-600 mt-2">Effective Date: June 20, 2026</p>
                    </div>

                    <div className="prose max-w-none">
                        {/* Quick Summary - Plain Language */}
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6 mb-8">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-purple-100 rounded-full p-2">
                                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-purple-900">Quick Summary (Plain English) ✅</h3>
                                    <p className="text-sm text-purple-700">What's okay and what's not okay when using our support system</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div className="bg-white/80 rounded-lg p-3 border border-green-200">
                                    <div className="font-semibold text-green-800 mb-1">✅ Do's — Allowed</div>
                                    <ul className="text-green-700 space-y-0.5">
                                        <li>✓ Submit real support requests</li>
                                        <li>✓ Upload relevant files for troubleshooting</li>
                                        <li>✓ Communicate professionally</li>
                                        <li>✓ Report bugs & security issues responsibly</li>
                                        <li>✓ Give constructive feedback</li>
                                    </ul>
                                </div>
                                <div className="bg-white/80 rounded-lg p-3 border border-red-200">
                                    <div className="font-semibold text-red-800 mb-1">❌ Don'ts — Not Allowed</div>
                                    <ul className="text-red-700 space-y-0.5">
                                        <li>✗ Illegal activities, fraud, hacking</li>
                                        <li>✗ Harassment, threats, hate speech</li>
                                        <li>✗ Malware, viruses, malicious code</li>
                                        <li>✗ Spam, fake tickets, account sharing</li>
                                        <li>✗ Uploading copyrighted/inappropriate content</li>
                                    </ul>
                                </div>
                                <div className="bg-white/80 rounded-lg p-3 border border-orange-200">
                                    <div className="font-semibold text-orange-800 mb-1">⚠️ What Happens If You Violate</div>
                                    <div className="flex items-center gap-1 text-orange-700">
                                        <span className="text-lg">🟢</span> Minor: Warning
                                        <span className="text-lg ml-2">🟡</span> Moderate: Suspension
                                    </div>
                                    <div className="flex items-center gap-1 text-orange-700">
                                        <span className="text-lg">🔴</span> Severe: Account terminated
                                        <span className="text-lg ml-2">⚫</span> Critical: Legal action
                                    </div>
                                </div>
                                <div className="bg-white/80 rounded-lg p-3 border border-blue-200">
                                    <div className="font-semibold text-blue-800 mb-1">⚖️ Legal Consequences</div>
                                    <p className="text-blue-700">Violations may lead to prosecution under cybercrime laws in 25+ countries (including India IT Act, US CFAA, EU Cybercrime Directive, UK Computer Misuse Act). We cooperate with law enforcement worldwide.</p>
                                </div>
                            </div>
                            <div className="mt-3 text-xs text-purple-600 text-center">
                                This summary is for understanding. The full AUP below is the legally binding document.
                            </div>
                        </div>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Purpose and Scope</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                This Acceptable Use Policy ("AUP") governs the use of ArkyDesk support system and 
                                related services provided by Arkynox. This policy is designed to protect Arkynox, our 
                                customers, and the internet community from irresponsible or illegal activities.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                By using our services, you agree to comply with this AUP and our Terms of Service. 
                                Violations may result in service suspension or termination.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Permitted Uses</h2>
                            
                            <div className="bg-green-50 p-6 rounded-lg mb-4">
                                <h3 className="text-xl font-medium text-green-800 mb-3">✓ Acceptable Activities</h3>
                                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                                    <li>Submit legitimate support requests and technical issues</li>
                                    <li>Communicate professionally with support staff</li>
                                    <li>Share relevant files and information for troubleshooting</li>
                                    <li>Access knowledge base and self-help resources</li>
                                    <li>Provide constructive feedback and suggestions</li>
                                    <li>Report bugs and security vulnerabilities responsibly</li>
                                    <li>Use the system for its intended business purposes</li>
                                    <li>Follow up on ticket status and updates</li>
                                </ul>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Prohibited Activities</h2>
                            
                            <div className="bg-red-50 p-6 rounded-lg mb-6">
                                <h3 className="text-xl font-medium text-red-800 mb-3">✗ Strictly Forbidden</h3>
                                <p className="text-gray-700 mb-4">The following activities are strictly prohibited:</p>
                            </div>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">3.1 Illegal Activities</h3>
                            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
                                <li>Any activity that violates local, state, federal, or international laws</li>
                                <li>Copyright infringement or intellectual property violations</li>
                                <li>Fraud, identity theft, or financial crimes</li>
                                <li>Distribution of illegal content or materials</li>
                                <li>Money laundering or terrorist financing</li>
                            </ul>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">3.2 Security Violations</h3>
                            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
                                <li>Attempting to gain unauthorized access to systems or accounts</li>
                                <li>Distributing viruses, malware, or malicious code</li>
                                <li>Port scanning, vulnerability scanning, or penetration testing</li>
                                <li>Password cracking or brute force attacks</li>
                                <li>Social engineering or phishing attempts</li>
                                <li>Bypassing security measures or access controls</li>
                            </ul>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">3.3 Abuse and Harassment</h3>
                            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
                                <li>Harassment, threats, or intimidation of staff or other users</li>
                                <li>Hate speech, discriminatory language, or offensive content</li>
                                <li>Bullying, stalking, or persistent unwanted contact</li>
                                <li>Impersonation of other individuals or organizations</li>
                                <li>Defamatory, libelous, or slanderous statements</li>
                            </ul>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">3.4 System Abuse</h3>
                            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
                                <li>Submitting false, misleading, or spam tickets</li>
                                <li>Excessive use of system resources or bandwidth</li>
                                <li>Automated ticket creation or system interactions</li>
                                <li>Reverse engineering or attempting to access source code</li>
                                <li>Creating multiple accounts to circumvent restrictions</li>
                                <li>Sharing account credentials with unauthorized persons</li>
                            </ul>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">3.5 Content Violations</h3>
                            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
                                <li>Uploading inappropriate, offensive, or explicit content</li>
                                <li>Sharing confidential information of third parties</li>
                                <li>Distribution of spam, advertisements, or promotional content</li>
                                <li>Posting content that violates privacy rights</li>
                                <li>Sharing trade secrets or proprietary information without authorization</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. File Upload Guidelines</h2>
                            
                            <h3 className="text-xl font-medium text-gray-800 mb-3">4.1 Acceptable File Types</h3>
                            <div className="bg-blue-50 p-4 rounded-lg mb-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="font-medium text-gray-800 mb-2">Documents:</p>
                                        <ul className="text-sm text-gray-700 space-y-1">
                                            <li>• PDF, DOC, DOCX, TXT</li>
                                            <li>• XLS, XLSX, CSV</li>
                                            <li>• PPT, PPTX</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-800 mb-2">Media:</p>
                                        <ul className="text-sm text-gray-700 space-y-1">
                                            <li>• JPG, PNG, GIF (screenshots)</li>
                                            <li>• MP4, AVI (screen recordings)</li>
                                            <li>• ZIP, RAR (compressed files)</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">4.2 File Size Limits</h3>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li><strong>Individual File:</strong> Maximum 25 MB per file</li>
                                <li><strong>Total Attachments:</strong> Maximum 100 MB per ticket</li>
                                <li><strong>File Count:</strong> Maximum 10 files per ticket</li>
                                <li><strong>Storage Quota:</strong> 1 GB total per user account</li>
                            </ul>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">4.3 Prohibited File Content</h3>
                            <div className="bg-red-50 p-4 rounded-lg">
                                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                                    <li>Executable files (.exe, .bat, .cmd, .scr)</li>
                                    <li>Scripts and code files (.js, .vbs, .ps1) unless specifically requested</li>
                                    <li>Files containing malware, viruses, or malicious code</li>
                                    <li>Copyrighted content without permission</li>
                                    <li>Personal information of third parties</li>
                                    <li>Encrypted or password-protected files without providing access</li>
                                </ul>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Communication Standards</h2>
                            
                            <h3 className="text-xl font-medium text-gray-800 mb-3">5.1 Professional Communication</h3>
                            <div className="bg-green-50 p-4 rounded-lg mb-4">
                                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                                    <li><strong>Be Clear:</strong> Provide detailed, specific descriptions of issues</li>
                                    <li><strong>Be Respectful:</strong> Use professional and courteous language</li>
                                    <li><strong>Be Patient:</strong> Allow reasonable time for responses</li>
                                    <li><strong>Be Accurate:</strong> Provide truthful and complete information</li>
                                    <li><strong>Be Constructive:</strong> Focus on problem-solving</li>
                                </ul>
                            </div>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">5.2 Response Expectations</h3>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li><strong>Business Hours:</strong> Monday-Friday, 9 AM - 6 PM (local time)</li>
                                <li><strong>Response Times:</strong> As outlined in our Service Level Agreement</li>
                                <li><strong>Follow-up:</strong> Reasonable follow-up is acceptable after response time</li>
                                <li><strong>Escalation:</strong> Use proper escalation procedures if needed</li>
                            </ul>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">5.3 Communication Violations</h3>
                            <div className="bg-red-50 p-4 rounded-lg">
                                <p className="text-gray-700 mb-2"><strong>The following communication behaviors are prohibited:</strong></p>
                                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                                    <li>Abusive, threatening, or disrespectful language</li>
                                    <li>Excessive or repetitive messaging (spam)</li>
                                    <li>Inappropriate personal comments or topics</li>
                                    <li>Attempts to manipulate or pressure staff</li>
                                    <li>False or misleading information</li>
                                    <li>Off-topic discussions unrelated to support</li>
                                </ul>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Privacy and Confidentiality</h2>
                            
                            <h3 className="text-xl font-medium text-gray-800 mb-3">6.1 Information Protection</h3>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li><strong>Your Information:</strong> We protect your data according to our Privacy Policy</li>
                                <li><strong>Third-Party Information:</strong> Do not share others' confidential information</li>
                                <li><strong>Company Information:</strong> Do not request or attempt to access unauthorized information</li>
                                <li><strong>Support Information:</strong> Support conversations are confidential</li>
                            </ul>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">6.2 Data Sensitivity</h3>
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                <p className="text-gray-700 mb-2"><strong>Exercise caution when sharing:</strong></p>
                                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                                    <li>Passwords, API keys, or authentication tokens</li>
                                    <li>Personal information of customers or employees</li>
                                    <li>Financial or payment information</li>
                                    <li>Trade secrets or proprietary business information</li>
                                    <li>Legal or compliance-related documents</li>
                                </ul>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Monitoring and Enforcement</h2>
                            
                            <h3 className="text-xl font-medium text-gray-800 mb-3">7.1 Monitoring Activities</h3>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Arkynox reserves the right to monitor use of our services to ensure compliance with 
                                this AUP. Monitoring may include:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li>Automated scanning for prohibited content</li>
                                <li>Review of reported violations</li>
                                <li>Investigation of suspicious activities</li>
                                <li>Analysis of usage patterns and system performance</li>
                            </ul>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">7.2 Violation Reporting</h3>
                            <div className="bg-blue-50 p-4 rounded-lg mb-4">
                                <p className="text-gray-700 mb-2"><strong>Report violations to:</strong></p>
                                <ul className="text-gray-700 space-y-1">
                                    <li><strong>Email:</strong> abuse@arkynox.com</li>
                                    <li><strong>Subject Line:</strong> "AUP Violation Report"</li>
                                    <li><strong>Include:</strong> Details, evidence, and affected parties</li>
                                </ul>
                            </div>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">7.3 Investigation Process</h3>
                            <ol className="list-decimal pl-6 mb-4 text-gray-700 space-y-2">
                                <li>Receipt and acknowledgment of violation report</li>
                                <li>Initial assessment and evidence gathering</li>
                                <li>Investigation and fact-finding process</li>
                                <li>Determination of violation severity</li>
                                <li>Implementation of appropriate enforcement action</li>
                                <li>Communication of results to affected parties</li>
                            </ol>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Enforcement Actions</h2>
                            
                            <h3 className="text-xl font-medium text-gray-800 mb-3">8.1 Progressive Discipline</h3>
                            <div className="overflow-x-auto mb-4">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Violation Level
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                First Offense
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Repeat Offense
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        <tr>
                                            <td className="px-6 py-4 font-medium text-gray-900">Minor</td>
                                            <td className="px-6 py-4 text-sm text-gray-700">Warning + Education</td>
                                            <td className="px-6 py-4 text-sm text-gray-700">Temporary restrictions</td>
                                        </tr>
                                        <tr className="bg-gray-50">
                                            <td className="px-6 py-4 font-medium text-gray-900">Moderate</td>
                                            <td className="px-6 py-4 text-sm text-gray-700">Temporary suspension</td>
                                            <td className="px-6 py-4 text-sm text-gray-700">Extended suspension</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 font-medium text-gray-900">Severe</td>
                                            <td className="px-6 py-4 text-sm text-gray-700">Account suspension</td>
                                            <td className="px-6 py-4 text-sm text-gray-700">Account termination</td>
                                        </tr>
                                        <tr className="bg-gray-50">
                                            <td className="px-6 py-4 font-medium text-gray-900">Critical</td>
                                            <td className="px-6 py-4 text-sm text-gray-700">Immediate termination</td>
                                            <td className="px-6 py-4 text-sm text-gray-700">Legal action</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">8.2 Emergency Actions</h3>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                For violations that pose immediate risk to security, safety, or legal compliance, 
                                Arkynox may take immediate action including:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li>Immediate account suspension or termination</li>
                                <li>Content removal or quarantine</li>
                                <li>System access restrictions</li>
                                <li>Law enforcement notification</li>
                                <li>Legal proceedings initiation</li>
                            </ul>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">8.3 Appeal Process</h3>
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <p className="text-gray-700 mb-2"><strong>To appeal an enforcement action:</strong></p>
                                <ol className="list-decimal pl-6 text-gray-700 space-y-1">
                                    <li>Submit appeal within 30 days of action</li>
                                    <li>Provide detailed explanation and evidence</li>
                                    <li>Appeal reviewed by senior management</li>
                                    <li>Decision communicated within 15 business days</li>
                                </ol>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Legal Consequences</h2>
                            
                            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                                <h3 className="text-xl font-medium text-red-800 mb-3">⚖️ Legal Action</h3>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Serious violations of this AUP may result in civil or criminal legal action. 
                                    Arkynox will cooperate with law enforcement agencies in investigating violations 
                                    that may constitute criminal activity.
                                </p>
                                <p className="text-gray-700 leading-relaxed">
                                    Users may be held liable for damages resulting from their violations, including 
                                    attorney fees, court costs, and other expenses incurred by Arkynox.
                                </p>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Applicable Cybercrime Laws by Jurisdiction</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Violations of this Acceptable Use Policy may also constitute violations of cybercrime and 
                                computer misuse laws in multiple jurisdictions. We cooperate with law enforcement worldwide. 
                                Below are key laws applicable to prohibited activities:
                            </p>

                            <div className="overflow-x-auto mb-6">
                                <table className="min-w-full divide-y divide-gray-200 text-sm">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left font-semibold text-gray-700">Country</th>
                                            <th className="px-4 py-3 text-left font-semibold text-gray-700">Key Cybercrime Laws</th>
                                            <th className="px-4 py-3 text-left font-semibold text-gray-700">Scope</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        <tr><td className="px-4 py-3 font-medium">🌐 International</td><td className="px-4 py-3">Budapest Convention on Cybercrime</td><td className="px-4 py-3 text-xs">Council of Europe treaty (ratified by 60+ countries including US, Japan, EU members, South Africa, Sri Lanka)</td></tr>
                                        <tr className="bg-gray-50"><td className="px-4 py-3 font-medium">🇪🇺 EU</td><td className="px-4 py-3">Directive 2013/40/EU (Cybercrime Directive)</td><td className="px-4 py-3 text-xs">Illegal access, system interference, data interference, interception</td></tr>
                                        <tr><td className="px-4 py-3 font-medium">🇺🇸 United States</td><td className="px-4 py-3">CFAA (Computer Fraud and Abuse Act), ECPA, CAN-SPAM Act</td><td className="px-4 py-3 text-xs">Unauthorized access, computer fraud, wiretapping, spam</td></tr>
                                        <tr className="bg-gray-50"><td className="px-4 py-3 font-medium">🇬🇧 United Kingdom</td><td className="px-4 py-3">Computer Misuse Act 1990, Fraud Act 2006</td><td className="px-4 py-3 text-xs">Unauthorized access, modification, making/supplying tools for hacking</td></tr>
                                        <tr><td className="px-4 py-3 font-medium">🇮🇳 India</td><td className="px-4 py-3">IT Act 2000 (amended 2008) — Sections 43, 66, 66C-66F</td><td className="px-4 py-3 text-xs">Hacking, identity theft, cyber fraud, cyberstalking, phishing, child pornography</td></tr>
                                        <tr className="bg-gray-50"><td className="px-4 py-3 font-medium">🇧🇷 Brazil</td><td className="px-4 py-3">Lei 12.737/2012 (Carolina Dieckmann Law), Lei 12.965/2014 (Marco Civil)</td><td className="px-4 py-3 text-xs">Invasion of devices, unauthorized access, data breach</td></tr>
                                        <tr><td className="px-4 py-3 font-medium">🇯🇵 Japan</td><td className="px-4 py-3">Unauthorized Computer Access Law (Act No. 128 of 1999)</td><td className="px-4 py-3 text-xs">Unauthorized access, hacking tools possession</td></tr>
                                        <tr className="bg-gray-50"><td className="px-4 py-3 font-medium">🇷🇺 Russia</td><td className="px-4 py-3">Criminal Code Chapter 28 (Arts. 272-274)</td><td className="px-4 py-3 text-xs">Unauthorized access, malicious software, data interference</td></tr>
                                        <tr><td className="px-4 py-3 font-medium">🇩🇪 Germany</td><td className="px-4 py-3">German Criminal Code (StGB) §§ 202a-202d, 303a-303c</td><td className="px-4 py-3 text-xs">Data espionage, hacking, computer sabotage, data suppression</td></tr>
                                        <tr className="bg-gray-50"><td className="px-4 py-3 font-medium">🇫🇷 France</td><td className="px-4 py-3">French Penal Code Arts. 323-1 to 323-8</td><td className="px-4 py-3 text-xs">Unauthorized access, interference with automated systems</td></tr>
                                        <tr><td className="px-4 py-3 font-medium">🇪🇸 Spain</td><td className="px-4 py-3">Spanish Penal Code Arts. 197-201, 264-270</td><td className="px-4 py-3 text-xs">Data discovery, computer damage, hacking</td></tr>
                                        <tr className="bg-gray-50"><td className="px-4 py-3 font-medium">🇳🇱 Netherlands</td><td className="px-4 py-3">Dutch Criminal Code Arts. 138ab-138d, 161sexies, 350a-350d</td><td className="px-4 py-3 text-xs">Computer trespass, hacking tools, data breach</td></tr>
                                        <tr><td className="px-4 py-3 font-medium">🇦🇺 Australia</td><td className="px-4 py-3">Criminal Code Act 1995 (Cth) Div 477-478</td><td className="px-4 py-3 text-xs">Unauthorized access, modification, impairment of electronic communications</td></tr>
                                        <tr className="bg-gray-50"><td className="px-4 py-3 font-medium">🇿🇦 South Africa</td><td className="px-4 py-3">Cybercrimes Act 19 of 2020</td><td className="px-4 py-3 text-xs">Hacking, ransomware, data interference, cyber fraud, malicious communications</td></tr>
                                        <tr><td className="px-4 py-3 font-medium">🇳🇬 Nigeria</td><td className="px-4 py-3">Cybercrimes (Prohibition, Prevention, etc.) Act 2015</td><td className="px-4 py-3 text-xs">Hacking, identity theft, cyberstalking, child pornography, phishing</td></tr>
                                        <tr className="bg-gray-50"><td className="px-4 py-3 font-medium">🇰🇪 Kenya</td><td className="px-4 py-3">Computer Misuse and Cybercrimes Act No. 5 of 2018</td><td className="px-4 py-3 text-xs">Unauthorized access, cyber espionage, cyber harassment, identity theft</td></tr>
                                        <tr><td className="px-4 py-3 font-medium">🇹🇷 Turkey</td><td className="px-4 py-3">Turkish Penal Code Arts. 243-246 (Cybercrime provisions)</td><td className="px-4 py-3 text-xs">Hacking, data destruction, blocking access, misuse of systems</td></tr>
                                        <tr className="bg-gray-50"><td className="px-4 py-3 font-medium">🇮🇩 Indonesia</td><td className="px-4 py-3">Law No. 11/2008 (ITE Law, amended 2016)</td><td className="px-4 py-3 text-xs">Unauthorized access, electronic fraud, defamation, hate speech</td></tr>
                                        <tr><td className="px-4 py-3 font-medium">🇹🇭 Thailand</td><td className="px-4 py-3">Computer Crime Act B.E. 2550 (2007, amended 2017)</td><td className="px-4 py-3 text-xs">Unauthorized access, data interference, computer-related fraud</td></tr>
                                        <tr className="bg-gray-50"><td className="px-4 py-3 font-medium">🇵🇭 Philippines</td><td className="px-4 py-3">Cybercrime Prevention Act of 2012 (RA 10175)</td><td className="px-4 py-3 text-xs">Hacking, identity theft, cybersquatting, child pornography, libel</td></tr>
                                        <tr><td className="px-4 py-3 font-medium">🇰🇷 South Korea</td><td className="px-4 py-3">Act on Promotion of Information and Communications Network Utilization</td><td className="px-4 py-3 text-xs">Hacking, spam, personal information breach, defamation</td></tr>
                                        <tr className="bg-gray-50"><td className="px-4 py-3 font-medium">🇱🇰 Sri Lanka</td><td className="px-4 py-3">Computer Crimes Act No. 24 of 2007</td><td className="px-4 py-3 text-xs">Unauthorized access, data interference, device misuse</td></tr>
                                        <tr><td className="px-4 py-3 font-medium">🇰🇿 Kazakhstan</td><td className="px-4 py-3">Criminal Code Arts. 205-211 (cybercrime provisions)</td><td className="px-4 py-3 text-xs">Hacking, data theft, illegal access to information systems</td></tr>
                                        <tr className="bg-gray-50"><td className="px-4 py-3 font-medium">🇾🇪 Yemen</td><td className="px-4 py-3">Cybercrime Law No. 5 of 2015</td><td className="px-4 py-3 text-xs">Hacking, fraud, copyright infringement, system interference</td></tr>
                                        <tr><td className="px-4 py-3 font-medium">🇮🇷 Iran</td><td className="px-4 py-3">Computer Crimes Law (ratified 2009)</td><td className="px-4 py-3 text-xs">Hacking, data theft, system disruption, cyber fraud</td></tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                <p className="text-red-800 text-sm">
                                    <strong>⚠ Important:</strong> If you engage in any activity prohibited under Section 3 of this 
                                    policy, you may be subject to criminal prosecution under one or more of the above laws. 
                                    We will fully cooperate with law enforcement authorities in investigating such violations.
                                </p>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Policy Updates</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                This AUP may be updated periodically to address new technologies, threats, or 
                                regulatory requirements. Users will be notified of material changes, and continued 
                                use of the service constitutes acceptance of the updated policy.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">12. Contact Information</h2>
                            <div className="bg-blue-50 p-6 rounded-lg">
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    For questions about this Acceptable Use Policy:
                                </p>
                                <ul className="text-gray-700 space-y-2">
                                    <li><strong>Policy Questions:</strong> policy@arkynox.com</li>
                                    <li><strong>Violation Reports:</strong> abuse@arkynox.com</li>
                                    <li><strong>Appeals:</strong> appeals@arkynox.com</li>
                                    <li><strong>Legal Team:</strong> legal@arkynox.com</li>
                                </ul>
                            </div>
                        </section>
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-200 text-center">
                        <p className="text-sm text-gray-600">
                            This Acceptable Use Policy was last updated on June 20, 2026
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
