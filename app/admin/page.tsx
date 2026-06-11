// app/admin/page.tsx
import { db } from "@/lib/db";

export default async function AdminOverviewPage() {
  const [orderCount, userCount, revenueResult] = await Promise.all([
    db.order.count(),
    db.user.count(),
    db.order.aggregate({
      _sum: { total: true },
      where: { status: { not: "CANCELLED" } },
    }),
  ]);

  const revenue = revenueResult._sum.total ?? 0;

  const stats = [
    { label: "Total Orders", value: orderCount.toString() },
    { label: "Total Users", value: userCount.toString() },
    {
      label: "Total Revenue",
      value: `$${(revenue / 100).toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
    },
  ];

  return (
    <div>
      <h1 className="font-serif text-3xl text-[#E8E4DE] mb-10">Overview</h1>
      <div className="grid grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-[#1E1C18] border border-[#3A3830] p-8"
          >
            <p className="text-[#7A7468] text-xs tracking-widest uppercase mb-3">
              {stat.label}
            </p>
            <p className="font-serif text-4xl text-[#E8E4DE]">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
