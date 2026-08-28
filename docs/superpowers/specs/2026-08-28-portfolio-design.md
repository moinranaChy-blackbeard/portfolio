# Portfolio Website — Design Spec

Date: 2026-08-28
Owner: Mohammad Moin Uddin Chy

## Purpose

A personal portfolio website presenting Moin's professional background (Senior
Software Engineer, full-stack & ERP specialist) to recruiters, clients, and
collaborators. Multi-page, dark-themed by default with a light mode toggle,
deployed on Vercel from a GitHub repo.

## Source content

All content is derived from `Mohammad_Moin_CV_2026.pdf`:

- Name, title, location, contact: Mohammad Moin Uddin Chy — Senior Software
  Engineer · Full-Stack & ERP Specialist — Dhaka, Bangladesh
- Professional summary (6+ years, enterprise ERP, Angular/.NET Core/Node.js/
  MongoDB/GraphQL/RabbitMQ)
- Skills: Frontend (Angular, JS, TS, HTML5, CSS3, jQuery), Backend (C#, .NET
  Core, Node.js, Laravel), Databases (MongoDB, SQL Server, SQL), APIs &
  Messaging (GraphQL, REST, RabbitMQ), Mobile (Android/Java/Kotlin), Tools
  (Git, ERP Development, Agile/Scrum)
- Experience: SELISE Bangladesh Ltd. (Apr 2022–Present, Software Engineer),
  Emerging IT Bangladesh Ltd. (Aug 2021–Feb 2022, Android Developer),
  Infocrat Solutions Ltd. (Mar 2020–Jul 2021, Programmer)
- Projects: DELTA (enterprise ERP for international security org), SYN (ERP
  for Japanese logistics/CNF org), Emerging Study (Android educational app),
  Mooktobazar (B2B e-commerce)
- Education: B.Sc. CSE, AIUB, 2016–2019, CGPA 3.56/4.00

## Tech stack

- Next.js (App Router) + TypeScript + Tailwind CSS — already scaffolded in
  this repo
- `next-themes` for dark/light mode (class-based, default dark, persisted to
  localStorage)
- Framer Motion for targeted animation only (see Approach C below)
- No backend, no CMS, no database — fully static, statically generated

## Approach: animation level

Three options were considered:

- **A — Fully static (CSS-only):** Tailwind transitions/hovers only. Simplest,
  zero extra deps.
- **B — Fully animated:** Framer Motion driving route transitions and
  scroll-reveal everywhere. Highest "wow," highest complexity/bundle cost.
- **C — Targeted motion (chosen):** Framer Motion used only at high-impact
  spots — hero entrance, section reveal-on-scroll, project card hover-lift,
  mobile nav open/close. Everything else is plain Tailwind.

Chosen: **C**, to balance a modern/polished feel against build simplicity and
reliability for a personal site.

## Site structure (multi-page)

- `/` — **Home**: hero (name, title, location, short pitch, CTA buttons —
  View Projects / Download Resume), featured-projects preview (2–3 cards
  linking to `/projects`), quick skills strip
- `/projects` — **Projects**: all 4 projects as detailed cards (title,
  description, tech tags, role/type badge)
- `/about` — **About**: professional summary, experience timeline (SELISE,
  Emerging IT, Infocrat), skills grid by category, education
- `/contact` — **Contact**: email/phone/GitHub/LinkedIn links as buttons,
  resume download button. No form/backend — links only.

## Components

- `Navbar` — name/logo, page links, `ThemeToggle`, mobile hamburger menu
- `Footer` — social icons (GitHub, LinkedIn, email), copyright
- `ThemeToggle` — sun/moon switch, persisted via `next-themes`
- `Hero` — Home page intro block
- `ProjectCard` — reusable card for project previews and the Projects page
- `ExperienceTimeline` — job history list (dates, company, bullets)
- `SkillsGrid` — categorized skill badges/pills
- `ContactLinks` — icon/button list for email, phone, GitHub, LinkedIn
- `AnimatedSection` — Framer Motion scroll-reveal wrapper, reused across pages

## Data flow

Static TypeScript data files under `src/data/`:

- `profile.ts` — name, title, location, contact, summary
- `experience.ts` — job history array
- `projects.ts` — project array
- `skills.ts` — skills grouped by category

Components import from these files directly; no fetching, no runtime data
source. The CV PDF is copied to `public/resume.pdf` and linked directly for
download.

## Visual design

- Dark theme by default (near-black background), light theme available via
  toggle
- Accent color: electric teal/cyan
- No profile photo or project screenshots yet — placeholders/icons used;
  swappable later without structural changes

## Testing

Manual verification before each push:

- Click through all routes on desktop and mobile breakpoints
- Verify theme toggle switches and persists across reload
- Verify all links (mailto, tel, GitHub, LinkedIn, resume download) resolve
- `npm run build` must succeed locally before pushing

## Git workflow & deployment

- All development happens on a `dev` branch; `main` stays production-ready.
- Repo connects to Vercel with `main` as the Production branch.
- Pushes to `dev` (or any non-main branch) automatically get a Vercel
  **preview deployment** — a shareable non-production URL — with no extra
  config beyond connecting the repo.
- Merging `dev` → `main` triggers Vercel's **production** deployment to the
  live URL.

## Out of scope (for this pass)

- Contact form / email backend (using static links instead)
- CMS or admin editing of content
- Blog section
- Analytics
