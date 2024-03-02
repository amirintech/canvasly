"use client";

import { useAuth } from "@clerk/clerk-react";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { GoHeart, GoHeartFill } from "react-icons/go";

import Board from "@/models/board";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  board: Board;
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
}: Props) {
  const auth = useAuth();
  const timeAgo = formatDistanceToNow(_creationTime, { addSuffix: true });
  const authorLabel = userId == auth.userId ? "You" : authorName;

  return (
    <Link
      href=""
      className="group overflow-hidden rounded-md border border-indigo-100"
    >
      <div className="aspect-square relative bg-indigo-50/50">
        <Image fill src={imageUrl} className="object-fill" alt={name} />
      </div>

      <footer className="p-3 relative">
        <h3 className="font-normal truncate max-w-[calc(100%-20px)]">{name}</h3>

        <div className="opacity-0 group-hover:opacity-100 transition">
          <p className="text-sm text-gray-600">
            <span>{authorLabel} </span>
            <span>{timeAgo}</span>
          </p>

          <button
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
