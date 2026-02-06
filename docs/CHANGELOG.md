# Changelog

## Phase 1 MVP — February 2026

### Project Setup
- Next.js 16 (App Router) + TypeScript + Tailwind CSS v4
- PostgreSQL on Neon with Drizzle ORM (neon-http driver)
- NextAuth v5 beta with magic link authentication (email stubbed to console.log)
- Deployed to Vercel

### Database
- Schema: `users`, `accounts`, `sessions`, `verification_tokens`, `guides`, `applications`
- Lazy `getDb()` connection pattern to avoid build-time errors
- Seed script: 1 admin user + 10 guides (1 published, 9 in development)
- Drizzle Kit for schema push, `tsx` for seed runner

### Layout & UI
- Root layout with Inter font, global metadata, Open Graph tags
- Header with navigation and mobile hamburger menu
- Footer with legal links
- Reusable PageHeader component
- UI primitives: Button (primary, secondary, outline, danger, ghost), Input, Textarea, Select, Badge, Card

### Public Pages
- `/` — Landing page with hero, value propositions, and CTAs
- `/guides` — Guides list from database, grouped by status (published / in development / proposed)
- `/qualifications` — Required and nice-to-have qualifications
- `/how-it-works` — 5-step process (Apply, Review, Onboard, Contribute, Get Credited)
- `/apply` — Application form with Zod validation, multi-select countries, guide checkboxes, character counter
- `/apply/success` — Confirmation page after submission
- `/about` — Mission statement, link to borderlesspress.com
- `/contact` — Contact email and link to application form
- `/privacy` — Privacy policy
- `/terms` — Terms of participation

### Application Form
- Fields: name, email, countries (multi-select), languages, interested guides (checkboxes from DB), propose new guide, background (textarea with char counter), Markdown familiarity, GitHub familiarity
- Zod v4 validation with field-level error messages
- `useActionState` for progressive enhancement
- Server action inserts to DB + sends stubbed email notifications (console.log)

### Authentication (Admin Only)
- NextAuth v5 with Email (magic link) provider
- Stubbed email sender — magic link printed to console/Vercel logs
- Middleware protects `/admin/*` routes (cookie-based check, Edge-compatible)
- `signIn` callback restricts login to users with `role = admin`
- Admin user: `yuri@borderlesspress.org`
- No public link to admin — navigate to `/admin` directly

### Admin Dashboard
- `/admin` — Redirects to applications list
- `/admin/applications` — Table with status filter tabs (All, Pending, Approved, Rejected, Info Requested)
- `/admin/applications/[id]` — Full application detail with contact info, background, guide interests, tool familiarity
- Action sidebar: Approve, Reject, Request Info, Reset to Pending + admin notes textarea
- Auth check on all server actions

### Protected Pages
- `/what-editors-get` — Benefits page, requires authentication (not in public nav)

### Custom 404
- Branded not-found page with link back to home

### Key Technical Decisions
- Server Actions for all mutations (no API routes except NextAuth handler)
- Lazy DB connection via `getDb()` to support Vercel build without `DATABASE_URL`
- `force-dynamic` on pages with DB queries to prevent static pre-rendering
- Edge-compatible middleware (no Node.js imports) — checks session cookie directly
- Zod v4 API (`{ error: "msg" }` instead of `{ required_error: "msg" }`)
- `nodemailer@7` required as NextAuth v5 beta peer dependency
