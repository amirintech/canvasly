"use client";

import EmptyState from "../empty-state";
import { Button } from "@/components/ui/button";
import useDialog from "@/hooks/use-dialog";

interface Props {
  orgId: string;
}

export default function EmptyBoard({ orgId }: Props) {
  const { onOpen } = useDialog();

  return (
    <EmptyState
      title="No Boards!"
      subtitle="Get started by creating your first board."
      imageUrl="/icons/empty-boards.svg"
      action={
        <Button onClick={() => onOpen("createBoard", orgId)} className="mt-4">
          Create Board
        </Button>
      }
    />
  );
}
