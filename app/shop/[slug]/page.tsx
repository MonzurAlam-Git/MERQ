import ProductGallery from "@/components/shop/ProductGallery";
import ProductPanel from "@/components/shop/ProductPanel";
import { PRODUCTS } from "@/lib/products";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) return { title: "Not Found — MERQ" };
  return {
    title: `${product.name} — MERQ`,
    description: `${product.name}. $${product.price.toLocaleString()}.`,
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) notFound();

  const images = Array.from(
    { length: 4 },
    (_, i) => `https://picsum.photos/seed/${product.id}-${i}/800/1050`,
  );

  return (
    <main className="min-h-screen bg-onyx pt-20">
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

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 pb-24">
          <ProductGallery images={images} productName={product.name} />
          <ProductPanel product={product} />
        </div>
      </div>
    </main>
  );
}
