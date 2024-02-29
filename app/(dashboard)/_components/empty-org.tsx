"use client";

import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import EmptyState from "./empty-state";
import { CreateOrganization } from "@clerk/clerk-react";

export default function EmptyOrg() {
  const action = (
    <Dialog>
      <DialogTrigger asChild className="mt-4">
        <Button>Create Organization</Button>
      </DialogTrigger>
      <DialogContent primitive>
        <CreateOrganization />
      </DialogContent>
    </Dialog>
  );

  return (
    <EmptyState
      title="Welcome to Miro!"
      subtitle="Create a new organization to get started."
      imageUrl="/icons/empty-org.svg"
      action={action}
    />
  );
}
