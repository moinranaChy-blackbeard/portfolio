# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the multi-page portfolio website (Home, Projects, About, Contact) described in the design spec, using Moin's CV content, dark-default theme with light toggle, and targeted Framer Motion animation.

**Architecture:** Next.js App Router site with a shared root layout (Navbar + Footer + ThemeProvider), four route pages under `src/app/`, reusable presentational components under `src/components/`, and all CV content as static typed data under `src/data/`. No backend, no CMS — everything is statically generated.

**Tech Stack:** Next.js 16.3.3 (App Router), React 19.2.8, TypeScript (strict), Tailwind CSS v4 (CSS-first config, no `tailwind.config.js`), `next-themes` (class-based dark mode), `framer-motion` (targeted animation), `lucide-react` (icons).

**Spec:** `docs/superpowers/specs/2026-08-28-portfolio-design.md`

## Global Constraints

- Path alias `@/*` resolves to `./src/*` (from `tsconfig.json`) — always import via `@/...`, never relative paths across top-level folders.
- Tailwind v4 has no `tailwind.config.js`; design tokens are declared as CSS custom properties in `src/app/globals.css` under `@theme inline`, and dark mode is class-based via `@custom-variant dark (&:where(.dark, .dark *));` — NOT the default `prefers-color-scheme` media strategy.
- All new routes are static with no dynamic segments, so page components take **no props** (matches the existing `src/app/page.tsx` convention). Only the root layout uses the generated `LayoutProps<"/">` type — do not introduce `PageProps` anywhere in this plan.
- All components use **named exports** (`export function X()`), imported as `import { X } from "@/components/X"`.
- This project has no unit test framework (personal static site, no business logic to unit test). The verification gate for every task is: `npm run build` must succeed with zero type errors and zero lint errors. Treat a clean build as the task's "test passing."
- All work happens on the `dev` branch (already checked out and pushed). Commit after every task.
- Accent color is electric teal/cyan; theme tokens are `background`, `foreground`, `accent`, `muted`, `muted-foreground`, `border` (see Task 3).
- Animation approach is **targeted only** (Approach C from the spec): `framer-motion` is used solely inside `Hero` (on-load) and `AnimatedSection` (scroll-reveal). Do not add motion anywhere else.

---

### Task 1: Install dependencies and add resume asset

**Files:**
- Modify: `package.json`, `package-lock.json` (via npm install)
- Create: `public/resume.pdf`

**Interfaces:**
- Consumes: nothing
- Produces: `next-themes`, `framer-motion`, `lucide-react` available as installed packages for all later tasks; `public/resume.pdf` served at URL path `/resume.pdf`.

- [ ] **Step 1: Install the three new dependencies**

Run: `npm install next-themes framer-motion lucide-react`

- [ ] **Step 2: Copy the CV into the public folder as the downloadable resume**

Run: `cp "/Users/blackbeard/Downloads/Mohammad_Moin_CV_2026 (1).pdf" public/resume.pdf`

- [ ] **Step 3: Verify the project still builds**

Run: `npm run build`
Expected: build succeeds (no errors); output confirms the 4 packages were added (check `package.json` "dependencies" now lists `next-themes`, `framer-motion`, `lucide-react`).

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json public/resume.pdf
git commit -m "Add theme, animation, and icon dependencies; add resume asset"
```

---

### Task 2: Content data files

**Files:**
- Create: `src/data/profile.ts`
- Create: `src/data/experience.ts`
- Create: `src/data/projects.ts`
- Create: `src/data/skills.ts`

**Interfaces:**
- Consumes: nothing
- Produces:
  - `profile: Profile` from `@/data/profile` — fields: `name, title, tagline, location, email, phone, github, linkedin, summary, resumeUrl, education: { degree, institution, period, detail }`
  - `experience: ExperienceEntry[]` from `@/data/experience` — fields: `role, company, period, bullets: string[]`
  - `projects: Project[]` from `@/data/projects` — fields: `slug, name, description, tags: string[], type`
  - `skills: SkillCategory[]` from `@/data/skills` — fields: `category, items: string[]`

- [ ] **Step 1: Create `src/data/profile.ts`**

```ts
export interface Education {
  degree: string;
  institution: string;
  period: string;
  detail: string;
}

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  summary: string;
  resumeUrl: string;
  education: Education;
}

export const profile: Profile = {
  name: "Mohammad Moin Uddin Chy",
  title: "Senior Software Engineer",
  tagline: "Full-Stack & ERP Specialist",
  location: "Dhaka, Bangladesh",
  email: "moinrana.chy@gmail.com",
  phone: "+880 1880606275",
  github: "https://github.com/moinchy",
  linkedin: "https://www.linkedin.com/in/moinrana",
  summary:
    "Software Engineer with 6+ years of experience designing, developing, and maintaining enterprise-grade web applications and ERP solutions. Proficient across the full stack — Angular frontend through .NET Core and Node.js backend, with strong expertise in MongoDB, GraphQL, and event-driven architecture via RabbitMQ. Consistently delivers scalable, maintainable solutions for international clients in distributed, cross-functional teams.",
  resumeUrl: "/resume.pdf",
  education: {
    degree: "B.Sc. in Computer Science & Engineering",
    institution: "American International University – Bangladesh (AIUB)",
    period: "2016 – 2019",
    detail: "CGPA: 3.56 / 4.00",
  },
};
```

- [ ] **Step 2: Create `src/data/experience.ts`**

```ts
export interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
  bullets: string[];
}

export const experience: ExperienceEntry[] = [
  {
    role: "Software Engineer",
    company: "SELISE Bangladesh Ltd.",
    period: "Apr 2022 – Present",
    bullets: [
      "Full-stack development of enterprise ERP solutions for international clients using Angular, .NET Core, MongoDB, GraphQL, and RabbitMQ.",
      "Design and implement business modules, reporting pipelines, and workflow enhancements.",
      "Drive system optimisations, code reviews, and cross-team collaboration in an Agile environment.",
    ],
  },
  {
    role: "Android Developer",
    company: "Emerging IT Bangladesh Ltd.",
    period: "Aug 2021 – Feb 2022",
    bullets: [
      "Developed and maintained Android applications for an educational platform.",
      "Integrated Firebase, Retrofit, and Material Design components; improved stability and UX.",
    ],
  },
  {
    role: "Programmer",
    company: "Infocrat Solutions Ltd.",
    period: "Mar 2020 – Jul 2021",
    bullets: [
      "Built full-stack business applications and microservice back-ends using .NET Core, Entity Framework, and SQL Server.",
      "Developed ERP features and business workflows; generated reports using PDF and Excel technologies.",
    ],
  },
];
```

- [ ] **Step 3: Create `src/data/projects.ts`**

```ts
export interface Project {
  slug: string;
  name: string;
  description: string;
  tags: string[];
  type: string;
}

export const projects: Project[] = [
  {
    slug: "delta",
    name: "DELTA",
    description:
      "Enterprise ERP platform for a major international security organisation — end-to-end development and ongoing maintenance.",
    tags: ["Angular", ".NET Core", "MongoDB", "GraphQL", "RabbitMQ"],
    type: "Enterprise ERP",
  },
  {
    slug: "syn",
    name: "SYN",
    description:
      "ERP feature development and maintenance for a Japanese logistics / CNF organisation.",
    tags: ["Angular", ".NET Core", "MongoDB", "GraphQL"],
    type: "Enterprise ERP",
  },
  {
    slug: "emerging-study",
    name: "Emerging Study",
    description:
      "Android app for an educational platform, integrating real-time content delivery and user management.",
    tags: ["Android", "Java", "Kotlin", "Firebase"],
    type: "Mobile App",
  },
  {
    slug: "mooktobazar",
    name: "Mooktobazar",
    description:
      "B2B e-commerce solution: product catalogue, order management, and buyer/seller workflows.",
    tags: ["Full-Stack", "E-commerce"],
    type: "Web Platform",
  },
];
```

- [ ] **Step 4: Create `src/data/skills.ts`**

```ts
export interface SkillCategory {
  category: string;
  items: string[];
}

export const skills: SkillCategory[] = [
  { category: "Frontend", items: ["Angular", "JavaScript", "TypeScript", "HTML5", "CSS3", "jQuery"] },
  { category: "Backend", items: ["C#", ".NET Core", "Node.js", "Laravel"] },
  { category: "Databases", items: ["MongoDB", "SQL Server", "SQL"] },
  { category: "APIs & Messaging", items: ["GraphQL", "REST APIs", "RabbitMQ"] },
  { category: "Mobile", items: ["Android (Java/Kotlin)"] },
  { category: "Tools & Practices", items: ["Git", "ERP Development", "Agile / Scrum"] },
];
```

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: build succeeds with no type errors (these files are inert until imported, so this mainly confirms valid TypeScript syntax).

- [ ] **Step 6: Commit**

```bash
git add src/data
git commit -m "Add CV-sourced content data files"
```

---

### Task 3: Theme system (class-based dark mode + design tokens)

**Files:**
- Modify: `src/app/globals.css`
- Create: `src/components/ThemeProvider.tsx`
- Create: `src/components/ThemeToggle.tsx`

**Interfaces:**
- Consumes: nothing (ThemeToggle will later be consumed by Navbar in Task 5)
- Produces:
  - `ThemeProvider({ children }: { children: ReactNode })` from `@/components/ThemeProvider`
  - `ThemeToggle()` from `@/components/ThemeToggle` — no props
  - CSS utility classes available project-wide: `bg-background`, `text-foreground`, `bg-accent`, `text-accent`, `border-accent`, `bg-muted`, `text-muted-foreground`, `border-border`

- [ ] **Step 1: Replace `src/app/globals.css` with class-based theme tokens**

```css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

:root {
  --background: #ffffff;
  --foreground: #0a0a0a;
  --accent: #0d9488;
  --muted: #f4f4f5;
  --muted-foreground: #52525b;
  --border: #e4e4e7;
}

.dark {
  --background: #0a0a0a;
  --foreground: #ededed;
  --accent: #2dd4bf;
  --muted: #18181b;
  --muted-foreground: #a1a1aa;
  --border: #27272a;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-accent: var(--accent);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-border: var(--border);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-sans), Arial, Helvetica, sans-serif;
}
```

- [ ] **Step 2: Create `src/components/ThemeProvider.tsx`**

```tsx
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      {children}
    </NextThemesProvider>
  );
}
```

- [ ] **Step 3: Create `src/components/ThemeToggle.tsx`**

```tsx
"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-9 w-9" aria-hidden="true" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-accent hover:text-accent"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: build succeeds. (`ThemeProvider`/`ThemeToggle` aren't wired into the layout yet, so this only confirms they compile standalone — they'll be exercised visually once Task 6 wires them in.)

- [ ] **Step 5: Commit**

```bash
git add src/app/globals.css src/components/ThemeProvider.tsx src/components/ThemeToggle.tsx
git commit -m "Add class-based dark mode theme system and toggle"
```

---

### Task 4: AnimatedSection scroll-reveal wrapper

**Files:**
- Create: `src/components/AnimatedSection.tsx`

**Interfaces:**
- Consumes: `framer-motion` (installed in Task 1)
- Produces: `AnimatedSection({ children, className?, delay? }: { children: ReactNode; className?: string; delay?: number })` from `@/components/AnimatedSection` — renders a `<section>` that fades/slides in once when scrolled into view.

- [ ] **Step 1: Create `src/components/AnimatedSection.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedSection({ children, className, delay = 0 }: AnimatedSectionProps) {
  return (
    <motion.section
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.section>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/AnimatedSection.tsx
git commit -m "Add AnimatedSection scroll-reveal wrapper"
```

---

### Task 5: Navbar and Footer (site chrome)

**Files:**
- Create: `src/components/Navbar.tsx`
- Create: `src/components/Footer.tsx`

**Interfaces:**
- Consumes: `ThemeToggle()` from `@/components/ThemeToggle` (Task 3), `profile` from `@/data/profile` (Task 2)
- Produces: `Navbar()` from `@/components/Navbar`, `Footer()` from `@/components/Footer` — both no props.

- [ ] **Step 1: Create `src/components/Navbar.tsx`**

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-mono text-lg font-semibold text-foreground"
          onClick={() => setOpen(false)}
        >
          moin<span className="text-accent">.</span>dev
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors hover:text-accent ${
                pathname === link.href ? "text-accent" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-border px-6 py-4 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`rounded px-2 py-2 text-sm transition-colors hover:text-accent ${
                pathname === link.href ? "text-accent" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
```

- [ ] **Step 2: Create `src/components/Footer.tsx`**

```tsx
import { Mail } from "lucide-react";
import { profile } from "@/data/profile";

function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden="true">
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.38.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.24 2.75.12 3.04.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.21.67.8.56A10.98 10.98 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  );
}

function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.86 0-2.15 1.45-2.15 2.94v5.66H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 py-10 text-sm text-muted-foreground sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="transition-colors hover:text-accent"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="transition-colors hover:text-accent"
          >
            <LinkedinIcon size={18} />
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email" className="transition-colors hover:text-accent">
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
```

**Ruling (recorded 2026-08-29):** `lucide-react` (installed at `^1.35.0`) does not export brand/logo icons — `Github` and `Linkedin` do not exist in its icon set (confirmed against the installed package; Lucide only ships generic UI icons, e.g. `git-branch`, not brand marks). Fixed by replacing those two imports with small local inline-SVG components (`GithubIcon`, `LinkedinIcon`) using standard brand glyph paths, `currentColor` fill, and the same `size` prop shape lucide icons use — so call sites are unaffected. `Mail` (and `Phone`, used in Task 12) are confirmed present in `lucide-react` and are unaffected. The same fix is applied to Task 12 (`ContactLinks.tsx`) below.

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: build succeeds. (Not wired into layout yet — Task 6 does that.)

- [ ] **Step 4: Commit**

```bash
git add src/components/Navbar.tsx src/components/Footer.tsx
git commit -m "Add Navbar and Footer site chrome"
```

---

### Task 6: Wire root layout (ThemeProvider + Navbar + Footer)

**Files:**
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: `ThemeProvider` (Task 3), `Navbar`, `Footer` (Task 5), `profile` (Task 2)
- Produces: every page rendered inside `<main>` now has the Navbar above and Footer below it, and dark mode is active by default.

- [ ] **Step 1: Replace `src/app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { profile } from "@/data/profile";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.title}`,
  description: profile.summary,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 3: Manually verify in the browser**

Run: `npm run dev`, open `http://localhost:3000`. Expected: dark page loads with the Navbar (site name, nav links, theme toggle) at top and Footer at bottom. Click the theme toggle — page switches to light mode and back. Resize the window below 768px — nav links collapse into a hamburger menu that opens/closes. Stop the dev server (Ctrl+C) when done.

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx
git commit -m "Wire ThemeProvider, Navbar, and Footer into root layout"
```

---

### Task 7: Hero and ProjectCard components

**Files:**
- Create: `src/components/Hero.tsx`
- Create: `src/components/ProjectCard.tsx`

**Interfaces:**
- Consumes: `profile` (Task 2), `Project` type from `@/data/projects` (Task 2), `framer-motion`
- Produces: `Hero()` from `@/components/Hero` — no props; `ProjectCard({ project }: { project: Project })` from `@/components/ProjectCard`.

- [ ] **Step 1: Create `src/components/Hero.tsx`**

```tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { profile } from "@/data/profile";

export function Hero() {
  return (
    <section className="mx-auto flex max-w-5xl flex-col items-start gap-6 px-6 pb-16 pt-20 sm:pt-28">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex h-20 w-20 items-center justify-center rounded-full border border-border bg-muted font-mono text-2xl font-semibold text-accent"
        aria-hidden="true"
      >
        MC
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="font-mono text-sm text-accent"
      >
        {profile.location}
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl"
      >
        {profile.name}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-xl text-muted-foreground"
      >
        {profile.title} · {profile.tagline}
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="max-w-2xl text-base leading-relaxed text-muted-foreground"
      >
        {profile.summary}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex flex-wrap gap-4 pt-2"
      >
        <Link
          href="/projects"
          className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          View Projects
        </Link>
        <a
          href={profile.resumeUrl}
          download
          className="rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          Download Resume
        </a>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Create `src/components/ProjectCard.tsx`**

```tsx
import type { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group rounded-2xl border border-border p-6 transition-colors hover:border-accent">
      <p className="font-mono text-xs uppercase tracking-wide text-accent">{project.type}</p>
      <h3 className="mt-1 text-xl font-semibold text-foreground">{project.name}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.tsx src/components/ProjectCard.tsx
git commit -m "Add Hero and ProjectCard components"
```

---

### Task 8: Home page

**Files:**
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `Hero` (Task 7), `ProjectCard` (Task 7), `AnimatedSection` (Task 4), `projects` (Task 2), `skills` (Task 2)
- Produces: `/` route renders hero, featured projects (first 3), and a skills strip.

- [ ] **Step 1: Replace `src/app/page.tsx`**

```tsx
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { ProjectCard } from "@/components/ProjectCard";
import { AnimatedSection } from "@/components/AnimatedSection";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";

export default function Home() {
  const featured = projects.slice(0, 3);

  return (
    <div>
      <Hero />

      <AnimatedSection className="mx-auto max-w-5xl px-6 py-16">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-foreground">Featured Projects</h2>
          <Link href="/projects" className="text-sm text-accent hover:underline">
            View all →
          </Link>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="mx-auto max-w-5xl px-6 pb-24">
        <h2 className="text-2xl font-semibold text-foreground">Skills</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {skills
            .flatMap((group) => group.items)
            .map((item) => (
              <span key={item} className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground">
                {item}
              </span>
            ))}
        </div>
      </AnimatedSection>
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: build succeeds; `/` listed in the route output.

- [ ] **Step 3: Manually verify in the browser**

Run: `npm run dev`, open `http://localhost:3000`. Expected: hero text fades/slides in on load, scrolling down reveals the Featured Projects (3 cards) and Skills sections with a fade/slide-up as they enter the viewport. Stop the dev server when done.

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "Build Home page with hero, featured projects, and skills"
```

---

### Task 9: Projects page

**Files:**
- Create: `src/app/projects/page.tsx`

**Interfaces:**
- Consumes: `AnimatedSection` (Task 4), `ProjectCard` (Task 7), `projects` (Task 2)
- Produces: `/projects` route rendering all 4 projects.

- [ ] **Step 1: Create `src/app/projects/page.tsx`**

```tsx
import { AnimatedSection } from "@/components/AnimatedSection";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-bold text-foreground">Projects</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        A selection of enterprise and mobile projects I&apos;ve built and maintained.
      </p>

      <AnimatedSection className="mt-10 grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </AnimatedSection>
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: build succeeds; `/projects` listed in the route output.

- [ ] **Step 3: Commit**

```bash
git add src/app/projects/page.tsx
git commit -m "Add Projects page"
```

---

### Task 10: ExperienceTimeline and SkillsGrid components

**Files:**
- Create: `src/components/ExperienceTimeline.tsx`
- Create: `src/components/SkillsGrid.tsx`

**Interfaces:**
- Consumes: `experience` (Task 2), `skills` (Task 2)
- Produces: `ExperienceTimeline()` from `@/components/ExperienceTimeline`, `SkillsGrid()` from `@/components/SkillsGrid` — both no props.

- [ ] **Step 1: Create `src/components/ExperienceTimeline.tsx`**

```tsx
import { experience } from "@/data/experience";

export function ExperienceTimeline() {
  return (
    <ol className="space-y-10 border-l border-border pl-6">
      {experience.map((entry) => (
        <li key={`${entry.company}-${entry.period}`} className="relative">
          <span className="absolute -left-[29px] top-1.5 h-3 w-3 rounded-full bg-accent" />
          <p className="font-mono text-xs text-muted-foreground">{entry.period}</p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">{entry.role}</h3>
          <p className="text-sm text-accent">{entry.company}</p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
            {entry.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
```

- [ ] **Step 2: Create `src/components/SkillsGrid.tsx`**

```tsx
import { skills } from "@/data/skills";

export function SkillsGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {skills.map((group) => (
        <div key={group.category} className="rounded-2xl border border-border p-5">
          <h3 className="font-mono text-sm text-accent">{group.category}</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {group.items.map((item) => (
              <span key={item} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/components/ExperienceTimeline.tsx src/components/SkillsGrid.tsx
git commit -m "Add ExperienceTimeline and SkillsGrid components"
```

---

### Task 11: About page

**Files:**
- Create: `src/app/about/page.tsx`

**Interfaces:**
- Consumes: `AnimatedSection` (Task 4), `ExperienceTimeline`, `SkillsGrid` (Task 10), `profile` (Task 2)
- Produces: `/about` route rendering summary, experience, skills, and education.

- [ ] **Step 1: Create `src/app/about/page.tsx`**

```tsx
import { AnimatedSection } from "@/components/AnimatedSection";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { SkillsGrid } from "@/components/SkillsGrid";
import { profile } from "@/data/profile";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-bold text-foreground">About</h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">{profile.summary}</p>

      <AnimatedSection className="mt-14">
        <h2 className="text-2xl font-semibold text-foreground">Experience</h2>
        <div className="mt-8">
          <ExperienceTimeline />
        </div>
      </AnimatedSection>

      <AnimatedSection className="mt-16">
        <h2 className="text-2xl font-semibold text-foreground">Skills</h2>
        <div className="mt-8">
          <SkillsGrid />
        </div>
      </AnimatedSection>

      <AnimatedSection className="mt-16">
        <h2 className="text-2xl font-semibold text-foreground">Education</h2>
        <div className="mt-6 rounded-2xl border border-border p-5">
          <p className="font-mono text-xs text-muted-foreground">{profile.education.period}</p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">{profile.education.degree}</h3>
          <p className="text-sm text-accent">{profile.education.institution}</p>
          <p className="mt-2 text-sm text-muted-foreground">{profile.education.detail}</p>
        </div>
      </AnimatedSection>
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: build succeeds; `/about` listed in the route output.

- [ ] **Step 3: Commit**

```bash
git add src/app/about/page.tsx
git commit -m "Add About page"
```

---

### Task 12: ContactLinks component and Contact page

**Files:**
- Create: `src/components/ContactLinks.tsx`
- Create: `src/app/contact/page.tsx`

**Interfaces:**
- Consumes: `profile` (Task 2), `AnimatedSection` (Task 4)
- Produces: `ContactLinks()` from `@/components/ContactLinks` — no props; `/contact` route.

- [ ] **Step 1: Create `src/components/ContactLinks.tsx`**

```tsx
import { Mail, Phone } from "lucide-react";
import { profile } from "@/data/profile";

function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden="true">
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.38.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.24 2.75.12 3.04.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.21.67.8.56A10.98 10.98 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  );
}

function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.86 0-2.15 1.45-2.15 2.94v5.66H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

const links = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: Mail },
  { label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s+/g, "")}`, icon: Phone },
  { label: "GitHub", value: profile.github.replace("https://", ""), href: profile.github, icon: GithubIcon },
  { label: "LinkedIn", value: profile.linkedin.replace("https://", ""), href: profile.linkedin, icon: LinkedinIcon },
];

export function ContactLinks() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {links.map(({ label, value, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="flex items-center gap-4 rounded-2xl border border-border p-5 transition-colors hover:border-accent"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-accent">
            <Icon size={18} />
          </span>
          <span>
            <span className="block text-xs text-muted-foreground">{label}</span>
            <span className="block text-sm font-medium text-foreground">{value}</span>
          </span>
        </a>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Create `src/app/contact/page.tsx`**

```tsx
import { AnimatedSection } from "@/components/AnimatedSection";
import { ContactLinks } from "@/components/ContactLinks";
import { profile } from "@/data/profile";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-bold text-foreground">Contact</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Feel free to reach out — happy to talk about ERP systems, full-stack engineering, or new opportunities.
      </p>

      <AnimatedSection className="mt-10">
        <ContactLinks />
      </AnimatedSection>

      <AnimatedSection className="mt-10">
        <a
          href={profile.resumeUrl}
          download
          className="inline-block rounded-full bg-accent px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          Download Resume
        </a>
      </AnimatedSection>
    </div>
  );
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: build succeeds; `/contact` listed in the route output.

- [ ] **Step 4: Commit**

```bash
git add src/components/ContactLinks.tsx src/app/contact/page.tsx
git commit -m "Add ContactLinks component and Contact page"
```

---

### Task 13: Final polish — 404 page, cleanup, full QA pass

**Files:**
- Create: `src/app/not-found.tsx`
- Delete: `public/next.svg`, `public/vercel.svg`, `public/file.svg`, `public/globe.svg`, `public/window.svg` (unused template assets — no longer referenced after Task 8 replaced `src/app/page.tsx`)

**Interfaces:**
- Consumes: nothing new
- Produces: a themed 404 page for unmatched routes; a clean `public/` folder with only `resume.pdf`.

- [ ] **Step 1: Create `src/app/not-found.tsx`**

```tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col items-start gap-4 px-6 py-32">
      <p className="font-mono text-accent">404</p>
      <h1 className="text-3xl font-bold text-foreground">Page not found</h1>
      <p className="text-muted-foreground">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/" className="text-accent hover:underline">
        ← Back home
      </Link>
    </div>
  );
}
```

- [ ] **Step 2: Remove unused template assets**

Run: `rm public/next.svg public/vercel.svg public/file.svg public/globe.svg public/window.svg`

- [ ] **Step 3: Run the full build and lint**

Run: `npm run build && npm run lint`
Expected: both succeed with zero errors. Build output should list routes `/`, `/projects`, `/about`, `/contact`, and the 404 page.

- [ ] **Step 4: Manual full QA pass in the browser**

Run: `npm run dev`, open `http://localhost:3000`. Click through Home → Projects → About → Contact using the navbar. For each page: confirm content matches the CV, confirm scroll-reveal animations trigger, toggle theme and confirm all pages look correct in both light and dark. Shrink the browser below 768px and confirm the mobile hamburger menu works on every page. Click "Download Resume" and confirm the PDF downloads. Visit a nonexistent path (e.g. `http://localhost:3000/nope`) and confirm the styled 404 page appears. Stop the dev server when done.

- [ ] **Step 5: Commit and push**

```bash
git add -A
git commit -m "Add 404 page, remove unused template assets"
git push
```

---

## After this plan

Content assumptions to double-check with Moin before merging `dev` → `main`:
- `profile.github` is set to `https://github.com/moinchy` and `profile.linkedin` to `https://www.linkedin.com/in/moinrana`, inferred from the handles on the CV (`moinchy` / `Moinrana`) — confirm these are the correct profile URLs (not the new `moinranaChy-blackbeard` hosting account).
