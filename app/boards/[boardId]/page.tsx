import Room from "@/components/shared/room";
import Canvas from "./_components/canvas";

interface Props {
  params: { boardId: string };
}

export default function BoardPage({ params: { boardId } }: Props) {
  return (
    <div>
      <Room roomId={boardId}>
        <Canvas boardId={boardId} />
      </Room>
    </div>
  );
}
