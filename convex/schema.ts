import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  boards: defineTable({
    name: v.string(),
    orgId: v.string(),
    userId: v.string(),
    imageUrl: v.string(),
    authorName: v.string(),
  })
    .index("by_org", ["orgId"])
    .index("by_org_user", ["orgId", "userId"])
    .searchIndex("search_name", {
      searchField: "name",
      filterFields: ["orgId"],
    }),

  favorites: defineTable({
    orgId: v.string(),
    userId: v.string(),
    boardId: v.string(),
  })
    .index("by_org", ["orgId"])
    .index("by_user_org", ["userId", "orgId"])
    .index("by_board_user", ["boardId", "userId"])
    .index("by_board_user_org", ["boardId", "userId", "orgId"]),
});
