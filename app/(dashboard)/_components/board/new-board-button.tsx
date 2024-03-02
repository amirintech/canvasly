"use client";

import { Plus } from "lucide-react";

import useDialog from "@/hooks/use-dialog";

interface Props {
  orgId: string;
}

export default function NewBoardButton({ orgId }: Props) {
  const { onOpen } = useDialog();

  return (
    <button
      onClick={() => onOpen("createBoard", orgId)}
      className="aspect-square sm:w-full gap-1 sm:h-full flex flex-col transition hover:bg-indigo-700 items-center justify-center bg-indigo-600 rounded-md text-white disabled:cursor-not-allowed disabled:bg-indigo-600 disabled:opacity-70"
    >
      <Plus size={42} />
      <span className="text-sm">Create Board</span>
    </button>
  );
}
