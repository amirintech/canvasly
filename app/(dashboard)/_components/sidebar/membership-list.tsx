"use client";

import { useOrganizationList } from "@clerk/clerk-react";
import MembershipItem from "./membership-item";

export default function MembershipList() {
  const { userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  if (!userMemberships.data?.length) return null;

  return (
    <ul className="space-y-4">
      {userMemberships.data.map(({ organization: { name, imageUrl, id } }) => (
        <li key={id}>
          <MembershipItem id={id} imageUrl={imageUrl} name={name} />
        </li>
      ))}
    </ul>
  );
}
