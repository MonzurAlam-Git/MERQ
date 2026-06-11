// app/account/layout.tsx

import { auth } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

const ACCOUNT_LINKS = [
  { label: "Orders", href: "/account/orders" },
  { label: "Wishlist", href: "/wishlist" },
] as const;

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  return (
    <div className="min-h-screen bg-[#111010] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Sidebar */}
          <aside className="md:w-48 shrink-0">
            <p className="text-[#7A7468] text-[10px] tracking-[0.3em] uppercase mb-6">
              Account
            </p>
            <nav className="flex md:flex-col gap-6 md:gap-4">
              {ACCOUNT_LINKS.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="text-[11px] tracking-[0.25em] uppercase text-[#7A7468] hover:text-[#E8E4DE] transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </aside>

          {/* Page content */}
          <div className="flex-1 min-w-0">{children}</div>
        </div>
      </div>
    </div>
  );
}
