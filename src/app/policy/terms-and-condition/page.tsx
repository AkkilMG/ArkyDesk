

'use client';

import { useEffect } from 'react';

export default function TermsAndCondition() {
    useEffect(() => {
        document.title = 'Terms and Conditions - Arkynox Support';
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="text-center mb-8">
                        <img src="/logo/logo.png" alt="Arkynox Logo" className="h-16 mx-auto mb-4" />
                        <h1 className="text-3xl font-bold text-gray-900">Terms and Conditions</h1>
                        <p className="text-gray-600 mt-2">Effective Date: June 20, 2026</p>
                    </div>

                    <div className="prose max-w-none">
                        {/* Quick Summary - Plain Language */}
                        <div className="bg-gradient-to-r from-slate-50 to-gray-50 border border-slate-200 rounded-xl p-6 mb-8">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-slate-100 rounded-full p-2">
                                    <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900">Quick Summary (Plain English) 📋</h3>
                                    <p className="text-sm text-slate-700">The legal agreement between you and Arkynox when you use our support system</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div className="bg-white/80 rounded-lg p-3 border border-slate-200">
                                    <div className="font-semibold text-slate-800 mb-1">🔑 Your Responsibilities</div>
                                    <ul className="text-slate-700 space-y-0.5">
                                        <li>✓ Provide accurate account info</li>
                                        <li>✓ Keep your password secure</li>
                                        <li>✓ Use the service legally and professionally</li>
                                        <li>✓ Comply with all applicable laws</li>
                                    </ul>
                                </div>
                                <div className="bg-white/80 rounded-lg p-3 border border-slate-200">
                                    <div className="font-semibold text-slate-800 mb-1">⚖️ Governing Law By Country</div>
                                    <ul className="text-slate-700 space-y-0.5">
                                        <li><strong>India:</strong> Laws of India, courts in New Delhi</li>
                                        <li><strong>EU:</strong> Your country's law + consumer rights</li>
                                        <li><strong>US:</strong> Delaware law, binding arbitration</li>
                                        <li><strong>Brazil, Japan, Turkey, etc:</strong> Local law applies</li>
                                    </ul>
                                </div>
                                <div className="bg-white/80 rounded-lg p-3 border border-slate-200">
                                    <div className="font-semibold text-slate-800 mb-1">📝 What We Provide</div>
                                    <ul className="text-slate-700 space-y-0.5">
                                        <li>✓ Support ticket system with 99.9% uptime target</li>
                                        <li>✓ Tiered response times (2-72 hours)</li>
                                        <li>✓ Knowledge base & self-service</li>
                                        <li>✓ Data protection per global privacy laws</li>
                                    </ul>
                                </div>
                                <div className="bg-white/80 rounded-lg p-3 border border-slate-200">
                                    <div className="font-semibold text-slate-800 mb-1">🛡️ Your Consumer Rights</div>
                                    <p className="text-slate-700"><strong>EU:</strong> 14-day cooling-off period. <strong>India:</strong> Consumer Protection Act 2019. <strong>Brazil:</strong> CDC reverse burden of proof. <strong>Australia:</strong> Statutory guarantees. <strong>UK:</strong> Reasonable care and skill.</p>
                                    <p className="text-slate-600 text-xs mt-1">Nothing in these Terms reduces your mandatory consumer rights.</p>
                                </div>
                            </div>
                            <div className="mt-3 text-xs text-slate-500 text-center">
                                This summary is for understanding. The full Terms below is the legally binding document.
                            </div>
                        </div>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Acceptance of Terms</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                By accessing and using ArkyDesk support system ("Service"), provided by Arkynox ("Company," "we," "us," or "our"), 
                                you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions ("Terms").
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                If you do not agree to these Terms, please do not use our Service.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Service Description</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                ArkyDesk is a customer support ticket management system that enables:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li>Creation and management of support tickets</li>
                                <li>Communication between customers and support staff</li>
                                <li>File sharing and attachment capabilities</li>
                                <li>Ticket tracking and status updates</li>
                                <li>Knowledge base and self-service options</li>
                                <li>Administrative and reporting functions</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. User Accounts and Registration</h2>
                            
                            <h3 className="text-xl font-medium text-gray-800 mb-3">3.1 Account Creation</h3>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li>You must provide accurate and complete information when creating an account</li>
                                <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                                <li>You must notify us immediately of any unauthorized use of your account</li>
                                <li>One person may not maintain multiple accounts without prior approval</li>
                            </ul>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">3.2 Account Responsibilities</h3>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li>You are responsible for all activities that occur under your account</li>
                                <li>You must use strong passwords and enable two-factor authentication when available</li>
                                <li>You must keep your contact information current and accurate</li>
                                <li>You must comply with all applicable laws and regulations</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Acceptable Use Policy</h2>
                            
                            <h3 className="text-xl font-medium text-gray-800 mb-3">4.1 Permitted Uses</h3>
                            <p className="text-gray-700 leading-relaxed mb-4">You may use the Service to:</p>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li>Submit legitimate support requests and technical issues</li>
                                <li>Communicate with our support team professionally</li>
                                <li>Share relevant files and information for troubleshooting</li>
                                <li>Access knowledge base and self-help resources</li>
                            </ul>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">4.2 Prohibited Activities</h3>
                            <p className="text-gray-700 leading-relaxed mb-4">You agree not to:</p>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li>Submit false, misleading, or spam tickets</li>
                                <li>Upload malicious software, viruses, or harmful content</li>
                                <li>Attempt to gain unauthorized access to the system</li>
                                <li>Harass, abuse, or threaten support staff or other users</li>
                                <li>Use the Service for illegal activities or purposes</li>
                                <li>Reverse engineer, modify, or create derivative works</li>
                                <li>Share your account credentials with unauthorized persons</li>
                                <li>Overload the system with excessive requests</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Support Services</h2>
                            
                            <h3 className="text-xl font-medium text-gray-800 mb-3">5.1 Service Levels</h3>
                            <div className="bg-blue-50 p-4 rounded-lg mb-4">
                                <ul className="text-gray-700 space-y-2">
                                    <li><strong>Critical Issues:</strong> Response within 2 hours (business days)</li>
                                    <li><strong>High Priority:</strong> Response within 4 hours (business days)</li>
                                    <li><strong>Normal Priority:</strong> Response within 24 hours (business days)</li>
                                    <li><strong>Low Priority:</strong> Response within 72 hours (business days)</li>
                                </ul>
                            </div>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">5.2 Business Hours</h3>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Standard support is available Monday through Friday, 9:00 AM to 6:00 PM (local time). 
                                Emergency support may be available outside business hours for critical issues.
                            </p>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">5.3 Support Scope</h3>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li>Technical assistance with our products and services</li>
                                <li>Bug reports and resolution</li>
                                <li>Feature requests and enhancement discussions</li>
                                <li>Account and billing inquiries</li>
                                <li>Training and documentation assistance</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Intellectual Property</h2>
                            
                            <h3 className="text-xl font-medium text-gray-800 mb-3">6.1 Our Rights</h3>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                The Service, including all content, features, and functionality, is owned by Arkynox 
                                and is protected by copyright, trademark, and other intellectual property laws.
                            </p>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">6.2 Your Content</h3>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                You retain ownership of any content you submit through the Service. However, you grant 
                                us a non-exclusive license to use, store, and process your content for the purpose of 
                                providing support services.
                            </p>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">6.3 Feedback</h3>
                            <p className="text-gray-700 leading-relaxed">
                                Any feedback, suggestions, or ideas you provide may be used by us without obligation 
                                or compensation to you.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Privacy and Data Protection</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Your privacy is important to us. Our collection and use of your personal information 
                                is governed by our Privacy Policy, which is incorporated into these Terms by reference.
                            </p>
                            <div className="bg-yellow-50 p-4 rounded-lg">
                                <p className="text-gray-700">
                                    <strong>Important:</strong> Please review our 
                                    <a href="/policy/privacy-policy" className="text-blue-600 hover:text-blue-800 font-medium mx-1">
                                        Privacy Policy
                                    </a>
                                    to understand how we handle your information.
                                </p>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Limitation of Liability</h2>
                            <div className="bg-red-50 p-6 rounded-lg">
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    <strong>IMPORTANT LIMITATION:</strong> To the maximum extent permitted by law, 
                                    Arkynox shall not be liable for any indirect, incidental, special, consequential, 
                                    or punitive damages, including but not limited to loss of profits, data, or business 
                                    interruption.
                                </p>
                                <p className="text-gray-700 leading-relaxed">
                                    Our total liability for any claims related to the Service shall not exceed the 
                                    amount you paid for the Service in the 12 months preceding the claim.
                                </p>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Service Availability</h2>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li><strong>Uptime Target:</strong> We strive for 99.9% uptime availability</li>
                                <li><strong>Maintenance:</strong> Scheduled maintenance will be announced in advance</li>
                                <li><strong>Emergency Maintenance:</strong> May be performed without prior notice</li>
                                <li><strong>Force Majeure:</strong> We are not responsible for outages due to circumstances beyond our control</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Termination</h2>
                            
                            <h3 className="text-xl font-medium text-gray-800 mb-3">10.1 Termination by You</h3>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                You may terminate your account at any time by contacting us or using the account 
                                deletion feature in your settings.
                            </p>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">10.2 Termination by Us</h3>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We may suspend or terminate your access to the Service if you violate these Terms 
                                or engage in prohibited activities.
                            </p>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">10.3 Effect of Termination</h3>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li>Your right to use the Service will cease immediately</li>
                                <li>We may retain certain information as required by law or for legitimate business purposes</li>
                                <li>Provisions that should survive termination will remain in effect</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Changes to Terms</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We reserve the right to modify these Terms at any time. We will notify users of 
                                material changes by email or through the Service. Your continued use of the Service 
                                after changes constitutes acceptance of the new Terms.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">12. Governing Law and Dispute Resolution</h2>
                            
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                                <p className="text-yellow-800 text-sm">
                                    <strong>Important:</strong> If you are a consumer in any jurisdiction, nothing in these Terms 
                                    reduces your mandatory rights under applicable consumer protection laws. Where laws provide 
                                    you with greater protections, those laws prevail.
                                </p>
                            </div>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">12.1 Governing Law by Region</h3>
                            <div className="overflow-x-auto mb-4">
                                <table className="min-w-full divide-y divide-gray-200 text-sm">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left font-semibold text-gray-700">Region</th>
                                            <th className="px-4 py-3 text-left font-semibold text-gray-700">Governing Law</th>
                                            <th className="px-4 py-3 text-left font-semibold text-gray-700">Dispute Resolution</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        <tr><td className="px-4 py-3 font-medium">🌐 Global (default)</td><td className="px-4 py-3">Laws of England and Wales</td><td className="px-4 py-3">Arbitration under ICC Rules</td></tr>
                                        <tr className="bg-gray-50"><td className="px-4 py-3 font-medium">🇪🇺 EU/EEA Consumers</td><td className="px-4 py-3">Consumer's country of residence</td><td className="px-4 py-3">Consumer's local courts + Online Dispute Resolution (ODR)</td></tr>
                                        <tr><td className="px-4 py-3 font-medium">🇺🇸 United States</td><td className="px-4 py-3">State of Delaware, USA</td><td className="px-4 py-3">Binding arbitration (opt-out available within 30 days)</td></tr>
                                        <tr className="bg-gray-50"><td className="px-4 py-3 font-medium">🇮🇳 India</td><td className="px-4 py-3">Laws of India</td><td className="px-4 py-3">Courts in New Delhi, India</td></tr>
                                        <tr><td className="px-4 py-3 font-medium">🇧🇷 Brazil</td><td className="px-4 py-3">Laws of Brazil</td><td className="px-4 py-3">Consumer's local courts in Brazil</td></tr>
                                        <tr className="bg-gray-50"><td className="px-4 py-3 font-medium">🇷🇺 Russia</td><td className="px-4 py-3">Laws of the Russian Federation</td><td className="px-4 py-3">Courts in Moscow, Russia</td></tr>
                                        <tr><td className="px-4 py-3 font-medium">🇯🇵 Japan</td><td className="px-4 py-3">Laws of Japan</td><td className="px-4 py-3">Tokyo District Court</td></tr>
                                        <tr className="bg-gray-50"><td className="px-4 py-3 font-medium">🇹🇷 Turkey</td><td className="px-4 py-3">Laws of the Republic of Turkey</td><td className="px-4 py-3">Istanbul Courts and Execution Offices</td></tr>
                                        <tr><td className="px-4 py-3 font-medium">🇦🇺 Australia</td><td className="px-4 py-3">Laws of New South Wales, Australia</td><td className="px-4 py-3">Courts of New South Wales</td></tr>
                                        <tr className="bg-gray-50"><td className="px-4 py-3 font-medium">🇿🇦 South Africa</td><td className="px-4 py-3">Laws of the Republic of South Africa</td><td className="px-4 py-3">Magistrate's Court / High Court depending on quantum</td></tr>
                                        <tr><td className="px-4 py-3 font-medium">🇳🇬 Nigeria</td><td className="px-4 py-3">Laws of the Federal Republic of Nigeria</td><td className="px-4 py-3">High Court of Lagos State</td></tr>
                                        <tr className="bg-gray-50"><td className="px-4 py-3 font-medium">🇰🇪 Kenya</td><td className="px-4 py-3">Laws of the Republic of Kenya</td><td className="px-4 py-3">High Court of Kenya at Nairobi</td></tr>
                                        <tr><td className="px-4 py-3 font-medium">🇮🇩 Indonesia</td><td className="px-4 py-3">Laws of the Republic of Indonesia</td><td className="px-4 py-3">District Court of Central Jakarta</td></tr>
                                        <tr className="bg-gray-50"><td className="px-4 py-3 font-medium">🇹🇭 Thailand</td><td className="px-4 py-3">Laws of Thailand</td><td className="px-4 py-3">Thai courts (consumer's domicile)</td></tr>
                                        <tr><td className="px-4 py-3 font-medium">🇵🇭 Philippines</td><td className="px-4 py-3">Laws of the Philippines</td><td className="px-4 py-3">Courts of Makati City</td></tr>
                                        <tr className="bg-gray-50"><td className="px-4 py-3 font-medium">🇰🇷 South Korea</td><td className="px-4 py-3">Laws of the Republic of Korea</td><td className="px-4 py-3">Seoul Central District Court</td></tr>
                                        <tr><td className="px-4 py-3 font-medium">🇱🇰 Sri Lanka</td><td className="px-4 py-3">Laws of Sri Lanka</td><td className="px-4 py-3">Colombo Commercial High Court</td></tr>
                                        <tr className="bg-gray-50"><td className="px-4 py-3 font-medium">🇰🇿 Kazakhstan</td><td className="px-4 py-3">Laws of Kazakhstan</td><td className="px-4 py-3">Courts of Astana</td></tr>
                                    </tbody>
                                </table>
                            </div>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">12.2 Consumer Protection</h3>
                            <ul className="list-disc pl-6 mb-4 text-gray-700">
                                <li><strong>EU Consumers:</strong> Have the right to withdraw from service contracts within 14 days (Cooling-off period) under the Consumer Rights Directive</li>
                                <li><strong>UK Consumers:</strong> Have rights under the Consumer Rights Act 2015, including that services must be provided with reasonable care and skill</li>
                                <li><strong>India Consumers:</strong> Have rights under the Consumer Protection Act 2019, including the right to file complaints before the District/State/National Consumer Disputes Redressal Commission</li>
                                <li><strong>Brazil Consumers:</strong> Have rights under the Brazilian Consumer Protection Code (CDC - Lei 8.078/90), including the right to reverse burden of proof</li>
                                <li><strong>Australia Consumers:</strong> Have rights under the Australian Consumer Law, including statutory guarantees that cannot be excluded</li>
                                <li><strong>South Africa Consumers:</strong> Have rights under the Consumer Protection Act 68 of 2008</li>
                                <li><strong>Russia Consumers:</strong> Have rights under the Consumer Protection Law (Law No. 2300-1), including the right to demand quality service</li>
                                <li><strong>Japan Consumers:</strong> Have rights under the Consumer Contract Act and Product Liability Act</li>
                            </ul>

                            <h3 className="text-xl font-medium text-gray-800 mb-3">12.3 Contractual Capacity (Age of Consent)</h3>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                By agreeing to these Terms, you confirm that you have the legal capacity to enter into a 
                                binding contract in your country of residence. The minimum age to use our Service independently is:
                            </p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 text-sm mb-4">
                                <div className="bg-gray-50 p-2 rounded text-center"><span className="font-medium">No minimum</span><br/>UK, US</div>
                                <div className="bg-gray-50 p-2 rounded text-center"><span className="font-medium">14+</span><br/>Spain, South Korea</div>
                                <div className="bg-gray-50 p-2 rounded text-center"><span className="font-medium">15+</span><br/>Japan, France</div>
                                <div className="bg-gray-50 p-2 rounded text-center"><span className="font-medium">16+</span><br/>Germany, Netherlands</div>
                                <div className="bg-gray-50 p-2 rounded text-center"><span className="font-medium">18+</span><br/>India, Brazil, Turkey, Nigeria, Kenya, etc.</div>
                                <div className="bg-gray-50 p-2 rounded text-center"><span className="font-medium">20+</span><br/>Thailand</div>
                            </div>
                            <p className="text-gray-700 text-sm">
                                If you are below the age of majority in your jurisdiction, you may only use the Service with 
                                the involvement of a parent or legal guardian who agrees to these Terms on your behalf.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">13. Contact Information</h2>
                            <div className="bg-blue-50 p-6 rounded-lg">
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    If you have questions about these Terms, please contact us:
                                </p>
                                <ul className="text-gray-700 space-y-2">
                                    <li><strong>Email:</strong> legal@arkynox.com</li>
                                    <li><strong>Support Portal:</strong> Create a ticket in ArkyDesk</li>
                                    <li><strong>Mail:</strong> Arkynox Legal Department</li>
                                    <li><strong>Response Time:</strong> We will respond within 5 business days</li>
                                </ul>
                            </div>
                        </section>
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-200 text-center">
                        <p className="text-sm text-gray-600">
                            These Terms and Conditions were last updated on June 20, 2026
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