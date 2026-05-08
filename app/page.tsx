// app/page.tsx

import { Link } from "next-view-transitions";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-onyx">
      {/* Hero */}
      <section className="pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <p className="text-[#7A7468] text-[11px] tracking-[0.3em] uppercase mb-4">
          SS 2025
        </p>
        <h1 className="font-serif text-[#E8E4DE] text-6xl md:text-8xl leading-none mb-16">
          Nothing excess.
          <br />
          Nothing missing.
        </h1>

        {/* Animated CTA */}
        <Link
          href="/shop"
          className="group inline-flex items-center gap-3 text-ivory text-sm tracking-[0.2em] uppercase hover:text-accent"
        >
          <span className="relative ">
            Enter MERQ
            {/* Animated underline */}
            <span className="absolute  left-0 bottom-0 h-px w-0 bg-accent transition-all duration-500 ease-out group-hover:w-full " />
          </span>
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      </section>
    </main>
  );
}
