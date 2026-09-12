"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  modeEmphasis,
  siteModeSchema,
  type Dimension,
  type SiteMode,
} from "@/content";
import { SITE } from "@/lib/constants";

type ModeContextValue = {
  mode: SiteMode;
  setMode: (mode: SiteMode) => void;
  orderedDimensions: Dimension[];
  reducedMotion: boolean;
};

const ModeContext = createContext<ModeContextValue | null>(null);

function subscribeReducedMotion(onStoreChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export function ModeProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  const mode = useMemo(() => {
    const raw = searchParams.get("mode");
    const parsed = siteModeSchema.safeParse(raw);
    return parsed.success ? parsed.data : ("person" as SiteMode);
  }, [searchParams]);

  const setMode = useCallback(
    (next: SiteMode) => {
      const params = new URLSearchParams(searchParams.toString());
      if (next === "person") {
        params.delete("mode");
      } else {
        params.set("mode", next);
      }
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const value = useMemo<ModeContextValue>(
    () => ({
      mode,
      setMode,
      orderedDimensions: modeEmphasis[mode],
      reducedMotion,
    }),
    [mode, setMode, reducedMotion],
  );

  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
}

export function useMode() {
  const ctx = useContext(ModeContext);
  if (!ctx) {
    throw new Error("useMode must be used within ModeProvider");
  }
  return ctx;
}

export function withMode(href: string, mode: SiteMode): string {
  if (mode === "person") return href;
  const url = new URL(
    href,
    process.env.NEXT_PUBLIC_SITE_URL ?? SITE.defaultUrl,
  );
  url.searchParams.set("mode", mode);
  return `${url.pathname}${url.search}`;
}
