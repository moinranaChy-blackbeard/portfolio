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
