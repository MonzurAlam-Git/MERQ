// app/shop/page.tsx

import CategoryFilter from "@/components/shop/CategoryFilter";
import ShopGrid from "@/components/shop/ShopGrid";

import { db } from "@/lib/db";
import { formatProduct, type DbProduct } from "@/lib/products";
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
  const query = q?.trim();

  // Build the where clause dynamically
  const raw = await db.product.findMany({
    where: {
      ...(category ? { category } : {}),
      ...(query
        ? {
            OR: [
              { name: { contains: query, mode: "insensitive" as const } },
              { category: { contains: query, mode: "insensitive" as const } },
            ],
          }
        : {}),
    },
    orderBy: { id: "asc" },
  });
  type RawProduct = (typeof raw)[number];
  const products: DbProduct[] = raw.map((product: RawProduct) =>
    formatProduct(product),
  );

  const heading = query
    ? `"${query}"`
    : category
      ? category.charAt(0).toUpperCase() + category.slice(1)
      : "Everything";

  return (
    <main className="min-h-screen bg-[#111010] pt-24 pb-20">
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
