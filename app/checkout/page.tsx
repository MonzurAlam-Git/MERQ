// app/checkout/page.tsx
"use client";

import { BkashButton } from "@/components/bkash/BkashButton";
import { useCartStore } from "@/lib/store/cartStore";
import Image from "next/image";
import Link from "next/link";

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore((state) => state.totalPrice);

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#111010] flex flex-col items-center justify-center gap-4">
        <p className="text-[#7A7468] tracking-widest uppercase text-sm">
          Your cart is empty.
        </p>
        <Link
          href="/shop"
          className="text-[#E8E4DE] text-xs tracking-[0.2em] uppercase underline underline-offset-4"
        >
          Return to Shop
        </Link>
      </main>
    );
  }

  const subtotalCents = totalPrice();
  const subtotalDollars = subtotalCents / 100;

  return (
    <main className="min-h-screen bg-[#111010] text-[#E8E4DE]">
      <div className="max-w-2xl mx-auto px-6 py-20">
        {/* Header */}
        <h1 className="font-serif text-3xl mb-12 tracking-wide">Checkout</h1>

        {/* Order Summary */}
        <div className="space-y-6 mb-10">
          <p className="text-[10px] tracking-[0.25em] uppercase text-[#7A7468]">
            Order Summary
          </p>

          <div className="divide-y divide-[#1E1C18]">
            {items.map((item) => (
              <div
                key={`${item.productId}-${item.variant}-${item.size}`}
                className="flex gap-4 py-5"
              >
                <div className="relative w-16 h-20 bg-[#1E1C18] flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <p className="font-serif text-[#E8E4DE] text-lg leading-tight">
                      {item.name}
                    </p>
                    <p className="text-[#7A7468] text-xs tracking-widest uppercase mt-1">
                      {item.variant} · {item.size}
                    </p>
                  </div>
                  <p className="text-[#7A7468] text-xs">Qty: {item.quantity}</p>
                </div>

                <p className="text-[#E8E4DE] text-sm tabular-nums">
                  ${((item.price * item.quantity) / 100).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Totals */}
        <div className="border-t border-[#3A3830] pt-6 space-y-3 mb-10">
          <div className="flex justify-between text-sm text-[#7A7468]">
            <span className="tracking-widest uppercase text-xs">Subtotal</span>
            <span>${subtotalDollars.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-[#7A7468]">
            <span className="tracking-widest uppercase text-xs">Shipping</span>
            <span>Calculated at delivery</span>
          </div>
          <div className="flex justify-between text-[#E8E4DE] font-medium pt-3 border-t border-[#3A3830]">
            <span className="tracking-widest uppercase text-xs">Total</span>
            <span className="font-serif text-xl">
              ${subtotalDollars.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Payment */}
        <div className="space-y-3">
          <p className="text-[10px] tracking-[0.25em] uppercase text-[#7A7468] mb-4">
            Payment Method
          </p>
          <BkashButton />
        </div>
      </div>
    </main>
  );
}
