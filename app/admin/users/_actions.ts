// app/admin/users/_actions.ts
"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function promoteToAdmin(formData: FormData) {
  const userId = formData.get("userId") as string;
  if (!userId) return;

  await prisma.user.update({
    where: { id: userId },
    data: { role: "ADMIN" },
  });

  revalidatePath("/admin/users");
}

export async function demoteToCustomer(formData: FormData) {
  const userId = formData.get("userId") as string;
  if (!userId) return;

  await prisma.user.update({
    where: { id: userId },
    data: { role: "CUSTOMER" },
  });

  revalidatePath("/admin/users");
}
