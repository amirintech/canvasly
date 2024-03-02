import { mutation } from "./_generated/server";
import { v } from "convex/values";

const images = Array(8)
  .fill("")
  .map((_, i) => `/boards/${i}.svg`);

export const createBoard = mutation({
  args: { name: v.string(), orgId: v.string() },
  handler: async (ctx, args) => {
    const id = await ctx.auth.getUserIdentity();
    if (!id) throw new Error("Not authorized");

    const imageUrl = images[Math.floor(Math.random() * images.length)];
    const board = {
      name: args.name,
      orgId: args.orgId,
      userId: id.subject,
      authorName: id.name || "Anonymous",
      imageUrl,
    };

    return ctx.db.insert("boards", board);
  },
});

export const deleteBoard = mutation({
  args: { id: v.id("boards") },
  handler: async (ctx, args) => {
    const id = await ctx.auth.getUserIdentity();
    if (!id) throw new Error("Not authorized");

    const favorite = await ctx.db
      .query("favorites")
      .withIndex("by_board_user", (q) =>
        q.eq("boardId", args.id).eq("userId", id.subject)
      )
      .unique();

    if (favorite) await ctx.db.delete(favorite._id);

    return ctx.db.delete(args.id);
  },
});

export const updateBoard = mutation({
  args: { id: v.id("boards"), name: v.string() },
  handler: async (ctx, args) => {
    const id = await ctx.auth.getUserIdentity();
    if (!id) throw new Error("Not authorized");

    const name = args.name.trim();
    if (!name) throw new Error("Name is required");
    if (name.length > 50) throw new Error("Name must be 50 characters or less");

    return ctx.db.patch(args.id, { name });
  },
});

export const addToFavorites = mutation({
  args: { id: v.id("boards"), orgId: v.string() },
  handler: async (ctx, args) => {
    const id = await ctx.auth.getUserIdentity();
    if (!id) throw new Error("Not authorized");

    const board = await ctx.db.get(args.id);
    if (!board) throw new Error("Board not found");

    const existingFavorite = await ctx.db
      .query("favorites")
      .withIndex("by_board_user_org", (q) =>
        q
          .eq("boardId", args.id)
          .eq("userId", id.subject)
          .eq("orgId", args.orgId)
      )
      .unique();
    if (existingFavorite) throw new Error("Already favorited");

    return ctx.db.insert("favorites", {
      boardId: args.id,
      userId: id.subject,
      orgId: args.orgId,
    });
  },
});

export const removeFromFavorites = mutation({
  args: { id: v.id("boards") },
  handler: async (ctx, args) => {
    const id = await ctx.auth.getUserIdentity();
    if (!id) throw new Error("Not authorized");

    const board = await ctx.db.get(args.id);
    if (!board) throw new Error("Board not found");

    const existingFavorite = await ctx.db
      .query("favorites")
      .withIndex("by_board_user", (q) =>
        q.eq("boardId", args.id).eq("userId", id.subject)
      )
      .unique();
    if (!existingFavorite) throw new Error("Not favorited");

    return ctx.db.delete(existingFavorite._id);
  },
});
