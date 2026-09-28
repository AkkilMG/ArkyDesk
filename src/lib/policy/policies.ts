/**
 * Single source of truth for the /policy family.
 *
 * Consumed by the policy header switcher, the policy footer, the per-page
 * metadata exports and sitemap.ts, so a date or title change is made once.
 */

export const POLICY_EFFECTIVE_DATE = "October 1, 2026";
export const POLICY_VERSION = "4.0";

export const POLICY_CONTACTS = {
  legal: "legal@arkynox.com",
  privacy: "privacy@arkynox.com",
  dpo: "dpo@arkynox.com",
  grievance: "grievance@arkynox.com",
  security: "security@arkynox.com",
} as const;

export interface PolicyMeta {
  /** Route segment under /policy, e.g. "privacy-policy". */
  slug: string;
  title: string;
  /** Short label used in switchers and footers. */
  shortTitle: string;
  description: string;
}

export const policies: PolicyMeta[] = [
  {
    slug: "terms-and-condition",
    title: "Terms and Conditions",
    shortTitle: "Terms",
    description:
      "The legal agreement between you and Arkynox for use of the ArkyDesk support platform.",
  },
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    shortTitle: "Privacy",
    description:
      "How we collect, use, disclose and protect personal data, and the rights you have under Indian and international law.",
  },
  {
    slug: "acceptable-use",
    title: "Acceptable Use Policy",
    shortTitle: "Acceptable Use",
    description:
      "The rules governing what you may and may not do on the ArkyDesk platform.",
  },
  {
    slug: "data-retention",
    title: "Data Retention Policy",
    shortTitle: "Data Retention",
    description:
      "How long we keep each category of data, and how it is archived and securely disposed of.",
  },
  {
    slug: "sla",
    title: "Service Level Agreement",
    shortTitle: "SLA",
    description:
      "Our commitments on availability, response times, escalation and service credits.",
  },
];

export function getPolicy(slug: string): PolicyMeta | undefined {
  return policies.find((p) => p.slug === slug);
}
