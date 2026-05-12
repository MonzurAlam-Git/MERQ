// components/shop/ProductPanel.tsx
"use client";

import { Product, VARIANT_COLORS } from "@/lib/products";
import { useCartStore } from "@/lib/store/cartStore";
import { useState } from "react";
import ProductGallery from "./ProductGallery";

type Props = {
  product: Product;
  initialVariant: string;
};

export default function ProductPanel({ product, initialVariant }: Props) {
  const [selectedVariant, setSelectedVariant] = useState(initialVariant);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState(false);

  const addItem = useCartStore((state) => state.addItem);

  function handleAddToCart() {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      variant: selectedVariant,
      size: selectedSize,
      image:
        product.images[selectedVariant] ?? product.images[product.variants[0]],
    });
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12">
      <ProductGallery
        images={product.images}
        productName={product.name}
        activeVariant={selectedVariant}
        onVariantChange={setSelectedVariant}
      />

      <div className="lg:sticky lg:top-24 space-y-8 py-2">
        <div>
          {product.badge && (
            <span
              className={`inline-block text-[10px] tracking-[0.2em] uppercase mb-3 px-2 py-[3px] ${
                product.badge === "new"
                  ? "bg-[#D4A853] text-[#111010]"
                  : "border border-[#3A3830] text-[#7A7468]"
              }`}
            >
              {product.badge}
            </span>
          )}
          <h1 className="font-serif text-[#E8E4DE] text-3xl md:text-4xl leading-tight mb-3">
            {product.name}
          </h1>
          <p className="text-[#7A7468] text-lg">
            ${product.price.toLocaleString()}
          </p>
        </div>

        <div className="w-12 h-px bg-[#3A3830]" />

        {/* Color */}
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-[#7A7468] mb-3">
            Color — <span className="text-[#E8E4DE]">{selectedVariant}</span>
          </p>
          <div className="flex gap-2">
            {product.variants.map((v) => (
              <button
                key={v}
                title={v}
                aria-label={`Select ${v}`}
                aria-pressed={v === selectedVariant}
                onClick={() => setSelectedVariant(v)}
                className={`w-7 h-7 rounded-full ring-offset-2 ring-offset-[#111010] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A853] ${
                  v === selectedVariant
                    ? "ring-2 ring-[#D4A853]"
                    : "ring-1 ring-[#3A3830] hover:ring-[#7A7468]"
                }`}
                style={{ backgroundColor: VARIANT_COLORS[v] ?? "#3A3830" }}
              />
            ))}
          </div>
        </div>

        {/* Size */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p
              className={`text-[10px] tracking-[0.25em] uppercase ${sizeError ? "text-[#D4A853]" : "text-[#7A7468]"}`}
            >
              {sizeError ? "Select a size" : "Size"}
            </p>
            <button className="text-[10px] tracking-[0.15em] uppercase text-[#7A7468] hover:text-[#E8E4DE] transition-colors underline underline-offset-4">
              Guide
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => {
                  setSelectedSize(size);
                  setSizeError(false);
                }}
                className={`min-w-[48px] px-3 py-2 text-[11px] tracking-[0.15em] uppercase border transition-all duration-150 ${
                  size === selectedSize
                    ? "border-[#E8E4DE] text-[#E8E4DE]"
                    : "border-[#3A3830] text-[#7A7468] hover:border-[#7A7468] hover:text-[#E8E4DE]"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full bg-[#E8E4DE] text-[#111010] py-4 text-[11px] tracking-[0.3em] uppercase hover:bg-white transition-colors duration-200"
        >
          Add to Cart
        </button>

        <div className="space-y-3 pt-2 border-t border-[#3A3830]">
          {[
            "Final sale. No returns.",
            "Ships in 5–7 business days.",
            "Duty and import taxes calculated at checkout.",
          ].map((line) => (
            <p
              key={line}
              className="text-[11px] tracking-[0.1em] text-[#3A3830]"
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
