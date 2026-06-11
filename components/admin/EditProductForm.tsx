// components/admin/EditProductForm.tsx
"use client";

import { updateProduct } from "@/lib/actions/admin";
import type { Product } from "@prisma/client";
import { useState, useTransition } from "react";

const BADGE_OPTIONS = ["", "new", "bestseller"];

export default function EditProductForm({ product }: { product: Product }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [badge, setBadge] = useState(product.badge ?? "");
  const [isPending, startTransition] = useTransition();

  function handleCancel() {
    setName(product.name);
    setPrice(product.price);
    setBadge(product.badge ?? "");
    setEditing(false);
  }

  function handleSave() {
    startTransition(async () => {
      await updateProduct({
        id: product.id,
        name,
        price,
        badge: badge || null,
      });
      setEditing(false);
    });
  }

  if (!editing) {
    return (
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] items-center px-6 py-4 border-b border-[#3A3830] last:border-0">
        <span className="text-[#E8E4DE] text-sm">{name}</span>
        <span className="text-[#7A7468] text-xs tracking-widest uppercase">
          {product.category}
        </span>
        <span className="text-[#E8E4DE] text-sm">
          ${(price / 100).toFixed(2)}
        </span>
        <span className="text-[#7A7468] text-xs tracking-widest uppercase">
          {badge || "—"}
        </span>
        <button
          onClick={() => setEditing(true)}
          className="text-xs tracking-widest uppercase px-4 py-2 border border-[#3A3830] text-[#7A7468] hover:border-[#E8E4DE] hover:text-[#E8E4DE] transition-colors"
        >
          Edit
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] items-center px-6 py-3 border-b border-[#3A3830] last:border-0 bg-[#1E1C18]">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="bg-transparent border-b border-[#3A3830] text-[#E8E4DE] text-sm py-1 pr-4 focus:outline-none focus:border-[#3D9E8C]"
      />
      <span className="text-[#7A7468] text-xs tracking-widest uppercase">
        {product.category}
      </span>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        className="bg-transparent border-b border-[#3A3830] text-[#E8E4DE] text-sm py-1 w-24 focus:outline-none focus:border-[#3D9E8C]"
      />
      <select
        value={badge}
        onChange={(e) => setBadge(e.target.value)}
        className="bg-[#111010] border border-[#3A3830] text-[#E8E4DE] text-xs tracking-widest uppercase py-1 px-2 focus:outline-none focus:border-[#3D9E8C]"
      >
        {BADGE_OPTIONS.map((b) => (
          <option key={b} value={b}>
            {b || "none"}
          </option>
        ))}
      </select>
      <div className="flex gap-2">
        <button
          onClick={handleSave}
          disabled={isPending}
          className="text-xs tracking-widest uppercase px-4 py-2 border border-[#3D9E8C] text-[#3D9E8C] hover:bg-[#3D9E8C] hover:text-[#111010] transition-colors disabled:opacity-40"
        >
          {isPending ? "Saving…" : "Save"}
        </button>
        <button
          onClick={handleCancel}
          disabled={isPending}
          className="text-xs tracking-widest uppercase px-4 py-2 border border-[#3A3830] text-[#7A7468] hover:border-[#E8E4DE] hover:text-[#E8E4DE] transition-colors disabled:opacity-40"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
