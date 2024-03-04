"use client";

import {
  Circle,
  MousePointer2,
  Pencil,
  Redo2,
  Square,
  StickyNote,
  Type,
  Undo2,
} from "lucide-react";

import Tool from "./tool";
import { CanvasMode, CanvasState, LayerType } from "@/types/canvas";
import { useMemo } from "react";

interface Props {
  canvasState: CanvasState;
  setCanvasState: (canvasState: CanvasState) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

const historyTools = [
  { label: "Undo", icon: Undo2, onClick: () => {} },
  { label: "Redo", icon: Redo2, onClick: () => {} },
];

export default function Toolbar({
  canRedo,
  canUndo,
  canvasState,
  redo,
  setCanvasState,
  undo,
}: Props) {
  const tools = useMemo(
    () => [
      {
        label: "Select",
        icon: MousePointer2,
        isActive:
          canvasState.mode == CanvasMode.NONE ||
          canvasState.mode == CanvasMode.PRESSING ||
          canvasState.mode == CanvasMode.SELECTION_NET ||
          canvasState.mode == CanvasMode.TRANSLATING ||
          canvasState.mode == CanvasMode.RESIZING,
        onClick: () => setCanvasState({ mode: CanvasMode.NONE }),
      },
      {
        label: "Text",
        icon: Type,
        isActive:
          canvasState.mode == CanvasMode.INSERTING &&
          canvasState.layerType == LayerType.TEXT,
        onClick: () =>
          setCanvasState({
            mode: CanvasMode.INSERTING,
            layerType: LayerType.TEXT,
          }),
      },
      {
        label: "Sticky Note",
        icon: StickyNote,
        isActive:
          canvasState.mode == CanvasMode.INSERTING &&
          canvasState.layerType == LayerType.NOTE,
        onClick: () =>
          setCanvasState({
            mode: CanvasMode.INSERTING,
            layerType: LayerType.NOTE,
          }),
      },
      {
        label: "Square",
        icon: Square,
        isActive:
          canvasState.mode == CanvasMode.INSERTING &&
          canvasState.layerType == LayerType.RECTANGLE,
        onClick: () =>
          setCanvasState({
            mode: CanvasMode.INSERTING,
            layerType: LayerType.RECTANGLE,
          }),
      },
      {
        label: "Ellipse",
        icon: Circle,
        isActive:
          canvasState.mode == CanvasMode.INSERTING &&
          canvasState.layerType == LayerType.ELLIPSE,
        onClick: () =>
          setCanvasState({
            mode: CanvasMode.INSERTING,
            layerType: LayerType.ELLIPSE,
          }),
      },
      {
        label: "Pencil",
        icon: Pencil,
        isActive: canvasState.mode == CanvasMode.PENCIL,
        onClick: () =>
          setCanvasState({
            mode: CanvasMode.PENCIL,
          }),
      },
    ],
    [canvasState]
  );

  return (
    <div className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center flex-col left-2 gap-y-2">
      <div className="flex flex-col gap-y-1 p-1 rounded-md bg-white shadow-md">
        {tools.map(({ label, icon, onClick, isActive }) => (
          <Tool
            key={label}
            label={label}
            icon={icon}
            onClick={onClick}
            active={isActive}
          />
        ))}
      </div>

      <div className="flex flex-col gap-y-1 p-1 rounded-md bg-white shadow-md">
        <Tool label={"Undo"} icon={Undo2} disabled={!canUndo} onClick={undo} />
        <Tool label={"Redo"} icon={Redo2} disabled={!canRedo} onClick={redo} />
      </div>
    </div>
  );
}
