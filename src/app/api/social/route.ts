import { NextResponse } from "next/server";
import { getSocialPayload } from "@/lib/social/adapters";
import { SOCIAL_CACHE } from "@/lib/social/constants";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const payload = await getSocialPayload();
    return NextResponse.json(payload, {
      headers: {
        "Cache-Control": `private, max-age=${SOCIAL_CACHE.apiMaxAgeSeconds}, stale-while-revalidate=${SOCIAL_CACHE.apiStaleWhileRevalidateSeconds}`,
      },
    });
  } catch {
    return NextResponse.json(
      {
        profiles: [],
        latestContent: [],
        lastSyncedAt: null,
        source: "config-fallback",
        error: "Social sync unavailable",
      },
      { status: 200 },
    );
  }
}
