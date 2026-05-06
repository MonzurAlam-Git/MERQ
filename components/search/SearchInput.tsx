// components/search/SearchInput.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Seed input from URL on mount (handles direct navigation + back button)
  const [input, setInput] = useState(searchParams.get("q") ?? "");
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Debounce: update URL 300ms after user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      input.trim() ? params.set("q", input.trim()) : params.delete("q");
      router.push(`/search?${params.toString()}`, { scroll: false });
    }, 300);

    return () => clearTimeout(timer);
  }, [input]);
  // ↑ searchParams and router intentionally omitted from deps —
  //   including them causes the effect to re-run on every navigation,
  //   which restarts the debounce timer and breaks the UX

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search pieces, categories, colors..."
        className="w-full bg-transparent border-b border-[#3A3830] focus:border-[#7A7468] outline-none py-3 pr-10 text-[#E8E4DE] placeholder:text-[#3A3830] text-lg font-serif transition-colors duration-200"
      />

      {/* Clear button */}
      {input && (
        <button
          onClick={() => {
            setInput("");
            inputRef.current?.focus();
          }}
          aria-label="Clear search"
          className="absolute right-0 top-1/2 -translate-y-1/2 text-[#7A7468] hover:text-[#E8E4DE] transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M1 1L13 13M13 1L1 13"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
