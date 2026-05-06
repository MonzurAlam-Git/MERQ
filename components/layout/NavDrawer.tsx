// components/layout/NavDrawer.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Shop", href: "/shop" },
  { label: "Outerwear", href: "/shop?category=outerwear" },
  { label: "Tailoring", href: "/shop?category=tailoring" },
  { label: "About", href: "/about" },
] as const;

type NavLink = {
  readonly label: string;
  readonly href: string;
};

export default function NavDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
        aria-expanded={isOpen}
        className="flex flex-col justify-center gap-[5px] w-8 h-8 shrink-0"
      >
        <span
          className={`block h-px bg-[#E8E4DE] transition-all duration-300 origin-center ${isOpen ? "rotate-45 translate-y-[6px]" : ""}`}
        />
        <span
          className={`block h-px bg-[#E8E4DE] transition-all duration-300 ${isOpen ? "opacity-0 scale-x-0" : ""}`}
        />
        <span
          className={`block h-px bg-[#E8E4DE] transition-all duration-300 origin-center ${isOpen ? "-rotate-45 -translate-y-[6px]" : ""}`}
        />
      </button>

      {/* Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-[50] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer panel */}
      <div
        /* @ts-expect-error — inert is a valid HTML attribute, not yet in React's types  */
        // inert={isOpen ? undefined : ""}

        inert={isOpen ? false : true}
        aria-label="Navigation menu"
        className={`fixed top-16 right-0 z-[60] h-[calc(100vh-4rem)] w-full md:w-72 bg-onyx border-l border-[#1E1C18] flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-[#1E1C18]">
          <span className="font-serif text-[#E8E4DE] tracking-[0.3em] uppercase text-sm">
            MERQ
          </span>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="text-[#7A7468] hover:text-[#E8E4DE] transition-colors w-8 h-8 flex items-center justify-center"
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

        {/* Nav links */}
        <nav className="flex flex-col px-6 pt-8 gap-6 flex-1">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setIsOpen(false)}
              className="font-serif text-[#E8E4DE] text-2xl hover:text-white transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Drawer footer */}
        <div className="px-6 pb-10 flex flex-col gap-4 border-t border-[#1E1C18] pt-6">
          <Link
            href="/search"
            onClick={() => setIsOpen(false)}
            className="text-[11px] tracking-[0.2em] uppercase text-[#7A7468] hover:text-[#E8E4DE] transition-colors"
          >
            Search
          </Link>
          <Link
            href="/account"
            onClick={() => setIsOpen(false)}
            className="text-[11px] tracking-[0.2em] uppercase text-[#7A7468] hover:text-[#E8E4DE] transition-colors"
          >
            Account
          </Link>
          <p className="text-[10px] tracking-[0.15em] text-[#3A3830] uppercase mt-2">
            Nothing excess. Nothing missing.
          </p>
        </div>
      </div>
    </>
  );
}
