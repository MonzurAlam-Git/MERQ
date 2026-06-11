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
    console.error("Stripe webhook signature verification failed");
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const userId = session.metadata?.userId;
    const items = JSON.parse(session.metadata?.items ?? "[]");

    if (!userId || !items.length) {
      console.error(
        "Stripe webhook: Missing metadata - userId:",
        userId,
        "items length:",
        items.length,
      );
      return NextResponse.json({ error: "Missing metadata" }, { status: 400 });
    }

    // Create order in DB
    try {
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
      console.log("Order created successfully - userId:", userId);
    } catch (error) {
      console.error("Failed to create order in database:", error);
      return NextResponse.json(
        { error: "Failed to create order" },
        { status: 500 },
      );
    }

    // Telegram notification
    try {
      console.log(
        "📨 Starting Telegram notification process for order:",
        userId,
      );

      // Batch fetch all products at once instead of individual queries
      const productIds = items.map(
        (item: { productId: number }) => item.productId,
      );
      console.log("📦 Fetching products:", productIds);

      const products = await db.product.findMany({
        where: { id: { in: productIds } },
        select: { id: true, name: true },
      });

      console.log("✓ Found", products.length, "products");

      const productMap = new Map(products.map((p) => [p.id, p.name]));

      const itemSummary = items
        .map(
          (item: {
            quantity: number;
            variant: string;
            size: string;
            productId: number;
          }) => {
            const productName =
              productMap.get(item.productId) || "Unknown Product";
            return `• ${item.quantity}x <b>${productName}</b> (ProductId : ${item.productId}) — ${item.variant} / ${item.size}`;
          },
        )
        .join("\n");

      const notificationMessage =
        `🛍️ <b>New Order — MERQ</b>\n\n` +
        `<b>Customer:</b> ${session.customer_email}\n` +
        `<b>Total:</b> $${((session.amount_total ?? 0) / 100).toLocaleString()}\n\n` +
        `<b>Items:</b>\n${itemSummary}`;

      console.log("📤 Sending Telegram notification...");
      await sendTelegramNotification(notificationMessage);
      console.log("✅ Telegram notification process completed");
    } catch (error) {
      console.error("❌ Error in Telegram notification:", error);
      // Don't fail the webhook if Telegram fails
    }
  }

  return NextResponse.json({ received: true });
}
