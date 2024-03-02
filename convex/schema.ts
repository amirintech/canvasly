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
    .searchIndex("search_name", {
      searchField: "name",
      filterFields: ["orgId"],
    }),
});
