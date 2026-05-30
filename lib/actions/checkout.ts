// lib/actions/checkout.ts
"use server";

import { auth } from "@/auth";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";

export async function createCheckoutSession(
  items: {
    name: string;
    price: number;
    quantity: number;
    image: string;
    variant: string;
    size: string;
    productId: number;
    slug: string;
  }[],
) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const checkoutSession = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    customer_email: session.user.email ?? undefined,
    line_items: items.map((item) => ({
      quantity: item.quantity,
      price_data: {
        currency: "usd",
        unit_amount: item.price,
        product_data: {
          name: `${item.name} — ${item.variant} / ${item.size}`,
          images: [item.image],
        },
      },
    })),
    metadata: {
      userId: session.user.id,
      items: JSON.stringify(
        items.map((i) => ({
          productId: i.productId,
          variant: i.variant,
          size: i.size,
          quantity: i.quantity,
          price: i.price,
          slug: i.slug,
        })),
      ),
    },
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/shop`,
  });

  if (!checkoutSession.url)
    throw new Error("Failed to create checkout session");

  redirect(checkoutSession.url);
}
