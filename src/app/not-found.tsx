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
