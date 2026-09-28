import type { Metadata } from 'next';
import PolicyLayout from '@/components/policy/PolicyLayout';
import { H2, H3 } from '@/components/policy/PolicyHeading';
import Note from '@/components/policy/Note';
import DataTable from '@/components/policy/DataTable';
import { POLICY_CONTACTS } from '@/lib/policy/policies';

export const metadata: Metadata = {
    title: 'Data Retention Policy',
    description:
        'How long Arkynox keeps each category of personal data, how it moves from active to archive to disposal, and the legal minimums that apply by country.',
    alternates: { canonical: '/policy/data-retention' },
};

const toc = [
    { id: 'c1', no: '1.', label: 'Purpose and Scope', level: 2 as const },
    { id: 'c2', no: '2.', label: 'Retention Principles', level: 2 as const },
    { id: 'c3', no: '3.', label: 'Retention Schedule', level: 2 as const },
    { id: 'c4', no: '4.', label: 'Data Lifecycle', level: 2 as const },
    { id: 'c5', no: '5.', label: 'Legal Hold', level: 2 as const },
    { id: 'c6', no: '6.', label: 'Erasure Requests and Backups', level: 2 as const },
    { id: 'c7', no: '7.', label: 'Deletion Verification and Evidence', level: 2 as const },
    { id: 'c8', no: '8.', label: 'Security of Retained Data', level: 2 as const },
    { id: 'c9', no: '9.', label: 'Country-Specific Minimums', level: 2 as const },
    { id: 'c10', no: '10.', label: 'Exceptions and Approvals', level: 2 as const },
    { id: 'c11', no: '11.', label: 'De-identification and Aggregation', level: 2 as const },
    { id: 'c12', no: '12.', label: 'Review and Contact', level: 2 as const },
];

export default function DataRetentionPolicy() {
    return (
        <PolicyLayout
            slug="data-retention"
            title="Data Retention Policy"
            description="How long we keep each category of data, why we keep it for that long, and how it is securely disposed of when the period ends."
            toc={toc}
        >
            <section aria-labelledby="c1">
                <H2 id="c1" no="1.">Purpose and Scope</H2>
                <p>
                    This Data Retention Policy sets out how Arkynox retains, archives and disposes of personal data
                    processed through the ArkyDesk support platform. It is designed to satisfy our legal
                    obligations, to meet legitimate business and evidentiary needs, and simultaneously to minimise
                    the risk that personal data is kept longer than necessary.
                </p>
                <p>
                    This policy applies to all personal data processed in connection with the Service, including
                    account data, support tickets and their communications, file attachments, and system and access
                    logs. It supplements the <a href="/policy/privacy-policy">Privacy Policy</a>; where the two
                    conflict on how long data is kept, this policy governs retention.
                </p>
            </section>

            <section aria-labelledby="c2">
                <H2 id="c2" no="2.">Retention Principles</H2>
                <ul>
                    <li>
                        <strong>Purpose limitation.</strong> Data is collected for specified, explicit purposes and is
                        not used for an incompatible purpose without a fresh lawful basis and notice.
                    </li>
                    <li>
                        <strong>Storage limitation.</strong> Personal data is kept only as long as is necessary for
                        the purpose for which it was collected, then for as long as a specific legal or evidentiary
                        obligation requires. This mirrors Section 5(1)(e) of the EU GDPR and Rule 8 of India&rsquo;s
                        Digital Personal Data Protection Rules, 2025.
                    </li>
                    <li>
                        <strong>Minimisation.</strong> We do not retain fields that have no support, security or
                        legal purpose.
                    </li>
                    <li>
                        <strong>Local law prevails.</strong> Where a jurisdiction imposes a longer mandatory minimum
                        (see Clause 9) or a shorter maximum, that local rule prevails for data subject to it.
                    </li>
                    <li>
                        <strong>No indefinite retention.</strong> Data is not retained indefinitely &ldquo;just in
                        case&rdquo;. Any data whose retention period has expired is deleted or irreversibly
                        anonymised under Clause 4.
                    </li>
                </ul>
            </section>

            <section aria-labelledby="c3">
                <H2 id="c3" no="3.">Retention Schedule</H2>
                <p>
                    The following schedule is our default retention position. Periods run from the date the trigger
                    event occurs, and are subject to Clause 9 and Clause 10.
                </p>
                <DataTable
                    caption="Default retention schedule"
                    head={['Data category', 'Retention period', 'Justification']}
                    firstColHeader
                    colClassName={['whitespace-nowrap', 'whitespace-nowrap']}
                    rows={[
                        ['User account information', '3 years after last activity', 'Business continuity and service history'],
                        ['Support tickets', '7 years', 'Legal compliance, dispute evidence and knowledge-base contribution'],
                        ['Ticket communications', '7 years', 'Support continuity and agent training'],
                        ['File attachments', '3 years after ticket closure', 'Technical reference and troubleshooting'],
                        ['System access logs', '90 days', 'Security monitoring and troubleshooting'],
                        ['Error logs', '1 year', 'System improvement and debugging'],
                        ['Performance metrics', '2 years', 'Service improvement and capacity planning'],
                        ['Customer feedback', '5 years', 'Quality improvement and trend analysis'],
                        ['Billing records', '7 years', 'Tax and regulatory compliance (India and international)'],
                    ]}
                />
                <Note tone="info" title="Why 90 days for access logs">
                    India&rsquo;s DPDP Rules, 2025 require logging of processing activity and a minimum one-year
                    retention of security logs for Significant Data Fiduciaries. We keep general access logs for 90
                    days and separately maintain a one-year security-log stream to meet that requirement.
                </Note>
            </section>

            <section aria-labelledby="c4">
                <H2 id="c4" no="4.">Data Lifecycle</H2>
                <H3 id="c4-1" no="4.1">Active phase</H3>
                <p>
                    While a ticket is open and for the retention period in Clause 3, data is held in the production
                    systems and is fully accessible to authorised agents working the ticket. Access during this
                    phase is governed by least-privilege rules and logged.
                </p>
                <H3 id="c4-2" no="4.2">Archive phase</H3>
                <p>
                    Once the active retention period ends, data moves to an encrypted archive that is logically
                    separated from production. Archived data is not queryable by agents or customer-facing features
                    and is accessible only by a restricted, logged, engineering and compliance group for legal
                    hold, security investigation and integrity verification. Archives are deleted in full at the
                    end of the retention period.
                </p>
                <H3 id="c4-3" no="4.3">Disposal phase</H3>
                <p>
                    At the end of its retention period, data is deleted from primary systems and from backups as
                    those backups rotate out, or is irreversibly anonymised where the data is used in aggregate
                    analytics. Deletion is performed using methods proportionate to the data, including
                    cryptographic erasure where we hold the keys.
                </p>
            </section>

            <section aria-labelledby="c5">
                <H2 id="c5" no="5.">Legal Hold</H2>
                <p>
                    Where we are notified of a claim, investigation, regulatory enquiry, or court order requiring
                    the preservation of data, we place that data on legal hold. A legal hold suspends all deletion
                    and archiving for the affected data, regardless of the retention period in Clause 3, until the
                    hold is released in writing by the Arkynox legal function.
                </p>
                <p>
                    Holds may be placed on individual tickets, entire accounts, or defined data categories. We do
                    not notify affected individuals of a hold where notifying them would prejudice the matter.
                </p>
            </section>

            <section aria-labelledby="c6">
                <H2 id="c6" no="6.">Erasure Requests and Backups</H2>
                <p>
                    Where you validly request erasure under Clause 8 of the{' '}
                    <a href="/policy/privacy-policy">Privacy Policy</a>, we delete your data from active systems
                    and, where you request it, from archives, within the statutory response window (90 days for
                    Data Principals in India under the DPDP Rules, 2025; one month in the EU/UK).
                </p>
                <p>
                    Under Rule 8 of the DPDP Rules, 2025 we give a Data Principal at least forty-eight (48)
                    hours&rsquo; notice before their personal data is erased. We use that notice to invite you to
                    withdraw or export your data.
                </p>
                <Note tone="legal" title="Backups">
                    Data in encrypted backups is not selectively erasable in place without compromising backup
                    integrity. Instead, your data is removed from active systems immediately and is progressively
                    purged as each backup expires and rotates out, on a cycle no longer than thirty-five (35) days.
                    Backups are never restored to production except for disaster recovery, and if that happens
                    your erasure request is re-applied to the restored copy.
                </Note>
                <p>
                    We do not erase data that we are required to retain — for example, invoices for statutory
                    tax-record keeping periods, or data subject to a legal hold under Clause 5. Where we refuse or
                    limit an erasure request, we explain why and identify the lawful basis for retaining the data.
                </p>
            </section>

            <section aria-labelledby="c7">
                <H2 id="c7" no="7.">Deletion Verification and Evidence</H2>
                <p>
                    Automated retention jobs run on a schedule, and their completion is logged. We retain internal
                    records (not the deleted data itself) confirming that a given data category was deleted on a
                    given date, and we sample-test deletions quarterly. These controls correspond to the
                    &ldquo;information deletion&rdquo; and &ldquo;documented information&rdquo; controls in
                    Annex A of ISO/IEC 27001:2022 (Controls 8.10 and 7.5).
                </p>
            </section>

            <section aria-labelledby="c8">
                <H2 id="c8" no="8.">Security of Retained Data</H2>
                <p>
                    Retained data is protected at rest by encryption, in transit by TLS, and by access controls
                    that are more restrictive for archived than for active data. Access to archived data requires a
                    documented business justification, is approved by the data protection function, and is logged
                    and reviewed. This aligns with Annex A Controls 5.15 (access control), 8.2 (privileged access)
                    and 8.12 (data leakage prevention) of ISO/IEC 27001:2022.
                </p>
            </section>

            <section aria-labelledby="c9">
                <H2 id="c9" no="9.">Country-Specific Minimums</H2>
                <p>
                    The table below records the mandatory retention requirements or limitation periods that affect
                    Arkynox in the principal markets we serve, and the effect on our default schedule in Clause 3.
                </p>
                <DataTable
                    caption="Mandatory retention requirements by country"
                    head={['Country', 'Key requirement', 'Typical period', 'Effect on our schedule']}
                    firstColHeader
                    colClassName={['whitespace-nowrap', undefined, 'whitespace-nowrap']}
                    rows={[
                        ['India', 'DPDP Act 2023 and Rules 2025: delete when the purpose is served. Companies Act, 2013 s.128: books of account 3 years (private) / 8 years (others). Income-tax records: statutory assessment window.', '3–8 years', 'Deletion on request per the DPDP Act; 7-year ticket default covers corporate book-keeping needs'],
                        ['EU/EEA', 'GDPR Art. 5(1)(e): kept no longer than necessary; national limitation periods for contracts.', '3–6 years', 'Our 7-year maximum covers EU limitation periods; erasure on request'],
                        ['United Kingdom', 'UK GDPR storage limitation; Limitation Act 1980: 6 years for contracts.', '6 years', '7-year retention aligns with UK requirements'],
                        ['United States', 'Federal and state record-keeping rules 3–7 years; CCPA/CPRA impose no fixed period but require disclosure of retention.', '2–7 years', '7-year ticket default covers US federal and state variation'],
                        ['Canada', 'PIPEDA retention principle (as long as necessary); Quebec Law 25 requires a documented retention framework and mandatory privacy impact assessments for sensitive data.', 'Necessity-based', 'Purpose-based retention; Quebec data subject to Law 25 assessment requirements'],
                        ['Mexico', 'LFPDPPP (2025): data must be deleted or anonymised when the purpose ends; implementing regulation by the Secretaría Anticorrupción y Buen Gobierno pending.', 'Necessity-based', 'Purpose-based retention; deletion on ARCO cancellation request'],
                        ['Japan', 'APPI: delete when the purpose is achieved; Civil Code: 5 years for contractual claims (reduced from 10 in 2020).', '5 years', 'Deletion on request; 5 years for contractual records'],
                        ['Australia', 'Privacy Act 1988: destroy or de-identify when no longer needed; Corporations Act: 7 years for financial records.', '7 years', '7-year retention aligns with the Corporations Act'],
                        ['Brazil', 'LGPD Art. 16: retention permitted for compliance, research or anonymisation; Civil Code limitation 3–10 years.', '3–10 years', '7-year default covers most LGPD requirements'],
                        ['Turkey', 'KVKK: delete or anonymise when the purpose ends; Code of Obligations: 10 years.', '10 years', 'Extended to 10 years for Turkish users where required'],
                        ['South Africa', 'POPIA: retention must be justifiable; Prescription Act: 3–6 years.', '3–6 years', '7-year default covers POPIA'],
                        ['Nigeria', 'Nigeria Data Protection Act 2023: retain only as long as necessary; CAMA: 6 years for records.', '6 years', '7-year default covers CAMA'],
                        ['Kenya', 'Data Protection Act 2019: necessary duration; Limitation of Actions Act: 6 years for contracts.', '6 years', '7-year default covers Kenyan requirements'],
                        ['Russia', '152-FZ: purpose-based; Tax Code 4–6 years for accounting records; in-country storage required.', '4–6 years', 'Purpose-based retention with in-country storage'],
                        ['Indonesia', 'UU PDP: delete when the period expires; Civil Code: 30 years for certain claims.', '30 years', 'Extended retention for Indonesian users where the Civil Code requires it'],
                        ['Thailand', 'PDPA: no fixed period; Civil and Commercial Code: 10 years for contracts.', '10 years', 'Extended to 10 years for Thai users where required'],
                        ['Philippines', 'Data Privacy Act 2012: necessary duration; Civil Code: 10 years for written contracts.', '10 years', 'Extended to 10 years for Philippine users where required'],
                        ['South Korea', 'PIPA: destroy when purpose achieved; Consumer Protection Act: 5 years for transaction records.', '3–5 years', '5-year minimum for records, deletion on request'],
                        ['Sri Lanka', 'PDPA No. 9 of 2022: destroy when purpose fulfilled; Prescription Ordinance: 6 years for contracts.', '6 years', '7-year default covers Sri Lankan requirements'],
                        ['Kazakhstan', 'Law No. 94-V: purpose-based; Civil Code 3 years general; in-country storage required.', '3 years', 'Purpose-based retention with in-country storage'],
                    ]}
                />
            </section>

            <section aria-labelledby="c10">
                <H2 id="c10" no="10.">Exceptions and Approvals</H2>
                <p>
                    Any retention period longer than this policy requires is a documented exception, approved by our
                    data protection function and recorded in our processing register with a review date. Valid
                    reasons for an exception include:
                </p>
                <ul>
                    <li>an outstanding legal claim, regulatory enquiry or legal hold (Clause 5);</li>
                    <li>an unresolved security investigation, where log data is essential to attribution;</li>
                    <li>statutory record-keeping obligations, such as invoices, tax records and books of account;</li>
                    <li>defect diagnosis where anonymised or aggregate data cannot serve the purpose; or</li>
                    <li>an express instruction from you, for example where you require a longer period for your own compliance.</li>
                </ul>
                <p>Exceptions are reviewed at least annually and expire automatically if not renewed.</p>
            </section>

            <section aria-labelledby="c11">
                <H2 id="c11" no="11.">De-identification and Aggregation</H2>
                <p>
                    Where we need to retain analytical value after the retention period has expired, we convert the
                    data to an irreversibly anonymised form first. Anonymised data is outside the scope of the
                    GDPR, the DPDP Act and equivalent laws because it can no longer be linked back to an
                    individual, and it is used only in aggregate to improve the Service.
                </p>
            </section>

            <section aria-labelledby="c12">
                <H2 id="c12" no="12.">Review and Contact</H2>
                <p>
                    We review this policy at least annually, and on any significant change to the Service, our
                    data flows, or the law. Retention settings are enforced by automation, with a quarterly
                    compliance audit and an annual management review of the results, consistent with ISO/IEC
                    27001:2022 Clause 9.1 and Annex A Control 5.33 (protection of records).
                </p>
                <p>
                    To ask about a retention period, request early deletion, or place data on hold, email{' '}
                    <a href={`mailto:${POLICY_CONTACTS.privacy}`}>{POLICY_CONTACTS.privacy}</a> or use the privacy
                    controls inside your ArkyDesk account. We respond within the statutory window described in
                    Clause 6.
                </p>
            </section>
        </PolicyLayout>
    );
}
