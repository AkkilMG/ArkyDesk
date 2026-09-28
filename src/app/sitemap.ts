import { MetadataRoute } from "next";
import { policies, POLICY_EFFECTIVE_DATE } from "@/lib/policy/policies";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://desk.arkynox.com";

/** Policy pages share a single effective date, derived from the registry. */
const policyLastModified = new Date(POLICY_EFFECTIVE_DATE);

/**
 * Only publicly reachable, indexable routes are listed. Authenticated surfaces
 * (/dashboard, /admin, /tickets, /profile) are disallowed in robots.txt and must
 * therefore not appear here.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: baseUrl, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/signin`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/signup`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/guest-report`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    ...policies.map((policy) => ({
      url: `${baseUrl}/policy/${policy.slug}`,
      lastModified: policyLastModified,
      changeFrequency: "yearly" as const,
      priority: 0.4,
    })),
  ];
}
