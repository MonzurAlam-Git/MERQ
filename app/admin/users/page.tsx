// app/admin/users/page.tsx
import { auth } from "@/auth";
import PromoteUserButton from "@/components/admin/PromoteUserButton";
import { promoteUser } from "@/lib/actions/admin";
import { db } from "@/lib/db";
import type { Prisma } from "@prisma/client";

type UserRow = Prisma.UserGetPayload<{
  select: {
    id: true;
    email: true;
    name: true;
    role: true;
    createdAt: true;
  };
}>;

export default async function AdminUsersPage() {
  const session = await auth();
  const users = await db.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
    },
  });

  return (
    <div>
      <h1 className="font-serif text-3xl text-[#E8E4DE] mb-10">Users</h1>

      <div className="border border-[#3A3830]">
        <div className="grid grid-cols-[2fr_2fr_1fr_1fr_auto] text-xs tracking-widest uppercase text-[#7A7468] px-6 py-3 border-b border-[#3A3830]">
          <span>Name</span>
          <span>Email</span>
          <span>Role</span>
          <span>Joined</span>
          <span></span>
        </div>

        {users.map((user: UserRow) => (
          <div
            key={user.id}
            className="grid grid-cols-[2fr_2fr_1fr_1fr_auto] items-center px-6 py-4 border-b border-[#3A3830] last:border-0"
          >
            <span className="text-[#E8E4DE] text-sm">{user.name ?? "—"}</span>
            <span className="text-[#7A7468] text-sm">{user.email}</span>
            <span
              className={`text-xs tracking-widest uppercase ${
                user.role === "ADMIN" ? "text-[#3D9E8C]" : "text-[#7A7468]"
              }`}
            >
              {user.role}
            </span>
            <span className="text-[#7A7468] text-xs">
              {new Date(user.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
            <PromoteUserButton
              userId={user.id}
              currentRole={user.role}
              isSelf={user.email === session?.user?.email}
              action={promoteUser}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
