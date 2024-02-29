"use client";

import { ReactNode } from "react";
import Image from "next/image";

interface Props {
  imageUrl: string;
  title: string;
  subtitle: string;
  action?: ReactNode;
}

export default function EmptyState({
  action,
  imageUrl,
  subtitle,
  title,
}: Props) {
  return (
    <div className="w-full h-full  flex-col flex items-center justify-center">
      <Image height={200} width={200} src={imageUrl} alt="" />

      <div className="pt-4 flex justify-center flex-col items-center">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>

      {action}
    </div>
  );
}
