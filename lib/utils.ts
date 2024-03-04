import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { Camera } from "@/types/canvas";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function mapConnectionIdToColor(connectionId: number) {
  const colors = [
    "#FF7F59",
    "#00FF7F",
    "#7F59FF",
    "#FFA500",
    "#FF7F59",
    "#00FF7F",
    "#7F59FF",
    "#FFA500",
    "#FF7F59",
    "#00FF7F",
  ];

  return colors[connectionId % colors.length];
}

export function mapPointerEventToCanvasPoint(
  e: React.PointerEvent<SVGElement>,
  camera: Camera
) {
  return {
    x: e.clientX + camera.x,
    y: e.clientY + camera.y,
  };
}
