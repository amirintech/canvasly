"use client";

import { useQuery } from "convex/react";

import { api } from "@/convex/_generated/api";
import EmptyState from "../empty-state";
import EmptyBoard from "./empty-board";
import BoardCard, { BoardCardSkeleton } from "./board-card";
import NewBoardButton from "./new-board-button";
import { useEffect, useState } from "react";
import Board from "@/models/board";

interface Props {
  orgId: string;
  query: {
    search?: string;
    favorites?: string;
  };
}

export default function BoardList({ orgId, query }: Props) {
  const apiBoards = useQuery(api.boards.getBoards, {
    orgId,
    name: query.search,
    favorites: query.favorites,
  });
  const [boards, setBoards] = useState(apiBoards);
  const title = query.favorites ? "Favorite Boards" : "Team Boards";

  useEffect(() => {
    setBoards(apiBoards);
  }, [apiBoards]);

  const emptyBoards = Array(10)
    .fill(null)
    .map(() => <BoardCardSkeleton key={Math.random()} />);
  if (!apiBoards || !boards) return getStructure(title, emptyBoards);

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

  const handleFavoriteChange = (id: string) => {
    const index = boards.findIndex((board) => board._id === id);
    if (index === -1) return;

    const newBoards = [...boards];
    newBoards[index].isFavorite = !newBoards[index].isFavorite;
    setBoards(newBoards);
  };

  const boardsList = boards.map((board) => (
    <BoardCard
      key={board._id}
      board={board as Board}
      onFavoriteChange={handleFavoriteChange}
    />
  ));

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
