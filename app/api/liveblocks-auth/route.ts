import { auth, currentUser } from "@clerk/nextjs";
import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";

import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET!,
});

export async function POST(req: Request) {
  const authorization = auth();
  const user = await currentUser();

  if (!user?.id || !authorization)
    return new Response("Unauthorized", { status: 401 });

  const { room } = await req.json();
  const board = await convex.query(api.board.getBoard, { id: room });
  if (board?.orgId != authorization.orgId)
    return new Response("Unauthorized", { status: 401 });

  const session = liveblocks.prepareSession(user.id, {
    userInfo: {
      name: user.firstName || "Anonymous",
      avatar: user.imageUrl,
    },
  });
  if (room) session.allow(room, session.FULL_ACCESS);

  const { body, status } = await session.authorize();

  return new Response(body, { status });
}
