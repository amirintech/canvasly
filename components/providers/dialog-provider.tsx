"use client";

import { useEffect, useState } from "react";

import RenameBoardDialog from "../dialogs/rename-board-dialog";
import CreateBoardDialog from "../dialogs/create-board-dialog";

export default function DialogProvider() {
  const [isMounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!isMounted) return null;

  return (
    <>
      <RenameBoardDialog />
      <CreateBoardDialog />
    </>
  );
}
