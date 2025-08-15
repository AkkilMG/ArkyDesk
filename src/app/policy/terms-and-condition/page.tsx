


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
                        <p className="text-gray-600 mt-2">Effective Date: August 15, 2025</p>
                    </div>

                    <div className="prose max-w-none">
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
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">12. Governing Law</h2>
                            <p className="text-gray-700 leading-relaxed">
                                These Terms shall be governed by and construed in accordance with applicable laws. 
                                Any disputes arising under these Terms shall be resolved through binding arbitration 
                                or in courts of competent jurisdiction.
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
                            These Terms and Conditions were last updated on August 15, 2025
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