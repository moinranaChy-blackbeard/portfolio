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
          {skills.flatMap((group) =>
            group.items.map((item) => (
              <span key={`${group.category}-${item}`} className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground">
                {item}
              </span>
            ))
          )}
        </div>
      </AnimatedSection>
    </div>
  );
}
