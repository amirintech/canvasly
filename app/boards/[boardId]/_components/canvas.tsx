"use client";

import React, { useCallback, useState } from "react";

import {
  useHistory,
  useCanRedo,
  useCanUndo,
  useMutation,
} from "@/liveblocks.config";
import Info from "./info";
import Participants from "./participants";
import Toolbar from "./toolbar";
import { Camera, CanvasMode, CanvasState } from "@/types/canvas";
import { mapPointerEventToCanvasPoint } from "@/lib/utils";
import CursorsPresence from "./cursors-presence";

interface Props {
  boardId: string;
}

export default function Canvas({ boardId }: Props) {
  const [state, setState] = useState<CanvasState>({
    mode: CanvasMode.NONE,
  });
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });
  const { undo, redo } = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  const handlePointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent<SVGElement>) =>
      setMyPresence({ cursor: mapPointerEventToCanvasPoint(e, camera) }),
    []
  );

  const handleWheel = useCallback(
    (e: React.WheelEvent<SVGElement>) =>
      setCamera((c) => ({
        x: c.x - e.deltaX,
        y: c.y - e.deltaY,
      })),
    []
  );

  const handlePointerLeave = useMutation(
    ({ setMyPresence }) => setMyPresence({ cursor: null }),
    []
  );

  return (
    <main className="w-screen h-screen relative touch-none bg-neutral-200/50">
      <Info boardId={boardId} />

      <Participants />

      <Toolbar
        canRedo={canRedo}
        canUndo={canUndo}
        canvasState={state}
        setCanvasState={setState}
        redo={redo}
        undo={undo}
      />

      <svg
        onWheel={handleWheel}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="h-screen w-screen"
      >
        <g>
          <CursorsPresence />
        </g>
      </svg>
    </main>
  );
}
