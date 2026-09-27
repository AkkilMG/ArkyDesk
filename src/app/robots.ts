import { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://desk.arkynox.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Authenticated surfaces and the API must never be indexed.
        disallow: ["/api/", "/dashboard", "/admin/", "/tickets", "/profile", "/verify/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
