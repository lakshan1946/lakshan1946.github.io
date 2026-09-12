import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const siteConfig = {
  name: SITE.name,
  title: SITE.title,
  description: SITE.description,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? SITE.defaultUrl,
  ogImage: SITE.ogImage,
};

export function createMetadata({
  title,
  description,
  path = "/",
}: {
  title?: string;
  description?: string;
  path?: string;
} = {}): Metadata {
  const fullTitle = title ? `${title} · ${SITE.name}` : siteConfig.title;
  const desc = description ?? siteConfig.description;
  const url = `${siteConfig.url}${path}`;

  return {
    title: fullTitle,
    description: desc,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description: desc,
      url,
      siteName: siteConfig.name,
      type: "website",
      locale: SITE.locale,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
    },
    robots: { index: true, follow: true },
  };
}
