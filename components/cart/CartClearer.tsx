// components/cart/CartClearer.tsx
"use client";

import { useCartStore } from "@/lib/store/cartStore";
import { useEffect } from "react";

/**
 * Client component that clears the cart when mounted.
 * Used on the order confirmation page to reset cart state after successful purchase.
 */
export function CartClearer() {
  useEffect(() => {
    const clearCart = useCartStore.getState().clearCart;
    clearCart();
  }, []);

  return null;
}
