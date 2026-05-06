// components/shop/ProductCard.tsx
"use client";

import { Product, VARIANT_COLORS } from "@/lib/products";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ProductCard({ product }: { product: Product }) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);

  const imageSrc =
    product.images[selectedVariant] ?? product.images[product.variants[0]];

  return (
    <div className="group relative">
      {/* Entire card is the navigation target */}
      <Link
        href={`/shop/${product.slug}?variant=${encodeURIComponent(selectedVariant)}`}
        className="block"
      >
        {/* Image area */}
        <div className="relative aspect-[3/4] bg-[#1E1C18] overflow-hidden mb-4">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={`${product.name} in ${selectedVariant}`}
              fill
              className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-b from-[#252318] to-[#1E1C18]" />
          )}

          {/* Badge */}
          {product.badge && (
            <span
              className={`absolute top-3 left-3 z-10 text-[10px] tracking-[0.2em] uppercase px-2 py-[3px] ${
                product.badge === "new"
                  ? "bg-[#D4A853] text-[#111010]"
                  : "border border-[#3A3830] text-[#E8E4DE]"
              }`}
            >
              {product.badge}
            </span>
          )}

          {/* Hover hint */}
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <span className="block w-full text-center text-[10px] tracking-[0.25em] uppercase text-[#7A7468] bg-[#111010]/80 py-2">
              View
            </span>
          </div>
        </div>

        {/* Name + price */}
        <div className="flex items-baseline justify-between gap-3 mb-2">
          <h3 className="font-serif text-[#E8E4DE] text-base leading-snug group-hover:text-white transition-colors">
            {product.name}
          </h3>
          <span className="text-[#7A7468] text-sm shrink-0">
            ${product.price.toLocaleString()}
          </span>
        </div>
      </Link>

      {/* Swatches — outside the Link, stop propagation */}
      <div className="flex items-center gap-1.5">
        {product.variants.map((v) => {
          const isActive = v === selectedVariant;
          return (
            <button
              key={v}
              title={v}
              aria-label={`Select ${v}`}
              aria-pressed={isActive}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedVariant(v);
              }}
              className={`w-4 h-4 rounded-full transition-all duration-150 ring-offset-2 ring-offset-[#111010] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A853] ${
                isActive
                  ? "ring-2 ring-[#D4A853] scale-110"
                  : "ring-1 ring-[#3A3830] hover:ring-[#7A7468] hover:scale-105"
              }`}
              style={{ backgroundColor: VARIANT_COLORS[v] ?? "#3A3830" }}
            />
          );
        })}
      </div>
    </div>
  );
}
