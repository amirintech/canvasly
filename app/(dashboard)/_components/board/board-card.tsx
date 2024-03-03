"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@clerk/clerk-react";
import { MoreHorizontal } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { GoHeart, GoHeartFill } from "react-icons/go";

import Board from "@/models/board";
import { Skeleton } from "@/components/ui/skeleton";
import Actions from "@/components/shared/actions";
import useApiMutation from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

interface Props {
  board: Board;
  onFavoriteChange: (id: string) => void;
}

export default function BoardCard({
  board: {
    _creationTime,
    _id,
    imageUrl,
    name,
    orgId,
    userId,
    authorName,
    isFavorite,
  },
  onFavoriteChange,
}: Props) {
  const auth = useAuth();
  const timeAgo = formatDistanceToNow(_creationTime, { addSuffix: true });
  const authorLabel = userId == auth.userId ? "You" : authorName;
  const { isPending: addFabvoritePending, mutate: onAddFavorite } =
    useApiMutation(api.board.addToFavorites);
  const { isPending: removeFavoritePending, mutate: onRemoveFavorite } =
    useApiMutation(api.board.removeFromFavorites);

  const handleAddFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    onFavoriteChange(_id);
    onAddFavorite({ id: _id, orgId }).catch(() =>
      toast.error("Failed to add to favorites!")
    );
  };
  const handleRemoveFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    onFavoriteChange(_id);
    onRemoveFavorite({ id: _id }).catch((e) =>
      toast.error("Failed to remove from favorites!")
    );
  };

  return (
    <Link
      target="_blank"
      href={`/boards/${_id}`}
      className="group overflow-hidden rounded-md border border-indigo-100"
    >
      <div className="aspect-square relative bg-indigo-50/50">
        <Image fill src={imageUrl} className="object-fill" alt={name} />

        <div className="w-full h-full bg-indigo-500/10 opacity-0 absolute top-0 left-0 group-hover:opacity-100 transition-opacity" />

        <Actions name={name} id={_id} side="right">
          <button className="absolute top-1 transition hover:bg-indigo-500 hover:text-white p-1 group rounded-full right-1 text-indigo-500 opacity-0 group-hover:opacity-100">
            <MoreHorizontal size={24} className="transition-colors" />
          </button>
        </Actions>
      </div>

      <footer className="p-3 relative">
        <h3 className="font-normal truncate max-w-[calc(100%-20px)]">{name}</h3>

        <div className="opacity-0 group-hover:opacity-100 transition">
          <p className="text-sm text-gray-600">
            <span>{authorLabel} </span>
            <span>{timeAgo}</span>
          </p>

          <button
            onClick={isFavorite ? handleRemoveFavorite : handleAddFavorite}
            aria-label="add to favorite"
            className="absolute top-3 right-3"
          >
            {isFavorite ? (
              <GoHeartFill size={20} className="text-rose-500" />
            ) : (
              <GoHeart size={20} className="hover:text-rose-500 transition" />
            )}
          </button>
        </div>
      </footer>
    </Link>
  );
}

export function BoardCardSkeleton() {
  return (
    <Link
      href=""
      className="group overflow-hidden aspect-square rounded-md border border-indigo-100"
    >
      <Skeleton className="h-full w-full" />
    </Link>
  );
}
