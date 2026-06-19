// lib/actions/stripe.ts
"use server";

import { auth } from "@/auth";
import type { CartItem } from "@/lib/store/cartStore";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";

export async function createStripeSession(items: CartItem[]) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "You must be signed in to checkout." };
  }

  const headersList = await headers();
  const origin =
    headersList.get("origin") ??
    (headersList.get("x-forwarded-proto") === "https" &&
    headersList.get("x-forwarded-host")
      ? `https://${headersList.get("x-forwarded-host")}`
      : undefined) ??
    process.env.NEXTAUTH_URL ??
    "http://localhost:3000";

  try {
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
      success_url: `${origin}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout`,
    });

    if (!checkoutSession.url) {
      return { error: "Stripe did not return a checkout URL." };
    }

    return { url: checkoutSession.url };
  } catch (err) {
    console.error("Stripe session creation failed:", err);
    return { error: "Payment could not be initiated. Try again." };
  }
}
