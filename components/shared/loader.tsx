import Image from "next/image";
import React from "react";

export default function Loader() {
  return (
    <div className="w-screen h-screen bg-amber-50/50 flex items-center justify-center">
      <div className="relative h-28 w-28 animate-pulse">
        <Image fill alt="" src="/icons/logo.svg" />
      </div>
    </div>
  );
}
