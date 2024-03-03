import Tooltip from "@/components/shared/tooltip";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface Props {
  label: string;
  icon: LucideIcon;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

export default function Tool({
  icon: Icon,
  label,
  active,
  disabled,
  onClick,
}: Props) {
  return (
    <Tooltip label={label} side="right" sideOffset={12}>
      <Button size="icon" variant="ghost" disabled={disabled} onClick={onClick}>
        <Icon />
      </Button>
    </Tooltip>
  );
}
