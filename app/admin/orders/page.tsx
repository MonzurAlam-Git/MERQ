// app/admin/orders/page.tsx
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { markShipped } from "./_actions";

export const metadata = { title: "Orders — Admin — MERQ" };

const STATUS_OPTIONS = [
  "ALL",
  "PENDING",
  "PAID",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

// searchParams is async in Next.js 15
export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const filter = status && status !== "ALL" ? status : undefined;

  const orders = await prisma.order.findMany({
    where: filter
      ? {
          status: filter as
            | "PENDING"
            | "PAID"
            | "SHIPPED"
            | "DELIVERED"
            | "CANCELLED",
        }
      : undefined,
    include: {
      user: { select: { email: true, name: true } },
      orderItems: { include: { product: { select: { name: true } } } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="font-serif text-3xl mb-8">Orders</h1>

      {/* Status filter — plain links, URL is the state */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {STATUS_OPTIONS.map((s) => {
          const active = (status ?? "ALL") === s;
          return (
            <Link
              key={s}
              href={s === "ALL" ? "/admin/orders" : `/admin/orders?status=${s}`}
              className={`text-xs px-3 py-1.5 border rounded transition-colors ${
                active
                  ? "border-[#E8E4DE] text-[#E8E4DE]"
                  : "border-[#3A3830] text-[#7A7468] hover:border-[#E8E4DE] hover:text-[#E8E4DE]"
              }`}
            >
              {s}
            </Link>
          );
        })}
      </div>

      <div className="flex flex-col gap-4">
        {orders.length === 0 && (
          <p className="text-[#7A7468] text-sm">No orders found.</p>
        )}
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-[#1E1C18] border border-[#3A3830] rounded p-5"
          >
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <p className="text-xs text-[#7A7468] mb-1">{order.id}</p>
                <p className="text-sm">{order.user.name ?? order.user.email}</p>
                <p className="text-xs text-[#7A7468]">{order.user.email}</p>
                <p className="text-xs text-[#7A7468] mt-1">
                  {new Date(order.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div className="text-right">
                <p className="font-serif text-xl">
                  ${(order.total / 100).toLocaleString()}
                </p>
                <span
                  className={`text-xs px-2 py-0.5 rounded border mt-1 inline-block ${
                    order.status === "PAID"
                      ? "border-emerald-700 text-emerald-400"
                      : order.status === "SHIPPED"
                        ? "border-sky-700 text-sky-400"
                        : order.status === "DELIVERED"
                          ? "border-violet-700 text-violet-400"
                          : order.status === "CANCELLED"
                            ? "border-red-800 text-red-500"
                            : "border-[#3A3830] text-[#7A7468]"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>

            {/* Items */}
            <ul className="mt-3 flex flex-col gap-0.5">
              {order.orderItems.map((item) => (
                <li key={item.id} className="text-xs text-[#7A7468]">
                  {item.product.name} — {item.variant} / {item.size} ×{" "}
                  {item.quantity}
                </li>
              ))}
            </ul>

            {/* Mark Shipped action — only visible for PAID orders */}
            {order.status === "PAID" && (
              <form action={markShipped} className="mt-4">
                <input type="hidden" name="orderId" value={order.id} />
                <button
                  type="submit"
                  className="text-xs border border-[#E8E4DE] text-[#E8E4DE] px-4 py-1.5 hover:bg-[#E8E4DE] hover:text-[#111010] transition-colors rounded"
                >
                  Mark as Shipped
                </button>
              </form>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
