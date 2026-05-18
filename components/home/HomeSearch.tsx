// components/home/HomeSearch.tsx
"use client";

import { PRODUCTS, VARIANT_COLORS } from "@/lib/products";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

export default function HomeSearch() {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce input → query
  useEffect(() => {
    const timer = setTimeout(() => setQuery(input), 300);
    return () => clearTimeout(timer);
  }, [input]);

  // Filter products client-side
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.variants.some((v) => v.toLowerCase().includes(q)),
    );
  }, [query]);

  const hasQuery = query.trim() !== "";
  const hasResults = results.length > 0;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Input */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search pieces, categories, colors..."
          className="w-full bg-transparent border-b border-[#3A3830] focus:border-[#7A7468] outline-none py-4 pr-10 text-[#E8E4DE] placeholder:text-[#3A3830] text-lg font-serif transition-colors duration-200"
        />
        {input && (
          <button
            onClick={() => {
              setInput("");
              setQuery("");
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
            className="absolute right-0 top-1/2 -translate-y-1/2 text-[#7A7468] hover:text-[#E8E4DE] transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M1 1L13 13M13 1L1 13"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Results */}
      {hasQuery && (
        <div className="mt-8">
          {/* No results */}
          {!hasResults && (
            <p className="text-[#3A3830] text-[11px] tracking-[0.25em] uppercase">
              Nothing found for {query}.
            </p>
          )}

          {/* Results count */}
          {hasResults && (
            <p className="text-[#7A7468] text-[11px] tracking-[0.25em] uppercase mb-6">
              {results.length} {results.length === 1 ? "result" : "results"}
            </p>
          )}

          {/* Product rows */}
          {hasResults && (
            <ul className="divide-y divide-[#1E1C18]">
              {results.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/shop/${product.slug}`}
                    className="flex items-center justify-between py-4 group"
                  >
                    {/* Left: name + category */}
                    <div className="flex flex-col gap-1">
                      <span className="font-serif text-[#E8E4DE] text-lg group-hover:text-white transition-colors">
                        {product.name}
                      </span>
                      <span className="text-[10px] tracking-[0.2em] uppercase text-[#7A7468] capitalize">
                        {product.category}
                      </span>
                    </div>

                    {/* Right: swatches + price */}
                    <div className="flex items-center gap-4 shrink-0">
                      <div className="hidden sm:flex items-center gap-1.5">
                        {product.variants.map((v) => (
                          <span
                            key={v}
                            title={v}
                            className="block w-2.5 h-2.5 rounded-full ring-1 ring-[#3A3830]"
                            style={{
                              backgroundColor: VARIANT_COLORS[v] ?? "#3A3830",
                            }}
                          />
                        ))}
                      </div>
                      <span className="text-[#7A7468] text-sm">
                        {product.priceFormatted}
                      </span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        className="text-[#3A3830] group-hover:text-[#7A7468] transition-colors"
                      >
                        <path
                          d="M1 7h12M8 2l5 5-5 5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {/* View all link */}
          {hasResults && (
            <div className="mt-6 pt-4 border-t border-[#1E1C18]">
              <Link
                href={`/search?q=${encodeURIComponent(query)}`}
                className="text-[11px] tracking-[0.25em] uppercase text-[#7A7468] hover:text-[#E8E4DE] transition-colors"
              >
                View all results on search page →
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
