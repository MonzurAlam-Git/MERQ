// app/order-confirmation/[orderId]/page.tsx

import { auth } from "@/auth";
import { db } from "@/lib/db";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import ClearCart from "./ClearCart";

type Props = {
  params: Promise<{ orderId: string }>;
};

export default async function OrderConfirmationPage({ params }: Props) {
  const { orderId } = await params;
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const order = await db.order.findFirst({
    where: {
      id: orderId,
      userId: session.user.id,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order) notFound();

  return (
    <main className="min-h-screen bg-[#111010] text-[#E8E4DE] flex flex-col items-center justify-center px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
      <div className="w-full max-w-md sm:max-w-xl lg:max-w-2xl space-y-8 sm:space-y-10">
        {/* Status */}
        <div className="text-center space-y-2 sm:space-y-3">
          <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#3D9E8C]">
            Order Confirmed
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl">
            Thank you.
          </h1>
          <p className="text-[#7A7468] text-xs sm:text-sm tracking-wide">
            Order{" "}
            <span className="text-[#E8E4DE]">
              #{order.id.slice(-8).toUpperCase()}
            </span>
          </p>
        </div>

        <div className="w-full h-px bg-[#1E1C18]" />

        {/* Items */}
        <div className="space-y-4 sm:space-y-5">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-start gap-4"
            >
              <div className="min-w-0 flex-1">
                <p className="font-serif text-sm sm:text-base text-[#E8E4DE] truncate">
                  {item.product.name}
                </p>
                <p className="text-[#7A7468] text-[10px] sm:text-xs tracking-widest uppercase mt-1">
                  {item.variant} · {item.size} · Qty {item.quantity}
                </p>
              </div>
              <p className="text-[#E8E4DE] text-sm sm:text-base tabular-nums whitespace-nowrap">
                ${((item.price * item.quantity) / 100).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <div className="w-full h-px bg-[#1E1C18]" />

        {/* Total */}
        <div className="flex justify-between items-center">
          <span className="text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#7A7468]">
            Total Paid
          </span>
          <span className="font-serif text-xl sm:text-2xl lg:text-3xl">
            ${(order.total / 100).toFixed(2)}
          </span>
        </div>

        {/* Payment method */}
        <div className="flex justify-between items-center">
          <span className="text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#7A7468]">
            Payment
          </span>
          <span className="text-sm sm:text-base text-[#E8E4DE]">
            {order.paymentMethod ?? "—"}
          </span>
        </div>

        <div className="w-full h-px bg-[#1E1C18]" />

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/account/orders"
            className="w-full text-center py-3.5 sm:py-4 bg-[#E8E4DE] text-onyx text-[11px] tracking-[0.3em] uppercase hover:bg-white transition-colors"
          >
            View Orders
          </Link>
          <Link
            href="/shop"
            className="w-full text-center py-3.5 sm:py-4 border border-[#3A3830] text-[#7A7468] text-[11px] tracking-[0.3em] uppercase hover:text-[#E8E4DE] hover:border-[#7A7468] transition-colors"
          >
            Continue Shopping
          </Link>
        </div>

        <ClearCart />
      </div>
    </main>
  );
}
