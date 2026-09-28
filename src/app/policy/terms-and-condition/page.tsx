import type { Metadata } from 'next';
import PolicyLayout from '@/components/policy/PolicyLayout';
import { H2, H3 } from '@/components/policy/PolicyHeading';
import Note from '@/components/policy/Note';
import DataTable from '@/components/policy/DataTable';
import { POLICY_CONTACTS } from '@/lib/policy/policies';

export const metadata: Metadata = {
    title: 'Terms and Conditions',
    description:
        'The legal agreement between you and Arkynox for use of the ArkyDesk support platform, governed by the laws of India with per-country consumer protections preserved.',
    alternates: { canonical: '/policy/terms-and-condition' },
};

const toc = [
    { id: 'c1', no: '1.', label: 'Acceptance of Terms', level: 2 as const },
    { id: 'c2', no: '2.', label: 'Service Description and Scope', level: 2 as const },
    { id: 'c3', no: '3.', label: 'Accounts and Authority', level: 2 as const },
    { id: 'c4', no: '4.', label: 'Charges, SLA and Related Policies', level: 2 as const },
    { id: 'c5', no: '5.', label: 'Acceptable Use', level: 2 as const },
    { id: 'c6', no: '6.', label: 'Customer Content and Licence', level: 2 as const },
    { id: 'c7', no: '7.', label: 'Intellectual Property and Feedback', level: 2 as const },
    { id: 'c8', no: '8.', label: 'Confidentiality', level: 2 as const },
    { id: 'c9', no: '9.', label: 'Data Protection and Privacy', level: 2 as const },
    { id: 'c10', no: '10.', label: 'Warranties and Disclaimers', level: 2 as const },
    { id: 'c11', no: '11.', label: 'Indemnification', level: 2 as const },
    { id: 'c12', no: '12.', label: 'Limitation of Liability', level: 2 as const },
    { id: 'c13', no: '13.', label: 'Term, Suspension and Termination', level: 2 as const },
    { id: 'c14', no: '14.', label: 'Governing Law and Dispute Resolution', level: 2 as const },
    { id: 'c15', no: '15.', label: 'Eligibility and Age of Majority', level: 2 as const },
    { id: 'c16', no: '16.', label: 'Changes to These Terms', level: 2 as const },
    { id: 'c17', no: '17.', label: 'Notices and Contact', level: 2 as const },
];

export default function TermsAndCondition() {
    return (
        <PolicyLayout
            slug="terms-and-condition"
            title="Terms and Conditions"
            description="The agreement between you and Arkynox that governs your access to and use of the ArkyDesk support platform."
            toc={toc}
        >
            <section aria-labelledby="c1">
                <H2 id="c1" no="1.">Acceptance of Terms</H2>
                <p>
                    These Terms and Conditions (&ldquo;Terms&rdquo;) form a legally binding agreement between you
                    (&ldquo;you,&rdquo; &ldquo;your,&rdquo; or the &ldquo;Customer&rdquo;) and Arkynox
                    (&ldquo;Arkynox,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), a company
                    incorporated in India. They govern your access to and use of the ArkyDesk customer support
                    platform, including any related websites, applications, APIs and services (collectively, the
                    &ldquo;Service&rdquo;).
                </p>
                <p>
                    By creating an account, submitting a ticket, or otherwise accessing or using the Service, you
                    confirm that you have read, understood and agree to be bound by these Terms, together with our
                    Privacy Policy, Acceptable Use Policy, Data Retention Policy and Service Level Agreement, each
                    of which is incorporated into these Terms by reference. If you do not agree to these Terms, you
                    must not access or use the Service.
                </p>
                <p>
                    If you use the Service on behalf of a company or other legal entity, you represent and warrant
                    that you are authorised to accept these Terms on that entity&rsquo;s behalf, in which case
                    &ldquo;you&rdquo; refers to that entity.
                </p>
            </section>

            <section aria-labelledby="c2">
                <H2 id="c2" no="2.">Service Description and Scope</H2>
                <p>
                    ArkyDesk is a customer support ticket management platform. The Service enables you to:
                </p>
                <ul>
                    <li>create, track and manage support tickets;</li>
                    <li>communicate with support staff and, where you operate a workspace, with your own customers;</li>
                    <li>exchange files and attachments relevant to a support request;</li>
                    <li>receive status notifications and escalation updates;</li>
                    <li>access knowledge base and self-service resources; and</li>
                    <li>use administrative, reporting and audit functions made available on your plan.</li>
                </ul>
                <p>
                    We may add, modify or discontinue features from time to time. Where a change materially reduces
                    the functionality of a paid plan, Clause 16 (Changes to These Terms) applies.
                </p>
            </section>

            <section aria-labelledby="c3">
                <H2 id="c3" no="3.">Accounts and Authority</H2>
                <H3 id="c3-1" no="3.1">Account registration</H3>
                <p>
                    You must provide accurate, current and complete information when registering, and keep that
                    information up to date. You may not maintain more than one account per person without our prior
                    written approval, and you may not register an account on behalf of another person without their
                    authorisation.
                </p>
                <H3 id="c3-2" no="3.2">Credential security</H3>
                <p>
                    You are responsible for maintaining the confidentiality of your credentials and for all activity
                    that occurs under your account. You must use a strong, unique password and enable two-factor
                    authentication where offered. You must notify us immediately at{' '}
                    <a href={`mailto:${POLICY_CONTACTS.security}`}>{POLICY_CONTACTS.security}</a> if you suspect
                    unauthorised access to your account.
                </p>
                <H3 id="c3-3" no="3.3">Authority</H3>
                <p>
                    Where you accept these Terms for an organisation, you confirm you have the legal authority to
                    bind that organisation. We may request evidence of that authority before granting
                    administrative access.
                </p>
            </section>

            <section aria-labelledby="c4">
                <H2 id="c4" no="4.">Charges, SLA and Related Policies</H2>
                <p>
                    Parts of the Service are offered free of charge and parts under paid plans. Fees, billing cycles
                    and plan limits are described at the point of purchase and are exclusive of applicable taxes,
                    including GST where charged under Indian law. Service levels, response-time targets and service
                    credits are set out in our <a href="/policy/sla">Service Level Agreement</a>, which forms part
                    of these Terms. How we handle personal data is described in our{' '}
                    <a href="/policy/privacy-policy">Privacy Policy</a>, and the rules of conduct for the platform
                    in our <a href="/policy/acceptable-use">Acceptable Use Policy</a>.
                </p>
            </section>

            <section aria-labelledby="c5">
                <H2 id="c5" no="5.">Acceptable Use</H2>
                <p>
                    You may use the Service only for lawful purposes and in accordance with these Terms and the{' '}
                    <a href="/policy/acceptable-use">Acceptable Use Policy</a>. In summary, and without limiting
                    that policy, you agree not to:
                </p>
                <ul>
                    <li>submit false, misleading, fraudulent or spam tickets;</li>
                    <li>upload malware, viruses or other harmful code;</li>
                    <li>attempt to gain unauthorised access to the Service or its underlying systems;</li>
                    <li>harass, abuse, threaten or impersonate our staff or other users;</li>
                    <li>scrape, crawl or bulk-extract data from the Service by automated means;</li>
                    <li>reverse engineer or attempt to derive source code, except where such restriction is prohibited by applicable law;</li>
                    <li>share credentials with unauthorised persons or resell access to the Service; or</li>
                    <li>use the Service in any way that violates applicable law, including the Information Technology Act, 2000 (India) and the rules made under it.</li>
                </ul>
            </section>

            <section aria-labelledby="c6">
                <H2 id="c6" no="6.">Customer Content and Licence</H2>
                <p>
                    You retain all ownership rights in the content you submit to the Service, including ticket text,
                    attachments and account data (&ldquo;Customer Content&rdquo;). You grant Arkynox a
                    non-exclusive, worldwide, royalty-free licence to host, store, process, transmit and display
                    Customer Content solely to the extent necessary to operate, maintain, secure and improve the
                    Service for you, and to comply with law.
                </p>
                <p>
                    You represent and warrant that you own or control the rights to your Customer Content, that it
                    does not infringe any third party&rsquo;s rights, and that its submission to and processing by
                    the Service complies with applicable law. Where Customer Content contains personal data of third
                    parties, you confirm you have a lawful basis to share it with us.
                </p>
            </section>

            <section aria-labelledby="c7">
                <H2 id="c7" no="7.">Intellectual Property and Feedback</H2>
                <p>
                    The Service, including its software, design, documentation, trademarks and all improvements, is
                    and remains the exclusive property of Arkynox and its licensors, protected under the Copyright
                    Act, 1957 (India), the Trade Marks Act, 1999 (India) and equivalent international laws. Except
                    for the limited right to use the Service under these Terms, no rights are granted to you.
                </p>
                <p>
                    If you provide suggestions, ideas or feedback about the Service, you grant us a perpetual,
                    irrevocable, royalty-free licence to use and incorporate that feedback without restriction or
                    obligation to you.
                </p>
            </section>

            <section aria-labelledby="c8">
                <H2 id="c8" no="8.">Confidentiality</H2>
                <p>
                    Each party may receive non-public information from the other in connection with the Service.
                    The receiving party will use that information only to perform under these Terms, will protect it
                    with at least the degree of care it applies to its own confidential information (and no less
                    than reasonable care), and will not disclose it to third parties except to personnel and
                    professional advisers bound by equivalent obligations, or as required by law, regulation or a
                    valid order of a court or authority — including, in India, directions issued under Section 69 or
                    Section 69A of the Information Technology Act, 2000.
                </p>
            </section>

            <section aria-labelledby="c9">
                <H2 id="c9" no="9.">Data Protection and Privacy</H2>
                <p>
                    Each party will comply with the data protection laws applicable to it. For personal data
                    processed through the Service, our <a href="/policy/privacy-policy">Privacy Policy</a>{' '}
                    describes what we collect, why, and the rights available to you.
                </p>
                <p>
                    Arkynox is incorporated in India and complies with the Digital Personal Data Protection Act,
                    2023 and the Digital Personal Data Protection Rules, 2025 (notified on 13 November 2025), in
                    each case to the extent the relevant provisions are in force, including the phased obligations
                    that take full effect in November 2026. We additionally align our practices with the principal
                    data protection regimes of the markets we serve, including the EU/UK GDPR, the California
                    CCPA/CPRA, Japan&rsquo;s APPI, Australia&rsquo;s Privacy Act 1988, Canada&rsquo;s PIPEDA and
                    Quebec Law 25, and Mexico&rsquo;s LFPDPPP (2025).
                </p>
                <Note tone="info" title="Cross-border processing">
                    Where we process personal data outside your country of residence, we apply the transfer
                    safeguards described in Clause 5 and Clause 9 of our Privacy Policy, and we honour the data
                    localisation commitments recorded in that policy for jurisdictions that require them.
                </Note>
            </section>

            <section aria-labelledby="c10">
                <H2 id="c10" no="10.">Warranties and Disclaimers</H2>
                <p>
                    We warrant that the Service will materially conform to its published documentation and that we
                    will provide it with reasonable skill and care. Except as expressly stated in these Terms or in
                    the SLA, and to the maximum extent permitted by applicable law, the Service is provided
                    &ldquo;as is&rdquo; and &ldquo;as available,&rdquo; and we disclaim all other warranties, whether
                    express, implied or statutory, including implied warranties of merchantability, fitness for a
                    particular purpose and non-infringement.
                </p>
                <Note tone="legal" title="Your statutory rights are not affected">
                    Nothing in these Terms excludes, restricts or modifies any guarantee, warranty, term, right or
                    remedy you have under the Consumer Protection Act, 2019 (India), the Australian Consumer Law,
                    the UK Consumer Rights Act 2015, the EU Consumer Rights Directive, Japan&rsquo;s Consumer
                    Contract Act, Brazil&rsquo;s Consumer Protection Code, Mexico&rsquo;s Federal Consumer Protection
                    Law, or any other applicable consumer protection law that cannot lawfully be excluded.
                </Note>
            </section>

            <section aria-labelledby="c11">
                <H2 id="c11" no="11.">Indemnification</H2>
                <p>
                    You will indemnify, defend and hold harmless Arkynox, its officers, directors and employees from
                    and against any third-party claims, damages, losses and expenses (including reasonable legal
                    fees) arising out of or relating to: (a) your Customer Content; (b) your breach of these Terms
                    or of the Acceptable Use Policy; or (c) your violation of any law or the rights of any third
                    party. This obligation does not apply to the extent a claim results from our breach of these
                    Terms, our negligence, or our wilful misconduct.
                </p>
            </section>

            <section aria-labelledby="c12">
                <H2 id="c12" no="12.">Limitation of Liability</H2>
                <p>
                    To the maximum extent permitted by applicable law: (a) neither party will be liable for any
                    indirect, incidental, special, consequential or punitive damages, or for any loss of profits,
                    revenue, data, goodwill or business opportunity, arising out of or related to these Terms; and
                    (b) Arkynox&rsquo;s aggregate liability arising out of or related to the Service will not exceed
                    the total fees you paid to us for the Service in the twelve (12) months immediately preceding
                    the event giving rise to the claim.
                </p>
                <p>
                    The limitations in this Clause 12 do not apply to: liability for death or personal injury caused
                    by negligence; fraud or fraudulent misrepresentation; wilful misconduct or gross negligence;
                    your payment obligations; or any liability that cannot be excluded or limited under applicable
                    law, including under Section 14 of the Consumer Protection Act, 2019 (India) or mandatory
                    consumer guarantees in your country of residence.
                </p>
            </section>

            <section aria-labelledby="c13">
                <H2 id="c13" no="13.">Term, Suspension and Termination</H2>
                <H3 id="c13-1" no="13.1">Term</H3>
                <p>
                    These Terms apply from the date you first access the Service and continue until your account is
                    closed or these Terms are terminated in accordance with this Clause.
                </p>
                <H3 id="c13-2" no="13.2">Termination by you</H3>
                <p>
                    You may close your account at any time from your account settings or by contacting us. Closing
                    your account does not entitle you to a refund except where required by law or expressly stated
                    in your plan.
                </p>
                <H3 id="c13-3" no="13.3">Suspension and termination by us</H3>
                <p>
                    We may suspend or restrict your access immediately if we reasonably believe you have breached
                    these Terms or the Acceptable Use Policy, if your use poses a security or legal risk, or if we
                    are required to do so by law or a lawful direction of a government authority. Where practicable
                    and lawful, we will give you notice and an opportunity to cure the breach before suspension.
                </p>
                <H3 id="c13-4" no="13.4">Effect of termination; transition</H3>
                <p>
                    On termination, your right to use the Service ceases. For thirty (30) days following
                    termination, you may request an export of your Customer Content in a commonly used,
                    machine-readable format, after which it will be handled in accordance with our{' '}
                    <a href="/policy/data-retention">Data Retention Policy</a>. Clauses that by their nature should
                    survive termination — including Clauses 7, 8, 11, 12 and 14 — survive.
                </p>
            </section>

            <section aria-labelledby="c14">
                <H2 id="c14" no="14.">Governing Law and Dispute Resolution</H2>
                <p>
                    Arkynox is an Indian company. These Terms, and any dispute or claim arising out of or in
                    connection with them, are governed by the laws of India, and the courts at New Delhi, India have
                    exclusive jurisdiction — <strong>except</strong> where the law of your country of residence
                    gives you, as a consumer, the right to rely on your local law or to bring proceedings in your
                    local courts. The table below records how that works in the principal markets we serve.
                </p>
                <DataTable
                    caption="Governing law and forum by region"
                    head={['Region', 'Governing law', 'Forum / dispute resolution']}
                    firstColHeader
                    rows={[
                        ['India (default)', 'Laws of India', 'Courts at New Delhi; consumer complaints may additionally be filed before the District/State/National Consumer Disputes Redressal Commissions under the Consumer Protection Act, 2019'],
                        ['EU / EEA', 'Law of your country of residence (consumer)', 'Your local courts; Online Dispute Resolution platform where applicable'],
                        ['United Kingdom', 'Laws of England and Wales (or your UK home nation)', 'Your local courts under the Consumer Rights Act 2015'],
                        ['United States', 'State of Delaware', 'Binding individual arbitration; you may opt out in writing within 30 days of accepting these Terms'],
                        ['Canada', 'Law of your province or territory', 'Your provincial courts; PIPEDA/Quebec Law 25 rights unaffected'],
                        ['Mexico', 'Laws of Mexico (consumer)', 'Your local courts; PROFECO conciliation available'],
                        ['Japan', 'Laws of Japan (consumer)', 'Tokyo District Court or your local court under the Consumer Contract Act'],
                        ['Australia', 'Laws of New South Wales (consumer)', 'Your local courts; Australian Consumer Law guarantees unaffected'],
                        ['Brazil', 'Laws of Brazil (consumer)', 'Courts of your domicile under the Consumer Protection Code'],
                        ['All other countries', 'Laws of India', 'Courts at New Delhi, subject to non-excludable local consumer rights'],
                    ]}
                />
                <p>
                    Before commencing formal proceedings, the parties will attempt in good faith to resolve the
                    dispute informally for at least thirty (30) days from written notice of the dispute. You may
                    start that process by emailing{' '}
                    <a href={`mailto:${POLICY_CONTACTS.legal}`}>{POLICY_CONTACTS.legal}</a>.
                </p>
            </section>

            <section aria-labelledby="c15">
                <H2 id="c15" no="15.">Eligibility and Age of Majority</H2>
                <p>
                    You must be at least 18 years old, or the age of majority in your jurisdiction, to use the
                    Service independently. If you are below that age, you may use the Service only with the
                    involvement and consent of a parent or legal guardian who accepts these Terms on your behalf.
                    Representative thresholds: 16 in much of the EU/EEA, 14 in Spain and South Korea, 15 in Japan
                    and France, 13 under COPPA in the United States, 14 in Quebec, and 18 in India, Brazil, Turkey,
                    Nigeria and Kenya. Where a stricter local rule applies to you, that rule prevails.
                </p>
            </section>

            <section aria-labelledby="c16">
                <H2 id="c16" no="16.">Changes to These Terms</H2>
                <p>
                    We may update these Terms from time to time. For material changes, we will give at least thirty
                    (30) days&rsquo; notice by email to the address on your account and by a prominent notice in the
                    Service before the change takes effect. Non-material changes (such as clarifications or
                    corrections) take effect when posted. If you do not agree with a change, you must stop using the
                    Service and may close your account before the change takes effect; continued use after the
                    effective date constitutes acceptance.
                </p>
            </section>

            <section aria-labelledby="c17">
                <H2 id="c17" no="17.">Notices and Contact</H2>
                <p>
                    Legal notices to Arkynox must be sent to{' '}
                    <a href={`mailto:${POLICY_CONTACTS.legal}`}>{POLICY_CONTACTS.legal}</a> with the subject line
                    &ldquo;Legal Notice — Terms and Conditions.&rdquo; Notices to you will be sent to the email
                    address registered on your account. Notices are deemed given when delivered by email without a
                    delivery failure notification.
                </p>
                <p>
                    General questions about these Terms are welcome at the same address; we aim to respond within
                    five (5) business days. For privacy-specific requests, see our{' '}
                    <a href="/policy/privacy-policy">Privacy Policy</a>, which lists our Data Protection Officer and
                    Grievance Officer contacts.
                </p>
            </section>
        </PolicyLayout>
    );
}
