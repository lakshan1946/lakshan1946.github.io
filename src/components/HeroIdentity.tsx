"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { profile } from "@/content";
import { useMode, withMode } from "@/lib/mode";

export function HeroIdentity() {
  const { mode, reducedMotion } = useMode();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reducedMotion || profile.rotatingSentences.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % profile.rotatingSentences.length);
    }, 4200);
    return () => window.clearInterval(id);
  }, [reducedMotion]);

  return (
    <header className="relative">
      <p className="identity-line text-accent">{profile.identityStatement}</p>
      <h1 className="wordmark mt-4 max-w-5xl text-[clamp(2.6rem,10vw,6.5rem)]">
        {profile.wordmark}
      </h1>
      <p className="mt-6 max-w-2xl text-base text-muted md:text-lg">
        {profile.supportingLine}
      </p>
      <p
        aria-live="polite"
        className="mt-4 min-h-[1.5rem] text-sm italic text-foreground/80"
      >
        {profile.rotatingSentences[index]}
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href={withMode("/build", mode)}
          className="btn-primary rounded-full px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-90"
        >
          Enter BUILD
        </Link>
        <Link
          href={withMode("/create", mode)}
          className="rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-foreground"
        >
          Enter CREATE
        </Link>
        <Link
          href={withMode("/explore", mode)}
          className="rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-foreground"
        >
          Enter EXPLORE
        </Link>
      </div>

      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
        <span>{profile.currentRole}</span>
        {profile.links.github && (
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
          >
            GitHub
          </a>
        )}
        {profile.links.linkedin && (
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
          >
            LinkedIn
          </a>
        )}
        <Link href={withMode("/contact", mode)} className="hover:text-foreground">
          Contact
        </Link>
      </div>
    </header>
  );
}
