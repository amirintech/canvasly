"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import useApiMutation from "@/hooks/use-api-mutation";
import useRenameDialog from "@/hooks/use-rename-dialog";
import { useState } from "react";
import { toast } from "sonner";

export default function RenameBoardDialog() {
  const { isOpen, onClose, state } = useRenameDialog();
  const { isPending, mutate } = useApiMutation(api.board.updateBoard);
  const [name, setName] = useState(state.name);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fromDate = new FormData(e.currentTarget);
    const newName = fromDate.get("name") as string;
    if (!newName) toast.error("Name is required!");
    if (newName.length > 50) toast.error("Name must be 50 characters or less");
    if (newName === state.name) return onClose();

    mutate({ id: state.id, name: newName })
      .then(() => {
        toast.success("Board renamed!");
        onClose();
      })
      .catch(() => toast.error("Failed to rename board!"));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Rename Board</DialogTitle>
          <DialogDescription>Enter a new name for the board.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            required
            name="name"
            disabled={isPending}
            placeholder="e.g. Mango Tango Brainstorm"
            maxLength={50}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <DialogFooter>
            <Button disabled={isPending} type="submit">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
