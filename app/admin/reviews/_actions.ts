// app/admin/reviews/_actions.ts
"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function replyToReview(formData: FormData) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") throw new Error("Forbidden");

  const reviewId = formData.get("reviewId") as string;
  const reply = formData.get("reply") as string;

  await db.review.update({
    where: { id: reviewId },
    data: { adminReply: reply, adminReplyAt: new Date() },
  });

  revalidatePath("/admin/reviews");
}

export async function toggleHidden(formData: FormData) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") throw new Error("Forbidden");

  const reviewId = formData.get("reviewId") as string;
  const hidden = formData.get("hidden") === "true";

  await db.review.update({
    where: { id: reviewId },
    data: { hidden: !hidden },
  });

  revalidatePath("/admin/reviews");
}
