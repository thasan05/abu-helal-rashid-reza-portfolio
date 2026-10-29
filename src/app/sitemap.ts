import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://abuhelalrashidreza.com";

  return [
    {
      url: baseUrl,
      lastModified: new Date("2026-10-28"),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}#about`,
      lastModified: new Date("2026-10-28"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}#experience`,
      lastModified: new Date("2026-10-28"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}#expertise`,
      lastModified: new Date("2026-10-28"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}#projects`,
      lastModified: new Date("2026-10-28"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}#philosophy`,
      lastModified: new Date("2026-10-28"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}#mentorship`,
      lastModified: new Date("2026-10-28"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}#insights`,
      lastModified: new Date("2026-10-28"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}#credentials`,
      lastModified: new Date("2026-10-28"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}#contact`,
      lastModified: new Date("2026-10-28"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
