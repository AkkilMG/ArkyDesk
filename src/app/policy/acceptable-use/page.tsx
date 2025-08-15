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
                        <p className="text-gray-600 mt-2">Effective Date: August 15, 2025</p>
                    </div>

                    <div className="prose max-w-none">
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
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Policy Updates</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                This AUP may be updated periodically to address new technologies, threats, or 
                                regulatory requirements. Users will be notified of material changes, and continued 
                                use of the service constitutes acceptance of the updated policy.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Contact Information</h2>
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
                            This Acceptable Use Policy was last updated on August 15, 2025
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
