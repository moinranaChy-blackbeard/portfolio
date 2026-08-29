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
          download="Mohammad-Moin-Uddin-Chy-CV.pdf"
          className="inline-block rounded-full bg-accent px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          Download Resume
        </a>
      </AnimatedSection>
    </div>
  );
}
