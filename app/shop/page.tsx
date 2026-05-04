// app/shop/page.tsx

import CategoryFilter from "@/components/shop/CategoryFilter";
import ProductCard from "@/components/shop/product-card";

import { PRODUCTS, type ProductCategory } from "@/lib/products";
import type { Metadata } from "next";
import { Suspense } from "react";

// ─── TypeScript callout ───────────────────────────────────────────────────────
// In Next.js 15, searchParams is a Promise, not a plain object.
// You must await it before reading the values.
// This tripped up a lot of people upgrading from Next.js 14.
// ─────────────────────────────────────────────────────────────────────────────
type SearchParams = Promise<{ category?: string }>;

export const metadata: Metadata = {
  title: "Shop — MERQ",
  description: "Nothing excess. Nothing missing.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { category } = await searchParams;

  const filtered = category
    ? PRODUCTS.filter((p) => p.category === (category as ProductCategory))
    : PRODUCTS;

  const heading = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : "Everything";

  return (
    <main className="min-h-screen bg-[#111010] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 pb-6 border-b border-[#3A3830]">
          <p className="text-[#7A7468] text-[11px] tracking-[0.3em] uppercase mb-2">
            {filtered.length} pieces
          </p>
          <h1 className="font-serif text-[#E8E4DE] text-5xl md:text-6xl">
            {heading}
          </h1>
        </div>

        {/* Filters */}
        {/* Suspense is required here — any component that calls useSearchParams()
            must be wrapped in <Suspense>, otherwise Next.js throws during build. */}
        <div className="mb-10">
          <Suspense>
            <CategoryFilter />
          </Suspense>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-[#3A3830] text-sm tracking-widest uppercase">
            Nothing here.
          </p>
        )}
      </div>
    </main>
  );
}
