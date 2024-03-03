"use client";

import { useSelf } from "@/liveblocks.config";
import Info from "./info";
import Participants from "./participants";
import Toolbar from "./toolbar";

interface Props {
  boardId: string;
}

export default function Canvas({ boardId }: Props) {
  const self = useSelf();
  console.log(self.id);
  console.log(self.info);

  return (
    <main className="w-screen h-screen relative touch-none bg-neutral-200/50">
      <Info boardId={boardId} />
      <Participants />
      <Toolbar />
    </main>
  );
}
