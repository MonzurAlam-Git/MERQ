// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-onyx px-6 text-center">
      {/* Subtle grid texture — pure CSS, no image needed */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-ivory) 1px, transparent 1px), linear-gradient(90deg, var(--color-ivory) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Season label */}
      <p className="mb-6 text-[10px] tracking-[0.4em] uppercase text-ash">
        SS 2025
      </p>

      {/* Headline */}
      <h1 className="font-serif text-display-lg text-ivory">
        Nothing excess.
        <br />
        Nothing missing.
      </h1>

      {/* Divider */}
      <div className="my-10 h-px w-16 bg-accent" />

      {/* CTA */}
      <Link
        href="/shop"
        className="text-xs tracking-[0.3em] uppercase text-ash transition-colors hover:text-ivory"
      >
        Enter
      </Link>
    </div>
  );
}
