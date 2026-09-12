import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lakshan.me";

export const siteConfig = {
  name: "Lakshan Madhusanka",
  title: "Lakshan Madhusanka — Software Engineer & Creator",
  description:
    "A living personal identity platform for Lakshan Madhusanka: Software Engineer, Creator, Learner, and Explorer. I build. I learn. I explore. I share.",
  url: siteUrl,
  ogImage: "/og.png",
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
  const fullTitle = title
    ? `${title} · Lakshan Madhusanka`
    : siteConfig.title;
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
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
    },
    robots: { index: true, follow: true },
  };
}
