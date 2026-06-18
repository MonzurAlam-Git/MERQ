// components/BkashButton.tsx

"use client";

import { useCartStore } from "@/lib/store/cartStore";
import { useState } from "react";

export function BkashButton() {
  const [loading, setLoading] = useState(false);
  const items = useCartStore((state) => state.items);

  const totalCents = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  async function handleBkash() {
    if (!items.length) return;
    setLoading(true);

    try {
      const res = await fetch("/api/bkash/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalCents,
          items: items.map((item) => ({
            productId: item.productId,
            variant: item.variant,
            size: item.size,
            quantity: item.quantity,
            price: item.price,
          })),
        }),
      });

      const data = await res.json();

      if (data.bkashURL) {
        window.location.href = data.bkashURL;
      } else {
        alert("bKash initialization failed. Please try again.");
        setLoading(false);
      }
    } catch {
      alert("Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleBkash}
      disabled={loading || !items.length}
      className="w-full py-3 bg-[#E2136E] text-white tracking-widest uppercase text-sm hover:opacity-90 transition disabled:opacity-50"
    >
      {loading ? "Redirecting to bKash..." : "Pay with bKash"}
    </button>
  );
}
