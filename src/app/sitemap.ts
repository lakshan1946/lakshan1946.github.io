import type { MetadataRoute } from "next";
import { creators, getPublishedProjects } from "@/content";
import { siteConfig } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const staticRoutes = [
    "",
    "/build",
    "/create",
    "/explore",
    "/educate",
    "/lab",
    "/now",
    "/social",
    "/contact",
  ];

  const projectRoutes = getPublishedProjects().map(
    (p) => `/build/${p.slug}`,
  );
  const creatorRoutes = creators.map((c) => `/create/${c.slug}`);

  return [...staticRoutes, ...projectRoutes, ...creatorRoutes].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
}
