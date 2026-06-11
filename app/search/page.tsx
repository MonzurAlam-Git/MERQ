// app/search/page.tsx

import ProductCard from "@/components/shop/ProductCard";
import { db } from "@/lib/db";
import { formatProduct, type DbProduct } from "@/lib/products";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

type SearchParams = Promise<{ category?: string; q?: string }>;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  return {
    title: query ? `${query} — MERQ` : "Search — MERQ",
    description: "Search our collection of curated fashion pieces.",
  };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  // Filter products based on search query
  const raw = query
    ? await db.product.findMany({ orderBy: { id: "asc" } })
    : [];
  type RawProduct = (typeof raw)[number];
  const products: DbProduct[] = raw.map((product: RawProduct) =>
    formatProduct(product),
  );
  const results: DbProduct[] = query
    ? products.filter(
        (p: DbProduct) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.variants.some((v: string) =>
            v.toLowerCase().includes(query.toLowerCase()),
          ),
      )
    : [];

  return (
    <main className="min-h-screen bg-onyx pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-[#7A7468] text-[11px] tracking-[0.3em] uppercase mb-2">
            Search results
          </p>
          <h1 className="font-serif text-[#E8E4DE] text-4xl md:text-5xl">
            {query ? `"${query}"` : "No query"}
          </h1>
        </div>

        {results.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-6">
            <p className="font-serif text-[#E8E4DE] text-2xl">Nothing found.</p>
            <p className="text-[#7A7468] text-[11px] tracking-[0.2em] uppercase">
              Try a different search term or{" "}
              <Link
                href="/shop"
                className="hover:text-[#E8E4DE] transition-colors"
              >
                browse the collection
              </Link>
              .
            </p>
          </div>
        ) : (
          <>
            <p className="text-[#7A7468] text-[11px] tracking-[0.25em] uppercase mb-10">
              {results.length} {results.length === 1 ? "piece" : "pieces"}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12">
              <Suspense
                fallback={
                  <div className="col-span-full text-center text-[#3A3830]">
                    Loading...
                  </div>
                }
              >
                {results.map((product: DbProduct, index: number) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    priority={index < 4}
                  />
                ))}
              </Suspense>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
