// components/admin/PromoteUserButton.tsx
"use client";

import { useTransition } from "react";

type Props = {
  userId: string;
  currentRole: string;
  isSelf: boolean;
  action: (userId: string) => Promise<void>;
};

export default function PromoteUserButton({
  userId,
  currentRole,
  isSelf,
  action,
}: Props) {
  const [isPending, startTransition] = useTransition();

  if (currentRole === "ADMIN" || isSelf) return null;

  return (
    <button
      onClick={() => startTransition(() => action(userId))}
      disabled={isPending}
      className="text-xs tracking-widest uppercase px-4 py-2 border border-[#3A3830] text-[#7A7468] hover:border-[#3D9E8C] hover:text-[#3D9E8C] transition-colors disabled:opacity-40"
    >
      {isPending ? "Updating…" : "Make Admin"}
    </button>
  );
}
