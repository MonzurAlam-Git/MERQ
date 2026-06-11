// app/page.tsx

import ProductCard from "@/components/shop/ProductCard";
import { db } from "@/lib/db";

import Link from "next/link";

import { formatProduct, type DbProduct } from "@/lib/products";

export default async function HomePage() {
  const FEATURED_IDS = [1, 5, 9, 18];

  const raw = await db.product.findMany({
    where: { id: { in: FEATURED_IDS } },
    orderBy: { id: "asc" },
  });
  type RawProduct = (typeof raw)[number];
  const featured: DbProduct[] = raw.map((product: RawProduct) =>
    formatProduct(product),
  );

  return (
    <main className="bg-onyx">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-between px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        {/* Top line */}
        <div className="flex items-center justify-between">
          <p className="text-[#3A3830] text-[10px] tracking-[0.4em] uppercase">
            SS 2025
          </p>
          <p className="text-[#3A3830] text-[10px] tracking-[0.4em] uppercase">
            20 pieces
          </p>
        </div>

        {/* Main headline */}
        <div className="max-w-7xl mx-auto w-full">
          <h1
            className="font-serif text-[#E8E4DE] leading-[0.9] tracking-tight"
            style={{ fontSize: "clamp(4rem, 14vw, 14rem)" }}
          >
            {/* clamp(minimum, preferred, maximum) */}
            {/* clamp(4rem, 14vw, 14rem) for the headline — scales fluidly from mobile to widescreen without breakpoint jumps. 
            At 375px it's ~56px. At 1440px it's ~200px. Tailwind's fixed text- classes can't do this — inline style is the right tool here */}
            Nothing
            <br />
            <span className="text-[#3A3830]">excess.</span>
            <br />
            Nothing
            <br />
            missing.
          </h1>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 max-w-7xl mx-auto w-full">
          <p className="text-[#7A7468] text-sm max-w-xs leading-relaxed">
            Architectural silhouettes. Considered construction. Unisex.
          </p>
          <Link
            href="/shop"
            className="group flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-[#E8E4DE] hover:text-white transition-colors duration-200"
          >
            Enter the collection
            <span className="block w-8 h-px bg-[#D4A853] group-hover:w-12 transition-all duration-300" />
          </Link>
        </div>

        {/* Vertical rule — decorative */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3">
          <div className="w-px h-24 bg-[#1E1C18]" />
          <p className="text-[#1E1C18] text-[9px] tracking-[0.4em] uppercase [writing-mode:vertical-rl]">
            Scroll
          </p>
          <div className="w-px h-24 bg-[#1E1C18]" />
        </div>
      </section>

      {/* ── Featured ─────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-32 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex items-end justify-between mb-10 pb-4 border-b border-[#1E1C18]">
          <div>
            <p className="text-[#3A3830] text-[10px] tracking-[0.4em] uppercase mb-2">
              Selected
            </p>
            <h2 className="font-serif text-[#E8E4DE] text-3xl md:text-4xl">
              From the collection
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-[11px] tracking-[0.2em] uppercase text-[#7A7468] hover:text-[#E8E4DE] transition-colors duration-200 hidden sm:block"
          >
            View all
          </Link>
        </div>

        {/* Product grid — 4 featured */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12">
          {featured.map((product: DbProduct) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Mobile view all */}
        <div className="mt-12 flex justify-center sm:hidden">
          <Link
            href="/shop"
            className="text-[11px] tracking-[0.3em] uppercase text-[#7A7468] hover:text-[#E8E4DE] transition-colors border-b border-[#3A3830] pb-1"
          >
            View all 20 pieces
          </Link>
        </div>
      </section>

      {/* ── Footer strip ─────────────────────────────────────────────────── */}
      <footer className="border-t border-[#1E1C18] px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-serif text-[#3A3830] tracking-[0.3em] uppercase text-sm">
            MERQ
          </p>
          <p className="text-[#3A3830] text-[10px] tracking-[0.3em] uppercase">
            Nothing excess. Nothing missing.
          </p>
          <p className="text-[#3A3830] text-[10px] tracking-[0.2em] uppercase">
            © 2025
          </p>
        </div>
      </footer>
    </main>
  );
}
