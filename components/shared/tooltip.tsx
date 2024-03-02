import { TooltipContentProps, TooltipProps } from "@radix-ui/react-tooltip";
import {
  Tooltip as ShadcnTooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface Props extends TooltipContentProps {
  label: string;
}

export default function Tooltip({
  children,
  label,
  align,
  alignOffset,
  side,
  sideOffset,
}: Props) {
  return (
    <TooltipProvider>
      <ShadcnTooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          className="text-white bg-black border-black"
          side={side}
          align={align}
          alignOffset={alignOffset}
          sideOffset={sideOffset}
        >
          <p className="capitalize font-semibold">{label}</p>
        </TooltipContent>
      </ShadcnTooltip>
    </TooltipProvider>
  );
}
