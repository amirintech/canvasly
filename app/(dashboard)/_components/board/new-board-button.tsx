import { api } from "@/convex/_generated/api";
import useApiMutation from "@/hooks/use-api-mutation";
import { Plus } from "lucide-react";
import { toast } from "sonner";

interface Props {
  orgId: string;
  disabled?: boolean;
}

export default function NewBoardButton({ disabled, orgId }: Props) {
  const { isPending, mutate } = useApiMutation(api.board.createBoard);

  const handleCreateBoard = () =>
    mutate({ orgId, name: "New Board" })
      .then(() => toast.success("Board created successfully!"))
      .catch((e) => {
        toast.error("Failed to create board!");
        console.log(e);
      });

  return (
    <button
      onClick={handleCreateBoard}
      disabled={disabled || isPending}
      className="aspect-square sm:w-full gap-1 sm:h-full flex flex-col transition hover:bg-indigo-700 items-center justify-center bg-indigo-600 rounded-md text-white disabled:cursor-not-allowed disabled:bg-indigo-600 disabled:opacity-70"
    >
      <Plus size={42} />
      <span className="text-sm">Create Board</span>
    </button>
  );
}
