# Lakshan Madhusanka — Identity Platform

Personal identity site for [lakshan.me](https://lakshan.me): Software Engineer · Creator · Learner · Explorer.

Built from the product specification as a living personal brand — not a conventional portfolio template.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Motion-ready (respects `prefers-reduced-motion`)
- Zod content schemas
- TanStack Query for social client fetches
- Vercel deployment (API routes for social sync)

## Local development

```bash
npm install
npm run dev
```

```bash
npm run lint
npm run typecheck
npm run build
```

## Content updates

All structured content lives in `src/content/`. Edit these files to update the site without changing layout code:

| File | Purpose |
|------|---------|
| `profile.ts` | Name, brand lines, links |
| `experience.ts` | Work progression |
| `projects.ts` | BUILD case studies (`published` / `redact` flags) |
| `capabilities.ts` | Capability storytelling |
| `lab.ts` | Research / FYP |
| `creators.ts` | LakzJourney + educational identity |
| `now.ts` | **Right Now** living snapshot |
| `social.ts` | Multi-identity social profile map |
| `explore.ts` / `educate.ts` | Lifestyle & education placeholders |

Placeholder copy is marked with `placeholder: true` and shown with a badge in the UI.

## Social APIs

Copy `.env.example` to `.env.local` and set server-only secrets on Vercel:

- `YOUTUBE_API_KEY`, `YOUTUBE_CHANNEL_ID_LAKZJOURNEY`, `YOUTUBE_CHANNEL_ID_LAKSHAN`
- Optional: `META_ACCESS_TOKEN`, `TIKTOK_ACCESS_TOKEN`

`GET /api/social` enriches profiles via official APIs when credentials exist, caches for ~1 hour, and always falls back to profile links from `social.ts`.

## Routes

`/`, `/build`, `/build/[project]`, `/create`, `/create/lakzjourney`, `/create/education`, `/explore`, `/educate`, `/lab`, `/now`, `/social`, `/contact`

Modes rearrange emphasis via `?mode=person|engineer|creator|learner|explorer`.

## Deploy

1. Connect this repo to Vercel.
2. Set env vars from `.env.example`.
3. Point `lakshan.me` DNS to Vercel (retire GitHub Pages after cutover).
4. Set `NEXT_PUBLIC_SITE_URL=https://lakshan.me`.

## Security notes

- Never commit API secrets.
- Keep employer/project details public-safe; use `redact: true` before launch if needed.
- Do not invent metrics or professional claims.
