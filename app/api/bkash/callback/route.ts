// app/api/bkash/callback/route.ts

import { auth } from "@/auth";
import { getBkashToken } from "@/lib/bkash";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const paymentID = searchParams.get("paymentID");
  const status = searchParams.get("status");

  const appUrl = process.env.NEXT_PUBLIC_APP_URL!;

  if (status !== "success" || !paymentID) {
    return NextResponse.redirect(`${appUrl}/checkout?bkash=failed`);
  }

  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.redirect(`${appUrl}/login`);
    }

    const id_token = await getBkashToken();

    // 1. Execute payment with bKash
    const res = await fetch(process.env.BKASH_EXECUTE_PAYMENT_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: id_token,
        "x-app-key": process.env.BKASH_API_KEY!,
      },
      body: JSON.stringify({ paymentID }),
    });

    const data = await res.json();

    if (data.transactionStatus !== "Completed") {
      return NextResponse.redirect(`${appUrl}/checkout?bkash=failed`);
    }

    // 2. Find the pending order by merchantInvoiceNumber (= orderId)
    const order = await db.order.findFirst({
      where: {
        id: data.merchantInvoiceNumber,
        userId: session.user.id,
        status: "PENDING",
      },
    });

    if (!order) {
      return NextResponse.redirect(`${appUrl}/checkout?bkash=error`);
    }

    // 3. Mark order as confirmed
    await db.order.update({
      where: { id: order.id },
      data: {
        status: "PROCESSING",
        paymentId: data.trxID,
      },
    });

    return NextResponse.redirect(`${appUrl}/order-confirmation/${order.id}`);
  } catch (err) {
    console.error("bKash callback error:", err);
    return NextResponse.redirect(`${appUrl}/checkout?bkash=error`);
  }
}
