// components/shop/ProductGallery.tsx
"use client";

import Image from "next/image";

type Props = {
  images: Record<string, string>;
  productName: string;
  activeVariant: string;
  onVariantChange: (variant: string) => void;
};

export default function ProductGallery({
  images,
  productName,
  activeVariant,
  onVariantChange,
}: Props) {
  // Object.keys gets all the keys from an object called images and stores them in an array called variants
  const variants: string[] = Object.keys(images);
  const activeSrc = images[activeVariant] ?? images[variants[0]];

  return (
    <div className="flex gap-4">
      {/* Thumbnail strip — one per variant */}
      <div className="hidden md:flex flex-col gap-2 w-16 shrink-0">
        {variants.map((variant: string) => (
          <button
            key={variant}
            onClick={() => onVariantChange(variant)}
            title={variant}
            className={`relative aspect-[3/4] w-full overflow-hidden border transition-colors duration-200 ${
              activeVariant === variant
                ? "border-[#D4A853]"
                : "border-[#3A3830] hover:border-[#7A7468]"
            }`}
          >
            <Image
              src={images[variant]}
              alt={`${productName} in ${variant}`}
              fill
              className="object-cover"
              sizes="64px"
            />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="flex-1">
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#1E1C18]">
          <Image
            src={activeSrc}
            alt={`${productName} in ${activeVariant}`}
            fill
            className="object-cover transition-opacity duration-300"
            sizes="(max-width: 1024px) 100vw, 55vw"
            priority
          />

          {/* Mobile dot indicators */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 md:hidden">
            {variants.map((variant: string) => (
              <button
                key={variant}
                onClick={() => onVariantChange(variant)}
                className={`w-1 h-1 rounded-full transition-colors duration-200 ${
                  activeVariant === variant ? "bg-[#E8E4DE]" : "bg-[#3A3830]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
