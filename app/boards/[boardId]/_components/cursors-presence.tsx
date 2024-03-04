"use client";

import { memo } from "react";

import { useOthersConnectionIds } from "@/liveblocks.config";
import Cursor from "./cursor";

const CursorsPresence = memo(() => {
  const ids = useOthersConnectionIds();
  return (
    <>
      {ids.map((id) => (
        <Cursor key={id} connectionId={id} />
      ))}
    </>
  );
});

CursorsPresence.displayName = "Cursors";

export default CursorsPresence;
