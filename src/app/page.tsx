import { HeroIdentity } from "@/components/HeroIdentity";
import { IdentityMap } from "@/components/IdentityMap";
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
    </div>
  );
}
