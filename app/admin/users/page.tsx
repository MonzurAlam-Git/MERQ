// app/admin/users/page.tsx
import { prisma } from "@/lib/prisma";
import { demoteToCustomer, promoteToAdmin } from "./_actions";

export const metadata = { title: "Users — Admin — MERQ" };

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { orders: true } } },
  });

  return (
    <div>
      <h1 className="font-serif text-3xl mb-8">Users</h1>
      <div className="flex flex-col gap-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-[#1E1C18] border border-[#3A3830] rounded p-5 flex items-center justify-between gap-4 flex-wrap"
          >
            <div>
              <p className="text-sm">{user.name ?? "—"}</p>
              <p className="text-xs text-[#7A7468]">{user.email}</p>
              <p className="text-xs text-[#7A7468] mt-0.5">
                {user._count.orders} order{user._count.orders !== 1 ? "s" : ""}{" "}
                · Joined{" "}
                {new Date(user.createdAt).toLocaleDateString("en-GB", {
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`text-xs px-2 py-0.5 rounded border ${
                  user.role === "ADMIN"
                    ? "border-[#D4A853] text-[#D4A853]"
                    : "border-[#3A3830] text-[#7A7468]"
                }`}
              >
                {user.role}
              </span>

              {user.role === "CUSTOMER" ? (
                <form action={promoteToAdmin}>
                  <input type="hidden" name="userId" value={user.id} />
                  <button
                    type="submit"
                    className="text-xs border border-[#3A3830] text-[#7A7468] px-3 py-1.5 hover:border-[#E8E4DE] hover:text-[#E8E4DE] transition-colors rounded"
                  >
                    Promote
                  </button>
                </form>
              ) : (
                <form action={demoteToCustomer}>
                  <input type="hidden" name="userId" value={user.id} />
                  <button
                    type="submit"
                    className="text-xs border border-red-800 text-red-500 px-3 py-1.5 hover:bg-red-900/20 transition-colors rounded"
                  >
                    Demote
                  </button>
                </form>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
