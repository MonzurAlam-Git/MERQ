// components/cart/CartDrawer.tsx
"use client";

import { type CartItem, useCartStore } from "@/lib/store/cartStore";

import { createCheckoutSession } from "@/lib/actions/checkout";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CartDrawer({ isOpen, onClose }: Props) {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } =
    useCartStore();
  const total = totalPrice();

  const [isLoading, setIsLoading] = useState(false);

  async function handleCheckout() {
    setIsLoading(true);
    await createCheckoutSession(
      items.map((item: CartItem) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        variant: item.variant,
        size: item.size,
        productId: item.productId,
        slug: item.slug,
      })),
    );
    setIsLoading(false);
  }

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-[50] bg-black/60 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <div
        aria-label="Shopping cart"
        className={`fixed top-0 right-0 z-[60] h-dvh w-full md:w-[420px] bg-[#111010] border-l border-[#1E1C18] transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header — fixed height */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-[#1E1C18] shrink-0">
          <span className="text-[11px] tracking-[0.3em] uppercase text-[#E8E4DE]">
            Cart{" "}
            {items.length > 0 &&
              `(${items.reduce(
                (s: number, i: CartItem) => s + i.quantity,
                0,
              )})`}
          </span>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="text-[#7A7468] hover:text-[#E8E4DE] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M2 2L14 14M14 2L2 14"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </button>
        </div>

        {/* Empty state */}
        {items.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6">
            <p className="font-serif text-[#E8E4DE] text-2xl">Nothing here.</p>
            <p className="text-[#7A7468] text-[11px] tracking-[0.2em] uppercase">
              Your cart is empty.
            </p>
            <button
              onClick={onClose}
              className="text-[11px] tracking-[0.3em] uppercase text-[#111010] bg-[#E8E4DE] px-8 py-3 hover:bg-white transition-colors duration-200"
            >
              Browse the collection
            </button>
          </div>
        )}

        {/* Filled state */}
        {items.length > 0 && (
          <>
            {/* Item list — takes all remaining space, scrolls internally */}
            <div className="flex-1 overflow-y-auto min-h-0">
              <ul className="divide-y divide-[#1E1C18]">
                {items.map((item: CartItem) => (
                  <li
                    key={`${item.productId}-${item.variant}-${item.size}`}
                    className="flex gap-4 px-6 py-5"
                  >
                    {/* Image */}
                    <Link
                      href={`/shop/${item.slug}?variant=${encodeURIComponent(item.variant)}`}
                      onClick={onClose}
                      className="relative w-20 shrink-0 overflow-hidden bg-[#1E1C18]"
                      style={{ aspectRatio: "3/4" }}
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </Link>

                    {/* Details */}
                    <div className="flex flex-col justify-between flex-1 min-w-0 py-1">
                      <div>
                        <Link
                          href={`/shop/${item.slug}?variant=${encodeURIComponent(item.variant)}`}
                          onClick={onClose}
                          className="font-serif text-[#E8E4DE] text-base hover:text-white transition-colors leading-snug block"
                        >
                          {item.name}
                        </Link>
                        <p className="text-[#7A7468] text-[11px] tracking-[0.15em] uppercase mt-1">
                          {item.variant} · {item.size}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        {/* Quantity */}
                        <div className="flex items-center border border-[#3A3830]">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                item.variant,
                                item.size,
                                item.quantity - 1,
                              )
                            }
                            aria-label="Decrease quantity"
                            className="w-8 h-8 flex items-center justify-center text-[#7A7468] hover:text-[#E8E4DE] transition-colors"
                          >
                            −
                          </button>
                          <span className="text-[#E8E4DE] text-sm w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                item.variant,
                                item.size,
                                item.quantity + 1,
                              )
                            }
                            aria-label="Increase quantity"
                            className="w-8 h-8 flex items-center justify-center text-[#7A7468] hover:text-[#E8E4DE] transition-colors"
                          >
                            +
                          </button>
                        </div>

                        {/* Price */}
                        <span className="text-[#E8E4DE] text-sm">
                          ${(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() =>
                        removeItem(item.productId, item.variant, item.size)
                      }
                      aria-label={`Remove ${item.name}`}
                      className="text-[#3A3830] hover:text-[#7A7468] transition-colors self-start pt-1 shrink-0"
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M1 1L11 11M11 1L1 11"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer — fixed at bottom */}
            <div className="border-t border-[#1E1C18] px-6 py-6 space-y-4 shrink-0">
              <div className="flex items-center justify-between">
                <span className="text-[11px] tracking-[0.25em] uppercase text-[#7A7468]">
                  Subtotal
                </span>
                <span className="font-serif text-[#E8E4DE] text-xl">
                  ${total.toLocaleString()}
                </span>
              </div>
              <p className="text-[#3A3830] text-[10px] tracking-[0.15em]">
                Shipping and taxes calculated at checkout.
              </p>
              <button
                onClick={handleCheckout}
                disabled={isLoading}
                className="w-full bg-[#E8E4DE] text-[#111010] py-4 text-[11px] tracking-[0.3em] uppercase hover:bg-white transition-colors duration-200 disabled:opacity-50"
              >
                {isLoading ? "Redirecting..." : "Checkout"}
              </button>
              <button
                onClick={clearCart}
                className="w-full text-[11px] tracking-[0.2em] uppercase text-[#3A3830] hover:text-[#7A7468] transition-colors py-1"
              >
                Clear cart
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
