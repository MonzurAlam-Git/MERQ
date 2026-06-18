// app/admin/products/page.tsx
import { prisma } from "@/lib/prisma";
import { updateProduct } from "./_actions";

export const metadata = { title: "Products — Admin — MERQ" };

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { id: "asc" },
  });

  return (
    <div>
      <h1 className="font-serif text-3xl mb-8">Products</h1>
      <div className="flex flex-col gap-3">
        {products.map((product) => (
          <form
            key={product.id}
            action={updateProduct}
            className="bg-[#1E1C18] border border-[#3A3830] rounded p-5 flex flex-wrap gap-4 items-end"
          >
            <input type="hidden" name="id" value={product.id} />

            <div className="flex-1 min-w-[200px]">
              <label className="text-xs text-[#7A7468] block mb-1">Name</label>
              <input
                name="name"
                defaultValue={product.name}
                className="w-full bg-[#111010] border border-[#3A3830] rounded px-3 py-2 text-sm text-[#E8E4DE] focus:outline-none focus:border-[#7A7468]"
              />
            </div>

            <div className="w-28">
              <label className="text-xs text-[#7A7468] block mb-1">
                Price (USD)
              </label>
              <input
                name="price"
                type="number"
                step="0.01"
                defaultValue={(product.price / 100).toFixed(2)}
                className="w-full bg-[#111010] border border-[#3A3830] rounded px-3 py-2 text-sm text-[#E8E4DE] focus:outline-none focus:border-[#7A7468]"
              />
            </div>

            <div className="w-36">
              <label className="text-xs text-[#7A7468] block mb-1">Badge</label>
              <select
                name="badge"
                defaultValue={product.badge ?? ""}
                className="w-full bg-[#111010] border border-[#3A3830] rounded px-3 py-2 text-sm text-[#E8E4DE] focus:outline-none focus:border-[#7A7468]"
              >
                <option value="">None</option>
                <option value="new">new</option>
                <option value="bestseller">bestseller</option>
              </select>
            </div>

            <button
              type="submit"
              className="text-xs border border-[#E8E4DE] text-[#E8E4DE] px-4 py-2 hover:bg-[#E8E4DE] hover:text-[#111010] transition-colors rounded"
            >
              Save
            </button>
          </form>
        ))}
      </div>
    </div>
  );
}
