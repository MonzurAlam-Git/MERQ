// components/shop/CategoryFilter.tsx
"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const CATEGORIES = [
  { label: "All", value: "" },
  { label: "Outerwear", value: "outerwear" },
  { label: "Tailoring", value: "tailoring" },
  { label: "Knitwear", value: "knitwear" },
  { label: "Shirts", value: "shirts" },
  { label: "Dresses", value: "dresses" },
  { label: "Accessories", value: "accessories" },
] as const;
type CategoryOption = (typeof CATEGORIES)[number];
// ↑ "as const" locks the array so TypeScript knows the exact string values
//   instead of widening them to just `string`. Without it, `value` would
//   just be type string and you'd lose autocomplete + type-safety.

export default function CategoryFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = searchParams.get("category") ?? "";

  function select(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("category", value);
    } else {
      params.delete("category");
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <nav className="flex gap-6 overflow-x-auto scrollbar-none">
      {CATEGORIES.map(({ label, value }: CategoryOption) => {
        const isActive = active === value;
        return (
          <button
            key={value || "all"}
            onClick={() => select(value)}
            className={`relative text-[11px] tracking-[0.2em] uppercase whitespace-nowrap pb-2 transition-colors duration-200 ${
              isActive
                ? "text-[#E8E4DE]"
                : "text-[#7A7468] hover:text-[#E8E4DE]"
            }`}
          >
            {label}
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-px bg-accent" />
            )}
          </button>
        );
      })}
    </nav>
  );
}
