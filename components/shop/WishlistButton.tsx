"use client";

import { toggleWishlist } from "@/lib/actions/wishlist";
import { useOptimistic, useTransition } from "react";

type Props = {
  productId: number;
  productSlug: string;
  isWishlisted: boolean;
};

export default function WishlistButton({
  productId,
  productSlug,
  isWishlisted,
}: Props) {
  const [isPending, startTransition] = useTransition();
  const [optimisticWishlisted, setOptimisticWishlisted] =
    useOptimistic(isWishlisted);

  function handleClick() {
    startTransition(async () => {
      setOptimisticWishlisted(!optimisticWishlisted); // instant
      await toggleWishlist(productId, productSlug); // server sync
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      aria-label={
        optimisticWishlisted ? "Remove from wishlist" : "Add to wishlist"
      }
      className={`transition-colors duration-200 ${
        optimisticWishlisted
          ? "text-[#D4A853]"
          : "text-[#3A3830] hover:text-[#7A7468]"
      }`}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill={optimisticWishlisted ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </button>
  );
}
