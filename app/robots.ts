import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/"],
    },
    sitemap: "https://hummingbirdguide.com/sitemap.xml",
    host: "https://hummingbirdguide.com",
  };
}
