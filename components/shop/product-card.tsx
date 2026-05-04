import { Product, VARIANT_COLORS } from "@/lib/products";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      {/* Image area */}
      <div className="relative aspect-3/4 bg-[#1E1C18] overflow-hidden mb-4">
        {/* Placeholder until Cloudinary images exist */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#252318] to-[#1E1C18] group-hover:from-[#2A2820] transition-colors duration-500" />

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

        {/* Quick-view hint on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <span className="block w-full text-center text-[10px] tracking-[0.25em] uppercase text-[#7A7468] bg-[#111010]/80 py-2">
            View
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="space-y-2">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-serif text-[#E8E4DE] text-base leading-snug group-hover:text-white transition-colors">
            {product.name}
          </h3>
          <span className="text-[#7A7468] text-sm shrink-0">
            ${product.price.toLocaleString()}
          </span>
        </div>

        {/* Swatches */}
        <div className="flex items-center gap-1.5">
          {product.variants.map((v) => (
            <span
              key={v}
              title={v}
              className="block w-2.5 h-2.5 rounded-full ring-1 ring-[#3A3830]"
              style={{ backgroundColor: VARIANT_COLORS[v] ?? "#3A3830" }}
            />
          ))}
        </div>
      </div>
    </Link>
  );
}
