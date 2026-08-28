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
