// app/api/bkash/create-payment/route.ts

import { auth } from "@/auth";
import { getBkashToken } from "@/lib/bkash";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

type CartItem = {
  productId: number;
  variant: string;
  size: string;
  quantity: number;
  price: number; // in cents
};

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { amount, items }: { amount: number; items: CartItem[] } =
    await req.json();

  try {
    // 1. Save cart as PENDING order in DB first
    const order = await db.order.create({
      data: {
        userId: session.user.id,
        total: amount / 100, // amount arrives in cents, store as dollars
        status: "PENDING",
        paymentMethod: "BKASH",
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            variant: item.variant,
            size: item.size,
            quantity: item.quantity,
            price: item.price, // already in cents
          })),
        },
      },
    });

    // 2. Create bKash payment using orderId as invoice number
    const id_token = await getBkashToken();

    const res = await fetch(process.env.BKASH_CREATE_PAYMENT_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: id_token,
        "x-app-key": process.env.BKASH_API_KEY!,
      },
      body: JSON.stringify({
        mode: "0011",
        payerReference: session.user.id,
        callbackURL: `${process.env.NEXT_PUBLIC_APP_URL}/api/bkash/callback`,
        amount: (amount / 100).toFixed(2), // bKash expects dollars as string e.g. "980.00"
        currency: "BDT",
        intent: "sale",
        merchantInvoiceNumber: order.id, // ← orderId travels with the payment
      }),
    });

    const data = await res.json();
    console.log("bKash create response:", data);

    if (!data.bkashURL) {
      // bKash failed — delete the pending order
      await db.order.delete({ where: { id: order.id } });
      return NextResponse.json(
        { error: "bKash create failed", detail: data },
        { status: 400 },
      );
    }

    return NextResponse.json({ bkashURL: data.bkashURL });
  } catch (err) {
    console.error("bKash create-payment error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
