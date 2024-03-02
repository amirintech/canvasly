"use client";

import { useQuery } from "convex/react";

import { api } from "@/convex/_generated/api";
import EmptyState from "../empty-state";
import EmptyBoard from "./empty-board";
import BoardCard, { BoardCardSkeleton } from "./board-card";
import NewBoardButton from "./new-board-button";

interface Props {
  orgId: string;
  query: {
    search?: string;
    favorites?: string;
  };
}

export default function BoardList({ orgId, query }: Props) {
  const boards = useQuery(api.boards.getBoards, { orgId });
  const title = query.favorites ? "Favorite Boards" : "Team Boards";

  const boardsList = (boards || Array(10).fill(null)).map((board) => {
    return board ? (
      <BoardCard key={board._id} board={board} />
    ) : (
      <BoardCardSkeleton key={Math.random()} />
    );
  });

  if (!boards) return getStructure(title, boardsList);

  if (!boards.length && query.search)
    return (
      <EmptyState
        title="No Results Found!"
        subtitle="Try to search for another board."
        imageUrl="/icons/empty-search.svg"
      />
    );

  if (!boards.length && query.favorites)
    return (
      <EmptyState
        title="No Favorites!"
        subtitle="You have not favorite any board yet."
        imageUrl="/icons/empty-favorites.svg"
      />
    );

  if (!boards.length) return <EmptyBoard orgId={orgId} />;

  return getStructure(title, boardsList, orgId);
}

function getStructure(
  title: string,
  children: React.ReactNode,
  orgId?: string
) {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {orgId && <NewBoardButton orgId={orgId} />}
        {children}
      </div>
    </div>
  );
}
