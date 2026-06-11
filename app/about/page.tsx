// app/about/page.tsx

import Link from "next/link";

export default async function AboutPage() {
  // app/shop/page.tsx — add this at the top of the function body

  return (
    <main className="bg-onyx text-[#E8E4DE]">
      {/* Hero */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-end px-6 md:px-12 pb-16 md:pb-24">
        <div className="max-w-4xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px bg-[#2A2824]" />
            <p className="text-[#3A3830] text-[10px] tracking-[0.4em] uppercase font-medium">
              About
            </p>
          </div>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.05]">
            Designed with
            <br />
            intention.
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="px-6 md:px-12 py-20 md:py-32 border-t border-[#1A1918]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          <div className="md:col-span-4">
            <p className="text-[#3A3830] text-[10px] tracking-[0.4em] uppercase font-medium mb-4">
              Our Story
            </p>
            <div className="w-12 h-px bg-[#2A2824]" />
          </div>

          <div className="md:col-span-8 space-y-6">
            <p className="text-[#7A7468] text-base md:text-lg leading-relaxed">
              MERQ was founded on a simple belief: clothing should be built to
              last, not to be replaced. In an era of constant acceleration, we
              choose to move deliberately—designing pieces that age gracefully
              and transcend seasons.
            </p>
            <p className="text-[#7A7468] text-base md:text-lg leading-relaxed">
              Every garment begins with material. We source fabrics from mills
              with decades of heritage, favoring natural fibers that develop
              character over time. Our cuts are refined through iteration,
              stripped to their essential lines without losing human warmth.
            </p>
            <p className="text-[#7A7468] text-base md:text-lg leading-relaxed">
              We do not chase trends. We build a wardrobe.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-6 md:px-12 py-20 md:py-32 border-t border-[#1A1918]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-16">
            <div className="w-8 h-px bg-[#2A2824]" />
            <p className="text-[#3A3830] text-[10px] tracking-[0.4em] uppercase font-medium">
              Principles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            <div>
              <p className="text-[#3A3830] text-[10px] tracking-[0.4em] uppercase font-medium mb-6">
                01
              </p>
              <h3 className="font-serif text-2xl md:text-3xl mb-4">
                Material First
              </h3>
              <p className="text-[#7A7468] text-sm leading-relaxed">
                We select fabrics for longevity and texture. If it cannot
                improve with wear, it does not enter our collection.
              </p>
            </div>

            <div>
              <p className="text-[#3A3830] text-[10px] tracking-[0.4em] uppercase font-medium mb-6">
                02
              </p>
              <h3 className="font-serif text-2xl md:text-3xl mb-4">
                Restrained Form
              </h3>
              <p className="text-[#7A7468] text-sm leading-relaxed">
                Each silhouette is edited to its essential shape. Nothing
                excessive, nothing missing. Clarity through reduction.
              </p>
            </div>

            <div>
              <p className="text-[#3A3830] text-[10px] tracking-[0.4em] uppercase font-medium mb-6">
                03
              </p>
              <h3 className="font-serif text-2xl md:text-3xl mb-4">
                Made to Endure
              </h3>
              <p className="text-[#7A7468] text-sm leading-relaxed">
                Construction matters. Reinforced seams, considered hardware, and
                finishes that withstand daily ritual.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="px-6 md:px-12 py-24 md:py-40 border-t border-[#1A1918]">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.15] text-[#E8E4DE]">
            "The best pieces are the ones
            <br className="hidden md:block" />
            you reach for without thinking."
          </blockquote>
          <div className="mt-10 flex items-center justify-center gap-4">
            <div className="w-8 h-px bg-[#2A2824]" />
            <p className="text-[#3A3830] text-[10px] tracking-[0.4em] uppercase font-medium">
              MERQ Studio
            </p>
            <div className="w-8 h-px bg-[#2A2824]" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 py-20 md:py-32 border-t border-[#1A1918]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl leading-[1.1] mb-4">
              Explore the collection.
            </h2>
            <p className="text-[#7A7468] text-sm max-w-md leading-relaxed">
              Discover pieces designed to become part of your daily uniform.
            </p>
          </div>

          <Link
            href="/shop"
            className="shrink-0 text-[11px] tracking-[0.3em] uppercase text-onyx bg-[#E8E4DE] px-10 py-3.5 hover:bg-white transition-colors duration-300 text-center"
          >
            Browse the collection
          </Link>
        </div>
      </section>

      {/* Footer mark */}
      <div className="flex items-center justify-center gap-5 py-12 border-t border-[#1A1918]">
        <div className="w-16 h-px bg-[#1E1C18]" />
        <p className="text-[#1E1C18] text-[10px] tracking-[0.5em] uppercase">
          MERQ
        </p>
        <div className="w-16 h-px bg-[#1E1C18]" />
      </div>
    </main>
  );
}
