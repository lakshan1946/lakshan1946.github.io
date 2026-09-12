import { profile, socialProfiles } from "@/content";

export function ContactPanel() {
  return (
    <div className="grid gap-10 md:grid-cols-[1.2fr_1fr]">
      <div>
        <p className="identity-line text-accent">Availability</p>
        <h2 className="mt-2 text-3xl tracking-tight md:text-4xl">
          Let&apos;s connect
        </h2>
        <p className="mt-4 max-w-xl text-muted">
          For professional inquiries, collaborations, or conversations about
          building, learning, and creating — reach out through the channels
          below.
        </p>
      </div>
      <div className="space-y-6">
        <div>
          <h3 className="text-xs uppercase tracking-[0.16em] text-muted">
            Professional
          </h3>
          <ul className="mt-3 space-y-2 text-base">
            {profile.links.email && (
              <li>
                <a
                  href={`mailto:${profile.links.email}`}
                  className="hover:text-accent"
                >
                  {profile.links.email}
                </a>
              </li>
            )}
            {profile.links.linkedin && (
              <li>
                <a
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent"
                >
                  LinkedIn
                </a>
              </li>
            )}
            {profile.links.github && (
              <li>
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent"
                >
                  GitHub
                </a>
              </li>
            )}
          </ul>
        </div>
        <div>
          <h3 className="text-xs uppercase tracking-[0.16em] text-muted">
            Creator & social
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            {socialProfiles.slice(0, 6).map((p) => (
              <li key={p.id}>
                <a
                  href={p.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent"
                >
                  {p.platform} · {p.handle}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
