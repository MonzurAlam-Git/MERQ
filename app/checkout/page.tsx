// app/checkout/page.tsx
"use client";

import { BkashButton } from "@/components/bkash/BkashButton";
import { placeCodOrder } from "@/lib/actions/cod";
import { createStripeSession } from "@/lib/actions/stripe";

import { useCartStore } from "@/lib/store/cartStore";
import Image from "next/image";
import { useState } from "react";

type Method = "cod" | "bkash" | "card";

const methods: { id: Method; label: string; description: string }[] = [
  {
    id: "cod",
    label: "Cash on Delivery",
    description: "Pay when your order arrives.",
  },
  {
    id: "bkash",
    label: "Pay with bKash",
    description: "Instant mobile payment via bKash.",
  },
  {
    id: "card",
    label: "Card Payment",
    description: "Visa, Mastercard via Stripe.",
  },
];

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore((state) => state.totalPrice);
  const [selected, setSelected] = useState<Method | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#111010] flex items-center justify-center">
        <p className="text-[#7A7468] text-sm">Your cart is empty.</p>
      </main>
    );
  }

  const total = totalPrice();

  async function handleProceed() {
    if (!selected) return;
    setError("");
    setLoading(true);

    try {
      if (selected === "cod") {
        const result = await placeCodOrder(items);
        if (result.error) {
          setError(result.error);
        } else {
          window.location.href = `/order-confirmation/${result.orderId}`;
        }
      }

      if (selected === "card") {
        const result = await createStripeSession(items);
        if (result.error) {
          setError(result.error);
        } else if (result.url) {
          window.location.href = result.url;
        }
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#111010] px-4 py-20">
      <div className="max-w-lg mx-auto space-y-10">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-widest text-[#7A7468]">
            Checkout
          </p>
          <h1 className="font-serif text-3xl text-[#E8E4DE]">Payment</h1>
        </div>

        {/* Order summary */}
        {/* Order summary */}
        <div className="border border-[#3A3830] divide-y divide-[#3A3830]">
          {items.map((item) => (
            <div
              key={`${item.productId}-${item.variant}-${item.size}`}
              className="flex gap-4 p-4"
            >
              {/* Thumbnail */}
              <div className="relative w-16 h-20 bg-[#1E1C18] flex-shrink-0 overflow-hidden">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-[#3A3830]" />
                )}
              </div>

              {/* Details */}
              <div className="flex-1 flex flex-col justify-between min-w-0">
                <div className="space-y-0.5">
                  <p className="text-sm text-[#E8E4DE] truncate">{item.name}</p>
                  <p className="text-xs text-[#7A7468]">
                    {item.variant} · {item.size}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-[#7A7468]">Qty {item.quantity}</p>
                  <p className="text-sm text-[#E8E4DE]">
                    ${((item.price * item.quantity) / 100).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Total */}
          <div className="flex justify-between px-4 py-3">
            <span className="text-xs uppercase tracking-widest text-[#7A7468]">
              Total
            </span>
            <span className="font-serif text-[#E8E4DE]">
              ${(total / 100).toFixed(2)}
            </span>
          </div>
        </div>
        {/* Payment method selection */}
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-widest text-[#7A7468]">
            Select payment method
          </p>
          {methods.map((method) => (
            <button
              key={method.id}
              onClick={() => setSelected(method.id)}
              className={`w-full text-left border p-4 transition-colors ${
                selected === method.id
                  ? "border-[#3D9E8C] bg-[#1E1C18]"
                  : "border-[#3A3830] hover:border-[#7A7468]"
              }`}
            >
              <p className="text-sm text-[#E8E4DE]">{method.label}</p>
              <p className="text-xs text-[#7A7468] mt-0.5">
                {method.description}
              </p>
            </button>
          ))}
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        {/* Action */}
        {selected === "bkash" ? (
          <BkashButton />
        ) : (
          <button
            onClick={handleProceed}
            disabled={!selected || loading}
            className="w-full border border-[#E8E4DE] text-[#E8E4DE] text-xs uppercase tracking-widest py-3 hover:bg-[#E8E4DE] hover:text-[#111010] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : "Confirm order"}
          </button>
        )}
      </div>
    </main>
  );
}
