// components/layout/NavSearch.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function NavSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState(() => searchParams.get("q") ?? "");
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  // Debounce: push query to URL 300ms after user stops typing
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      const current = new URLSearchParams(searchParams.toString());
      if (input.trim()) {
        current.set("q", input.trim());
      } else {
        current.delete("q");
      }
      router.push(`/shop?${current.toString()}`, { scroll: false });
    }, 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, isOpen]);
  // ↑ router and searchParams intentionally omitted — including them
  //   restarts the debounce timer on every navigation and causes a loop

  function handleOpen() {
    setIsOpen(true);
    router.push("/shop");
  }

  function handleClose() {
    setIsOpen(false);
    setInput("");
    const current = new URLSearchParams(searchParams.toString());
    current.delete("q");
    router.push(`/shop?${current.toString()}`, { scroll: false });
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") handleClose();
  }

  return (
    <div className="flex items-center">
      {/* Expandable input */}
      <div
        className={`flex items-center overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "w-48 md:w-64 opacity-100" : "w-0 opacity-0"
        }`}
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search..."
          className="w-3/5 ml-2w-3/4 bg-transparent outline-none border-b border-[#3A3830] focus:border-[#7A7468] py-1 text-[#E8E4DE] placeholder:text-[#3A3830] text-[13px] transition-colors duration-200"
        />
      </div>

      {/* Toggle button */}
      <button
        onClick={isOpen ? handleClose : handleOpen}
        aria-label={isOpen ? "Close search" : "Open search"}
        className="ml-2 text-[#7A7468] hover:text-[#E8E4DE] transition-colors duration-200 flex items-center justify-center w-8 h-8"
      >
        {isOpen ? (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M1 1L13 13M13 1L1 13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle
              cx="6.5"
              cy="6.5"
              r="5"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M10.5 10.5L14 14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
