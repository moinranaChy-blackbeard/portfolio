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
