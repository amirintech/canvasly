"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";

import useDialog from "@/hooks/use-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import useApiMutation from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";

export default function CreateBoardDialog() {
  const router = useRouter();
  const { isOpen, onClose, type, data: orgId } = useDialog();
  const { isPending, mutate } = useApiMutation(api.board.createBoard);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    if (!name) return;

    mutate({ name, orgId })
      .then((id) => {
        onClose();
        toast.success("Board created!");
        window.open(`/boards/${id}`, "_blank") || router.push(`/boards/${id}`);
      })
      .catch(() => toast.error("Failed to create board"));
  };

  return (
    <Dialog open={isOpen && type == "createBoard"} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Board</DialogTitle>
          <DialogDescription>
            Enter the name of the board you want to create. You can rename it
            later.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            required
            name="name"
            maxLength={50}
            disabled={isPending}
            placeholder="e.g. Project Apollo Launch"
          />

          <DialogFooter>
            <Button disabled={isPending}>Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
