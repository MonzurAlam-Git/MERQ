// lib/actions/reviews.ts
"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function submitReview(
  productId: number,
  slug: string,
  rating: number,
  comment: string,
) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  if (rating < 1 || rating > 5) throw new Error("Invalid rating");

  await db.review.upsert({
    where: { userId_productId: { userId: session.user.id, productId } },
    update: { rating, comment },
    create: { userId: session.user.id, productId, rating, comment },
  });

  revalidatePath(`/shop/${slug}`);
}
