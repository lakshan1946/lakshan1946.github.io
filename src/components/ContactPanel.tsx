import {
  ContactChannelIcon,
  identityLabel,
  PlatformIcon,
  platformLabel,
} from "@/components/PlatformIcon";
import {
  creators,
  getProfilesByIdentity,
  profile,
  type CreatorIdentity,
} from "@/content";

function ContactLinkRow({
  href,
  label,
  detail,
  external,
  icon,
}: {
  href: string;
  label: string;
  detail?: string;
  external?: boolean;
  icon: React.ReactNode;
}) {
  return (
    <li>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="group flex cursor-pointer items-center gap-4 border border-border bg-surface px-4 py-3.5 transition-colors hover:border-accent/50"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors group-hover:border-accent/40">
          {icon}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm text-muted">{label}</span>
          {detail && (
            <span className="mt-0.5 block truncate text-base tracking-tight transition-colors group-hover:text-accent">
              {detail}
            </span>
          )}
        </span>
        <span
          aria-hidden
          className="text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent"
        >
          →
        </span>
      </a>
    </li>
  );
}

function IdentityContactSection({
  identity,
  description,
}: {
  identity: CreatorIdentity;
  description: string;
}) {
  const creator = creators.find((c) => c.id === identity);
  const profiles = getProfilesByIdentity(identity);
  const headingId = `${identity}-contact-heading`;

  return (
    <section
      aria-labelledby={headingId}
      className="grid grid-rows-subgrid row-span-2 gap-y-4"
    >
      <div>
        <p className="text-[0.65rem] uppercase tracking-[0.14em] text-accent">
          Creator identity
        </p>
        <h3
          id={headingId}
          className="mt-1 font-display text-2xl tracking-tight md:text-3xl"
        >
          {creator ? creator.name : identityLabel(identity)}
        </h3>
        <p className="mt-2 text-sm text-muted text-pretty">{description}</p>
      </div>
      <ul className="space-y-3">
        {profiles.map((p) => (
          <ContactLinkRow
            key={p.id}
            href={p.profileUrl}
            label={platformLabel(p.platform)}
            detail={p.handle}
            icon={<PlatformIcon platform={p.platform} />}
            external
          />
        ))}
      </ul>
    </section>
  );
}

export function ContactPanel() {
  const professional = [
    profile.links.email && {
      key: "email",
      href: `mailto:${profile.links.email}`,
      label: "Email",
      detail: profile.links.email,
      icon: <ContactChannelIcon channel="email" />,
      external: false,
    },
    profile.links.linkedin && {
      key: "linkedin",
      href: profile.links.linkedin,
      label: "LinkedIn",
      detail: "Professional profile",
      icon: <ContactChannelIcon channel="linkedin" />,
      external: true,
    },
    profile.links.github && {
      key: "github",
      href: profile.links.github,
      label: "GitHub",
      detail: "Code & repositories",
      icon: <ContactChannelIcon channel="github" />,
      external: true,
    },
  ].filter(Boolean) as Array<{
    key: string;
    href: string;
    label: string;
    detail: string;
    icon: React.ReactNode;
    external: boolean;
  }>;

  return (
    <div className="space-y-14">
      <div className="max-w-2xl border-b border-border pb-10">
        <p className="identity-line text-accent">Availability</p>
        <h2 className="mt-2 font-display text-3xl tracking-tight md:text-5xl">
          Let&apos;s connect
        </h2>
        <p className="mt-4 text-muted md:text-lg">
          Professional outreach sits apart from creator channels. Pick Lakshan
          for engineering and education, or LakzJourney for lifestyle and
          travel.
        </p>
        <p className="mt-4 text-sm text-foreground/80">{profile.currentRole}</p>
      </div>

      <section aria-labelledby="professional-heading" className="space-y-4">
        <div className="flex items-end justify-between gap-3">
          <h3
            id="professional-heading"
            className="text-xs uppercase tracking-[0.16em] text-muted"
          >
            Professional
          </h3>
          <p className="text-[0.65rem] uppercase tracking-[0.14em] text-muted">
            Recruiter path
          </p>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {professional.map((item) => (
            <ContactLinkRow
              key={item.key}
              href={item.href}
              label={item.label}
              detail={item.detail}
              icon={item.icon}
              external={item.external}
            />
          ))}
        </ul>
      </section>

      <div className="grid grid-rows-[auto_auto] gap-x-10 gap-y-12 border-t border-border pt-12 lg:grid-cols-2">
        <IdentityContactSection
          identity="lakshanMadhusanka"
          description="Education, tech, and personal creator profiles — all under @lakshanma21."
        />
        <IdentityContactSection
          identity="lakzJourney"
          description="Lifestyle, travel, and journey content across YouTube, Instagram, Facebook, and TikTok."
        />
      </div>
    </div>
  );
}
