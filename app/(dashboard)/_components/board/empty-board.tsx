import { toast } from "sonner";

import EmptyState from "../empty-state";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import useApiMutation from "@/hooks/use-api-mutation";

interface Props {
  orgId: string;
}

export default function EmptyBoard({ orgId }: Props) {
  const { isPending, mutate: createBoard } = useApiMutation(
    api.board.createBoard
  );
  const handleClick = () =>
    createBoard({ name: "New Board", orgId })
      .then(() => toast.success("Board created!"))
      .catch(() => toast.error("Failed to create board."));

  return (
    <EmptyState
      title="No Boards!"
      subtitle="Get started by creating your first board."
      imageUrl="/icons/empty-boards.svg"
      action={
        <Button disabled={isPending} onClick={handleClick} className="mt-4">
          Create Board
        </Button>
      }
    />
  );
}
