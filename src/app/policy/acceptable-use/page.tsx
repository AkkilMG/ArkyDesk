import type { Metadata } from 'next';
import PolicyLayout from '@/components/policy/PolicyLayout';
import { H2, H3 } from '@/components/policy/PolicyHeading';
import Note from '@/components/policy/Note';
import DataTable from '@/components/policy/DataTable';
import JurisdictionExplorer from '@/components/policy/JurisdictionExplorer';
import { POLICY_CONTACTS } from '@/lib/policy/policies';

export const metadata: Metadata = {
    title: 'Acceptable Use Policy',
    description:
        'The rules for using ArkyDesk lawfully and safely: permitted use, prohibited conduct, content and takedown handling in India, security, and enforcement.',
    alternates: { canonical: '/policy/acceptable-use' },
};

const toc = [
    { id: 'c1', no: '1.', label: 'Purpose and Scope', level: 2 as const },
    { id: 'c2', no: '2.', label: 'Permitted Use', level: 2 as const },
    { id: 'c3', no: '3.', label: 'Prohibited Acts', level: 2 as const },
    { id: 'c4', no: '4.', label: 'Content and Takedown in India', level: 2 as const },
    { id: 'c5', no: '5.', label: 'Account and Credential Security', level: 2 as const },
    { id: 'c6', no: '6.', label: 'Attachments and Files', level: 2 as const },
    { id: 'c7', no: '7.', label: 'Automated Access and AI', level: 2 as const },
    { id: 'c8', no: '8.', label: 'Monitoring and Security Investigations', level: 2 as const },
    { id: 'c9', no: '9.', label: 'Enforcement', level: 2 as const },
    { id: 'c10', no: '10.', label: 'Suspension, Termination and Appeal', level: 2 as const },
    { id: 'c11', no: '11.', label: 'Jurisdictional Requirements', level: 2 as const },
    { id: 'c12', no: '12.', label: 'Changes to This Policy', level: 2 as const },
    { id: 'c13', no: '13.', label: 'Reporting and Contact', level: 2 as const },
];

export default function AcceptableUsePolicy() {
    return (
        <PolicyLayout
            slug="acceptable-use"
            title="Acceptable Use Policy"
            description="What you may and may not do on ArkyDesk, how we handle complaints and takedown requests, and how we enforce these rules."
            toc={toc}
        >
            <section aria-labelledby="c1">
                <H2 id="c1" no="1.">Purpose and Scope</H2>
                <p>
                    This Acceptable Use Policy (the &ldquo;AUP&rdquo;) governs your use of the ArkyDesk support
                    platform, including your account, the tickets you open, the content you submit, and your
                    interactions with our agents and other customers. It forms part of your{' '}
                    <a href="/policy/terms-and-condition">Terms and Conditions</a>.
                </p>
                <p>
                    These rules exist so that ArkyDesk remains lawful, secure, and available. They apply to every
                    user of the Service, including individual users, business accounts, administrators, and any
                    party you authorise to act on your behalf. A business account administrator is responsible for
                    the conduct of the users it provisions.
                </p>
            </section>

            <section aria-labelledby="c2">
                <H2 id="c2" no="2.">Permitted Use</H2>
                <p>You may use the Service to:</p>
                <ul>
                    <li>raise, manage and track legitimate support requests relating to your products or account;</li>
                    <li>exchange correspondence and files with Arkynox and, where enabled, with other authorised participants;</li>
                    <li>upload materials you are entitled to share, subject to Clause 6;</li>
                    <li>export your own tickets, communications and attachments; and</li>
                    <li>use the Service in accordance with applicable law, your subscription tier, and your agreement with us.</li>
                </ul>
            </section>

            <section aria-labelledby="c3">
                <H2 id="c3" no="3.">Prohibited Acts</H2>
                <p>You must not, and must not permit anyone to:</p>
                <H3 id="c3-1" no="3.1">Prohibited content</H3>
                <ul>
                    <li>
                        submit content that is false, misleading, or knowingly inaccurate about a defect, invoice,
                        or incident;
                    </li>
                    <li>
                        upload or request the storage of content that is obscene, sexually explicit, or exploitative of
                        minors, or that glorifies, incites, or threatens violence;
                    </li>
                    <li>
                        upload content that is hateful, harassing, defamatory, or that incites discrimination,
                        enmity, or offence on the basis of caste, religion, race, sex, place of birth, disability,
                        or any other protected characteristic, in each case as understood under applicable law
                        including Sections 66A and 67 of India&rsquo;s Information Technology Act, 2000 and the
                        Bharatiya Nyaya Sanhita, 2023;
                    </li>
                    <li>upload content that infringes the intellectual property or other rights of a third party;</li>
                    <li>
                        upload &ldquo;malware&rdquo; meaning malicious code, ransomware, keyloggers, or anything
                        intended to compromise, damage, or gain unauthorised access to any system or data; or
                    </li>
                    <li>upload regulated data that you are not lawfully entitled to disclose to us, or that we are not lawfully entitled to process.</li>
                </ul>
                <H3 id="c3-2" no="3.2">Prohibited conduct</H3>
                <ul>
                    <li>use the Service for any unlawful purpose, or in breach of any applicable law, including applicable sanctions and export-control regimes;</li>
                    <li>access or attempt to access the Service, another account, or our infrastructure without authorisation, or circumvent any access control;</li>
                    <li>probe, scan, load-test, or conduct vulnerability research against the Service without our written authorisation, and in violation of our safe-harbour terms in Clause 7.3;</li>
                    <li>resell, sublicense, or provide the Service to third parties as a standalone offering;</li>
                    <li>interfere with or disrupt the Service, its infrastructure, or other users&rsquo; access, or attempt to degrade performance;</li>
                    <li>
                        use the Service to harass, intimidate, or impersonate any person, or to misrepresent your
                        identity or the origin of content; or
                    </li>
                    <li>
                        collect, harvest, or extract personal data about other users or customers from the Service,
                        or use personal data received through the Service for direct marketing unrelated to the
                        support relationship; or
                    </li>
                    <li>
                        use the Service in breach of any additional usage limits we communicate, or to build or
                        train a competing product.
                    </li>
                </ul>
            </section>

            <section aria-labelledby="c4">
                <H2 id="c4" no="4.">Content and Takedown in India</H2>
                <p>
                    Because the Service is operated for users in India, we comply with the obligations applicable
                    to us as an intermediary under the Information Technology Act, 2000 and the IT (Intermediary
                    Guidelines and Digital Media Ethics Code) Rules, 2021.
                </p>
                <H3 id="c4-1" no="4.1">Grievance handling</H3>
                <p>
                    We have appointed a Grievance Officer in accordance with Rule 4 of the IT Rules. Complaints
                    about content on the Service, or about a user&rsquo;s conduct, are handled as follows:
                </p>
                <DataTable
                    caption="India grievance timelines"
                    head={['Type of complaint', 'Acknowledgement', 'Resolution time']}
                    firstColHeader
                    colClassName={[undefined, 'whitespace-nowrap', 'whitespace-nowrap']}
                    rows={[
                        ['Complaint about content that was removed in the preceding 36 months', '24 hours', '72 hours'],
                        ['Any other complaint regarding content or conduct', '24 hours', '15 days'],
                        ['Court or government order requiring removal, or restriction on access', '—', '36 hours'],
                    ]}
                />
                <H3 id="c4-2" no="4.2">Government and court orders</H3>
                <p>
                    Where we receive a court order or a government order requiring removal of content, or
                    restriction of access to it, we comply within the time prescribed by law, including the
                    thirty-six (36) hour period in Rule 3(1)(b)(iv) of the IT Rules and orders under Section 69A
                    of the Information Technology Act, 2000. We keep records of such orders and the action taken.
                </p>
                <Note tone="legal" title="No editorial control of your content">
                    We do not pre-screen or edit your support content. Where you are a business customer, you are
                    responsible for the content your users upload to the Service. Removal of content is
                    discretionary except where a lawful order requires it, and we may remove content that breaches
                    this AUP or applicable law.
                </Note>
            </section>

            <section aria-labelledby="c5">
                <H2 id="c5" no="5.">Account and Credential Security</H2>
                <ul>
                    <li>You must provide accurate registration information and keep it current.</li>
                    <li>
                        You are responsible for all activity under your account and for keeping your credentials
                        confidential. Use a strong, unique password and enable multi-factor authentication where
                        offered.
                    </li>
                    <li>
                        You must notify us promptly at{' '}
                        <a href={`mailto:${POLICY_CONTACTS.security}`}>{POLICY_CONTACTS.security}</a> if you
                        suspect unauthorised access to your account, credentials, or any of your data.
                    </li>
                    <li>
                        Do not share credentials between users. Where a business account has multiple users, create
                        named accounts so activity is attributable.
                    </li>
                </ul>
            </section>

            <section aria-labelledby="c6">
                <H2 id="c6" no="6.">Attachments and Files</H2>
                <p>
                    To protect the Service and other users, the following limits apply to attachments on tickets.
                    You must scan and review any file before uploading it.
                </p>
                <DataTable
                    caption="Attachment limits"
                    head={['Limit', 'Value']}
                    firstColHeader
                    colClassName={[undefined, 'whitespace-nowrap']}
                    rows={[
                        ['Maximum size per file', '25 MB'],
                        ['Maximum total attachments per ticket', '100 MB'],
                        ['Accepted types', 'Common documents, images, archives, and plain text'],
                        ['Prohibited', 'Executables, scripts, and any file containing malicious code'],
                    ]}
                />
                <p>
                    Attachments are retained for the period in Clause 3 of the{' '}
                    <a href="/policy/data-retention">Data Retention Policy</a>. Do not include passwords, keys, or
                    other secrets in a ticket. Uploaded files are scanned for malware and are accessible only to the
                    agents and administrators assigned to the relevant request.
                </p>
            </section>

            <section aria-labelledby="c7">
                <H2 id="c7" no="7.">Automated Access and AI</H2>
                <H3 id="c7-1" no="7.1">Automation and scraping</H3>
                <p>
                    You may access the Service programmatically only through a documented integration interface
                    we have made available to you, and within its published rate limits. Crawling, scraping, or
                    bulk-extracting the Service outside such an interface is prohibited.
                </p>
                <H3 id="c7-2" no="7.2">Machine processing of ticket content</H3>
                <p>
                    We may process ticket content using automated systems, including for triage, classification,
                    summarisation, translation, and quality assurance, as described in the{' '}
                    <a href="/policy/privacy-policy">Privacy Policy</a>. You may object to automated decision-making
                    that produces legal or similarly significant effects by contacting us, and we will route your
                    request to a human reviewer.
                </p>
                <H3 id="c7-3" no="7.3">Vulnerability research</H3>
                <Note tone="info" title="Safe harbour">
                    If you are a qualified security researcher acting in good faith, testing for vulnerabilities is
                    authorised by Arkynox where all of the following apply: you do not access data beyond the
                    minimum necessary to demonstrate the issue; you do not degrade the Service; you do not
                    exfiltrate or retain data beyond proof of concept; you do not threaten or extort; you give us a
                    reasonable opportunity to fix the issue; and you do not publicly disclose the issue until we
                    have had 90 days to remediate, or until we have already fixed it. Contact{' '}
                    <a href={`mailto:${POLICY_CONTACTS.security}`}>{POLICY_CONTACTS.security}</a> before
                    commencing.
                </Note>
            </section>

            <section aria-labelledby="c8">
                <H2 id="c8" no="8.">Monitoring and Security Investigations</H2>
                <p>
                    To protect the Service, its users, and the wider internet, we may monitor the Service for
                    security-relevant events such as authentication failures, abuse patterns, and vulnerability
                    indicators, in line with ISO/IEC 27001:2022 Annex A Control 8.16 (monitoring activities). We
                    retain and access logs only for the periods set out in the Data Retention Policy, and only for
                    legitimate purposes such as investigating abuse, enforcing this AUP, or responding to legal
                    process.
                </p>
                <p>
                    We do not review the substantive content of your support correspondence for editorial
                    purposes, and we do not sell data to third parties.
                </p>
            </section>

            <section aria-labelledby="c9">
                <H2 id="c9" no="9.">Enforcement</H2>
                <p>
                    We enforce this AUP by a proportionate ladder. Where we take action, we will normally tell you
                    what triggered it, unless doing so would compromise a security investigation or a third
                    party&rsquo;s rights.
                </p>
                <DataTable
                    caption="Enforcement ladder"
                    head={['Action', 'When it applies']}
                    firstColHeader
                    rows={[
                        ['Guidance or a request to correct', 'First-time minor breach, or a breach we can remediate by you'],
                        ['Warning, or temporary rate limits', 'Repeated or moderate breach'],
                        ['Restriction of specific features', 'Serious or sustained breach with limited service impact'],
                        ['Suspension pending investigation', 'Suspected serious breach, abuse, or a security issue'],
                        ['Termination of the account', 'Material or repeated breach, or breach that cannot be remedied'],
                    ]}
                />
                <p>
                    Where we suspend or terminate an account, we refund any prepaid fees only for the unused
                    portion of the term, except where termination results from your material breach, in which
                    case no refund is due.
                </p>
            </section>

            <section aria-labelledby="c10">
                <H2 id="c10" no="10.">Suspension, Termination and Appeal</H2>
                <p>
                    We may suspend your access immediately, without notice, where we reasonably believe there is
                    an imminent risk to the security of the Service or its users, or where a law or lawful order
                    requires it. Otherwise, we provide notice and a reasonable opportunity to remedy the breach
                    before termination.
                </p>
                <p>
                    If you believe we have acted in error, you may appeal by emailing{' '}
                    <a href={`mailto:${POLICY_CONTACTS.legal}`}>{POLICY_CONTACTS.legal}</a> with the subject
                    &ldquo;AUP appeal&rdquo;. We acknowledge appeals within five (5) business days and aim to
                    reach a decision within fifteen (15) business days. Appeals are reviewed by an Arkynox manager
                    who was not involved in the original decision.
                </p>
            </section>

            <section aria-labelledby="c11">
                <H2 id="c11" no="11.">Jurisdictional Requirements</H2>
                <p>
                    This AUP is written to be workable in every market we serve. In some jurisdictions,
                    additional local rules apply to online content, intermediary liability, or
                    government access. The table below is a general summary, current as of the effective date of
                    this policy; it is not legal advice, and the applicable rule in your own jurisdiction takes
                    precedence.
                </p>
                <JurisdictionExplorer showRights />
            </section>

            <section aria-labelledby="c12">
                <H2 id="c12" no="12.">Changes to This Policy</H2>
                <p>
                    We may revise this AUP to reflect changes in the Service, our security posture, or the law.
                    Material changes are notified in writing at least fifteen (15) days before they take effect,
                    and the revised version is published at{' '}
                    <a href="/policy/acceptable-use">/policy/acceptable-use</a> with an updated effective date.
                    Continuing to use the Service after the effective date means you accept the revised policy.
                </p>
            </section>

            <section aria-labelledby="c13">
                <H2 id="c13" no="13.">Reporting and Contact</H2>
                <p>
                    To report a violation by another user, report unlawful or infringing content, or ask a
                    question about this policy, contact our Grievance Officer by email at{' '}
                    <a href={`mailto:${POLICY_CONTACTS.grievance}`}>{POLICY_CONTACTS.grievance}</a>, or by post to
                    the registered office address in our Terms and Conditions. We aim to acknowledge reports within
                    twenty-four (24) hours and to resolve them within the timelines in Clause 4.
                </p>
            </section>
        </PolicyLayout>
    );
}
