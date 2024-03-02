import { v } from "convex/values";

import { query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const getBoards = query({
  args: {
    orgId: v.string(),
    name: v.optional(v.string()),
    favorites: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const id = await ctx.auth.getUserIdentity();
    if (!id) throw new Error("Not authorized");

    if (args.favorites) {
      const favorites = await ctx.db
        .query("favorites")
        .withIndex("by_user_org", (q) =>
          q.eq("userId", id.subject).eq("orgId", args.orgId)
        )
        .order("desc")
        .collect();

      const ids = favorites.map(({ boardId }) => boardId);
      const boards = await Promise.all(
        ids.map((id) => ctx.db.get(id as Id<"boards">))
      );

      return boards.map((b) => ({ ...b, isFavorite: true }));
    }

    let boards: {
      _id: Id<"boards">;
      _creationTime: number;
      name: string;
      orgId: string;
      userId: string;
      imageUrl: string;
      authorName: string;
    }[] = [];

    const name = args.name ?? "";
    if (name) {
      boards = await ctx.db
        .query("boards")
        .withSearchIndex("search_name", (q) =>
          q.search("name", name).eq("orgId", args.orgId)
        )
        .collect();
    } else {
      boards = await ctx.db
        .query("boards")
        .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
        .order("desc")
        .collect();
    }

    const temp = boards.map((board) =>
      ctx.db
        .query("favorites")
        .withIndex("by_board_user", (q) =>
          q.eq("boardId", board._id).eq("userId", id.subject)
        )
        .unique()
        .then((favorite) => ({
          ...board,
          isFavorite: !!favorite,
        }))
    );

    return Promise.all(temp);
  },
});
