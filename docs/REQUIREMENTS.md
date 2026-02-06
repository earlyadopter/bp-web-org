# BorderlessPress.org — Requirements

## 1. Project Overview

**borderlesspress.org** is a public-facing website and contributor platform for Borderless Press — a publishing project that creates practical immigrants' guides written by people with firsthand experience living in those countries.

The primary goal of the site is to **attract and onboard Contributing Editors** for current and future country/language editions.

---

## 2. Tech Stack

| Component       | Technology                          |
| --------------- | ----------------------------------- |
| Framework       | Next.js (App Router)                |
| Language        | TypeScript                          |
| Styling         | Tailwind CSS                        |
| Database        | PostgreSQL on Neon                  |
| ORM             | Drizzle ORM                         |
| Auth            | NextAuth.js (email magic link)      |
| Deployment      | Vercel                              |
| Email (transactional) | Resend (or similar)           |

---

## 3. User Roles & Access

| Role                    | Description                                                    |
| ----------------------- | -------------------------------------------------------------- |
| **Visitor**             | Unauthenticated. Sees public pages. Can submit application.    |
| **Applicant**           | Submitted application. No login yet. Awaits review.            |
| **Contributing Editor** | Approved. Has login. Sees dashboard, onboarding, discussions.  |
| **Admin**               | Full access. Reviews applications, manages editors & content.  |

No public self-registration. Editors receive login access only after admin approval.

---

## 4. Public Pages (No Login Required)

### 4.1 Landing Page

- Mission statement: practical guides for immigrants, by immigrants
- Brief explanation of Borderless Press and its publishing model
- Call to action: "Join the Editorial Network"
- Professional, international tone — avoid words like "volunteer" or "unpaid"

### 4.2 Guides In Progress

Display the current editorial pipeline, sourced from what's listed on borderlesspress.com:

**Published (US only):**
- United States — English edition
- United States — Russian edition
- United States — Spanish edition
- United States — German edition (in progress)

**In Development (English editions):**
- Spain
- France
- Germany
- Portugal
- Italy
- Netherlands
- Greece
- Thailand
- Malaysia

This page should also prominently invite visitors to **propose additional countries and languages** that are not yet listed. The message: "Don't see your country or language? Tell us — we're actively expanding."

### 4.3 What We Look For (Editor Qualifications)

**Required:**
- Currently live in or have lived in the country they want to cover — firsthand, practical knowledge is essential
- Fluent in English — all coordination, communication with other editors, and communication with the publisher happens in English

**Nice to Have:**
- Ability to author and format content in Markdown
- Familiarity with GitHub (checking in files, pull requests)

Tone: these are expectations, not gatekeeping. Frame as "what will make you effective in this role."

### 4.4 What Editors Get

This is not visible publicly of anyone came to check some if some editor is mentioned on the site – random users can not see that editors are **not a paid position**. For those who actively engaged and considering this role – we need to be upfront about it, but frame the value:

- **Verifiable editorial credit** — named as Contributing Editor in published guides
- **Portfolio-worthy experience** — participation in a real, multi-national publishing project
- **Resume and LinkedIn language** — approved phrasing for professional profiles
- **Skill building** — experience with editorial workflows, peer review, collaborative writing, Markdown, GitHub
- **Network** — working alongside editors from different countries and backgrounds

### 4.5 How It Works (Process Overview)

High-level steps visible to prospective editors:

1. **Apply** — fill out the application form (name, email, country/language interests, short motivation, relevant background)
2. **Review** — applications are reviewed by the editorial team; this is a curated process
3. **Onboarding** — accepted editors receive login access, orientation materials, and editorial guidelines
4. **Contribute** — work on assigned chapters/topics, participate in peer review and editorial discussions
5. **Get credited** — published contributions carry your name as Contributing Editor

### 4.6 Application Form

Fields:
- Full name (required)
- Email (required)
- Country/countries of firsthand experience (required) — dropdown/multi-select + "Other" option
- Language(s) you can write in fluently (required)
- Which guide(s) are you interested in editing? (required) — checkboxes from active list + "Propose a new country/language" text field
- Brief background — "Tell us about your experience living abroad and why you're interested" (required, free text, 50-500 words)
- Familiarity with Markdown (optional, yes/no/learning)
- Familiarity with GitHub (optional, yes/no/learning)

On submission:
- Store in database
- Send confirmation email to applicant
- Notify admin

### 4.7 About / Contact / Legal

- About Borderless Press (brief, links to borderlesspress.com)
- Contact email
- Privacy policy (data handling for applicants)
- Terms of participation (brief)

---

## 5. Authenticated Area — Contributing Editors

After admin approves an application and the editor receives login credentials (magic link email):

### 5.1 Editor Dashboard

- Welcome message and onboarding status
- Assigned guide(s) and current tasks
- Recent activity / announcements from admin
- Links to editorial guidelines and resources

### 5.2 Onboarding Flow

First-time experience after login:

1. Welcome and overview of the editorial process
2. Editorial guidelines and standards (voice, tone, cultural accuracy)
3. Technical setup guidance (Markdown basics, GitHub workflow if applicable)
4. Contributor agreement acknowledgment (IP/license terms)
5. Select / confirm country and language preferences
6. Introduction to their editorial group

### 5.3 Editorial Profile

Each editor maintains a profile:
- Name and short bio
- Countries/languages they cover
- Contributions and status
- Approved attribution/credit language for resumes and LinkedIn

### 5.4 Discussion Space

- Per-guide discussion threads (editorial questions, cultural nuance debates)
- General announcements channel
- Simple threaded comments — not a full chat system

### 5.5 Content & Task Visibility

- View which chapters/sections need work
- Claim or be assigned sections
- Track progress on their contributions

---

## 6. Admin Area

### 6.1 Application Management

- View all applications (filterable by status, country, language)
- Review individual applications
- Approve / reject / request more info
- On approval: create editor account, trigger welcome email with magic link

### 6.2 Editor Management

- View all active editors
- Assign editors to guides/languages
- Change roles
- Deactivate accounts

### 6.3 Content Management

- Manage the list of guides (add new countries/languages, update status)
- Post announcements visible to editors
- Manage editorial guidelines content (or link to external docs)

---

## 7. Data Model (Core Entities)

```
Guide
  - id
  - country
  - language
  - status (published | in_development | planned | proposed)
  - description

Application
  - id
  - full_name
  - email
  - countries_experience (array)
  - languages (array)
  - interested_guides (array of Guide IDs)
  - proposed_new (text, nullable)
  - background_text
  - markdown_familiarity (yes | no | learning | null)
  - github_familiarity (yes | no | learning | null)
  - status (pending | approved | rejected | more_info_requested)
  - admin_notes (text, nullable)
  - created_at
  - updated_at

User
  - id
  - email
  - name
  - role (editor | admin)
  - application_id (FK, nullable)
  - bio (text, nullable)
  - created_at

EditorGuideAssignment
  - id
  - user_id (FK)
  - guide_id (FK)
  - role_in_guide (contributor | reviewer | lead)
  - assigned_at

Discussion
  - id
  - guide_id (FK, nullable — null for general)
  - title
  - created_by (FK to User)
  - created_at

Comment
  - id
  - discussion_id (FK)
  - author_id (FK to User)
  - body (text)
  - created_at

Announcement
  - id
  - title
  - body (text)
  - created_by (FK to User)
  - created_at
```

---

## 8. Implementation Phases

### Phase 1 — Public Site + Application Pipeline (MVP)

Build and deploy:
- All public pages (sections 4.1–4.7)
- Application form with database storage
- Admin view for reviewing applications
- Email notifications (confirmation to applicant, alert to admin)
- Basic admin auth (single admin account, magic link)
- Seed database with current guide list from borderlesspress.com

**Deliverable:** A live site on Vercel that attracts editors and collects applications.

### Phase 2 — Editor Onboarding & Dashboard

- Editor authentication (magic link)
- Editor dashboard
- Onboarding flow
- Editorial profile
- Guide assignment by admin

**Deliverable:** Approved editors can log in, complete onboarding, and see their assignments.

### Phase 3 — Collaboration Features

- Discussion threads (per-guide and general)
- Announcements
- Content/task visibility and assignment
- Editor management improvements

**Deliverable:** Editors can collaborate and participate in editorial discussions through the platform.

---

## 9. Design Principles

- **Professional and editorial** — this is a publishing operation, not a volunteer project
- **International** — clean, translatable UI; no cultural assumptions in design
- **Simple** — avoid over-engineering; start minimal, add complexity when needed
- **Mobile-friendly** — editors may access from various devices
- **Accessible** — WCAG 2.1 AA compliance as baseline

---

## 10. Out of Scope (For Now)

- Content editing/authoring within the platform (content lives in GitHub repos)
- Payment or compensation systems
- Public-facing editor directory
- Multi-language UI (the platform itself is English-only; guides are multilingual)
- Integration with borderlesspress.com
- Full CMS functionality
