interface Props {
  params: { boardId: string };
}

export default function BoardPage({ params: { boardId } }: Props) {
  return <div>Board ID: {boardId}</div>;
}
