// app/order-confirmation/[orderId]/ClearCart.tsx
"use client";

import { useCartStore } from "@/lib/store/cartStore";
import { useEffect } from "react";

export default function ClearCart() {
  const clearCart = useCartStore((s) => s.clearCart);
  useEffect(() => {
    clearCart();
  }, [clearCart]);
  return null;
}
