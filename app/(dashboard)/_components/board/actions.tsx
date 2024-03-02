"use client";

import {} from "react";
import { Link, Pencil, Trash } from "lucide-react";
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import { toast } from "sonner";
import { ConfirmDialog } from "../../../../components/shared/confirm-dialog";
import { Button } from "../../../../components/ui/button";
import useApiMutation from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import useRenameDialog from "@/hooks/use-rename-dialog";

interface Props {
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  id: string;
  name: string;
}

export default function Actions({
  children,
  id,
  side,
  sideOffset,
  name,
}: Props) {
  const { isPending, mutate } = useApiMutation(api.board.deleteBoard);
  const { onOpen: openRenameDialog } = useRenameDialog();

  const handleCopyLink = () =>
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => toast.success(`Link copied to clipboard!`))
      .catch(() => toast.error(`Failed to copy link!`));

  const handleDelete = () =>
    mutate({ id })
      .then(() => toast.success(`Board deleted!`))
      .catch(() => toast.error(`Failed to delete board!`));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

      <DropdownMenuContent
        onClick={(e) => e.stopPropagation()}
        side={side}
        sideOffset={sideOffset}
        className="w-60"
      >
        <DropdownMenuItem onClick={handleCopyLink}>
          <Link size={16} className="mr-2" /> Copy Link
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => openRenameDialog(id, name)}>
          <Pencil size={16} className="mr-2" /> Rename
        </DropdownMenuItem>

        <ConfirmDialog
          title={`Do you want to delete "${name}"?`}
          description={`You are about to delete "${name}". This action is irreversible.`}
          disabled={isPending}
          onConfirm={handleDelete}
        >
          <Button
            variant="ghost"
            className="px-2 py-1.5 text-sm text-rose-500 w-full h-auto hover:bg-rose-500 justify-start hover:text-white"
          >
            <Trash size={16} className="mr-2" /> Delete
          </Button>
        </ConfirmDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
