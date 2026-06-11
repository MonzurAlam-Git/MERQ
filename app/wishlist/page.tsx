// app/wishlist/page.tsx

import { auth } from "@/auth";
import ProductCard from "@/components/shop/ProductCard";
import { db } from "@/lib/db";
import { formatProduct, type DbProduct } from "@/lib/products";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function WishlistPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const entries = await db.wishlist.findMany({
    where: { userId: session.user.id },
    include: { product: true },
    orderBy: { createdAt: "desc" },
  });

  type WishlistEntry = (typeof entries)[number];

  const products: DbProduct[] = entries.map((e: WishlistEntry) =>
    formatProduct(e.product),
  );

  return (
    <main className="min-h-screen bg-onyx pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 pb-6 border-b border-[#3A3830]">
          <p className="text-[#7A7468] text-[11px] tracking-[0.3em] uppercase mb-2">
            Your
          </p>
          <h1 className="font-serif text-[#E8E4DE] text-5xl md:text-6xl">
            Wishlist
          </h1>
        </div>

        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-6">
            <p className="font-serif text-[#E8E4DE] text-2xl">Nothing saved.</p>
            <Link
              href="/shop"
              className="text-[11px] tracking-[0.3em] uppercase text-onyx bg-[#E8E4DE] px-8 py-3 hover:bg-white transition-colors"
            >
              Browse the collection
            </Link>
          </div>
        ) : (
          <>
            <p className="text-[#7A7468] text-[11px] tracking-[0.25em] uppercase mb-10">
              {products.length} {products.length === 1 ? "piece" : "pieces"}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12">
              {products.map((product: DbProduct, index: number) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  priority={index < 4}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
