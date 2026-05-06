// app/search/page.tsx

import SearchInput from "@/components/search/SearchInput";
import ProductCard from "@/components/shop/product-card";

import { PRODUCTS } from "@/lib/products";
import type { Metadata } from "next";
import { Suspense } from "react";

type SearchParams = Promise<{ q?: string }>;

export const metadata: Metadata = {
  title: "Search — MERQ",
  description: "Search the collection.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { q } = await searchParams;
  const query = q?.trim().toLowerCase() ?? "";

  const results = query
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.variants.some((v) => v.toLowerCase().includes(query)),
      )
    : [];

  return (
    <main className="min-h-screen bg-onyx pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 pb-6 border-b border-[#3A3830]">
          <h1 className="font-serif text-[#E8E4DE] text-5xl md:text-6xl mb-8">
            Search
          </h1>
          <Suspense>
            <SearchInput />
          </Suspense>
        </div>

        {/* Results */}
        {query === "" && (
          <p className="text-[#3A3830] text-[11px] tracking-[0.25em] uppercase">
            Start typing.
          </p>
        )}

        {query !== "" && results.length === 0 && (
          <p className="text-[#3A3830] text-[11px] tracking-[0.25em] uppercase">
            Nothing found for {q}.
          </p>
        )}

        {results.length > 0 && (
          <>
            <p className="text-[#7A7468] text-[11px] tracking-[0.25em] uppercase mb-8">
              {results.length} {results.length === 1 ? "result" : "results"} for
              {q}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
