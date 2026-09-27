'use client';

import PolicyLayout from '@/components/policy/PolicyLayout';
import {
    ZapIcon, ClockIcon, AlertCircleIcon, AlertTriangleIcon,
    InfoIcon, BarChartIcon, GlobeIcon, TrendingUpIcon,
    RefreshCwIcon, FileTextIcon, RocketIcon, ArrowRightIcon,
    CheckIcon, TargetIcon, HeartIcon, CreditCardIcon,
    MailIcon, PhoneIcon, BookIcon, SearchIcon, UsersIcon,
    ShieldIcon, LinkIcon
} from '@/components/policy/Icons';

const SeverityDot = ({ color }: { color: string }) => (
    <span className={`inline-block w-2.5 h-2.5 rounded-full ${color} mr-2 flex-shrink-0 mt-1`} />
);

export default function ServiceLevelAgreement() {
    return (
        <PolicyLayout
            title="Service Level Agreement (SLA)"
            links={[
                { href: '/policy/terms-and-condition', label: 'Terms & Conditions' },
                { href: '/policy/privacy-policy', label: 'Privacy Policy' },
                { href: '/dashboard', label: 'Return to Dashboard' },
            ]}
        >
            {/* Quick Summary */}
            <div className="not-prose bg-gradient-to-br from-green-50 via-emerald-50 to-green-50 border border-green-200/60 rounded-2xl p-6 sm:p-8 mb-10 shadow-sm">
                <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 shadow-md shadow-green-200 flex items-center justify-center">
                        <ZapIcon size={24} className="text-white" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-green-900">Quick Summary</h3>
                        <p className="text-sm text-green-600 font-medium">What service levels you can expect from us</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="bg-white/90 backdrop-blur rounded-xl p-4 border border-green-100 shadow-sm">
                        <div className="flex items-center gap-2 font-semibold text-green-800 mb-2">
                            <ClockIcon size={16} className="text-green-600" />
                            <span>Response Times</span>
                        </div>
                        <ul className="text-green-700 space-y-1.5">
                            <li className="flex items-start">
                                <SeverityDot color="bg-red-500" />
                                <span><strong>Critical</strong> (system down) &rarr; 2 hours</span>
                            </li>
                            <li className="flex items-start">
                                <SeverityDot color="bg-orange-500" />
                                <span><strong>High</strong> (major issue) &rarr; 4 hours</span>
                            </li>
                            <li className="flex items-start">
                                <SeverityDot color="bg-yellow-500" />
                                <span><strong>Normal</strong> (standard) &rarr; 24 hours</span>
                            </li>
                            <li className="flex items-start">
                                <SeverityDot color="bg-blue-500" />
                                <span><strong>Low</strong> (inquiry) &rarr; 72 hours</span>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-white/90 backdrop-blur rounded-xl p-4 border border-green-100 shadow-sm">
                        <div className="flex items-center gap-2 font-semibold text-green-800 mb-2">
                            <BarChartIcon size={16} className="text-green-600" />
                            <span>Uptime Guarantee</span>
                        </div>
                        <p className="text-green-700">99.9% uptime (~43 min downtime/month). If we miss it, you get service credits (10-50% of monthly fee).</p>
                        <div className="mt-3 h-2.5 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                            <div className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full animate-pulse" style={{ width: '99.9%' }} />
                        </div>
                        <p className="text-xs text-green-500 mt-1 font-medium">99.9% uptime target</p>
                    </div>
                    <div className="bg-white/90 backdrop-blur rounded-xl p-4 border border-green-100 shadow-sm">
                        <div className="flex items-center gap-2 font-semibold text-green-800 mb-2">
                            <GlobeIcon size={16} className="text-green-600" />
                            <span>Global Coverage</span>
                        </div>
                        <p className="text-green-700">Support centers in Americas, Europe, Asia, and Australasia. Follow-the-sun model means someone is always awake to help you.</p>
                    </div>
                    <div className="bg-white/90 backdrop-blur rounded-xl p-4 border border-green-100 shadow-sm">
                        <div className="flex items-center gap-2 font-semibold text-green-800 mb-2">
                            <TrendingUpIcon size={16} className="text-green-600" />
                            <span>Escalation Path</span>
                        </div>
                        <p className="text-green-700">Level 1 Agent &rarr; Level 2 Specialist &rarr; Level 3 Expert &rarr; Engineering &rarr; Management. We escalate automatically if response times are missed.</p>
                    </div>
                </div>
                <div className="mt-4 text-xs text-green-500 text-center font-medium bg-green-50/50 rounded-lg py-2">
                    This summary is for understanding. The full SLA below is the legally binding document.
                </div>
            </div>

            {/* Escalation Flow Diagram */}
            <div className="not-prose bg-gradient-to-br from-gray-50 to-slate-50 border border-gray-200 rounded-2xl p-6 sm:p-8 mb-10 shadow-sm">
                <div className="flex items-center gap-3 mb-6 justify-center">
                    <RefreshCwIcon size={20} className="text-gray-700" />
                    <h3 className="text-lg font-bold text-gray-800 text-center">Support Escalation Flow</h3>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center gap-3 text-xs">
                    <div className="bg-white border-2 border-emerald-200 rounded-xl px-5 py-4 text-center min-w-[120px] shadow-sm">
                        <FileTextIcon size={20} className="text-emerald-600 mx-auto mb-1" />
                        <div className="font-bold text-emerald-800">Ticket</div>
                        <div className="text-emerald-600">You submit</div>
                    </div>
                    <ArrowRightIcon size={20} className="text-emerald-400 flex-shrink-0" />
                    <div className="bg-white border-2 border-blue-200 rounded-xl px-5 py-4 text-center min-w-[120px] shadow-sm">
                        <UsersIcon size={20} className="text-blue-600 mx-auto mb-1" />
                        <div className="font-bold text-blue-800">L1 Agent</div>
                        <div className="text-blue-600">First response</div>
                        <div className="text-blue-500 font-medium">2-72 hrs</div>
                    </div>
                    <ArrowRightIcon size={20} className="text-emerald-400 flex-shrink-0" />
                    <div className="bg-white border-2 border-amber-200 rounded-xl px-5 py-4 text-center min-w-[120px] shadow-sm">
                        <SearchIcon size={20} className="text-amber-600 mx-auto mb-1" />
                        <div className="font-bold text-amber-800">L2 Specialist</div>
                        <div className="text-amber-600">Deep tech</div>
                        <div className="text-amber-500 font-medium">Auto-escalate</div>
                    </div>
                    <ArrowRightIcon size={20} className="text-emerald-400 flex-shrink-0" />
                    <div className="bg-white border-2 border-orange-200 rounded-xl px-5 py-4 text-center min-w-[120px] shadow-sm">
                        <ShieldIcon size={20} className="text-orange-600 mx-auto mb-1" />
                        <div className="font-bold text-orange-800">L3 Expert</div>
                        <div className="text-orange-600">SME</div>
                    </div>
                    <ArrowRightIcon size={20} className="text-emerald-400 flex-shrink-0" />
                    <div className="bg-white border-2 border-red-200 rounded-xl px-5 py-4 text-center min-w-[120px] shadow-sm">
                        <RocketIcon size={20} className="text-red-600 mx-auto mb-1" />
                        <div className="font-bold text-red-800">Engineering</div>
                        <div className="text-red-600">Code fix</div>
                    </div>
                </div>
                <div className="text-center mt-4 text-xs text-gray-400 font-medium bg-white/50 rounded-lg py-2">
                    If any level misses response time &rarr; auto-escalation to next level
                </div>
            </div>

            <section className="mb-10">
                <h2>1. Overview</h2>
                <p>
                    This Service Level Agreement (SLA) defines the performance standards and support commitments
                    that Arkynox provides to users of the ArkyDesk support system. This SLA is part of our
                    commitment to delivering reliable, high-quality technical support services.
                </p>
            </section>

            <section className="mb-10">
                <h2>2. Service Availability</h2>

                <h3>2.1 Uptime Commitment</h3>
                <div className="not-prose bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 mb-6 text-center shadow-sm">
                    <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600 mb-2">99.9%</div>
                    <p className="text-gray-700 font-medium">Monthly Uptime Guarantee</p>
                    <p className="text-sm text-gray-500 mt-1">Maximum downtime: 43 minutes per month</p>
                </div>

                <h3>2.2 Planned Maintenance</h3>
                <ul>
                    <li><strong>Scheduled Windows:</strong> Sundays 2:00 AM - 4:00 AM (local time)</li>
                    <li><strong>Advance Notice:</strong> 72 hours minimum for planned maintenance</li>
                    <li><strong>Duration:</strong> Maximum 2 hours per maintenance window</li>
                    <li><strong>Frequency:</strong> Monthly or as needed for critical updates</li>
                </ul>

                <h3>2.3 Emergency Maintenance</h3>
                <p>
                    Emergency maintenance may be performed without advance notice to address security
                    vulnerabilities or critical system issues. We will make every effort to minimize
                    disruption and communicate status updates during such events.
                </p>
            </section>

            <section className="mb-10">
                <h2>3. Response Time Standards</h2>

                <div className="not-prose overflow-x-auto mb-6">
                    <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                        <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                            <tr>
                                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Priority Level</th>
                                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Definition</th>
                                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Response Time</th>
                                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Resolution Target</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            <tr className="hover:bg-red-50/50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        <AlertCircleIcon size={16} className="text-red-500" />
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700">Critical</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">System down, complete service unavailable, security breach</td>
                                <td className="px-6 py-4 text-sm font-semibold text-gray-900">2 hours</td>
                                <td className="px-6 py-4 text-sm text-gray-600">8 hours</td>
                            </tr>
                            <tr className="hover:bg-orange-50/50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        <AlertTriangleIcon size={16} className="text-orange-500" />
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-100 text-orange-700">High</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">Major functionality impaired, affects multiple users</td>
                                <td className="px-6 py-4 text-sm font-semibold text-gray-900">4 hours</td>
                                <td className="px-6 py-4 text-sm text-gray-600">24 hours</td>
                            </tr>
                            <tr className="hover:bg-yellow-50/50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        <ClockIcon size={16} className="text-yellow-500" />
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700">Normal</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">Standard questions, minor issues, feature requests</td>
                                <td className="px-6 py-4 text-sm font-semibold text-gray-900">24 hours</td>
                                <td className="px-6 py-4 text-sm text-gray-600">5 business days</td>
                            </tr>
                            <tr className="hover:bg-blue-50/50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        <InfoIcon size={16} className="text-blue-500" />
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700">Low</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">General inquiries, documentation requests, enhancements</td>
                                <td className="px-6 py-4 text-sm font-semibold text-gray-900">72 hours</td>
                                <td className="px-6 py-4 text-sm text-gray-600">10 business days</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="not-prose bg-blue-50/80 border border-blue-100 rounded-xl p-5 mb-6">
                    <div className="flex items-start gap-3">
                        <InfoIcon size={18} className="text-blue-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-gray-600">
                            <strong>Note:</strong> Response times are calculated during business hours (Monday-Friday, 9 AM - 6 PM local time).
                            Resolution targets are estimates and may vary based on issue complexity.
                        </p>
                    </div>
                </div>
            </section>

            <section className="mb-10">
                <h2>4. Support Channels</h2>

                <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 border border-gray-200 rounded-xl p-6 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <MailIcon size={18} className="text-gray-600" />
                            Primary Channels
                        </h3>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li className="flex items-center gap-3">
                                <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                                <span><strong>Support Portal:</strong> 24/7 ticket submission</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                                <span><strong>Email:</strong> support@arkynox.com</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0" />
                                <span><strong>Knowledge Base:</strong> Self-service resources</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 border border-gray-200 rounded-xl p-6 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <PhoneIcon size={18} className="text-gray-600" />
                            Emergency Contact
                        </h3>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li className="flex items-center gap-3">
                                <span className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0" />
                                <span><strong>Critical Issues:</strong> Mark ticket as &ldquo;Critical&rdquo;</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0" />
                                <span><strong>After Hours:</strong> Emergency escalation available</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-2 h-2 bg-gray-500 rounded-full flex-shrink-0" />
                                <span><strong>Phone:</strong> Critical issues only</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="mb-10">
                <h2>5. Performance Metrics</h2>

                <h3>5.1 Key Performance Indicators</h3>
                <div className="not-prose grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gradient-to-b from-green-50 to-green-100/50 border border-green-200 rounded-xl p-5 text-center shadow-sm">
                        <div className="flex justify-center mb-2">
                            <TargetIcon size={24} className="text-green-500" />
                        </div>
                        <div className="text-2xl font-bold text-green-600">&ge; 95%</div>
                        <div className="text-sm text-gray-600 font-medium">First Response Target</div>
                    </div>
                    <div className="bg-gradient-to-b from-blue-50 to-blue-100/50 border border-blue-200 rounded-xl p-5 text-center shadow-sm">
                        <div className="flex justify-center mb-2">
                            <BarChartIcon size={24} className="text-blue-500" />
                        </div>
                        <div className="text-2xl font-bold text-blue-600">&ge; 90%</div>
                        <div className="text-sm text-gray-600 font-medium">Resolution Target</div>
                    </div>
                    <div className="bg-gradient-to-b from-purple-50 to-purple-100/50 border border-purple-200 rounded-xl p-5 text-center shadow-sm">
                        <div className="flex justify-center mb-2">
                            <HeartIcon size={24} className="text-purple-500" />
                        </div>
                        <div className="text-2xl font-bold text-purple-600">&ge; 4.5</div>
                        <div className="text-sm text-gray-600 font-medium">Customer Satisfaction</div>
                    </div>
                </div>

                <h3>5.2 Monthly Reporting</h3>
                <ul>
                    <li>System uptime and availability statistics</li>
                    <li>Response time performance by priority level</li>
                    <li>Ticket volume and resolution rates</li>
                    <li>Customer satisfaction survey results</li>
                    <li>Service improvement recommendations</li>
                </ul>
            </section>

            <section className="mb-10">
                <h2>6. Escalation Procedures</h2>

                <h3>6.1 Automatic Escalation</h3>
                <ul>
                    <li><strong>Response Time Breach:</strong> Automatic escalation to supervisor</li>
                    <li><strong>Critical Issues:</strong> Immediate escalation to senior staff</li>
                    <li><strong>Customer Request:</strong> Manual escalation upon request</li>
                </ul>

                <h3>6.2 Escalation Levels</h3>
                <div className="not-prose bg-gray-50/80 border border-gray-200 rounded-xl p-6 shadow-sm">
                    <ol className="list-decimal pl-6 space-y-2 text-sm text-gray-600">
                        <li><strong>Level 1:</strong> Front-line Support Technician</li>
                        <li><strong>Level 2:</strong> Senior Support Specialist</li>
                        <li><strong>Level 3:</strong> Technical Lead / Subject Matter Expert</li>
                        <li><strong>Level 4:</strong> Engineering Team / Product Development</li>
                        <li><strong>Management:</strong> Support Manager / Director</li>
                    </ol>
                </div>
            </section>

            <section className="mb-10">
                <h2>7. Service Credits</h2>

                <h3>7.1 Availability Credits</h3>
                <div className="not-prose overflow-x-auto mb-4">
                    <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                        <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                            <tr>
                                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Monthly Uptime</th>
                                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Service Credit</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            <tr className="hover:bg-green-50/30 transition-colors">
                                <td className="px-6 py-4 text-sm text-gray-700">99.0% - 99.9%</td>
                                <td className="px-6 py-4 text-sm text-gray-700">10% of monthly fee</td>
                            </tr>
                            <tr className="hover:bg-yellow-50/30 transition-colors">
                                <td className="px-6 py-4 text-sm text-gray-700">95.0% - 98.9%</td>
                                <td className="px-6 py-4 text-sm text-gray-700">25% of monthly fee</td>
                            </tr>
                            <tr className="hover:bg-red-50/30 transition-colors">
                                <td className="px-6 py-4 text-sm text-gray-700">&lt; 95.0%</td>
                                <td className="px-6 py-4 text-sm text-gray-700">50% of monthly fee</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3>7.2 Credit Claims</h3>
                <ul>
                    <li>Credits must be requested within 30 days of the incident</li>
                    <li>Credits are applied to the next billing cycle</li>
                    <li>Maximum credit of 100% of monthly fee per incident</li>
                    <li>Credits do not apply to planned maintenance or force majeure events</li>
                </ul>
            </section>

            <section className="mb-10">
                <h2>8. Exclusions</h2>
                <p>This SLA does not apply to service interruptions caused by:</p>
                <ul>
                    <li>Scheduled maintenance (with proper notice)</li>
                    <li>Acts of God, natural disasters, or force majeure events</li>
                    <li>Internet service provider or network connectivity issues</li>
                    <li>Customer equipment, software, or configuration issues</li>
                    <li>Third-party service failures beyond our control</li>
                    <li>Security incidents or cyber attacks</li>
                    <li>Customer-requested changes or modifications</li>
                </ul>
            </section>

            <section className="mb-10">
                <h2>9. Global Support Coverage</h2>
                <p>
                    Our support team operates across multiple time zones to provide coverage for users worldwide.
                    Below are our regional support centers and their operating hours:
                </p>

                <div className="not-prose overflow-x-auto mb-6">
                    <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-xl overflow-hidden text-sm shadow-sm">
                        <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                            <tr>
                                <th className="px-4 py-3.5 text-left font-semibold text-gray-700">Region</th>
                                <th className="px-4 py-3.5 text-left font-semibold text-gray-700">Coverage Timezone</th>
                                <th className="px-4 py-3.5 text-left font-semibold text-gray-700">Business Hours</th>
                                <th className="px-4 py-3.5 text-left font-semibold text-gray-700">Languages</th>
                                <th className="px-4 py-3.5 text-left font-semibold text-gray-700">24/7 Available</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            <tr className="hover:bg-gray-50/50 transition-colors"><td className="px-4 py-3.5 font-medium">Americas</td><td className="px-4 py-3.5">EST/PST (UTC-5/-8)</td><td className="px-4 py-3.5">9 AM - 9 PM local</td><td className="px-4 py-3.5">English, Spanish, Portuguese</td><td className="px-4 py-3.5"><CheckIcon size={16} className="text-green-500" /></td></tr>
                            <tr className="hover:bg-gray-50/50 transition-colors"><td className="px-4 py-3.5 font-medium">Europe & Africa</td><td className="px-4 py-3.5">CET/SAST (UTC+1/+2)</td><td className="px-4 py-3.5">8 AM - 8 PM local</td><td className="px-4 py-3.5">English, French, German, Spanish, Dutch, Turkish, Russian</td><td className="px-4 py-3.5"><CheckIcon size={16} className="text-green-500" /></td></tr>
                            <tr className="hover:bg-gray-50/50 transition-colors"><td className="px-4 py-3.5 font-medium">Middle East & Central Asia</td><td className="px-4 py-3.5">GST/AQTT (UTC+4/+5)</td><td className="px-4 py-3.5">8 AM - 6 PM local</td><td className="px-4 py-3.5">Arabic, Turkish, Russian, English</td><td className="px-4 py-3.5 text-gray-400 text-xs font-medium">Critical only</td></tr>
                            <tr className="hover:bg-gray-50/50 transition-colors"><td className="px-4 py-3.5 font-medium">South Asia</td><td className="px-4 py-3.5">IST/PKT (UTC+5/+5:30)</td><td className="px-4 py-3.5">8 AM - 10 PM local</td><td className="px-4 py-3.5">Hindi, English, Tamil, Sinhala</td><td className="px-4 py-3.5"><CheckIcon size={16} className="text-green-500" /></td></tr>
                            <tr className="hover:bg-gray-50/50 transition-colors"><td className="px-4 py-3.5 font-medium">Southeast Asia</td><td className="px-4 py-3.5">ICT/WIB (UTC+7/+8)</td><td className="px-4 py-3.5">7 AM - 9 PM local</td><td className="px-4 py-3.5">Indonesian, Thai, English, Filipino</td><td className="px-4 py-3.5 text-gray-400 text-xs font-medium">Critical only</td></tr>
                            <tr className="hover:bg-gray-50/50 transition-colors"><td className="px-4 py-3.5 font-medium">East Asia</td><td className="px-4 py-3.5">JST/KST (UTC+9)</td><td className="px-4 py-3.5">9 AM - 9 PM local</td><td className="px-4 py-3.5">Japanese, Korean, English</td><td className="px-4 py-3.5 text-gray-400 text-xs font-medium">Critical only</td></tr>
                            <tr className="hover:bg-gray-50/50 transition-colors"><td className="px-4 py-3.5 font-medium">Australasia</td><td className="px-4 py-3.5">AEST (UTC+10)</td><td className="px-4 py-3.5">8 AM - 8 PM local</td><td className="px-4 py-3.5">English</td><td className="px-4 py-3.5 text-gray-400 text-xs font-medium">Critical only</td></tr>
                        </tbody>
                    </table>
                </div>

                <h3>9.1 Follow-the-Sun Coverage</h3>
                <p>
                    Through our global support centers, we provide continuous coverage across all time zones.
                    When a regional center closes, the next region takes over, ensuring that critical issues
                    receive attention 24/7 regardless of your location.
                </p>

                <div className="not-prose grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gradient-to-b from-blue-50 to-blue-100/50 border border-blue-200 rounded-xl p-5 text-center shadow-sm">
                        <GlobeIcon size={24} className="text-blue-500 mx-auto mb-2" />
                        <div className="text-lg font-bold text-blue-700">8 AM - 4 PM UTC</div>
                        <div className="text-sm text-blue-600 font-medium">Americas coverage</div>
                    </div>
                    <div className="bg-gradient-to-b from-green-50 to-green-100/50 border border-green-200 rounded-xl p-5 text-center shadow-sm">
                        <GlobeIcon size={24} className="text-green-500 mx-auto mb-2" />
                        <div className="text-lg font-bold text-green-700">4 PM - 12 AM UTC</div>
                        <div className="text-sm text-green-600 font-medium">Europe/Africa coverage</div>
                    </div>
                    <div className="bg-gradient-to-b from-orange-50 to-orange-100/50 border border-orange-200 rounded-xl p-5 text-center shadow-sm">
                        <GlobeIcon size={24} className="text-orange-500 mx-auto mb-2" />
                        <div className="text-lg font-bold text-orange-700">12 AM - 8 AM UTC</div>
                        <div className="text-sm text-orange-600 font-medium">Asia/Pacific coverage</div>
                    </div>
                </div>

                <h3>9.2 Country-Specific Contact Channels</h3>
                <div className="not-prose grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm mb-4">
                    <div className="bg-gray-50/80 border border-gray-200 rounded-lg p-3 hover:bg-gray-100/50 transition-colors"><PhoneIcon size={14} className="inline mr-1.5 text-gray-400" /><span className="font-medium">US & Canada:</span> +1-555-SUPPORT (toll-free)</div>
                    <div className="bg-gray-50/80 border border-gray-200 rounded-lg p-3 hover:bg-gray-100/50 transition-colors"><PhoneIcon size={14} className="inline mr-1.5 text-gray-400" /><span className="font-medium">United Kingdom:</span> +44-555-SUPPORT</div>
                    <div className="bg-gray-50/80 border border-gray-200 rounded-lg p-3 hover:bg-gray-100/50 transition-colors"><PhoneIcon size={14} className="inline mr-1.5 text-gray-400" /><span className="font-medium">India:</span> +91-555-SUPPORT (toll-free)</div>
                    <div className="bg-gray-50/80 border border-gray-200 rounded-lg p-3 hover:bg-gray-100/50 transition-colors"><PhoneIcon size={14} className="inline mr-1.5 text-gray-400" /><span className="font-medium">Brazil:</span> +55-555-SUPPORT</div>
                    <div className="bg-gray-50/80 border border-gray-200 rounded-lg p-3 hover:bg-gray-100/50 transition-colors"><PhoneIcon size={14} className="inline mr-1.5 text-gray-400" /><span className="font-medium">Russia:</span> +7-555-SUPPORT</div>
                    <div className="bg-gray-50/80 border border-gray-200 rounded-lg p-3 hover:bg-gray-100/50 transition-colors"><PhoneIcon size={14} className="inline mr-1.5 text-gray-400" /><span className="font-medium">Japan:</span> +81-555-SUPPORT</div>
                    <div className="bg-gray-50/80 border border-gray-200 rounded-lg p-3 hover:bg-gray-100/50 transition-colors"><PhoneIcon size={14} className="inline mr-1.5 text-gray-400" /><span className="font-medium">Germany:</span> +49-555-SUPPORT</div>
                    <div className="bg-gray-50/80 border border-gray-200 rounded-lg p-3 hover:bg-gray-100/50 transition-colors"><PhoneIcon size={14} className="inline mr-1.5 text-gray-400" /><span className="font-medium">France:</span> +33-555-SUPPORT</div>
                    <div className="bg-gray-50/80 border border-gray-200 rounded-lg p-3 hover:bg-gray-100/50 transition-colors"><PhoneIcon size={14} className="inline mr-1.5 text-gray-400" /><span className="font-medium">South Africa:</span> +27-555-SUPPORT</div>
                    <div className="bg-gray-50/80 border border-gray-200 rounded-lg p-3 hover:bg-gray-100/50 transition-colors"><PhoneIcon size={14} className="inline mr-1.5 text-gray-400" /><span className="font-medium">Australia:</span> +61-555-SUPPORT</div>
                    <div className="bg-gray-50/80 border border-gray-200 rounded-lg p-3 hover:bg-gray-100/50 transition-colors"><PhoneIcon size={14} className="inline mr-1.5 text-gray-400" /><span className="font-medium">Nigeria:</span> +234-555-SUPPORT</div>
                    <div className="bg-gray-50/80 border border-gray-200 rounded-lg p-3 hover:bg-gray-100/50 transition-colors"><PhoneIcon size={14} className="inline mr-1.5 text-gray-400" /><span className="font-medium">Turkey:</span> +90-555-SUPPORT</div>
                    <div className="bg-gray-50/80 border border-gray-200 rounded-lg p-3 hover:bg-gray-100/50 transition-colors"><PhoneIcon size={14} className="inline mr-1.5 text-gray-400" /><span className="font-medium">Indonesia:</span> +62-555-SUPPORT</div>
                    <div className="bg-gray-50/80 border border-gray-200 rounded-lg p-3 hover:bg-gray-100/50 transition-colors"><PhoneIcon size={14} className="inline mr-1.5 text-gray-400" /><span className="font-medium">Thailand:</span> +66-555-SUPPORT</div>
                    <div className="bg-gray-50/80 border border-gray-200 rounded-lg p-3 hover:bg-gray-100/50 transition-colors"><PhoneIcon size={14} className="inline mr-1.5 text-gray-400" /><span className="font-medium">South Korea:</span> +82-555-SUPPORT</div>
                    <div className="bg-gray-50/80 border border-gray-200 rounded-lg p-3 hover:bg-gray-100/50 transition-colors"><PhoneIcon size={14} className="inline mr-1.5 text-gray-400" /><span className="font-medium">Kenya:</span> +254-555-SUPPORT</div>
                    <div className="bg-gray-50/80 border border-gray-200 rounded-lg p-3 hover:bg-gray-100/50 transition-colors"><PhoneIcon size={14} className="inline mr-1.5 text-gray-400" /><span className="font-medium">Philippines:</span> +63-555-SUPPORT</div>
                    <div className="bg-gray-50/80 border border-gray-200 rounded-lg p-3 hover:bg-gray-100/50 transition-colors"><PhoneIcon size={14} className="inline mr-1.5 text-gray-400" /><span className="font-medium">Sri Lanka:</span> +94-555-SUPPORT</div>
                </div>
                <p className="text-xs text-gray-400">
                    Phone support is available for Critical and High priority issues. Normal and Low priority
                    issues should be submitted via the support portal or email.
                </p>
            </section>

            <section className="mb-10">
                <h2>10. SLA Review and Updates</h2>
                <p>
                    This SLA is reviewed quarterly and may be updated to reflect changes in service
                    capabilities, technology improvements, or customer requirements. Material changes
                    will be communicated with 30 days advance notice.
                </p>
            </section>

            <section className="mb-10">
                <h2>11. Contact Information</h2>
                <div className="not-prose bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-200 rounded-xl p-6 shadow-sm">
                    <p className="text-sm text-gray-600 mb-4">
                        For SLA-related questions or to report service level breaches:
                    </p>
                    <ul className="text-sm text-gray-600 space-y-2">
                        <li className="flex items-center gap-2">
                            <MailIcon size={16} className="text-blue-500 flex-shrink-0" />
                            <span><strong>Email:</strong> sla@arkynox.com</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <LinkIcon size={16} className="text-blue-500 flex-shrink-0" />
                            <span><strong>Support Portal:</strong> Create a ticket with &ldquo;SLA&rdquo; in the subject</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <TrendingUpIcon size={16} className="text-blue-500 flex-shrink-0" />
                            <span><strong>Escalation:</strong> support-manager@arkynox.com</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <ClockIcon size={16} className="text-blue-500 flex-shrink-0" />
                            <span><strong>Response Time:</strong> SLA inquiries responded to within 4 hours</span>
                        </li>
                    </ul>
                </div>
            </section>
        </PolicyLayout>
    );
}
