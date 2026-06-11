// app/admin/layout.tsx
import { auth } from "@/auth";
import Link from "next/link";

const navLinks = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/users", label: "Users" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="min-h-screen bg-[#111010] flex">
      <aside className="w-56 border-r border-[#3A3830] flex flex-col py-10 px-6 gap-1 shrink-0">
        <p className="text-[#7A7468] text-xs tracking-widest uppercase mb-8">
          Admin
        </p>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-[#E8E4DE] text-sm py-2 px-3 hover:bg-[#1E1C18] transition-colors"
          >
            {link.label}
          </Link>
        ))}
        <div className="mt-auto pt-8 border-t border-[#3A3830]">
          <p className="text-[#7A7468] text-xs truncate">
            {session?.user?.email}
          </p>
          <p className="text-[#3D9E8C] text-xs tracking-widest uppercase mt-1">
            Admin
          </p>
        </div>
      </aside>
      <main className="flex-1 px-10 py-10 overflow-y-auto">{children}</main>
    </div>
  );
}
