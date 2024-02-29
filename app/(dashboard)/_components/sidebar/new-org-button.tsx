"use client";

import { Plus } from "lucide-react";
import { CreateOrganization } from "@clerk/clerk-react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Tooltip from "@/components/shared/tooltip";

export default function NewOrgButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="aspect-square">
          <Tooltip label="Create organization" side="right" sideOffset={16}>
            <button className="bg-white/25 opacity-70 hover:opacity-100 transition flex items-center justify-center w-full h-full rounded-md">
              <Plus className="text-white" />
            </button>
          </Tooltip>
        </div>
      </DialogTrigger>

      <DialogContent className="p-0 bg-transparent border-none">
        <CreateOrganization />
      </DialogContent>
    </Dialog>
  );
}
