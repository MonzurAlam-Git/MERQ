// app/account/orders/page.tsx

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { formatPrice } from "@/lib/formatPrice";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Orders — MERQ",
};

type OrderStatus = "PENDING" | "PAID" | "SHIPPED" | "DELIVERED" | "CANCELLED";

const STATUS_LABEL: Record<OrderStatus, string> = {
  PENDING: "Pending",
  PAID: "Confirmed",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

const STATUS_COLOR: Record<OrderStatus, string> = {
  PENDING: "text-[#7A7468]",
  PAID: "text-[#3D9E8C]",
  SHIPPED: "text-[#3D9E8C]",
  DELIVERED: "text-[#E8E4DE]",
  CANCELLED: "text-[#7A7468]",
};

type OrderWithItems = Prisma.OrderGetPayload<{
  include: {
    items: {
      include: { product: true };
    };
  };
}>;

export default async function OrdersPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const orders = await db.order.findMany({
    where: { userId: session.user.id },
    include: {
      items: {
        include: { product: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-10 pb-6 border-b border-[#3A3830]">
        <p className="text-[#7A7468] text-[11px] tracking-[0.3em] uppercase mb-2">
          Your
        </p>
        <h1 className="font-serif text-[#E8E4DE] text-5xl">Orders</h1>
      </div>

      {orders.length === 0 ? (
        <div className="flex flex-col gap-6 py-20">
          <p className="font-serif text-[#E8E4DE] text-2xl">Nothing yet.</p>
          <Link
            href="/shop"
            className="self-start text-[11px] tracking-[0.3em] uppercase text-[#111010] bg-[#E8E4DE] px-8 py-3 hover:bg-white transition-colors"
          >
            Browse the collection
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order: OrderWithItems) => (
            <details
              key={order.id}
              className="group border border-[#1E1C18] bg-[#111010] open:border-[#3A3830]"
            >
              {/* Summary row */}
              <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none">
                <div className="flex items-center gap-8">
                  <span className="font-serif text-[#E8E4DE] text-lg">
                    {formatPrice(order.total)}
                  </span>
                  <span
                    className={`text-[10px] tracking-[0.25em] uppercase ${STATUS_COLOR[order.status as OrderStatus]}`}
                  >
                    {STATUS_LABEL[order.status as OrderStatus]}
                  </span>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-[#7A7468] text-[11px] tracking-[0.15em]">
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  {/* Chevron */}
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    className="text-[#3A3830] transition-transform duration-200 group-open:rotate-180"
                  >
                    <path
                      d="M2 4L6 8L10 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </summary>

              {/* Expanded items */}
              <div className="border-t border-[#1E1C18] divide-y divide-[#1E1C18]">
                {order.items.map((item: OrderWithItems["items"][number]) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between px-6 py-4"
                  >
                    <div className="flex items-center gap-4">
                      <Link
                        href={`/shop/${item.product.slug}`}
                        className="font-serif text-[#E8E4DE] hover:text-white transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      <span className="text-[#7A7468] text-[11px] tracking-[0.15em] uppercase">
                        {item.variant} · {item.size}
                      </span>
                    </div>
                    <div className="flex items-center gap-6 shrink-0">
                      <span className="text-[#7A7468] text-[11px]">
                        ×{item.quantity}
                      </span>
                      <span className="text-[#E8E4DE] text-sm">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </details>
          ))}
        </div>
      )}
    </div>
  );
}
