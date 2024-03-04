"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import useRenameDialog from "@/hooks/use-rename-dialog";
import Tooltip from "@/components/shared/tooltip";
import { Menu } from "lucide-react";
import Actions from "@/components/shared/actions";

interface Props {
  boardId: string;
}

export default function Info({ boardId }: Props) {
  const board = useQuery(api.board.getBoard, { id: boardId as Id<"boards"> });
  const renameDialog = useRenameDialog();
  const router = useRouter();

  return (
    <div className="absolute top-2 p-1 flex items-center justify-center gap-x-2 left-2 rounded-md bg-white shadow-md">
      <Tooltip label="Return to Dashboard" side="bottom" sideOffset={8}>
        <Button
          aria-label="Return to Dashboard"
          variant="ghost"
          className="p-2"
        >
          <Link href="/" className="relative w-9 h-9">
            <Image fill alt="" src="/icons/logo.svg" />
          </Link>
        </Button>
      </Tooltip>

      <div className="bg-neutral-300 h-8 w-[1px] rounded-full" />

      <Tooltip label="Rename Board" side="bottom" sideOffset={8}>
        <Button
          onClick={() => renameDialog.onOpen(boardId, board?.name ?? "")}
          variant="ghost"
          className="p-1"
        >
          <p>{board?.name}</p>
        </Button>
      </Tooltip>

      <div className="bg-neutral-300 h-8 w-[1px] rounded-full" />

      <Actions
        id={boardId}
        name={board?.name ?? ""}
        side="bottom"
        sideOffset={8}
        onDelete={() => router.push("/")}
      >
        <Button variant="ghost" className="p-1">
          <Menu size={20} />
        </Button>
      </Actions>
    </div>
  );
}
