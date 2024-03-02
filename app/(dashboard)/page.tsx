"use client";

import { useOrganization } from "@clerk/clerk-react";

import EmptyOrg from "./_components/empty-org";
import BoardList from "./_components/board/board-list";

interface Props {
  searchParams: {
    search?: string;
    favorites?: string;
  };
}

export default function Page({ searchParams }: Props) {
  const { organization } = useOrganization();

  return (
    <div className="h-[calc(100%-104px)] w-full">
      {organization ? (
        <BoardList orgId={organization.id} query={searchParams} />
      ) : (
        <EmptyOrg />
      )}
    </div>
  );
}
