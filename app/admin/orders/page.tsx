// app/admin/orders/page.tsx
import MarkShippedButton from "@/components/admin/MarkShippedButton";
import { markOrderShipped } from "@/lib/actions/admin";
import { db } from "@/lib/db";
import type { OrderStatus } from "@prisma/client";

type Props = {
  searchParams: Promise<{ status?: string }>;
};

const STATUS_OPTIONS = [
  "ALL",
  "PENDING",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

export default async function AdminOrdersPage({ searchParams }: Props) {
  const { status } = await searchParams;

  const orders = await db.order.findMany({
    where:
      status && status !== "ALL"
        ? { status: status as OrderStatus }
        : undefined,
    include: { user: { select: { email: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="font-serif text-3xl text-[#E8E4DE] mb-10">Orders</h1>

      <div className="flex gap-2 mb-8 flex-wrap">
        {STATUS_OPTIONS.map((s) => (
          <a
            key={s}
            href={s === "ALL" ? "/admin/orders" : `/admin/orders?status=${s}`}
            className={`text-xs tracking-widest uppercase px-4 py-2 border transition-colors ${
              (s === "ALL" && !status) || s === status
                ? "border-[#E8E4DE] text-[#E8E4DE]"
                : "border-[#3A3830] text-[#7A7468] hover:border-[#E8E4DE] hover:text-[#E8E4DE]"
            }`}
          >
            {s}
          </a>
        ))}
      </div>

      <div className="border border-[#3A3830]">
        <div className="grid grid-cols-[1fr_1.5fr_1fr_1fr_auto] text-xs tracking-widest uppercase text-[#7A7468] px-6 py-3 border-b border-[#3A3830]">
          <span>Order ID</span>
          <span>Customer</span>
          <span>Total</span>
          <span>Status</span>
          <span></span>
        </div>

        {orders.length === 0 && (
          <p className="text-[#7A7468] text-sm px-6 py-8">No orders found.</p>
        )}

        {orders.map((order) => (
          <div
            key={order.id}
            className="grid grid-cols-[1fr_1.5fr_1fr_1fr_auto] items-center px-6 py-4 border-b border-[#3A3830] last:border-0"
          >
            <span className="text-[#7A7468] text-xs font-mono">
              {order.id.toString().slice(0, 8)}…
            </span>
            <span className="text-[#E8E4DE] text-sm">{order.user.email}</span>
            <span className="text-[#E8E4DE] text-sm">
              ${(order.total / 100).toFixed(2)}
            </span>
            <span
              className={`text-xs tracking-widest uppercase ${
                order.status === "SHIPPED" || order.status === "DELIVERED"
                  ? "text-[#3D9E8C]"
                  : order.status === "CANCELLED"
                    ? "text-red-500"
                    : "text-[#7A7468]"
              }`}
            >
              {order.status}
            </span>
            <MarkShippedButton
              orderId={order.id}
              currentStatus={order.status}
              action={markOrderShipped}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
