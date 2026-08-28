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
