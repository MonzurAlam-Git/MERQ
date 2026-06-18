// app/admin/layout.tsx
import { auth } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

const NAV = [
  { label: "Overview", href: "/admin" },
  { label: "Orders", href: "/admin/orders" },
  { label: "Products", href: "/admin/products" },
  { label: "Users", href: "/admin/users" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") redirect("/");

  return (
    <div className="min-h-screen flex bg-[#111010] text-[#E8E4DE]">
      {/* Sidebar */}
      <aside className="w-52 shrink-0 border-r border-[#3A3830] flex flex-col pt-12 px-6 gap-1">
        <p className="font-serif text-lg mb-8 tracking-widest">MERQ</p>
        <p className="text-xs text-[#7A7468] uppercase tracking-widest mb-4">
          Admin
        </p>
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-sm text-[#7A7468] hover:text-[#E8E4DE] py-1.5 transition-colors"
          >
            {item.label}
          </Link>
        ))}
        <div className="mt-auto pb-8">
          <p className="text-xs text-[#3A3830]">{session.user?.email}</p>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 px-10 py-12 overflow-y-auto">{children}</main>
    </div>
  );
}
