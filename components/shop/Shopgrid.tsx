// components/shop/ShopGrid.tsx
"use client";

import { DbProduct } from "@/lib/products";
import ProductCard from "./product-card";

export default function ShopGrid({ products }: { products: DbProduct[] }) {
  return (
    <div>
      <p className="text-[#7A7468] text-[11px] tracking-[0.25em] uppercase mb-10">
        {products.length} pieces
      </p>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={index < 4}
            />
          ))}
        </div>
      ) : (
        <p className="text-[#3A3830] text-[11px] tracking-[0.25em] uppercase">
          Nothing found.
        </p>
      )}
    </div>
  );
}
