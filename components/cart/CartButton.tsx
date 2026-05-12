// components/cart/CartButton.tsx
"use client";

import { useHasMounted } from "@/app/hooks/useHasMounted";
import { useCartStore } from "@/lib/store/cartStore";
import { useState } from "react";
import CartDrawer from "./cartDrawer";

export default function CartButton() {
  const [isOpen, setIsOpen] = useState(false);
  const hasMounted = useHasMounted();

  const totalItems = useCartStore((state) => state.totalItems());
  // ↑ selector pattern — only re-renders when totalItems changes,
  //   not on every store update

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open cart"
        className="text-[11px] tracking-[0.2em] uppercase text-[#7A7468] hover:text-[#E8E4DE] transition-colors duration-200"
      >
        Cart {hasMounted && totalItems > 0 && `(${totalItems})`}
      </button>

      <CartDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
