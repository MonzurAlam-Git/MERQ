// app/order-confirmation/page.tsx

import { stripe } from "@/lib/stripe";
import Link from "next/link";

type SearchParams = Promise<{ session_id?: string }>;

export default async function OrderConfirmationPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { session_id } = await searchParams;

  if (!session_id) {
    return (
      <main className="min-h-screen bg-[#111010] flex items-center justify-center">
        <p className="text-[#7A7468] text-[11px] tracking-[0.2em] uppercase">
          No order found.
        </p>
      </main>
    );
  }

  const session = await stripe.checkout.sessions.retrieve(session_id);
  const total = ((session.amount_total ?? 0) / 100).toLocaleString();

  return (
    <main className="min-h-screen bg-[#111010] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div>
          <p className="text-[#D4A853] text-[10px] tracking-[0.4em] uppercase mb-4">
            Order confirmed
          </p>
          <h1 className="font-serif text-[#E8E4DE] text-5xl mb-4">
            Thank you.
          </h1>
          <p className="text-[#7A7468] text-sm">
            Your order has been received. A confirmation will be sent to{" "}
            <span className="text-[#E8E4DE]">{session.customer_email}</span>.
          </p>
        </div>

        <div className="border-t border-b border-[#1E1C18] py-6">
          <div className="flex items-center justify-between">
            <span className="text-[11px] tracking-[0.2em] uppercase text-[#7A7468]">
              Total paid
            </span>
            <span className="font-serif text-[#E8E4DE] text-2xl">${total}</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href="/orders"
            className="w-full bg-[#E8E4DE] text-[#111010] py-3 text-[11px] tracking-[0.3em] uppercase hover:bg-white transition-colors text-center"
          >
            View order history
          </Link>
          <Link
            href="/shop"
            className="text-[11px] tracking-[0.2em] uppercase text-[#7A7468] hover:text-[#E8E4DE] transition-colors"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </main>
  );
}
