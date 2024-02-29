import {
  Tooltip as ShadcnTooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface Props {
  label: string;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  alignOffset?: number;
  children: React.ReactNode;
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
