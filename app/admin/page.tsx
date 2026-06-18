// app/admin/page.tsx
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Admin — MERQ" };

export default async function AdminOverviewPage() {
  const [orderCount, userCount, productCount, revenue] = await Promise.all([
    prisma.order.count(),
    prisma.user.count(),
    prisma.product.count(),
    prisma.order.aggregate({
      _sum: { total: true },
      where: { status: { in: ["PAID", "SHIPPED", "DELIVERED"] } },
    }),
  ]);

  const revenueInDollars = ((revenue._sum.total ?? 0) / 100).toLocaleString(
    "en-US",
    {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    },
  );

  const stats = [
    { label: "Orders", value: orderCount },
    { label: "Customers", value: userCount },
    { label: "Products", value: productCount },
    { label: "Revenue", value: revenueInDollars },
  ];

  return (
    <div>
      <h1 className="font-serif text-3xl mb-10">Overview</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-[#1E1C18] border border-[#3A3830] rounded p-6"
          >
            <p className="text-xs text-[#7A7468] uppercase tracking-widest mb-2">
              {s.label}
            </p>
            <p className="font-serif text-3xl">{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
