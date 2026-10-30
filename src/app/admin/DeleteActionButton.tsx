"use client";

import React, { useTransition } from "react";
import { Trash2 } from "lucide-react";

interface DeleteActionButtonProps {
  action: (id: any) => Promise<void>;
  id: any;
  confirmMessage?: string;
  iconClassName?: string;
  className?: string;
  title?: string;
}

export default function DeleteActionButton({
  action,
  id,
  confirmMessage = "Are you sure you want to delete this item permanently?",
  iconClassName = "w-4 h-4",
  className = "p-1.5 text-slate-500 hover:text-red-400 transition-colors disabled:opacity-40 cursor-pointer",
  title = "Delete",
}: DeleteActionButtonProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      title={isPending ? "Deleting..." : title}
      className={className}
      onClick={() => {
        if (typeof window !== "undefined" && window.confirm(confirmMessage)) {
          startTransition(async () => {
            try {
              await action(id);
            } catch (err) {
              console.error("Delete action failed:", err);
              alert("Failed to delete item. Please check server logs.");
            }
          });
        }
      }}
    >
      <Trash2 className={`${iconClassName} ${isPending ? "animate-spin text-red-400" : ""}`} />
    </button>
  );
}
