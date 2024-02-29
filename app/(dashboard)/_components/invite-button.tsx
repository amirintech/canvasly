import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { OrganizationProfile } from "@clerk/clerk-react";
import { Plus } from "lucide-react";

export default function InviteButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="space-x-2 h-12 lg:h-10">
          <Plus size={16} />
          <span>Invite</span>
        </Button>
      </DialogTrigger>

      <DialogContent hideCloseButton primitive>
        <OrganizationProfile />
      </DialogContent>
    </Dialog>
  );
}
