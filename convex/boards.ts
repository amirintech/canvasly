import { query } from "./_generated/server";
import { v } from "convex/values";

export const getBoards = query({
  args: { orgId: v.string() },
  handler: async (ctx, args) => {
    const id = await ctx.auth.getUserIdentity();
    if (!id) throw new Error("Not authorized");

    return ctx.db
      .query("boards")
      .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
      .order("desc")
      .collect();
  },
});
