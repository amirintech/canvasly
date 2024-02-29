"use client";

import Image from "next/image";
import { useOrganization, useOrganizationList } from "@clerk/clerk-react";

import { cn } from "@/lib/utils";
import Tooltip from "@/components/shared/tooltip";

interface Props {
  id: string;
  name: string;
  imageUrl: string;
}

export default function MembershipItem({ id, imageUrl, name }: Props) {
  const { organization } = useOrganization();
  const { setActive } = useOrganizationList();
  const isActive = organization?.id == id;

  const handleClick = () => {
    if (!setActive) return;

    setActive({ organization: id });
  };

  return (
    <Tooltip label={name} side="right" sideOffset={16}>
      <button
        onClick={handleClick}
        className="aspect-square block w-full h-full relative"
      >
        <Image
          fill
          alt={name}
          src={imageUrl}
          className={cn(
            "opacity-70 rounded-md cursor-pointer hover:opacity-100 transition",
            isActive && "opacity-100"
          )}
        />
      </button>
    </Tooltip>
  );
}
