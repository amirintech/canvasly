"use client";

import { ReactNode } from "react";
import { ClientSideSuspense } from "@liveblocks/react";

import { RoomProvider } from "@/liveblocks.config";
import SpinningLoader from "./spinning-loader";

interface Props {
  children: ReactNode;
  roomId: string;
  fallback?: ReactNode;
}

export default function Room({ children, roomId, fallback }: Props) {
  return (
    <RoomProvider id={roomId} initialPresence={{ cursor: null }}>
      <ClientSideSuspense fallback={fallback || <SpinningLoader />}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
}
