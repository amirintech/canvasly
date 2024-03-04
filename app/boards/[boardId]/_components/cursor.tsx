"use client";

import { memo } from "react";
import { MousePointer2 } from "lucide-react";

import { useOther } from "@/liveblocks.config";
import { mapConnectionIdToColor } from "@/lib/utils";

interface Props {
  connectionId: number;
}

const Cursor = memo(({ connectionId }: Props) => {
  const info = useOther(connectionId, (u) => u.info);
  const cursor = useOther(connectionId, (u) => u.presence.cursor);
  const name = info?.name ?? "Anonymous";

  console.log("Cursor", connectionId, cursor);

  if (!cursor) return;

  const { x, y } = cursor;
  const theme = mapConnectionIdToColor(connectionId);

  return (
    // foreignObject is used to render HTML inside an SVG
    <foreignObject
      style={{
        transform: `translate(${x}px, ${y}px)`,
        position: "relative",
      }}
      height={50}
      width={name.length * 10 + 20}
    >
      <MousePointer2
        className="h-5 w-5"
        style={{
          fill: theme,
          color: theme,
        }}
      />
      <div
        className="absolute left-4 top-4 px-1.5 py-0.5 text-xs text-white font-semibold rounded"
        style={{ backgroundColor: theme }}
      >
        {name}
      </div>
    </foreignObject>
  );
});

Cursor.displayName = "Cursor";

export default Cursor;
