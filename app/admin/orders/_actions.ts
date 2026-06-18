// app/admin/orders/_actions.ts
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function markShipped(formData: FormData) {
  const orderId = formData.get("orderId") as string;
  if (!orderId) return;

  await prisma.order.update({
    where: { id: orderId },
    data: { status: "SHIPPED" },
  });

  revalidatePath("/admin/orders");
}
