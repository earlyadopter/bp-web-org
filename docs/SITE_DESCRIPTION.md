Perfect separation of concerns 👍 — **.com = storefront**, **.org = editorial engine + talent magnet**. Below is a **clean, future-proof plan** you can drop straight into **Cursor or Claude Code** as a prompt (or split into phases). I’ll keep it deliberately *publisher-grade*, not “volunteer-project-ish”.

---

# BorderlessPress.org — Editorial Back Office & Contributor Platform

**Planning + Architecture Prompt (Markdown)**

---

## 1. Purpose & Positioning

**borderlesspress.org** is the *editorial headquarters* of Borderless Press.

It serves three audiences:

1. **Prospective editors & contributors** (public, lightly curated)
2. **Active editors & reviewers** (authenticated)
3. **Core editorial/admin team** (restricted)

The site must:

* Feel **serious, international, editorial**
* Avoid language like *volunteer*, *free*, *unpaid*
* Emphasize **editorial contribution**, **credit**, **portfolio value**
* Separate **public invitation** from **private workflow**

---

## 2. High-Level Information Architecture

```
borderlesspress.org
├── Public (no login)
│   ├── Landing / About Editorial Project
│   ├── How Editorial Collaboration Works
│   ├── Languages & Editions Overview
│   ├── Editorial Standards & Philosophy (high-level)
│   ├── Join the Editorial Network (email intake)
│   └── Contact / Legal / Privacy
│
├── Authenticated (login required)
│   ├── Editor Dashboard
│   ├── Editorial Guidelines (full)
│   ├── Style & Language Playbooks
│   ├── Coverage & Roadmaps
│   ├── Review & Commenting Space
│   ├── Peer Review Workflows
│   ├── Credit, Attribution & Resume Language
│   └── Internal Announcements
│
└── Admin / Core Editorial (restricted)
    ├── Contributor Management
    ├── Access Control
    ├── Editorial Prioritization
    ├── Conflict Resolution / Arbitration
    ├── Release Readiness
    └── Audit & History
```

---

## 3. Access Principles (Critical)

### 3.1 No Public Self-Signup

* **No “Create Account” button**
* Entry is **invite-only**
* Public users submit **email + short intent**
* Access is manually granted

This keeps:

* Signal > noise
* Editorial tone controlled
* Perception professional (not open volunteer forum)

---

### 3.2 Access Levels

| Role                   | Access                                         |
| ---------------------- | ---------------------------------------------- |
| **Visitor**            | Public pages only                              |
| **Prospective Editor** | Email intake only                              |
| **Editor**             | Assigned language(s), guidelines, review tools |
| **Senior Editor**      | Peer review, approvals, roadmap input          |
| **Language Lead**      | Style authority, final wording                 |
| **Admin**              | Full control                                   |

Design this **role-based**, not page-based.

---

## 4. Public-Facing Pages (Purpose Only)

### 4.1 Editorial Mission / About

**Goal:** legitimacy + tone

* Explain *why* Borderless Press exists
* Focus on **quality, cultural accuracy, responsibility**
* Avoid operational details

---

### 4.2 How Editorial Collaboration Works

**Goal:** attract serious contributors
Explain at a high level:

* Iterative editing
* Peer review
* Language-specific nuance
* Long-form responsibility

No mention of:

* Tools
* Internal discussions
* Compensation mechanics

---

### 4.3 Languages & Editions

**Goal:** show scale + ambition

* Languages covered
* Languages planned
* Emphasize **local voice**, not translation

---

### 4.4 Editorial Standards (Public Summary)

**Goal:** signal professionalism
High-level principles:

* Cultural accuracy
* Natural language (non-translated feel)
* Consistency across editions

Full rules live behind login.

---

### 4.5 Join the Editorial Network

**Goal:** controlled intake
Form fields:

* Name
* Email
* Language(s)
* Short free-text: *“Why are you interested?”*

Copy should imply:

* Selection
* Curation
* Limited access

Example tone:

> “We periodically invite new editors when a language or edition enters active development.”

---

## 5. Authenticated Editorial Area (Core Value)

### 5.1 Editor Dashboard

Personalized:

* Assigned languages
* Chapters under review
* Recent discussions
* Editorial notices

---

### 5.2 Editorial Guidelines (Full)

* Voice rules
* What to localize vs preserve
* Cultural sensitivity guidance
* Examples of *bad vs good* phrasing

---

### 5.3 Style & Language Playbooks

Per language:

* Tone expectations
* Idioms
* Register (formal vs conversational)
* What *not* to sound like

This is where your **“not translated, but written natively”** rules live.

---

### 5.4 Coverage & Roadmaps

* What exists
* What’s missing
* Priority topics
* Frozen vs mutable sections

Editors should see:

* Direction
* Not raw business strategy

---

### 5.5 Review & Discussion Space

Purpose:

* Paragraph-level wording debates
* Cultural nuance discussions
* Alternatives logged

This is *editorial*, not chat.

---

### 5.6 Peer Review Workflow

* Who reviews whom
* Escalation paths
* Disagreement resolution
* Final wording authority

---

### 5.7 Credit, Attribution & Resume Language

**Extremely important**

Provide:

* Approved resume bullets
* LinkedIn phrasing
* How contribution is described publicly
* What *not* to claim

This protects contributors **and** you.

---

## 6. Admin / Core Editorial (Think Ahead)

### 6.1 Contributor Lifecycle

* Invite
* Assign
* Promote
* Archive access

---

### 6.2 Editorial Prioritization

* What language moves next
* What chapters freeze
* Release gating

---

### 6.3 Conflict Resolution

* Editorial deadlocks
* Cultural disagreements
* Authority hierarchy

Design this *before* you need it.

---

### 6.4 Audit & History

* Who changed what
* Why wording changed
* Decision logs

This will save you later.

---

## 7. Things to Decide Early (Don’t Skip)

### Governance

* Who has final say per language?
* Can wording be overridden centrally?

### Legal

* Contributor agreement (IP assignment or license)
* Moral rights language (esp. EU)

### Optics

* Avoid words: *volunteer*, *free labor*
* Use: *editor*, *contributor*, *editorial role*

### Scalability

* Assume 5 → 50 → 200 contributors
* Role-based permissions from day one

---

## 8. Suggested Implementation Phases (Optional Prompt Split)

### Prompt A — Public Site Skeleton

> “Create a public-facing site structure for borderlesspress.org with editorial positioning, invitation-based onboarding, and no self-registration.”

### Prompt B — Authenticated Editorial Platform

> “Design authenticated pages for editors including dashboards, guidelines, peer review workflows, and attribution rules.”

### Prompt C — Access Control & Governance

> “Define role-based access control, contributor lifecycle, and editorial governance for a multilingual publishing platform.”

---

Given what you’re building (storefront on **.com**, back-office on **.org**, plus **country/language content repos with limited access**), you’ll be happiest long-term with **separate repos**—but under the same GitHub org, and with a clear naming/permission scheme.

Here are the options, with my recommendation first.

## Recommended setup: separate repos (clean boundaries)

### Why

* **Access control becomes trivial**: you can grant editors access to *only* the repos they need (e.g., `content-fr-en`) without risking exposure to platform code or other countries.
* **CI/CD stays sane**: platform deploys and content builds won’t step on each other.
* **Security + optics**: editorial back office (accounts, internal docs) stays isolated from public storefront.
* **Less accidental coupling**: no “oops I committed secrets/config” into content or vice versa.

### What that looks like in your new GitHub org

**Platform repos (restricted to core team):**

* `bp-web-com` → borderlesspress.com storefront
* `bp-web-org` → borderlesspress.org editorial HQ (auth, onboarding, internal docs UI)
* `bp-shared` (optional) → shared UI components/utilities (only if you truly need it)
* `bp-infra` (optional) → deployment/config scripts, IaC, etc.

**Content repos (permissions per language/country):**

* `bp-content-us-en`
* `bp-content-us-ru`
* `bp-content-es-es` (Spain Spanish edition)
* `bp-content-fr-en` (France English edition)
* …etc.

**Important:** keep content repos “dumb”: markdown + assets + build scripts, but no secrets.

---

## Cursor setup: separate projects/windows (but with a workspace option)

### Best day-to-day workflow

* Open **platform repos** in one Cursor window (or two separate windows if you’re actively developing both .com and .org).
* Open **one content repo at a time** when editing/structuring a book.

That prevents Cursor from trying to “helpfully” search across 2000 files spanning multiple repos and mixing concerns.

### When a single workspace is useful

If you sometimes need to change platform + content schema together (e.g., ToC JSON format changes), you can use a **workspace** that includes:

* `bp-web-org`
* `bp-content-xx-yy`

…but keep it intentional, not the default.

---

## Alternative: monorepo with folders (I don’t recommend here)

Monorepo can work if:

* everyone is trusted
* you’re okay with more complex permission patterns
* you want atomic changes across platform + content

But your explicit goal is **granting per country-language access**. GitHub doesn’t do folder-level permissions well in a single repo without heavy process overhead.

So monorepo = “I’ll fight permissions forever.”

---

## Practical permission model in GitHub Org

### Teams

Create teams in the org that map to reality:

* `core-admin`
* `platform-dev`
* `editors-fr`
* `editors-es`
* `editors-ru`
* (optionally) `reviewers-global`

### Repo permissions

* Platform repos: only `core-admin`, maybe `platform-dev`
* Content repos: editors team gets **Write**, reviewers team gets **Triage/Write**, public gets **Read** only if you want open visibility (you probably don’t at first)

---

## One more key decision: where does “editorial discussion” live?

You have two workable patterns:

### Pattern A (recommended): discussion in .org app, content in content repos

* Editors propose changes via GitHub PRs
* .org hosts guidelines, decisions, onboarding, attribution language
* Links from .org → the relevant PRs/issues in the content repo

### Pattern B: keep everything in GitHub (Issues/Discussions)

* .org is mostly public-facing + onboarding, and internal stuff is GitHub Discussions
* Less code to build, but less “publisher-like” experience

You can start with B and migrate to A later.

---

## Bottom line

* ✅ **Separate repos** (platform vs content, and content split by country-language).
* ✅ In Cursor: **separate windows/projects**, and only use a multi-repo workspace when needed.
* ✅ Use GitHub org teams for per-language access.

If you want, I can now give you:

1. an exact **repo naming convention** (including future-proofing for editions like “v1/v2”, “free/paid”),
2. a **GitHub teams + permissions matrix**, and
3. a **Cursor/Claude rules file strategy** so platform rules don’t pollute content editing style.
