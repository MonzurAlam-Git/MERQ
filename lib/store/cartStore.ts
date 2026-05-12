// lib/store/cartStore.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  productId: number;
  slug: string;
  name: string;
  price: number;
  variant: string;
  size: string;
  image: string;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (productId: number, variant: string, size: string) => void;
  updateQuantity: (
    productId: number,
    variant: string,
    size: string,
    quantity: number,
  ) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
};

export const useCartStore = create<CartStore>()(
  // persist saves the cart to localStorage automatically
  // so it survives page refresh
  persist(
    (set, get) => ({
      items: [],

      addItem: (newItem) =>
        set((state) => {
          const existing = state.items.find(
            (i) =>
              i.productId === newItem.productId &&
              i.variant === newItem.variant &&
              i.size === newItem.size,
          );
          if (existing) {
            // Same product + variant + size → increment quantity
            return {
              items: state.items.map((i) =>
                i.productId === newItem.productId &&
                i.variant === newItem.variant &&
                i.size === newItem.size
                  ? { ...i, quantity: i.quantity + 1 }
                  : i,
              ),
            };
          }
          // New combination → add to cart
          return { items: [...state.items, { ...newItem, quantity: 1 }] };
        }),

      removeItem: (productId, variant, size) =>
        set((state) => ({
          items: state.items.filter(
            (i) =>
              !(
                i.productId === productId &&
                i.variant === variant &&
                i.size === size
              ),
          ),
        })),

      updateQuantity: (productId, variant, size, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? // quantity hits 0 → remove the item entirely
                state.items.filter(
                  (i) =>
                    !(
                      i.productId === productId &&
                      i.variant === variant &&
                      i.size === size
                    ),
                )
              : state.items.map((i) =>
                  i.productId === productId &&
                  i.variant === variant &&
                  i.size === size
                    ? { ...i, quantity }
                    : i,
                ),
        })),

      clearCart: () => set({ items: [] }),

      // get() reads current state — used inside derived functions
      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      totalPrice: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    { name: "merq-cart" }, // localStorage key
  ),
);
