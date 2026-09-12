import { NextResponse } from "next/server";
import { getSocialPayload } from "@/lib/social/adapters";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const payload = await getSocialPayload();
    return NextResponse.json(payload, {
      headers: {
        // Short browser cache; revalidate often so local env changes show up.
        "Cache-Control": "private, max-age=60, stale-while-revalidate=300",
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
