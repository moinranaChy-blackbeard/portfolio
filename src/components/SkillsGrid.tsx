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
