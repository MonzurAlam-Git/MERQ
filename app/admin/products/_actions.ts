// app/admin/products/_actions.ts
"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateProduct(formData: FormData) {
  const id = Number(formData.get("id"));
  const name = formData.get("name") as string;
  const price = Number(formData.get("price")); // dollars — convert to cents below
  const badge = formData.get("badge") as string;

  if (!id || !name || isNaN(price)) return;

  await prisma.product.update({
    where: { id },
    data: {
      name,
      price: Math.round(price * 100), // dollars → cents
      badge: badge === "" ? null : badge,
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/products"); // bust the public catalog cache too
}
