// app/shop/[slug]/page.tsx

import { auth } from "@/auth";
import ProductPanel from "@/components/shop/ProductPanel";
import { db } from "@/lib/db";
import { formatProduct, type DbProduct } from "@/lib/products";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{
  category?: string;
  q?: string;
  variant?: string;
}>;

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const products: { slug: string }[] = await db.product.findMany({
    select: { slug: true },
  });
  type StaticProduct = (typeof products)[number];
  return products.map((p: StaticProduct) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await db.product.findUnique({ where: { slug } });
  if (!product) return { title: "Not Found — MERQ" };
  return {
    title: `${product.name} — MERQ`,
    description: `${product.name}. $${(product.price / 100).toLocaleString()}.`,
  };
}

export default async function ProductPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { slug } = await params;
  const { variant } = await searchParams;
  const session = await auth();

  const raw = await db.product.findUnique({ where: { slug } });
  if (!raw) notFound();

  const product: DbProduct = formatProduct(raw);

  const initialVariant = variant && product.variants.includes(variant)
    ? variant
    : product.variants[0];

  const isWishlisted = session?.user?.id
    ? !!(await db.wishlist.findFirst({
        where: { userId: session.user.id, productId: product.id },
      }))
    : false;

  return (
    <main className="min-h-screen bg-[#111010] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="py-6 flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-[#7A7468]">
          <Link href="/shop" className="hover:text-[#E8E4DE] transition-colors">
            Shop
          </Link>
          <span>/</span>
          <a
            href={`/shop?category=${product.category}`}
            className="hover:text-[#E8E4DE] transition-colors capitalize"
          >
            {product.category}
          </a>
          <span>/</span>
          <span className="text-[#3A3830]">{product.name}</span>
        </nav>

        <div className="pb-24">
          <ProductPanel
            product={product}
            initialVariant={initialVariant}
            isWishlisted={isWishlisted}
          />
        </div>
      </div>
    </main>
  );
}
