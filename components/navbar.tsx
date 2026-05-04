// components/navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/editorial", label: "Editorial" },
  { href: "/about", label: "About" },
] as const; // `as const` locks the type — href is a string literal, not just string

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-smoke/40 bg-onyx/80 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        {/* Wordmark */}
        <Link
          href="/"
          className="font-serif text-2xl tracking-[0.25em] text-ivory"
        >
          MERQ
          <span className="text-5xl text-accent animate-pulse">.</span>
        </Link>

        {/* Center links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`text-xs tracking-widest uppercase transition-colors ${
                  pathname.startsWith(href)
                    ? "text-ivory"
                    : "text-ash hover:text-ivory"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right icons — stubs for now */}
        <div className="flex items-center gap-5">
          <button
            aria-label="Search"
            className="text-ash hover:text-ivory transition-colors text-sm tracking-widest"
          >
            Search
          </button>
          <button
            aria-label="Cart"
            className="text-ash hover:text-ivory transition-colors text-sm tracking-widest"
          >
            Bag (0)
          </button>
        </div>
      </nav>
    </header>
  );
}
