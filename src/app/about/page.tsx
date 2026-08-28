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
