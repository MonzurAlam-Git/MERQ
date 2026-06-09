// app/api/webhooks/stripe/route.ts

import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { sendTelegramNotification } from "@/lib/telegram";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  let event: ReturnType<typeof stripe.webhooks.constructEvent>;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const userId = session.metadata?.userId;
    const items = JSON.parse(session.metadata?.items ?? "[]");

    if (!userId || !items.length) {
      return NextResponse.json({ error: "Missing metadata" }, { status: 400 });
    }

    // Create order in DB
    await db.order.create({
      data: {
        userId,
        total: session.amount_total ?? 0,
        status: "PAID",
        orderItems: {
          create: items.map(
            (item: {
              productId: number;
              variant: string;
              size: string;
              quantity: number;
              price: number;
            }) => ({
              productId: item.productId,
              variant: item.variant,
              size: item.size,
              quantity: item.quantity,
              price: item.price,
            }),
          ),
        },
      },
    });

    // Telegram notification
    try {
      const itemSummaryPromises = items.map(
        async (item: {
          quantity: number;
          variant: string;
          size: string;
          productId: number;
        }) => {
          const product = await db.product.findUnique({
            where: { id: item.productId },
            select: { name: true },
          });

          const productName = product?.name || "Unknown Product";
          return `• ${item.quantity}x <b>${productName}</b> (ProductId : ${item.productId}) — ${item.variant} / ${item.size}`;
        },
      );

      const itemSummary = (await Promise.all(itemSummaryPromises)).join("\n");

      await sendTelegramNotification(
        `🛍️ <b>New Order — MERQ</b>\n\n` +
          `<b>Customer:</b> ${session.customer_email}\n` +
          `<b>Total:</b> $${((session.amount_total ?? 0) / 100).toLocaleString()}\n\n` +
          `<b>Items:</b>\n${itemSummary}`,
      );
    } catch (error) {
      console.error("Error sending Telegram notification:", error);
      // Don't fail the webhook if Telegram fails
    }
  }

  return NextResponse.json({ received: true });
}
