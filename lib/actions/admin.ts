// lib/actions/admin.ts
"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function markOrderShipped(orderId: string) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") throw new Error("Unauthorized");

  await db.order.update({
    where: { id: orderId },
    data: { status: "SHIPPED" },
  });

  revalidatePath("/admin/orders");
}

export async function updateProduct({
  id,
  name,
  price,
  badge,
}: {
  id: string;
  name: string;
  price: number;
  badge: string | null;
}) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") throw new Error("Unauthorized");

  await db.product.update({
    where: { id },
    data: { name, price, badge },
  });

  revalidatePath("/admin/products");
}

export async function promoteUser(userId: string) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") throw new Error("Unauthorized");

  await db.user.update({
    where: { id: userId },
    data: { role: "ADMIN" },
  });

  revalidatePath("/admin/users");
}
