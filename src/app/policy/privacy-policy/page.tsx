import type { Metadata } from 'next';
import PolicyLayout from '@/components/policy/PolicyLayout';
import { H2, H3 } from '@/components/policy/PolicyHeading';
import Clause from '@/components/policy/Clause';
import Note from '@/components/policy/Note';
import DataTable from '@/components/policy/DataTable';
import JurisdictionExplorer from '@/components/policy/JurisdictionExplorer';
import { POLICY_CONTACTS } from '@/lib/policy/policies';

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description:
        'How Arkynox collects, uses, shares, and protects personal data, how to exercise your rights, and how we notify breaches under the DPDP Act 2023 and the laws of the jurisdictions we serve.',
    alternates: { canonical: '/policy/privacy-policy' },
};

const toc = [
    { id: 'c1', no: '1.', label: 'Introduction and Scope', level: 2 as const },
    { id: 'c2', no: '2.', label: 'Our Roles', level: 2 as const },
    { id: 'c3', no: '3.', label: 'Personal Data We Collect', level: 2 as const },
    { id: 'c4', no: '4.', label: 'How We Use Personal Data', level: 2 as const },
    { id: 'c5', no: '5.', label: 'How We Share Personal Data', level: 2 as const },
    { id: 'c6', no: '6.', label: 'International Data Transfers', level: 2 as const },
    { id: 'c7', no: '7.', label: 'Your Rights', level: 2 as const },
    { id: 'c8', no: '8.', label: 'Grievance Redressal and Appeals', level: 2 as const },
    { id: 'c9', no: '9.', label: 'Automated Decision-Making', level: 2 as const },
    { id: 'c10', no: '10.', label: 'Security of Personal Data', level: 2 as const },
    { id: 'c11', no: '11.', label: 'Children’s Data', level: 2 as const },
    { id: 'c12', no: '12.', label: 'Breach Notification', level: 2 as const },
    { id: 'c13', no: '13.', label: 'Cookies and Analytics', level: 2 as const },
    { id: 'c14', no: '14.', label: 'Changes to This Policy', level: 2 as const },
    { id: 'c15', no: '15.', label: 'Contact and Jurisdiction Annex', level: 2 as const },
];

export default function PrivacyPolicy() {
    return (
        <PolicyLayout
            slug="privacy"
            title="Privacy Policy"
            description="What personal data we collect, why we process it, who we share it with, and how you exercise your rights in every market we serve."
            toc={toc}
        >
            <section aria-labelledby="c1">
                <H2 id="c1" no="1.">Introduction and Scope</H2>
                <p>
                    This Privacy Policy explains how Arkynox handles personal data when you use the ArkyDesk
                    support platform. It is written to comply with the Digital Personal Data Protection Act, 2023
                    and the Digital Personal Data Protection Rules, 2025 in India, the EU General Data Protection
                    Regulation (GDPR) and comparable laws in our other markets.
                </p>
                <p>
                    <strong>Effective date:</strong> 1 October 2026. It applies to the ArkyDesk web application
                    and any related service we operate. It does not cover third-party websites, products, or
                    services that we link to; those are governed by their own privacy notices.
                </p>
                <p>
                    Our <a href="/policy/data-retention">Data Retention Policy</a> states how long we keep each
                    category of data, and our <a href="/policy/terms-and-condition">Terms and Conditions</a> govern
                    your use of the Service.
                </p>
            </section>

            <section aria-labelledby="c2">
                <H2 id="c2" no="2.">Our Roles</H2>
                <p>
                    Under the DPDP Act, the GDPR, and equivalent laws, our role can differ by activity. We may
                    act as:
                </p>
                <ul>
                    <li>
                        <strong>Data Fiduciary</strong> for account registration, support records, and service
                        communications, where we decide why and how your data is processed;
                    </li>
                    <li>
                        <strong>Data Processor</strong> on behalf of business customers who use ArkyDesk as their
                        support platform, where the customer decides the purposes of processing; or
                    </li>
                    <li>
                        <strong>Intermediary</strong> under the Information Technology Act, 2000, with the
                        corresponding duties described in our <a href="/policy/acceptable-use">Acceptable Use
                        Policy</a>.
                    </li>
                </ul>
                <p>
                    Our Data Protection Officer (or Data Protection Contact) can be reached at{' '}
                    <a href={`mailto:${POLICY_CONTACTS.dpo}`}>{POLICY_CONTACTS.dpo}</a>. Where we act as a
                    processor, the customer&rsquo;s own notice applies to end users, and we process data only on
                    documented instructions from that customer.
                </p>
            </section>

            <section aria-labelledby="c3">
                <H2 id="c3" no="3.">Personal Data We Collect</H2>
                <H3 id="c3-1" no="3.1">Data you provide</H3>
                <ul>
                    <li>
                        <strong>Account data.</strong> Name, work email address, organisation, role, country, and
                        account preferences. We collect your country because it determines which privacy laws
                        apply to you.
                    </li>
                    <li>
                        <strong>Support content.</strong> The text, files, screenshots, and other material you
                        submit in tickets, together with our replies. This may incidentally contain personal
                        data about other people, such as the individuals you are supporting.
                    </li>
                    <li>
                        <strong>Billing data.</strong> Billing address, company tax identifiers, and transaction
                        records. We do not store full payment card numbers; card details are handled by our
                        payment processor.
                    </li>
                    <li>
                        <strong>Communications.</strong> Your email address and the content of any support,
                        security, or sales correspondence with us.
                    </li>
                </ul>
                <H3 id="c3-2" no="3.2">Data we collect automatically</H3>
                <ul>
                    <li>
                        <strong>Device and log data.</strong> IP address, browser type and version, operating
                        system, language, screen dimensions, timestamps of your sessions, and the pages or features
                        you use.
                    </li>
                    <li>
                        <strong>Security and audit logs.</strong> Authentication events, failed login attempts,
                        privilege changes, administrative actions, and tamper-evident audit trails. We may
                        correlate these with your identity to investigate abuse or compromise.
                    </li>
                    <li>
                        <strong>Service performance data.</strong> Latency, error rates, and aggregate usage
                        patterns used to operate and improve the Service.
                    </li>
                </ul>
                <H3 id="c3-3" no="3.3">Data we do not collect</H3>
                <p>
                    We do not intentionally collect special categories of data as defined by the GDPR, such as
                    health, biometric, or political opinions. Please do not submit such data to the Service. If
                    you are a business customer, you must not upload special category data about your end users to
                    ArkyDesk.
                </p>
            </section>

            <section aria-labelledby="c4">
                <H2 id="c4" no="4.">How We Use Personal Data</H2>
                <p>
                    We process personal data for the specific purposes below, and no other. Under the DPDP Act we
                    rely on your consent, or on the performance of a contract with you, or on our compliance with
                    a legal obligation, or on our legitimate interests in operating a secure support platform.
                    Consent, where used, is limited to the purpose for which it was given.
                </p>
                <DataTable
                    caption="Purposes and legal bases"
                    head={['Purpose', 'Examples', 'Basis (DPDP / GDPR)']}
                    firstColHeader
                    colClassName={[undefined, undefined, 'whitespace-nowrap']}
                    rows={[
                        ['Provide and operate the Service', 'Create accounts, authenticate users, create and route tickets, send notifications', 'Performance of a contract; legitimate interests'],
                        ['Support and resolve requests', 'Investigate defects, escalate issues, implement fixes', 'Performance of a contract; legitimate interests'],
                        ['Manage billing and accounts', 'Invoices, tax records, plan changes, dunning', 'Performance of a contract; legal obligation'],
                        ['Secure the Service', 'Fraud and abuse prevention, security monitoring, audit logging', 'Legitimate interests; legal obligation'],
                        ['Comply with law and enforce rights', 'Grievance handling, court and government orders, legal holds', 'Legal obligation'],
                        ['Improve the Service', 'Aggregate analytics, product research, error diagnosis', 'Legitimate interests; consent for analytics cookies where required'],
                        ['Communicate with you', 'Service notices, security alerts, policy changes, product updates you have requested', 'Performance of a contract; legitimate interests'],
                        ['Meet additional statutory duties', 'DPDP compliance, security-log retention, local tax and record-keeping', 'Legal obligation'],
                    ]}
                />
                <p>
                    We do not sell your personal data, and we do not share it for cross-context behavioural
                    advertising. We do not use your support content to train third-party models.
                </p>
            </section>

            <section aria-labelledby="c5">
                <H2 id="c5" no="5.">How We Share Personal Data</H2>
                <p>We share personal data only with the following categories of recipient:</p>
                <ul>
                    <li>
                        <strong>Service providers</strong> who host our infrastructure, deliver email, and provide
                        payments, monitoring, and customer support tooling. They are bound by contract to process
                        data only on our instructions, to keep it confidential, and to apply security controls
                        consistent with ours.
                    </li>
                    <li>
                        <strong>Your business and its authorised users</strong>, if your account belongs to an
                        organisation. Organisation administrators can see the tickets and user activity within
                        their workspace.
                    </li>
                    <li>
                        <strong>Professional advisers and authorities</strong> where disclosure is required by
                        law, necessary for the establishment or defence of legal claims, or required to respond to
                        a court, regulator, or government order.
                    </li>
                    <li>
                        <strong>Successors</strong> in connection with a merger, reorganisation, or sale of assets,
                        subject to confidentiality obligations and notice to you.
                    </li>
                    <li>
                        <strong>Other users of the Service</strong> only where you have deliberately published
                        information, for example a community answer on a shared knowledge-base article.
                    </li>
                </ul>
                <p>
                    We maintain a current list of our subprocessors and give notice of changes in accordance with
                    Clause 6. We do not sell personal data to third parties for monetary consideration.
                </p>
            </section>

            <section aria-labelledby="c6">
                <H2 id="c6" no="6.">International Data Transfers</H2>
                <p>
                    Arkynox operates internationally, and data may be processed outside your country. Where we
                    transfer personal data across borders we comply with the transfer rules of the exporting
                    jurisdiction, which generally require an adequacy decision, standard contractual clauses, or
                    another approved safeguard, plus a documented transfer impact assessment.
                </p>
                <Clause no="6.1" title="India">
                    <p>
                        Under the DPDP Act, personal data may be transferred outside India where a Data Fiduciary
                        has taken reasonable steps to ensure the recipient&rsquo;s processing is consistent with
                        data-principal rights. Significant Data Fiduciaries are subject to additional restrictions
                        on transfers to countries notified by the Government of India. We apply data minimisation
                        and contractually equivalent protections to every international transfer.
                    </p>
                </Clause>
                <Clause no="6.2" title="European Economic Area and United Kingdom">
                    <p>
                        For transfers from the EEA we rely on the European Commission&rsquo;s Standard Contractual
                        Clauses and on the UK International Data Transfer Addendum, supplemented by encryption in
                        transit and at rest, least-privilege access, and a transfer impact assessment. Data may be
                        stored in India or the United States; see the Annex for regional detail.
                    </p>
                </Clause>
                <Clause no="6.3" title="Other jurisdictions">
                    <p>
                        In jurisdictions that require prior notification or registration for inbound transfers,
                        including South Korea, Russia, Indonesia, and Sri Lanka, we make the required filings to
                        the competent authority before transferring data. Where local law requires data to remain
                        in-country, we use in-country storage.
                    </p>
                </Clause>
            </section>

            <section aria-labelledby="c7">
                <H2 id="c7" no="7.">Your Rights</H2>
                <p>
                    You have the following rights. Where a right is subject to a statutory limit, we explain the
                    limit when we respond.
                </p>
                <DataTable
                    caption="Data principal rights and how to exercise them"
                    head={['Right', 'What it means', 'How to exercise it']}
                    firstColHeader
                    colClassName={['whitespace-nowrap', undefined, undefined]}
                    rows={[
                        ['Access and information', 'Confirmation of processing, the categories of data, the purposes, and a copy of the data', 'Write to our DPO, or use the export function in your account'],
                        ['Correction', 'Correct incomplete or inaccurate personal data', 'Edit your profile or ticket content directly, or ask us'],
                        ['Erasure', 'Deletion of personal data when the purpose is served, the data is not legally required, or consent is withdrawn and no other basis applies', 'Email our DPO; we give at least 48 hours’ notice before erasure as required by the DPDP Rules, 2025'],
                        ['Nomination', 'Register someone to exercise rights on your behalf in the event of death or incapacity', 'Email our DPO with the nominee’s details and proof of authority'],
                        ['Grievance redressal', 'Have a complaint about our processing investigated and resolved', 'Use the escalation route in Clause 8'],
                        ['Data portability', 'Receive certain data in a structured, machine-readable form where prescribed', 'Use the in-app export; request other formats from the DPO'],
                        ['Withdraw consent', 'Withdraw consent at any time, as easily as it was given, without affecting processing already carried out', 'Use the consent controls in your account or email the DPO'],
                        ['Object / restrict processing', 'Object to processing based on legitimate interests, and request restriction of processing', 'Email the DPO; we respond within the applicable window'],
                        ['Complain to a regulator', 'Lodge a complaint with your supervisory authority, including the Data Protection Board of India', 'Contact the regulator directly; we do not discourage this'],
                    ]}
                />
                <Note tone="info" title="Verification">
                    To protect your data, we verify the identity of a requester before acting. We accept
                    verification from the email address on the account, or from the account&rsquo;s existing
                    sign-in session. We may ask for further confirmation where a request would disclose another
                    person&rsquo;s data.
                </Note>
            </section>

            <section aria-labelledby="c8">
                <H2 id="c8" no="8.">Grievance Redressal and Appeals</H2>
                <p>
                    If you are not satisfied with how we have handled your personal data, contact our DPO at{' '}
                    <a href={`mailto:${POLICY_CONTACTS.dpo}`}>{POLICY_CONTACTS.dpo}</a>. We acknowledge
                    grievances within forty-eight (48) hours and aim to resolve them within the statutory window
                    (up to ninety (90) days in India under the DPDP Rules, 2025, and one month in the EEA and UK).
                </p>
                <p>
                    Our Grievance Officer and Grievance Nodal Officer maintain records of grievances received,
                    their nature, the steps taken to resolve them, and the time taken. If you are dissatisfied with
                    the outcome, you may escalate to our Data Protection Officer, and you always retain the right
                    to complain to a regulator. We never penalise or discriminate against you for raising a
                    concern in good faith.
                </p>
            </section>

            <section aria-labelledby="c9">
                <H2 id="c9" no="9.">Automated Decision-Making</H2>
                <p>
                    We use automated systems to triage and route tickets, to detect spam and abuse, and to
                    generate suggested replies for agents, who review and edit any reply before it is sent. These
                    processes do not produce legal or similarly significant effects on you, and they do not
                    determine eligibility for the Service.
                </p>
                <p>
                    Where a significant automated decision is made about you, we will inform you, provide a
                    meaningful explanation of the logic involved and its consequences, and give you the opportunity
                    to have a human review the outcome and to contest the decision. Contact the DPO to request
                    human review.
                </p>
            </section>

            <section aria-labelledby="c10">
                <H2 id="c10" no="10.">Security of Personal Data</H2>
                <p>
                    We operate an information security management system aligned to ISO/IEC 27001:2022 and
                    operate security controls drawn from Annex A of that standard. The measures include:
                </p>
                <ul>
                    <li>encryption in transit using TLS and at rest for databases, backups, and archives;</li>
                    <li>role-based access control with least privilege, mandatory multi-factor authentication for privileged and production access, and quarterly access reviews (Controls 5.15, 5.18, 8.2);</li>
                    <li>separation of development, test, and production environments, and no production personal data in test environments;</li>
                    <li>centralised, tamper-evident logging, with privileged activity recorded and monitored (Control 8.15, 8.16);</li>
                    <li>vulnerability scanning, dependency management, patch management, and an annual penetration test by an independent firm;</li>
                    <li>vendor risk assessment and security clauses in every processor contract, with periodic reassessment (Control 5.19);</li>
                    <li>staff security awareness training, background screening for staff in sensitive roles, and disciplinary consequences for violations (Control 6.3, 7.2);</li>
                    <li>business continuity, backup, and tested disaster-recovery arrangements, with recovery objectives aligned to the commitments in our <a href="/policy/sla">Service Level Agreement</a> (Controls 5.29–5.30);</li>
                    <li>documented incident response, with defined severity, escalation, and communication procedures (Clause 5.24–5.28).</li>
                </ul>
                <p>
                    No system is perfectly secure. If you become aware of a vulnerability in the Service, please
                    report it to{' '}
                    <a href={`mailto:${POLICY_CONTACTS.security}`}>{POLICY_CONTACTS.security}</a> and refer to
                    the safe-harbour terms in our Acceptable Use Policy.
                </p>
            </section>

            <section aria-labelledby="c11">
                <H2 id="c11" no="11.">Children&rsquo;s Data</H2>
                <p>
                    ArkyDesk is a business support platform and is not directed to children. We do not
                    knowingly collect personal data from anyone under eighteen (18) years of age. If you believe a
                    child has provided us with personal data, contact{' '}
                    <a href={`mailto:${POLICY_CONTACTS.privacy}`}>{POLICY_CONTACTS.privacy}</a> and we will
                    delete it.
                </p>
                <p>
                    Where we process children&rsquo;s data in connection with a business customer&rsquo;s use of the
                    Service, we process it only with the verifiable consent of a parent or guardian, we do not
                    use it for behavioural advertising, and we do not process it in a way that is detrimental to
                    the child&rsquo;s wellbeing, as required by Section 9 of the DPDP Act and the Data Privacy
                    Act, 2012 in the Philippines, which sets the age threshold at thirteen (13) for consent-based
                    processing in India&rsquo;s implementation guidance.
                </p>
            </section>

            <section aria-labelledby="c12">
                <H2 id="c12" no="12.">Breach Notification</H2>
                <p>
                    A personal data breach is any security incident that leads to accidental or unlawful
                    destruction, loss, alteration, unauthorised disclosure of, or access to personal data. On
                    becoming aware of a breach, we contain it, investigate it, and notify the affected people and
                    the competent authority within the applicable statutory deadline. The deadlines that most often
                    apply to us are set out below.
                </p>
                <DataTable
                    caption="Personal data breach notification deadlines"
                    head={['Jurisdiction', 'Deadline', 'Recipients']}
                    firstColHeader
                    colClassName={['whitespace-nowrap', 'whitespace-nowrap', undefined]}
                    rows={[
                        ['India (DPDP Act, 2023 and Rules, 2025)', 'As prescribed by the Rules, without delay', 'Data Protection Board of India and affected Data Principals'],
                        ['EU / EEA (GDPR Art. 33–34)', '72 hours to the supervisory authority; without undue delay to data subjects', 'Lead supervisory authority and affected individuals'],
                        ['United Kingdom', '72 hours to the Information Commissioner’s Office', 'ICO and affected individuals'],
                        ['United States', 'Varies by state; generally without unreasonable delay', 'Affected state regulators and individuals, where required'],
                        ['Canada', 'Without unreasonable delay; real risk of significant harm assessed', 'Office of the Privacy Commissioner, provincial regulators, affected individuals'],
                        ['Brazil (LGPD)', '3 business days', 'ANPD and affected data subjects'],
                        ['South Africa (POPIA)', 'Immediately', 'Information Regulator and affected data subjects'],
                        ['Nigeria (Nigeria Data Protection Act, 2023)', 'Within 72 hours of awareness', 'Nigeria Data Protection Commission'],
                        ['Kenya (Data Protection Act, 2019)', 'Within 72 hours of becoming aware', 'Office of the Data Protection Commissioner and the data subject'],
                        ['Australia (Privacy Act 1988)', 'As soon as practicable after we become aware of a serious incident', 'Office of the Australian Information Commissioner'],
                        ['Japan (APPI)', 'Without delay; guidance on the prescribed timeline', 'Personal Information Protection Commission'],
                    ]}
                />
                <p>
                    Where notification is not required, we still record the breach internally and take steps to
                    remedy it. Where we notify, we describe the nature of the breach, the categories and approximate
                    number of people affected, the likely consequences, and the measures taken. Our contractual
                    notice commitments to customers are set out in the Security Incident clause of our{' '}
                    <a href="/policy/sla">Service Level Agreement</a>.
                </p>
            </section>

            <section aria-labelledby="c13">
                <H2 id="c13" no="13.">Cookies and Analytics</H2>
                <p>
                    We use strictly necessary cookies to keep you signed in, to remember security preferences, and
                    to prevent abuse. These operate without consent because the service cannot function without
                    them. Where required by law — notably in the EEA, the UK, and under the LGPD and the EU ePrivacy
                    rules — we use a consent banner and apply analytics and marketing cookies only after you
                    consent. You can change your choices at any time in the cookie settings inside the product.
                </p>
                <p>
                    We do not use third-party advertising cookies, and we do not build cross-site profiles of our
                    users. Where we use analytics, the data is aggregated and IP addresses are truncated before
                    storage.
                </p>
            </section>

            <section aria-labelledby="c14">
                <H2 id="c14" no="14.">Changes to This Policy</H2>
                <p>
                    We update this policy when our processing changes or when the law changes. The version and
                    effective date are shown at the top of the page, and material changes are notified in writing
                    to account administrators at least fifteen (15) days before they take effect. Where a change
                    is required by law, it takes effect as soon as the law requires.
                </p>
            </section>

            <section aria-labelledby="c15">
                <H2 id="c15" no="15.">Contact and Jurisdiction Annex</H2>
                <p>
                    To exercise any right, raise a concern, or ask a privacy question, email our Data Protection
                    Officer at <a href={`mailto:${POLICY_CONTACTS.dpo}`}>{POLICY_CONTACTS.dpo}</a>, our privacy
                    team at <a href={`mailto:${POLICY_CONTACTS.privacy}`}>{POLICY_CONTACTS.privacy}</a>, or our
                    Grievance Officer at{' '}
                    <a href={`mailto:${POLICY_CONTACTS.grievance}`}>{POLICY_CONTACTS.grievance}</a>. The
                    sub-processor list, and the specific regulator, DPO, transfer, and breach-notification
                    requirements that apply in your country, are available in the annex below.
                </p>
                <JurisdictionExplorer showRights />
            </section>
        </PolicyLayout>
    );
}
