import { MetadataRoute } from "next";
import { species } from "@/lib/species-data";

const baseUrl = "https://hummingbirdguide.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const speciesUrls = species.map((sp) => ({
    url: `${baseUrl}/species/${sp.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const stateUrls = [
    "arizona","california","texas","colorado","new-york","florida","washington",
    "oregon","new-mexico","alaska","michigan","georgia","illinois","north-carolina",
  ].map((state) => ({
    url: `${baseUrl}/atlas#${state}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/encyclopedia`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/migration`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/garden-planner`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/identifier`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/atlas`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/conservation`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/shop`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/species`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    ...speciesUrls,
    ...stateUrls,
  ];
}
