// components/admin/MarkShippedButton.tsx
"use client";

import { useTransition } from "react";

type Props = {
  orderId: string;
  currentStatus: string;
  action: (orderId: string) => Promise<void>;
};

export default function MarkShippedButton({
  orderId,
  currentStatus,
  action,
}: Props) {
  const [isPending, startTransition] = useTransition();

  if (currentStatus !== "PENDING" && currentStatus !== "PROCESSING") {
    return null;
  }

  return (
    <button
      onClick={() => startTransition(() => action(orderId))}
      disabled={isPending}
      className="text-xs tracking-widest uppercase px-4 py-2 border border-[#3A3830] text-[#7A7468] hover:border-[#3D9E8C] hover:text-[#3D9E8C] transition-colors disabled:opacity-40"
    >
      {isPending ? "Updating…" : "Mark Shipped"}
    </button>
  );
}
