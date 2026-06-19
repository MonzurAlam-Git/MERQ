// lib/actions/cod.ts
"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import type { CartItem } from "@/lib/store/cartStore";

export async function placeCodOrder(items: CartItem[]) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "You must be signed in to place an order." };
  }

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const order = await db.order.create({
    data: {
      userId: session.user.id,
      total,
      status: "PROCESSING",
      paymentMethod: "COD",
      items: {
        create: items.map((item) => ({
          productId: item.productId,
          variant: item.variant,
          size: item.size,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },
  });

  return { orderId: order.id };
}
