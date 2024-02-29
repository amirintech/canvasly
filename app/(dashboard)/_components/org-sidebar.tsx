"use client";

import Image from "next/image";
import Link from "next/link";
import { LayoutDashboard } from "lucide-react";
import { MuseoModerno } from "next/font/google";
import { useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import OrgSwitcher from "./sidebar/org-switcher";

const font = MuseoModerno({
  subsets: ["latin"],
});

export default function OrgSidebar() {
  const params = useSearchParams();
  const favorites = params.get("favorites");

  return (
    <aside className="hidden lg:flex flex-col space-y-6 w-52 p-4">
      <Link href="/" className="flex items-center gap-x-1">
        <div className="relative w-10 h-10">
          <Image src="/icons/logo.svg" fill alt="" />
        </div>
        <span className={cn("text-3xl font-black", font.className)}>Miro</span>
      </Link>

      <OrgSwitcher />

      <div className="space-y-2">
        <Button
          variant={favorites ? "ghost" : "secondary"}
          size="lg"
          asChild
          className="font-normal justify-start px-2 w-full"
        >
          <Link href="/">
            <LayoutDashboard size={20} />
            <span className="block ml-2">Team Boards</span>
          </Link>
        </Button>

        <Button
          variant={favorites ? "secondary" : "ghost"}
          size="lg"
          asChild
          className="font-normal justify-start px-2 w-full"
        >
          <Link href={{ pathname: "/", query: { favorites: true } }}>
            <LayoutDashboard size={20} />
            <span className="block ml-2">Favorite Boards</span>
          </Link>
        </Button>
      </div>
    </aside>
  );
}
