import type { Metadata } from 'next';
import PolicyLayout from '@/components/policy/PolicyLayout';
import { H2, H3 } from '@/components/policy/PolicyHeading';
import Note from '@/components/policy/Note';
import DataTable from '@/components/policy/DataTable';
import { POLICY_CONTACTS } from '@/lib/policy/policies';

export const metadata: Metadata = {
    title: 'Service Level Agreement',
    description:
        'Arkynox commitments on ArkyDesk availability, support response and resolution targets, escalation and service credits.',
    alternates: { canonical: '/policy/sla' },
};

const toc = [
    { id: 'c1', no: '1.', label: 'Scope and Incorporation', level: 2 as const },
    { id: 'c2', no: '2.', label: 'Definitions', level: 2 as const },
    { id: 'c3', no: '3.', label: 'Support Hours and Channels', level: 2 as const },
    { id: 'c4', no: '4.', label: 'Priority Levels and Response Targets', level: 2 as const },
    { id: 'c5', no: '5.', label: 'Service Availability', level: 2 as const },
    { id: 'c6', no: '6.', label: 'Maintenance', level: 2 as const },
    { id: 'c7', no: '7.', label: 'Escalation', level: 2 as const },
    { id: 'c8', no: '8.', label: 'Service Credits', level: 2 as const },
    { id: 'c9', no: '9.', label: 'Security Incident Notification', level: 2 as const },
    { id: 'c10', no: '10.', label: 'Exclusions', level: 2 as const },
    { id: 'c11', no: '11.', label: 'Remedies and Consumer Rights', level: 2 as const },
    { id: 'c12', no: '12.', label: 'Review, Changes and Contact', level: 2 as const },
];

export default function ServiceLevelAgreement() {
    return (
        <PolicyLayout
            slug="sla"
            title="Service Level Agreement"
            description="Our measurable commitments for ArkyDesk availability and support responsiveness, and your remedies if we miss them."
            toc={toc}
        >
            <section aria-labelledby="c1">
                <H2 id="c1" no="1.">Scope and Incorporation</H2>
                <p>
                    This Service Level Agreement (&ldquo;SLA&rdquo;) forms part of, and is incorporated into, the{' '}
                    <a href="/policy/terms-and-condition">Terms and Conditions</a> between you and Arkynox. It sets
                    out the service levels that apply to the ArkyDesk support platform (the &ldquo;Service&rdquo;),
                    how we measure them, and the credits available if we fail to meet them.
                </p>
                <p>
                    This SLA applies to all workspaces on paid plans. Free-tier workspaces receive best-efforts
                    support and are not eligible for service credits, though we apply the same operational standards
                    to them internally.
                </p>
            </section>

            <section aria-labelledby="c2">
                <H2 id="c2" no="2.">Definitions</H2>
                <ul>
                    <li><strong>Business Hours</strong> means 09:00–18:00 India Standard Time (IST, UTC+5:30), Monday to Friday, excluding Indian public holidays notified on our status page.</li>
                    <li><strong>Monthly Uptime Percentage</strong> means the total minutes in a calendar month, minus Unplanned Downtime, divided by the total minutes in that month, expressed as a percentage.</li>
                    <li><strong>Unplanned Downtime</strong> means minutes in which the Service is unavailable to perform its core function (creating, viewing and updating tickets), excluding Excluded Downtime under Clause 10.</li>
                    <li><strong>First Response</strong> means the first substantive, human reply to a ticket — automated acknowledgements do not count.</li>
                    <li><strong>Resolution</strong> means the ticket is closed with a fix, a workaround accepted by you, or a documented answer to your question.</li>
                </ul>
            </section>

            <section aria-labelledby="c3">
                <H2 id="c3" no="3.">Support Hours and Channels</H2>
                <p>
                    Standard support operates during Business Hours, anchored to IST. Follow-the-sun coverage across
                    our support locations extends effective coverage to approximately 05:30–22:30 IST on business
                    days. Critical (P1) issues are handled 24×7, including weekends and holidays, for paid
                    plans.
                </p>
                <p>Support is provided through:</p>
                <ul>
                    <li>the in-product ticket system (primary channel, and the only channel to which the response targets in Clause 4 apply);</li>
                    <li>the support email address displayed in your workspace, which is converted into a ticket; and</li>
                    <li>the emergency contact route shown inside your workspace for Critical (P1) issues on enterprise plans.</li>
                </ul>
            </section>

            <section aria-labelledby="c4">
                <H2 id="c4" no="4.">Priority Levels and Response Targets</H2>
                <p>
                    Every ticket is assigned a priority by our support team based on the definitions below. Response
                    targets are measured during Business Hours except for Critical issues, which are measured around
                    the clock.
                </p>
                <DataTable
                    caption="Priority matrix"
                    head={['Priority', 'Definition', 'First response', 'Resolution target']}
                    firstColHeader
                    rows={[
                        ['Critical (P1)', 'Service down or core function unusable for all users; no workaround; or a confirmed security incident affecting your data', '2 hours, 24×7', 'Continuous effort until resolved'],
                        ['High (P2)', 'Core function severely degraded, or a major feature unusable, with no reasonable workaround', '4 Business Hours', '1 business day'],
                        ['Normal (P3)', 'Standard product issue with a workaround; general product questions', '24 Business Hours', '5 business days'],
                        ['Low (P4)', 'Minor issues, cosmetic defects, documentation requests, feature requests', '72 Business Hours', 'Scheduled with our product roadmap'],
                    ]}
                />
                <Note tone="info" title="Measurement">
                    &ldquo;Business Hours&rdquo; targets pause outside Business Hours and resume at the next
                    Business Hour. With Business Hours defined as 09:00&ndash;18:00 IST, Monday to Friday, a
                    Normal (P3) ticket with a 24 Business Hour first-response target raised at 17:00 IST on a
                    Friday accrues one hour that day, then nine hours on each of Monday, Tuesday and Wednesday,
                    so the response is due by 14:00 IST on the Wednesday of the following week.
                </Note>
            </section>

            <section aria-labelledby="c5">
                <H2 id="c5" no="5.">Service Availability</H2>
                <p>
                    We commit to a Monthly Uptime Percentage of at least <strong>99.9%</strong> for the Service,
                    measured per calendar month and excluding Excluded Downtime. We publish real-time and historical
                    availability on our status page, and we report the previous month&rsquo;s figures inside the
                    Service.
                </p>
                <p>Our standing internal performance indicators are:</p>
                <ul>
                    <li>at least 95% of first responses within the Clause 4 targets;</li>
                    <li>at least 90% of tickets resolved within their resolution target; and</li>
                    <li>a customer satisfaction score of at least 4.5 out of 5, measured on closed tickets.</li>
                </ul>
            </section>

            <section aria-labelledby="c6">
                <H2 id="c6" no="6.">Maintenance</H2>
                <H3 id="c6-1" no="6.1">Planned maintenance</H3>
                <p>
                    We schedule planned maintenance outside Business Hours wherever practicable and give at least 72
                    hours&rsquo; advance notice on the status page and, for disruptive maintenance, by email.
                    Planned maintenance windows never exceed four (4) hours and are excluded from the uptime
                    calculation.
                </p>
                <H3 id="c6-2" no="6.2">Emergency maintenance</H3>
                <p>
                    Where urgent action is needed to protect the Service or your data — for example, deploying a
                    security patch — we may perform maintenance without prior notice. We will notify you as soon as
                    practicable and keep the disruption as short as possible.
                </p>
            </section>

            <section aria-labelledby="c7">
                <H2 id="c7" no="7.">Escalation</H2>
                <p>Tickets move through a defined escalation path:</p>
                <ol>
                    <li><strong>Level 1 — Support Agent:</strong> first response within the Clause 4 target; triage, known-issue resolution, documentation.</li>
                    <li><strong>Level 2 — Support Specialist:</strong> engaged automatically when an L1 target is at risk, or on request; deeper technical investigation.</li>
                    <li><strong>Level 3 — Subject-Matter Expert:</strong> product or infrastructure specialists for complex defects.</li>
                    <li><strong>Engineering:</strong> code-level fixes, with a workaround provided wherever one exists while the fix is developed.</li>
                </ol>
                <p>
                    You may request escalation at any time by replying to the ticket. Escalation does not reset the
                    applicable response or resolution clocks.
                </p>
            </section>

            <section aria-labelledby="c8">
                <H2 id="c8" no="8.">Service Credits</H2>
                <p>
                    If Monthly Uptime Percentage falls below 99.9% in a calendar month, you are entitled to a credit
                    against your next invoice, calculated as a percentage of the monthly fee for the affected
                    workspace:
                </p>
                <DataTable
                    caption="Availability service credits"
                    head={['Monthly uptime', 'Service credit']}
                    firstColHeader
                    rows={[
                        ['99.0% – 99.89%', '10% of the monthly fee'],
                        ['95.0% – 98.99%', '25% of the monthly fee'],
                        ['Below 95.0%', '50% of the monthly fee'],
                    ]}
                />
                <p>
                    To claim a credit, open a ticket referencing this SLA within thirty (30) days of the end of the
                    affected month. Credits are verified against our monitoring records, are applied to future
                    invoices, and are not redeemable for cash. Service credits are capped at 50% of the monthly fee
                    for the affected workspace in any month.
                </p>
            </section>

            <section aria-labelledby="c9">
                <H2 id="c9" no="9.">Security Incident Notification</H2>
                <p>
                    If we confirm a personal data breach affecting your data, we will notify you without undue delay
                    and, where the law of your jurisdiction sets a deadline, within that deadline — including the
                    72-hour windows under the GDPR, UK GDPR and India&rsquo;s Digital Personal Data Protection
                    Rules, 2025 (which additionally require us to give affected users at least 48 hours&rsquo;
                    notice before erasure-related steps where applicable). Our handling of security events follows
                    our ISO/IEC 27001:2022-aligned incident management process, as described in Clause 6 of the{' '}
                    <a href="/policy/privacy-policy">Privacy Policy</a>.
                </p>
            </section>

            <section aria-labelledby="c10">
                <H2 id="c10" no="10.">Exclusions</H2>
                <p>
                    This SLA does not apply to, and no downtime or delay counts towards a breach of it, where caused
                    by:
                </p>
                <ul>
                    <li>planned or emergency maintenance carried out in accordance with Clause 6;</li>
                    <li>factors outside our reasonable control, including internet backbone failures, force majeure events, war, epidemics, or government-ordered network restrictions;</li>
                    <li>your equipment, software, network configuration or connectivity;</li>
                    <li>third-party services or integrations not operated by Arkynox;</li>
                    <li>your breach of the Terms or the Acceptable Use Policy, or suspension under Clause 13.3 of the Terms; or</li>
                    <li>beta, preview or trial features identified as such.</li>
                </ul>
            </section>

            <section aria-labelledby="c11">
                <H2 id="c11" no="11.">Remedies and Consumer Rights</H2>
                <p>
                    Service credits under Clause 8 are your primary financial remedy for availability failures. Where
                    uptime falls below 95.0% in three (3) consecutive months, you may additionally terminate the
                    affected paid plan for material breach and receive a pro-rata refund of prepaid, unused fees.
                </p>
                <Note tone="legal" title="Statutory remedies preserved">
                    Nothing in this SLA limits remedies you cannot lawfully be asked to give up — including, in
                    India, relief under the Consumer Protection Act, 2019; in the United Kingdom, the requirement
                    that services be performed with reasonable care and skill under the Consumer Rights Act 2015; in
                    Australia, the consumer guarantees under the Australian Consumer Law; and equivalent mandatory
                    rights in the EU, Japan, Canada, Mexico and Brazil.
                </Note>
            </section>

            <section aria-labelledby="c12">
                <H2 id="c12" no="12.">Review, Changes and Contact</H2>
                <p>
                    We review this SLA at least annually as part of our management review process. Changes follow
                    the notice procedure in Clause 16 of the Terms and will never reduce the commitments applicable
                    to a paid plan during its current billing term.
                </p>
                <p>
                    Questions about this SLA, credit claims, or escalation requests: open a ticket in your workspace
                    or email <a href={`mailto:${POLICY_CONTACTS.legal}`}>{POLICY_CONTACTS.legal}</a>.
                </p>
            </section>
        </PolicyLayout>
    );
}
