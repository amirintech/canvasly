import { Id } from "@/convex/_generated/dataModel";

export default interface Board {
  _id: Id<"boards">;
  _creationTime: number;
  imageUrl: string;
  name: string;
  orgId: string;
  userId: string;
  authorName: string;
  isFavorite?: boolean;
}
