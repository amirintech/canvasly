"use client";

import { LucideIcon } from "lucide-react";

import Tooltip from "@/components/shared/tooltip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
      <Button
        size="icon"
        variant="ghost"
        disabled={disabled}
        onClick={onClick}
        className={cn(
          "disabled:opacity-50",
          active && "!text-indigo-600 !bg-indigo-50"
        )}
      >
        <Icon />
      </Button>
    </Tooltip>
  );
}
