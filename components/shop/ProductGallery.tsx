// components/shop/ProductGallery.tsx
"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  images: string[];
  productName: string;
};

export default function ProductGallery({ images, productName }: Props) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex gap-4">
      <div className="hidden md:flex flex-col gap-2 w-16 shrink-0">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`relative aspect-3/4 w-full overflow-hidden border transition-colors duration-200 ${
              active === i
                ? "border-[#D4A853]"
                : "border-[#3A3830] hover:border-[#7A7468]"
            }`}
          >
            <Image
              src={src}
              alt={`${productName} view ${i + 1}`}
              fill
              className="object-cover"
              sizes="64px"
            />
          </button>
        ))}
      </div>

      <div className="flex-1">
        <div className="relative aspect-3/4 w-full overflow-hidden bg-[#1E1C18]">
          <Image
            src={images[active]}
            alt={productName}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 55vw"
            priority
          />
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 md:hidden">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-1 h-1 rounded-full transition-colors duration-200 ${
                  active === i ? "bg-[#E8E4DE]" : "bg-[#3A3830]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
