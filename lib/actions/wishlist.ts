"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
export async function toggleWishlist(productId: number, productSlug: string) {
  const session = await auth();

  // Not logged in → send to login page
  if (!session?.user?.id) redirect("/login");

  const userId = session.user.id;

  const existing = await db.wishlist.findFirst({
    where: { userId, productId },
  });

  if (existing) {
    await db.wishlist.delete({
      where: { id: existing.id },
    });
  } else {
    await db.wishlist.create({
      data: { userId, productId },
    });
  }

  // Revalidate the product page so wishlist state is fresh on next load
  revalidatePath(`/shop/${productSlug}`);
  revalidatePath("/wishlist");
}
