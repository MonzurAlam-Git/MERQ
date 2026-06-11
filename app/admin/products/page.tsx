// app/admin/products/page.tsx

import EditProductForm from "@/components/admin/EditProductForm";
import { db } from "@/lib/db";

export default async function AdminProductsPage() {
  const products = await db.product.findMany({
    orderBy: { category: "asc" },
  });

  return (
    <div>
      <h1 className="font-serif text-3xl text-[#E8E4DE] mb-10">Products</h1>

      <div className="border border-[#3A3830]">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] text-xs tracking-widest uppercase text-[#7A7468] px-6 py-3 border-b border-[#3A3830]">
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span>Badge</span>
          <span></span>
        </div>

        {products.map((product) => (
          <EditProductForm key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
