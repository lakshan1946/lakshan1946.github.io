import Link from "next/link";
import { HeroIdentity } from "@/components/HeroIdentity";
import { IdentityMap } from "@/components/IdentityMap";
import { LatestContentGrid } from "@/components/LatestContentGrid";
import { NowSnapshot } from "@/components/NowSnapshot";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({ path: "/" });

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 md:py-20">
      <HeroIdentity />
      <IdentityMap />
      <div className="mt-16 border-t border-border pt-12 md:mt-24 md:pt-16">
        <NowSnapshot limit={3} />
      </div>
      <section
        className="mt-16 border-t border-border pt-12 md:mt-24 md:pt-16"
        aria-labelledby="home-latest-heading"
      >
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="identity-line text-accent">LakzJourney</p>
            <h2
              id="home-latest-heading"
              className="mt-2 text-3xl tracking-tight md:text-4xl"
            >
              Latest videos
            </h2>
          </div>
          <Link
            href="/create/lakzjourney"
            className="text-sm text-accent underline-offset-4 hover:underline"
          >
            More from LakzJourney →
          </Link>
        </div>
        <LatestContentGrid
          identity="lakzJourney"
          platform="youtube"
          limit={4}
          emptyMessage="Latest LakzJourney long-form videos will appear here once the API is connected."
        />
      </section>
    </div>
  );
}
