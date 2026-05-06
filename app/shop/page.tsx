// app/shop/page.tsx

import CategoryFilter from "@/components/shop/CategoryFilter";
import ShopGrid from "@/components/shop/Shopgrid";

import { PRODUCTS, type ProductCategory } from "@/lib/products";
import type { Metadata } from "next";
import { Suspense } from "react";

type SearchParams = Promise<{ category?: string; q?: string }>;

export const metadata: Metadata = {
  title: "Shop — MERQ",
  description: "Nothing excess. Nothing missing.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { category, q } = await searchParams;

  let products = category
    ? PRODUCTS.filter((p) => p.category === (category as ProductCategory))
    : PRODUCTS;

  if (q?.trim()) {
    const query = q.trim().toLowerCase();
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.variants.some((v) => v.toLowerCase().includes(query)),
    );
  }

  const heading = q?.trim()
    ? `"${q}"`
    : category
      ? category.charAt(0).toUpperCase() + category.slice(1)
      : "Everything";

  return (
    <main className="min-h-screen bg-onyx pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 pb-6 border-b border-[#3A3830]">
          <h1 className="font-serif text-[#E8E4DE] text-5xl md:text-6xl">
            {heading}
          </h1>
        </div>

        <div className="mb-10">
          <Suspense>
            <CategoryFilter />
          </Suspense>
        </div>

        <ShopGrid products={products} />
      </div>
    </main>
  );
}
