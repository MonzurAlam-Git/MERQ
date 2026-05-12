// components/layout/Navbar.tsx

import CartButton from "@/components/cart/CartButton";
import Link from "next/link";
import { Suspense } from "react";
import NavDrawer from "./NavDrawer";
import NavSearch from "./NavSearch";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-[55] bg-[#111010]/90 backdrop-blur-sm border-b border-[#1E1C18]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="font-serif text-[#E8E4DE] text-xl tracking-[0.3em] uppercase hover:text-white transition-colors"
          >
            MERQ
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: "Shop", href: "/shop" },
              { label: "Outerwear", href: "/shop?category=outerwear" },
              { label: "Tailoring", href: "/shop?category=tailoring" },
              { label: "About", href: "/about" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-[11px] tracking-[0.2em] uppercase text-[#7A7468] hover:text-[#E8E4DE] transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-4">
            <Suspense>
              <NavSearch />
            </Suspense>
            <CartButton />
          </div>

          {/* Mobile actions */}
          <div className="flex md:hidden items-center gap-3">
            <Suspense>
              <NavSearch />
            </Suspense>
            <CartButton />
            <NavDrawer />
          </div>
        </div>
      </div>
    </header>
  );
}
