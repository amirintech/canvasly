import { Button } from "@/components/ui/button";
import EmptyState from "./empty-state";

interface Props {
  orgId: string;
  query: {
    search?: string;
    favorites?: string;
  };
}

export default function BoardList({ orgId, query }: Props) {
  const boards = [];

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

  if (!boards.length)
    return (
      <EmptyState
        title="No Boards!"
        subtitle="Get started by creating your first board."
        imageUrl="/icons/empty-boards.svg"
        action={<Button className="mt-4">Create Board</Button>}
      />
    );

  return <div>BoardList</div>;
}
