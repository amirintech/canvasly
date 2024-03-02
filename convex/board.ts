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
