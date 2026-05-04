// components/product-card.tsx

import Image from "next/image";
import Link from "next/link";
import { Product } from "../lib/products";

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
  return (
    <Link
      href={`/shop/${product.id}`}
      className="group relative flex flex-col bg-pitch"
    >
      {/* Image */}
      <div className="relative aspect-3/4 overflow-hidden bg-smoke/20">
        <Image
          src={`https://picsum.photos/seed/${product.id}/600/800`}
          // src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 text-[10px] tracking-widest uppercase px-2 py-1 bg-onyx/80 text-accent">
            {product.badge}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex items-start justify-between px-3 py-4">
        <div>
          <p className="font-serif text-base text-ivory leading-snug">
            {product.name}
          </p>
          <p className="mt-1 text-xs text-ash tracking-wide">
            {product.variants.join(" · ")}
          </p>
        </div>
        <p className="text-sm text-ivory shrink-0 ml-4">
          ${product.price.toLocaleString()}
        </p>
      </div>

      {/* accent underline on hover */}
      <div className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" />
    </Link>
  );
}
