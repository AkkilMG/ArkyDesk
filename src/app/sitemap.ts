import { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://desk.arkynox.com";

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
    { url: `${baseUrl}/policy/privacy-policy`, lastModified, changeFrequency: "yearly", priority: 0.4 },
    { url: `${baseUrl}/policy/terms-and-condition`, lastModified, changeFrequency: "yearly", priority: 0.4 },
    { url: `${baseUrl}/policy/acceptable-use`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/policy/data-retention`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/policy/sla`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
